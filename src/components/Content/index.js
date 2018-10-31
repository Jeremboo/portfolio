import { TweenMax, TimelineLite } from 'gsap';

import { fadeInFromVars, fadeInToVars } from '../../props';

// Get elements
const items = document.querySelectorAll('.Projects .Link:not(._hidden) > a');
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
};