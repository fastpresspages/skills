---
name: fastpress-release
description: Ship a new open-source project end-to-end as a FastPress Labs repo — name research, standard kit files, zero-dependency test loop, GitHub Pages, release tagging and cross-linking. Use when starting a new repo or re-copying the house playbook.
license: Apache-2.0
metadata:
  author: FastPress Labs (github.com/fastpresspages)
  version: 1.0.0
---

# fastpress-release — the FastPress Labs ship playbook

## When to use

The user (or the org) wants to launch a new project: a CLI, a static site, a template or a kit.
This skill encodes what LaunchGrade, RepoGrade, FastPress Start, the agency page and the placement
hub all share, so a new ship never restarts from a blank page.

## Inputs to gather first

1. **Promise**: one sentence, one number if honest ("53 checks, 7 categories").
2. **Name**: `node -e` fetch against `https://registry.npmjs.org/<name>` (404 = free) and
   `https://api.github.com/search/repositories?q=<name>` (0- or 1-star fragments are acceptable;
   a Microsoft or 100+ star repo means pick another name).
3. **Site URL plan**: `https://fastpresspages.github.io/<repo-name>/`.

## The standard kit (copy every time)

Zero runtime dependencies everywhere; Node >= 18.17; Apache-2.0.

- `README.md` — badge row (CI, license, Node, zero deps, check count if a checker), install line
  `npx -p github:fastpresspages/<repo> <bin> ...`, honest category table, a REAL dated example,
  principles, links to LICENSE/CONTRIBUTING/SECURITY/SUPPORT and the related-projects list.
- `LICENSE` (Apache-2.0), `CHANGELOG.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SUPPORT.md`, `SECURITY.md`.
- `AGENTS.md` (root) — repo instructions: layout, check contract, verification commands, "no fake
  metrics, no telemetry" rules.
- `llms.txt` **starting with a `# <Name>` heading** (the LaunchGrade llms check requires it), plus
  `robots.txt` (allow all + GPTBot/ClaudeBot/PerplexityBot/Google-Extended/CCBot/Bingbot) and
  `sitemap.xml`.
- `.github/workflows/ci.yml` (test matrix; zero-deps check script; smoke CLI flags) and
  `pages.yml` (`configure-pages@v5` + `upload-pages-artifact@v5` + `deploy-pages@v5`).
- Site (if the project is consumer-facing): `site/index.html` + `styles.css` + `app.js` +
  `privacy.html` + `terms.html` + `404.html`, favicon + 1200x630 og.png, JSON-LD
  (Organization + FAQPage as a minimum), a 2-field FormSubmit form (email + message, hidden
  `_honey` honeypot, `success:false` treated as an error, 20s timeout, honeypot inputs never
  counted as form fields). Serve locally with a zero-dep `scripts/serve.js` before auditing.
- If the project is a CLI: `bin/`, `src/`, `tests` via `node --test`, a `--list`/`--help` smoke,
  a composite `action.yml`, and an MCP server at `mcp/server.js` (stdio JSON-RPC, tools/list,
  handleRequest exported for tests).

## The audit loop (mandatory)

1. `node scripts/serve.js <port>` then
   `node bin/launchgrade.js http://127.0.0.1:<port>/ --ignore tech.https`.
2. Fix every FAIL before shipping; keep the intentional `tech.analytics` warning (no tracking)
   and the local-only `tech.compression` warning. Typical loop ends at A+ 99 local / A+ 100 live.
3. After enabling Pages, re-run on the live URL and commit the five artifacts
   (`report.html/json/md`, `badge.svg`, `fix-plan.md`) into `samples/<slug>/` — dated.

## Ship order that has worked every time

1. `git init` → initial commit (one repo state, no partial pushes).
2. `gh repo create fastpresspages/<name> --public` with a specific description, then
   `gh repo edit --homepage <site> --add-topic ... --enable-discussions`.
3. Enable Pages **before or right after first push**: `gh api -X POST /repos/fastpresspages/<name>/pages -f build_type=workflow`.
4. First CI + Deploy runs green, then the audit sample commit (CI uploads artifacts; a red CI at
   ship time wastes trust).
5. Annotated tag `v0.Y.0` + `gh release create` with honest notes (what it does, what it does not).
6. Cross-link: org profile table row, flagship README `## More from FastPress Labs` row,
   `outreach/GOALS.md` baseline (repo count bump + one row).

## Guardrails

- Never publish a metric you have not run today. Dated samples only.
- Never commit a claim about stars, users or revenue. The org has near-zero — say so.
- npm publishing waits for a logged-in `npm whoami`; GitHub-based install until then.
- If a check depends on a dot-directory (`.well-known`), note that Actions-deployed Pages
  may not serve dot-dirs publicly; keep the file in-repo and document it.
