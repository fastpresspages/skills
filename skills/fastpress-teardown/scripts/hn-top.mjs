// hn-top.mjs — zero-dependency picker for field scans (fastpress-teardown).
// Reads HN show stories (Firebase API, public, no key) and prints a sorted table.
// Reads only; never posts or emails.
const API = 'https://hacker-news.firebaseio.com/v0';

const ids = await (await fetch(`${API}/showstories.json`, {
  headers: { 'user-agent': 'FastPress-Labs-teardown-picker' }
})).json();

const limit = Number(process.argv[2] || 12);
const pick = ids.slice(0, Math.min(40, limit * 4)); // resolve extra, sort, then cut

const items = await Promise.all(pick.map(async (id) => {
  try {
    const r = await fetch(`${API}/item/${id}.json`, {
      headers: { 'user-agent': 'FastPress-Labs-teardown-picker' },
      signal: AbortSignal.timeout(8000)
    });
    const j = await r.json();
    if (!j || typeof j.score !== 'number') return null;
    const url = typeof j.url === 'string' ? j.url : '';
    if (!/^https?:\/\//.test(url)) return null;
    return { id: j.id, score: j.score, url, title: (j.title || '').replace(/\s+/g, ' ').trim() };
  } catch {
    return null; // keep going; a dead item never stops the scan
  }
}));

const table = items
  .filter(Boolean)
  .sort((a, b) => b.score - a.score)
  .slice(0, limit);

for (const t of table) {
  console.log(`${t.id} · ${String(t.score).padStart(5)} · ${t.url} · ${t.title}`);
}
console.log(`\n${table.length} candidate${table.length === 1 ? '' : 's'} (public URLs only). Pick 3-5, then run a full LaunchGrade scan (not --fast).`);
