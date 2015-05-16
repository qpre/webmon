import Frame from './frame'

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
    frames.map( (frame) => {
      let frm = new Frame(
        this.src,
        this.baseWidth * frame.width,
        this.baseHeight * frame.height,
        (frame.x + this.spacing) * this.baseWidth,
        (frame.y + this.spacing) * this.baseHeight
      );

      this.frames.push(frm);
    });
  }

  loadImage (src) {
    this.sheet.onload = () => {
      console.log(`${src} loaded !`);
    }

    this.sheet.src = src;
  }
};
