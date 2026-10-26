/**
 * Accordions and tabs. Markup contract:
 *   [data-accordion]                       root; data-autoplay="7" cycles items (seconds)
 *     [data-accordion-item][data-open]     one item open at a time; styling uses group-data-open:
 *       [data-accordion-trigger]           optional; the whole item is clickable otherwise
 *       [data-accordion-panel]             collapsible content (height tween);
 *                                          data-accordion-panel="fade" only fades in
 *       [data-progress]                    optional autoplay progress bar (scaleX)
 *     [data-accordion-media] > *           optional media list mirrored with data-open
 * Native <details> inside [data-details] get the same height animation.
 */
import { gsap, ScrollTrigger, $$, reducedMotion } from './env';

export function initAccordions() {
  $$('[data-accordion]').forEach(setup);
  $$<HTMLDetailsElement>('[data-details] details').forEach(animateDetails);
}

function setup(root: HTMLElement) {
  const items = $$('[data-accordion-item]', root).filter((el) => el.closest('[data-accordion]') === root);
  const media = $$(':scope [data-accordion-media] > *', root);
  if (!items.length) return;
  const autoplay = Number(root.dataset.autoplay || 0);
  let index = Math.max(0, items.findIndex((el) => el.hasAttribute('data-open')));
  let timer: gsap.core.Tween | null = null;
  let userInteracted = false;

  const panelOf = (item: HTMLElement) => item.querySelector<HTMLElement>('[data-accordion-panel]');
  const triggerOf = (item: HTMLElement) => item.querySelector<HTMLElement>('[data-accordion-trigger]') ?? item;

  items.forEach((item, i) => {
    const trigger = triggerOf(item);
    const panel = panelOf(item);
    if (panel && !panel.id) panel.id = `acc-${Math.random().toString(36).slice(2, 8)}`;
    if (trigger !== item || trigger.tagName === 'BUTTON') {
      trigger.setAttribute('aria-expanded', String(i === index));
      if (panel) trigger.setAttribute('aria-controls', panel.id);
    } else {
      item.setAttribute('role', 'button');
      item.tabIndex = 0;
      item.setAttribute('aria-pressed', String(i === index));
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          select(i, true);
        }
      });
    }
    if (panel && i !== index) panel.inert = true;
    trigger.addEventListener('click', () => select(i, true));
  });

  function select(next: number, fromUser = false) {
    if (fromUser) {
      userInteracted = true;
      timer?.kill();
      items.forEach((it) => resetProgress(it, it === items[next] ? 1 : 0));
    }
    if (next === index && fromUser) return;
    const prev = items[index];
    const curr = items[next];
    index = next;
    items.forEach((it, i) => {
      const on = i === next;
      it.toggleAttribute('data-open', on);
      const trigger = triggerOf(it);
      if (trigger.hasAttribute('aria-expanded')) trigger.setAttribute('aria-expanded', String(on));
      if (it.hasAttribute('aria-pressed')) it.setAttribute('aria-pressed', String(on));
    });
    media.forEach((m, i) => m.toggleAttribute('data-open', i === next));
    animatePanel(panelOf(prev), false);
    animatePanel(panelOf(curr), true);
    swapImage(curr.dataset.image);
    if (!userInteracted) play();
  }

  function animatePanel(panel: HTMLElement | null, open: boolean) {
    if (!panel) return;
    panel.inert = !open;
    const fade = panel.dataset.accordionPanel === 'fade';
    const d = reducedMotion() ? 0 : 0.5;
    if (fade) {
      if (open) gsap.fromTo(panel, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: d, ease: 'power2.out', clearProps: 'opacity,visibility,transform,height' });
      return;
    }
    gsap.killTweensOf(panel);
    if (open) gsap.fromTo(panel, { height: panel.offsetHeight }, { height: 'auto', duration: d, ease: 'power3.inOut' });
    else gsap.to(panel, { height: 0, duration: d, ease: 'power3.inOut' });
  }

  /** Optional shared image ([data-accordion-image]) that follows the open item's data-image. */
  function swapImage(src?: string) {
    const img = root.querySelector<HTMLImageElement>('img[data-accordion-image]');
    if (!img || !src || img.getAttribute('src') === src) return;
    gsap.to(img, {
      autoAlpha: 0.2,
      duration: reducedMotion() ? 0 : 0.25,
      onComplete: () => {
        img.removeAttribute('srcset');
        img.src = src;
        gsap.to(img, { autoAlpha: 1, duration: reducedMotion() ? 0 : 0.45 });
      },
    });
  }

  function resetProgress(item: HTMLElement, value: number) {
    const bar = item.querySelector<HTMLElement>('[data-progress]');
    if (bar) gsap.set(bar, { scaleX: value, transformOrigin: 'left center' });
  }

  function play() {
    if (!autoplay || reducedMotion() || userInteracted) return;
    const item = items[index];
    items.forEach((it) => it !== item && resetProgress(it, 0));
    const bar = item.querySelector<HTMLElement>('[data-progress]');
    const done = () => select((index + 1) % items.length);
    timer = bar
      ? gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: autoplay, ease: 'none', transformOrigin: 'left center', onComplete: done })
      : gsap.delayedCall(autoplay, done) as unknown as gsap.core.Tween;
  }

  if (autoplay) {
    ScrollTrigger.create({
      trigger: root,
      start: 'top 75%',
      end: 'bottom top',
      onEnter: () => !timer && play(),
      onToggle: (self) => (self.isActive ? timer?.resume() : timer?.pause()),
    });
  }
}

function animateDetails(details: HTMLDetailsElement) {
  const summary = details.querySelector('summary');
  const body = summary?.nextElementSibling as HTMLElement | null;
  if (!summary || !body) return;
  summary.addEventListener('click', (e) => {
    if (reducedMotion()) return;
    e.preventDefault();
    if (details.open) {
      gsap.to(body, { height: 0, opacity: 0, duration: 0.35, ease: 'power2.inOut', onComplete: () => { details.open = false; gsap.set(body, { clearProps: 'opacity,visibility,transform,height' }); } });
    } else {
      details.open = true;
      gsap.from(body, { height: 0, opacity: 0, duration: 0.45, ease: 'power2.out', clearProps: 'opacity,visibility,transform,height' });
    }
  });
}
