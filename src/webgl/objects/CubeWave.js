import { Object3D } from 'three';
import { TimelineLite } from 'gsap';

import FloatingCube from './Cube';

const MARGIN = 0.15;
const RECURCIVE_RANDOM = 0.3;
const SCALE_REDUCER = 0.35;

const LEFT  = 'left';
const RIGHT = 'right';
const UP    = 'top';
const DOWN  = 'bottom';

export default class CubeWave extends Object3D {
  constructor(x, y, texture, { scale = 3, forbidenFaces = [DOWN, RIGHT] } = {}) {
    super();

    this.i = 0;
    this.cubes = [];

    this.update = this.update.bind(this);

    // Create all cubes
    this._recurciveCubeCreation(x, y, scale, forbidenFaces);

    // Set the texture to the bigest cube
    this.cubes[0].setTexture(texture);

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
    const cube = new FloatingCube(x, y, { scale, force: 0.003 });
    this.add(cube);
    this.cubes.push(cube);

    // Compute the new sizes
    const newScale = scale * SCALE_REDUCER;
    const border = (scale * 0.5) - (newScale * 0.5);
    const pos = (scale * 0.5) + (newScale * 0.5) + MARGIN;

    if (newScale > 0.1) {
      // LEFT
      if (Math.random() > RECURCIVE_RANDOM && forbidenFaces.indexOf(LEFT) === -1) {
        (Math.random() > 0.5)
          ? this._recurciveCubeCreation(x - pos, y + border, newScale, [...forbidenFaces, RIGHT]) // Left - Up
          : this._recurciveCubeCreation(x - pos, y - border, newScale, [...forbidenFaces, RIGHT]) // Left - Down
        ;
      }
      // UP
      if (Math.random() > RECURCIVE_RANDOM && forbidenFaces.indexOf(UP) === -1) {
        (Math.random() > 0.5)
        ? this._recurciveCubeCreation(x - border, y + pos, newScale, [...forbidenFaces, DOWN]) // Up - Left
        : this._recurciveCubeCreation(x + border, y + pos, newScale, [...forbidenFaces, DOWN]) // Up - Right
        ;
      }
      // RIGTH
      if (Math.random() > RECURCIVE_RANDOM && forbidenFaces.indexOf(RIGHT) === -1) {
        (Math.random() > 0.5)
          ? this._recurciveCubeCreation(x + pos, y + border, newScale, [...forbidenFaces, LEFT]) // Right - Up
          : this._recurciveCubeCreation(x + pos, y - border, newScale, [...forbidenFaces, LEFT]) // Right - Down
        ;
      }
      // DOWN
      if (Math.random() > RECURCIVE_RANDOM && forbidenFaces.indexOf(DOWN) === -1) {
        (Math.random() > 0.5)
          ? this._recurciveCubeCreation(x - border, y - pos, newScale, [...forbidenFaces, UP]) // Down - Left
          : this._recurciveCubeCreation(x + border, y - pos, newScale, [...forbidenFaces, UP]) // Down - Right
        ;
      }
    }
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