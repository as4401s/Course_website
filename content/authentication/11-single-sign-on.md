---
title: Single Sign-On (SSO)
description: Sign in once at a shared identity provider, then move between connected apps.
icon: 🚪
---

![Single sign-on across two apps: opening App A sends the browser to the identity provider where the user signs in, and App A gets its own session; later, opening App B sends the browser to the same provider, which recognises the existing session and usually completes sign-in without a new prompt, giving App B its own separate session and permissions. A simplified logical flow; redirects travel through the browser.](/images/authentication/sso.svg)

## 🎯 In one line

Sign in at a **shared identity provider**, then move between connected apps.

> 💡 **Think of it as:** one identity check lets you enter several offices, each with its own access rules.

---

## ⚙️ How it works

1. App A **delegates login** to the shared identity provider. The user signs in there.
2. App B later sends the browser to the **same provider**, which can **reuse its existing login session**.
3. The provider issues an **app-specific result**.
   - Each app establishes its **own session**.
   - Each app enforces its **own permissions**.

### Example

```text
One provider session → separate, app-specific sign-in results
```

- SSO is the **outcome people experience**, rather than a single wire protocol.

> ⚠️ **SSO is not one shared cookie.** It commonly uses OIDC or SAML. It does not mean every app shares one cookie or token; policy can still require reauthentication.

---

## ⚖️ Pros & cons

### ✅ Pros

- Fewer repeated logins and fewer app-specific passwords.
- Central **identity and MFA policies** can serve many applications.

### ❌ Cons

- Provider compromise or outages can affect **several apps** at once.
- Logout, account provisioning, and ending existing app sessions need coordination.

---

## 🧾 Cheat sheet

| Question | Single sign-on |
|---|---|
| **Kind** | Sign-in experience / pattern |
| **What is presented?** | App-specific OIDC / SAML result |
| **Main benefit** | One login across apps |
| **Main trade-off** | Central dependency; logout coordination |
| **Typical fit** | Organizations with several internal tools or connected SaaS applications |

---

## 🔑 Key takeaways

- SSO is an **experience**, not a protocol — usually built on OIDC or SAML.
- One **provider** session, but each app keeps its **own** session and permissions.
- Central MFA and identity policies cover many apps.
- Downside: one provider outage or compromise hits every connected app.

---

## 📚 Read more

- [Single sign-on · Microsoft](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/what-is-single-sign-on)
- [OpenID Connect Core · OpenID Foundation](https://openid.net/specs/openid-connect-core-1_0.html)
- [SAML 2.0 overview · OASIS](https://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html)
- 🎬 [Video chapter · 17:41](https://www.youtube.com/watch?v=iX8g4LqF8p8&t=1061s)
