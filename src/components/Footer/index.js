import { TweenMax, TweenLite } from 'gsap';

import { fadeInFromVars, fadeInToVars, fadeOutToVarsClassic } from '../../props';

// Get elements
const button = document.getElementById('about-button');
const wrapper = document.querySelector('#about-button .Link-wrapper');
// Set style for the animations
TweenMax.set(wrapper, { ...fadeInFromVars, x: 0 });

// Compute toggle timeline
const tlToggle = new TimelineLite({ paused: true });
tlToggle.to(wrapper, 0.5, { ...fadeOutToVarsClassic, x: 0 });
tlToggle.add(() => {
  wrapper.classList.toggle('toggled');
}, '+=0.5');
tlToggle.to(wrapper, 0.5, { ...fadeInToVars });

// EXPORT
export default {
  show: () => {
    return TweenLite.to(wrapper, 1, { ...fadeInToVars });
  },
  toggle: (toggled) => {
    if (toggled) {
      tlToggle.play();
    } else {
      tlToggle.reverse();
    }
  },
  onClick: (callback) => {
    button.addEventListener('click', callback);
  }
};