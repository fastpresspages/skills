// triage.mjs — zero-dependency first-read classifier for the FastPress Labs inbox.
// Usage: node skills/fastpress-support/scripts/triage.mjs  (message text on stdin)
// Reads only. It ranks buckets; a human decides what to actually send.
const stdin = await new Promise((resolve) => {
  let d = '';
  if (process.stdin.isTTY) return resolve('');
  process.stdin.on('data', (c) => { d += c; });
  process.stdin.on('end', () => resolve(d));
  setTimeout(() => resolve(d), 3000); // do not hang on a missing end event
});

const t = String(stdin).toLowerCase();

const buckets = {
  audit: ['my site', 'my landing', 'audit', 'grade', 'scan my', 'review my site', 'launch page', 'my webpage', 'my page'],
  deal: ['budget', 'quote', 'hire', 'proposal', 'paid', 'price', 'invoice', 'timeline', 'contract', 'retainer', 'how much'],
  collab: ['collab', 'open source together', 'co-maintain', 'contribute', 'join the team', 'partnership', 'integration'],
  support: ['bug', 'broken', 'error', 'install', 'how do i', 'wrong score', 'false', 'not working', 'help me with'],
  spam: ['seo services', 'backlinks', 'growth hacking', 'traffic boost', 'guest post offer', 'for a small fee', 'unfair advantage', 'crypto signal', 'link exchange']
};

let best = 'support'; // safe default: answer the human
let bestScore = 0;
const reasons = [];
for (const [name, words] of Object.entries(buckets)) {
  let score = 0;
  const hits = [];
  for (const w of words) {
    const count = t.split(w).length - 1;
    if (count > 0) {
      score += count;
      hits.push(w);
    }
  }
  if (score > 0) reasons.push(`${name}(${hits.join(', ')})`);
  if (score > bestScore) {
    bestScore = score;
    best = name;
  }
}

const money = /(usd|\$|€|₹)\s?\d/.test(t) || /\b\d+\s?k\b/.test(t);
const dealish = ['budget', 'quote', 'hire', 'proposal', 'price', 'paid'].some((w) => t.includes(w));
if (best !== 'deal' && dealish && money) {
  best = 'deal';
  bestScore += 2;
}

console.log(`bucket: ${best}${bestScore ? ` (signal strength ${bestScore})` : ' (no keyword signal — read the whole message before deciding)'}`);
if (reasons.length) console.log(`signals: ${reasons.join('; ')}`);
if (best === 'audit' || best === 'deal') {
  console.log('next: re-read the full body, then follow skills/fastpress-support/SKILL.md Step 2 for this bucket.');
}
