// selfcheck.mjs — verify the skills kit is coherent: frontmatter, wiring, README cross-checks.
// Exit 1 on any problem. Zero dependencies.
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let problems = 0;
const fail = (msg) => { console.error(`FAIL ${msg}`); problems += 1; };
const ok = (msg) => console.log(`ok   ${msg}`);

const skillNames = ['fastpress-release', 'fastpress-teardown', 'fastpress-support'];

for (const name of skillNames) {
  const file = path.join(root, 'skills', name, 'SKILL.md');
  if (!existsSync(file)) {
    fail(`${file} missing`);
    continue;
  }
  const raw = readFileSync(file, 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!m) { fail(`${name}: frontmatter block missing`); continue; }
  const fm = m[1];
  if (!new RegExp(`^name: ${name}$`, 'm').test(fm)) fail(`${name}: frontmatter name must equal folder name (${name})`);
  if (!/^description: (.+)$/m.test(fm)) fail(`${name}: frontmatter description missing`);
  if (!/^license: Apache-2.0$/m.test(fm)) fail(`${name}: frontmatter license must be Apache-2.0`);
  if (!/^# /.test(raw.slice(m[0].length).trimStart())) fail(`${name}: body should start with an H1`);
  const linked = [...raw.matchAll(/skills\/[\w-]+\/(scripts\/[\w.-]+\.mjs)/g)].map((x) => x[1]);
  for (const rel of linked) {
    const target = path.join(root, 'skills', name, rel);
    if (!existsSync(target)) fail(`${name}: referenced script missing: skills/${name}/${rel}`);
  }
  ok(`${name}: frontmatter + wiring`);
}

// Scripts parse in isolation (catch ESM-vs-CJS accidents).
for (const script of [
  'skills/fastpress-teardown/scripts/hn-top.mjs',
  'skills/fastpress-support/scripts/triage.mjs'
]) {
  const file = path.join(root, script);
  if (!existsSync(file)) { fail(`${script} missing`); continue; }
  if (!/\.mjs$/.test(script)) fail(`${script} must be .mjs (explicit ESM)`);
  if (/\brequire\(/.test(readFileSync(file, 'utf8'))) fail(`${script} must not use require`);
  ok(`${script}: ESM-clean`);
}

// README table rows must match the skill list.
const readme = readFileSync(path.join(root, 'README.md'), 'utf8');
for (const name of skillNames) {
  if (!readme.includes(`./skills/${name}/SKILL.md`)) fail(`README table row for ${name} missing`);
}
if (!readme.includes('npx skills add fastpresspages/skills')) fail('README install line missing');
ok('README: install line + table rows');

if (problems) {
  console.error(`\n${problems} problem${problems === 1 ? '' : 's'}.`);
  process.exit(1);
}
console.log('\nSelf-check passed: 3 skills wired, scripts ESM-clean, README consistent.');
