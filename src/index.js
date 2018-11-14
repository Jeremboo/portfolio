import '@babel/polyfill';

import { TimelineLite } from 'gsap';
import domready from 'domready';

import header from './components/Header';
import content from './components/Content';
import webgl from './components/Webgl';

import hasTouch from './util/hasTouch';

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
      // TEMP
      webgl.init().then(() => {
        webgl.start();
      });
    });
  }

  /**
   * * *******************
   * * ANIMATIONS
   * * *******************
   */
  static showIntroduction(onComplete = f => f) {
    document.body.style.opacity = 1;
    const tl = new TimelineLite({ onComplete });
    tl.add(header.show());
    // tl.add(content.show(), '-=2');
    tl.add(content.show(), '-=0.85');

    // DEBUG
    // tl.totalProgress(1).kill();
  }
}

// START
domready(App.init.bind(App));
