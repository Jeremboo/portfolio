import { TweenMax, Power2 } from 'gsap';

import { fadeInFromVars, fadeInToVars } from '../../props';

// Get elements
const button = document.getElementById('about-button');
const wrapper = document.querySelector('#about-button .Link-wrapper');
// Set style for the animations
TweenMax.set(wrapper, { ...fadeInFromVars, x: 0 });

// EXPORT
export default {
  show: () => {
    return TweenMax.to(wrapper, 1, { ...fadeInToVars });
  },
  onClick: (callback) => {
    button.addEventListener('click', callback);
  }
};