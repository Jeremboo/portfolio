import {
  BoxGeometry, MeshToonMaterial, Mesh, Vector2,
} from 'three';

import { Body, Box } from 'p2';

import getRandomFloat from '../../util/getRandomFloat.js';
import radian from '../../util/radian';

import {
  FLOATING_ATTRACTION, FLOATING_VELOCITY,
  ROTATION_ATTRACTION, ROTATION_VELOCITY,
  INITIAL_POSITION_ATTRACTION, INITIAL_ROTATION_ATTRACTION,
  FRICTION, MASS,
  FORCE_ROTATION_VELOCITY, FORCE_ROTATION_ATTRACTION,
  FLOATING_LINE,
} from '../../props';

const UV_CENTER = [0, 0];

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
    this.initialRotation = new Vector2(
      getRandomFloat(radian(-30), radian(30)),
      getRandomFloat(radian(-30), radian(30)),
    );

    // Init a position and rotation under the floor
    this.position.set(x, y, -scale * 1.5);
    this.rotation.set(this.initialRotation.x, this.initialRotation.y, 0);

    // Create attractors
    this.targetedFloatingPosition = this.position.z;
    this.targetedRotation = this.initialRotation.clone();

    this.floatingForce = 0;
    this.rotationForce = new Vector2();

    // Physic
    this.physicEnabled = false; //  p2 physic
    this.currentImpluse = [0, 0];
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
    // Update Forces
    // - floating force
    this.floatingForce = (this.floatingForce - ((this.position.z - this.targetedFloatingPosition) * FLOATING_ATTRACTION)) * FLOATING_VELOCITY;
    // - rotation force
    this.rotationForce.x -= ((this.rotation.x - this.targetedRotation.x) * ROTATION_ATTRACTION);
    this.rotationForce.y -= ((this.rotation.y - this.targetedRotation.y) * ROTATION_ATTRACTION);
    this.rotationForce.multiplyScalar(ROTATION_VELOCITY);

    // * *****************
    // Update physics
    if (this.physicEnabled) {
      // Update targeted rotation
      this.targetedRotation.multiplyScalar(FORCE_ROTATION_ATTRACTION);
      // Apply friction
      // http://schteppe.github.io/p2.js/docs/classes/Body.html#method_applyDamping
      this.body.applyDamping(FRICTION);
      // Update angle close to zero
      this.body.angle -= this.body.angle * INITIAL_ROTATION_ATTRACTION;

      // Position attraction
      // V1 ------------------------------------------------------------
      // this.body.position[0] -= (this.body.position[0] - this.initialPosition.x) * INITIAL_POSITION_ATTRACTION;
      // this.body.position[1] -= (this.body.position[1] - this.initialPosition.y) * INITIAL_POSITION_ATTRACTION;
      // V2 ------------------------------------------------------------
      this.currentImpluse[0] = -(this.body.position[0] - this.initialPosition.x) * INITIAL_POSITION_ATTRACTION;
      this.currentImpluse[1] = -(this.body.position[1] - this.initialPosition.y) * INITIAL_POSITION_ATTRACTION;
      this.body.applyImpulse(this.currentImpluse, UV_CENTER);

      // TODO apply a rotation like line 139-140 depending to the difference between old and new position
      // Slant the cube depending to the motion orientation
      this.targetedRotation.x = -(this.body.position[1] - this.position.y);
      this.targetedRotation.y = (this.body.position[0] - this.position.x);
    }

    // * ***********
    // Update position and rotation
    this.position.set(
      this.body.position[0],
      this.body.position[1],
      this.position.z + this.floatingForce,
    );
    this.rotation.set(
      this.rotation.x + this.rotationForce.x,
      this.rotation.y + this.rotationForce.y,
      this.body.angle,
    );
  }

  /**
   * * *******************
   * * PHYSICS
   * * *******************
   */

  /**
   * Apply an impulsion to the box
   * @param {Array[2]} impulseVector
   * @param {Array[2]} uv
   */
  applyImpulse(impulseVector, uv) {
    uv[0] *= this._scale;
    uv[1] *= this._scale;
    // TODO do not add impulse because it accumulate velocity.instead of just move a little more
    this.body.applyImpulse(impulseVector, uv);
  }

  /**
   * * *******************
   * * ANIMATIONS
   * * *******************
   */
  show() {
    this.physicEnabled = true;
    this.targetedFloatingPosition = -(this._scale * FLOATING_LINE);
    this.targetedRotation.set(0, 0);
  }

  hide() {
    this.physicEnabled = false;
    this.targetedFloatingPosition = -this._scale * 1.5;
    this.targetedRotation.copy(this.initialRotation);
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