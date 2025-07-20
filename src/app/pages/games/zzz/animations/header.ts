import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);
export function headerAnimation() {
  gsap.to('.header img', {
    opacity: 1,
    duration: 0.5,
    ease: 'power2.in',
  });

  const splitText = new SplitText(['.header h1', '.header h2'], {
    type: 'words',
  });

  gsap.from(splitText.words, {
    duration: 1,
    y: 50,
    stagger: 0.1,
    delay: 0.5,
    autoAlpha: 0,
    filter: 'blur(10px)',
  });
}
