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
  projects: [
    {
      name: 'design-my-smart',
      type: ASSET_TYPES.TEX,
      url: 'assets/images/previews/design-my-smart.png',
    },
    {
      name: 'o-de-sisley',
      type: ASSET_TYPES.TEX,
      url: 'assets/images/previews/o-de-sisley.png',
    },
    {
      name: 'omniwomen',
      type: ASSET_TYPES.TEX,
      url: 'assets/images/previews/omniwomen.png',
    },
    {
      name: 'ricochet',
      type: ASSET_TYPES.TEX,
      url: 'assets/images/previews/ricochet.png',
    },
    {
      name: 'shooting-star-equalizer',
      type: ASSET_TYPES.TEX,
      url: 'assets/images/previews/shooting-star-equalizer.png',
    },
    {
      name: 'sncf-prevision',
      type: ASSET_TYPES.TEX,
      url: 'assets/images/previews/sncf-prevision.png',
    },
    {
      name: 'sweet-pursuit',
      type: ASSET_TYPES.TEX,
      url: 'assets/images/previews/sweet-pursuit.png',
    },
    {
      name: 'wellnesslab',
      type: ASSET_TYPES.TEX,
      url: 'assets/images/previews/wellnesslab.png',
    },
    {
      name: 'test',
      type: ASSET_TYPES.TEX,
      url: 'assets/images/previews/test.png',
    },
  ],
  scribbles: [
    {
      name: 'scribble-1',
      type: ASSET_TYPES.TEX,
      url: 'assets/images/previews/scribble-1.png',
    },
    {
      name: 'scribble-2',
      type: ASSET_TYPES.TEX,
      url: 'assets/images/previews/scribble-2.png',
    },
    // {
    //   name: 'scribble-3',
    //   type: ASSET_TYPES.TEX,
    //   url: 'assets/images/previews/scribble-3.png',
    // },
    {
      name: 'scribble-4',
      type: ASSET_TYPES.TEX,
      url: 'assets/images/previews/scribble-4.png',
    },
    {
      name: 'scribble-5',
      type: ASSET_TYPES.TEX,
      url: 'assets/images/previews/scribble-5.png',
    },
    {
      name: 'scribble-6',
      type: ASSET_TYPES.TEX,
      url: 'assets/images/previews/scribble-6.png',
    },
    {
      name: 'scribble-7',
      type: ASSET_TYPES.TEX,
      url: 'assets/images/previews/scribble-7.png',
    },
    {
      name: 'scribble-8',
      type: ASSET_TYPES.TEX,
      url: 'assets/images/previews/scribble-8.png',
    },
    {
      name: 'scribble-9',
      type: ASSET_TYPES.TEX,
      url: 'assets/images/previews/scribble-9.png',
    },
    // {
    //   name: 'scribble-10',
    //   type: ASSET_TYPES.TEX,
    //   url: 'assets/images/previews/scribble-10.png',
    // },
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
    this.loadScribbleAndShow = false;
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
   * Load a specific asset into a pack
   * @param  {String} packName the name of the pack
   * @param  {String} assetName the name of the asset
   * @return {Promise} [description]
   */
  loadAsset(packName, assetName, onProgress = f => f) {
    const assetProps = ASSET_PACKS[packName].filter((asset) => asset.name === assetName)[0];
    return this._loadAsset(assetProps, onProgress);
  }

  /**
   * * *******************
   * * CUSTOM LOADERS
   */

  async loadScribblePack(onAssetLoadedCallback) {
    this.loadScribbleAndShow = true;

    // Load scribble asset and call callback avec it was loaded
    for (let i = 0; i < ASSET_PACKS.scribbles.length; i++) {
      if (this.loadScribbleAndShow) {
        await this._loadAsset(ASSET_PACKS.scribbles[i]);
        setTimeout(() => {
          onAssetLoadedCallback(this.get(ASSET_PACKS.scribbles[i].name));
        }, (100 * i) + 450);
      }
    }
  }

  stopScribblePackLoading() {
    this.loadScribbleAndShow = false;
  }

  /**
   * * *******************
   * * UTILS
   * * *******************
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
        process.env.BASENAME + url,
        (...data) => {
          this.assets[name] = data[0];
          resolve(data[0]);
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
