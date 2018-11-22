import { Body, Plane, World } from 'p2';

import loop from '../../util/loop';

import radian from '../../util/radian';

import {
  BOX_OVERFLOWN_FRICTION,
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
    this.draggedCube = false;
    this.currentIntersectCube = false;
    this.currentMousePosition = new Float32Array([0, 0]);
    this.currentImpulse = new Float32Array([0, 0]);
    this.currentUV = new Float32Array([0, 0]);

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
  resize(alfWidth, alfHeight) {
    this.wallLeft.position[0] = -alfWidth;
    this.wallRight.position[0] = alfWidth;
    // this.floor.position[1] = -alfHeight;
    // this.roof.position[1] = alfHeight;
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
      if (!this.draggedCube) document.body.style.cursor = 'grab';
    } else {
      this.currentIntersectCube = false;
      if (!this.draggedCube) document.body.style.cursor = 'auto';
    }
  }

  handleMoveEvent(x, y) {
    // When the mouse coordinate brush a cube.
    if (this.currentIntersectCube) {
      this.currentImpulse[0] = (x - this.currentMousePosition[0]) * BOX_OVERFLOWN_FRICTION;
      this.currentImpulse[1] = (y - this.currentMousePosition[1]) * BOX_OVERFLOWN_FRICTION;
      this.currentUV[0] = this.currentIntersectCube.uv.x - 0.5;
      this.currentUV[1] = this.currentIntersectCube.uv.y - 0.5;
      this.currentIntersectCube.object.applyImpulse(this.currentImpulse, this.currentUV);
    }

    // When a cube is dragged
    if (this.draggedCube) {
      this.draggedCube.setAttractionPos(x, y);
    }

    // Update the current mouse position for the next frame
    this.currentMousePosition[0] = x;
    this.currentMousePosition[1] = y;
  }

  handleDownEvent() {
    if (this.currentIntersectCube) {
      document.body.style.cursor = 'grabbing';
      this.draggedCube = this.currentIntersectCube.object;
      this.draggedCube.setDraggingPosition(this.currentIntersectCube.uv);
    }
  }

  handleUpEvent() {
    if (this.draggedCube) this.draggedCube.drop();
    this.draggedCube = false;
    document.body.style.cursor = (this.currentIntersectCube) ? 'grab' : 'auto';
  }
}