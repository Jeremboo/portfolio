import { TweenMax } from 'gsap';

import { fadeInFromVars, fadeInToVars } from '../../props';

// Get elements
const button = document.getElementById('about-button');
TweenMax.set(button, { ...fadeInFromVars, y: 8, rotationZ: 0 });

// EXPORT
export default {
  show: () => {
    return TweenMax.to(button, 1, { ...fadeInToVars });
  },
  onClick: (callback) => {
    button.addEventListener('click', callback);
  }
};