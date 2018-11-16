import {
  Object3D, Mesh, PlaneGeometry, MeshBasicMaterial, ShadowMaterial,
} from 'three';

export default class Plane extends Object3D {
  constructor(width, height) {
    super();

    // Custom shadow
    this.planeShadowMaterial = new ShadowMaterial({
      color: 0x070707,
    });
    this.planeShadowMaterial.opacity = 0.05;
    this.planeShadow = new Mesh(new PlaneGeometry(width, height), this.planeShadowMaterial);
    this.planeShadow.receiveShadow = true;
    this.add(this.planeShadow);

    // Plane
    this.plane = new Mesh(
      new PlaneGeometry(width, height),
      new MeshBasicMaterial({
        color: 0xffffff,
      }),
    );
    this.add(this.plane);
  }

  resize(width, height) {
    this.plane.scale.set(width, height, 1);
  }
}