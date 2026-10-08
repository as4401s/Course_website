---
title: Glossary & Sources
description: Plain-English definitions of the jargon, plus the video and the primary references behind this chapter.
icon: 📚
---

## 🎯 In one line

No jargon left behind — every term in one place, plus where to read more.

---

## 🔤 Glossary

| Term | Plain English |
|---|---|
| **Claim** | A statement in a token, such as who it refers to, who issued it, or when it expires. |
| **Client** | The software requesting access: a browser app, mobile app, script, or backend. |
| **CSRF** | A malicious site tricks a browser into sending an unwanted request with automatically attached credentials, often cookies. |
| **Federation** | An application relies on another trusted system's identity result instead of performing all authentication itself. |
| **Identity provider (IdP)** | A trusted system that authenticates people and supplies identity information to applications. |
| **Issuer & audience** | The issuer is the trusted party that created a token. The audience is the application or API it is intended for. |
| **Nonce** | A value that helps tie a message to a particular challenge or login attempt and detect reuse. |
| **Opaque token** | A token whose contents the receiving application cannot usefully read; a trusted lookup can supply its meaning. |
| **PKCE** | Proof Key for Code Exchange: the client starts with a challenge and later proves it has the matching verifier. |
| **Scope** | A named limit on granted access, such as permission to read a calendar. |
| **Signature** | A cryptographic integrity check. It helps a receiver detect tampering and verify the trusted signing party. |
| **State** | A random value used to link an authorization response to the login transaction that your app started. |

---

## 🎬 The video

- This chapter is an illustrated companion to [7 Authentication Concepts Every Developer Should Know](https://www.youtube.com/watch?v=iX8g4LqF8p8) by Hayk Simonyan.
- The author's [companion article](https://hayksimonyan.substack.com/p/7-authentication-concepts-every-developer) covers the same ground in text.
- All diagrams are **original teaching illustrations**; the video's screenshots informed their dark style.

| Time | Topic | Page |
|---|---|---|
| [1:30](https://www.youtube.com/watch?v=iX8g4LqF8p8&t=90s) | Authentication | [The Big Picture](/authentication/the-big-picture) |
| [2:53](https://www.youtube.com/watch?v=iX8g4LqF8p8&t=173s) | Basic | [Basic Authentication](/authentication/basic-auth) |
| [4:26](https://www.youtube.com/watch?v=iX8g4LqF8p8&t=266s) | Digest | [Digest Authentication](/authentication/digest-auth) |
| [6:12](https://www.youtube.com/watch?v=iX8g4LqF8p8&t=372s) | API keys | [API Keys](/authentication/api-keys) |
| [8:16](https://www.youtube.com/watch?v=iX8g4LqF8p8&t=496s) | Sessions | [Sessions & Cookies](/authentication/sessions-and-cookies) |
| [10:00](https://www.youtube.com/watch?v=iX8g4LqF8p8&t=600s) | Bearer / JWT | [Bearer Tokens](/authentication/bearer-tokens) · [JWTs](/authentication/jwt) |
| [12:54](https://www.youtube.com/watch?v=iX8g4LqF8p8&t=774s) | Access / refresh | [Access & Refresh Tokens](/authentication/access-and-refresh-tokens) |
| [14:38](https://www.youtube.com/watch?v=iX8g4LqF8p8&t=878s) | OAuth 2.0 | [OAuth 2.0](/authentication/oauth-2) |
| [16:14](https://www.youtube.com/watch?v=iX8g4LqF8p8&t=974s) | OIDC | [OpenID Connect](/authentication/openid-connect) |
| [17:41](https://www.youtube.com/watch?v=iX8g4LqF8p8&t=1061s) | SSO | [Single Sign-On](/authentication/single-sign-on) |
| [19:05](https://www.youtube.com/watch?v=iX8g4LqF8p8&t=1145s) | Identity protocols | [SAML 2.0](/authentication/saml) |
| [20:44](https://www.youtube.com/watch?v=iX8g4LqF8p8&t=1244s) | Authorization | [The Big Picture](/authentication/the-big-picture) |

> 📌 **How this was checked:** coverage was matched against the video's introduction and published chapter list — automated analysis only returned the first 47 seconds, so this is **not** a full-transcript reproduction. Protocol explanations and the added implementation notes were checked against the primary references below. Prepared 8 October 2026.

---

## 📚 Primary references

### HTTP schemes & API keys

- [HTTP Basic · RFC 7617](https://www.rfc-editor.org/rfc/rfc7617.html)
- [HTTP Digest · RFC 7616](https://www.rfc-editor.org/rfc/rfc7616.html)
- [API keys · Google Cloud](https://docs.cloud.google.com/docs/authentication/api-keys)
- [REST security · OWASP](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html)

### Sessions

- [Session management · OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- [CSRF prevention · OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)

### Tokens

- [Bearer tokens · RFC 6750](https://www.rfc-editor.org/rfc/rfc6750.html)
- [Token introspection · RFC 7662](https://www.rfc-editor.org/rfc/rfc7662.html)
- [JSON Web Token · RFC 7519](https://www.rfc-editor.org/rfc/rfc7519.html)
- [JWT validation · RFC 8725](https://www.rfc-editor.org/rfc/rfc8725.html)
- [Token revocation · RFC 7009](https://www.rfc-editor.org/rfc/rfc7009.html)

### OAuth & OpenID Connect

- [OAuth 2.0 · RFC 6749](https://www.rfc-editor.org/rfc/rfc6749.html)
- [PKCE · RFC 7636](https://www.rfc-editor.org/rfc/rfc7636.html)
- [OAuth security · RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.html)
- [OpenID Connect Core · OpenID Foundation](https://openid.net/specs/openid-connect-core-1_0.html)
- [OpenID Connect · Google](https://developers.google.com/identity/openid-connect/openid-connect)

### SSO & SAML

- [Single sign-on · Microsoft](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/what-is-single-sign-on)
- [SAML 2.0 overview · OASIS](https://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html)
- [SAML security · OWASP](https://cheatsheetseries.owasp.org/cheatsheets/SAML_Security_Cheat_Sheet.html)

### Authorization

- [Authorization · OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)

---

## 🔑 Key takeaways

- Look up any term here — each is defined in one plain-English line.
- RFCs and OWASP cheat sheets are the **primary** sources; the video is the friendly entry point.
- Each concept page links back to its exact video chapter.
