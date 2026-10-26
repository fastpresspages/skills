// FastPress Skills site JS: menu toggle, copy buttons, form handler. No tracking.
(() => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.dataset.open === 'true';
      menu.dataset.open = String(!open);
      toggle.setAttribute('aria-expanded', String(!open));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.dataset.open === 'true') {
        menu.dataset.open = 'false';
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const sel = btn.getAttribute('data-copy');
      const el = document.querySelector(sel);
      if (!el) return;
      const text = el.textContent.trim();
      try { await navigator.clipboard.writeText(text); }
      catch { /* execCommand fallback */
        const ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch {}
        ta.remove();
      }
      const old = btn.textContent;
      btn.textContent = 'Copied';
      setTimeout(() => { btn.textContent = old; }, 1400);
    });
  });

  // Human-submitted form only. Agents must not auto-submit (site AGENTS.md rule).
  const form = document.querySelector('form.lead-form');
  if (form) {
    const status = form.querySelector('.form-status');
    const submit = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      if ((data.get('_honey') || '').trim()) return; // bot only
      const email = String(data.get('email') || '').trim();
      const message = String(data.get('message') || '').trim();
      const say = (msg, cls) => { if (status) { status.textContent = msg; status.className = `form-status ${cls || ''}`; } };
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { say('Add a valid email so we can reply.', 'bad'); return; }
      if (message.length < 10) { say('A one-line message is enough — 10+ characters.', 'bad'); return; }
      try {
        submit.disabled = true;
        const prev = submit.textContent; submit.textContent = 'Sending…';
        const r = await fetch(form.getAttribute('data-ajax'), {
          method: 'POST',
          headers: { 'content-type': 'application/json', accept: 'application/json' },
          body: JSON.stringify(Object.fromEntries(data.entries())),
          signal: AbortSignal.timeout(20000)
        });
        const out = await r.json().catch(() => ({}));
        if (r.ok && out.success !== 'false' && out.success !== false) {
          say('Sent — a human replies within a day or two.', 'ok');
          form.reset();
        } else {
          say('The form did not go through. Email meetcode99@gmail.com instead.', 'bad');
        }
        submit.disabled = false; submit.textContent = prev;
      } catch {
        say('Network trouble. Email meetcode99@gmail.com instead.', 'bad');
        submit.disabled = false;
      }
    });
  }
})();
