import {
  BoxGeometry, MeshToonMaterial, Mesh
} from 'three';

import { Body, Box } from 'p2';

import getRandomFloat from '../../util/getRandomFloat.js';

import {
  FLOATING_VELOCITY, FLOATING_FRICTION,
  PITCHING_VELOCITY, PITCHING_FRICTION,
  TARGETED_POSITION_ATTRACTION, TARGETED_POSITION_ATTRACTION_ON_DRAG,
  MOTION_FRICTION, SLANT_FRICTION, ORIENTATION_FRICTION,
  UV_REDUCTION, MASS, FLOATING_LINE,
  MIN_ROTATION, MAX_ROTATION,
  MOTION_FRICTION_DETACHED, TARGETED_POSITION_ATTRACTION_DETACHED, ORIENTATION_FRICTION_DETACHED,
} from '../../props';

/**
 * * *******************
 * * FLOATING CUBE
 * * *******************
 */
export default class Cube extends Mesh {
  constructor(x, y, scale) {
    // Create an array of materials to update the face later
    // TODO change the toon material to a more efficient material (MeshLambertMaterial)
    const material = new MeshToonMaterial({
      color: 0xC9F0FF,
    });
    const faceMaterials = [
      material, // Left side
      material, // Right side
      material, // Top side
      material, // Bottom side
      material, // Front side
      undefined  // Back side. Not need to be rendered
    ];

    const geometry = new BoxGeometry(scale, scale, scale);
    super(geometry, faceMaterials);
    this.castShadow = true;
    this.receiveShadow = false;

    this._scale = scale;
    this.initialPosition = { x, y };
    this.initialRotation = {
      x: getRandomFloat(MIN_ROTATION, MAX_ROTATION) * (Math.random() > 0.5 ? 1 : -1),
      y: getRandomFloat(MIN_ROTATION, MAX_ROTATION) * (Math.random() > 0.5 ? 1 : -1),
    };

    this.detached = false;
    this.currentAttractionVelocity = TARGETED_POSITION_ATTRACTION;
    this.motionFriction = MOTION_FRICTION;
    this.orientationFriction = ORIENTATION_FRICTION;

    // Init a position and rotation under the floor
    this.position.set(this.initialPosition.x, this.initialPosition.y, -scale * 1.5);
    this.rotation.set(this.initialRotation.x, this.initialRotation.y, 0);

    // Create targets values
    this.targetedFloatingPosition = this.position.z;
    this.targetedPosition = { ...this.initialPosition };
    this.targetedRotation = { ...this.initialRotation };

    // Physic with p2.js
    this.physicEnabled = false;
    this.floatingForce = 0;
    this.pitchingForce = new Float32Array([0, 0]);
    this.currentImpluse = new Float32Array([0, 0]);
    this.UVAttraction = new Float32Array([0, 0]);
    this.draggingPosition = new Float32Array([0, 0]);

    this.body = new Body({
      mass: MASS,
      position: [this.position.x, this.position.y],
    });
    this.shape = new Box({ width: scale, height: scale });
    this.body.addShape(this.shape);

    // Bind
    this.update = this.update.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  update() {
    // * *****************
    // Update Forces
    // - floating force
    this.floatingForce = (this.floatingForce - ((this.position.z - this.targetedFloatingPosition) * FLOATING_VELOCITY)) * FLOATING_FRICTION;
    // - rotation force
    this.pitchingForce[0] = (this.pitchingForce[0] - ((this.rotation.x - this.targetedRotation.x) * PITCHING_VELOCITY)) * PITCHING_FRICTION;
    this.pitchingForce[1] = (this.pitchingForce[1] - ((this.rotation.y - this.targetedRotation.y) * PITCHING_VELOCITY)) * PITCHING_FRICTION;

    // * *****************
    // Update physics
    if (this.physicEnabled) {
      // - Body position
      // V1 ------------------------------------------------------------
      // this.body.position[0] -= (this.body.position[0] - this.initialPosition.x) * this.currentAttractionVelocity;
      // this.body.position[1] -= (this.body.position[1] - this.initialPosition.y) * this.currentAttractionVelocity;
      // V2 ------------------------------------------------------------
      this.currentImpluse[0] = -(this.body.position[0] - this.targetedPosition.x) * this.currentAttractionVelocity;
      this.currentImpluse[1] = -(this.body.position[1] - this.targetedPosition.y) * this.currentAttractionVelocity;
      this.body.applyImpulse(this.currentImpluse, this.UVAttraction);
      // V3 ------------------------------------------------------------
      // - positionForce
      // this.positionForce.x -= ((this.position.x - this.targetedPosition.x) * this.currentAttractionVelocity);
      // this.positionForce.y -= ((this.position.y - this.targetedPosition.y) * this.currentAttractionVelocity);
      // this.positionForce.z -= ((this.position.z - this.targetedPosition.z) * this.currentAttractionVelocity);
      // this.positionForce.multiplyScalar(this.positionForceFriction);
      // this.currentImpluse[0] = this.positionForce.x;
      // this.currentImpluse[1] = this.positionForce.y;
      // this.body.applyImpulse(this.currentImpluse, this.UVAttraction);

      // Apply a frition to the motion via p2.js
      this.body.applyDamping(this.motionFriction);

      // * ***********
      // Straightening
      // - TargetedRotation
      // Slant the cube depending to the motion orientation and  Reduce the targeted rotation angle (friction)
      this.targetedRotation.x = -(this.body.position[1] - this.position.y) * SLANT_FRICTION;
      this.targetedRotation.y = (this.body.position[0] - this.position.x) * SLANT_FRICTION;
      // - Body angle Z
      // Animate the angle close to zero (easing animation)
      this.body.angle -= this.body.angle * this.orientationFriction;
    }

    // * ***********
    // Update position and rotation
    this.position.set(
      this.body.position[0],
      this.body.position[1],
      this.position.z + this.floatingForce,
    );
    this.rotation.set(
      this.rotation.x + this.pitchingForce[0],
      this.rotation.y + this.pitchingForce[1],
      this.body.angle,
    );
  }

  /**
   * * *******************
   * * DRAG & DROP
   * * *******************
   */

  // Drag
  setDraggingPosition(uv) {
    this.draggingPosition[0] = (uv.x - 0.5) * this._scale;
    this.draggingPosition[1] = (uv.y - 0.5) * this._scale;

    this.UVAttraction[0] = this.draggingPosition[0] * UV_REDUCTION;
    this.UVAttraction[1] = this.draggingPosition[1] * UV_REDUCTION;

    this.currentAttractionVelocity = TARGETED_POSITION_ATTRACTION_ON_DRAG;
    if (this.detached) this.motionFriction = MOTION_FRICTION;
  }

  setAttractionPos(x, y) {
    this.targetedPosition.x = x - this.draggingPosition[0];
    this.targetedPosition.y = y - this.draggingPosition[1];
  }

  // - Drop
  drop() {
    this.UVAttraction[0] = 0;
    this.UVAttraction[1] = 0;

    this.targetedPosition.x = this.initialPosition.x;
    this.targetedPosition.y = this.initialPosition.y;

    if (!this.detached) {
      this.currentAttractionVelocity = TARGETED_POSITION_ATTRACTION;
    } else {
      this.motionFriction = MOTION_FRICTION_DETACHED;
      this.currentAttractionVelocity = TARGETED_POSITION_ATTRACTION_DETACHED;
      this.orientationFriction = ORIENTATION_FRICTION_DETACHED;
    }
  }

  /**
   * * *******************
   * * DETAHED
   * * *******************
   */

  setDetached() {
    this.detached = true;
    this.motionFriction = MOTION_FRICTION_DETACHED;
    this.currentAttractionVelocity = TARGETED_POSITION_ATTRACTION_DETACHED;
    this.orientationFriction = ORIENTATION_FRICTION_DETACHED;
  }

  /**
   * * *******************
   * * PHYSICS
   * * *******************
   */

  /**
   * Apply an impulsion to the box depending to the scale
   * @param {Array[2]} impulse
   * @param {Array[2]} uv
   */
  applyImpulse(impulse, uv) {
    uv[0] *= this._scale;
    uv[1] *= this._scale;
    this.body.applyImpulse(impulse, uv);
  }

  /**
   * * *******************
   * * ANIMATIONS
   * * *******************
   */
  show() {
    this.physicEnabled = true;
    this.targetedFloatingPosition = -(this._scale * FLOATING_LINE);
    this.targetedRotation.x = 0;
    this.targetedRotation.y = 0;
  }

  hide() {
    this.physicEnabled = false;
    this.targetedFloatingPosition = -this._scale * 1.5;
    this.targetedRotation.x = this.initialRotation.x;
    this.targetedRotation.y = this.initialRotation.y;
  }

  /**
   * * *******************
   * * TEXTURE
   * * *******************
   */

  setTexture(texture) {
    // TODO create a custom shader to add shadowing to the texture
    this.material[4] = new MeshToonMaterial({
      map: texture,
    });
  }
}