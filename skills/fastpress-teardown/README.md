---
name: fastpress-teardown-scan
description: Pick today's HN Show HN launches to scan. Fetches showstories from Firebase and prints a table of fresh landing pages with points and URLs.
---

# hn-top.mjs

Zero-dependency picker for the fastpress-teardown workflow.

## Output

One line per item: `id · points · url · title`, up to 12 items, sorted by points.

## Notes

- Uses `https://hacker-news.firebaseio.com/v0/showstories.json` (no key, no auth).
- Items without a URL or non-HTTP URLs are skipped.
- Exit code is always 0; a failed item fetch prints `?? · id` and continues.
- This tool only READS. It never posts, never emails, never comments. Publishing is a step the
  agent does through the fastpress-teardown skill's rules.
