import Webgl from './core/Webgl';
import assetsController from './core/assetController';

import Box from './objects/FloatingCube';
import Lights from './objects/Lights';
import Plane from './objects/Plane';

export default class Engine {
  constructor () {
    this.webgl = false;
    this.helper = false;
    this.cameraManager = false;

    // Objects
    this.plane = false;
    this.lights = false;
    this.box = false;

    this.resize = this.resize.bind(this);
  }

  resize (w, h) {
    if (this.webgl) this.webgl.resize(w, h);
  }

  /**
   * * *******************
   * * INITS
   * * *******************
   */
  async init(canvas, w, h) {
    await this.initWebgl(canvas, w, h);
    await this.loadGenericAssets();

    // ! FREEEZE ZONE
    if (process.env.NODE_ENV !== 'production') {
      // CREATE FAKE DATA HERE
    }

    // Init the scene, set initial values
    this.initScene();
    // ! FREEEZE ZONE END
  }

  /**
   * Create the webgl and manage if it is not supported.
   * @return {Promise} [description]
   */
  initWebgl (canvas, w, h) {
    return new Promise((resolve, reject) => {
      try {
        // Init webgl
        this.webgl = new Webgl(canvas, w, h);

        if (process.env.NODE_ENV !== 'production') {
          this.helper = require('./core/helper').default;
        }

        resolve();
      } catch (e) {
        this.webgl = false;
        console.error('error', e);
        reject('ERROR engine.initWebgl(): Webgl is not supported');
      }
    });
  }

  loadGenericAssets (onProgress) {
    return assetsController.loadStartingPack(onProgress);
  }

  /**
   * Init for the first time the complete scene
   * - add all elements here
   * - add lights
   * - move camera
   * - ...
   */
  initScene (params) {
    // ##########################
    // CONTROLLERS

    // ##########################
    // ITEMS

    // Add lights
    this.lights = new Lights();
    this.webgl.add(this.lights);

    this.plane = new Plane();
    this.webgl.add(this.plane);

    this.box = new Box(0, 0);
    this.webgl.add(this.box);


    // ##############
    // HELPERS
    if (process.env.NODE_ENV !== 'production') {
      // Helper objects (light debuf or others)
      // GUI
    }

    // ##############
    // FIRST OBJECT RENDERER
    // Render complex objects during one frame to compute them now and limit the freeze next time.
    this.webgl.computeMeshes([]);
  }

  /**
   * * *******************
   * * START
   * * *******************
   */

  start() {
    this.webgl.start();
  }

  stop() {
    this.webgl.stop();
  }
}