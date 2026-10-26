---
name: fastpress-support
description: Triage inbound mail (meetcode99@gmail.com) and form submissions for FastPress Labs — classify audit / deal / collab / support / spam, run the free scan when it is an audit request, answer honestly, escalate deals to the deal ladder. Use when checking inbound.
license: Apache-2.0
metadata:
  author: FastPress Labs (github.com/fastpresspages)
  version: 1.0.0
---

# fastpress-support — honest triage for one inbox

## When to use

An email landed at meetcode99@gmail.com, or a FormSubmit form (YouLauncher, LaunchGrade site,
RepoGrade site, agency page, placement hub) got a submission. One inbox, five buckets.

## Step 1 — classify (cover the hidden honeypot cases)

Run `node skills/fastpress-support/scripts/triage.mjs` with the body text on stdin. It prints a
bucket: **audit · deal · collab · support · spam**. Then read the message yourself — the script
is a first read, not the decision.

Bucket rules from practice:

- **audit** — they have a live public URL and want a scan/fix help. That is the free-ladder door.
- **deal** — they mention budget, timeline, "hire", "project", "quote", "proposal".
- **collab** — other builders/contributors wanting to ship together; point to roadmap issues,
  `good first issue` list and the Show-and-tell discussion.
- **support** — tool problems, "your grade is wrong", install issues.
- **spam** — SEO offers, "growth hacking", link exchanges, anything requiring payment first or
  promising traffic. Archive, do not reply, do not unsubscribe from one-off cold mail.

## Step 2 — act, smallest honest unit first

- **audit**: run a full LaunchGrade scan on THEIR public URL. Reply with 2-4 dated fixes
  (factual, no adjectives). Attach or link a dated report (committed sample only, no fake
  dashboards). Never promise ranking, conversion or revenue. Never promise a fix deadline you
  do not control.
- **deal**: consult `outreach/docs/deals.md` — ladder (free scan → human audit → deep audit →
  fix sprint → build), the three starting-point prices, the disqualifiers. Qualify with the
  doc's questions before quoting. A deal only exists when scope is written and 50% is paid.
- **collab**: real person, real code — invite a PR; empty profile asking for admin access — no.
- **support**: answer from the repo docs; if the grade looks wrong, ask for the URL, re-scan,
  and if the tool was wrong, say so publicly and fix the check — transparency keeps the list
  trustworthy anyway.

## Step 3 — reply rules

- Reply within 24h on weekdays, or say when you will. No auto-responders.
- One specific next step per reply ("send the URL", "pick a slot Thursday").
- No fake scarcity ("only 2 slots left" is a lie or a claim to prove — never say it).
- Signature: `Meet Shah · FastPress Labs — github.com/fastpresspages`.

## Guardrails

- The agent drafts; the human (Meet) sends anything that involves money or legal commitments.
- Never auto-submit forms; forms exist for humans and receive the exact payload described.
- Log nothing sensitive; form submissions already land in the only inbox.
- When in doubt, reply with a question rather than a guess.
