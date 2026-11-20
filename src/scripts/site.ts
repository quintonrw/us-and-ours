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

// Every scroll reveal uses the hero's masked slide-up: text lines rise from behind a mask, one after another.
function maskItems(root: Element, out: Element[]) {
  for (const el of Array.from(root.children)) {
    if (el.matches('img, picture, form, input, textarea, select, .photo, .mask, br')) continue;
    if (el.matches('svg')) { out.push(el); continue; }
    if (el.matches('.btn')) { out.push(el); continue; }
    const d = getComputedStyle(el).display;
    const container = el.matches('div, ul, ol, section, article, header, figure, blockquote, nav') || ((d === 'grid' || d === 'flex') && el.children.length > 0);
    if (container) maskItems(el, out); else out.push(el);
  }
}
function wrapMask(el: Element, delay: number) {
  if (el.matches('svg')) { el.classList.add('mk-fade'); (el as SVGElement).style.setProperty('--d', `${delay}s`); return; }
  const inner = document.createElement('span');
  inner.className = 'ml';
  inner.style.setProperty('--d', `${delay}s`);
  if (el.matches('.btn')) {
    const outer = document.createElement('div');
    outer.className = 'mask';
    el.replaceWith(outer); outer.append(inner); inner.append(el);
    return;
  }
  el.classList.add('mask');
  while (el.firstChild) inner.append(el.firstChild);
  el.append(inner);
}
if (!calm) {
  // Hero entrance: eyebrow, lede and buttons join the headline's masked lines.
  document.querySelectorAll<HTMLElement>('.eyebrow.rise, .lede.rise, h1.rise, div.rise').forEach((el) => {
    if (el.matches('.qform, .contact-cards, .photo, .legal-body, .draft')) return;
    const d = parseFloat(el.style.getPropertyValue('--d')) || 0;
    el.classList.remove('rise');
    if (el.matches('div')) { const items: Element[] = []; maskItems(el, items); items.forEach((it, i) => wrapMask(it, d + i * 0.08)); }
    else wrapMask(el, d);
  });
  // Scroll blocks.
  const blocks = Array.from(document.querySelectorAll<HTMLElement>('.reveal, .stagger')).filter((b) => !b.closest('.mask-in') && !b.parentElement?.closest('.reveal, .stagger'));
  const rio = 'IntersectionObserver' in window ? new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    rio!.unobserve(e.target);
    e.target.classList.remove('armed');
  }), { threshold: 0.2 }) : null;
  blocks.forEach((b) => {
    const items: Element[] = [];
    if (b.matches('.b1-cards')) {
      // Cards rise in whole, one after another.
      Array.from(b.children).forEach((card, i) => { card.classList.add('card-up'); (card as HTMLElement).style.setProperty('--d', `${i * 0.14}s`); });
    } else maskItems(b, items);
    items.forEach((it, i) => wrapMask(it, Math.min(i * 0.08, 0.64)));
    if (rio && b.getBoundingClientRect().top > innerHeight * 0.9) { b.classList.add('armed'); rio.observe(b); }
  });
}
