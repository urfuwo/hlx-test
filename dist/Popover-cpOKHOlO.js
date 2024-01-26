import { q as e, t as i, u as t, T, v as instanceOfUI5Element, i as isLegacyThemeFamily, w as getSharedResource, h as getFeature, e as effectiveHtml, l, a as registerThemePropertiesLoader, c as styleData$6, d as styleData$7, p as property, f as customElement, y as hasStyle, z as createStyle, U as UI5Element, A as isSafari, B as isChrome, C as renderFinished, n as litRender, D as isIOS } from "./parameters-bundle.css-SwkfcYC-.js";
import { r as registerIcon, b as isEscape, e as event, o as isTabPrevious, j as isEnter } from "./entry-icon-6nxMzUd9.js";
import { s as slot, b as getEffectiveAriaLabelText } from "./AriaLabelHelper-C568z_QZ.js";
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o = e(class extends i {
  constructor(t$1) {
    var i2;
    if (super(t$1), t$1.type !== t.ATTRIBUTE || "class" !== t$1.name || (null === (i2 = t$1.strings) || void 0 === i2 ? void 0 : i2.length) > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return " " + Object.keys(t2).filter((i2) => t2[i2]).join(" ") + " ";
  }
  update(i2, [s]) {
    var r, o2;
    if (void 0 === this.it) {
      this.it = /* @__PURE__ */ new Set(), void 0 !== i2.strings && (this.nt = new Set(i2.strings.join(" ").split(/\s/).filter((t2) => "" !== t2)));
      for (const t2 in s)
        s[t2] && !(null === (r = this.nt) || void 0 === r ? void 0 : r.has(t2)) && this.it.add(t2);
      return this.render(s);
    }
    const e2 = i2.element.classList;
    this.it.forEach((t2) => {
      t2 in s || (e2.remove(t2), this.it.delete(t2));
    });
    for (const t2 in s) {
      const i3 = !!s[t2];
      i3 === this.it.has(t2) || (null === (o2 = this.nt) || void 0 === o2 ? void 0 : o2.has(t2)) || (i3 ? (e2.add(t2), this.it.add(t2)) : (e2.remove(t2), this.it.delete(t2)));
    }
    return T;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class StyleMapDirective extends i {
  constructor(partInfo) {
    var _a;
    super(partInfo);
    if (partInfo.type !== t.ATTRIBUTE || partInfo.name !== "style" || ((_a = partInfo.strings) === null || _a === void 0 ? void 0 : _a.length) > 2) {
      throw new Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
    }
  }
  render(styleInfo) {
    return "";
  }
  update(part, [styleInfo]) {
    const { style } = part.element;
    if (this._previousStyleProperties === void 0) {
      this._previousStyleProperties = /* @__PURE__ */ new Set();
      for (const name2 in styleInfo) {
        this._previousStyleProperties.add(name2);
      }
    }
    this._previousStyleProperties.forEach((name2) => {
      if (styleInfo[name2] == null) {
        this._previousStyleProperties.delete(name2);
        if (name2.includes("-")) {
          style.removeProperty(name2);
        } else {
          style[name2] = "";
        }
      }
    });
    for (const name2 in styleInfo) {
      const value = styleInfo[name2];
      if (value != null) {
        this._previousStyleProperties.add(name2);
        if (name2.includes("-")) {
          style.setProperty(name2, value);
        } else {
          style[name2] = value;
        }
      }
    }
    return T;
  }
}
const styleMap = e(StyleMapDirective);
let resizeObserver;
const observedElements = /* @__PURE__ */ new Map();
const getResizeObserver = () => {
  if (!resizeObserver) {
    resizeObserver = new window.ResizeObserver((entries) => {
      window.requestAnimationFrame(() => {
        entries.forEach((entry) => {
          const callbacks = observedElements.get(entry.target);
          callbacks && Promise.all(callbacks.map((callback) => callback()));
        });
      });
    });
  }
  return resizeObserver;
};
const observe = (element, callback) => {
  const callbacks = observedElements.get(element) || [];
  if (!callbacks.length) {
    getResizeObserver().observe(element);
  }
  observedElements.set(element, [...callbacks, callback]);
};
const unobserve = (element, callback) => {
  const callbacks = observedElements.get(element) || [];
  if (callbacks.length === 0) {
    return;
  }
  const filteredCallbacks = callbacks.filter((fn) => fn !== callback);
  if (filteredCallbacks.length === 0) {
    getResizeObserver().unobserve(element);
    observedElements.delete(element);
  } else {
    observedElements.set(element, filteredCallbacks);
  }
};
class ResizeHandler {
  /**
   * @static
   * @public
   * @param {*} element UI5 Web Component or DOM Element to be observed
   * @param {*} callback Callback to be executed
   */
  static register(element, callback) {
    let effectiveElement = element;
    if (instanceOfUI5Element(effectiveElement)) {
      effectiveElement = effectiveElement.getDomRef();
    }
    if (effectiveElement instanceof HTMLElement) {
      observe(effectiveElement, callback);
    } else {
      console.warn("Cannot register ResizeHandler for element", element);
    }
  }
  /**
   * @static
   * @public
   * @param {*} element UI5 Web Component or DOM Element to be unobserved
   * @param {*} callback Callback to be removed
   */
  static deregister(element, callback) {
    let effectiveElement = element;
    if (instanceOfUI5Element(effectiveElement)) {
      effectiveElement = effectiveElement.getDomRef();
    }
    if (effectiveElement instanceof HTMLElement) {
      unobserve(effectiveElement, callback);
    } else {
      console.warn("Cannot deregister ResizeHandler for element", element);
    }
  }
}
var ValueState;
(function(ValueState2) {
  ValueState2["None"] = "None";
  ValueState2["Success"] = "Success";
  ValueState2["Warning"] = "Warning";
  ValueState2["Error"] = "Error";
  ValueState2["Information"] = "Information";
})(ValueState || (ValueState = {}));
const ValueState$1 = ValueState;
class DataType {
  /**
   * Checks if the value is valid for its data type.
   * @public
   * @abstract
   * @returns {Boolean}
   */
  // eslint-disable-next-line
  static isValid(value) {
    return false;
  }
  static attributeToProperty(attributeValue) {
    return attributeValue;
  }
  static propertyToAttribute(propertyValue) {
    return propertyValue === null ? null : String(propertyValue);
  }
  static valuesAreEqual(value1, value2) {
    return value1 === value2;
  }
  static generateTypeAccessors(types) {
    Object.keys(types).forEach((type) => {
      Object.defineProperty(this, type, {
        get() {
          return types[type];
        }
      });
    });
  }
  static get isDataTypeClass() {
    return true;
  }
}
class Integer extends DataType {
  static isValid(value) {
    return Number.isInteger(value);
  }
  static attributeToProperty(attributeValue) {
    return parseInt(attributeValue);
  }
}
const getActiveElement = () => {
  let element = document.activeElement;
  while (element && element.shadowRoot && element.shadowRoot.activeElement) {
    element = element.shadowRoot.activeElement;
  }
  return element;
};
const ICON_DECLINE = { key: "ICON_DECLINE", defaultText: "Decline" };
const ICON_ERROR = { key: "ICON_ERROR", defaultText: "Error" };
const name$9 = "decline";
const pathData$9 = "M86 109l22-23q5-5 12-5 6 0 11 5l124 125L380 86q5-5 11-5 7 0 12 5l22 23q12 11 0 23L301 256l124 125q11 11 0 22l-22 23q-8 5-12 5-3 0-11-5L255 301 131 426q-5 5-11 5-4 0-12-5l-22-23q-11-11 0-22l124-125L86 132q-12-12 0-23z";
const ltr$9 = false;
const accData$3 = ICON_DECLINE;
const collection$9 = "SAP-icons-v4";
const packageName$9 = "@ui5/webcomponents-icons";
registerIcon(name$9, { pathData: pathData$9, ltr: ltr$9, accData: accData$3, collection: collection$9, packageName: packageName$9 });
const name$8 = "decline";
const pathData$8 = "M292 256l117 116q7 7 7 18 0 12-7.5 19t-18.5 7q-10 0-18-8L256 292 140 408q-8 8-18 8-11 0-18.5-7.5T96 390q0-10 8-18l116-116-116-116q-8-8-8-18 0-11 7.5-18.5T122 96t18 7l116 117 116-117q7-7 18-7t18.5 7.5T416 122t-7 18z";
const ltr$8 = false;
const accData$2 = ICON_DECLINE;
const collection$8 = "SAP-icons-v5";
const packageName$8 = "@ui5/webcomponents-icons";
registerIcon(name$8, { pathData: pathData$8, ltr: ltr$8, accData: accData$2, collection: collection$8, packageName: packageName$8 });
isLegacyThemeFamily() ? pathData$9 : pathData$8;
const name$7 = "error";
const pathData$7 = "M512 256q0 53-20.5 100t-55 81.5-81 54.5-99.5 20-100-20.5-81.5-55T20 355 0 256q0-54 20-100.5t55-81T156.5 20 256 0t99.5 20T437 75t55 81.5 20 99.5zM399 364q6-6 0-12l-86-86q-6-6 0-12l81-81q6-6 0-12l-37-37q-2-2-6-2t-6 2l-83 82q-1 3-6 3-3 0-6-3l-84-83q-1-2-6-2-4 0-6 2l-37 37q-6 6 0 12l83 82q6 6 0 12l-83 82q-2 2-2.5 6t2.5 6l36 37q4 2 6 2 4 0 6-2l85-84q2-2 6-2t6 2l88 88q4 2 6 2t6-2z";
const ltr$7 = false;
const accData$1 = ICON_ERROR;
const collection$7 = "SAP-icons-v4";
const packageName$7 = "@ui5/webcomponents-icons";
registerIcon(name$7, { pathData: pathData$7, ltr: ltr$7, accData: accData$1, collection: collection$7, packageName: packageName$7 });
const name$6 = "error";
const pathData$6 = "M256 0q53 0 99.5 20T437 75t55 81.5 20 99.5-20 99.5-55 81.5-81.5 55-99.5 20-99.5-20T75 437t-55-81.5T0 256t20-99.5T75 75t81.5-55T256 0zm45 256l74-73q9-11 9-23 0-13-9.5-22.5T352 128q-12 0-23 9l-73 74-73-74q-10-9-23-9t-22.5 9.5T128 160q0 12 9 23l74 73-74 73q-9 10-9 23t9.5 22.5T160 384t23-9l73-74 73 74q11 9 23 9 13 0 22.5-9.5T384 352t-9-23z";
const ltr$6 = false;
const accData = ICON_ERROR;
const collection$6 = "SAP-icons-v5";
const packageName$6 = "@ui5/webcomponents-icons";
registerIcon(name$6, { pathData: pathData$6, ltr: ltr$6, accData, collection: collection$6, packageName: packageName$6 });
isLegacyThemeFamily() ? pathData$7 : pathData$6;
const name$5 = "alert";
const pathData$5 = "M501 374q5 10 7.5 19.5T512 412v5q0 31-23 47t-50 16H74q-13 0-26-4t-23.5-12-17-20T0 417q0-13 4-22.5t9-20.5L198 38q21-38 61-38 38 0 59 38zM257 127q-13 0-23.5 8T223 161q1 7 2 12 3 25 4.5 48t3.5 61q0 11 7.5 16t16.5 5q22 0 23-21l2-36 9-85q0-18-10.5-26t-23.5-8zm0 299q20 0 31.5-12t11.5-32q0-19-11.5-31T257 339t-31.5 12-11.5 31q0 20 11.5 32t31.5 12z";
const ltr$5 = false;
const collection$5 = "SAP-icons-v4";
const packageName$5 = "@ui5/webcomponents-icons";
registerIcon(name$5, { pathData: pathData$5, ltr: ltr$5, collection: collection$5, packageName: packageName$5 });
const name$4 = "alert";
const pathData$4 = "M505 399q7 13 7 27 0 21-15.5 37.5T456 480H56q-25 0-40.5-16.5T0 426q0-14 7-27L208 59q17-27 48-27 14 0 27 6.5T304 59zM288 176q0-14-9-23t-23-9-23 9-9 23v96q0 14 9 23t23 9 23-9 9-23v-96zm-32 240q14 0 23-9t9-23-9-23-23-9-23 9-9 23 9 23 23 9z";
const ltr$4 = false;
const collection$4 = "SAP-icons-v5";
const packageName$4 = "@ui5/webcomponents-icons";
registerIcon(name$4, { pathData: pathData$4, ltr: ltr$4, collection: collection$4, packageName: packageName$4 });
isLegacyThemeFamily() ? pathData$5 : pathData$4;
const name$3 = "sys-enter-2";
const pathData$3 = "M512 256q0 54-20 100.5t-54.5 81T356 492t-100 20q-54 0-100.5-20t-81-55T20 355.5 0 256t20.5-100 55-81.5T157 20t99-20q53 0 100 20t81.5 54.5T492 156t20 100zm-118-87q4-8-1-13l-36-36q-3-4-8-4t-8 5L237 294q-3 1-4 0l-70-52q-4-3-7-3t-4.5 2-2.5 3l-29 41q-6 8 2 14l113 95q2 2 7 2t8-4z";
const ltr$3 = true;
const collection$3 = "SAP-icons-v4";
const packageName$3 = "@ui5/webcomponents-icons";
registerIcon(name$3, { pathData: pathData$3, ltr: ltr$3, collection: collection$3, packageName: packageName$3 });
const name$2 = "sys-enter-2";
const pathData$2 = "M256 0q53 0 100 20t81.5 54.5T492 156t20 100-20 100-54.5 81.5T356 492t-100 20-100-20-81.5-54.5T20 356 0 256t20-100 54.5-81.5T156 20 256 0zm150 183q10-9 10-23 0-13-9.5-22.5T384 128t-22 9L186 308l-68-63q-9-9-22-9t-22.5 9.5T64 268q0 15 10 24l91 83q9 9 21 9 13 0 23-9z";
const ltr$2 = true;
const collection$2 = "SAP-icons-v5";
const packageName$2 = "@ui5/webcomponents-icons";
registerIcon(name$2, { pathData: pathData$2, ltr: ltr$2, collection: collection$2, packageName: packageName$2 });
isLegacyThemeFamily() ? pathData$3 : pathData$2;
const name$1 = "information";
const pathData$1 = "M0 256q0-53 20.5-100t55-81.5T157 20t99-20q54 0 100.5 20t81 55 54.5 81.5 20 99.5q0 54-20 100.5t-54.5 81T356 492t-100 20q-54 0-100.5-20t-81-55T20 355.5 0 256zm192 112v33h128v-33h-32V215q0-6-7-6h-88v31h32v128h-33zm34-201q14 11 30 11 17 0 29.5-11.5T298 138q0-19-13-31-12-12-29-12-19 0-30.5 12.5T214 138q0 17 12 29z";
const ltr$1 = false;
const collection$1 = "SAP-icons-v4";
const packageName$1 = "@ui5/webcomponents-icons";
registerIcon(name$1, { pathData: pathData$1, ltr: ltr$1, collection: collection$1, packageName: packageName$1 });
const name = "information";
const pathData = "M256 0q53 0 99.5 20T437 75t55 81.5 20 99.5-20 99.5-55 81.5-81.5 55-99.5 20-99.5-20T75 437t-55-81.5T0 256t20-99.5T75 75t81.5-55T256 0zm0 160q14 0 23-9t9-23-9-23-23-9-23 9-9 23 9 23 23 9zm32 64q0-14-9-23t-23-9-23 9-9 23v160q0 14 9 23t23 9 23-9 9-23V224z";
const ltr = false;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";
registerIcon(name, { pathData, ltr, collection, packageName });
isLegacyThemeFamily() ? pathData$1 : pathData;
class DOMReference extends DataType {
  static isValid(value) {
    return typeof value === "string" || value instanceof HTMLElement;
  }
  static propertyToAttribute(propertyValue) {
    if (propertyValue instanceof HTMLElement) {
      return null;
    }
    return propertyValue;
  }
}
const popupUtilsData = getSharedResource("PopupUtilsData", { currentZIndex: 100 });
const getFocusedElement = () => {
  const element = getActiveElement();
  return element && typeof element.focus === "function" ? element : null;
};
const isFocusedElementWithinNode = (node) => {
  const fe = getFocusedElement();
  if (fe) {
    return isNodeContainedWithin(node, fe);
  }
  return false;
};
const isNodeContainedWithin = (parent, child) => {
  let currentNode = parent;
  if (currentNode.shadowRoot) {
    const children = Array.from(currentNode.shadowRoot.children);
    currentNode = children.find((n) => n.localName !== "style");
    if (!currentNode) {
      return false;
    }
  }
  if (currentNode === child) {
    return true;
  }
  const childNodes = currentNode.localName === "slot" ? currentNode.assignedNodes() : currentNode.children;
  if (childNodes) {
    return Array.from(childNodes).some((n) => isNodeContainedWithin(n, child));
  }
  return false;
};
const isPointInRect = (x, y, rect) => {
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
};
const isClickInRect = (e2, rect) => {
  let x;
  let y;
  if (e2 instanceof MouseEvent) {
    x = e2.clientX;
    y = e2.clientY;
  } else {
    const touch = e2.touches[0];
    x = touch.clientX;
    y = touch.clientY;
  }
  return isPointInRect(x, y, rect);
};
function instanceOfPopup(object) {
  return "isUI5Element" in object && "_show" in object;
}
const getClosedPopupParent = (el) => {
  const parent = el.parentElement || el.getRootNode && el.getRootNode().host;
  if (parent && (instanceOfPopup(parent) || parent === document.documentElement)) {
    return parent;
  }
  return getClosedPopupParent(parent);
};
const getNextZIndex = () => {
  const openUI5Support = getFeature("OpenUI5Support");
  if (openUI5Support && openUI5Support.isOpenUI5Detected()) {
    return openUI5Support.getNextZIndex();
  }
  popupUtilsData.currentZIndex += 2;
  return popupUtilsData.currentZIndex;
};
const clamp = (val, min, max) => {
  return Math.min(Math.max(val, min), max);
};
const isElementContainingBlock = (el) => {
  const computedStyle = getComputedStyle(el);
  return ["size", "inline-size"].indexOf(computedStyle.containerType) > -1 || ["transform", "perspective"].indexOf(computedStyle.willChange) > -1 || ["layout", "paint", "strict", "content"].indexOf(computedStyle.contain) > -1 || computedStyle.transform && computedStyle.transform !== "none" || computedStyle.perspective && computedStyle.perspective !== "none" || computedStyle.backdropFilter && computedStyle.backdropFilter !== "none";
};
const getParentElement = (el) => {
  return el.parentElement ? el.parentNode : el.parentNode.host;
};
const isElementHidden = (el) => {
  if (el.nodeName === "SLOT") {
    return false;
  }
  return el.offsetWidth <= 0 && el.offsetHeight <= 0 || el.style && el.style.visibility === "hidden";
};
const rClickable = /^(?:a|area)$/i;
const rFocusable = /^(?:input|select|textarea|button)$/i;
const isElementClickable = (el) => {
  if (el.disabled) {
    return false;
  }
  const tabIndex = el.getAttribute("tabindex");
  if (tabIndex !== null && tabIndex !== void 0) {
    return parseInt(tabIndex) >= 0;
  }
  return rFocusable.test(el.nodeName) || rClickable.test(el.nodeName) && !!el.href;
};
const isFocusTrap = (el) => {
  return el.hasAttribute("data-ui5-focus-trap");
};
const getFirstFocusableElement = async (container, startFromContainer) => {
  if (!container || isElementHidden(container)) {
    return null;
  }
  return findFocusableElement(container, true, startFromContainer);
};
const getLastFocusableElement = async (container, startFromContainer) => {
  if (!container || isElementHidden(container)) {
    return null;
  }
  return findFocusableElement(container, false, startFromContainer);
};
const isElemFocusable = (el) => {
  return el.hasAttribute("data-ui5-focus-redirect") || !isElementHidden(el);
};
const findFocusableElement = async (container, forward, startFromContainer) => {
  let child;
  let assignedElements;
  let currentIndex = -1;
  if (container.shadowRoot) {
    child = forward ? container.shadowRoot.firstChild : container.shadowRoot.lastChild;
  } else if (container instanceof HTMLSlotElement && container.assignedNodes()) {
    assignedElements = container.assignedNodes();
    currentIndex = forward ? 0 : assignedElements.length - 1;
    child = assignedElements[currentIndex];
  } else if (startFromContainer) {
    child = container;
  } else {
    child = forward ? container.firstElementChild : container.lastElementChild;
  }
  let focusableDescendant;
  while (child) {
    const originalChild = child;
    if (instanceOfUI5Element(child)) {
      child = await child.getFocusDomRefAsync();
    }
    if (!child) {
      return null;
    }
    if (child.nodeType === 1 && isElemFocusable(child) && !isFocusTrap(child)) {
      if (isElementClickable(child)) {
        return child && typeof child.focus === "function" ? child : null;
      }
      focusableDescendant = await findFocusableElement(child, forward);
      if (focusableDescendant) {
        return focusableDescendant && typeof focusableDescendant.focus === "function" ? focusableDescendant : null;
      }
    }
    child = forward ? originalChild.nextSibling : originalChild.previousSibling;
    if (assignedElements && !assignedElements[currentIndex].contains(child)) {
      currentIndex = forward ? currentIndex + 1 : currentIndex - 1;
      child = assignedElements[currentIndex];
    }
  }
  return null;
};
const NO_SCROLLBAR_STYLE_CLASS = "ui5-content-native-scrollbars";
const getEffectiveScrollbarStyle = () => document.body.classList.contains(NO_SCROLLBAR_STYLE_CLASS);
const mediaRanges = /* @__PURE__ */ new Map();
const DEAFULT_RANGE_SET = /* @__PURE__ */ new Map();
DEAFULT_RANGE_SET.set("S", [0, 599]);
DEAFULT_RANGE_SET.set("M", [600, 1023]);
DEAFULT_RANGE_SET.set("L", [1024, 1439]);
DEAFULT_RANGE_SET.set("XL", [1440, Infinity]);
var RANGESETS;
(function(RANGESETS2) {
  RANGESETS2["RANGE_4STEPS"] = "4Step";
})(RANGESETS || (RANGESETS = {}));
const initRangeSet = (name2, range) => {
  mediaRanges.set(name2, range);
};
const getCurrentRange = (name2, width = window.innerWidth) => {
  let rangeSet = mediaRanges.get(name2);
  if (!rangeSet) {
    rangeSet = mediaRanges.get(RANGESETS.RANGE_4STEPS);
  }
  let currentRangeName;
  const effectiveWidth = Math.floor(width);
  rangeSet.forEach((value, key) => {
    if (effectiveWidth >= value[0] && effectiveWidth <= value[1]) {
      currentRangeName = key;
    }
  });
  return currentRangeName || [...rangeSet.keys()][0];
};
const MediaRange = {
  RANGESETS,
  initRangeSet,
  getCurrentRange
};
MediaRange.initRangeSet(MediaRange.RANGESETS.RANGE_4STEPS, DEAFULT_RANGE_SET);
function block0$2(context, tags, suffix) {
  return effectiveHtml`<section style="${styleMap(this.styles.root)}" class="${o(this.classes.root)}" role="${l(this._role)}" aria-modal="${l(this._ariaModal)}" aria-label="${l(this._ariaLabel)}" aria-labelledby="${l(this._ariaLabelledBy)}" @keydown=${this._onkeydown} @focusout=${this._onfocusout} @mouseup=${this._onmouseup} @mousedown=${this._onmousedown}><span class="first-fe" data-ui5-focus-trap tabindex="0" @focusin=${this.forwardToLast}></span><div style="${styleMap(this.styles.content)}" class="${o(this.classes.content)}"  @scroll="${this._scroll}" part="content"><slot></slot></div><span class="last-fe" data-ui5-focus-trap tabindex="0" @focusin=${this.forwardToFirst}></span></section> `;
}
function block0$1(context, tags, suffix) {
  return effectiveHtml`<div class="ui5-block-layer" ?hidden=${this._blockLayerHidden} tabindex="0" style="${styleMap(this.styles.blockLayer)}" @keydown="${this._preventBlockLayerFocus}" @mousedown="${this._preventBlockLayerFocus}"></div>`;
}
var PopupAccessibleRole;
(function(PopupAccessibleRole2) {
  PopupAccessibleRole2["None"] = "None";
  PopupAccessibleRole2["Dialog"] = "Dialog";
  PopupAccessibleRole2["AlertDialog"] = "AlertDialog";
})(PopupAccessibleRole || (PopupAccessibleRole = {}));
const PopupAccessibleRole$1 = PopupAccessibleRole;
let openedRegistry$1 = [];
const addOpenedPopup = (instance, parentPopovers = []) => {
  if (!openedRegistry$1.some((popup) => popup.instance === instance)) {
    openedRegistry$1.push({
      instance,
      parentPopovers
    });
  }
  _updateTopModalPopup();
  if (openedRegistry$1.length === 1) {
    attachGlobalListener();
  }
};
const removeOpenedPopup = (instance) => {
  openedRegistry$1 = openedRegistry$1.filter((el) => {
    return el.instance !== instance;
  });
  _updateTopModalPopup();
  if (!openedRegistry$1.length) {
    detachGlobalListener();
  }
};
const getOpenedPopups = () => {
  return [...openedRegistry$1];
};
const _keydownListener = (event2) => {
  if (!openedRegistry$1.length) {
    return;
  }
  if (isEscape(event2)) {
    openedRegistry$1[openedRegistry$1.length - 1].instance.close(true);
  }
};
const attachGlobalListener = () => {
  document.addEventListener("keydown", _keydownListener);
};
const detachGlobalListener = () => {
  document.removeEventListener("keydown", _keydownListener);
};
const _updateTopModalPopup = () => {
  let popup;
  let hasModal = false;
  for (let i2 = openedRegistry$1.length - 1; i2 >= 0; i2--) {
    popup = openedRegistry$1[i2].instance;
    if (!hasModal && popup.isModal) {
      popup.isTopModalPopup = true;
      hasModal = true;
    } else {
      popup.isTopModalPopup = false;
    }
  }
};
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$6);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$7);
const styleData$5 = { packageName: "@ui5/webcomponents", fileName: "themes/Popup.css.ts", content: `:host{min-width:1px;display:none;position:fixed}
` };
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$6);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$7);
const styleData$4 = { packageName: "@ui5/webcomponents", fileName: "themes/PopupStaticAreaStyles.css.ts", content: `.ui5-block-layer{display:none;position:fixed;background-color:var(--sapBlockLayer_Background);opacity:.6;inset:-500px;outline:none;pointer-events:all;z-index:-1}.ui5-block-layer:not([hidden]){display:inline-block}
` };
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$6);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$7);
const styleData$3 = { packageName: "@ui5/webcomponents", fileName: "themes/PopupGlobal.css.ts", content: `.ui5-popup-scroll-blocker{overflow:hidden}
` };
var __decorate$1 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i2 = decorators.length - 1; i2 >= 0; i2--)
      if (d = decorators[i2])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Popup_1;
const createBlockingStyle = () => {
  if (!hasStyle("data-ui5-popup-scroll-blocker")) {
    createStyle(styleData$3, "data-ui5-popup-scroll-blocker");
  }
};
createBlockingStyle();
const pageScrollingBlockers = /* @__PURE__ */ new Set();
let Popup = Popup_1 = class Popup2 extends UI5Element {
  constructor() {
    super();
    this._resizeHandler = this._resize.bind(this);
  }
  onBeforeRendering() {
    this._blockLayerHidden = !this.isOpen() || !this.isTopModalPopup;
  }
  onAfterRendering() {
    this._updateMediaRange();
  }
  onEnterDOM() {
    ResizeHandler.register(this, this._resizeHandler);
  }
  onExitDOM() {
    if (this.isOpen()) {
      Popup_1.unblockPageScrolling(this);
      this._removeOpenedPopup();
    }
    ResizeHandler.deregister(this, this._resizeHandler);
  }
  get _displayProp() {
    return "block";
  }
  _resize() {
    this._updateMediaRange();
  }
  /**
   * Prevents the user from interacting with the content under the block layer
   */
  _preventBlockLayerFocus(e2) {
    e2.preventDefault();
  }
  /**
   * Temporarily removes scrollbars from the html element
   * @protected
   */
  static blockPageScrolling(popup) {
    pageScrollingBlockers.add(popup);
    if (pageScrollingBlockers.size !== 1) {
      return;
    }
    document.documentElement.classList.add("ui5-popup-scroll-blocker");
  }
  /**
   * Restores scrollbars on the html element, if needed
   * @protected
   */
  static unblockPageScrolling(popup) {
    pageScrollingBlockers.delete(popup);
    if (pageScrollingBlockers.size !== 0) {
      return;
    }
    document.documentElement.classList.remove("ui5-popup-scroll-blocker");
  }
  _scroll(e2) {
    this.fireEvent("scroll", {
      scrollTop: e2.target.scrollTop,
      targetRef: e2.target
    });
  }
  _onkeydown(e2) {
    const isTabOutAttempt = e2.target === this._root && isTabPrevious(e2);
    const isEnterOnClosedPopupChild = isEnter(e2) && !this.isOpen();
    if (isTabOutAttempt || isEnterOnClosedPopupChild) {
      e2.preventDefault();
    }
  }
  _onfocusout(e2) {
    if (!e2.relatedTarget) {
      this._shouldFocusRoot = true;
    }
  }
  _onmousedown(e2) {
    if (!isSafari()) {
      this._root.removeAttribute("tabindex");
    }
    if (this.shadowRoot.contains(e2.target)) {
      this._shouldFocusRoot = true;
    } else {
      this._shouldFocusRoot = false;
    }
  }
  _onmouseup() {
    if (!isSafari()) {
      this._root.tabIndex = -1;
    }
    if (this._shouldFocusRoot) {
      if (isChrome()) {
        this._root.focus();
      }
      this._shouldFocusRoot = false;
    }
  }
  /**
   * Focus trapping
   * @private
   */
  async forwardToFirst() {
    const firstFocusable = await getFirstFocusableElement(this);
    if (firstFocusable) {
      firstFocusable.focus();
    } else {
      this._root.focus();
    }
  }
  /**
   * Focus trapping
   * @private
   */
  async forwardToLast() {
    const lastFocusable = await getLastFocusableElement(this);
    if (lastFocusable) {
      lastFocusable.focus();
    } else {
      this._root.focus();
    }
  }
  /**
   * Use this method to focus the element denoted by "initialFocus", if provided, or the first focusable element otherwise.
   * @protected
   */
  async applyInitialFocus() {
    await this.applyFocus();
  }
  /**
   * Focuses the element denoted by <code>initialFocus</code>, if provided,
   * or the first focusable element otherwise.
   * @public
   * @method
   * @name sap.ui.webc.main.Popup#applyFocus
   * @async
   * @returns {Promise} Promise that resolves when the focus is applied
   */
  async applyFocus() {
    await this._waitForDomRef();
    if (this.getRootNode() === this) {
      return;
    }
    let element;
    if (this.initialFocus) {
      element = this.getRootNode().getElementById(this.initialFocus) || document.getElementById(this.initialFocus);
    }
    element = element || await getFirstFocusableElement(this) || this._root;
    if (element) {
      if (element === this._root) {
        element.tabIndex = -1;
      }
      element.focus();
    }
  }
  /**
   * Tells if the component is opened
   * @public
   * @method
   * @name sap.ui.webc.main.Popup#isOpen
   * @returns {boolean}
   */
  isOpen() {
    return this.opened;
  }
  isFocusWithin() {
    return isFocusedElementWithinNode(this._root);
  }
  /**
   * Shows the block layer (for modal popups only) and sets the correct z-index for the purpose of popup stacking
   * @protected
   */
  async _open(preventInitialFocus) {
    var _a;
    const prevented = !this.fireEvent("before-open", {}, true, false);
    if (prevented) {
      return;
    }
    if (this.isModal && !this.shouldHideBackdrop) {
      this.getStaticAreaItemDomRef();
      this._blockLayerHidden = false;
      Popup_1.blockPageScrolling(this);
    }
    this._zIndex = getNextZIndex();
    this.style.zIndex = ((_a = this._zIndex) == null ? void 0 : _a.toString()) || "";
    this._focusedElementBeforeOpen = getFocusedElement();
    this._show();
    if (this.getDomRef()) {
      this._updateMediaRange();
    }
    this._addOpenedPopup();
    this.opened = true;
    this.open = true;
    await renderFinished();
    if (!this._disableInitialFocus && !preventInitialFocus) {
      await this.applyInitialFocus();
    }
    this.fireEvent("after-open", {}, false, false);
  }
  _updateMediaRange() {
    this.mediaRange = MediaRange.getCurrentRange(MediaRange.RANGESETS.RANGE_4STEPS, this.getDomRef().offsetWidth);
  }
  /**
   * Adds the popup to the "opened popups registry"
   * @protected
   */
  _addOpenedPopup() {
    addOpenedPopup(this);
  }
  /**
   * Closes the popup.
   * @public
   * @method
   * @name sap.ui.webc.main.Popup#close
   * @returns {void}
   */
  close(escPressed = false, preventRegistryUpdate = false, preventFocusRestore = false) {
    if (!this.opened) {
      return;
    }
    const prevented = !this.fireEvent("before-close", { escPressed }, true, false);
    if (prevented) {
      return;
    }
    if (this.isModal) {
      this._blockLayerHidden = true;
      Popup_1.unblockPageScrolling(this);
    }
    this.hide();
    this.opened = false;
    this.open = false;
    if (!preventRegistryUpdate) {
      this._removeOpenedPopup();
    }
    if (!this.preventFocusRestore && !preventFocusRestore) {
      this.resetFocus();
    }
    this.fireEvent("after-close", {}, false, false);
  }
  /**
   * Removes the popup from the "opened popups registry"
   * @protected
   */
  _removeOpenedPopup() {
    removeOpenedPopup(this);
  }
  /**
   * Returns the focus to the previously focused element
   * @protected
   */
  resetFocus() {
    if (!this._focusedElementBeforeOpen) {
      return;
    }
    this._focusedElementBeforeOpen.focus();
    this._focusedElementBeforeOpen = null;
  }
  /**
   * Sets "block" display to the popup. The property can be overriden by derivatives of Popup.
   * @protected
   */
  _show() {
    this.style.display = this._displayProp;
  }
  /**
   * Sets "none" display to the popup
   * @protected
   */
  hide() {
    this.style.display = "none";
  }
  /**
   * Ensures ariaLabel is never null or empty string
   * @returns {string | undefined}
   * @protected
   */
  get _ariaLabel() {
    return getEffectiveAriaLabelText(this);
  }
  get _root() {
    return this.shadowRoot.querySelector(".ui5-popup-root");
  }
  get _role() {
    return this.accessibleRole === PopupAccessibleRole$1.None ? void 0 : this.accessibleRole.toLowerCase();
  }
  get _ariaModal() {
    return this.accessibleRole === PopupAccessibleRole$1.None ? void 0 : "true";
  }
  get contentDOM() {
    return this.shadowRoot.querySelector(".ui5-popup-content");
  }
  get styles() {
    return {
      root: {},
      content: {},
      blockLayer: {
        "zIndex": this._zIndex ? this._zIndex - 1 : ""
      }
    };
  }
  get classes() {
    return {
      root: {
        "ui5-popup-root": true,
        "ui5-content-native-scrollbars": getEffectiveScrollbarStyle()
      },
      content: {
        "ui5-popup-content": true
      }
    };
  }
};
__decorate$1([
  property()
], Popup.prototype, "initialFocus", void 0);
__decorate$1([
  property({ type: Boolean })
], Popup.prototype, "preventFocusRestore", void 0);
__decorate$1([
  property({ type: Boolean })
], Popup.prototype, "open", void 0);
__decorate$1([
  property({ type: Boolean, noAttribute: true })
], Popup.prototype, "opened", void 0);
__decorate$1([
  property({ defaultValue: void 0 })
], Popup.prototype, "accessibleName", void 0);
__decorate$1([
  property({ defaultValue: "" })
], Popup.prototype, "accessibleNameRef", void 0);
__decorate$1([
  property({ type: PopupAccessibleRole$1, defaultValue: PopupAccessibleRole$1.Dialog })
], Popup.prototype, "accessibleRole", void 0);
__decorate$1([
  property()
], Popup.prototype, "mediaRange", void 0);
__decorate$1([
  property({ type: Boolean })
], Popup.prototype, "_disableInitialFocus", void 0);
__decorate$1([
  property({ type: Boolean })
], Popup.prototype, "_blockLayerHidden", void 0);
__decorate$1([
  property({ type: Boolean, noAttribute: true })
], Popup.prototype, "isTopModalPopup", void 0);
__decorate$1([
  slot({ type: HTMLElement, "default": true })
], Popup.prototype, "content", void 0);
Popup = Popup_1 = __decorate$1([
  customElement({
    renderer: litRender,
    styles: styleData$5,
    template: block0$2,
    staticAreaTemplate: block0$1,
    staticAreaStyles: styleData$4
  }),
  event("before-open"),
  event("after-open"),
  event("before-close", {
    escPressed: { type: Boolean }
  }),
  event("after-close"),
  event("scroll")
], Popup);
const Popup$1 = Popup;
var PopoverPlacementType;
(function(PopoverPlacementType2) {
  PopoverPlacementType2["Left"] = "Left";
  PopoverPlacementType2["Right"] = "Right";
  PopoverPlacementType2["Top"] = "Top";
  PopoverPlacementType2["Bottom"] = "Bottom";
})(PopoverPlacementType || (PopoverPlacementType = {}));
const PopoverPlacementType$1 = PopoverPlacementType;
var PopoverVerticalAlign;
(function(PopoverVerticalAlign2) {
  PopoverVerticalAlign2["Center"] = "Center";
  PopoverVerticalAlign2["Top"] = "Top";
  PopoverVerticalAlign2["Bottom"] = "Bottom";
  PopoverVerticalAlign2["Stretch"] = "Stretch";
})(PopoverVerticalAlign || (PopoverVerticalAlign = {}));
const PopoverVerticalAlign$1 = PopoverVerticalAlign;
var PopoverHorizontalAlign;
(function(PopoverHorizontalAlign2) {
  PopoverHorizontalAlign2["Center"] = "Center";
  PopoverHorizontalAlign2["Left"] = "Left";
  PopoverHorizontalAlign2["Right"] = "Right";
  PopoverHorizontalAlign2["Stretch"] = "Stretch";
})(PopoverHorizontalAlign || (PopoverHorizontalAlign = {}));
const PopoverHorizontalAlign$1 = PopoverHorizontalAlign;
let updateInterval;
const intervalTimeout = 300;
const openedRegistry = [];
const repositionPopovers = () => {
  openedRegistry.forEach((popover) => {
    popover.instance.reposition();
  });
};
const closePopoversIfLostFocus = () => {
  if (document.activeElement.tagName === "IFRAME") {
    getRegistry().reverse().forEach((popup) => popup.instance.close(false, false, true));
  }
};
const runUpdateInterval = () => {
  updateInterval = setInterval(() => {
    repositionPopovers();
    closePopoversIfLostFocus();
  }, intervalTimeout);
};
const stopUpdateInterval = () => {
  clearInterval(updateInterval);
};
const attachGlobalScrollHandler = () => {
  document.addEventListener("scroll", repositionPopovers, { capture: true });
};
const detachGlobalScrollHandler = () => {
  document.removeEventListener("scroll", repositionPopovers, { capture: true });
};
const attachScrollHandler = (popover) => {
  popover && popover.shadowRoot.addEventListener("scroll", repositionPopovers, { capture: true });
};
const detachScrollHandler = (popover) => {
  popover && popover.shadowRoot.removeEventListener("scroll", repositionPopovers, { capture: true });
};
const attachGlobalClickHandler = () => {
  document.addEventListener("mousedown", clickHandler);
};
const detachGlobalClickHandler = () => {
  document.removeEventListener("mousedown", clickHandler);
};
const clickHandler = (event2) => {
  const openedPopups = getOpenedPopups();
  if (openedPopups.length === 0) {
    return;
  }
  const isTopPopupPopover = instanceOfPopover(openedPopups[openedPopups.length - 1].instance);
  if (!isTopPopupPopover) {
    return;
  }
  for (let i2 = openedPopups.length - 1; i2 !== -1; i2--) {
    const popup = openedPopups[i2].instance;
    if (popup.isModal || popup.isOpenerClicked(event2)) {
      return;
    }
    if (isClickInRect(event2, popup.getBoundingClientRect())) {
      break;
    }
    popup.close();
  }
};
const addOpenedPopover = (instance) => {
  const parentPopovers = getParentPopoversIfNested(instance);
  addOpenedPopup(instance, parentPopovers);
  openedRegistry.push({
    instance,
    parentPopovers
  });
  attachScrollHandler(instance);
  if (openedRegistry.length === 1) {
    attachGlobalScrollHandler();
    attachGlobalClickHandler();
    runUpdateInterval();
  }
};
const removeOpenedPopover = (instance) => {
  const popoversToClose = [instance];
  for (let i2 = 0; i2 < openedRegistry.length; i2++) {
    const indexOfCurrentInstance = openedRegistry[i2].parentPopovers.indexOf(instance);
    if (openedRegistry[i2].parentPopovers.length > 0 && indexOfCurrentInstance > -1) {
      popoversToClose.push(openedRegistry[i2].instance);
    }
  }
  for (let i2 = popoversToClose.length - 1; i2 >= 0; i2--) {
    for (let j = 0; j < openedRegistry.length; j++) {
      let indexOfItemToRemove = -1;
      if (popoversToClose[i2] === openedRegistry[j].instance) {
        indexOfItemToRemove = j;
      }
      if (indexOfItemToRemove >= 0) {
        removeOpenedPopup(openedRegistry[indexOfItemToRemove].instance);
        detachScrollHandler(openedRegistry[indexOfItemToRemove].instance);
        const itemToClose = openedRegistry.splice(indexOfItemToRemove, 1);
        itemToClose[0].instance.close(false, true);
      }
    }
  }
  if (!openedRegistry.length) {
    detachGlobalScrollHandler();
    detachGlobalClickHandler();
    stopUpdateInterval();
  }
};
const getRegistry = () => {
  return openedRegistry;
};
const getParentPopoversIfNested = (instance) => {
  let currentElement = instance.parentNode;
  const parentPopovers = [];
  while (currentElement && currentElement.parentNode) {
    for (let i2 = 0; i2 < openedRegistry.length; i2++) {
      if (currentElement === openedRegistry[i2].instance) {
        parentPopovers.push(currentElement);
      }
    }
    currentElement = currentElement.parentNode;
  }
  return parentPopovers;
};
function block0(context, tags, suffix) {
  return effectiveHtml`<section style="${styleMap(this.styles.root)}" class="${o(this.classes.root)}" role="${l(this._role)}" aria-modal="${l(this._ariaModal)}" aria-label="${l(this._ariaLabel)}" aria-labelledby="${l(this._ariaLabelledBy)}" @keydown=${this._onkeydown} @focusout=${this._onfocusout} @mouseup=${this._onmouseup} @mousedown=${this._onmousedown}><span class="first-fe" data-ui5-focus-trap tabindex="0" @focusin=${this.forwardToLast}></span><span class="ui5-popover-arrow" style="${styleMap(this.styles.arrow)}"></span>${this._displayHeader ? block1.call(this, context, tags, suffix) : void 0}<div style="${styleMap(this.styles.content)}" class="${o(this.classes.content)}"  @scroll="${this._scroll}" part="content"><slot></slot></div>${this._displayFooter ? block4.call(this, context, tags, suffix) : void 0}<span class="last-fe" data-ui5-focus-trap tabindex="0" @focusin=${this.forwardToFirst}></span></section> `;
}
function block1(context, tags, suffix) {
  return effectiveHtml`<header class="ui5-popup-header-root" id="ui5-popup-header" part="header">${this.header.length ? block2.call(this, context, tags, suffix) : block3.call(this, context, tags, suffix)}</header>`;
}
function block2(context, tags, suffix) {
  return effectiveHtml`<slot name="header"></slot>`;
}
function block3(context, tags, suffix) {
  return effectiveHtml`<h1 class="ui5-popup-header-text">${l(this.headerText)}</h1>`;
}
function block4(context, tags, suffix) {
  return effectiveHtml`${this.footer.length ? block5.call(this, context, tags, suffix) : void 0}`;
}
function block5(context, tags, suffix) {
  return effectiveHtml`<footer class="ui5-popup-footer-root" part="footer"><slot name="footer"></slot></footer>`;
}
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$6);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$7);
const styleData$2 = { packageName: "@ui5/webcomponents", fileName: "themes/BrowserScrollbar.css.ts", content: `:not(.ui5-content-native-scrollbars) ::-webkit-scrollbar:horizontal{height:var(--sapScrollBar_Dimension)}:not(.ui5-content-native-scrollbars) ::-webkit-scrollbar:vertical{width:var(--sapScrollBar_Dimension)}:not(.ui5-content-native-scrollbars) ::-webkit-scrollbar{background-color:var(--sapScrollBar_TrackColor);border-left:var(--browser_scrollbar_border)}:not(.ui5-content-native-scrollbars) ::-webkit-scrollbar-thumb{border-radius:var(--browser_scrollbar_border_radius);background-color:var(--sapScrollBar_FaceColor)}:not(.ui5-content-native-scrollbars) ::-webkit-scrollbar-thumb:hover{background-color:var(--sapScrollBar_Hover_FaceColor)}:not(.ui5-content-native-scrollbars) ::-webkit-scrollbar-corner{background-color:var(--sapScrollBar_TrackColor)}
` };
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$6);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$7);
const styleData$1 = { packageName: "@ui5/webcomponents", fileName: "themes/PopupsCommon.css.ts", content: `:host{display:none;position:fixed;background:var(--sapGroup_ContentBackground);border-radius:var(--_ui5-v1-21-2_popup_border_radius);min-height:2rem;box-sizing:border-box}.ui5-popup-root{background:inherit;border-radius:inherit;width:100%;height:100%;box-sizing:border-box;display:flex;flex-direction:column;overflow:hidden;outline:none}.ui5-popup-root .ui5-popup-header-root{color:var(--sapPageHeader_TextColor);box-shadow:var(--_ui5-v1-21-2_popup_header_shadow);border-bottom:var(--_ui5-v1-21-2_popup_header_border)}.ui5-popup-content{color:var(--sapTextColor)}.ui5-popup-footer-root{background:var(--sapPageFooter_Background);border-top:1px solid var(--sapPageFooter_BorderColor);color:var(--sapPageFooter_TextColor)}.ui5-popup-header-root,.ui5-popup-footer-root,:host([header-text]) .ui5-popup-header-text{margin:0;font-size:1rem;font-family:"72override",var(--_ui5-v1-21-2_popup_header_font_family);display:flex;justify-content:center;align-items:center}.ui5-popup-header-root .ui5-popup-header-text{font-weight:var(--_ui5-v1-21-2_popup_header_font_weight)}.ui5-popup-content{overflow:auto;box-sizing:border-box}:host([header-text]) .ui5-popup-header-text{text-align:center;min-height:var(--_ui5-v1-21-2_popup_default_header_height);max-height:var(--_ui5-v1-21-2_popup_default_header_height);line-height:var(--_ui5-v1-21-2_popup_default_header_height);text-overflow:ellipsis;overflow:hidden;white-space:nowrap;max-width:100%;display:inline-block}:host([header-text]) .ui5-popup-header-root{justify-content:var(--_ui5-v1-21-2_popup_header_prop_header_text_alignment)}:host(:not([header-text])) .ui5-popup-header-text{display:none}:host([disable-scrolling]) .ui5-popup-content{overflow:hidden}:host([media-range="S"]) .ui5-popup-content{padding:1rem var(--_ui5-v1-21-2_popup_content_padding_s)}:host([media-range="M"]) .ui5-popup-content,:host([media-range="L"]) .ui5-popup-content{padding:1rem var(--_ui5-v1-21-2_popup_content_padding_m_l)}:host([media-range="XL"]) .ui5-popup-content{padding:1rem var(--_ui5-v1-21-2_popup_content_padding_xl)}.ui5-popup-header-root{background:var(--_ui5-v1-21-2_popup_header_background)}:host([media-range="S"]) .ui5-popup-header-root,:host([media-range="S"]) .ui5-popup-footer-root{padding-left:var(--_ui5-v1-21-2_popup_header_footer_padding_s);padding-right:var(--_ui5-v1-21-2_popup_header_footer_padding_s)}:host([media-range="M"]) .ui5-popup-header-root,:host([media-range="L"]) .ui5-popup-header-root,:host([media-range="M"]) .ui5-popup-footer-root,:host([media-range="L"]) .ui5-popup-footer-root{padding-left:var(--_ui5-v1-21-2_popup_header_footer_padding_m_l);padding-right:var(--_ui5-v1-21-2_popup_header_footer_padding_m_l)}:host([media-range="XL"]) .ui5-popup-header-root,:host([media-range="XL"]) .ui5-popup-footer-root{padding-left:var(--_ui5-v1-21-2_popup_header_footer_padding_xl);padding-right:var(--_ui5-v1-21-2_popup_header_footer_padding_xl)}
` };
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$6);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$7);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/Popover.css.ts", content: `:host{box-shadow:var(--_ui5-v1-21-2_popover_box_shadow);background-color:var(--_ui5-v1-21-2_popover_background);max-width:calc(100vw - (100vw - 100%) - 2 * var(--_ui5-v1-21-2_popup_viewport_margin))}:host([hide-arrow]){box-shadow:var(--_ui5-v1-21-2_popover_no_arrow_box_shadow)}:host([opened][actual-placement-type="Top"]){margin-top:var(--_ui5-v1-21-2-popover-margin-bottom)}:host([opened][actual-placement-type="Bottom"]){margin-top:var(--_ui5-v1-21-2-popover-margin-top)}:host([actual-placement-type="Bottom"]) .ui5-popover-arrow{left:calc(50% - .5625rem);top:-.5rem;height:.5625rem}:host([actual-placement-type="Bottom"]) .ui5-popover-arrow:after{margin:var(--_ui5-v1-21-2_popover_upward_arrow_margin)}:host([actual-placement-type="Left"]) .ui5-popover-arrow{top:calc(50% - .5625rem);right:-.5625rem;width:.5625rem}:host([actual-placement-type="Left"]) .ui5-popover-arrow:after{margin:var(--_ui5-v1-21-2_popover_right_arrow_margin)}:host([actual-placement-type="Top"]) .ui5-popover-arrow{left:calc(50% - .5625rem);height:.5625rem;top:100%}:host([actual-placement-type="Top"]) .ui5-popover-arrow:after{margin:var(--_ui5-v1-21-2_popover_downward_arrow_margin)}:host(:not([actual-placement-type])) .ui5-popover-arrow,:host([actual-placement-type="Right"]) .ui5-popover-arrow{left:-.5625rem;top:calc(50% - .5625rem);width:.5625rem;height:1rem}:host(:not([actual-placement-type])) .ui5-popover-arrow:after,:host([actual-placement-type="Right"]) .ui5-popover-arrow:after{margin:var(--_ui5-v1-21-2_popover_left_arrow_margin)}:host([hide-arrow]) .ui5-popover-arrow{display:none}.ui5-popover-root{min-width:6.25rem}.ui5-popover-arrow{pointer-events:none;display:block;width:1rem;height:1rem;position:absolute;overflow:hidden}.ui5-popover-arrow:after{content:"";display:block;width:.7rem;height:.7rem;background-color:var(--_ui5-v1-21-2_popover_background);box-shadow:var(--_ui5-v1-21-2_popover_box_shadow);transform:rotate(-45deg)}
` };
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i2 = decorators.length - 1; i2 >= 0; i2--)
      if (d = decorators[i2])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Popover_1;
const ARROW_SIZE = 8;
let Popover = Popover_1 = class Popover2 extends Popup$1 {
  static get VIEWPORT_MARGIN() {
    return 10;
  }
  constructor() {
    super();
  }
  onAfterRendering() {
    super.onAfterRendering();
    if (!this.isOpen() && this.open) {
      let opener;
      if (this.opener instanceof HTMLElement) {
        opener = this.opener;
      } else if (typeof this.opener === "string") {
        opener = this.getRootNode().getElementById(this.opener) || document.getElementById(this.opener);
      }
      if (!opener) {
        console.warn("Valid opener id is required.");
        return;
      }
      this.showAt(opener);
    } else if (this.isOpen() && !this.open) {
      this.close();
    }
  }
  isOpenerClicked(e2) {
    const target = e2.target;
    if (target === this._opener) {
      return true;
    }
    const ui5ElementTarget = target;
    if (ui5ElementTarget.getFocusDomRef && ui5ElementTarget.getFocusDomRef() === this._opener) {
      return true;
    }
    return e2.composedPath().indexOf(this._opener) > -1;
  }
  /**
   * Shows the popover.
   * @param {HTMLElement} opener the element that the popover is shown at
   * @param {boolean} [preventInitialFocus=false] prevents applying the focus inside the popover
   * @public
   * @async
   * @method
   * @name sap.ui.webc.main.Popover#showAt
   * @async
   * @returns {Promise} Resolved when the popover is open
   */
  async showAt(opener, preventInitialFocus = false) {
    if (!opener || this.opened) {
      return;
    }
    this._opener = opener;
    this._openerRect = opener.getBoundingClientRect();
    await super._open(preventInitialFocus);
  }
  /**
   * Override for the _addOpenedPopup hook, which would otherwise just call addOpenedPopup(this)
   * @private
   */
  _addOpenedPopup() {
    addOpenedPopover(this);
  }
  /**
   * Override for the _removeOpenedPopup hook, which would otherwise just call removeOpenedPopup(this)
   * @private
   */
  _removeOpenedPopup() {
    removeOpenedPopover(this);
  }
  shouldCloseDueToOverflow(placement, openerRect) {
    const threshold = 32;
    const limits = {
      "Right": openerRect.right,
      "Left": openerRect.left,
      "Top": openerRect.top,
      "Bottom": openerRect.bottom
    };
    const closedPopupParent = getClosedPopupParent(this._opener);
    let overflowsBottom = false;
    let overflowsTop = false;
    if (closedPopupParent.showAt) {
      const contentRect = closedPopupParent.contentDOM.getBoundingClientRect();
      overflowsBottom = openerRect.top > contentRect.top + contentRect.height;
      overflowsTop = openerRect.top + openerRect.height < contentRect.top;
    }
    return limits[placement] < 0 || limits[placement] + threshold > closedPopupParent.innerHeight || overflowsBottom || overflowsTop;
  }
  shouldCloseDueToNoOpener(openerRect) {
    return openerRect.top === 0 && openerRect.bottom === 0 && openerRect.left === 0 && openerRect.right === 0;
  }
  isOpenerOutsideViewport(openerRect) {
    return openerRect.bottom < 0 || openerRect.top > window.innerHeight || openerRect.right < 0 || openerRect.left > window.innerWidth;
  }
  /**
   * @override
   */
  _resize() {
    super._resize();
    if (this.opened) {
      this.reposition();
    }
  }
  reposition() {
    this._show();
  }
  _show() {
    if (!this.opened) {
      this._showOutsideViewport();
    }
    const popoverSize = this.getPopoverSize();
    let placement;
    if (popoverSize.width === 0 || popoverSize.height === 0) {
      return;
    }
    if (this.isOpen()) {
      this._openerRect = this._opener.getBoundingClientRect();
    }
    if (this.shouldCloseDueToNoOpener(this._openerRect) && this.isFocusWithin() && this._oldPlacement) {
      placement = this._oldPlacement;
    } else {
      placement = this.calcPlacement(this._openerRect, popoverSize);
    }
    if (this._preventRepositionAndClose || this.isOpenerOutsideViewport(this._openerRect)) {
      return this.close();
    }
    this._oldPlacement = placement;
    this.actualPlacementType = placement.placementType;
    let left = clamp(this._left, Popover_1.VIEWPORT_MARGIN, document.documentElement.clientWidth - popoverSize.width - Popover_1.VIEWPORT_MARGIN);
    if (this.actualPlacementType === PopoverPlacementType$1.Right) {
      left = Math.max(left, this._left);
    }
    let top = clamp(this._top, Popover_1.VIEWPORT_MARGIN, document.documentElement.clientHeight - popoverSize.height - Popover_1.VIEWPORT_MARGIN);
    if (this.actualPlacementType === PopoverPlacementType$1.Bottom) {
      top = Math.max(top, this._top);
    }
    this.arrowTranslateX = placement.arrow.x;
    this.arrowTranslateY = placement.arrow.y;
    top = this._adjustForIOSKeyboard(top);
    const containingBlockClientLocation = this._getContainingBlockClientLocation();
    left -= containingBlockClientLocation.left;
    top -= containingBlockClientLocation.top;
    Object.assign(this.style, {
      top: `${top}px`,
      left: `${left}px`
    });
    if (this.horizontalAlign === PopoverHorizontalAlign$1.Stretch && this._width) {
      this.style.width = this._width;
    }
  }
  /**
   * Adjust the desired top position to compensate for shift of the screen
   * caused by opened keyboard on iOS which affects all elements with position:fixed.
   * @private
   * @param {int} top The target top in px.
   * @returns {int} The adjusted top in px.
   */
  _adjustForIOSKeyboard(top) {
    if (!isIOS()) {
      return top;
    }
    const actualTop = Math.ceil(this.getBoundingClientRect().top);
    return top + (Number.parseInt(this.style.top || "0") - actualTop);
  }
  _getContainingBlockClientLocation() {
    let parentElement = getParentElement(this);
    while (parentElement) {
      if (isElementContainingBlock(parentElement)) {
        return parentElement.getBoundingClientRect();
      }
      parentElement = getParentElement(parentElement);
    }
    return { left: 0, top: 0 };
  }
  getPopoverSize() {
    const rect = this.getBoundingClientRect(), width = rect.width, height = rect.height;
    return { width, height };
  }
  _showOutsideViewport() {
    Object.assign(this.style, {
      display: this._displayProp,
      top: "-10000px",
      left: "-10000px"
    });
  }
  get arrowDOM() {
    return this.shadowRoot.querySelector(".ui5-popover-arrow");
  }
  /**
   * @private
   */
  calcPlacement(targetRect, popoverSize) {
    let left = 0;
    let top = 0;
    const allowTargetOverlap = this.allowTargetOverlap;
    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;
    let maxHeight = clientHeight;
    let maxWidth = clientWidth;
    const placementType = this.getActualPlacementType(targetRect, popoverSize);
    this._preventRepositionAndClose = this.shouldCloseDueToNoOpener(targetRect) || this.shouldCloseDueToOverflow(placementType, targetRect);
    const isVertical = placementType === PopoverPlacementType$1.Top || placementType === PopoverPlacementType$1.Bottom;
    if (this.horizontalAlign === PopoverHorizontalAlign$1.Stretch && isVertical) {
      popoverSize.width = targetRect.width;
      this._width = `${targetRect.width}px`;
    } else if (this.verticalAlign === PopoverVerticalAlign$1.Stretch && !isVertical) {
      popoverSize.height = targetRect.height;
    }
    const arrowOffset = this.hideArrow ? 0 : ARROW_SIZE;
    switch (placementType) {
      case PopoverPlacementType$1.Top:
        left = this.getVerticalLeft(targetRect, popoverSize);
        top = Math.max(targetRect.top - popoverSize.height - arrowOffset, 0);
        if (!allowTargetOverlap) {
          maxHeight = targetRect.top - arrowOffset;
        }
        break;
      case PopoverPlacementType$1.Bottom:
        left = this.getVerticalLeft(targetRect, popoverSize);
        top = targetRect.bottom + arrowOffset;
        if (allowTargetOverlap) {
          top = Math.max(Math.min(top, clientHeight - popoverSize.height), 0);
        } else {
          maxHeight = clientHeight - targetRect.bottom - arrowOffset;
        }
        break;
      case PopoverPlacementType$1.Left:
        left = Math.max(targetRect.left - popoverSize.width - arrowOffset, 0);
        top = this.getHorizontalTop(targetRect, popoverSize);
        if (!allowTargetOverlap) {
          maxWidth = targetRect.left - arrowOffset;
        }
        break;
      case PopoverPlacementType$1.Right:
        left = targetRect.left + targetRect.width + arrowOffset;
        top = this.getHorizontalTop(targetRect, popoverSize);
        if (allowTargetOverlap) {
          left = Math.max(Math.min(left, clientWidth - popoverSize.width), 0);
        } else {
          maxWidth = clientWidth - targetRect.right - arrowOffset;
        }
        break;
    }
    if (isVertical) {
      if (popoverSize.width > clientWidth || left < 0) {
        left = 0;
      } else if (left + popoverSize.width > clientWidth) {
        left -= left + popoverSize.width - clientWidth;
      }
    } else {
      if (popoverSize.height > clientHeight || top < 0) {
        top = 0;
      } else if (top + popoverSize.height > clientHeight) {
        top -= top + popoverSize.height - clientHeight;
      }
    }
    this._maxHeight = Math.round(maxHeight - Popover_1.VIEWPORT_MARGIN);
    this._maxWidth = Math.round(maxWidth - Popover_1.VIEWPORT_MARGIN);
    if (this._left === void 0 || Math.abs(this._left - left) > 1.5) {
      this._left = Math.round(left);
    }
    if (this._top === void 0 || Math.abs(this._top - top) > 1.5) {
      this._top = Math.round(top);
    }
    const borderRadius = Number.parseInt(window.getComputedStyle(this).getPropertyValue("border-radius"));
    const arrowPos = this.getArrowPosition(targetRect, popoverSize, left, top, isVertical, borderRadius);
    return {
      arrow: arrowPos,
      top: this._top,
      left: this._left,
      placementType
    };
  }
  /**
   * Calculates the position for the arrow.
   * @private
   * @param targetRect BoundingClientRect of the target element
   * @param {{width: number, height: number}} popoverSize Width and height of the popover
   * @param left Left offset of the popover
   * @param top Top offset of the popover
   * @param isVertical If the popover is positioned vertically to the target element
   * @param {number} borderRadius Value of the border-radius property
   * @returns {{x: number, y: number}} Arrow's coordinates
   */
  getArrowPosition(targetRect, popoverSize, left, top, isVertical, borderRadius) {
    const horizontalAlign = this._actualHorizontalAlign;
    let arrowXCentered = horizontalAlign === PopoverHorizontalAlign$1.Center || horizontalAlign === PopoverHorizontalAlign$1.Stretch;
    if (horizontalAlign === PopoverHorizontalAlign$1.Right && left <= targetRect.left) {
      arrowXCentered = true;
    }
    if (horizontalAlign === PopoverHorizontalAlign$1.Left && left + popoverSize.width >= targetRect.left + targetRect.width) {
      arrowXCentered = true;
    }
    let arrowTranslateX = 0;
    if (isVertical && arrowXCentered) {
      arrowTranslateX = targetRect.left + targetRect.width / 2 - left - popoverSize.width / 2;
    }
    let arrowTranslateY = 0;
    if (!isVertical) {
      arrowTranslateY = targetRect.top + targetRect.height / 2 - top - popoverSize.height / 2;
    }
    const safeRangeForArrowY = popoverSize.height / 2 - borderRadius - ARROW_SIZE / 2;
    arrowTranslateY = clamp(arrowTranslateY, -safeRangeForArrowY, safeRangeForArrowY);
    const safeRangeForArrowX = popoverSize.width / 2 - borderRadius - ARROW_SIZE / 2;
    arrowTranslateX = clamp(arrowTranslateX, -safeRangeForArrowX, safeRangeForArrowX);
    return {
      x: Math.round(arrowTranslateX),
      y: Math.round(arrowTranslateY)
    };
  }
  /**
   * Fallbacks to new placement, prioritizing <code>Left</code> and <code>Right</code> placements.
   * @private
   */
  fallbackPlacement(clientWidth, clientHeight, targetRect, popoverSize) {
    if (targetRect.left > popoverSize.width) {
      return PopoverPlacementType$1.Left;
    }
    if (clientWidth - targetRect.right > targetRect.left) {
      return PopoverPlacementType$1.Right;
    }
    if (clientHeight - targetRect.bottom > popoverSize.height) {
      return PopoverPlacementType$1.Bottom;
    }
    if (clientHeight - targetRect.bottom < targetRect.top) {
      return PopoverPlacementType$1.Top;
    }
  }
  getActualPlacementType(targetRect, popoverSize) {
    const placementType = this.placementType;
    let actualPlacementType = placementType;
    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;
    switch (placementType) {
      case PopoverPlacementType$1.Top:
        if (targetRect.top < popoverSize.height && targetRect.top < clientHeight - targetRect.bottom) {
          actualPlacementType = PopoverPlacementType$1.Bottom;
        }
        break;
      case PopoverPlacementType$1.Bottom:
        if (clientHeight - targetRect.bottom < popoverSize.height && clientHeight - targetRect.bottom < targetRect.top) {
          actualPlacementType = PopoverPlacementType$1.Top;
        }
        break;
      case PopoverPlacementType$1.Left:
        if (targetRect.left < popoverSize.width) {
          actualPlacementType = this.fallbackPlacement(clientWidth, clientHeight, targetRect, popoverSize) || placementType;
        }
        break;
      case PopoverPlacementType$1.Right:
        if (clientWidth - targetRect.right < popoverSize.width) {
          actualPlacementType = this.fallbackPlacement(clientWidth, clientHeight, targetRect, popoverSize) || placementType;
        }
        break;
    }
    return actualPlacementType;
  }
  getVerticalLeft(targetRect, popoverSize) {
    const horizontalAlign = this._actualHorizontalAlign;
    let left = 0;
    switch (horizontalAlign) {
      case PopoverHorizontalAlign$1.Center:
      case PopoverHorizontalAlign$1.Stretch:
        left = targetRect.left - (popoverSize.width - targetRect.width) / 2;
        break;
      case PopoverHorizontalAlign$1.Left:
        left = targetRect.left;
        break;
      case PopoverHorizontalAlign$1.Right:
        left = targetRect.right - popoverSize.width;
        break;
    }
    return left;
  }
  getHorizontalTop(targetRect, popoverSize) {
    let top = 0;
    switch (this.verticalAlign) {
      case PopoverVerticalAlign$1.Center:
      case PopoverVerticalAlign$1.Stretch:
        top = targetRect.top - (popoverSize.height - targetRect.height) / 2;
        break;
      case PopoverVerticalAlign$1.Top:
        top = targetRect.top;
        break;
      case PopoverVerticalAlign$1.Bottom:
        top = targetRect.bottom - popoverSize.height;
        break;
    }
    return top;
  }
  get isModal() {
    return this.modal;
  }
  get shouldHideBackdrop() {
    return this.hideBackdrop;
  }
  get _ariaLabelledBy() {
    if (!this._ariaLabel && this._displayHeader) {
      return "ui5-popup-header";
    }
    return void 0;
  }
  get styles() {
    return {
      ...super.styles,
      root: {
        "max-height": this._maxHeight ? `${this._maxHeight}px` : "",
        "max-width": this._maxWidth ? `${this._maxWidth}px` : ""
      },
      arrow: {
        transform: `translate(${this.arrowTranslateX}px, ${this.arrowTranslateY}px)`
      }
    };
  }
  get classes() {
    const allClasses = super.classes;
    allClasses.root["ui5-popover-root"] = true;
    return allClasses;
  }
  /**
   * Hook for descendants to hide header.
   */
  get _displayHeader() {
    return !!(this.header.length || this.headerText);
  }
  /**
   * Hook for descendants to hide footer.
   */
  get _displayFooter() {
    return true;
  }
  get _actualHorizontalAlign() {
    if (this.effectiveDir === "rtl") {
      if (this.horizontalAlign === PopoverHorizontalAlign$1.Left) {
        return PopoverHorizontalAlign$1.Right;
      }
      if (this.horizontalAlign === PopoverHorizontalAlign$1.Right) {
        return PopoverHorizontalAlign$1.Left;
      }
    }
    return this.horizontalAlign;
  }
};
__decorate([
  property()
], Popover.prototype, "headerText", void 0);
__decorate([
  property({ type: PopoverPlacementType$1, defaultValue: PopoverPlacementType$1.Right })
], Popover.prototype, "placementType", void 0);
__decorate([
  property({ type: PopoverHorizontalAlign$1, defaultValue: PopoverHorizontalAlign$1.Center })
], Popover.prototype, "horizontalAlign", void 0);
__decorate([
  property({ type: PopoverVerticalAlign$1, defaultValue: PopoverVerticalAlign$1.Center })
], Popover.prototype, "verticalAlign", void 0);
__decorate([
  property({ type: Boolean })
], Popover.prototype, "modal", void 0);
__decorate([
  property({ type: Boolean })
], Popover.prototype, "hideBackdrop", void 0);
__decorate([
  property({ type: Boolean })
], Popover.prototype, "hideArrow", void 0);
__decorate([
  property({ type: Boolean })
], Popover.prototype, "allowTargetOverlap", void 0);
__decorate([
  property({ validator: DOMReference })
], Popover.prototype, "opener", void 0);
__decorate([
  property({ type: Boolean })
], Popover.prototype, "disableScrolling", void 0);
__decorate([
  property({ validator: Integer, defaultValue: 0, noAttribute: true })
], Popover.prototype, "arrowTranslateX", void 0);
__decorate([
  property({ validator: Integer, defaultValue: 0, noAttribute: true })
], Popover.prototype, "arrowTranslateY", void 0);
__decorate([
  property({ type: PopoverPlacementType$1, defaultValue: PopoverPlacementType$1.Right })
], Popover.prototype, "actualPlacementType", void 0);
__decorate([
  property({ validator: Integer, noAttribute: true })
], Popover.prototype, "_maxHeight", void 0);
__decorate([
  property({ validator: Integer, noAttribute: true })
], Popover.prototype, "_maxWidth", void 0);
__decorate([
  slot({ type: HTMLElement })
], Popover.prototype, "header", void 0);
__decorate([
  slot({ type: HTMLElement })
], Popover.prototype, "footer", void 0);
Popover = Popover_1 = __decorate([
  customElement({
    tag: "ui5-popover",
    styles: [
      styleData$2,
      styleData$1,
      styleData
    ],
    template: block0
  })
], Popover);
const instanceOfPopover = (object) => {
  return "showAt" in object;
};
Popover.define();
const Popover$1 = Popover;
export {
  Integer as I,
  Popover$1 as P,
  ResizeHandler as R,
  ValueState$1 as V,
  Popup$1 as a,
  PopupAccessibleRole$1 as b,
  clamp as c,
  styleData$2 as d,
  styleData$1 as e,
  getNextZIndex as f,
  getActiveElement as g,
  getEffectiveScrollbarStyle as h,
  isElementHidden as i,
  o,
  styleMap as s
};
