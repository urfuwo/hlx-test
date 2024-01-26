const slot = (slotData) => {
  return (target, slotKey) => {
    const ctor = target.constructor;
    if (!Object.prototype.hasOwnProperty.call(ctor, "metadata")) {
      ctor.metadata = {};
    }
    const metadata = ctor.metadata;
    if (!metadata.slots) {
      metadata.slots = {};
    }
    const slotMetadata = metadata.slots;
    if (slotData && slotData.default && slotMetadata.default) {
      throw new Error("Only one slot can be the default slot.");
    }
    const key = slotData && slotData.default ? "default" : slotKey;
    slotData = slotData || { type: HTMLElement };
    if (!slotData.type) {
      slotData.type = HTMLElement;
    }
    if (!slotMetadata[key]) {
      slotMetadata[key] = slotData;
    }
    if (slotData.default) {
      delete slotMetadata.default.default;
      slotMetadata.default.propertyName = slotKey;
    }
    ctor.metadata.managedSlots = true;
  };
};
const associatedElements = /* @__PURE__ */ new WeakMap();
const registeredElements = /* @__PURE__ */ new WeakMap();
const observerOptions = {
  attributes: true,
  childList: true,
  characterData: true,
  subtree: true
};
const getEffectiveAriaLabelText = (el) => {
  const accessibleEl = el;
  if (!accessibleEl.accessibleNameRef) {
    if (accessibleEl.accessibleName) {
      return accessibleEl.accessibleName;
    }
    return void 0;
  }
  return getAllAccessibleNameRefTexts(el);
};
const getAllAccessibleNameRefTexts = (el) => {
  var _a;
  const ids = ((_a = el.accessibleNameRef) == null ? void 0 : _a.split(" ")) ?? [];
  const owner = el.getRootNode();
  let result = "";
  ids.forEach((elementId, index) => {
    const element = owner.querySelector(`[id='${elementId}']`);
    const text = `${element && element.textContent ? element.textContent : ""}`;
    if (text) {
      result += text;
      if (index < ids.length - 1) {
        result += " ";
      }
    }
  });
  return result;
};
const _getAllAssociatedElementsFromDOM = (el) => {
  const set = /* @__PURE__ */ new Set();
  const labelsForAssociated = _getAssociatedLabels(el);
  labelsForAssociated.forEach((itm) => {
    set.add(itm);
  });
  const value = el["accessibleNameRef"];
  const ids = (value == null ? void 0 : value.split(" ")) ?? [];
  ids.forEach((id) => {
    const refEl = _getReferencedElementById(el, id);
    if (refEl) {
      set.add(refEl);
    }
  });
  return Array.from(set);
};
const _getAssociatedLabels = (el) => {
  const labels = el.getRootNode().querySelectorAll(`[for="${el.id}"]`);
  return Array.from(labels);
};
const _getReferencedElementById = (el, elementId) => {
  return el.getRootNode().querySelector(`[id='${elementId}']`);
};
const getAssociatedLabelForTexts = (el) => {
  const results = [];
  const labels = _getAssociatedLabels(el);
  labels.forEach((label) => {
    const labelText = label.textContent;
    labelText && results.push(labelText);
  });
  if (results.length) {
    return results.join(" ");
  }
  return void 0;
};
const _createInvalidationCallback = (el) => {
  const invalidationCallback = (changeInfo) => {
    if (!(changeInfo && changeInfo.type === "property" && changeInfo.name === "accessibleNameRef")) {
      return;
    }
    const registeredElement = registeredElements.get(el);
    if (!registeredElement) {
      return;
    }
    const oldAssociatedElements = registeredElement.observedElements;
    const newAssociatedElements = _getAllAssociatedElementsFromDOM(el);
    oldAssociatedElements.forEach((oldElement) => {
      if (!newAssociatedElements.includes(oldElement)) {
        _removeObservedElementFromRegisteredElement(registeredElement, oldElement);
      }
    });
    newAssociatedElements.forEach((newElement) => {
      if (!oldAssociatedElements.includes(newElement)) {
        _addObservedElementToRegisteredElement(registeredElement, newElement);
        registeredElement.observedElements.push(newElement);
      }
    });
    registeredElement == null ? void 0 : registeredElement.callback();
  };
  return invalidationCallback;
};
const registerUI5Element = (el, callback) => {
  if (registeredElements.has(el)) {
    return;
  }
  const allAssociatedElements = _getAllAssociatedElementsFromDOM(el);
  const invalidationCallback = _createInvalidationCallback(el);
  const registeredElement = {
    host: el,
    observedElements: allAssociatedElements,
    callback,
    invalidationCallback
  };
  registeredElements.set(el, registeredElement);
  el.attachInvalidate(invalidationCallback);
  allAssociatedElements.forEach((element) => {
    _addObservedElementToRegisteredElement(registeredElement, element);
  });
  callback();
};
const _addObservedElementToRegisteredElement = (registeredElement, element) => {
  let associatedElement = associatedElements.get(element);
  if (!associatedElement) {
    associatedElement = { observer: null, callbacks: [] };
    const observer = new MutationObserver(() => {
      const callbacks = associatedElement.callbacks;
      callbacks.forEach((callback) => {
        callback();
      });
      const domEl = document.getElementById(element.id);
      if (!(registeredElement.host.id === element.getAttribute("for") || domEl)) {
        _removeObservedElementFromRegisteredElement(registeredElement, element);
      }
    });
    associatedElement.observer = observer;
    observer.observe(element, observerOptions);
    associatedElements.set(element, associatedElement);
  }
  if (!associatedElement.callbacks.includes(registeredElement.callback)) {
    associatedElement.callbacks.push(registeredElement.callback);
  }
};
const _removeObservedElementFromRegisteredElement = (registeredElement, element) => {
  var _a;
  const associatedElement = associatedElements.get(element);
  if (associatedElement) {
    associatedElement.callbacks = associatedElement.callbacks.filter((itm) => itm !== registeredElement.callback);
    if (!associatedElement.callbacks.length) {
      (_a = associatedElement.observer) == null ? void 0 : _a.disconnect();
      associatedElements.delete(element);
    }
  }
  registeredElement.observedElements = registeredElement.observedElements.filter((itm) => itm !== element);
};
const deregisterUI5Element = (el) => {
  const registeredElement = registeredElements.get(el);
  if (!registeredElement) {
    return;
  }
  const oldObservedElements = [...registeredElement.observedElements];
  oldObservedElements.forEach((observedElement) => {
    _removeObservedElementFromRegisteredElement(registeredElement, observedElement);
  });
  el.detachInvalidate(registeredElement.invalidationCallback);
  registeredElements.delete(el);
};
export {
  getAllAccessibleNameRefTexts as a,
  getEffectiveAriaLabelText as b,
  deregisterUI5Element as d,
  getAssociatedLabelForTexts as g,
  registerUI5Element as r,
  slot as s
};
