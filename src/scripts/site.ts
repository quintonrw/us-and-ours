// Mobile menu, sticky header state, and the one-time photo curtain reveal.
const menuBtn = document.getElementById('menuBtn');
const mnav = document.getElementById('mnav');
if (menuBtn && mnav) {
  menuBtn.addEventListener('click', () => {
    const open = mnav.hidden;
    mnav.hidden = !open;
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mnav.hidden) { mnav.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.focus(); }
  });
}

const head = document.querySelector('.site-head');
const onScroll = () => head?.classList.toggle('scrolled', scrollY > 8);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !calm) {
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    e.target.querySelectorAll('.slide-up.armed').forEach((t) => {
      t.classList.add('in');
      requestAnimationFrame(() => requestAnimationFrame(() => t.classList.remove('armed')));
    });
  }), { threshold: 0.25 });
  document.querySelectorAll<HTMLElement>('.slide-up').forEach((t) => {
    if (t.getBoundingClientRect().top < innerHeight * 0.85 || !t.parentElement) return;
    t.classList.add('armed');
    io.observe(t.parentElement);
  });
}
