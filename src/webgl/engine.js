import {
  Raycaster
} from 'three';

import Webgl from './core/Webgl';
import Physic from './core/Physic';
import assetsController from './core/assetController';

import CubeWave from './objects/CubeWave';
import Lights from './objects/Lights';
import Plane from './objects/Plane';

import { HAS_TOUCH, CUBE_SCALE_MAX } from '../props';

// INTERACTION
const EMPTY_ARRAY = [];

export default class Engine {
  constructor () {
    this.webgl = false;
    this.physic = false;

    this.helper = false;

    // Objects
    this.plane = false;
    this.lights = false;
    this.mouseRaycaster = new Raycaster();
    this.currentCubeWave = false;

    // utils
    this.cubeWavePosition = { x: 0, y: 0 };

    this.resize = this.resize.bind(this);
    this.showProject = this.showProject.bind(this);
    this.hideProject = this.hideProject.bind(this);
    this.handleMoveEvent = this.handleMoveEvent.bind(this);
    this.handleUpEvent = this.handleUpEvent.bind(this);
    this.handleDownEvent = this.handleDownEvent.bind(this);
  }

  resize (w, h) {
    if (this.webgl) {
      this.webgl.resize(w, h);
      // Update the plane
      this.plane.resize(this.webgl.cameraWidth, this.webgl.cameraHeight);

      // Update physic
      this.physic.resize(this.webgl.cameraWidth * 0.5, this.webgl.cameraHeight * 0.5);

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

    // Add interation
    this.initEventHandlers();
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

        // Init physic
        this.physic = new Physic(
          this.webgl.cameraWiidth * 0.5,
          this.webgl.cameraHeight * 0.5
        );

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
  initScene () {
    // ##########################
    // CONTROLLERS

    // ##########################
    // ITEMS

    // Add lights
    this.lights = new Lights(
      this.webgl.camera.top,
      this.webgl.camera.left,
    );
    this.webgl.add(this.lights);

    this.plane = new Plane(
      this.webgl.camera.right * 2,
      this.webgl.camera.top * 2,
    );
    this.webgl.add(this.plane);

    // ##############
    // HELPERS
    if (process.env.NODE_ENV !== 'production') {
      // Helper objects (light debuf or others)
      // GUI
      // this.webgl.add(this.helper.addDirectionalLightHelper(this.lights.directionalLight));
      // this.helper.addVector3(this.lights.directionalLight.position, { range: 15, name: 'dirlight' });
      // this.helper.add(this.lights.directionalLight.shadow.camera, 'left', -10, 10).onChange(() => {
      //   this.lights.directionalLight.shadow.camera.updateProjectionMatrix();
      // });
      // this.helper.add(this.lights.directionalLight.shadow.camera, 'right', -10, 10).onChange(() => {
      //   this.lights.directionalLight.shadow.camera.updateProjectionMatrix();
      // });
    }

    // ##############
    // FIRST OBJECT RENDERER
    // Render complex objects during one frame to compute them now and limit the freeze next time.
    this.webgl.computeMeshes([]);
  }

  initEventHandlers() {
    window.addEventListener(HAS_TOUCH ? 'touchmove' : 'mousemove', this.handleMoveEvent);
    window.addEventListener(HAS_TOUCH ? 'touchstart' : 'mousedown', this.handleDownEvent);
    window.addEventListener(HAS_TOUCH ? 'touchend' : 'mouseup', this.handleUpEvent);
  }

  /**
   * * *******************
   * * START
   * * *******************
   */

  start() {
    this.webgl.start();
    this.physic.start();
  }

  stop() {
    this.webgl.stop();
    this.physic.stop();
  }

  /**
   * * *******************
   * * INTERACTIONS
   * * *******************
   */

  handleDownEvent() {
    this.physic.handleDownEvent();
  }

  handleUpEvent() {
    this.physic.handleUpEvent();
  }

  handleMoveEvent(e) {
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const y = e.clientY || (e.touches && e.touches[0].clientY) || 0;

    // Check the intersections between the mouse and a cube
    const normalizedPosition = this.webgl.getNormalizedPosFromScreen(x, y);
    this.mouseRaycaster.setFromCamera(normalizedPosition, this.webgl.camera);
    const intersects = this.mouseRaycaster.intersectObjects(this.currentCubeWave.children || EMPTY_ARRAY);

    // Handle interaction
    this.physic.updateCurrentIntersectCube(intersects[0]);

    // transform mouse event to meter position
    this.physic.handleMoveEvent(
      (x * this.webgl.ratioWidth) - this.webgl.camera.right,
      this.webgl.camera.top - (y * this.webgl.ratioHeight),
    );
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

    setTimeout(() => {
      this.currentCubeWave = this._addCubeWave(
        this.cubeWavePosition.x,
        this.cubeWavePosition.y,
        assetsController.get(projectId)
      );
    }, 300);

    // TODO hide loader
  }

  /**
   * Hide current cube wave
   */
  hideProject() {
    if (this.currentCubeWave) this._removeCubeWave(this.currentCubeWave);
  }

  /**
   * * *******************
   * * ADD / REMOVE
   * * *******************
   */

  _addCubeWave(x, y, asset) {
    const newCubeWave = new CubeWave(
      x - (CUBE_SCALE_MAX * 0.5),
      y + (CUBE_SCALE_MAX * 0.5),
      asset,
      CUBE_SCALE_MAX,
    );
    this.webgl.add(newCubeWave);
    this.physic.addCubes(newCubeWave.children);
    newCubeWave.show();
    return newCubeWave;
  }

  /**
   * Hide and remove a grouped cubes on the scene
   */
  _removeCubeWave(gc) {
    this.physic.removeCubes(gc.children);
    gc.hide();
    setTimeout(() => {
      this.webgl.remove(gc);
    }, 1000);
  }
}