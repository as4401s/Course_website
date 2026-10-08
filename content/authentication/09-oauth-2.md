---
title: OAuth 2.0
description: Let an app access specific resources on your behalf without giving it your provider password.
icon: 🤝
---

![OAuth 2.0 authorization code flow with PKCE: the client app redirects the browser to the provider with scope, state and a PKCE challenge; the user signs in and approves (e.g. read calendar); the provider redirects back with a one-time code; the app checks state, exchanges the code plus PKCE verifier for an access token (and a refresh token if issued), then calls the resource API, which only honours the granted scope. Read the numbered steps top to bottom.](/images/authentication/oauth2.svg)

## 🎯 In one line

Let an app access **specific resources** without giving it your provider **password**.

> 💡 **Think of it as:** giving a valet a limited key instead of your full keyring.

---

## ⚙️ How it works

1. The app asks for a specific **scope** — e.g. reading a calendar.
   - The provider handles login and approval.
2. A short-lived **code** returns to the app.
   - The app exchanges it using the matching **PKCE verifier**.
3. The resulting **access token** authorizes API calls.
   - The API enforces its scope and other permissions.

### Example

```text
response_type=code&scope=calendar.read&code_challenge=<challenge>&code_challenge_method=S256
```

- A partial authorization request.
- **PKCE** binds the returned code to the client that began the flow.

> ⚠️ **Don't hand-roll it.** Use a maintained OAuth library and **Authorization Code + PKCE** for this interactive flow. Other grants exist, including **client credentials** for services.

---

## 🔤 Words you'll meet

| Term | Plain English |
|---|---|
| **Scope** | A named limit on granted access, e.g. `calendar.read` |
| **State** | A random value linking the response to the login your app started |
| **PKCE** | The client starts with a challenge and later proves it has the matching verifier |
| **Code** | A short-lived, one-time value the app swaps for tokens |

---

## ⚖️ Pros & cons

### ✅ Pros

- **Delegation** without sharing the provider password.
- **Scopes** can limit what the app may access.

### ❌ Cons

- Redirects, consent, code exchange, and token handling require careful integration.
- OAuth alone does **not** standardize a user-login identity result for your app.

> 📌 OAuth is about **access**. For **login** — who the user is — see [OpenID Connect](/authentication/openid-connect).

---

## 🧾 Cheat sheet

| Question | OAuth 2.0 |
|---|---|
| **Kind** | Authorization framework |
| **What is presented?** | A grant, exchanged for an access token |
| **Main benefit** | Scoped, delegated access |
| **Main trade-off** | Integration complexity |
| **Typical fit** | Connecting an app to a user's calendar, files, or other provider APIs |

---

## 🔑 Key takeaways

- OAuth = **delegated access** — the app never sees your provider password.
- **Scopes** limit what the app may do (e.g. `calendar.read`).
- Interactive apps: **Authorization Code + PKCE**, via a maintained library.
- OAuth alone is not a login protocol — that is what OIDC adds.

---

## 📚 Read more

- [OAuth 2.0 · RFC 6749](https://www.rfc-editor.org/rfc/rfc6749.html)
- [PKCE · RFC 7636](https://www.rfc-editor.org/rfc/rfc7636.html)
- [OAuth security · RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.html)
- 🎬 [Video chapter · 14:38](https://www.youtube.com/watch?v=iX8g4LqF8p8&t=878s)
