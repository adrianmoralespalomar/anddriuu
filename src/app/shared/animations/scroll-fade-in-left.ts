import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

type Direction = 'left' | 'right' | 'top' | 'bottom';

export function scrollFadeIn(selector: string, direction: Direction) {
  const elements = document.querySelectorAll<HTMLElement>(selector);
  const properties = (element: any) => {
    const getTranslation = (dir: Direction, distance = 200) => {
      switch (dir) {
        case 'left':
          return { x: -distance };
        case 'right':
          return { x: distance };
        case 'top':
          return { y: -distance };
        case 'bottom':
          return { y: distance };
        default:
          return { x: 0 };
      }
    };
    return {
      ...getTranslation(direction),
      opacity: 0,
      scrollTrigger: {
        trigger: element,
        scrub: true,
        start: 'top 95%',
        end: 'top 70%',
      },
    };
  };

  elements.forEach((el, i) => {
    gsap.from(el, properties(el));
  });
}
