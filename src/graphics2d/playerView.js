import Drawable from './drawable';
import Sprite from '../models/sprite';

export default class PlayerView extends Drawable {
  constructor (data, model) {
    super();

    this.model = model;

    this.wrc = 0;
    this.wrc++;

    this.sprite = new Sprite(data.charactersOptions, data.characters, () => {
      this.onReady();
    });
  }

  onReady () {
    this.wrc--;
    if (this.wrc === 0) { this.ready = true; }
  }

  draw(ctx) {
    if (this.ready) {
      const x = (this.sprite.baseWidth) * this.model.x;
      const y = (this.sprite.baseHeight) * this.model.y;

      this.sprite.frames[0].draw(ctx, x, y);
    }
  }

}
