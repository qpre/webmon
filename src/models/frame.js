export default class Frame {
  constructor (src, width, height, offsetX, offsetY) {
    this.width  =  width;
    this.height =  height;

    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }

  draw (ctx) {
    ctx.drawImage(
      self.src,
      offsetX, offsetY,
      this.width, this.height,
      0, 0,
      this.width, this.height
    );
  }
}
