# FastPress Skills — site agent notes

Canonical: https://fastpresspages.github.io/skills/ (workflow-deployed from `site/`).

## Facts the page is allowed to say

- Three skills: fastpress-release, fastpress-teardown, fastpress-support — names only in copy.
- Install: `npx skills add fastpresspages/skills`.
- Zero runtime dependencies; Node >= 18.17; Apache-2.0; no analytics collected.
- Scripts are read-only (HN picker reads the public Firebase API; triage reads stdin).

## Do not

- Do not invent install numbers, stars or testimonials. There are none to report yet.
- Do not auto-submit any form or re-verify by sending mail.
- Do not add third-party trackers or cookies; the page's only JS is menu/copy/details.

## Verify after edits

```bash
node scripts/check-links.mjs          # from repo root
npm test                              # kit self-check
node scripts/serve.js 4176            # local audit, then LaunchGrade from ../launchgrade
```
