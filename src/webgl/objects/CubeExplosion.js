import { Object3D } from 'three';
import { TimelineLite } from 'gsap';

import FloatingCube from './Cube';

import {
  CUBE_SCALE_MAX_EXPLOSION, CUBE_SCALE_MIN_EXPLOSION,
} from '../../props';
import getRandomFloat from '../../util/getRandomFloat';

export default class CubeExplosion extends Object3D {
  constructor(x, y) {
    super();
    this.cubeSource = { x, y };

    this.i = 0;
    this.isExplosion = true;

    this.update = this.update.bind(this);
  }

  /**
   * * *******************
   * * UPDATE
   * * *******************
   */
  update() {
    for (this.i = this.children.length - 1; this.i >= 0; this.i--) {
      this.children[this.i].update();
    }
  }

  /**
   * * *******************
   * * CUBE
   * * *******************
   */

  addCube(texture) {
    const cube = new FloatingCube(
      this.cubeSource.x + getRandomFloat(-CUBE_SCALE_MIN_EXPLOSION * 0.5, CUBE_SCALE_MIN_EXPLOSION * 0.5),
      this.cubeSource.y + getRandomFloat(-CUBE_SCALE_MIN_EXPLOSION * 0.5, CUBE_SCALE_MIN_EXPLOSION * 0.5),
      getRandomFloat(CUBE_SCALE_MIN_EXPLOSION, CUBE_SCALE_MAX_EXPLOSION),
    );
    cube.setDetached();
    cube.setTexture(texture);
    this.children.push(cube);
    this.add(cube);
    cube.show();
    return cube;
  }

  /**
   * * *******************
   * * ANIMATIONS
   * * *******************
   */

  hide() {
    const tl = new TimelineLite();
    this.children.forEach((cube) => {
      tl.add(cube.hide, '+=0.03');
    });
    return tl;
  }
}