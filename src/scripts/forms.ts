/**
 * Progressive enhancement for [data-form] forms: submits in the background
 * (Netlify Forms or a custom endpoint) and swaps in an inline confirmation.
 * Without JS the form posts normally and lands on /thank-you.
 */
import { gsap, $$ } from './env';

export function initForms() {
  $$<HTMLFormElement>('form[data-form]').forEach((form) => {
    form.addEventListener('submit', async (e) => {
      if (!form.checkValidity()) return;
      e.preventDefault();
      const button = form.querySelector<HTMLButtonElement>('[type="submit"]');
      const label = button?.innerHTML;
      if (button) {
        button.disabled = true;
        button.setAttribute('aria-busy', 'true');
      }
      const data = new FormData(form);
      const netlify = form.hasAttribute('data-netlify');
      try {
        const res = await fetch(netlify ? '/' : form.action, {
          method: 'POST',
          headers: netlify ? { 'Content-Type': 'application/x-www-form-urlencoded' } : { Accept: 'application/json' },
          body: netlify ? new URLSearchParams(data as unknown as Record<string, string>).toString() : data,
        });
        if (!res.ok) throw new Error(String(res.status));
        done(form, true);
      } catch {
        done(form, false);
        if (button) {
          button.disabled = false;
          button.removeAttribute('aria-busy');
          if (label) button.innerHTML = label;
        }
      }
    });
  });

  $$<HTMLFormElement>('form[data-password]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Static demo: wire this to your host's password protection.
      gsap.fromTo(form, { x: -6 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      status(form, 'Incorrect password. Please try again.', false);
    });
  });
}

function done(form: HTMLFormElement, ok: boolean) {
  const compact = form.hasAttribute('data-newsletter');
  if (ok) form.reset();
  status(
    form,
    ok
      ? compact
        ? 'Thank you — you are on the list.'
        : 'Request received. A senior partner will reply within one business day.'
      : 'Something went wrong. Please try again or email us directly.',
    ok,
  );
}

function status(form: HTMLFormElement, text: string, ok: boolean) {
  let el = form.parentElement?.querySelector<HTMLElement>(`[data-form-status="${form.name}"]`);
  if (!el) {
    el = document.createElement('p');
    el.dataset.formStatus = form.name;
    el.setAttribute('role', 'status');
    el.className = 't-b4 mt-3';
    form.after(el);
  }
  el.textContent = text;
  el.classList.toggle('text-red-600', !ok);
  gsap.fromTo(el, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.4 });
}
