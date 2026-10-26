# FastPress Skills 🤖

[![CI](https://github.com/fastpresspages/skills/actions/workflows/ci.yml/badge.svg)](https://github.com/fastpresspages/skills/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](./LICENSE)
[![Node](https://img.shields.io/badge/node-%E2%89%A5%2018.17-green.svg)](./README.md)
[![Runtime deps](https://img.shields.io/badge/runtime%20deps-0-brightgreen.svg)](./README.md)

The agent-ops kit behind [FastPress Labs](https://github.com/fastpresspages). Three installable,
human-reviewed agent skills plus the tiny zero-dependency scripts they run. Install with
**skills.sh**:

```bash
npx skills add fastpresspages/skills
```

## The skills

| Skill | Use it for | Run-safe scripts |
| --- | --- | --- |
| [`fastpress-release`](./skills/fastpress-release/SKILL.md) | Ship a new project end-to-end: name research, the standard kit files, the LaunchGrade audit loop, Pages, release tag, cross-links. This is the exact playbook every FastPress repo was shipped with. | none (operational checklist) |
| [`fastpress-teardown`](./skills/fastpress-teardown/SKILL.md) | Weekly public field scans: pick fresh HN launches, grade them, publish strengths-first teardowns with a removal-on-request policy, re-scan with `--compare`. | [`scripts/hn-top.mjs`](./skills/fastpress-teardown/scripts/hn-top.mjs) — read-only HN Show-HN picker |
| [`fastpress-support`](./skills/fastpress-support/SKILL.md) | Triage the one inbox (meetcode99@gmail.com): audit / deal / collab / support / spam, honest replies, deals follow the [deal ladder](https://github.com/fastpresspages/outreach/blob/main/docs/deals.md). | [`scripts/triage.mjs`](./skills/fastpress-support/scripts/triage.mjs) — stdin classifier |

Already live elsewhere in the org: [`launchgrade`](https://github.com/fastpresspages/launchgrade/tree/main/skills/launchgrade)
(grading workflow) and [`fastpress-goals`](https://github.com/fastpresspages/outreach/tree/main/skills/fastpress-goals)
(weekly goal review). Install any of those from their own repos.

## Principles

- **Markdown is the interface.** Skills are instructions a model can follow, plus optional
  zero-dependency Node scripts (Node ≥ 18.17) it can run. No telemetry anywhere.
- **Scripts read, humans (and agents following rules) act.** The HN picker only reads; the
  triage script only reads stdin. Nothing auto-posts, auto-sends or auto-submits anything.
- **Honest constraints are strength.** The teardown skill ships with etiquette rules; the
  support skill refuses fake scarcity; the release skill refuses invented metrics.
- **Same house style as every FastPress repo.** Apache-2.0, CI-guarded, links verified.

## Try the scripts locally

```bash
node --check skills/fastpress-teardown/scripts/hn-top.mjs
node skills/fastpress-teardown/scripts/hn-top.mjs 5
node skills/fastpress-support/scripts/triage.mjs <<< "Can you audit my landing page at https://example.co?"
```

## Verify the kit

```bash
node scripts/selfcheck.mjs   # frontmatter validity + script wiring + table cross-check
```

## Related

- [LaunchGrade](https://fastpresspages.github.io/launchgrade/) — grade any launch page (54 checks).
- [RepoGrade](https://github.com/fastpresspages/repograde) — grade the repo behind the link (33 checks).
- [Org profile + press kit](https://github.com/fastpresspages).

## License

Apache-2.0. The site is a static GH Pages page; form submissions land at the org email.
