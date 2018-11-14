import {
  Object3D, AmbientLight, DirectionalLight
} from 'three';

export default class Lights extends Object3D {
  constructor () {
    super();

    // INIT LIGHTS
    this.ambiantLight = new AmbientLight(0xffffff, 0.8);
    this.add(this.ambiantLight);

    this.directionalLight = new DirectionalLight(0xffffff, 0.2);
    this.directionalLight.position.set(-2, 1, 2);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.mapSize.width = 2048;
    this.directionalLight.shadow.mapSize.height = 2048;
    this.directionalLight.shadow.camera.near = 0.5;
    this.directionalLight.shadow.camera.far = 50;
    this.add(this.directionalLight);

    // const pointLight = new PointLight(0xfff7d7, 0.05);
    // pointLight.position.set(-2, 1, 1);
    // webgl.add(pointLight);
  }
}
