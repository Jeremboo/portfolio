import { Vector2 } from 'three';
import { TweenLite, Power3 } from 'gsap';

import Cube from './Cube';

import {

} from '../../props';

import getDistVec2 from '../../util/getDistVec2';

const ATTRACTION_DIST_MAX = 3;

export default class CubeIntroduction extends Cube {
  constructor(onCubeDetached) {
    super(0, 0, 0.5);

    this.isAttached = true;
    this.onCubeDetached = onCubeDetached;
  }


  setAttractionPos(x, y) {
    const targetedPositionX = x - this.draggingPosition[0];
    const targetedPositionY = y - this.draggingPosition[1];

    if (this.isAttached) {
      const dist = getDistVec2(
        targetedPositionX,
        targetedPositionY,
        this.initialPosition.x,
        this.initialPosition.y,
      );
      const orientation = new Vector2(targetedPositionX, targetedPositionY).normalize();

      if (dist < ATTRACTION_DIST_MAX) {
        this.targetedPosition.x = orientation.x * dist * 0.2;
        this.targetedPosition.y = orientation.y * dist * 0.2;
      } else {
        this.detachCube(orientation);
      }
    } else {
      this.targetedPosition.x = targetedPositionX;
      this.targetedPosition.y = targetedPositionY;
    }
  }

  detachCube(orientation) {
    this.isAttached = false;
    this.animateScale();
    this.onCubeDetached();
    // Add an ejection mouvement
    this.targetedPosition.x = orientation.x * 10;
    this.targetedPosition.y = orientation.y * 10;
    // TODO add a rotation movement
    // TODO transform the cube on sliding cube
  }

  animateScale() {
    const scale = { v: 1 };
    // TODO update the 2D size too
    TweenLite.to(scale, 0.4, {
      v: 10,
      ease: Power3.easeIn,
      onUpdate: () => {
        this.shape.x = scale.v;
        this.shape.y = scale.v;
        this.scale.set(scale.v, scale.v, scale.v);
      }
    });
  }
}