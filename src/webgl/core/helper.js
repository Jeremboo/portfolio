import {
  PointLightHelper, DirectionalLightHelper
} from 'three';

import { GUI } from 'dat.gui';
import Stats from 'stats-js';

import loop from '../../util/loop';

class Helper extends GUI {
  constructor () {
    super({
      autoPlace: false
    });

    this.params = {};
    this.hidden = false;

    // GUI
    this.domElement.style.position = 'absolute';
    this.domElement.style.top = '0px';
    this.domElement.style.right = '3px';
    this.domElement.style.zIndex = '99';
    // FPS metter
    this.stats = new Stats();
    loop.add('stats', this.stats.update.bind(this.stats));
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.bottom = '0';
    this.stats.domElement.style.left = '0';
    this.stats.domElement.style.zIndex = '99';

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.toggle = this.toggle.bind(this);

    this.hide();
  }

  /**
   * * *******************
   * * SHOW / HIDE
   * * *******************
   */

  toggle(wrapper) {
    if (this.hidden) {
      this.show();
      wrapper.style.zIndex = 1;
    } else {
      this.hide();
      wrapper.style.zIndex = -1;
    }
  }

  show () {
    this.hidden = false;
    this.domElement.style.display = 'block';
    this.stats.domElement.style.display = 'block';
  }

  hide () {
    this.hidden = true;
    this.domElement.style.display = 'none';
    this.stats.domElement.style.display = 'none';
  }

  /**
   * * *******************
   * * DAT GUI OVERWRITTING METHODS
   * * *******************
   */

  /**
   * Add a mesh to the GUI
   * @param {[type]} mesh   [description]
   * @param {[type]} params [description]
   */
  addMesh (mesh, params) {
    return this._addObject3D(mesh, params);
  }

  // TODO listen on condition
  addVector3 (vector3, { name = `Vector3-${Math.random()}`, parentFolder = this, range = 1, onChange = f => f } = {}) {
    const folder = parentFolder.addFolder(name);
    folder.add(vector3, 'x', -range, range).listen().onChange(onChange);
    folder.add(vector3, 'y', -range, range).listen().onChange(onChange);
    folder.add(vector3, 'z', -range, range).listen().onChange(onChange);
    return folder;
  }

  addPointLightHelper (light) {
    return new PointLightHelper(light);
  }

  addDirectionalLightHelper (light) {
    return new DirectionalLightHelper(light, 1, 0x000000);
  }

  /**
   * * *******************
   * * PRIVATE
   * * *******************
   */

  _addObject3D (object, {
    position = true,
    rotation = false,
    name = `Object-${object.uuid}`,
    parentFolder = this.addFolder(name),
    range = 100,
    listen = false,
    onChange = f => f
  } = {}) {
    if (position) {
      this.addVector3(object.position, {
        name: 'Position',
        range,
        parentFolder,
        onChange
      })
    }
    if (rotation) {
      this.addVector3(object.rotation, {
        name: 'Rotation',
        range: Math.PI,
        parentFolder,
        onChange
      })
    }
    // TODO scale folder
    return parentFolder;
  }
}

const helper = new Helper();
export default helper;
