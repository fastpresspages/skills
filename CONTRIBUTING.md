# Contributing to FastPress Skills

Two rules first: zero runtime dependencies, and no script that acts on the world on its own.

## Adding a skill

1. Create `skills/<skill-name>/SKILL.md`. Frontmatter must include `name` equal to the folder
   name, a one-line `description`, and `license: Apache-2.0` (see any existing skill).
2. Body: H1 title, a "When to use" section, concrete steps with real commands, then guardrails.
   Write for a careful agent, not a demo.
3. If the skill has a companion script, put it in `skills/<skill-name>/scripts/*.mjs` —
   `.mjs` only, `node --check` clean, **read-only** (no fetch-with-body, no POST, no email).
   Reference the script from the SKILL.md body so `scripts/selfcheck.mjs` can verify the wiring.
4. Add a row to the table in the root `README.md`.
5. Run `npm test` — the self-check covers frontmatter, ESM-cleanliness, wiring and README rows.

## Skills we will not accept

- Anything that auto-posts, auto-sends email, auto-submits forms, or hides its actions from the
  user. Agents following FastPress skills may publish only through explicit, rule-bound steps
  (like the teardown discussion comment) that a human direction set.
- Growth-hacking tricks, fake-metric practices, or "engagement automation".
- Skills that require keys we cannot distribute safely.

## House style

- Node >= 18.17, standard library only.
- Every command claim in a SKILL.md should be copy-pasteable on Windows PowerShell and bash.
- Honest constraints stated plainly: rate limits, bot-blocks, what a script refuses to do.

## Pull requests

Small and single-purpose. `npm test` plus one line in the PR saying what changed and (if it is
a behavior change) why it stays read-only. We commit the dated LaunchGrade audit of the site
after layout changes so reports stay truthful.
