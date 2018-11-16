import {
  Scene, OrthographicCamera, WebGLRenderer, PCFSoftShadowMap,
} from 'three';

import loop from '../../util/loop';

export default class Webgl {
  constructor (canvas, w, h) {
    this.width = w;
    this.height = h;
    this.canvas = canvas;
    this.isStarted = false;

    // camera / scene
    this.scene = new Scene();

    // this.camera = new PerspectiveCamera(50, w / h, 1, 1000);
    // this._visibleHeightWithoutDist = 2 * Math.tan(radian(this.camera.fov) / 2); // 2 * Math.tan(this.vFOV / 2)
    this.camera = new OrthographicCamera(-5 * (w / h), 5 * (w / h), 5, -5, 1, 1000);
    this.camera.position.set(0, 0, 10);
    this.cameraWidth = this.camera.right * 2;
    this.cameraHeight = this.camera.top * 2;

    this.currentCamera = this.camera;

    // renderer
    this.renderer = new WebGLRenderer({
      antialias: true,
      canvas
    });
    this.renderer.setPixelRatio(window.devicePixelRatio || 1);
    this.renderer.setClearColor(0xffffff, 1);
    // this.renderer.toneMapping = Uncharted2ToneMapping;
    // this.renderer.toneMappingExposure = 2.5;
    // this.renderer.toneMappingWhitePoint = 1.5;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap; // default THREE.PCFShadowMap

    // Bind functions
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.resize = this.resize.bind(this);
    this._update = this._update.bind(this);

    this.resize(this.width, this.height);
  }

  resize (w, h) {
    this.width = w;
    this.height = h;

    // Perspective camera
    // this.currentCamera.aspect = this.width / this.height;
    // this.currentCamera.updateProjectionMatrix();

    // Ortho camera
    this.currentCamera.left = -5 * (w / h);
		this.currentCamera.right = 5 * (w / h);
		this.currentCamera.top = 5;
		this.currentCamera.bottom = -5;
    this.currentCamera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  }

  _update () {
    this.renderer.render(this.scene, this.currentCamera);
  }

  /**
   * * *******************
   * * LOOP
   * * *******************
   */
  start () {
    if (!this.isStarted) {
      this.isStarted = true;
      this._update(); // HACK first renderer
      loop.add('0000', this._update);
    }
  }
  stop () {
    if (this.isStarted) {
      this.isStarted = false;
      loop.remove('0000');
    }
  }

  /**
   * * *******************
   * * ADD / REMOVE
   * * *******************
   */
  add (mesh, _id) {
    const id = _id || mesh.uuid;
    if (!id) {
      console.log('ERROR: Webgl.add(): need an id');
      return;
    }
    this.scene.add(mesh);
    if (!mesh.update) return;
    loop.add(id, () => { mesh.update(); });
  }

  remove (mesh, id) {
    this.scene.remove(mesh);
    if (!mesh.update) return;
    loop.remove(id || mesh.uuid, () => { mesh.update(); });
  }

  /**
   * * *******************
   * * UTILS
   * * *******************
   */
  changeCamera (camera) {
    this.currentCamera = camera;
    this.resize(this.width, this.height);
  }

  getCanvasMeterSize (dist) {
    const height = this._visibleHeightWithoutDist * dist;
    const width = height * this.camera.aspect;
    return { width, height };
  }

  // Set an array of Meshes in the scene to render them a first time.
  computeMeshes (meshes) {
    let i = 0;
    const l = meshes.length;
    for (i = 0; i < l; i++) {
      this.add(meshes[i]);
    }
    this._update();
    for (i = 0; i < l; i++) {
      this.remove(meshes[i]);
    }
    this._update();
  }
}
