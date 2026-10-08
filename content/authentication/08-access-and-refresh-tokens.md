---
title: Access & Refresh Tokens
description: One short-lived token for API calls, another, better-protected one to renew access.
icon: 🔄
---

![Access and refresh tokens: the client calls the resource API with an access token and gets 401 once it has expired; it sends the refresh token to the auth server's /token endpoint, which validates the request and rotates the token, returning a new access token and a replacement refresh token; the client retries the API with the new access token and never sends the refresh token to the API. Read the numbered steps top to bottom.](/images/authentication/access-refresh-tokens.svg)

## 🎯 In one line

Use **one token for API calls** and **another to renew access**.

> 💡 **Think of it as:** a short-term entry pass plus a more protected renewal voucher.

---

## ⚙️ How it works

1. A **short-lived access token** is sent to the resource API.
2. When it expires, the client uses a **refresh token** at the authorization server's token endpoint.
3. The server validates the request and can **rotate** the refresh token, invalidating its predecessor.
   - Revoked or expired refresh tokens → the user must **log in again**.

### Example

```http
POST /token
grant_type=refresh_token&refresh_token=<refresh-token>
```

- Schematic request body.
- **Confidential clients** (e.g. a backend) also authenticate to the token endpoint.

> ⚠️ **Access token → API. Refresh token → authorization server.** For public clients, OAuth security guidance requires rotation or binding the refresh token to a client-held key.

---

## 🆚 Access token vs refresh token

| | Access token | Refresh token |
|---|---|---|
| **Sent to** | The resource API | The authorization server (`/token`) |
| **Lifetime** | Short | Longer |
| **Used for** | API calls | Getting a new access token |
| **If stolen** | Short reuse window | Longer access — needs stronger protection |

---

## ⚖️ Pros & cons

### ✅ Pros

- Short access-token lifetimes limit the **reuse window**.
- Users keep working without repeatedly entering credentials.

### ❌ Cons

- A stolen refresh token can provide **longer access**.
- Rotation, safe storage, replay detection, and concurrent refreshes add complexity.

---

## 🧾 Cheat sheet

| Question | Access & refresh tokens |
|---|---|
| **Kind** | Token lifecycle pattern |
| **What is presented?** | Access token, or a renewal credential |
| **Main benefit** | Continuity with short API-token lifetimes |
| **Main trade-off** | Refresh secrets need stronger protection |
| **Typical fit** | Token-based apps that keep people signed in while limiting access-token lifetime |

---

## 🔑 Key takeaways

- Access token → **API**; refresh token → **authorization server**. Never mix them up.
- Short access tokens limit damage; refresh tokens keep users signed in.
- **Rotation** swaps in a new refresh token and invalidates the old one.
- Failed renewal → the user signs in again.

---

## 📚 Read more

- [OAuth 2.0 · RFC 6749](https://www.rfc-editor.org/rfc/rfc6749.html)
- [OAuth security · RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.html)
- [Token revocation · RFC 7009](https://www.rfc-editor.org/rfc/rfc7009.html)
- 🎬 [Video chapter · 12:54](https://www.youtube.com/watch?v=iX8g4LqF8p8&t=774s)
