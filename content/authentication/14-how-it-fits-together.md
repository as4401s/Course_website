---
title: How It Fits Together
description: One practical combination — OIDC for sign-in, a session cookie for the browser, access tokens for APIs, and SSO across tools.
icon: 🧱
---

![One app using several of these together: the browser signs in via OIDC at a shared identity provider; the app backend creates a session cookie, keeps access tokens server-side and uses an access token to call a protected API; other apps can reuse the identity provider session for SSO. An illustrative architecture — the detailed browser redirects are on the OpenID Connect page.](/images/authentication/fits-together.svg)

## 🎯 In one line

One app can use **several** of these at once — each piece does a **different job**.

---

## 🏢 The scenario

- Imagine an **internal portal** with several tools.
- **OIDC** handles sign-in.
- A **session cookie** keeps the browser signed in.
- An **access token** authorizes backend API calls.
- Other tools reuse the provider's login session → **SSO**.

---

## 🧩 Which piece does which job

| Job | Piece | Details |
|---|---|---|
| Sign the user in | OpenID Connect | [OIDC](/authentication/openid-connect) |
| Keep the browser signed in | Session cookie | [Sessions & cookies](/authentication/sessions-and-cookies) |
| Authorize backend API calls | Access (bearer) token | [Bearer tokens](/authentication/bearer-tokens) |
| One login across tools | Single sign-on | [SSO](/authentication/single-sign-on) |

---

## 👥 Two points of view

| Point of view | What happens |
|---|---|
| **The person** | Signs in at the shared identity provider and moves between connected tools — that experience is **SSO**. |
| **The application** | Verifies the identity result, maintains its **own session**, and checks permission for each protected action. It can keep API tokens on its **backend**. |

> 📌 This is **one possible design** — a mobile app or service integration may use a different combination.

---

## 🔑 Key takeaways

- Real systems **combine** methods; each one solves one job.
- The browser holds a **session cookie**; API tokens can stay on the **backend**.
- SSO is what the person *feels*; OIDC + sessions are how the app *delivers* it.
- Every app still checks **permission** for each protected action.
