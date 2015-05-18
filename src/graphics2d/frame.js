import Drawable from './drawable';

export default class Frame extends Drawable {
  constructor (img, width, height, offsetX, offsetY) {
    super();

    this.img = img;

    this.width  =  width;
    this.height =  height;

    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }

  draw (ctx, x, y) {
    ctx.drawImage(
      this.img,
      this.offsetX, this.offsetY,
      this.width, this.height,
      x, y,
      this.width, this.height
    );
  }
}
