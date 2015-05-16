import Sprite from ('../models/sprite');

export default class Map {
  constructor (data) {
    this.mapArray = data.array;
    this.sprite = new Sprite(data.tileInfos, data.tiles);

    this.build();
  }

  build (data) {

  }
}
