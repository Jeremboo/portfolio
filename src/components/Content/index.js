import { TweenMax, TimelineLite } from 'gsap';

import { fadeInFromVars, fadeInToVars, fadeOutToVarsClassic } from '../../props';

// Get elements
const items = Array.from(document.querySelectorAll('.Projects .Link:not(._hidden) > a'));
const reversedItems = [...items].reverse();

items.forEach((item) => {
  TweenMax.set(item, { ...fadeInFromVars });
});

const aboutButton = document.getElementById('about-button');
TweenMax.set(aboutButton, { ...fadeInFromVars, rotationZ: 0, y: 8, x: 0 });

// EXPORT
export default {
  show: () => {
    const tl = new TimelineLite();
    tl.staggerTo(items, 1, { ...fadeInToVars }, 0.06);
    tl.to(aboutButton, 1, { ...fadeInToVars }, '-=0.55');
    return tl;
  },
  hide: () => {
    return TweenMax.staggerTo(reversedItems, 0.3, { ...fadeOutToVarsClassic }, 0.03);
  }
};