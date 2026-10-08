---
title: API Keys
description: A service presents a key issued to an application, project or account — easy for scripts, risky when leaked.
icon: 🗝️
---

![API keys: your backend calls the API gateway with an X-API-Key header, the gateway checks the key in a key registry (active? correct API? allowed caller?), gets back the account or project and its restrictions, applies permissions, quotas and rate limits, then returns data or rejects. Read the numbered steps top to bottom.](/images/authentication/api-keys.svg)

## 🎯 In one line

A service presents a **key** issued to an application, project, or account.

> 💡 **Think of it as:** a membership key tells the service which account is calling.

---

## ⚙️ How it works

1. An operator **creates a key** and configures any supported restrictions.
2. Your **backend sends the key** on API requests, usually in a header.
3. The API **maps it to an account or project**, checks restrictions, and applies its access and usage rules.
   - e.g. permissions, quotas and rate limits.

### Example

```http
X-API-Key: <key-issued-by-provider>
```

- Example header, **not** a universal standard — each provider picks its own.

> ⚠️ **Keep secret API keys on the backend.** Some browser APIs use intentionally public, restricted keys — those do **not** prove user identity.

---

## ⚖️ Pros & cons

### ✅ Pros

- Easy for scripts and service integrations.
- Supports per-project **quotas, billing, and key revocation** where provided.

### ❌ Cons

- A leaked secret key can be reused until it is restricted, revoked, or expired.
- A key often identifies a **project, not the person** using it; capabilities vary.

---

## 🧾 Cheat sheet

| Question | API keys |
|---|---|
| **Kind** | Application / project credential |
| **What is presented?** | Provider-issued key |
| **Main benefit** | Easy service integration |
| **Main trade-off** | Secret leakage; often long-lived |
| **Typical fit** | Backend integrations, scripts, usage tracking, and APIs designed around keys |

---

## 🔑 Key takeaways

- An API key identifies the **calling app or project** — usually not the person.
- Secret keys belong on the **backend**, never in the browser.
- A leaked key works for anyone until it is **restricted, revoked or expired**.
- Providers use keys for **quotas, billing and rate limits**.

---

## 📚 Read more

- [API keys · Google Cloud](https://docs.cloud.google.com/docs/authentication/api-keys)
- [REST security · OWASP](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html)
- 🎬 [Video chapter · 6:12](https://www.youtube.com/watch?v=iX8g4LqF8p8&t=372s)
