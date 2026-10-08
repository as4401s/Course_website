---
title: Compare at a Glance
description: All eleven concepts side by side — what each presents, its main benefit and trade-off — plus the three kinds of token.
icon: ⚖️
---

## 🎯 In one line

These choices often **work together** — compare the *job* each one performs before choosing a technology.

---

## 🧾 What changes between the concepts?

| Concept | What is presented? | Main benefit | Main trade-off | Typical fit |
|---|---|---|---|---|
| [Basic auth](/authentication/basic-auth) | Encoded username + password | Minimal setup | Repeated password exposure | Small / legacy integrations |
| [Digest auth](/authentication/digest-auth) | Challenge-specific hash response | Password is not sent directly | Legacy complexity; weak passwords remain risky | Existing Digest systems |
| [API keys](/authentication/api-keys) | Provider-issued key | Easy service integration | Secret leakage; often long-lived | Scripts and API consumers |
| [Sessions & cookies](/authentication/sessions-and-cookies) | Opaque session ID in cookie | Central logout and session control | Session storage; CSRF defenses | Browser applications |
| [Bearer tokens](/authentication/bearer-tokens) | Token in a Bearer header | Password-free API requests | Stolen tokens can be replayed | Protected APIs |
| [JWTs](/authentication/jwt) | Signed claims, often inside a token | Local verification | Revocation and stale claims | OIDC ID tokens / some API tokens |
| [Access & refresh](/authentication/access-and-refresh-tokens) | Access token or renewal credential | Continuity with short API-token lifetimes | Refresh secrets need stronger protection | Longer-lived login experiences |
| [OAuth 2.0](/authentication/oauth-2) | Grant exchanged for an access token | Scoped delegated access | Integration complexity | Connect to another service's API |
| [OpenID Connect](/authentication/openid-connect) | Validated ID token | Standard provider-based login | Provider dependency; validation | Modern user sign-in |
| [Single sign-on](/authentication/single-sign-on) | App-specific OIDC / SAML result | One login across apps | Central dependency; logout coordination | Multi-app organizations |
| [SAML 2.0](/authentication/saml) | Validated XML assertion | Enterprise federation | XML / certificate complexity | Enterprise SSO integrations |

> 📌 This is a conceptual comparison, **not a security ranking**. Configuration, transport protection, and credential handling affect every option.

---

## 🎟️ Three tokens, three jobs

| Token | Who receives it? | What does it do? | Format |
|---|---|---|---|
| **ID token** | The client application | Communicates the user's authentication and identity claims | JWT in OIDC |
| **Access token** | The intended resource API | Represents granted API access | Opaque string or a defined structured format, often JWT |
| **Refresh token** | The authorization server | Requests a new access token | Provider-defined; often opaque |

> 💡 **Example:** after "Sign in with Google", your app reads the **ID token** to learn who signed in, sends the **access token** to the API, and uses the **refresh token** only at the token endpoint.

---

## 🔑 Key takeaways

- Most real systems **combine** several of these — see [How It Fits Together](/authentication/how-it-fits-together).
- Ask what **job** you need: prove identity, carry claims, delegate access, or one login across apps.
- ID token → **client**; access token → **API**; refresh token → **authorization server**.
- Every option still depends on transport protection (HTTPS) and careful credential handling.
