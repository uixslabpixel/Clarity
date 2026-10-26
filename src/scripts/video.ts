/** Video lightbox for [data-video-card] buttons. The URL comes from Site Settings → Video URL. */
import { gsap, $$, reducedMotion } from './env';

export function initVideo() {
  const cards = $$('[data-video-card]');
  if (!cards.length) return;
  const url = document.documentElement.dataset.videoUrl ?? '';
  const dialog = document.createElement('dialog');
  dialog.className =
    'm-auto w-[min(960px,calc(100vw-32px))] overflow-visible bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm';
  dialog.setAttribute('aria-label', 'Video');
  dialog.innerHTML = `
    <div class="relative aspect-video w-full overflow-hidden rounded bg-zinc-600" data-video-frame></div>
    <button type="button" class="absolute -top-12 right-0 grid size-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20" aria-label="Close video" data-video-close>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.5"/></svg>
    </button>`;
  document.body.append(dialog);
  const frame = dialog.querySelector<HTMLElement>('[data-video-frame]')!;

  const open = () => {
    frame.innerHTML = url
      ? `<iframe class="size-full" src="${url}${url.includes('?') ? '&' : '?'}autoplay=1" title="Clarity overview video" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`
      : '<p class="t-b3 absolute inset-0 grid place-items-center p-6 text-center text-white/80">Add your video URL in Keystatic → Site Settings → Video URL.</p>';
    dialog.showModal();
    if (!reducedMotion()) gsap.fromTo(dialog, { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'power3.out' });
  };
  const close = () => {
    dialog.close();
    frame.innerHTML = '';
  };
  cards.forEach((c) => {
    c.setAttribute('aria-haspopup', 'dialog');
    c.addEventListener('click', open);
  });
  dialog.querySelector('[data-video-close]')!.addEventListener('click', close);
  dialog.addEventListener('click', (e) => e.target === dialog && close());
  dialog.addEventListener('close', () => (frame.innerHTML = ''));
}
