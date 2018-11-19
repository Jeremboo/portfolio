import { Body, Plane, World } from 'p2';

import loop from '../../util/loop';

import radian from '../../util/radian';

import {
  BOX_OVERFLOWN_FRICTION, BOX_TOUCHED_FRICTION,
} from '../../props';

export default class Physic extends World {
  constructor(alfWidth, alfHeight) {
    super({
      gravity: [0, 0],
      // gravity: [0, -9.82],
    });

    // ************
    // * Global vars
    this.isStarted = false;
    this.fixedTimeStep = 1 / 60;

    // ************
    // * Interactions vars
    this.touchedCube = false;
    this.currentIntersectCube = false;
    this.currentMousePosition = { x: 0, y: 0 };

    // ************
    // * init stage
    this.stageBody = new Body();
    this.addBody(this.stageBody);
    // Floor
    this.floor = new Plane();
    this.stageBody.addShape(this.floor, [0, -alfHeight]);
    // Roof
    this.roof = new Plane();
    this.stageBody.addShape(this.roof, [0, alfHeight], radian(180));
    // Left Wall
    this.wallLeft = new Plane();
    this.stageBody.addShape(this.wallLeft, [-alfWidth, 0], radian(-90));
    // Right Wall
    this.wallRight = new Plane();
    this.stageBody.addShape(this.wallRight, [alfWidth, 0], radian(90));

    // ************
    // * Bind
    this._update = this._update.bind(this);
  }

  /**
   * Resize the stage limitation
   */
  resize(alfWidth, h) {
    this.wallLeft.position[0] = -(alfWidth);
    this.wallRight.position[0] = alfWidth;
    // this.floor.position[1] = -(h * 0.5);
    // this.roof.position[1] = h * 0.5;
  }


  /**
   * * *******************
   * * LOOP
   * * *******************
   */
  start () {
    if (!this.isStarted) {
      this.isStarted = true;
      loop.add('0001', this._update);
    }
  }

  stop () {
    if (this.isStarted) {
      this.isStarted = false;
      loop.remove('0001');
    }
  }

  _update() {
    this.step(this.fixedTimeStep);
  }

  /**
   * * *******************
   * * ADD / REMOVE
   * * *******************
   */
  addCubes(cubes){
    cubes.forEach(cube => {
      this.addBody(cube.body);
    });
  }
  removeCubes(cubes) {
    cubes.forEach(cube => {
      this.removeBody(cube.body);
    });
  }

  /**
   * * *******************
   * * INTERACTION
   * * *******************
   */
  updateCurrentIntersectCube(intersectedCube) {
    if (intersectedCube !== undefined) {
      this.currentIntersectCube = intersectedCube;
      if (!this.touchedCube) document.body.style.cursor = 'grab';
    } else {
      this.touchedCube = false;
      this.currentIntersectCube = false;
      document.body.style.cursor = 'auto';
    }
  }

  handleMoveEvent(x, y) {
    if (this.currentIntersectCube || this.touchedCube) {
      const friction = (this.touchedCube)
        ? BOX_TOUCHED_FRICTION
        : BOX_OVERFLOWN_FRICTION
      ;
      this.currentIntersectCube.object.applyImpulse([
        (x - this.currentMousePosition.x) * friction,
        (this.currentMousePosition.y - y) * friction,
      ], [
        this.currentIntersectCube.uv.x - 0.5,
        this.currentIntersectCube.uv.y - 0.5,
      ]);
    }
    this.currentMousePosition = { x, y };
  }

  handleDownEvent() {
    if (this.currentIntersectCube) {
      document.body.style.cursor = 'grabbing';
      this.touchedCube = this.currentIntersectCube.object;
    }
  }

  handleUpEvent() {
    this.touchedCube = false;
    document.body.style.cursor = (this.currentIntersectCube) ? 'grab' : 'auto';
  }
}