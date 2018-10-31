import { TimelineLite } from 'gsap';

import header from './components/Header';
import content from './components/Content';
import footer from './components/Footer';

import { hasTouch } from './util/';

// INIT
if (!hasTouch()) document.body.classList.add('no-touch');

// TODO add domready()

// INTRODUCTION ANIMATION
document.body.style.opacity = 1;
const tl = new TimelineLite();
tl.add(header.show());
// tl.add(content.show(), '-=2');
tl.add(content.show(), '-=0.85');
tl.add(footer.show(), '-=0.55');


// DEV UTILS
footer.onClick(() => {
  const projectPart = document.getElementById('projects-part');
  const aboutPart = document.getElementById('about-part');
  projectPart.classList.toggle('_hidden');
  aboutPart.classList.toggle('_hidden');
});