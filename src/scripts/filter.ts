/**
 * List filters: a [data-filter] tab bar (buttons with data-filter-value) filters the
 * [data-filter-item] elements of its section by category; "All" shows everything.
 * The search button toggles a text box that filters by title.
 */
import { gsap, ScrollTrigger, $$, reducedMotion } from './env';

export function initFilters() {
  $$('[data-filter]').forEach((bar) => {
    const scope = bar.closest('[data-section]') ?? document;
    const items = $$('[data-filter-item]', scope);
    const tabs = $$<HTMLButtonElement>('[data-filter-value]', bar);
    const toggle = bar.querySelector<HTMLButtonElement>('[data-search-toggle]');
    const empty = scope.querySelector<HTMLElement>('[data-filter-empty]');
    let category = tabs.find((t) => t.getAttribute('aria-selected') === 'true')?.dataset.filterValue ?? 'All';
    let query = '';

    const apply = () => {
      const shown: HTMLElement[] = [];
      items.forEach((it) => {
        const okCat = category === 'All' || it.dataset.filterItem === category;
        const okText = !query || (it.textContent ?? '').toLowerCase().includes(query);
        const show = okCat && okText;
        it.hidden = !show;
        if (show) shown.push(it);
      });
      // Hide wrappers whose filterable children are all hidden (e.g. the featured row).
      $$('[data-filter-group]', scope).forEach((g) => (g.hidden = !$$('[data-filter-item]', g).some((i) => !i.hidden)));
      if (empty) empty.hidden = shown.length > 0;
      if (!reducedMotion()) gsap.fromTo(shown, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.04, ease: 'power2.out', overwrite: true });
      ScrollTrigger.refresh();
    };

    tabs.forEach((tab) =>
      tab.addEventListener('click', () => {
        category = tab.dataset.filterValue ?? 'All';
        tabs.forEach((t) => {
          const on = t === tab;
          t.setAttribute('aria-selected', String(on));
          t.classList.toggle('text-black', on);
          t.classList.toggle('text-ink-3', !on);
        });
        apply();
      }),
    );

    if (toggle) {
      const box = document.createElement('input');
      box.type = 'search';
      box.placeholder = 'Search…';
      box.setAttribute('aria-label', 'Search this list');
      box.className = 't-b4 hidden h-8 w-40 rounded-full border border-line bg-white px-3 outline-none focus:border-black/40 md:w-56';
      toggle.before(box);
      toggle.setAttribute('aria-expanded', 'false');
      toggle.addEventListener('click', () => {
        const open = box.classList.toggle('hidden') === false;
        toggle.setAttribute('aria-expanded', String(open));
        if (open) box.focus();
        else if (query) {
          box.value = query = '';
          apply();
        }
      });
      box.addEventListener('input', () => {
        query = box.value.trim().toLowerCase();
        apply();
      });
    }
  });
}
