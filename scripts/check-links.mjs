// check-links.mjs — verify every internal href/src referenced in site HTML files exists.
// Zero dependencies; run from repo root: node scripts/check-links.mjs
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const siteDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'site');
const pages = ['index.html', 'privacy.html', 'terms.html', '404.html'];

let total = 0;
let bad = 0;

for (const page of pages) {
  const file = path.join(siteDir, page);
  const html = readFileSync(file, 'utf8');
  const refs = [...html.matchAll(/(?:href|src)="([^"#]+?)(?:#[^"]*)?"/g)].map((m) => m[1]);
  for (const ref of refs) {
    if (/^(https?:)?\/\//.test(ref)) continue; // external links are documented separately
    if (/^mailto:/.test(ref)) continue;
    total += 1;
    const clean = ref.split('?')[0];
    const resolved = path.join(siteDir, clean);
    if (!existsSync(resolved)) {
      bad += 1;
      console.log(`MISSING ${page}: ${ref}`);
    }
  }
}

console.log(`${total - bad}/${total} internal refs OK across ${pages.length} pages`);
process.exit(bad ? 1 : 0);
