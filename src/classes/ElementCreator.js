export default class ElementHandleCreator {
  constructor(mainBody) {
    this.mainBody = mainBody;
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
}
