---
title: Digest Authentication
description: Prove you know the password by answering a fresh challenge — without sending the password itself.
icon: 🧩
---

![Digest authentication: the server answers 401 with a Digest challenge (nonce, realm, hash algorithm), the client calculates a request-specific digest from the password, nonce and request details, and the server recalculates it and checks nonce freshness and replay controls. Read the numbered steps top to bottom.](/images/authentication/digest-auth.svg)

## 🎯 In one line

Prove you know the password by **answering a challenge** — the password itself is never sent.

> 💡 **Think of it as:** the guard gives you a fresh puzzle that depends on your secret.

---

## ⚙️ How it works

1. The server sends a challenge containing a **nonce** — a fresh value used in the proof.
2. The client **hashes** password-related data together with the nonce and request details.
   - The password itself is **not** sent.
3. The server **computes the expected result** and checks freshness.
   - A matching proof establishes the identity.

### Example

```http
Authorization: Digest username="arjun", nonce="…", response="…"
```

- Simplified header — real exchanges contain additional fields.

> ⚠️ **Not just MD5, and not encryption.** RFC 7616 also specifies SHA-256 and SHA-512/256. Digest does **not** encrypt traffic.

---

## 🆚 Basic vs Digest

| | Basic | Digest |
|---|---|---|
| **Sent on the wire** | Base64 `username:password` | Hash of password + nonce + request |
| **Password travels?** | Yes, on every request | No |
| **Replay protection** | None built in | Nonce and counter checks |
| **Encrypts traffic?** | No | No |

---

## ⚖️ Pros & cons

### ✅ Pros

- Avoids directly transmitting the password.
- Nonce and counter checks can limit **replay** of captured requests.

### ❌ Cons

- More complicated, with limited modern login features.
- Captured exchanges can enable **password guessing**; old MD5 deployments are weak.

---

## 🧾 Cheat sheet

| Question | Digest auth |
|---|---|
| **Kind** | HTTP challenge–response scheme |
| **What is presented?** | Challenge-specific hash response |
| **Main benefit** | Password is not sent directly |
| **Main trade-off** | Legacy complexity; weak passwords remain risky |
| **Typical fit** | Existing devices and legacy systems that already require HTTP Digest |

---

## 🔑 Key takeaways

- The server sends a **nonce**; the client answers with a hash — the password never travels.
- Nonces and counters help stop **replay** of captured requests.
- It does **not** encrypt traffic, and weak passwords can still be guessed from captured exchanges.
- Mostly found on **legacy** devices and systems that already require it.

---

## 📚 Read more

- [HTTP Digest · RFC 7616](https://www.rfc-editor.org/rfc/rfc7616.html)
- 🎬 [Video chapter · 4:26](https://www.youtube.com/watch?v=iX8g4LqF8p8&t=266s)
