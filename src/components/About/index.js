import { TimelineLite } from 'gsap';

import { fadeInFromVars, fadeInToVarsClassic } from '../../props';

// Get elements
const wrapper = document.getElementById('about-part');
const title = document.querySelector('.About-title span');
const paragraphLines = Array.from(document.querySelectorAll('.About-title span, .About > .About-paragraph span'));
const buttons = Array.from(document.querySelectorAll('.About-paragraph > a, .About-sharings .Link > a'));

// Set style for the animations
paragraphLines.forEach((item) => {
  TweenMax.set(item, { ...fadeInFromVars, rotationZ: 5 });
});
buttons.forEach((item) => {
  TweenMax.set(item, { ...fadeInFromVars });
});

export default {
  show: () => {
    const tl = new TimelineLite();
    tl.to(title, 1, { ...fadeInToVarsClassic });
    tl.staggerTo(paragraphLines, 0.5, { ...fadeInToVarsClassic }, 0.05, '-=0.9');
    // TODO faire venir après
    tl.staggerTo(buttons, 0.5, { ...fadeInToVarsClassic }, 0.03, '-=0.7');
    return tl;
  },
  toggleVisibility: () => {
    wrapper.classList.toggle('_hidden');
  },
};