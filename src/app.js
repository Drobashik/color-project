import ColourPaletteGenerator from "./classes/ColourPaletteGenerator";
import ColourElementsHandler from "./classes/ColourElementsHandler";
import EventConstructor from "./classes/EventConstructor";
import ElementHandleCreator from "./classes/ElementCreator";

const eventConstructor = new EventConstructor();
const elementCreator = new ElementHandleCreator(document.querySelector(".app"));

const colourElementHandler = new ColourElementsHandler(
  elementCreator,
  eventConstructor
);
const colourPaletteHandler = new ColourPaletteGenerator(elementCreator);

eventConstructor.createEvent(
  document,
  "keydown",
  colourPaletteHandler.generateNewColours.bind(colourPaletteHandler)
);

colourElementHandler.createColourElements(
  colourPaletteHandler.generateColorPaletteElement.bind(colourPaletteHandler),
  4
);
