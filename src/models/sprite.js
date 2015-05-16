export default class Sprite {
  constructor (spriteInfos, frames) {
    this.src    = spriteInfos.src;
    this.sheet  = new Image();
    this.frames = [];

    this.baseWidth  = spriteInfos.width;
    this.baseHeight = spriteInfos.height;

    this.spacing = spriteInfos.spacing || 0;

    this.loadImage(spriteInfos.src);
    this.genFrames(frames);
  }

  genFrames (frames) {
    for frame in frames {
      self = this;

      this.frames.push({
        id: frame.id,

        width:  self.baseWidth * frame.width,
        height: self.baseHeight * frame.height,

        offsetX: (frame.x + self.spacing) * self.baseWidth,
        offsetY: (frame.y + self.spacing) * self.baseHeight,

        draw: function (ctx) {
          ctx.drawImage(self.src,
                  x, y,
                  this.size[0], this.size[1],
                  0, 0,
                  this.size[0], this.size[1]);
        }
      });
    }
  }

  loadImage (src) {
    this.sheet.onload = () => {
      console.log(`${src} loaded !`);
    }

    this.sheet.src = src;
  }
};
