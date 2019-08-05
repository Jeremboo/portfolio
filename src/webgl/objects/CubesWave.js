import { Object3D } from 'three';
import { TimelineLite } from 'gsap';

import FloatingCube from './Cube';

import {
  MARGIN,
  RECURCIVE_RANDOM,
  SCALE_REDUCER,
  CUBE_SCALE_MIN,
} from '../../props';

const LEFT  = 'left';
const RIGHT = 'right';
const UP    = 'top';
const DOWN  = 'bottom';

export default class CubeWave extends Object3D {
  constructor(x, y, scale) {
    super();

    this.i = 0;
    this.cubes = [];

    this.update = this.update.bind(this);

    // Create all cubes
    this._recurciveCubeCreation(x, y, scale, []);

    // Compute the timelines once
    this.tlShow = new TimelineLite({ paused: true });
    this.cubes.forEach((cube) => {
      this.tlShow.add(cube.show, '+=0.03');
    });

    this.tlHide = new TimelineLite({ paused: true });
    this.cubes.forEach((cube) => {
      this.tlHide.add(cube.hide, '+=0.03');
    });
  }

  _recurciveCubeCreation(x, y, scale, forbidenFaces) {
    // Create a new cube
    const cube = new FloatingCube(x, y, scale);
    this.add(cube);
    this.cubes.push(cube);

    let newScale = scale;
    let border = 0;
    let pos = 0;

    // Compute new sizes depending of the current scale
    const reduceScale = (reducer = SCALE_REDUCER) => {
      newScale *= SCALE_REDUCER;
      border = (scale * 0.5) - (newScale * 0.5);
      pos = (scale * 0.5) + (newScale * 0.5) + MARGIN;
    };

    reduceScale();
    // LEFT
    if (newScale > CUBE_SCALE_MIN && Math.random() > RECURCIVE_RANDOM && forbidenFaces.indexOf(LEFT) === -1) {
      (Math.random() > 0.5)
        ? this._recurciveCubeCreation(x - pos, y + border, newScale, [...forbidenFaces, RIGHT]) // Left - Up
        : this._recurciveCubeCreation(x - pos, y - border, newScale, [...forbidenFaces, RIGHT]) // Left - Down
      ;
      reduceScale(0.8);
    }
    // UP
    if (newScale > CUBE_SCALE_MIN && Math.random() > RECURCIVE_RANDOM && forbidenFaces.indexOf(UP) === -1) {
      (Math.random() > 0.5)
        ? this._recurciveCubeCreation(x - border, y + pos, newScale, [...forbidenFaces, DOWN]) // Up - Left
        : this._recurciveCubeCreation(x + border, y + pos, newScale, [...forbidenFaces, DOWN]) // Up - Right
      ;
      reduceScale(0.8);
    }
    // RIGTH
    if (newScale > CUBE_SCALE_MIN && Math.random() > RECURCIVE_RANDOM && forbidenFaces.indexOf(RIGHT) === -1) {
      reduceScale(0.9);
      (Math.random() > 0.5)
        ? this._recurciveCubeCreation(x + pos, y + border, newScale, [...forbidenFaces, LEFT]) // Right - Up
        : this._recurciveCubeCreation(x + pos, y - border, newScale, [...forbidenFaces, LEFT]) // Right - Down
      ;
    }
    // DOWN
    if (newScale > CUBE_SCALE_MIN && Math.random() > RECURCIVE_RANDOM && forbidenFaces.indexOf(DOWN) === -1) {
      reduceScale(0.9);
      (Math.random() > 0.5)
        ? this._recurciveCubeCreation(x - border, y - pos, newScale, [...forbidenFaces, UP]) // Down - Left
        : this._recurciveCubeCreation(x + border, y - pos, newScale, [...forbidenFaces, UP]) // Down - Right
      ;
    }
  }

  setTexture(texture) {
    // Set the texture to the bigest cube
    this.cubes[0].setTexture(texture);
  }

  /**
   * * *******************
   * * UPDATE
   * * *******************
   */
  update() {
    for (this.i = this.cubes.length - 1; this.i >= 0; this.i--) {
      this.cubes[this.i].update();
    }
  }

  /**
   * * *******************
   * * ANIMATIONS
   * * *******************
   */
  show() {
    this.tlShow.play(0);
  }

  hide() {
    this.tlHide.play(0);
  }
}