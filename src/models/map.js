import Sprite from '../models/sprite';
import Drawable from '../graphics2d/drawable';

export default class Map extends Drawable {
  constructor (data) {
    super();

    this.width  = data.width;
    this.height = data.height;

    this.wrc    = 0; // wait reference count
    this.ready  = false;

    this.mapArray = data.array;
    this.wrc++;

    this.sprite = new Sprite(data.tilesOptions, data.tiles, () => {
      this.onReady()
    });
  }

  onReady () {
    this.wrc--;
    if (this.wrc === 0) { this.ready = true; }
  }

  draw (ctx) {
    if (this.ready) {
      for (let key = 0; key < this.mapArray.length; key++) {
        const spriteId = this.mapArray[key];
        const x = (this.sprite.baseWidth) * (key % this.width);
        const y = (this.sprite.baseHeight) * Math.floor(key / this.height);

        this.sprite.frames[spriteId].draw(ctx, x, y);
      }
    }
  }
}
