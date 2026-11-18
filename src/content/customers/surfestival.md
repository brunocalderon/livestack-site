---
customer: Surfestival
testimonial: "When a carrier route slows down at 9 a.m. on a sale day, Navy tells us within a minute, and our status page tells our customers before they have to ask."
ctaTitle: How Corvane keeps message delivery visible during peak sending hours
partnership: Corvane has run its API and delivery monitoring on Navy since 2024.
about: Corvane is an SMS and email marketing platform used by thousands of retail brands. Its APIs send billions of messages a year, with most volume landing in a few short peak windows.
challengesAndSolutions:
  - title: "Challenge"
    content: "Corvane's delivery pipeline depends on dozens of internal APIs and carrier gateways. Slowdowns during peak campaigns were often reported by customers before the on-call team saw them."
  - title: "Solution"
    content: "The platform team put every public API and gateway behind Navy HTTP and keyword monitors running every 30 seconds from 18 regions, with Slack and PagerDuty alerts and a public status page for brands."
results:
  - "Median time to detect a delivery slowdown dropped from 11 minutes to under 1 minute"
  - "Support tickets during incidents fell by 64% after the public status page launched"
  - "Over 3,200 brands subscribed to status updates by email in the first quarter"
details:
  Industry: "Festivales"
  Location: "Pichilemu, Chile"
  Employees: "1000+"
  Identity Provider: "Okta"
  Workloads: "Messaging APIs, Carrier Gateways, Webhooks"
logo:
  url: "/src/images/customers/surfestival.png"
  alt: "Surfestival logo"
published: true
---

## Peak hours without surprises at Corvane

**A pipeline that cannot slow down**

Corvane sends marketing messages for retail brands, and most of that volume lands in a few hours around launches and sales. A gateway that adds two seconds of latency at the wrong time can delay millions of messages. The team needed to know about it before brands did.

**Monitoring every hop**

The platform team added Navy monitors to every public API, every carrier gateway and the webhook endpoints brands rely on. Keyword monitors check that responses contain a valid delivery receipt, not just a 200 status. Because an outage is confirmed from 3 regions before an alert goes out, the on-call engineer only gets paged when something is actually wrong.

**A status page brands trust**

Corvane now runs a public status page on its own domain. When an incident starts, the timeline is created automatically and updates go out to subscribers by email. Brands check the page first, which has cut the volume of support tickets during incidents by almost two thirds.

Today every new service at Corvane ships with Navy monitors defined in the same pull request. The team reviews response time charts in its weekly reliability meeting and writes a postmortem in Navy for every customer-facing incident.
