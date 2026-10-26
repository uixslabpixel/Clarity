/** Scroll-spy for the article "In this page" list ([data-toc]) and step lists ([data-scrollspy]). */
import { ScrollTrigger, $$ } from './env';

export function initScrollSpy() {
  $$('[data-toc]').forEach((nav) => {
    const links = $$<HTMLAnchorElement>('a[href^="#"]', nav);
    const on = ['border-black', 'text-black'];
    const off = ['border-black/10', 'text-ink-3'];
    spy(links, (active) =>
      links.forEach((a) => {
        const is = a === active;
        a.classList.remove(...(is ? off : on));
        a.classList.add(...(is ? on : off));
        is ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current');
      }),
    );
  });
  $$('[data-scrollspy]').forEach((root) => {
    const items = $$('[data-spy-link]', root);
    const links = items.map((li) => li.querySelector<HTMLAnchorElement>('a[href^="#"]')!).filter(Boolean);
    spy(links, (active) => items.forEach((li) => li.toggleAttribute('data-open', li.contains(active))));
  });
}

function spy(links: HTMLAnchorElement[], onChange: (a: HTMLAnchorElement) => void) {
  const pairs = links
    .map((a) => ({ a, el: document.querySelector<HTMLElement>(decodeURIComponent(a.hash)) }))
    .filter((p): p is { a: HTMLAnchorElement; el: HTMLElement } => !!p.el);
  pairs.forEach(({ a, el }, i) => {
    const next = pairs[i + 1]?.el;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 45%',
      endTrigger: next ?? el.parentElement ?? el,
      end: next ? 'top 45%' : 'bottom 45%',
      onToggle: (self) => self.isActive && onChange(a),
    });
  });
}
