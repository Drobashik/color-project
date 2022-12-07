import ColourPickerHandler from "./classes/ColourPickerHandler";
import ColourElementHandler from "./classes/ColourElementHandler";
import EventConstructor from "./classes/EventConstructor";

const eventConstructor = new EventConstructor();
const elementCreator = new ColourElementHandler(
  eventConstructor,
  document.querySelector(".app")
);
const colourPaletteHandler = new ColourPickerHandler(elementCreator);

eventConstructor.createEvent(
    document,
    'keydown',
    colourPaletteHandler.generateNewColours.bind(colourPaletteHandler)    
)

elementCreator.insertColourElements(
  colourPaletteHandler.createColorPaletteElement.bind(colourPaletteHandler),
  4,
  eventConstructor.createEvent,
);
