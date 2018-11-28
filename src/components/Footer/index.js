import { TweenMax, TweenLite } from 'gsap';

import { fadeInFromVars, fadeInToVars, fadeOutToVarsClassic } from '../../props';

class Footer {
  constructor() {
    this.listenerCallback = false;
    this.isReversed = false;
    this.toggledTitle = 'Projects';

    // Get elements
    this.button = document.getElementById('about-button');
    this.wrapper = this.button.querySelector('.Link-wrapper');
    this.title = this.wrapper.querySelector('span');

    // Set style for the animations
    TweenMax.set(this.wrapper, { ...fadeInFromVars, x: 0 });

    // Bind
    this.removeListener = this.removeListener.bind(this);
    this.addListener = this.addListener.bind(this);
    this.toggleName = this.toggleName.bind(this);
    this.changeName = this.changeName.bind(this);

    // Compute someAnimations
    this.tlToggleProjectsAbout = new TimelineLite({ paused: true });
    this.tlToggleProjectsAbout.to(this.wrapper, 0.5, { ...fadeOutToVarsClassic, x: 0 });
    this.tlToggleProjectsAbout.add(this.toggleName, 0.5);
    this.tlToggleProjectsAbout.to(this.wrapper, 0.5, { ...fadeInToVars }, '+=0.5');
  }

  toggleName() {
    this.changeName(this.isReversed ? 'About' : this.toggledTitle);
  }

  /**
   * * *******************
   * * ANIMATIONS
   * * *******************
   */

  show() {
    return TweenLite.to(this.wrapper, 1, { ...fadeInToVars });
  }

  toggle(toggled) {
    this.isReversed = !toggled;
    if (toggled) {
      this.tlToggleProjectsAbout.play();
    } else {
      this.tlToggleProjectsAbout.reverse();
    }
  }

  /**
   * * *******************
   * * TOOLS
   * * *******************
   */

  changeName(newName) {
    this.title.innerHTML = newName;
  }

  /**
   * Add or remplace a function to trigger on click.
   * @param {Function} callback
   */
  addListener(callback) {
    this.removeListener();
    this.listenerCallback = callback;
    this.button.addEventListener('click', this.listenerCallback);
  }

  removeListener() {
    if (this.listenerCallback) {
      this.button.removeEventListener('click', this.listenerCallback);
      this.listenerCallback = false;
    }
  }
}

export default new Footer();