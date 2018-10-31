import { TimelineLite } from 'gsap';
import domready from 'domready';

import header from './components/Header';
import content from './components/Content';
import footer from './components/Footer';

import { hasTouch } from './util/';

class App {
  /**
   * * *******************
   * * INIT
   * * *******************
   */
  static init() {
    // Check the touch support
    if (!hasTouch()) document.body.classList.add('no-touch');

    // Show the website
    this.showIntroduction(() => {
      footer.onClick(this.toggleContent);
    });
  }

  /**
   * * *******************
   * * ANIMATIONS
   * * *******************
   */
  static showIntroduction(onComplete) {
    document.body.style.opacity = 1;
    const tl = new TimelineLite({ onComplete });
    tl.add(header.show());
    // tl.add(content.show(), '-=2');
    tl.add(content.show(), '-=0.85');
    tl.add(footer.show(), '-=0.55');
  }

  /**
   * * *******************
   * * INTERACTIONS
   * * *******************
   */
  static toggleContent() {
    // TODO animate that
    const projectPart = document.getElementById('projects-part');
    const aboutPart = document.getElementById('about-part');
    projectPart.classList.toggle('_hidden');
    aboutPart.classList.toggle('_hidden');
  }
}

// START
domready(App.init.bind(App));
