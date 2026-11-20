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

// Couples topic icons: only animate while the section is on screen.
const areas = document.querySelectorAll<HTMLElement>('.areas, .approach');
if (areas.length && 'IntersectionObserver' in window) {
  const live = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle('live', e.isIntersecting)), { threshold: 0.15 });
  areas.forEach((a) => live.observe(a));
} else areas.forEach((a) => a.classList.add('live'));

// Masked slide-up (same motion as the hero) that waits until the block scrolls into view.
const maskBlocks = document.querySelectorAll<HTMLElement>('.mask-in');
if ('IntersectionObserver' in window && !calm) {
  const mio = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    mio.unobserve(e.target);
    e.target.classList.remove('armed');
  }), { threshold: 0.3 });
  maskBlocks.forEach((b) => {
    if (b.getBoundingClientRect().top < innerHeight * 0.85) return;
    b.classList.add('armed');
    mio.observe(b);
  });
}
