
import WebglEngine from '../../webgl/engine';

import loop from '../../util/loop';


// The Engine class extended to bind dom and external events with the graphic engine.
class Engine extends WebglEngine {
  constructor() {
    super();
    // Canvas
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.wrapper = document.getElementById('webgl');
    this.canvas = this.wrapper.querySelector('canvas');

    this.handleResize = this.handleResize.bind(this);
  }

  /**
   * * *******************
   * * INIT
   * * *******************
   */
  async init() {
    await super.init(this.canvas, this.width, this.height);

    // Listeners
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('orientationchange', this.handleResize);
    this.handleResize();

    // Helper
    if (this.helper) {
      this.wrapper.appendChild(this.helper.domElement);
      this.wrapper.appendChild(this.helper.stats.domElement);

      window.addEventListener('keydown', e => {
        if (e.keyCode === 192) this.helper.toggle();
      });
    }
  }

  handleResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.resize(this.width, this.height);
  }

  /**
   * * *******************
   * * START
   * * *******************
   */
  start() {
    loop.start();
    super.start();
  }

  stop() {
    super.stop();
    loop.stop();
  }
}

export default new Engine();