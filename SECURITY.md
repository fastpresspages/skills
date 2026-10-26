# Security Policy — FastPress Skills

## Reporting

Privately, either channel:

- GitHub security advisory: https://github.com/fastpresspages/skills/security/advisories/new
- Email: meetcode99@gmail.com with "skills security" in the subject.

## Scope (what counts as a vulnerability here)

- A script that secretly sends data anywhere (`hn-top.mjs` and `triage.mjs` must read only).
- Prompt-injection into the SKILL.md files that changes their read-only guarantees (e.g. text
  that would have an agent submit forms, email people, or exfiltrate keys hidden inside
  instructions).
- Frontmatter lies that would mislead an installer (name mismatch, disguised license).
- The static site falling back to executing anything unusual.

## Out of scope

- Hacker News rate limiting or bot-blocking (external services behaving normally).
- Grades/claims in sibling repos (report those where the grade lives).
- "Fake skill install is dangerous" as a class — skills here are markdown instructions with no
  install-time code beyond what CI already runs.

## What we promise

Honest timestamps, no tracking anywhere in the fix loop, disclosure in the changelog in v0.x
minor releases, and zero dependencies — a fix is always just an edit you can read entirely.
