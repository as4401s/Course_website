---
title: JSON Web Tokens (JWTs)
description: A compact, signed container of claims that a receiver can verify — readable by anyone, so never secret.
icon: 📜
---

![A signed JWT from issue to verification: an issuer signs claims, a client carries the token, and the API validates it. The token has a header, a readable payload and a signature; the receiver must validate signature, issuer, audience, expiry and permissions. Follow the token across the top, then inspect its contents and validation checks.](/images/authentication/jwt.svg)

## 🎯 In one line

A compact container of **claims** that a receiver can **verify**.

> 💡 **Think of it as:** a signed pass carries details that a trusted reader can check.

---

## ⚙️ How it works

1. An **issuer** creates **claims** and **signs** the token.
   - e.g. subject (`sub`), intended audience (`aud`), expiry (`exp`).
2. The client passes it to the **intended receiver**.
   - An API may receive a JWT as a **bearer access token**.
3. The receiver **validates** it before using the contents — and still checks permissions.

### Example

```text
<base64url-header>.<base64url-payload>.<signature>
```

- The common **signed (JWS)** form is shown.
- **Encrypted** JWTs use a different structure.

> ⚠️ **Decoding is not validation.** JWT does not automatically mean encrypted, stateless, or an access token.

---

## 🔍 What the receiver must check

- **Signature** — was it signed by the trusted issuer, and untouched?
- **Algorithm** — is it one the receiver permits?
- **Issuer** (`iss`) — did the expected party create it?
- **Audience** (`aud`) — is it meant for *this* receiver?
- **Time claims** (e.g. `exp`) — is it still valid?
- **Permissions** — a valid token still needs an allowed action.

---

## ⚖️ Pros & cons

### ✅ Pros

- Signature verification can avoid a **session lookup** for each request.
- A standard format lets **multiple services** verify trusted claims.

### ❌ Cons

- A signed payload is usually **readable** — secrets do not belong inside it.
- Immediate **revocation** and changing permissions need extra design; claims may become stale.

---

## 🧾 Cheat sheet

| Question | JWTs |
|---|---|
| **Kind** | Token format |
| **What is presented?** | Signed claims, often inside a token |
| **Main benefit** | Local verification |
| **Main trade-off** | Revocation and stale claims |
| **Typical fit** | Systems that need signed identity or access claims, often across several services |

---

## 🔑 Key takeaways

- JWT is a **format**: `header.payload.signature`.
- Signed ≠ encrypted — anyone can **read** the payload, so no secrets inside.
- Decoding is not validation — check signature, algorithm, issuer, audience and expiry.
- Fast local verification, but **revocation** and stale claims need extra design.

---

## 📚 Read more

- [JSON Web Token · RFC 7519](https://www.rfc-editor.org/rfc/rfc7519.html)
- [JWT validation · RFC 8725](https://www.rfc-editor.org/rfc/rfc8725.html)
- [Token revocation · RFC 7009](https://www.rfc-editor.org/rfc/rfc7009.html)
- 🎬 [Video chapter · 10:00](https://www.youtube.com/watch?v=iX8g4LqF8p8&t=600s)
