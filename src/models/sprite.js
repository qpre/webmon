import Frame from '../graphics2d/frame'

export default class Sprite {
  constructor (spriteInfos, frames, onReady) {
    this.src    = spriteInfos.src;
    this.sheet  = new Image();
    this.frames = [];

    this.baseWidth  = spriteInfos.width;
    this.baseHeight = spriteInfos.height;

    this.spacing = spriteInfos.spacing || 0;

    this.loadImage(spriteInfos.src, () => {
      this.genFrames(frames);
      onReady();
    });
  }

  genFrames (frames) {
    frames.map((frame) => {
      let frm = new Frame(
        this.sheet,
        this.baseWidth * frame.width,
        this.baseHeight * frame.height,
        this.spacing + (frame.x * (this.baseWidth + this.spacing)),
        this.spacing + (frame.y * (this.baseHeight + this.spacing))
      );

      this.frames.push(frm);
    });
  }

  loadImage (src, onReady) {
    this.sheet.onload = onReady;
    this.sheet.src = src;
  }
};
