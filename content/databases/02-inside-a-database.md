---
title: Inside a Database
description: The components a query passes through — network layer, frontend, execution engine, storage engine — one by one.
icon: 🔬
---

![Inside a database — the components a query travels through, from the client to the OS](/images/databases/inside-db.webp)

## 🎯 In one line

A database is not one program — it's a **pipeline of small specialists**: one parses your query, one plans it, one runs it, one manages memory, one writes to disk, and several keep everyone from stepping on each other.

---

## 🚦 The journey of one query

Follow `SELECT * FROM users WHERE id = 7` all the way down:

1. **Client** sends the query text.
2. **Network Layer** accepts the connection.
3. **Tokenizer** chops the text into words.
4. **Parser** checks the grammar.
5. **Optimizer** decides *how* to get the data fastest.
6. **Query Executor** runs that plan.
7. **Buffer / Cache Mgr** checks if the data is already in RAM.
8. **Storage Engine** reads it from disk if not.
9. **OS Layer** does the actual file read.
10. Result travels back up to the client.

> 💡 **Example:** If `id` is indexed, step 5 chooses an *index lookup* (~1 page read) instead of a *full table scan* (~millions of reads). Same query, 1000× difference.

---

## 👤 Client

- Whatever is **asking** for data — your app, a dashboard, `psql`, an ORM.
- Sends **queries**, receives **results**.
- Lives outside the database itself.

> 💡 **Example:** A Node.js API using `pg`, or you typing into a terminal.

---

## 🌐 Network Layer

- The **front door** of the database.
- Accepts connections over TCP and speaks the database's **wire protocol**.
- Handles **authentication** (who are you?) and encryption (TLS).
- Manages the **connection pool** — connections are expensive, so they're reused.

> ⚠️ **Gotcha:** Each connection costs memory. Too many open connections is a classic outage cause — put a pooler (like PgBouncer) in front.

---

## 🧠 FrontEnd — turning text into a plan

The frontend's job: take a **string** and turn it into an **executable plan**. Three stages.

### Tokenizer

- Breaks the raw query into **tokens** (the smallest meaningful pieces).
- Doesn't care about meaning yet — just splitting.

> 💡 **Example:** `SELECT * FROM users` → `SELECT`, `*`, `FROM`, `users`

### Parser

- Checks the tokens follow **SQL grammar**.
- Builds a **parse tree** (a structured shape of your query).
- Rejects nonsense here — this is where syntax errors come from.
- Also verifies the tables and columns actually **exist**.

> 💡 **Example:** `SELCT * FROM users` fails at the parser: `syntax error at or near "SELCT"`.

### Optimizer

- The **brain**. Decides the *cheapest* way to get your answer.
- Many plans give the same result — it picks one using **statistics** (table sizes, value distribution).
- Chooses: which **index** to use, **join order**, join algorithm, whether to scan or seek.
- Output = the **execution plan**.

> 💡 **Example:** Joining `users` (10 rows) with `orders` (10M rows)? Scan the small table first and probe the big one's index — never the other way around.

```sql
-- See the plan the optimizer picked:
EXPLAIN ANALYZE SELECT * FROM users WHERE id = 7;
```

> ⚠️ **Gotcha:** Stale statistics = bad plans. This is why databases run `ANALYZE` in the background.

---

## ⚙️ Execution Engine

### Query Executor

- **Runs the plan** step by step and fetches the actual rows.
- Performs the real work: joins, filters, sorting, grouping, aggregating.
- Asks the storage engine for pages of data as it goes.

> 💡 **Example:** Executes a hash join by building a hash table of `users`, then streaming `orders` through it.

### Cache Manager

- Keeps **hot data in memory** so repeat queries skip the disk.
- Evicts what hasn't been used (typically **LRU** — least recently used).
- May also cache query results and execution plans.

> 💡 **Example:** A homepage query hit 10,000×/minute is served from memory, not disk.

### Utility Services

- The **background chores** that keep the database healthy.
- **Statistics gathering** — keeps the optimizer's numbers fresh.
- **Vacuuming / compaction** — reclaims space from deleted rows.
- Also: autogrowth, log rotation, scheduled jobs, health checks.

> ⚠️ **Gotcha:** In PostgreSQL, if autovacuum can't keep up you get "table bloat" — the table on disk grows even though row count doesn't.

---

## 🔐 Keeping data correct: transactions, locks, recovery

### Transaction Manager

- Groups statements into an **all-or-nothing** unit.
- Guarantees **ACID**:
  - **A**tomicity — all of it happens, or none of it.
  - **C**onsistency — rules and constraints always hold.
  - **I**solation — concurrent transactions don't see each other's half-done work.
  - **D**urability — once committed, it survives a crash.
- Provides **COMMIT** (make it permanent) and **ROLLBACK** (undo it all).

> 💡 **Example:** Moving €100 between accounts = two updates. If the second fails, the first must be undone — otherwise money vanishes.

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;   -- both, or neither
```

### Lock Manager

- Controls **who may touch which row** right now.
- **Shared lock** (read) — many readers allowed together.
- **Exclusive lock** (write) — one writer, everyone else waits.
- Detects and breaks **deadlocks** (A waits on B, B waits on A).

> ⚠️ **Gotcha:** Long transactions hold locks the whole time and block everyone. Keep them short.

### Concurrency Manager

- Lets **many users work at the same time** without them corrupting the data.
- Modern databases mostly use **MVCC** (Multi-Version Concurrency Control):
  - Each writer creates a **new version** of a row.
  - Readers see the version that existed when they started.
  - Result: **readers never block writers, writers never block readers**.

> 💡 **Example:** You run a 30-second report while orders keep coming in. Your report sees a consistent snapshot from when it started — no half-finished orders.

### Recovery Manager

- Puts the database back together **after a crash**.
- Uses the **WAL** (Write-Ahead Log): every change is written to a sequential log *before* the data files.
- On restart: **replay** committed changes, **undo** uncommitted ones.
- Also the foundation for backups and point-in-time restore.

> 💡 **Example:** Power cut mid-`COMMIT`. On boot, the recovery manager reads the WAL and finishes or discards the transaction — no corruption.

> 📌 **Why a log first?** Appending to a log is sequential and fast; updating data files is random and slow. Log now, apply later.

---

## 🌍 Scaling out: shards, clusters, replicas

### Shard Manager

- **Splits one big dataset across many machines** (horizontal scaling / partitioning).
- Each **shard** holds a slice of the data and its own share of the traffic.
- Routes each query to the right shard, and merges results from many.

> 💡 **Example:** Users A–M on shard 1, N–Z on shard 2. Each machine handles half the load and half the storage.

> ⚠️ **Gotcha:** Pick the shard key carefully — a bad one creates a "hot shard" that gets all the traffic.

### Cluster Manager

- Coordinates the **group of nodes** acting as one database.
- Tracks who's alive (**heartbeats**), who is the leader, who joined or left.
- Handles **failover** — promotes a replica when the primary dies.

> 💡 **Example:** Primary goes down at 3am. The cluster manager elects a replica as the new primary; the app reconnects and keeps working.

### Replication Manager

- **Copies data to other nodes** for availability and read scaling.
- **Primary (master)** takes writes; **replicas** serve reads.
- **Synchronous** — wait for the replica to confirm. Safer, slower.
- **Asynchronous** — don't wait. Faster, small risk of losing recent writes.

> 💡 **Example:** One primary in Frankfurt, replicas in Frankfurt and Virginia. US users read locally and fast.

| Concept | Splits data? | Copies data? | Buys you |
|---|---|---|---|
| **Sharding** | ✅ Yes | ❌ No | More capacity |
| **Replication** | ❌ No | ✅ Yes | Availability + read scale |

---

## 💾 Storage Engine

Where data physically lives. Data is handled in fixed-size **pages** (blocks), usually 4–16 KB — never single rows.

### Disk Storage Manager

- Owns the **on-disk layout**: which page holds which rows.
- Reads and **writes blocks**, tracks free space, allocates new pages.
- Deals in pages because disks are far more efficient in chunks.

### Buffer Manager

- The **RAM cache for disk pages** — the single biggest performance lever.
- Reads check the buffer pool first; a miss triggers a disk read.
- Writes go to memory and are flushed later (**dirty pages**).
- Evicts cold pages when full.

> 💡 **Example:** PostgreSQL's `shared_buffers`, MySQL InnoDB's `innodb_buffer_pool_size`. Sizing this right is most of tuning.

> 📌 **Rule of thumb:** RAM ≈ nanoseconds, SSD ≈ microseconds, HDD ≈ milliseconds. Every avoided disk read is a ~1000× win.

### Index Manager

- Maintains **indexes** — extra structures that make lookups fast.
- Without one, finding a row means reading **every** row (full scan).
- Common types:
  - **B-tree** — the default; great for `=`, `<`, `>`, ranges and sorting.
  - **Hash** — very fast for exact `=` only.
  - **GIN / inverted** — for full-text and JSON.
  - **GiST / R-tree** — geospatial.

> 💡 **Example:** Like a book's index — jump to page 214 instead of reading all 500 pages.

> ⚠️ **Gotcha:** Indexes speed up reads but **slow down writes** (every insert updates every index) and take disk space. Index what you actually filter on.

---

## 🖥️ OS Interaction Layer

- The database's **conversation with the operating system**.
- Requests **file system** operations: open, read, write, `fsync`.
- Requests **memory** allocation, manages threads/processes.
- Often bypasses the OS cache deliberately — the database's own buffer manager knows its access patterns better.

> 💡 **Example:** `fsync()` forces the OS to actually push data to the physical disk. Durability depends on it — this is exactly what a WAL commit calls.

---

## 🧾 Cheat sheet

| Component | One-line job |
|---|---|
| **Network Layer** | Accepts connections, authenticates |
| **Tokenizer** | Splits query text into tokens |
| **Parser** | Validates grammar, builds parse tree |
| **Optimizer** | Picks the fastest execution plan |
| **Query Executor** | Runs the plan, fetches rows |
| **Cache Mgr** | Keeps hot data in memory |
| **Utility Services** | Background upkeep (stats, vacuum) |
| **Transaction Mgr** | ACID, commit & rollback |
| **Lock Mgr** | Who can touch what, right now |
| **Concurrency Mgr** | Many users at once, safely (MVCC) |
| **Recovery Mgr** | Rebuilds state after a crash (WAL) |
| **Shard Mgr** | Splits data across nodes |
| **Cluster Mgr** | Coordinates nodes, handles failover |
| **Replication Mgr** | Copies data for availability |
| **Disk Storage Mgr** | On-disk page layout, block I/O |
| **Buffer Mgr** | RAM cache of disk pages |
| **Index Mgr** | Indexes that make lookups fast |
| **OS Layer** | File system & memory calls |

---

## 🔑 Key takeaways

- A query flows: **network → tokenizer → parser → optimizer → executor → storage → OS**, then back.
- The **optimizer** decides performance; the **index manager** and **buffer manager** deliver it.
- **Transactions + locks + concurrency + recovery** are what make data *trustworthy*, not just stored.
- **WAL first, data files later** — that's how a crash doesn't corrupt anything.
- **Sharding splits** data, **replication copies** it — different problems, often used together.
- Almost all tuning comes down to one question: **can we avoid touching the disk?**
