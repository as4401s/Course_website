---
title: Bearer Tokens
description: Whoever holds a valid token can use its granted access — so a stolen token can be replayed.
icon: 🎟️
---

![Bearer tokens: a token service issues an access token, the client calls the protected API with Authorization: Bearer <token>, the API asks the token service whether an opaque token is active and gets back validity, audience and scope, checks the action is permitted, then returns data or rejects (invalid token 401, insufficient scope 403). Read the numbered steps top to bottom.](/images/authentication/bearer-tokens.svg)

## 🎯 In one line

**Possession** of a valid token is enough to use its granted access.

> 💡 **Think of it as:** a bearer ticket can be used by whoever is holding it.

---

## ⚙️ How it works

1. A login or authorization flow **issues an access token**.
2. The client presents it in the `Authorization: Bearer …` header.
3. The API **validates** it, then checks permissions:
   - **opaque token** → lookup / introspection at the issuer ("is it active?").
   - **suitable signed token** (e.g. a JWT) → local verification.

### Example

```http
Authorization: Bearer <access-token>
```

- The token may be opaque or a JWT — the header does **not** tell you which.

> ⚠️ **Bearer describes how a token is used.** JWT describes one possible format. Keep tokens out of URLs and logs.

---

## 🚦 Which status code?

| Situation | Response |
|---|---|
| Token missing, invalid or expired | `401` |
| Token valid, but scope / permission insufficient | `403` |
| Token valid and action permitted | `200` + data |

- A valid token is **not** unlimited access — the API still checks the action.

---

## ⚖️ Pros & cons

### ✅ Pros

- The API call does not contain the user's **password**.
- Works with both **opaque strings** and structured tokens such as **JWTs**.

### ❌ Cons

- Anyone who **steals** a usable bearer token can replay it.
- "Bearer" alone says nothing about format, expiry, revocation, or how it was issued.

---

## 🧾 Cheat sheet

| Question | Bearer tokens |
|---|---|
| **Kind** | Token presentation scheme |
| **What is presented?** | Token in a Bearer header |
| **Main benefit** | Password-free API requests |
| **Main trade-off** | Stolen tokens can be replayed |
| **Typical fit** | APIs consumed by mobile apps, backends, and other authorized clients |

---

## 🔑 Key takeaways

- "Bearer" = **how** a token is sent, not what is inside it.
- Whoever holds the token can use it — keep tokens out of **URLs and logs**.
- The API validates the token *and* checks permission: `401` vs `403`.
- Opaque tokens are looked up; signed tokens can be verified locally.

---

## 📚 Read more

- [Bearer tokens · RFC 6750](https://www.rfc-editor.org/rfc/rfc6750.html)
- [Token introspection · RFC 7662](https://www.rfc-editor.org/rfc/rfc7662.html)
- 🎬 [Video chapter · 10:00](https://www.youtube.com/watch?v=iX8g4LqF8p8&t=600s)
