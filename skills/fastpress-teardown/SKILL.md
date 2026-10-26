---
name: fastpress-teardown
description: Run a weekly public field-scan series — find fresh launches, grade them with LaunchGrade, publish honest teardowns with a removal-on-request policy, and re-scan later with --compare. Use on scan days or when the user asks for public teardowns.
license: Apache-2.0
metadata:
  author: FastPress Labs (github.com/fastpresspages)
  version: 1.0.0
---

# fastpress-teardown — field scans without rug-pulls

## When to use

- Weekly or biweekly scan day (the first series shipped 24 Oct 2026: Permit B- 73, Swurf C+ 65,
  Corgi D+ 53, Impossible Machines D+ 54 — all dated, all public, all linked to their HN threads).
- Anyone asks for public teardowns of launch pages.

## Step 1 — pick fresh targets (zero-dependency picker)

Run `node skills/fastpress-teardown/scripts/hn-top.mjs` from this repo (it needs no auth):

- Fetches Hacker News `showstories.json` from the Firebase API (public, no key).
- Resolves up to 12 items in parallel, prints `id · points · url · title` sorted by points.
- Pick 3-5 **public landing pages** (skip accounts, docs, YouTube). Points do not matter for a
  good teardown; being public does.

## Step 2 — grade, time-boxed

Full scans only (`--fast` hides the agent category):

```
cd C:\Users\shahm\Projects\fastpresspages\launchgrade
node bin/launchgrade.js <url> -o ..\outreach\docs\teardowns\<slug>
node bin/launchgrade.js <url> -o ..\launchgrade\site\teardowns\<slug>   # or copy the dir
```

Prefer pages whose owners show in the thread; a Show HN launch with 50+ comments is fair game,
a personal blog with no discussion thread is not.

## Step 3 — publish the honest way

Update `outreach/docs/teardowns.md` (table + an open selection-bias note each time) and the
standalone index `launchgrade/site/teardowns/index.html`. Copy full artifact sets
(`report.html/json/md`, `badge.svg`, `fix-plan.md`). Post one comment in the Show-and-tell
discussion (launchgrade #7) leading with **strengths**, then a small table, then the pattern
(what repeats across the batch), then the removal offer.

## Etiquette rules (non-negotiable)

- Public pages only. Never email, DM or @-mention the author uninvited.
- Lead with what works. Grades state facts ("Trust 38: no privacy policy"), not insults.
- Corrections or removal requests are honored within a day; the committed removal policy page
  says so. Never edit a published grade to look nicer — if a scan is wrong, publish the fix,
  do not hide it.
- The selection-bias note is a feature, not a bug: we scan fresh Show HN launches because we
  can see them launch. State it every batch.

## Step 4 — the re-scan (1-2 weeks later)

`node bin/launchgrade.js <url> --compare samples/teardowns/<slug>/report.json` produces a dated
before/after. Publish improvements loudly when they happen — owners who fix the top fix get a
public thank-you, and that is the only "marketing" this line of work needs.

## Guardrails

- Never archive or re-point URLs to keep old scores; add dated new scans instead.
- No author tracking, no personal details in teardowns; the site URL is the subject.
- If asked to take a teardown down: take it down, note "removed at author request" in the table.
