import {
  Object3D, AmbientLight, DirectionalLight, PointLight
} from 'three';

export default class Lights extends Object3D {
  constructor (top, left) {
    super();

    // INIT LIGHTS
    this.ambiantLight = new AmbientLight(0xffffff, 0.8);
    this.add(this.ambiantLight);

    this.directionalLight = new DirectionalLight(0xffffff, 0.2);
    this.directionalLight.position.set(left, top, 15);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.mapSize.width = 512;
    this.directionalLight.shadow.mapSize.height = 512;
    this.directionalLight.shadow.camera.near = 0.5;
    this.directionalLight.shadow.camera.far = 50;

    // Update the space taken by the shadow
    this.directionalLight.shadow.camera.top = 10;
    this.directionalLight.shadow.camera.left = -10;
    this.directionalLight.shadow.camera.right = 10;

    this.add(this.directionalLight);

    // const pointLight = new PointLight(0xfff7d7, 0.05, 10);
    // pointLight.position.set(0, 0, 3);
    // this.add(pointLight);
  }
}
