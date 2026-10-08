---
title: Sessions & Cookies
description: The browser keeps a session ID; the server remembers who it belongs to.
icon: 🍪
---

![Session-based authentication: the browser signs in once, the web server creates a session (random ID → user + expiry) in a session store and sets a Secure, HttpOnly, SameSite cookie; on later requests the browser sends the cookie automatically, the server looks the session up and returns the page — or asks the user to sign in again if it is invalid. Read the numbered steps top to bottom.](/images/authentication/sessions.svg)

## 🎯 In one line

The browser keeps a **session ID**; the server remembers who it belongs to.

> 💡 **Think of it as:** a cloakroom ticket points to a record held behind the counter.

---

## ⚙️ How it works

1. After a successful login, the server creates an **unpredictable session ID** and stores the user mapping.
2. The browser receives the ID in a **cookie** and sends it **automatically** on matching requests.
3. The server **looks up the session**, then checks permission for the requested action.

### Example

```http
Set-Cookie: __Host-session=<random-id>; Path=/; Secure; HttpOnly; SameSite=Lax
```

- **Cookie** = a storage / transport mechanism.
- It can carry a session ID — or another kind of token.

> ⚠️ **Harden the cookie.** Use `Secure` and `HttpOnly` cookies, suitable `SameSite` settings, CSRF defenses, expiry, and session-ID rotation after login. `HttpOnly` does not make XSS harmless.

---

## ⚖️ Pros & cons

### ✅ Pros

- Easy to **revoke** a session and implement logout.
- Identity and session state stay under **server control**.

### ❌ Cons

- Multiple servers need a suitable **shared session** strategy.
- Cookies sent automatically create **CSRF** risk; stolen session IDs allow impersonation.

---

## 🧾 Cheat sheet

| Question | Sessions & cookies |
|---|---|
| **Kind** | Server-side login state |
| **What is presented?** | Opaque session ID in a cookie |
| **Main benefit** | Central logout and session control |
| **Main trade-off** | Session storage; CSRF defenses |
| **Typical fit** | Browser applications that benefit from straightforward logout and central session control |

---

## 🔑 Key takeaways

- The cookie holds only a **random ID**; the real login state lives on the **server**.
- Logout and revocation are easy — the server drops the session.
- Auto-sent cookies mean you need **CSRF defenses**.
- Several servers need a **shared session strategy**.

---

## 📚 Read more

- [Session management · OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- [CSRF prevention · OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
- 🎬 [Video chapter · 8:16](https://www.youtube.com/watch?v=iX8g4LqF8p8&t=496s)
