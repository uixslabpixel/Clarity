/**
 * Scroll motion: entrance reveals, count-ups, parallax and the sticky header.
 *   [data-reveal]          fades/slides in when it enters the viewport (batched + staggered)
 *   [data-reveal="media"]  wipes in with a clip-path
 *   [data-count]           counts up to its text value ("$420M+", "2.4x", "14,200+")
 *   [data-parallax="80"]   drifts vertically by ±N px while its section scrolls past
 *   [data-parallax-rotate] rotates slowly with scroll
 */
import { gsap, ScrollTrigger, $$, reducedMotion } from './env';

export function initMotion() {
  initHeader();
  if (reducedMotion()) return; // reveal targets are only hidden by CSS when motion is allowed
  initReveals();
  initCounters();
  initParallax();
}

function initReveals() {
  const plain = $$('[data-reveal]:not([data-reveal="media"])');
  const media = $$('[data-reveal="media"]');
  gsap.set(plain, { autoAlpha: 0, y: 28 });
  gsap.set(media, { clipPath: 'inset(0 0 100% 0)', autoAlpha: 1 });
  ScrollTrigger.batch(plain, {
    start: 'top 92%',
    once: true,
    onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, overwrite: true }),
  });
  ScrollTrigger.batch(media, {
    start: 'top 92%',
    once: true,
    onEnter: (batch) => gsap.to(batch, { clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'power3.inOut', stagger: 0.1 }),
  });
}

function initCounters() {
  $$('[data-count]').forEach((el) => {
    const raw = el.textContent?.trim() ?? '';
    const m = raw.match(/^([^0-9-]*)(-?[\d,]*\.?\d+)(.*)$/);
    if (!m) return;
    const [, prefix, num, suffix] = m;
    const target = parseFloat(num.replace(/,/g, ''));
    const decimals = (num.split('.')[1] || '').length;
    const comma = num.includes(',');
    const fmt = (v: number) => {
      const s = v.toFixed(decimals);
      return comma ? Number(s).toLocaleString('en-US', { minimumFractionDigits: decimals }) : s;
    };
    el.setAttribute('aria-label', raw);
    const state = { v: 0 };
    el.textContent = prefix + fmt(0) + suffix;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () =>
        gsap.to(state, {
          v: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => (el.textContent = prefix + fmt(state.v) + suffix),
          onComplete: () => (el.textContent = raw),
        }),
    });
  });
}

function initParallax() {
  $$('[data-parallax]').forEach((el) => {
    const dist = Number(el.dataset.parallax || 80);
    gsap.fromTo(
      el,
      { y: -dist },
      { y: dist, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } },
    );
  });
  $$('[data-parallax-rotate]').forEach((el) => {
    gsap.fromTo(el, { rotation: -12 }, { rotation: 12, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
}

/** Header turns into a compact fixed bar that hides on scroll down and returns on scroll up. */
function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  if (!header) return;
  let lastY = window.scrollY;
  let ticking = false;
  const update = () => {
    ticking = false;
    const y = window.scrollY;
    const stuck = header.hasAttribute('data-stuck');
    const navH = header.querySelector<HTMLElement>('[data-navbar]')?.offsetHeight ?? 80;
    if (y > header.offsetHeight + 200) {
      if (!stuck) {
        header.setAttribute('data-stuck', '');
        gsap.set(header, { yPercent: -100 });
      }
      const up = y < lastY - 2;
      const down = y > lastY + 2;
      if (up || down) gsap.to(header, { yPercent: up ? 0 : -100, duration: reducedMotion() ? 0 : 0.4, ease: 'power3.out', overwrite: true });
    } else if (stuck && (y <= navH || Number(gsap.getProperty(header, 'yPercent')) <= -100)) {
      header.removeAttribute('data-stuck');
      gsap.set(header, { clearProps: 'transform' });
    }
    lastY = y;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
}
