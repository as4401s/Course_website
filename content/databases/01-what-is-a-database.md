---
title: What is a Database?
description: Plain-English intro, the main types, and the databases people actually use today.
icon: 🧠
---

## 🎯 In one line

A **database** is an organised place to store data so you can find, change and trust it later — even with thousands of people using it at once.

---

## 📦 What is a database?

- A **structured collection of data** kept on a computer.
- Built so data is **easy to add, find, update and delete**.
- Keeps data **safe** — survives crashes, power cuts and restarts.
- Handles **many users at the same time** without them corrupting each other's work.

> 💡 **Example:** Instagram stores your posts, likes and followers in databases. When you open the app, it *queries* them and shows you the result in milliseconds.

### Database vs DBMS — two different things

- **Database** = the actual data.
- **DBMS** (Database Management System) = the *software* that manages that data.
- We say "PostgreSQL is a database", but strictly it's a **DBMS**.

| Term | What it means | Example |
|---|---|---|
| Data | A single fact | `arjun@mail.com` |
| Database | The organised collection | The `users` database |
| DBMS | Software running it | PostgreSQL, MySQL |
| Query | A question you ask it | `SELECT * FROM users` |

---

## 🤔 Why not just use files?

You *could* store everything in a spreadsheet or text file. It breaks fast.

| Problem with plain files | How a database solves it |
|---|---|
| Finding one row means reading the whole file | **Indexes** jump straight to it |
| Two people saving at once = lost data | **Transactions & locks** |
| Crash mid-save = corrupted file | **Write-ahead logging + recovery** |
| No rules, so bad data creeps in | **Schemas & constraints** |
| Slow once it's big | Query **optimiser** picks the fast path |
| Anyone can open it | **Users, roles, permissions** |

> 💡 **Example:** A 2 GB CSV of orders takes ~10 seconds to scan for one order ID. An indexed database finds it in ~1 millisecond.

---

## 🧩 Types of databases (the main families)

### 1. Relational (SQL) 🗃️

- Data in **tables** = rows and columns, like a spreadsheet.
- Tables **link to each other** by IDs (relationships).
- You query with **SQL**.
- Strong rules: every row must fit the table's shape (**schema**).
- **Best for:** anything with clear structure and important data — payments, orders, users.

```sql
SELECT name, email
FROM users
WHERE country = 'DE';
```

> 💡 **Example:** A `users` table and an `orders` table. Each order stores a `user_id` pointing back to its user.

### 2. Key-Value 🔑

- The simplest model: a **key** points to a **value**. Like a dictionary.
- Extremely fast, but you can only look things up **by key**.
- **Best for:** caching, sessions, feature flags, rate limiting.

```
"session:abc123"  ->  { "user": 42, "expires": "2026-01-01" }
```

### 3. Document 📄

- Stores **JSON-like documents** instead of rows.
- Each document can have **different fields** — flexible schema.
- Nested data lives together, so no joins needed to read one thing.
- **Best for:** content, catalogues, user profiles, fast-changing shapes.

```json
{
  "_id": "p_101",
  "name": "Laptop",
  "specs": { "ram": "16GB", "cpu": "M4" },
  "tags": ["electronics", "sale"]
}
```

### 4. Wide-column 🧱

- Rows can each have **millions of columns**, and different columns per row.
- Built to spread across **many machines** and swallow huge write volumes.
- **Best for:** time-series at scale, event logs, IoT, messaging history.

> 💡 **Example:** Discord stores billions of messages in Cassandra/ScyllaDB, partitioned by channel.

### 5. Graph 🕸️

- Data as **nodes** (things) and **edges** (relationships).
- Relationships are stored directly, so "friends of friends" is cheap.
- **Best for:** social networks, recommendations, fraud rings, knowledge graphs.

```cypher
MATCH (a:Person)-[:FRIEND]->(b:Person)-[:FRIEND]->(c:Person)
WHERE a.name = 'Arjun'
RETURN c.name
```

### 6. Time-series ⏱️

- Optimised for data stamped with a **time**, written constantly, rarely updated.
- Great compression, plus built-in "average per 5 minutes" style queries.
- **Best for:** metrics, monitoring, sensors, stock prices.

### 7. Vector 🧭

- Stores **embeddings** — long lists of numbers representing meaning.
- Finds items by **similarity**, not exact match.
- **Best for:** semantic search, RAG for LLMs, image/audio similarity.

> 💡 **Example:** Searching "cheap laptop for coding" finds a product titled "budget developer notebook" — no shared keywords, similar meaning.

### 8. Search engines 🔍

- Built for **full-text search** — typo tolerance, ranking, highlighting.
- **Best for:** site search, log search, autocomplete.

### 9. In-memory ⚡

- Keeps everything in **RAM**, so reads are microseconds.
- Data can be lost on restart unless it also writes to disk.
- **Best for:** caches, leaderboards, queues, real-time counters.

---

## ⚖️ SQL vs NoSQL — the short version

| | **SQL (relational)** | **NoSQL** |
|---|---|---|
| Shape | Fixed tables & schema | Flexible documents / keys / graphs |
| Language | SQL (standard) | Varies per database |
| Joins | Built in, strong | Limited or manual |
| Scaling | Usually **up** (bigger server) | Usually **out** (more servers) |
| Guarantees | Strong **ACID** by default | Often eventual consistency |
| Good at | Correctness & relationships | Scale & flexibility |
| Reach for it when | Money, orders, anything that must be exact | Huge volume, changing shapes, caching |

> ⚠️ **Not a competition.** Real systems use several. A typical app: PostgreSQL for orders + Redis for cache + Elasticsearch for search + Pinecone for AI features.

---

## 🌟 Commonly used databases today

### Relational
- **PostgreSQL** 🐘 — the default choice now. Open source, hugely capable, extensions for almost anything (even vectors).
- **MySQL / MariaDB** 🐬 — everywhere on the web, powers WordPress; simple and battle-tested.
- **SQLite** 📦 — a single file, no server. Ships inside phones, browsers and desktop apps.
- **Microsoft SQL Server** 🪟 and **Oracle** 🏛️ — dominant in large enterprises.

### Cloud-native relational
- **Amazon Aurora** — AWS's faster, managed PostgreSQL/MySQL.
- **Google Cloud SQL / AlloyDB** — same idea on GCP.
- **CockroachDB**, **YugabyteDB** — SQL that scales across regions.

### Key-value & cache
- **Redis** 🔴 — the standard cache; also queues, locks, leaderboards.
- **Valkey** — open-source fork of Redis, gaining fast.
- **Amazon DynamoDB** — serverless, scales to anything, pay per request.
- **etcd** — small but critical; stores all Kubernetes state.

### Document
- **MongoDB** 🍃 — the best-known document database.
- **Firebase Firestore** — realtime sync, popular for mobile apps.
- **Couchbase**, **Amazon DocumentDB**.

### Wide-column
- **Apache Cassandra** — massive write throughput, no single point of failure.
- **ScyllaDB** — Cassandra-compatible, written in C++, much faster.
- **Google Bigtable**, **HBase**.

### Graph
- **Neo4j** — the most popular graph database.
- **Amazon Neptune**, **ArangoDB**, **Memgraph**.

### Time-series
- **InfluxDB**, **TimescaleDB** (PostgreSQL extension), **Prometheus** (metrics + alerting).

### Vector
- **pgvector** 🐘 — vectors inside PostgreSQL; most people should start here.
- **Pinecone**, **Qdrant**, **Weaviate**, **Milvus**, **Chroma**.

### Search
- **Elasticsearch** / **OpenSearch** — the heavyweights.
- **Meilisearch**, **Typesense** — lighter, faster to set up.

### Analytics / warehouses (OLTP vs OLAP)
- **OLTP** = many small reads/writes → PostgreSQL, MySQL.
- **OLAP** = huge scans and aggregations for reporting → **Snowflake**, **BigQuery**, **ClickHouse**, **Redshift**, **Databricks**, **DuckDB** (local analytics in one file).

---

## 🧾 Cheat sheet — which one do I pick?

| I need to… | Use | Example pick |
|---|---|---|
| Store orders, users, payments | Relational | PostgreSQL |
| Make things fast / cache | In-memory KV | Redis |
| Store flexible JSON | Document | MongoDB |
| Handle a firehose of events | Wide-column | Cassandra / ScyllaDB |
| Query relationships deeply | Graph | Neo4j |
| Track metrics over time | Time-series | TimescaleDB |
| Search by meaning (AI/RAG) | Vector | pgvector |
| Full-text search with typos | Search | Elasticsearch |
| Run big reports | Warehouse / OLAP | BigQuery, ClickHouse |
| Ship an app with no server | Embedded | SQLite |

> ✅ **Default advice:** start with **PostgreSQL**. Add **Redis** when it's slow. Add anything else only when you have a real reason.

---

## ⚠️ Common gotchas

- **"NoSQL is faster"** — only for its specific access pattern. Wrong pattern, and it's slower.
- **Skipping indexes** — the #1 cause of slow queries.
- **No backups** — replication is *not* a backup; it copies your mistakes too.
- **Too many databases too early** — every extra one is another thing to run, monitor and keep in sync.
- **Storing files (images, video) in the database** — use object storage like S3 and keep the URL in the database.

---

## 🔑 Key takeaways

- A database = organised data **plus** software that keeps it safe, fast and shared.
- Files break at scale; databases add indexes, transactions, recovery and permissions.
- Main families: **relational, key-value, document, wide-column, graph, time-series, vector, search**.
- **SQL** for correctness and relationships; **NoSQL** for scale and flexible shapes.
- Real systems **mix** several — pick per job, not per fashion.
- Start with **PostgreSQL** unless you have a concrete reason not to.
