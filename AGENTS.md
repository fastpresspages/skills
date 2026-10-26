# AGENTS.md — instructions for machine and human contributors

## What this repo is

FastPress Skills: three installable agent skills under
`skills/fastpress-release/`, `skills/fastpress-teardown/`, `skills/fastpress-support/`
(each a folder with `SKILL.md`), plus two companion scripts:

- `skills/fastpress-teardown/scripts/hn-top.mjs` — read-only Hacker News Show-HN picker.
- `skills/fastpress-support/scripts/triage.mjs` — stdin bucket classifier (audit/deal/collab/support/spam).

`scripts/selfcheck.mjs` validates frontmatter, wiring and README consistency (`npm test`).
The public site lives in `site/` (GitHub Pages, workflow deploy from that directory).

## Hard rules

- Never invent metrics (stars, users, downloads, deals). Dated facts only, sourced to a real file.
- Scripts are READ-ONLY by design. Never add auto-posting, auto-emailing or form auto-submission to a script. Agents following the skills may publish only through the rules written in the SKILL.md files.
- Frontmatter `name` must equal the folder name (skills.sh contract).
- No `require(` in any script — the kit is explicit ESM (`.mjs`).
- Site audit loop before merging site-structure changes: local audit with LaunchGrade
  (`node bin/launchgrade.js http://127.0.0.1:<port>/ --ignore tech.https` from the launchgrade repo),
  fix all FAILs, keep the honest `tech.analytics` warning (no analytics is a feature).

## Public facts (do not drift)

- Org: github.com/fastpresspages — check the org profile README for the current repo count; do not hardcode one here.
- Contact: meetcode99@gmail.com — agents draft, humans send money/legal things.
- License: Apache-2.0 everywhere.

## Verify kit changes

```bash
npm test                                                # selfcheck: frontmatter + wiring + README
node --check skills/fastpress-teardown/scripts/hn-top.mjs
node --check skills/fastpress-support/scripts/triage.mjs
echo "Can you audit my landing page at https://example.co?" | node skills/fastpress-support/scripts/triage.mjs
```

## Verify site changes

```bash
node scripts/serve.js 4176                              # from site/"
# from ../launchgrade:
node bin/launchgrade.js http://127.0.0.1:4176/ --ignore tech.https
```
