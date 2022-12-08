export default class EventConstructor {
  createEvent(element, typeOfEvent, callback) {
    element.addEventListener(typeOfEvent, (event) => {
      callback(event);
    });
  }

  createMoreEvents(element, typeOfEvent, ...callbacks) {
    callbacks.forEach((callback) => {
      element.addEventListener(typeOfEvent, (event) => {
        callback(event);
      });
    });
  }
}
