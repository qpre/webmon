export default class Tile {
  constructor (properties) {
    this.id      = properties.id;
    this.texture = properties.texture || 'red';

    // Neighbouring tiles
    this.top    = properties.top || null;
    this.bottom = properties.bottom || null;
    this.left   = properties.left || null;
    this.right  = properties.right || null;
  }

  toString () {
    const str = `id:    ${this.id}` +
                `top:   ${this.top ? this.top.id : null}` +
                `bottom:${this.bottom ? this.bottom.id : null}` +
                `left:  ${this.left ? this.left.id : null}` +
                `right: ${this.right ? this.right.id : null}`
  }
}
