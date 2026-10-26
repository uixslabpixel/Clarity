/**
 * Sliders. Markup contract:
 *   [data-slider="fade"]   stacked [data-slide] children, one visible; optional
 *                          [data-prev] [data-next] and [data-dots] > * inside the root.
 *                          data-autoplay="8" advances automatically while in view.
 *   [data-slider="track"]  a horizontal [data-track] (or the root itself). On small screens
 *                          the track is a native scroll-snap row; on desktop it is dragged
 *                          with inertia. [data-prev]/[data-next] step one card.
 *   [data-marquee]         first child loops horizontally forever (children already doubled).
 */
import { gsap, ScrollTrigger, $$, reducedMotion, loadDraggable } from './env';

type Draggable = globalThis.Draggable;

export function initSliders() {
  $$('[data-slider="fade"]').forEach(fade);
  $$('[data-slider="track"]').forEach(track);
  $$('[data-marquee]').forEach(marquee);
}

function controls(root: HTMLElement) {
  const own = <T extends HTMLElement>(sel: string) =>
    $$<T>(sel, root).filter((el) => el.closest('[data-slider]') === root);
  return { prev: own('[data-prev]'), next: own('[data-next]'), dots: own('[data-dots]').flatMap((d) => Array.from(d.children) as HTMLElement[]) };
}

function fade(root: HTMLElement) {
  const slides = $$('[data-slide]', root);
  if (slides.length < 2) return;
  const { prev, next, dots } = controls(root);
  const dotOn = (root.dataset.dotOn || 'bg-black').split(' ');
  const dotOff = (root.dataset.dotOff || 'bg-black/20').split(' ');
  let index = Math.max(0, slides.findIndex((s) => !s.hasAttribute('aria-hidden')));
  let busy = false;

  slides.forEach((s, i) => {
    // article/figure keep their native roles; only generic containers become slide groups.
    if (s.tagName === 'DIV') {
      s.setAttribute('role', 'group');
      s.setAttribute('aria-roledescription', 'slide');
    }
    s.setAttribute('aria-label', `${i + 1} of ${slides.length}`);
  });
  dots.forEach((d, i) => {
    d.setAttribute('role', 'button');
    d.setAttribute('aria-label', `Show slide ${i + 1}`);
    d.tabIndex = 0;
    d.classList.add('cursor-pointer');
    d.addEventListener('click', () => go(i, i > index ? 1 : -1));
    d.addEventListener('keydown', (e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), go(i, i > index ? 1 : -1)));
  });

  function paintDots() {
    dots.forEach((d, i) => {
      d.classList.remove(...dotOn, ...dotOff);
      d.classList.add(...(i === index ? dotOn : dotOff));
      d.setAttribute('aria-current', String(i === index));
    });
  }

  function go(to: number, dir = 1) {
    const n = slides.length;
    const target = ((to % n) + n) % n;
    if (target === index || busy) return;
    busy = true;
    const out = slides[index];
    const inn = slides[target];
    const d = reducedMotion() ? 0 : 0.6;
    const parts = (el: HTMLElement) => {
      const p = $$(':scope [data-slide-part]', el);
      return p.length ? p : [el];
    };
    inn.removeAttribute('aria-hidden');
    inn.inert = false;
    gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        out.setAttribute('aria-hidden', 'true');
        out.inert = true;
        busy = false;
      },
    })
      .to(parts(out), { autoAlpha: 0, x: -24 * dir, duration: d * 0.6, stagger: 0.04, ease: 'power2.in' })
      .set(out, { autoAlpha: 0 })
      .set(inn, { autoAlpha: 1 })
      .fromTo(parts(inn), { autoAlpha: 0, x: 24 * dir }, { autoAlpha: 1, x: 0, duration: d, stagger: 0.06 });
    index = target;
    paintDots();
  }

  slides.forEach((s, i) => {
    if (i !== index) {
      gsap.set(s, { autoAlpha: 0 });
      s.setAttribute('aria-hidden', 'true');
      s.inert = true;
    }
  });
  prev.forEach((b) => b.addEventListener('click', () => { stop(); go(index - 1, -1); }));
  next.forEach((b) => b.addEventListener('click', () => { stop(); go(index + 1, 1); }));
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') go(index - 1, -1);
    if (e.key === 'ArrowRight') go(index + 1, 1);
  });

  const autoplay = Number(root.dataset.autoplay || 0);
  let timer: gsap.core.Tween | null = null;
  const stop = () => timer?.kill();
  if (autoplay && !reducedMotion()) {
    const loop = () => (timer = gsap.delayedCall(autoplay, () => { go(index + 1, 1); loop(); }));
    ScrollTrigger.create({ trigger: root, start: 'top 80%', once: true, onEnter: loop });
    root.addEventListener('pointerenter', () => timer?.pause());
    root.addEventListener('pointerleave', () => timer?.resume());
  }
}

function track(root: HTMLElement) {
  const el = root.querySelector<HTMLElement>('[data-track]') ?? root;
  const cards = Array.from(el.children) as HTMLElement[];
  if (cards.length < 2) return;
  const { prev, next } = controls(root);
  let drag: Draggable | null = null;

  const isScroller = () => getComputedStyle(el).overflowX !== 'visible';
  const step = () => {
    const a = cards[0].getBoundingClientRect();
    const b = cards[1].getBoundingClientRect();
    return b.left - a.left;
  };
  /** How far the track must move so its last card ends at the same gutter it starts from. */
  const maxShift = () => {
    gsap.set(el, { x: 0 });
    const first = cards[0].getBoundingClientRect();
    const last = cards[cards.length - 1].getBoundingClientRect();
    const gutter = Math.max(16, first.left);
    return Math.max(0, last.right - (document.documentElement.clientWidth - gutter));
  };

  async function setup() {
    drag?.kill();
    drag = null;
    gsap.set(el, { clearProps: 'transform' });
    if (isScroller() || reducedMotion()) return;
    const max = maxShift();
    if (!max) return;
    const Draggable = await loadDraggable();
    drag = Draggable.create(el, {
      type: 'x',
      bounds: { minX: -max, maxX: 0 },
      inertia: true,
      edgeResistance: 0.85,
      cursor: 'grab',
      activeCursor: 'grabbing',
      zIndexBoost: false,
      allowContextMenu: true,
      dragClickables: true,
      minimumMovement: 6,
      onPress() {
        gsap.killTweensOf(el);
      },
    })[0];
    // Keep clicks on links working unless the pointer actually dragged.
    el.addEventListener('click', (e) => drag?.isDragging && e.preventDefault(), true);
  }

  function move(dir: 1 | -1) {
    if (isScroller()) {
      el.scrollBy({ left: dir * step(), behavior: reducedMotion() ? 'auto' : 'smooth' });
      return;
    }
    if (!drag) return;
    const { minX } = drag.vars.bounds as { minX: number };
    const x = Number(gsap.getProperty(el, 'x'));
    const target = gsap.utils.clamp(minX, 0, Math.round((x - dir * step()) / step()) * step());
    gsap.to(el, { x: target, duration: 0.7, ease: 'power3.out', onUpdate: () => drag?.update() });
  }

  prev.forEach((b) => b.addEventListener('click', () => move(-1)));
  next.forEach((b) => b.addEventListener('click', () => move(1)));
  setup();
  let raf = 0;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(setup);
  });
}

function marquee(root: HTMLElement) {
  const row = root.firstElementChild as HTMLElement | null;
  if (!row || reducedMotion()) return;
  const speed = Number(root.dataset.marquee || 40); // px per second
  const tween = gsap.to(row, {
    xPercent: -50,
    duration: row.scrollWidth / 2 / speed,
    ease: 'none',
    repeat: -1,
  });
  ScrollTrigger.create({ trigger: root, start: 'top bottom', end: 'bottom top', onToggle: (s) => (s.isActive ? tween.play() : tween.pause()) });
  root.addEventListener('pointerenter', () => gsap.to(tween, { timeScale: 0.25, duration: 0.6 }));
  root.addEventListener('pointerleave', () => gsap.to(tween, { timeScale: 1, duration: 0.6 }));
}
