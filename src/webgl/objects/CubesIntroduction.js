import { Object3D } from 'three';

import CubeIntroduction from './CubeIntroduction';

export default class CubesIntroduction extends Object3D {
  constructor(onCubeDetached) {
    super();

    this.attached = true;

    this.cube = new CubeIntroduction(onCubeDetached);
    this.add(this.cube);

    this.update = this.update.bind(this);
  }

  /**
   * * *******************
   * * UPDATE
   * * *******************
   */
  update() {
    this.cube.update();
  }

  /**
   * * *******************
   * * ANIMATIONS
   * * *******************
   */
  show() {
    return this.cube.show();
  }

  hide() {
    return this.cube.hide();
  }
}