import ElementHandler from "./ElementHandler";

export default class InputColourHandler extends ElementHandler {
  constructor(elementCreator, eventConstructor) {
    super(elementCreator, eventConstructor);
  }

  createColorInput(colourElement, event) {
    const colouredElement = event.target.parentNode.parentNode;
    if (
      this.colourInputElement !== undefined ||
      colouredElement.getAttribute("isLocked") === "true"
    ) {
      this.colourInputElement.remove();
    }

    if (
      colouredElement.getAttribute("isLocked") === "false" ||
      !colouredElement.getAttribute("isLocked")
    ) {
      this.colourInputElement = this.elementCreator.createElement(
        "input",
        "input-color",
        "",
        "color"
      );

      const styledColorInput = this.setStylesForInputColor(
        this.colourInputElement,
        event.target
      );
      event.target.parentNode.insertAdjacentElement(
        "beforeend",
        styledColorInput
      );
      this.changeOwnColor(styledColorInput, colourElement);
    }
  }

  changeOwnColor(inputColor, colourElement) {
    this.eventConstructor.createEvent(inputColor, "input", (event) => {
      colourElement.style.background =
        inputColor.previousElementSibling.innerHTML =
          event.target.value.toUpperCase();
    });
  }

  setStylesForInputColor(colorInput, targetElement) {
    colorInput.style.position = "absolute";
    colorInput.style.left =
      targetElement.parentNode.parentNode.offsetLeft +
      targetElement.offsetWidth / 3 +
      "px";
    colorInput.style.top =
      targetElement.offsetTop + targetElement.offsetHeight + "px";
    colorInput.value = targetElement.innerHTML;
    colorInput.style.opacity = "0";
    return colorInput;
  }
}
