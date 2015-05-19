import {EventsHandler} from '../events/eventsHandler';

export default class Keyboard {
  constructor () {
    this.attachEvents();
  }

  attachEvents() {
    window.addEventListener('keydown', function(event) {
      switch (event.keyCode) {
        case 37: // Left
          EventsHandler.notify('keyboard_left');
        break;

        case 38: // Up
          EventsHandler.notify('keyboard_up');
        break;

        case 39: // Right
          EventsHandler.notify('keyboard_right');
        break;

        case 40: // Down
          EventsHandler.notify('keyboard_down');
        break;
      }
    }, false);
  }
}
