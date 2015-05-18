export function requestAnimationFrame(callback) {
  return (window.requestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.msRequestAnimationFrame)(callback);
};

export function cancelAnimationFrame(frame) {
  return (window.cancelAnimationFrame ||
          window.mozCancelAnimationFrame)(frame);
};

export default class Scene {
  constructor (canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.drawables = [];
  }

  update () {
    this.drawables.map((drawable) => {
      drawable.update();
    });
  }

  draw () {
    this.drawables.map((drawable) => {
      drawable.draw(this.ctx);
    });
  }

  add (drawable) {
    this.drawables.push(drawable);
  }

  remove (drawable) {
    const index = this.drawables.indexOf(drawable);

    if (index > -1) {
      this.drawables.splice(index, 1);
    }
  }

  loop () {
    this.update();
    this.draw();

    this.animationFrame = requestAnimationFrame(() => {
      this.loop();
    });
  }

  start () {
    this.loop();
  }

  stop () {
    cancelAnimationFrame(this.animationFrame);
    this.animationFrame = null;
  }

}
