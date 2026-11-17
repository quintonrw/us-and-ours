// "Have a question?" form: validates in the page, then posts to Formspree.
const f = document.getElementById('qform') as HTMLFormElement | null;
const status = document.getElementById('q-sent');
const say = (msg: string, err = false) => {
  if (!status) return;
  status.textContent = msg;
  status.classList.toggle('err', err);
  status.hidden = false;
};
if (f) {
  f.addEventListener('submit', async (e) => {
    e.preventDefault();
    let ok = true;
    f.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[required]').forEach((i) => {
      const bad = !i.value.trim() || (i.type === 'email' && !/^\S+@\S+\.\S+$/.test(i.value));
      i.setAttribute('aria-invalid', bad ? 'true' : 'false');
      if (bad && ok) { i.focus(); ok = false; }
    });
    if (!ok) return;
    if (f.action.includes('REPLACE_ME')) {
      say('The form isn’t connected yet. Please email hello@usandours.com in the meantime.', true);
      return;
    }
    const btn = f.querySelector('button[type=submit]') as HTMLButtonElement | null;
    if (btn) btn.disabled = true;
    try {
      const res = await fetch(f.action, { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      f.reset();
      say('Thanks, your message is on its way.');
    } catch {
      say('Something went wrong sending that. Please try again, or email hello@usandours.com.', true);
    } finally {
      if (btn) btn.disabled = false;
    }
  });
}
