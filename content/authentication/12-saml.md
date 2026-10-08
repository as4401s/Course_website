---
title: SAML 2.0
description: An identity provider sends a signed XML assertion that an application can trust — still common for enterprise sign-in.
icon: 🏢
---

![SAML 2.0: the browser opens a protected app, the app redirects with an AuthnRequest to the identity provider, the user authenticates, the provider returns a SAMLResponse form with a signed assertion, the browser POSTs it to the app's Assertion Consumer Service (ACS), and the app validates signature, audience, time and request link before setting its own session cookie. Read the numbered steps top to bottom.](/images/authentication/saml.svg)

## 🎯 In one line

An **identity provider** sends an **XML assertion** that an application can trust.

> 💡 **Think of it as:** a trusted office sends a signed identity letter to the service you want to enter.

---

## 🔤 The cast

| Term | Plain English |
|---|---|
| **SP** (service provider) | The application you want to enter |
| **IdP** (identity provider) | The trusted system that signs you in |
| **Assertion** | The signed XML statement about who you are |
| **ACS** (Assertion Consumer Service) | The app's endpoint that receives the response |

---

## ⚙️ How it works

1. The application (**SP**) sends a login request to the identity provider (**IdP**) through the browser.
2. After login, the IdP returns a **SAML response** containing an **assertion**.
   - The browser submits it to the app.
3. The app checks, then creates a session:
   - the trusted **signature**,
   - the intended **audience / recipient**,
   - **expiry**,
   - **request correlation** (it answers the request the app sent),
   - **replay** protection.

### Example

```xml
<saml:Assertion> … identity and conditions … </saml:Assertion>
```

- Schematic XML.
- A SAML assertion is **not** a JWT or a general-purpose API access token.

> ⚠️ **A signature alone is not enough.** SAML is still widely used — use a maintained library. A signed document must also be checked for the right recipient, timing, and request.

---

## ⚖️ Pros & cons

### ✅ Pros

- Widely integrated in **enterprise** identity systems.
- Apps can delegate authentication and receive agreed **identity attributes**.

### ❌ Cons

- XML signatures, certificates, metadata, and clock handling add complexity.
- Less natural for **mobile / API** flows; misconfigured validation is dangerous.

---

## 🧾 Cheat sheet

| Question | SAML 2.0 |
|---|---|
| **Kind** | Federated identity protocol |
| **What is presented?** | Validated XML assertion |
| **Main benefit** | Enterprise federation |
| **Main trade-off** | XML / certificate complexity |
| **Typical fit** | Enterprise SaaS and organizations whose identity integrations use SAML |

---

## 🔑 Key takeaways

- SAML = a signed **XML assertion** from the IdP, POSTed via the browser to the app's ACS.
- A valid signature is not enough — also check **recipient, timing and the original request**.
- Still common for **enterprise SSO**; less natural for mobile and API flows.
- Use a maintained library — misconfigured validation is dangerous.

---

## 📚 Read more

- [SAML 2.0 overview · OASIS](https://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html)
- [SAML security · OWASP](https://cheatsheetseries.owasp.org/cheatsheets/SAML_Security_Cheat_Sheet.html)
- 🎬 [Video chapter · 19:05](https://www.youtube.com/watch?v=iX8g4LqF8p8&t=1145s)
