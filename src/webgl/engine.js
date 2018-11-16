import Webgl from './core/Webgl';
import assetsController from './core/assetController';

import CubeWave from './objects/CubeWave';
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

    // utils
    this.currentCubeWave = false;
    this.cubeWavePosition = {
      x: 0,
      y: 0,
    };

    this.resize = this.resize.bind(this);
    this.showProject = this.showProject.bind(this);
    this.hideProject = this.hideProject.bind(this);
  }

  resize (w, h) {
    if (this.webgl) {
      this.webgl.resize(w, h);

      // Update the plane
      this.plane.resize(this.webgl.cameraWidth, this.webgl.cameraHeight);

      // Update the cube position
      // padding: 96px 144px;
      this.cubeWavePosition = {
        x: this.webgl.camera.right - ((this.webgl.cameraWidth / w) * 144),
        y: this.webgl.camera.bottom + ((this.webgl.cameraHeight / h) * 96),
      };
    }
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
    this.lights = new Lights(
      this.webgl.camera.top * 0.5,
      this.webgl.camera.left * 0.5
    );
    this.webgl.add(this.lights);

    this.plane = new Plane(
      this.webgl.camera.right * 2,
      this.webgl.camera.top * 2,
    );
    this.webgl.add(this.plane);

    // this.box = new Cube(0, 0);
    // this.webgl.add(this.box);


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

  /**
   * * *******************
   * * PROJECTS
   * * *******************
   */
  async showProject(projectId) {
    // DEBUG
    projectId = 'test';

    // TODO show loader if nothing is on the floor

    // Hide the current wave if she exist
    this.hideProject();

    // Load the nessessary asset
    await assetsController.loadPack(projectId);

    // Show the cubeWave
    // TODO check if the promise take more than 200ms
    const scale = 4;
    const newCubeWave = new CubeWave(
      this.cubeWavePosition.x - (scale * 0.5),
      this.cubeWavePosition.y + (scale * 0.5),
      assetsController.get(projectId),
      { scale }
    );
    this.webgl.add(newCubeWave);
    newCubeWave.show();
    this.currentCubeWave = newCubeWave;
    // TODO hide loader
  }

  /**
   * Hide current cube wave
   */
  hideProject() {
    if (this.currentCubeWave) this._hideCubeWave(this.currentCubeWave);
  }

  /**
   * Hide and remove a grouped cubes on the scene
   */
  _hideCubeWave(gc) {
    gc.hide();
    setTimeout(() => {
      this.webgl.remove(gc);
    }, 1000);
  }
}