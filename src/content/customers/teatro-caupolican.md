---
customer: Teatro Caupolican
testimonial: "We used to lose a certificate a quarter to someone's forgotten calendar reminder, and since moving to Navy we haven't had a single one expire."
ctaTitle: How Halvik stopped losing certificates to expiry
partnership: Halvik's security engineering team adopted Navy in 2023 to cover certificates, DNS and ingestion endpoints.
about: Halvik builds security operations software used by large enterprises to detect and investigate threats. Its customers send log data around the clock, so ingestion endpoints and certificates have to stay valid and reachable.
challengesAndSolutions:
  - title: "Challenge"
    content: "Halvik managed more than 600 certificates across customer ingestion endpoints. Renewals were tracked in spreadsheets, and an expired certificate meant a customer's logs stopped arriving."
  - title: "Solution"
    content: "The team added Navy SSL expiry monitors for every endpoint, with alerts at 30, 14 and 3 days, plus DNS monitors to catch record changes and TCP checks on ingestion ports."
results:
  - "Zero certificate expiries in the 18 months since rollout"
  - "More than 600 certificates monitored automatically from a single YAML file"
  - "DNS misconfigurations caught an average of 40 minutes before customer impact"
details:
  Industry: "Recintos"
  Location: "Santiago, Chile"
  Employees: "1000+"
  Identity Provider: "Microsoft Entra ID"
  Workloads: "SSL Certificates, DNS, Log Ingestion Endpoints"
logo:
  url: "/src/images/customers/teatro-caupolican.png"
  alt: "Halvik logo"
published: true
---

## Keeping certificates valid at Halvik

**A spreadsheet that kept failing**

Halvik's customers send security logs to dedicated ingestion endpoints, each with its own certificate. For years, renewals lived in a shared spreadsheet and a set of calendar reminders. A few times a year, one slipped. When it did, a customer's logs stopped arriving until someone noticed.

**Every certificate, checked every day**

The security engineering team generated a Navy config file from their certificate inventory and committed it to the infrastructure repository. Each endpoint now has an SSL expiry monitor with alerts at 30, 14 and 3 days. New endpoints get a monitor automatically when the CLI runs in their deploy pipeline.

**Catching DNS and port issues early**

Alongside certificates, the team added DNS monitors that alert when a record changes unexpectedly and TCP monitors on the ingestion ports. Alerts route to a dedicated Slack channel during the day and escalate to PagerDuty after hours through an on-call schedule.

**Private status pages per customer**

Large customers asked for visibility into their own ingestion endpoints. Halvik now gives each of them a private status page with 90-day uptime bars and scheduled maintenance windows, so planned work is never a surprise.

### **Details:**

- **Industry:** Cybersecurity
- **Location:** Foster City, California
- **Employees:** 1000+
- **Identity Provider:** Microsoft Entra ID
- **Key Workloads:** SSL Certificates, DNS, Log Ingestion Endpoints

Eighteen months later, Halvik has not had a single certificate expire in production. The spreadsheet is gone, and renewals are handled days or weeks ahead of time instead of in a rush.
