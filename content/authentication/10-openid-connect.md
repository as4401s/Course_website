---
title: OpenID Connect (OIDC)
description: A trusted provider tells your app which user has signed in — the login layer on top of OAuth 2.0.
icon: 🆔
---

![OpenID Connect sign-in: your app redirects the browser to the identity provider with the openid scope, state, nonce and PKCE; the user authenticates (password, passkey or MFA); the provider redirects back with a code; your app exchanges the code plus PKCE verifier for an ID token and access token, validates the ID token (signature, issuer, audience, expiry, nonce) and creates its own session cookie. Read the numbered steps top to bottom.](/images/authentication/oidc.svg)

## 🎯 In one line

A **trusted provider** tells your app **which user has signed in**.

> 💡 **Think of it as:** a trusted authority supplies a signed identity statement for your app.

---

## ⚙️ How it works

1. Requesting the `openid` scope starts an **OIDC sign-in** flow.
2. The provider authenticates the user and returns an **ID token** through the code exchange.
3. Your app **validates** that token and the login transaction.
   - It identifies the account by the **provider + subject** pair.
   - It can then create its own **local session**.

### Example

```text
scope=openid profile
```

- `openid` is the **defining** scope.
- Additional scopes (e.g. `profile`) request additional permitted information.

> ⚠️ **ID token ≠ access token.** An ID token tells the client about authentication — do not substitute it for an API access token. Also: not every "Sign in with…" OAuth button necessarily implements OIDC.

---

## 🆚 OAuth 2.0 vs OIDC

| | OAuth 2.0 | OpenID Connect |
|---|---|---|
| **Answers** | What may this app access? | Who signed in? |
| **Kind** | Authorization framework | Authentication protocol on OAuth 2.0 |
| **Main result** | Access token | ID token (plus access token) |
| **Typical fit** | Connecting to a provider's API | "Sign in with Google", enterprise sign-in |

---

## ⚖️ Pros & cons

### ✅ Pros

- Standard **identity claims** and interoperability.
- The identity provider can handle **MFA** and credential management.

### ❌ Cons

- Your login depends on the provider's **availability and security**.
- Token validation, account linking, and redirects must be configured correctly.

---

## 🧾 Cheat sheet

| Question | OpenID Connect |
|---|---|
| **Kind** | Authentication protocol on OAuth 2.0 |
| **What is presented?** | Validated ID token |
| **Main benefit** | Standard provider-based login |
| **Main trade-off** | Provider dependency; validation |
| **Typical fit** | "Sign in with Google" and enterprise sign-in for modern applications |

---

## 🔑 Key takeaways

- OIDC = OAuth 2.0 **+ login**; the `openid` scope switches it on.
- The **ID token** (a JWT) is for your app; the **access token** is for APIs.
- Identify users by the **provider + subject** pair.
- The provider can handle MFA and passwords for you — but your login now depends on it.

---

## 📚 Read more

- [OpenID Connect Core · OpenID Foundation](https://openid.net/specs/openid-connect-core-1_0.html)
- [OpenID Connect · Google](https://developers.google.com/identity/openid-connect/openid-connect)
- [JWT validation · RFC 8725](https://www.rfc-editor.org/rfc/rfc8725.html)
- 🎬 [Video chapter · 16:14](https://www.youtube.com/watch?v=iX8g4LqF8p8&t=974s)
