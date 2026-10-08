---
title: The Big Picture
description: Authentication checks who is calling, authorization decides what they may do — and why "auth type" is not one single category.
icon: 🧭
---

![Every protected request passes two checks: first an identity check (invalid credentials → 401), then an authorization check (insufficient permission → 403, otherwise the action is allowed). Read left to right; red branches show why a request is rejected.](/images/authentication/big-picture.svg)

## 🎯 In one line

**Authentication** checks *who* is making a request; **authorization** decides *what* that identity may do — a successful login does not grant access to everything.

> 📌 Based on [7 Authentication Concepts Every Developer Should Know](https://www.youtube.com/watch?v=iX8g4LqF8p8) by Hayk Simonyan. All diagrams are original teaching illustrations.

---

## 🪪 Identity first, permission next

- **Authentication (authn)** — proving *who* you are.
  - e.g. a valid password, session cookie or token identifies the caller.
- **Authorization (authz)** — deciding *what* that identity may do.
  - e.g. an app may *read* your calendar but not *delete* it.
- Every protected request goes through **both** checks, in that order.

> 💡 **Example:** the HTTP status tells you which check failed — `401` = identity check failed, `403` = identity known, but permission missing.

---

## 🎨 Reading the diagrams

| Colour | Stands for |
|---|---|
| 🔵 Blue | Client / browser |
| 🟢 Green | Application / API |
| 🟡 Gold | Identity / decision |
| 🟣 Purple | Stored state / resource |

- Click any diagram to open it full size.
- Numbered steps read **top to bottom**.

---

## 🧩 Not all the same kind of thing

The names in this chapter answer **different questions**:

| Kind | Examples | Answers |
|---|---|---|
| **Format** | JWT | What can a token look like? |
| **Framework / protocol** | OAuth 2.0 · OIDC · SAML | How is access or identity exchanged? |
| **Experience** | Single sign-on | What does it feel like to enter several apps? |

- The topics **overlap by design** — "auth type" is not one single category.
- e.g. OIDC can issue a **JWT**, establish a **cookie-based session**, and enable **SSO** — all at once.

---

## 🗺️ What this chapter covers

| # | Concept | What kind of thing it is |
|---|---|---|
| 1 | [Basic auth](/authentication/basic-auth) | HTTP authentication scheme |
| 2 | [Digest auth](/authentication/digest-auth) | HTTP challenge–response scheme |
| 3 | [API keys](/authentication/api-keys) | Application / project credential |
| 4 | [Sessions & cookies](/authentication/sessions-and-cookies) | Server-side login state |
| 5 | [Bearer tokens](/authentication/bearer-tokens) | Token presentation scheme |
| 6 | [JWTs](/authentication/jwt) | Token format |
| 7 | [Access & refresh tokens](/authentication/access-and-refresh-tokens) | Token lifecycle pattern |
| 8 | [OAuth 2.0](/authentication/oauth-2) | Authorization framework |
| 9 | [OpenID Connect](/authentication/openid-connect) | Authentication protocol on OAuth 2.0 |
| 10 | [Single sign-on](/authentication/single-sign-on) | Sign-in experience / pattern |
| 11 | [SAML 2.0](/authentication/saml) | Federated identity protocol |

---

## 🧾 Cheat sheet

| | Question it answers | Fails with |
|---|---|---|
| **Authentication** | Who is making this request? | `401` |
| **Authorization** | What may this identity do? | `403` |

---

## 🔑 Key takeaways

- Authentication = **who**; authorization = **what they may do**.
- A login never means access to everything — permission is checked per action.
- `401` = identity check failed; `403` = identity known, permission missing.
- JWT is a **format**, OAuth / OIDC / SAML are **protocols**, SSO is an **experience** — they combine.

---

## 📚 Read more

- [Authorization · OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [REST security · OWASP](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html)
- 🎬 [Video chapter · 1:30](https://www.youtube.com/watch?v=iX8g4LqF8p8&t=90s)
