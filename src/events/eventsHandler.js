class Handler {
  constructor () {
    this.events = {};
  }

  register(eventName, handler) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(handler);
  }

  notify(eventName) {
    if (this.events[eventName]) {
      this.events[eventName].map((handler) => {
        handler();
      });
    } else {
      console.error(`no listeners for event ${eventName}`);
    }
  }
}

export var EventsHandler = new Handler();
