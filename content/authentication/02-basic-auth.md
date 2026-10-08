---
title: Basic Authentication
description: Send a username and password with every protected request — the simplest HTTP scheme, and why Base64 hides nothing.
icon: 🔑
---

![Basic authentication: the server answers 401 with WWW-Authenticate: Basic, the client Base64-encodes username:password into the Authorization header, and the server decodes it and checks it against the stored password hash. Read the numbered steps top to bottom.](/images/authentication/basic-auth.svg)

## 🎯 In one line

Send a **username and password** with each protected request.

> 💡 **Think of it as:** showing your username and password at the door every time.

---

## ⚙️ How it works

1. The server can **challenge** a request with `401` and a `WWW-Authenticate` header.
2. The client **Base64-encodes** `username:password` and sends it in the `Authorization` header.
3. The server **checks** the credentials.
4. Later requests can send the same header **without waiting** for another challenge.

### Example

```http
Authorization: Basic YXJqdW46ZGVtby1vbmx5
```

- Illustrative only — this decodes to `arjun:demo-only`.

> ⚠️ **Base64 does not hide a password.** Use HTTPS and protect credentials from logs.

---

## ⚖️ Pros & cons

### ✅ Pros

- Very small implementation; widely supported by HTTP tools.
- No session database is required by the scheme.

### ❌ Cons

- The reusable password travels on **every** authenticated request.
- No built-in token expiry, fine-grained scopes, or reliable browser logout.

---

## 🧾 Cheat sheet

| Question | Basic auth |
|---|---|
| **Kind** | HTTP authentication scheme |
| **What is presented?** | Encoded username + password |
| **Main benefit** | Minimal setup |
| **Main trade-off** | Repeated password exposure |
| **Typical fit** | Simple integrations or legacy HTTP endpoints where Basic is required |

---

## 🔑 Key takeaways

- Basic auth = `username:password`, Base64-encoded, in the `Authorization` header.
- Base64 is **encoding, not encryption** — always use HTTPS.
- The password travels on **every** request.
- No expiry, scopes or real logout — fine for small or legacy endpoints only.

---

## 📚 Read more

- [HTTP Basic · RFC 7617](https://www.rfc-editor.org/rfc/rfc7617.html)
- [REST security · OWASP](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html)
- 🎬 [Video chapter · 2:53](https://www.youtube.com/watch?v=iX8g4LqF8p8&t=173s)
