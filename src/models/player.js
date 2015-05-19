import PlayerView from '../graphics2d/playerView'
import {EventsHandler} from '../events/eventsHandler';

export default class Player {
  constructor (data, x, y) {
    this.x = x;
    this.y = y;

    this.view = new PlayerView(data, this);
    this.attachEventListeners();
  }

  attachEventListeners() {
    EventsHandler.register('keyboard_up',   () => { this.moveUp(); });
    EventsHandler.register('keyboard_down', () => { this.moveDown(); });
    EventsHandler.register('keyboard_left', () => { this.moveLeft(); });
    EventsHandler.register('keyboard_right',() => { this.moveRight(); });
  }

  moveLeft () {
    this.x--;
  }

  moveRight () {
    this.x++;
  }

  moveUp () {
    this.y--;
  }

  moveDown () {
    this.y++;
  }
}
