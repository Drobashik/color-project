import { getRandom } from "../utilities/getRandom";
import ElementHandler from "./ElementHandler";

export default class ColourPaletteGenerator extends ElementHandler {
  constructor(elementCreator) {
    super(elementCreator);
    this.arrayOfColourElements = [];
    this.colourElement = null;
    this.colorPalette = "";
    this.colorHexLetters = "0123456789ABCDEF";
  }

  generateRandomColor() {
    const colorHexArray = this.colorHexLetters.split("");
    let resultColour = "";
    for (let i = 0; i < 6; i++) {
      resultColour += this.colorHexLetters[getRandom(colorHexArray.length)];
    }
    return "#" + resultColour;
  }

  generateNewColours() {
    this.arrayOfColourElements.forEach((element) => {
      if (
        element.getAttribute("isLocked") === "false" ||
        !element.getAttribute("isLocked")
      ) {
        element.style.backgroundColor =
          element.firstElementChild.firstElementChild.innerHTML =
            this.generateRandomColor();
      }
    });
  }

  generateColorPaletteElement() {
    this.colorPalette = this.generateRandomColor();
    this.colourElement = this.elementCreator.createElement(
      "div",
      "colour",
      `
          <label>
          <h1>${this.colorPalette}</h1> 
          </label>
          <i class="uil uil-unlock"></i>
          `
    );
    this.colourElement.style.backgroundColor = this.colorPalette;
    this.arrayOfColourElements.push(this.colourElement);
    return this.colourElement;
  }
}
