import {
  BoxGeometry, MeshToonMaterial, Mesh, Color,
  Euler,
} from 'three';

import getRandomFloat from '../../util/getRandomFloat.js';
import radian from '../../util/radian';
import attractor from '../../util/attractor';


/**
 * * *******************
 * * FLOATING CUBE
 * * *******************
 */
export default class Cube extends Mesh {
  constructor(x, y, { force = 0.004, scale = getRandomFloat(0.5, 2), color = '#C9F0FF' } = {}) {
    // Create an array of materials to update the face later
    const material = new MeshToonMaterial({
      color: new Color(color),
    });
    const faceMaterials = [
      material, // Left side
      material, // Right side
      material, // Top side
      material, // Bottom side
      material, // Front side
      material  // Back side
    ];

    const geometry = new BoxGeometry(scale, scale, scale);
    super(geometry, faceMaterials);
    this.castShadow = true;
    this.receiveShadow = false;

    this._scale = scale;
    this.randomRotation = new Euler(
      getRandomFloat(radian(-30), radian(30)),
      getRandomFloat(radian(-30), radian(30)),
      0,
    );

    // Init a position and rotation under the floor
    this.position.set(x, y, -scale * 1.5);
    this.rotation.copy(this.randomRotation);

    // Create attractors
    this.targetedPosition = this.position.clone();
    this.targetedRotation = this.rotation.clone();
    this.attractPosition = attractor(this.position, this.targetedPosition, force, 0.92);
    this.attractRotation = attractor(this.rotation, this.targetedRotation, force * 2, 0.945);

    // Bind
    this.update = this.update.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  update() {
    // Update attractors
    this.attractPosition();
    this.attractRotation();
  }

  /**
   * * *******************
   * * ANIMATIONS
   * * *******************
   */
  show() {
    this.targetedPosition.z = -(this._scale * 0.425);
    this.targetedRotation.set(0, 0, 0);
  }

  hide() {
    this.targetedPosition.z = -this._scale * 1.5;
    this.targetedRotation.copy(this.randomRotation);
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