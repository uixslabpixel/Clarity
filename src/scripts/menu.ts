/** Mobile menu: open/close, Esc to close, focus trap, scroll lock. */
export function initMenu() {
  const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
  const openers = document.querySelectorAll<HTMLButtonElement>('[data-menu-open]');
  if (!menu || !openers.length) return;
  const closer = menu.querySelector<HTMLButtonElement>('[data-menu-close]');
  let lastFocus: HTMLElement | null = null;

  const focusables = () =>
    Array.from(menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));

  const open = () => {
    lastFocus = document.activeElement as HTMLElement;
    menu.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    openers.forEach((b) => b.setAttribute('aria-expanded', 'true'));
    menu.dispatchEvent(new CustomEvent('menu:open'));
    closer?.focus();
  };
  const close = () => {
    menu.hidden = true;
    document.documentElement.style.overflow = '';
    openers.forEach((b) => b.setAttribute('aria-expanded', 'false'));
    lastFocus?.focus();
  };

  openers.forEach((b) => b.addEventListener('click', open));
  closer?.addEventListener('click', close);
  menu.querySelectorAll('[data-menu-link]').forEach((a) => a.addEventListener('click', close));
  menu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
    if (e.key !== 'Tab') return;
    const f = focusables();
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => e.matches && !menu.hidden && close());
}
