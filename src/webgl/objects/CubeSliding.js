import Cube from './Cube';

import {
  MOTION_FRICTION,
  MOTION_FRICTION_SLIDING,
  TARGETED_POSITION_ATTRACTION_SLIDING,
  ORIENTATION_FRICTION_SLIDING,
} from '../../props';


export default class CubeSliding extends Cube {
  constructor(...props) {
    super(...props);
    this.initAttraction();
  }

  initAttraction() {
    this.motionFriction = MOTION_FRICTION_SLIDING;
    this.currentAttractionVelocity = TARGETED_POSITION_ATTRACTION_SLIDING;
    this.orientationFriction = ORIENTATION_FRICTION_SLIDING;
  }

  setDraggingPosition(uv) {
    super.setDraggingPosition(uv);
    this.motionFriction = MOTION_FRICTION;
  }
}