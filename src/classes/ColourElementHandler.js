export default class ColourElementHandler {
  constructor(eventConstructor, mainBody) {
    this.eventConstructor = eventConstructor;
    this.mainBody = mainBody;
    this.colourInputElement = null;
  }

  createElement(element, className, innerHTML = "", type = "") {
    const createdElement = document.createElement(element);
    createdElement.className = className;
    createdElement.innerHTML = innerHTML;
    createdElement.type = type;
    return createdElement;
  }

  insertElement(element) {
    this.mainBody.insertAdjacentElement("beforeend", element);
  }

  setStylesForInputColor(colorInput, targetElement) {
    console.log(targetElement);
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

  changeOwnColor(createEvent, inputColor, colourElement) {
    createEvent(inputColor, "input", (event) => {
      colourElement.style.background =
        inputColor.previousElementSibling.innerHTML =
          event.target.value.toUpperCase();
    });
  }

  setOwnColor(createEvent, colourElement) {
    createEvent(
      colourElement.firstElementChild.firstElementChild,
      "click",
      (event) => {
        const colouredElement = event.target.parentNode.parentNode;
        if (
          this.colourInputElement !== null ||
          colouredElement.getAttribute("isLocked") === "true"
        ) {
          this.colourInputElement.remove();
        }

        if (
          colouredElement.getAttribute("isLocked") === "false" ||
          !colouredElement.getAttribute("isLocked")
        ) {
          this.colourInputElement = this.createElement(
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
          this.changeOwnColor(createEvent, styledColorInput, colourElement);
        }
      }
    );
  }

  lockerHandler(isLocked, createEvent, colourElement) {
    createEvent(colourElement.lastElementChild, "click", (event) => {
      if (event.target.localName === "i") {
        isLocked = !isLocked;
        event.target.parentNode.setAttribute("isLocked", isLocked);
        event.target.className = isLocked ? "uil uil-lock" : "uil uil-unlock";
        event.target.style.transform = isLocked ? "scale(1.4)" : "scale(1)";
      }
    });
  }

  insertColourElements(createColouredElement, timesGenerate, createEvent) {
    for (let i = 0; i < timesGenerate; i++) {
      let isLocked = false;
      const colourElement = createColouredElement();
      this.lockerHandler(isLocked, createEvent, colourElement);
      this.setOwnColor(createEvent, colourElement);
      this.mainBody.insertAdjacentElement("beforeend", colourElement);
    }
  }
}
