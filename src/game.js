import Preloader from './network/preloader';
import Scene from './graphics2d/scene';
import Map from './models/map';
import Player from './models/player';
import Keyboard from './inputs/keyboard'

export default class Game {
  constructor (id) {
    let domElement;

    this.files = [];
    this.preselectElements();

    // did we get an element to be rendered in ?
    if (id) {
      domElement = document.getElementById(id);
    } else {
      domElement = this.document.createElement('canvas');
      this.body.appendChild(domElement);
    }

    this.domElement = domElement;

    // fitting screen
    window.addEventListener('resize', () => { this.resize(); });
    this.resize();
  }

  // preselecting element for ease of use and avoiding useless selections
  preselectElements () {
    this.document  = document;
    this.body      = this.document.getElementsByTagName('body')[0];
    this.window    = window;
  }

  preloadData () {
    let manifestPreloader;
    let onManifestReady;

    onManifestReady = (file, req) => {
      this.manifest = JSON.parse(req.responseText);
      this.preloadAssets();
    };

    manifestPreloader = new Preloader(['/assets/manifest.json'], onManifestReady);
    manifestPreloader.load();
  }

  preloadAssets () {
    let preloader;
    let onFileReady;
    let onFilesReady;

    const files = this.manifest.maps.concat(this.manifest.sprites);

    onFileReady = (fileName, req) => {
      console.log(`loaded file: ${fileName}`);
      this.files[fileName] = req.response;
    };

    onFilesReady = () => {
      this.launch();
    };

    preloader = new Preloader (files, onFileReady, onFilesReady);
    preloader.load();
  }

  resize () {
    this.domElement.width  = this.window.innerWidth;
    this.domElement.height = this.window.innerHeight;
  }

  launch () {
    const mapData = JSON.parse(this.files['/assets/maps/poke.json']).map;

    // initiating 2D Scene
    this.keyboard = new Keyboard();
    this.scene = new Scene(this.domElement);

    // Prepping basic elements
    this.map = new Map(mapData);

    // init player
    this.player = new Player(mapData, 10, 10);

    // Adding elements
    this.scene.add(this.map);
    this.scene.add(this.player.view);

    // Starting scene
    this.scene.start();
  }

  // game entry point
  start () {
    console.log('Starting game');
    this.preloadData();
  }
}
