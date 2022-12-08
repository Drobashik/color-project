import ElementHandler from "./ElementHandler";
import InputColourHandler from "./InputColourHandler";

export default class ColourElementsHandler extends ElementHandler {
  constructor(elementCreator, eventConstructor) {
    super(elementCreator, eventConstructor);
  }

  setColourOnColouredElement(colourElement) {
    const colorInputCreator = new InputColourHandler(
      this.elementCreator,
      this.eventConstructor
    );
    this.eventConstructor.createEvent(
      colourElement.firstElementChild.firstElementChild,
      "click",
      colorInputCreator.createColorInput.bind(colorInputCreator, colourElement)
    );
  }

  lockerElementHandler(isLocked, colourElement) {
    this.eventConstructor.createEvent(
      colourElement.lastElementChild,
      "click",
      (event) => {
        if (event.target.localName === "i") {
          isLocked = !isLocked;
          event.target.parentNode.setAttribute("isLocked", isLocked);
          event.target.className = isLocked ? "uil uil-lock" : "uil uil-unlock";
          event.target.style.transform = isLocked ? "scale(1.4)" : "scale(1)";
        }
      }
    );
  }

  createColourElements(createColouredElement, timesInsert) {
    for (let i = 0; i < timesInsert; i++) {
      let isLocked = false;
      const colourElement = createColouredElement();
      this.lockerElementHandler(isLocked, colourElement);
      this.setColourOnColouredElement(colourElement);
      this.elementCreator.insertElement(colourElement);
    }
  }
}
