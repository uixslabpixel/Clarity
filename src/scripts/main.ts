import { initMenu } from './menu';
import { initMotion } from './motion';
import { initAccordions } from './accordion';
import { initSliders } from './slider';
import { initFilters } from './filter';
import { initScrollSpy } from './toc';
import { initForms } from './forms';
import { initVideo } from './video';
import { gsap, reducedMotion } from './env';

initMenu();
initAccordions();
initSliders();
initFilters();
initForms();
initVideo();
initMotion();
initScrollSpy();

// Stagger the mobile menu links in each time it opens.
document.querySelector('[data-mobile-menu]')?.addEventListener('menu:open', () => {
  if (reducedMotion()) return;
  gsap.fromTo('[data-menu-link], [data-mobile-menu] .t-b4', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power3.out' });
});
