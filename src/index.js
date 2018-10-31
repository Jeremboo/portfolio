import { TimelineLite } from 'gsap';
import domready from 'domready';

import header from './components/Header';
import content from './components/Content';
import about from './components/About';
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

    // Toggle global animations
    const projectPart = document.getElementById('projects-part');
    const aboutPart = document.getElementById('about-part');
    this.contentToggled = false;
    this.toggleContentAnim = new TimelineLite({ paused: true });
    this.toggleContentAnim.add(content.hide());
    this.toggleContentAnim.add(() => {
      projectPart.classList.toggle('_hidden');
      aboutPart.classList.toggle('_hidden');
    });
    this.toggleContentAnim.add(about.show());

    // Show the website
    this.showIntroduction(() => {
      footer.onClick(this.toggleContent.bind(App));
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

    // DEBUG
    // tl.totalProgress(1).kill();
  }

  /**
   * * *******************
   * * INTERACTIONS
   * * *******************
   */
  static toggleContent() {
    this.toggled = !this.toggled;

    if (this.toggled) {
      this.toggleContentAnim.play();
    } else {
      this.toggleContentAnim.reverse();
    }
  }
}

// START
domready(App.init.bind(App));
