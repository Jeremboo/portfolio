import '@babel/polyfill';

import { TimelineLite } from 'gsap';
import domready from 'domready';

import header from './components/Header';
import content from './components/Content';
import engine from './components/Engine';

import { HAS_TOUCH } from './props';


class App {
  /**
   * * *******************
   * * INIT
   * * *******************
   */
  static async init() {
    // Check the touch support
    if (!HAS_TOUCH) document.body.classList.add('no-touch');

    // Init webgl
    try {
      await engine.init();
      engine.start();
    } catch (e) {
      console.error(e);
      // TODO show an error message
    }

    engine.showIntroduction();
    this.showHome(() => {
      //
    });
  }

  /**
   * * *******************
   * * ANIMATIONS
   * * *******************
   */
  static showHome(onComplete = f => f) {
    document.body.style.opacity = 1;
    const tl = new TimelineLite({ onComplete, delay: 0.5 });
    tl.add(header.show());
    // tl.add(content.show(), '-=2');
    tl.add(content.show(), '-=0.85');

    // DEBUG
    // tl.totalProgress(1).kill();
  }
}

// START
domready(App.init.bind(App));
