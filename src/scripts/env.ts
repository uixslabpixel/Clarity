import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** Draggable + inertia are only needed by desktop drag tracks, so they load on demand. */
export async function loadDraggable() {
  const [{ Draggable }, { InertiaPlugin }] = await Promise.all([import('gsap/Draggable'), import('gsap/InertiaPlugin')]);
  gsap.registerPlugin(Draggable, InertiaPlugin);
  return Draggable;
}

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));
