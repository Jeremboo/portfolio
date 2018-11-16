import { TextureLoader, ImageLoader } from 'three';

const ASSET_TYPES = {
  // OBJ: 'obj',
  // JSON: 'json',
  TEX: 'tex',
  IMG: 'img',
};

const ASSET_PACKS = {
  starting: [
    // {
    //   name: 'combined_a_tex',
    //   type: ASSET_TYPES.TEX,
    //   url: require('~assets/img/textures/combined_a.png'),
    // },
  ],
  project1: [
    // {
    //   name: 'combined_a_tex',
    //   type: 'ASSET_TYPES.TEX',
    //   url: require('~assets/img/textures/combined_a.png'),
    // },
  ],
  test: [
    {
      name: 'test',
      type: ASSET_TYPES.TEX,
      url: '../../../assets/images/previews/test.png',
    }
  ]
};

// TODO add gifT loader
class AssetController {
  constructor() {
    this.assets = {};
    this._loaders = {
      // [ASSET_TYPES.OBJ]: new ObjectLoader(),
      // [ASSET_TYPES.JSON]: new JSONLoader(),
      [ASSET_TYPES.TEX]: new TextureLoader(),
      [ASSET_TYPES.IMG]: new ImageLoader()
    };
  }

  /**
   * ********************
   * LOADERS
   * ********************
   */

  /**
   * Load all assets used directly
   * @return {Promise} [description]
   */
  loadStartingPack(onProgress = f => f) {
    return this.loadPack('starting', onProgress);
  }

  /**
   * Load a specific pack
   * @param  {String} packName the name of the pack
   * @return {Promise} [description]
   */
  loadPack(packName, onProgress = f => f) {
    return this._loadPack(ASSET_PACKS[packName], onProgress);
  }

  /**
   * ********************
   * UTILS
   * ********************
   */

  get(name) {
    const asset = this.assets[name];
    if (asset === undefined) {
      console.log.error(`ERROR AssetController.get(): The asset ${name} is not loaded.`);
      return false;
    }
    return asset;
  }

  /**
   * Delete an asset to free the memory
   * @return {[type]} [description]
   */
  deleteAsset(assetName) {
    console.warn('TODO: Delete the asked asset property');
  }

  /**
   * ********************
   * PRIVATE
   * ********************
   */

  /**
   * Create a promise who load the file and manage the progression.
   * Then, save the file into this.assets array.
   * @param  {String}   url        [description]
   * @param  {String}   name       [description]
   * @param  {String}   type       [description]
   * @param  {Function} progress   [description]
   * @return {Promise}             [description]
   */
  _loadAsset({ url, name, type } = {}, progress = f => f) {
    return new Promise((resolve, reject) => {
      const loader = this._loaders[type];
      if (!loader) {
        reject(new Error(`ERROR: The loader for ${type} files doesn't exist.`));
        return;
      }

      // Load the file and save it.
      loader.load(
        url,
        (...data) => {
          this.assets[name] = data[0];
          resolve();
        },
        progress,
        () => {
          console.log(`ERROR._loadAsset(): ${name} couldn't loaded.`);
          this.assets[name] = false;
          resolve();
        }
      );
    });
  }

  /**
   * Load all assets from a selected pack
   * @param  {Array}     assetList     The pack array to load.
   * @param  {Fonction}  onProgress    Progress function
   * @return {Promise}
   */
  async _loadPack(assetList, onProgress) {
    let i;
    const nbrOfAssetsToLoad = assetList.length;
    const persentSolvedPerAssets = 100 / nbrOfAssetsToLoad;

    for (i = 0; i < nbrOfAssetsToLoad; i++) {
      const { url, name, type } = assetList[i];

      let loadingProgress = 0;
      await this._loadAsset({ url, name, type }, v => {
        const { loaded, total } = v;
        const progress = persentSolvedPerAssets * (loaded / total);
        onProgress(`${name}...`, progress - loadingProgress);
        loadingProgress = progress;
      });

      onProgress(`${name} loaded`, persentSolvedPerAssets * (i + 1));
    }
  }
}
export default new AssetController();
