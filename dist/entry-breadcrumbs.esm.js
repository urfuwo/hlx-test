import { e, i, t, T, a as isLeft, b as isRight, c as isUp, d as isDown, f as isHome, g as isEnd, h as isPageUp, j as isPageDown, k as instanceOfUI5Element, p as property, s as slot, l as customElement, U as UI5Element, m as effectiveHtml, n as l, r as registerThemePropertiesLoader, o as styleData$k, q as styleData$l, u as event, v as getEffectiveAriaLabelText, L as LINK_SUBTLE, w as LINK_EMPHASIZED, x as getI18nBundle, y as markEvent, z as isEnter, A as isSpace, B as litRender, C as LABEL_COLON, D as getSharedResource, E as getFeature, F as scopeTag, G as isEscape, H as hasStyle, I as createStyle, J as isTabPrevious, K as isSafari, M as isChrome, N as renderFinished, O as isIOS, P as registerIcon, Q as isLegacyThemeFamily, R as DIALOG_HEADER_ARIA_ROLE_DESCRIPTION, S as DIALOG_HEADER_ARIA_DESCRIBEDBY_RESIZABLE, V as DIALOG_HEADER_ARIA_DESCRIBEDBY_DRAGGABLE, W as DIALOG_HEADER_ARIA_DESCRIBEDBY_DRAGGABLE_RESIZABLE, X as isPhone, Y as isDesktop, Z as isUpShift, _ as isDownShift, $ as isLeftShift, a0 as isRightShift, a1 as Icon, a2 as Button, a3 as RESPONSIVE_POPOVER_CLOSE_DIALOG_BUTTON, a4 as isTabNext, a5 as BUSY_INDICATOR_TITLE, a6 as VALUE_STATE_ERROR, a7 as VALUE_STATE_WARNING, a8 as VALUE_STATE_SUCCESS, a9 as effectiveSvg, aa as VALUE_STATE_INFORMATION, ab as RADIO_BUTTON_GROUP_REQUIRED, ac as ARIA_LABEL_LIST_MULTISELECTABLE, ad as ARIA_LABEL_LIST_SELECTABLE, ae as ARIA_LABEL_LIST_DELETABLE, af as LOAD_MORE_TEXT, ag as isDelete, ah as getEventMark, ai as LIST_ITEM_SELECTED, aj as LIST_ITEM_NOT_SELECTED, ak as DELETE, al as ARIA_LABEL_LIST_ITEM_CHECKBOX, am as ARIA_LABEL_LIST_ITEM_RADIO_BUTTON, an as AVATAR_TOOLTIP, ao as c, ap as isShow, aq as BREADCRUMB_ITEM_POS, ar as BREADCRUMBS_ARIA_LABEL, as as BREADCRUMBS_OVERFLOW_ARIA_LABEL, at as BREADCRUMBS_CANCEL_BUTTON } from "./entry-button-y0VrvcGp.js";
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
const getActiveElement = () => {
  let element = document.activeElement;
  while (element && element.shadowRoot && element.shadowRoot.activeElement) {
    element = element.shadowRoot.activeElement;
  }
  return element;
};
var NavigationMode;
(function(NavigationMode2) {
  NavigationMode2["Auto"] = "Auto";
  NavigationMode2["Vertical"] = "Vertical";
  NavigationMode2["Horizontal"] = "Horizontal";
  NavigationMode2["Paging"] = "Paging";
})(NavigationMode || (NavigationMode = {}));
const NavigationMode$1 = NavigationMode;
var ItemNavigationBehavior;
(function(ItemNavigationBehavior2) {
  ItemNavigationBehavior2["Static"] = "Static";
  ItemNavigationBehavior2["Cyclic"] = "Cyclic";
})(ItemNavigationBehavior || (ItemNavigationBehavior = {}));
const ItemNavigationBehavior$1 = ItemNavigationBehavior;
class ItemNavigation {
  /**
   *
   * @param rootWebComponent the component to operate on (component that slots or contains within its shadow root the items the user navigates among)
   * @param {ItemNavigationOptions} options Object with configuration options:
   *  - currentIndex: the index of the item that will be initially selected (from which navigation will begin)
   *  - navigationMode (Auto|Horizontal|Vertical): whether the items are displayed horizontally (Horizontal), vertically (Vertical) or as a matrix (Auto) meaning the user can navigate in both directions (up/down and left/right)
   *  - rowSize: tells how many items per row there are when the items are not rendered as a flat list but rather as a matrix. Relevant for navigationMode=Auto
   * 	- skipItemsSize: tells how many items upon PAGE_UP and PAGE_DOWN should be skipped to applying the focus on the next item
   *  - behavior (Static|Cycling): tells what to do when trying to navigate beyond the first and last items
   *    Static means that nothing happens if the user tries to navigate beyond the first/last item.
   *    Cycling means that when the user navigates beyond the last item they go to the first and vice versa.
   *  - getItemsCallback: function that, when called, returns an array with all items the user can navigate among
   *  - affectedPropertiesNames: a list of metadata properties on the root component which, upon user navigation, will be reassigned by address thus causing the root component to invalidate
   */
  constructor(rootWebComponent, options) {
    if (!rootWebComponent.isUI5Element) {
      throw new Error("The root web component must be a UI5 Element instance");
    }
    this.rootWebComponent = rootWebComponent;
    this.rootWebComponent.addEventListener("keydown", this._onkeydown.bind(this));
    this._initBound = this._init.bind(this);
    this.rootWebComponent.attachComponentStateFinalized(this._initBound);
    if (typeof options.getItemsCallback !== "function") {
      throw new Error("getItemsCallback is required");
    }
    this._getItems = options.getItemsCallback;
    this._currentIndex = options.currentIndex || 0;
    this._rowSize = options.rowSize || 1;
    this._behavior = options.behavior || ItemNavigationBehavior$1.Static;
    this._navigationMode = options.navigationMode || NavigationMode$1.Auto;
    this._affectedPropertiesNames = options.affectedPropertiesNames || [];
    this._skipItemsSize = options.skipItemsSize || null;
  }
  /**
   * Call this method to set a new "current" (selected) item in the item navigation
   * Note: the item passed to this function must be one of the items, returned by the getItemsCallback function
   *
   * @public
   * @param current the new selected item
   */
  setCurrentItem(current) {
    const currentItemIndex = this._getItems().indexOf(current);
    if (currentItemIndex === -1) {
      console.warn(`The provided item is not managed by ItemNavigation`, current);
      return;
    }
    this._currentIndex = currentItemIndex;
    this._applyTabIndex();
  }
  /**
   * Call this method to dynamically change the row size
   *
   * @public
   * @param newRowSize
   */
  setRowSize(newRowSize) {
    this._rowSize = newRowSize;
  }
  _init() {
    this._getItems().forEach((item, idx) => {
      item._tabIndex = idx === this._currentIndex ? "0" : "-1";
    });
  }
  _onkeydown(event2) {
    if (!this._canNavigate()) {
      return;
    }
    const horizontalNavigationOn = this._navigationMode === NavigationMode$1.Horizontal || this._navigationMode === NavigationMode$1.Auto;
    const verticalNavigationOn = this._navigationMode === NavigationMode$1.Vertical || this._navigationMode === NavigationMode$1.Auto;
    const isRTL = this.rootWebComponent.effectiveDir === "rtl";
    if (isRTL && isLeft(event2) && horizontalNavigationOn) {
      this._handleRight();
    } else if (isRTL && isRight(event2) && horizontalNavigationOn) {
      this._handleLeft();
    } else if (isLeft(event2) && horizontalNavigationOn) {
      this._handleLeft();
    } else if (isRight(event2) && horizontalNavigationOn) {
      this._handleRight();
    } else if (isUp(event2) && verticalNavigationOn) {
      this._handleUp();
    } else if (isDown(event2) && verticalNavigationOn) {
      this._handleDown();
    } else if (isHome(event2)) {
      this._handleHome();
    } else if (isEnd(event2)) {
      this._handleEnd();
    } else if (isPageUp(event2)) {
      this._handlePageUp();
    } else if (isPageDown(event2)) {
      this._handlePageDown();
    } else {
      return;
    }
    event2.preventDefault();
    this._applyTabIndex();
    this._focusCurrentItem();
  }
  _handleUp() {
    const itemsLength = this._getItems().length;
    if (this._currentIndex - this._rowSize >= 0) {
      this._currentIndex -= this._rowSize;
      return;
    }
    if (this._behavior === ItemNavigationBehavior$1.Cyclic) {
      const firstItemInThisColumnIndex = this._currentIndex % this._rowSize;
      const firstItemInPreviousColumnIndex = firstItemInThisColumnIndex === 0 ? this._rowSize - 1 : firstItemInThisColumnIndex - 1;
      const rows = Math.ceil(itemsLength / this._rowSize);
      let lastItemInPreviousColumnIndex = firstItemInPreviousColumnIndex + (rows - 1) * this._rowSize;
      if (lastItemInPreviousColumnIndex > itemsLength - 1) {
        lastItemInPreviousColumnIndex -= this._rowSize;
      }
      this._currentIndex = lastItemInPreviousColumnIndex;
    } else {
      this._currentIndex = 0;
    }
  }
  _handleDown() {
    const itemsLength = this._getItems().length;
    if (this._currentIndex + this._rowSize < itemsLength) {
      this._currentIndex += this._rowSize;
      return;
    }
    if (this._behavior === ItemNavigationBehavior$1.Cyclic) {
      const firstItemInThisColumnIndex = this._currentIndex % this._rowSize;
      const firstItemInNextColumnIndex = (firstItemInThisColumnIndex + 1) % this._rowSize;
      this._currentIndex = firstItemInNextColumnIndex;
    } else {
      this._currentIndex = itemsLength - 1;
    }
  }
  _handleLeft() {
    const itemsLength = this._getItems().length;
    if (this._currentIndex > 0) {
      this._currentIndex -= 1;
      return;
    }
    if (this._behavior === ItemNavigationBehavior$1.Cyclic) {
      this._currentIndex = itemsLength - 1;
    }
  }
  _handleRight() {
    const itemsLength = this._getItems().length;
    if (this._currentIndex < itemsLength - 1) {
      this._currentIndex += 1;
      return;
    }
    if (this._behavior === ItemNavigationBehavior$1.Cyclic) {
      this._currentIndex = 0;
    }
  }
  _handleHome() {
    const homeEndRange = this._rowSize > 1 ? this._rowSize : this._getItems().length;
    this._currentIndex -= this._currentIndex % homeEndRange;
  }
  _handleEnd() {
    const homeEndRange = this._rowSize > 1 ? this._rowSize : this._getItems().length;
    this._currentIndex += homeEndRange - 1 - this._currentIndex % homeEndRange;
  }
  _handlePageUp() {
    if (this._rowSize > 1) {
      return;
    }
    this._handlePageUpFlat();
  }
  _handlePageDown() {
    if (this._rowSize > 1) {
      return;
    }
    this._handlePageDownFlat();
  }
  /**
   * Handles PAGE_UP in a flat list-like structure, both vertically and horizontally.
   */
  _handlePageUpFlat() {
    if (this._skipItemsSize === null) {
      this._currentIndex -= this._currentIndex;
      return;
    }
    if (this._currentIndex + 1 > this._skipItemsSize) {
      this._currentIndex -= this._skipItemsSize;
    } else {
      this._currentIndex -= this._currentIndex;
    }
  }
  /**
   * Handles PAGE_DOWN in a flat list-like structure, both vertically and horizontally.
   */
  _handlePageDownFlat() {
    if (this._skipItemsSize === null) {
      this._currentIndex = this._getItems().length - 1;
      return;
    }
    const currentToEndRange = this._getItems().length - this._currentIndex - 1;
    if (currentToEndRange > this._skipItemsSize) {
      this._currentIndex += this._skipItemsSize;
    } else {
      this._currentIndex = this._getItems().length - 1;
    }
  }
  _applyTabIndex() {
    const items = this._getItems();
    for (let i2 = 0; i2 < items.length; i2++) {
      items[i2]._tabIndex = i2 === this._currentIndex ? "0" : "-1";
    }
    this._affectedPropertiesNames.forEach((propName) => {
      const prop = this.rootWebComponent[propName];
      this.rootWebComponent[propName] = Array.isArray(prop) ? [...prop] : { ...prop };
    });
  }
  _focusCurrentItem() {
    const currentItem = this._getCurrentItem();
    if (currentItem) {
      currentItem.focus();
    }
  }
  _canNavigate() {
    const currentItem = this._getCurrentItem();
    const activeElement = getActiveElement();
    return currentItem && currentItem === activeElement;
  }
  _getCurrentItem() {
    const items = this._getItems();
    if (!items.length) {
      return;
    }
    while (this._currentIndex >= items.length) {
      this._currentIndex -= this._rowSize;
    }
    if (this._currentIndex < 0) {
      this._currentIndex = 0;
    }
    const currentItem = items[this._currentIndex];
    if (!currentItem) {
      return;
    }
    if (instanceOfUI5Element(currentItem)) {
      return currentItem.getFocusDomRef();
    }
    const currentItemDOMRef = this.rootWebComponent.getDomRef();
    if (!currentItemDOMRef) {
      return;
    }
    if (currentItem.id) {
      return currentItemDOMRef.querySelector(`[id="${currentItem.id}"]`);
    }
  }
}
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
var BreadcrumbsDesign;
(function(BreadcrumbsDesign2) {
  BreadcrumbsDesign2["Standard"] = "Standard";
  BreadcrumbsDesign2["NoCurrentPage"] = "NoCurrentPage";
})(BreadcrumbsDesign || (BreadcrumbsDesign = {}));
const BreadcrumbsDesign$1 = BreadcrumbsDesign;
var BreadcrumbsSeparatorStyle;
(function(BreadcrumbsSeparatorStyle2) {
  BreadcrumbsSeparatorStyle2["Slash"] = "Slash";
  BreadcrumbsSeparatorStyle2["BackSlash"] = "BackSlash";
  BreadcrumbsSeparatorStyle2["DoubleBackSlash"] = "DoubleBackSlash";
  BreadcrumbsSeparatorStyle2["DoubleGreaterThan"] = "DoubleGreaterThan";
  BreadcrumbsSeparatorStyle2["DoubleSlash"] = "DoubleSlash";
  BreadcrumbsSeparatorStyle2["GreaterThan"] = "GreaterThan";
})(BreadcrumbsSeparatorStyle || (BreadcrumbsSeparatorStyle = {}));
const BreadcrumbsSeparatorStyle$1 = BreadcrumbsSeparatorStyle;
var __decorate$g = function(decorators, target, key, desc) {
  var c2 = arguments.length, r = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i2 = decorators.length - 1; i2 >= 0; i2--)
      if (d = decorators[i2])
        r = (c2 < 3 ? d(r) : c2 > 3 ? d(target, key, r) : d(target, key)) || r;
  return c2 > 3 && r && Object.defineProperty(target, key, r), r;
};
let BreadcrumbsItem = class BreadcrumbsItem2 extends UI5Element {
  get stableDomRef() {
    return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
  }
};
__decorate$g([
  property()
], BreadcrumbsItem.prototype, "href", void 0);
__decorate$g([
  property({ defaultValue: void 0 })
], BreadcrumbsItem.prototype, "target", void 0);
__decorate$g([
  property()
], BreadcrumbsItem.prototype, "accessibleName", void 0);
__decorate$g([
  slot({ type: Node, "default": true })
], BreadcrumbsItem.prototype, "text", void 0);
BreadcrumbsItem = __decorate$g([
  customElement("ui5-breadcrumbs-item")
], BreadcrumbsItem);
BreadcrumbsItem.define();
const BreadcrumbsItem$1 = BreadcrumbsItem;
var LinkDesign;
(function(LinkDesign2) {
  LinkDesign2["Default"] = "Default";
  LinkDesign2["Subtle"] = "Subtle";
  LinkDesign2["Emphasized"] = "Emphasized";
})(LinkDesign || (LinkDesign = {}));
const LinkDesign$1 = LinkDesign;
var WrappingType;
(function(WrappingType2) {
  WrappingType2["None"] = "None";
  WrappingType2["Normal"] = "Normal";
})(WrappingType || (WrappingType = {}));
const WrappingType$1 = WrappingType;
function block0$f(context, tags, suffix) {
  return effectiveHtml`<a class="ui5-link-root" role="${l(this.effectiveAccRole)}" href="${l(this.parsedRef)}" target="${l(this.target)}" rel="${l(this._rel)}" tabindex="${l(this.effectiveTabIndex)}" title="${l(this.title)}" ?disabled="${this.disabled}" aria-label="${l(this.ariaLabelText)}" aria-haspopup="${l(this.accessibilityAttributes.hasPopup)}" aria-expanded="${l(this.accessibilityAttributes.expanded)}" @focusin=${this._onfocusin} @focusout=${this._onfocusout} @click=${this._onclick} @keydown=${this._onkeydown} @keyup=${this._onkeyup}><slot></slot>${this.hasLinkType ? block1$c.call(this, context, tags, suffix) : void 0}</a>`;
}
function block1$c(context, tags, suffix) {
  return effectiveHtml`<span class="ui5-hidden-text">${l(this.linkTypeText)}</span>`;
}
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$k);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$l);
const styleData$j = { packageName: "@ui5/webcomponents", fileName: "themes/Link.css.ts", content: `.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host(:not([hidden])){display:inline-flex}:host{max-width:100%;color:var(--sapLinkColor);font-family:var(--sapFontFamily);font-size:var(--sapFontSize);cursor:pointer;outline:none;text-decoration:var(--_ui5-v1-21-2_link_text_decoration);text-shadow:var(--sapContent_TextShadow);white-space:nowrap;overflow-wrap:normal}:host(:hover){color:var(--sapLink_Hover_Color);text-decoration:var(--_ui5-v1-21-2_link_hover_text_decoration)}:host(:active){color:var(--sapLink_Active_Color);text-decoration:var(--_ui5-v1-21-2_link_active_text_decoration)}:host([disabled]){pointer-events:none}:host([disabled]) .ui5-link-root{text-shadow:none;outline:none;cursor:default;pointer-events:none;opacity:var(--sapContent_DisabledOpacity)}:host([design="Emphasized"]) .ui5-link-root{font-family:var(--sapFontBoldFamily)}:host([design="Subtle"]){color:var(--sapLink_SubtleColor);text-decoration:var(--_ui5-v1-21-2_link_subtle_text_decoration)}:host([design="Subtle"]:hover:not(:active)){color:var(--sapLink_SubtleColor);text-decoration:var(--_ui5-v1-21-2_link_subtle_text_decoration_hover)}:host([wrapping-type="Normal"]){white-space:normal;overflow-wrap:break-word}.ui5-link-root{max-width:100%;display:inline-block;position:relative;overflow:hidden;text-overflow:ellipsis;outline:none;white-space:inherit;overflow-wrap:inherit;text-decoration:inherit;color:inherit}:host .ui5-link-root{border:var(--_ui5-v1-21-2_link_border);border-radius:var(--_ui5-v1-21-2_link_focus_border-radius)}:host([focused]) .ui5-link-root,:host([design="Subtle"][focused]) .ui5-link-root{background-color:var(--_ui5-v1-21-2_link_focus_background_color);border:var(--_ui5-v1-21-2_link_border_focus);border-radius:var(--_ui5-v1-21-2_link_focus_border-radius);text-shadow:none}:host([focused]),:host([design="Subtle"][focused]){color:var(--_ui5-v1-21-2_link_focus_color);text-decoration:var(--_ui5-v1-21-2_link_focus_text_decoration)}:host([focused]:hover:not(:active)){color:var(--_ui5-v1-21-2_link_focused_hover_text_color);text-decoration:var(--_ui5-v1-21-2_link_focused_hover_text_decoration)}
` };
var __decorate$f = function(decorators, target, key, desc) {
  var c2 = arguments.length, r = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i2 = decorators.length - 1; i2 >= 0; i2--)
      if (d = decorators[i2])
        r = (c2 < 3 ? d(r) : c2 > 3 ? d(target, key, r) : d(target, key)) || r;
  return c2 > 3 && r && Object.defineProperty(target, key, r), r;
};
var Link_1;
let Link = Link_1 = class Link2 extends UI5Element {
  constructor() {
    super();
    this._dummyAnchor = document.createElement("a");
  }
  onBeforeRendering() {
    const needsNoReferrer = this.target !== "_self" && this.href && this._isCrossOrigin();
    this._rel = needsNoReferrer ? "noreferrer noopener" : void 0;
  }
  _isCrossOrigin() {
    const loc = window.location;
    this._dummyAnchor.href = this.href;
    return !(this._dummyAnchor.hostname === loc.hostname && this._dummyAnchor.port === loc.port && this._dummyAnchor.protocol === loc.protocol);
  }
  get effectiveTabIndex() {
    var _a;
    if (this._tabIndex) {
      return this._tabIndex;
    }
    return this.disabled || !((_a = this.textContent) == null ? void 0 : _a.length) ? "-1" : "0";
  }
  get ariaLabelText() {
    return getEffectiveAriaLabelText(this);
  }
  get hasLinkType() {
    return this.design !== LinkDesign$1.Default;
  }
  static typeTextMappings() {
    return {
      "Subtle": LINK_SUBTLE,
      "Emphasized": LINK_EMPHASIZED
    };
  }
  get linkTypeText() {
    return Link_1.i18nBundle.getText(Link_1.typeTextMappings()[this.design]);
  }
  get parsedRef() {
    return this.href && this.href.length > 0 ? this.href : void 0;
  }
  get effectiveAccRole() {
    return this.accessibleRole.toLowerCase();
  }
  static async onDefine() {
    Link_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
  }
  _onclick(e2) {
    const { altKey, ctrlKey, metaKey, shiftKey } = e2;
    e2.stopImmediatePropagation();
    markEvent(e2, "link");
    const executeEvent = this.fireEvent("click", {
      altKey,
      ctrlKey,
      metaKey,
      shiftKey
    }, true);
    if (!executeEvent) {
      e2.preventDefault();
    }
  }
  _onfocusin(e2) {
    markEvent(e2, "link");
    this.focused = true;
  }
  _onfocusout() {
    this.focused = false;
  }
  _onkeydown(e2) {
    if (isEnter(e2) && !this.href) {
      this._onclick(e2);
    } else if (isSpace(e2)) {
      e2.preventDefault();
    }
    markEvent(e2, "link");
  }
  _onkeyup(e2) {
    if (!isSpace(e2)) {
      markEvent(e2, "link");
      return;
    }
    this._onclick(e2);
    if (this.href && !e2.defaultPrevented) {
      const customEvent = new MouseEvent("click");
      customEvent.stopImmediatePropagation();
      this.getDomRef().dispatchEvent(customEvent);
    }
  }
};
__decorate$f([
  property({ type: Boolean })
], Link.prototype, "disabled", void 0);
__decorate$f([
  property()
], Link.prototype, "title", void 0);
__decorate$f([
  property()
], Link.prototype, "href", void 0);
__decorate$f([
  property()
], Link.prototype, "target", void 0);
__decorate$f([
  property({ type: LinkDesign$1, defaultValue: LinkDesign$1.Default })
], Link.prototype, "design", void 0);
__decorate$f([
  property({ type: WrappingType$1, defaultValue: WrappingType$1.None })
], Link.prototype, "wrappingType", void 0);
__decorate$f([
  property()
], Link.prototype, "accessibleName", void 0);
__decorate$f([
  property()
], Link.prototype, "accessibleNameRef", void 0);
__decorate$f([
  property({ defaultValue: "link" })
], Link.prototype, "accessibleRole", void 0);
__decorate$f([
  property({ type: Object })
], Link.prototype, "accessibilityAttributes", void 0);
__decorate$f([
  property({ noAttribute: true })
], Link.prototype, "_rel", void 0);
__decorate$f([
  property({ noAttribute: true })
], Link.prototype, "_tabIndex", void 0);
__decorate$f([
  property({ type: Boolean })
], Link.prototype, "focused", void 0);
Link = Link_1 = __decorate$f([
  customElement({
    tag: "ui5-link",
    languageAware: true,
    renderer: litRender,
    template: block0$f,
    styles: styleData$j
  }),
  event("click", {
    detail: {
      altKey: { type: Boolean },
      ctrlKey: { type: Boolean },
      metaKey: { type: Boolean },
      shiftKey: { type: Boolean }
    }
  })
], Link);
Link.define();
const Link$1 = Link;
function block0$e(context, tags, suffix) {
  return effectiveHtml`<label class="ui5-label-root" @click=${this._onclick}><span class="ui5-label-text-wrapper"><bdi id="${l(this._id)}-bdi"><slot></slot></bdi></span><span aria-hidden="true" class="ui5-label-required-colon" data-colon="${l(this._colonSymbol)}"></span></label>`;
}
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$k);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$l);
const styleData$i = { packageName: "@ui5/webcomponents", fileName: "themes/Label.css.ts", content: `:host(:not([hidden])){display:inline-flex}:host{max-width:100%;color:var(--sapContent_LabelColor);font-family:"72override",var(--sapFontFamily);font-size:var(--sapFontSize);font-weight:400;cursor:text}.ui5-label-root{width:100%;cursor:inherit}:host([wrapping-type="Normal"]) .ui5-label-root{white-space:normal}:host(:not([wrapping-type="Normal"])) .ui5-label-root{display:inline-flex;white-space:nowrap}:host(:not([wrapping-type="Normal"])) .ui5-label-text-wrapper{text-overflow:ellipsis;overflow:hidden;display:inline-block;vertical-align:top;flex:0 1 auto;min-width:0}:host([show-colon]) .ui5-label-required-colon:before{content:attr(data-colon)}:host([required]) .ui5-label-required-colon:after{content:"*";color:var(--sapField_RequiredColor);font-size:1.25rem;font-weight:700;position:relative;font-style:normal;vertical-align:middle;line-height:0}:host([required][show-colon]) .ui5-label-required-colon:after{margin-inline-start:.125rem}bdi{padding-right:.075rem}:host([show-colon]) .ui5-label-required-colon{margin-inline-start:-.05rem;white-space:pre}
` };
var __decorate$e = function(decorators, target, key, desc) {
  var c2 = arguments.length, r = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i2 = decorators.length - 1; i2 >= 0; i2--)
      if (d = decorators[i2])
        r = (c2 < 3 ? d(r) : c2 > 3 ? d(target, key, r) : d(target, key)) || r;
  return c2 > 3 && r && Object.defineProperty(target, key, r), r;
};
var Label_1;
let Label = Label_1 = class Label2 extends UI5Element {
  static async onDefine() {
    Label_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
  }
  /**
   * Defines the text of the component.
   * <br><b>Note:</b> Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
   *
   * @type {Node[]}
   * @slot
   * @public
   * @name sap.ui.webc.main.Label.prototype.default
   */
  _onclick() {
    if (!this.for) {
      return;
    }
    const elementToFocus = this.getRootNode().querySelector(`[id="${this.for}"]`);
    if (elementToFocus) {
      elementToFocus.focus();
    }
  }
  get _colonSymbol() {
    return Label_1.i18nBundle.getText(LABEL_COLON);
  }
};
__decorate$e([
  property()
], Label.prototype, "for", void 0);
__decorate$e([
  property({ type: Boolean })
], Label.prototype, "showColon", void 0);
__decorate$e([
  property({ type: Boolean })
], Label.prototype, "required", void 0);
__decorate$e([
  property({ type: WrappingType$1, defaultValue: WrappingType$1.None })
], Label.prototype, "wrappingType", void 0);
Label = Label_1 = __decorate$e([
  customElement({
    tag: "ui5-label",
    renderer: litRender,
    template: block0$e,
    styles: styleData$i,
    languageAware: true
  })
], Label);
Label.define();
const Label$1 = Label;
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
function block0$d(context, tags, suffix) {
  return effectiveHtml`${this._isPhone ? block1$b.call(this, context, tags, suffix) : block7$3.call(this, context, tags, suffix)}`;
}
function block1$b(context, tags, suffix) {
  return suffix ? effectiveHtml`<${scopeTag("ui5-dialog", tags, suffix)} accessible-name=${l(this.accessibleName)} accessible-name-ref=${l(this.accessibleNameRef)} accessible-role=${l(this.accessibleRole)} stretch _disable-initial-focus @ui5-before-open="${l(this._beforeDialogOpen)}" @ui5-after-open="${l(this._propagateDialogEvent)}" @ui5-before-close="${l(this._propagateDialogEvent)}" @ui5-after-close="${l(this._afterDialogClose)}" exportparts="content, header, footer">${!this._hideHeader ? block2$a.call(this, context, tags, suffix) : void 0}<slot></slot><slot slot="footer" name="footer"></slot></${scopeTag("ui5-dialog", tags, suffix)}>` : effectiveHtml`<ui5-dialog accessible-name=${l(this.accessibleName)} accessible-name-ref=${l(this.accessibleNameRef)} accessible-role=${l(this.accessibleRole)} stretch _disable-initial-focus @ui5-before-open="${l(this._beforeDialogOpen)}" @ui5-after-open="${l(this._propagateDialogEvent)}" @ui5-before-close="${l(this._propagateDialogEvent)}" @ui5-after-close="${l(this._afterDialogClose)}" exportparts="content, header, footer">${!this._hideHeader ? block2$a.call(this, context, tags, suffix) : void 0}<slot></slot><slot slot="footer" name="footer"></slot></ui5-dialog>`;
}
function block2$a(context, tags, suffix) {
  return effectiveHtml`${this.header.length ? block3$8.call(this, context, tags, suffix) : block4$6.call(this, context, tags, suffix)}`;
}
function block3$8(context, tags, suffix) {
  return effectiveHtml`<slot slot="header" name="header"></slot>`;
}
function block4$6(context, tags, suffix) {
  return effectiveHtml`<div class="${o(this.classes.header)}" slot="header">${this.headerText ? block5$5.call(this, context, tags, suffix) : void 0}${!this._hideCloseButton ? block6$4.call(this, context, tags, suffix) : void 0}</div>`;
}
function block5$5(context, tags, suffix) {
  return suffix ? effectiveHtml`<${scopeTag("ui5-title", tags, suffix)} level="H2" class="ui5-popup-header-text ui5-responsive-popover-header-text">${l(this.headerText)}</${scopeTag("ui5-title", tags, suffix)}>` : effectiveHtml`<ui5-title level="H2" class="ui5-popup-header-text ui5-responsive-popover-header-text">${l(this.headerText)}</ui5-title>`;
}
function block6$4(context, tags, suffix) {
  return suffix ? effectiveHtml`<${scopeTag("ui5-button", tags, suffix)} icon="decline" design="Transparent" aria-label="${l(this._closeDialogAriaLabel)}" @click="${this.close}"></${scopeTag("ui5-button", tags, suffix)}>` : effectiveHtml`<ui5-button icon="decline" design="Transparent" aria-label="${l(this._closeDialogAriaLabel)}" @click="${this.close}"></ui5-button>`;
}
function block7$3(context, tags, suffix) {
  return effectiveHtml`<section style="${styleMap(this.styles.root)}" class="${o(this.classes.root)}" role="${l(this._role)}" aria-modal="${l(this._ariaModal)}" aria-label="${l(this._ariaLabel)}" aria-labelledby="${l(this._ariaLabelledBy)}" @keydown=${this._onkeydown} @focusout=${this._onfocusout} @mouseup=${this._onmouseup} @mousedown=${this._onmousedown}><span class="first-fe" data-ui5-focus-trap tabindex="0" @focusin=${this.forwardToLast}></span><span class="ui5-popover-arrow" style="${styleMap(this.styles.arrow)}"></span>${this._displayHeader ? block8$3.call(this, context, tags, suffix) : void 0}<div style="${styleMap(this.styles.content)}" class="${o(this.classes.content)}"  @scroll="${this._scroll}" part="content"><slot></slot></div>${this._displayFooter ? block11$2.call(this, context, tags, suffix) : void 0}<span class="last-fe" data-ui5-focus-trap tabindex="0" @focusin=${this.forwardToFirst}></span></section>`;
}
function block8$3(context, tags, suffix) {
  return effectiveHtml`<header class="ui5-popup-header-root" id="ui5-popup-header" part="header">${this.header.length ? block9$2.call(this, context, tags, suffix) : block10$2.call(this, context, tags, suffix)}</header>`;
}
function block9$2(context, tags, suffix) {
  return effectiveHtml`<slot name="header"></slot>`;
}
function block10$2(context, tags, suffix) {
  return effectiveHtml`<h1 class="ui5-popup-header-text">${l(this.headerText)}</h1>`;
}
function block11$2(context, tags, suffix) {
  return effectiveHtml`${this.footer.length ? block12$1.call(this, context, tags, suffix) : void 0}`;
}
function block12$1(context, tags, suffix) {
  return effectiveHtml`<footer class="ui5-popup-footer-root" part="footer"><slot name="footer"></slot></footer>`;
}
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
function block0$c(context, tags, suffix) {
  return effectiveHtml`<section style="${styleMap(this.styles.root)}" class="${o(this.classes.root)}" role="${l(this._role)}" aria-modal="${l(this._ariaModal)}" aria-label="${l(this._ariaLabel)}" aria-labelledby="${l(this._ariaLabelledBy)}" @keydown=${this._onkeydown} @focusout=${this._onfocusout} @mouseup=${this._onmouseup} @mousedown=${this._onmousedown}><span class="first-fe" data-ui5-focus-trap tabindex="0" @focusin=${this.forwardToLast}></span><div style="${styleMap(this.styles.content)}" class="${o(this.classes.content)}"  @scroll="${this._scroll}" part="content"><slot></slot></div><span class="last-fe" data-ui5-focus-trap tabindex="0" @focusin=${this.forwardToFirst}></span></section> `;
}
function block0$b(context, tags, suffix) {
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
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$k);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$l);
const styleData$h = { packageName: "@ui5/webcomponents", fileName: "themes/Popup.css.ts", content: `:host{min-width:1px;display:none;position:fixed}
` };
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$k);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$l);
const styleData$g = { packageName: "@ui5/webcomponents", fileName: "themes/PopupStaticAreaStyles.css.ts", content: `.ui5-block-layer{display:none;position:fixed;background-color:var(--sapBlockLayer_Background);opacity:.6;inset:-500px;outline:none;pointer-events:all;z-index:-1}.ui5-block-layer:not([hidden]){display:inline-block}
` };
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$k);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$l);
const styleData$f = { packageName: "@ui5/webcomponents", fileName: "themes/PopupGlobal.css.ts", content: `.ui5-popup-scroll-blocker{overflow:hidden}
` };
var __decorate$d = function(decorators, target, key, desc) {
  var c2 = arguments.length, r = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i2 = decorators.length - 1; i2 >= 0; i2--)
      if (d = decorators[i2])
        r = (c2 < 3 ? d(r) : c2 > 3 ? d(target, key, r) : d(target, key)) || r;
  return c2 > 3 && r && Object.defineProperty(target, key, r), r;
};
var Popup_1;
const createBlockingStyle = () => {
  if (!hasStyle("data-ui5-popup-scroll-blocker")) {
    createStyle(styleData$f, "data-ui5-popup-scroll-blocker");
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
__decorate$d([
  property()
], Popup.prototype, "initialFocus", void 0);
__decorate$d([
  property({ type: Boolean })
], Popup.prototype, "preventFocusRestore", void 0);
__decorate$d([
  property({ type: Boolean })
], Popup.prototype, "open", void 0);
__decorate$d([
  property({ type: Boolean, noAttribute: true })
], Popup.prototype, "opened", void 0);
__decorate$d([
  property({ defaultValue: void 0 })
], Popup.prototype, "accessibleName", void 0);
__decorate$d([
  property({ defaultValue: "" })
], Popup.prototype, "accessibleNameRef", void 0);
__decorate$d([
  property({ type: PopupAccessibleRole$1, defaultValue: PopupAccessibleRole$1.Dialog })
], Popup.prototype, "accessibleRole", void 0);
__decorate$d([
  property()
], Popup.prototype, "mediaRange", void 0);
__decorate$d([
  property({ type: Boolean })
], Popup.prototype, "_disableInitialFocus", void 0);
__decorate$d([
  property({ type: Boolean })
], Popup.prototype, "_blockLayerHidden", void 0);
__decorate$d([
  property({ type: Boolean, noAttribute: true })
], Popup.prototype, "isTopModalPopup", void 0);
__decorate$d([
  slot({ type: HTMLElement, "default": true })
], Popup.prototype, "content", void 0);
Popup = Popup_1 = __decorate$d([
  customElement({
    renderer: litRender,
    styles: styleData$h,
    template: block0$c,
    staticAreaTemplate: block0$b,
    staticAreaStyles: styleData$g
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
function block0$a(context, tags, suffix) {
  return effectiveHtml`<section style="${styleMap(this.styles.root)}" class="${o(this.classes.root)}" role="${l(this._role)}" aria-modal="${l(this._ariaModal)}" aria-label="${l(this._ariaLabel)}" aria-labelledby="${l(this._ariaLabelledBy)}" @keydown=${this._onkeydown} @focusout=${this._onfocusout} @mouseup=${this._onmouseup} @mousedown=${this._onmousedown}><span class="first-fe" data-ui5-focus-trap tabindex="0" @focusin=${this.forwardToLast}></span><span class="ui5-popover-arrow" style="${styleMap(this.styles.arrow)}"></span>${this._displayHeader ? block1$a.call(this, context, tags, suffix) : void 0}<div style="${styleMap(this.styles.content)}" class="${o(this.classes.content)}"  @scroll="${this._scroll}" part="content"><slot></slot></div>${this._displayFooter ? block4$5.call(this, context, tags, suffix) : void 0}<span class="last-fe" data-ui5-focus-trap tabindex="0" @focusin=${this.forwardToFirst}></span></section> `;
}
function block1$a(context, tags, suffix) {
  return effectiveHtml`<header class="ui5-popup-header-root" id="ui5-popup-header" part="header">${this.header.length ? block2$9.call(this, context, tags, suffix) : block3$7.call(this, context, tags, suffix)}</header>`;
}
function block2$9(context, tags, suffix) {
  return effectiveHtml`<slot name="header"></slot>`;
}
function block3$7(context, tags, suffix) {
  return effectiveHtml`<h1 class="ui5-popup-header-text">${l(this.headerText)}</h1>`;
}
function block4$5(context, tags, suffix) {
  return effectiveHtml`${this.footer.length ? block5$4.call(this, context, tags, suffix) : void 0}`;
}
function block5$4(context, tags, suffix) {
  return effectiveHtml`<footer class="ui5-popup-footer-root" part="footer"><slot name="footer"></slot></footer>`;
}
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$k);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$l);
const styleData$e = { packageName: "@ui5/webcomponents", fileName: "themes/BrowserScrollbar.css.ts", content: `:not(.ui5-content-native-scrollbars) ::-webkit-scrollbar:horizontal{height:var(--sapScrollBar_Dimension)}:not(.ui5-content-native-scrollbars) ::-webkit-scrollbar:vertical{width:var(--sapScrollBar_Dimension)}:not(.ui5-content-native-scrollbars) ::-webkit-scrollbar{background-color:var(--sapScrollBar_TrackColor);border-left:var(--browser_scrollbar_border)}:not(.ui5-content-native-scrollbars) ::-webkit-scrollbar-thumb{border-radius:var(--browser_scrollbar_border_radius);background-color:var(--sapScrollBar_FaceColor)}:not(.ui5-content-native-scrollbars) ::-webkit-scrollbar-thumb:hover{background-color:var(--sapScrollBar_Hover_FaceColor)}:not(.ui5-content-native-scrollbars) ::-webkit-scrollbar-corner{background-color:var(--sapScrollBar_TrackColor)}
` };
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$k);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$l);
const styleData$d = { packageName: "@ui5/webcomponents", fileName: "themes/PopupsCommon.css.ts", content: `:host{display:none;position:fixed;background:var(--sapGroup_ContentBackground);border-radius:var(--_ui5-v1-21-2_popup_border_radius);min-height:2rem;box-sizing:border-box}.ui5-popup-root{background:inherit;border-radius:inherit;width:100%;height:100%;box-sizing:border-box;display:flex;flex-direction:column;overflow:hidden;outline:none}.ui5-popup-root .ui5-popup-header-root{color:var(--sapPageHeader_TextColor);box-shadow:var(--_ui5-v1-21-2_popup_header_shadow);border-bottom:var(--_ui5-v1-21-2_popup_header_border)}.ui5-popup-content{color:var(--sapTextColor)}.ui5-popup-footer-root{background:var(--sapPageFooter_Background);border-top:1px solid var(--sapPageFooter_BorderColor);color:var(--sapPageFooter_TextColor)}.ui5-popup-header-root,.ui5-popup-footer-root,:host([header-text]) .ui5-popup-header-text{margin:0;font-size:1rem;font-family:"72override",var(--_ui5-v1-21-2_popup_header_font_family);display:flex;justify-content:center;align-items:center}.ui5-popup-header-root .ui5-popup-header-text{font-weight:var(--_ui5-v1-21-2_popup_header_font_weight)}.ui5-popup-content{overflow:auto;box-sizing:border-box}:host([header-text]) .ui5-popup-header-text{text-align:center;min-height:var(--_ui5-v1-21-2_popup_default_header_height);max-height:var(--_ui5-v1-21-2_popup_default_header_height);line-height:var(--_ui5-v1-21-2_popup_default_header_height);text-overflow:ellipsis;overflow:hidden;white-space:nowrap;max-width:100%;display:inline-block}:host([header-text]) .ui5-popup-header-root{justify-content:var(--_ui5-v1-21-2_popup_header_prop_header_text_alignment)}:host(:not([header-text])) .ui5-popup-header-text{display:none}:host([disable-scrolling]) .ui5-popup-content{overflow:hidden}:host([media-range="S"]) .ui5-popup-content{padding:1rem var(--_ui5-v1-21-2_popup_content_padding_s)}:host([media-range="M"]) .ui5-popup-content,:host([media-range="L"]) .ui5-popup-content{padding:1rem var(--_ui5-v1-21-2_popup_content_padding_m_l)}:host([media-range="XL"]) .ui5-popup-content{padding:1rem var(--_ui5-v1-21-2_popup_content_padding_xl)}.ui5-popup-header-root{background:var(--_ui5-v1-21-2_popup_header_background)}:host([media-range="S"]) .ui5-popup-header-root,:host([media-range="S"]) .ui5-popup-footer-root{padding-left:var(--_ui5-v1-21-2_popup_header_footer_padding_s);padding-right:var(--_ui5-v1-21-2_popup_header_footer_padding_s)}:host([media-range="M"]) .ui5-popup-header-root,:host([media-range="L"]) .ui5-popup-header-root,:host([media-range="M"]) .ui5-popup-footer-root,:host([media-range="L"]) .ui5-popup-footer-root{padding-left:var(--_ui5-v1-21-2_popup_header_footer_padding_m_l);padding-right:var(--_ui5-v1-21-2_popup_header_footer_padding_m_l)}:host([media-range="XL"]) .ui5-popup-header-root,:host([media-range="XL"]) .ui5-popup-footer-root{padding-left:var(--_ui5-v1-21-2_popup_header_footer_padding_xl);padding-right:var(--_ui5-v1-21-2_popup_header_footer_padding_xl)}
` };
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$k);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$l);
const styleData$c = { packageName: "@ui5/webcomponents", fileName: "themes/Popover.css.ts", content: `:host{box-shadow:var(--_ui5-v1-21-2_popover_box_shadow);background-color:var(--_ui5-v1-21-2_popover_background);max-width:calc(100vw - (100vw - 100%) - 2 * var(--_ui5-v1-21-2_popup_viewport_margin))}:host([hide-arrow]){box-shadow:var(--_ui5-v1-21-2_popover_no_arrow_box_shadow)}:host([opened][actual-placement-type="Top"]){margin-top:var(--_ui5-v1-21-2-popover-margin-bottom)}:host([opened][actual-placement-type="Bottom"]){margin-top:var(--_ui5-v1-21-2-popover-margin-top)}:host([actual-placement-type="Bottom"]) .ui5-popover-arrow{left:calc(50% - .5625rem);top:-.5rem;height:.5625rem}:host([actual-placement-type="Bottom"]) .ui5-popover-arrow:after{margin:var(--_ui5-v1-21-2_popover_upward_arrow_margin)}:host([actual-placement-type="Left"]) .ui5-popover-arrow{top:calc(50% - .5625rem);right:-.5625rem;width:.5625rem}:host([actual-placement-type="Left"]) .ui5-popover-arrow:after{margin:var(--_ui5-v1-21-2_popover_right_arrow_margin)}:host([actual-placement-type="Top"]) .ui5-popover-arrow{left:calc(50% - .5625rem);height:.5625rem;top:100%}:host([actual-placement-type="Top"]) .ui5-popover-arrow:after{margin:var(--_ui5-v1-21-2_popover_downward_arrow_margin)}:host(:not([actual-placement-type])) .ui5-popover-arrow,:host([actual-placement-type="Right"]) .ui5-popover-arrow{left:-.5625rem;top:calc(50% - .5625rem);width:.5625rem;height:1rem}:host(:not([actual-placement-type])) .ui5-popover-arrow:after,:host([actual-placement-type="Right"]) .ui5-popover-arrow:after{margin:var(--_ui5-v1-21-2_popover_left_arrow_margin)}:host([hide-arrow]) .ui5-popover-arrow{display:none}.ui5-popover-root{min-width:6.25rem}.ui5-popover-arrow{pointer-events:none;display:block;width:1rem;height:1rem;position:absolute;overflow:hidden}.ui5-popover-arrow:after{content:"";display:block;width:.7rem;height:.7rem;background-color:var(--_ui5-v1-21-2_popover_background);box-shadow:var(--_ui5-v1-21-2_popover_box_shadow);transform:rotate(-45deg)}
` };
var __decorate$c = function(decorators, target, key, desc) {
  var c2 = arguments.length, r = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i2 = decorators.length - 1; i2 >= 0; i2--)
      if (d = decorators[i2])
        r = (c2 < 3 ? d(r) : c2 > 3 ? d(target, key, r) : d(target, key)) || r;
  return c2 > 3 && r && Object.defineProperty(target, key, r), r;
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
__decorate$c([
  property()
], Popover.prototype, "headerText", void 0);
__decorate$c([
  property({ type: PopoverPlacementType$1, defaultValue: PopoverPlacementType$1.Right })
], Popover.prototype, "placementType", void 0);
__decorate$c([
  property({ type: PopoverHorizontalAlign$1, defaultValue: PopoverHorizontalAlign$1.Center })
], Popover.prototype, "horizontalAlign", void 0);
__decorate$c([
  property({ type: PopoverVerticalAlign$1, defaultValue: PopoverVerticalAlign$1.Center })
], Popover.prototype, "verticalAlign", void 0);
__decorate$c([
  property({ type: Boolean })
], Popover.prototype, "modal", void 0);
__decorate$c([
  property({ type: Boolean })
], Popover.prototype, "hideBackdrop", void 0);
__decorate$c([
  property({ type: Boolean })
], Popover.prototype, "hideArrow", void 0);
__decorate$c([
  property({ type: Boolean })
], Popover.prototype, "allowTargetOverlap", void 0);
__decorate$c([
  property({ validator: DOMReference })
], Popover.prototype, "opener", void 0);
__decorate$c([
  property({ type: Boolean })
], Popover.prototype, "disableScrolling", void 0);
__decorate$c([
  property({ validator: Integer, defaultValue: 0, noAttribute: true })
], Popover.prototype, "arrowTranslateX", void 0);
__decorate$c([
  property({ validator: Integer, defaultValue: 0, noAttribute: true })
], Popover.prototype, "arrowTranslateY", void 0);
__decorate$c([
  property({ type: PopoverPlacementType$1, defaultValue: PopoverPlacementType$1.Right })
], Popover.prototype, "actualPlacementType", void 0);
__decorate$c([
  property({ validator: Integer, noAttribute: true })
], Popover.prototype, "_maxHeight", void 0);
__decorate$c([
  property({ validator: Integer, noAttribute: true })
], Popover.prototype, "_maxWidth", void 0);
__decorate$c([
  slot({ type: HTMLElement })
], Popover.prototype, "header", void 0);
__decorate$c([
  slot({ type: HTMLElement })
], Popover.prototype, "footer", void 0);
Popover = Popover_1 = __decorate$c([
  customElement({
    tag: "ui5-popover",
    styles: [
      styleData$e,
      styleData$d,
      styleData$c
    ],
    template: block0$a
  })
], Popover);
const instanceOfPopover = (object) => {
  return "showAt" in object;
};
Popover.define();
const Popover$1 = Popover;
var ValueState;
(function(ValueState2) {
  ValueState2["None"] = "None";
  ValueState2["Success"] = "Success";
  ValueState2["Warning"] = "Warning";
  ValueState2["Error"] = "Error";
  ValueState2["Information"] = "Information";
})(ValueState || (ValueState = {}));
const ValueState$1 = ValueState;
const name$l = "resize-corner";
const pathData$l = "M384 224v32q0 12-10 22L182 470q-10 10-22 10h-32zM224 480l160-160v32q0 12-10 22l-96 96q-10 10-22 10h-32zm160-64v32q0 12-10 22t-22 10h-32z";
const ltr$l = false;
const collection$l = "SAP-icons-v4";
const packageName$l = "@ui5/webcomponents-icons";
registerIcon(name$l, { pathData: pathData$l, ltr: ltr$l, collection: collection$l, packageName: packageName$l });
const name$k = "resize-corner";
const pathData$k = "M202 512q-11 0-18.5-7.5T176 486q0-10 8-18l204-205q7-7 18-7t18.5 7.5T432 282t-7 18L220 505q-7 7-18 7zm128 0q-11 0-18.5-7.5T304 486q0-10 8-18l76-77q7-7 18-7t18.5 7.5T432 410t-7 18l-77 77q-7 7-18 7z";
const ltr$k = false;
const collection$k = "SAP-icons-v5";
const packageName$k = "@ui5/webcomponents-icons";
registerIcon(name$k, { pathData: pathData$k, ltr: ltr$k, collection: collection$k, packageName: packageName$k });
isLegacyThemeFamily() ? pathData$l : pathData$k;
const ICON_DECLINE = { key: "ICON_DECLINE", defaultText: "Decline" };
const ICON_ERROR = { key: "ICON_ERROR", defaultText: "Error" };
const name$j = "error";
const pathData$j = "M512 256q0 53-20.5 100t-55 81.5-81 54.5-99.5 20-100-20.5-81.5-55T20 355 0 256q0-54 20-100.5t55-81T156.5 20 256 0t99.5 20T437 75t55 81.5 20 99.5zM399 364q6-6 0-12l-86-86q-6-6 0-12l81-81q6-6 0-12l-37-37q-2-2-6-2t-6 2l-83 82q-1 3-6 3-3 0-6-3l-84-83q-1-2-6-2-4 0-6 2l-37 37q-6 6 0 12l83 82q6 6 0 12l-83 82q-2 2-2.5 6t2.5 6l36 37q4 2 6 2 4 0 6-2l85-84q2-2 6-2t6 2l88 88q4 2 6 2t6-2z";
const ltr$j = false;
const accData$3 = ICON_ERROR;
const collection$j = "SAP-icons-v4";
const packageName$j = "@ui5/webcomponents-icons";
registerIcon(name$j, { pathData: pathData$j, ltr: ltr$j, accData: accData$3, collection: collection$j, packageName: packageName$j });
const name$i = "error";
const pathData$i = "M256 0q53 0 99.5 20T437 75t55 81.5 20 99.5-20 99.5-55 81.5-81.5 55-99.5 20-99.5-20T75 437t-55-81.5T0 256t20-99.5T75 75t81.5-55T256 0zm45 256l74-73q9-11 9-23 0-13-9.5-22.5T352 128q-12 0-23 9l-73 74-73-74q-10-9-23-9t-22.5 9.5T128 160q0 12 9 23l74 73-74 73q-9 10-9 23t9.5 22.5T160 384t23-9l73-74 73 74q11 9 23 9 13 0 22.5-9.5T384 352t-9-23z";
const ltr$i = false;
const accData$2 = ICON_ERROR;
const collection$i = "SAP-icons-v5";
const packageName$i = "@ui5/webcomponents-icons";
registerIcon(name$i, { pathData: pathData$i, ltr: ltr$i, accData: accData$2, collection: collection$i, packageName: packageName$i });
isLegacyThemeFamily() ? pathData$j : pathData$i;
const name$h = "alert";
const pathData$h = "M501 374q5 10 7.5 19.5T512 412v5q0 31-23 47t-50 16H74q-13 0-26-4t-23.5-12-17-20T0 417q0-13 4-22.5t9-20.5L198 38q21-38 61-38 38 0 59 38zM257 127q-13 0-23.5 8T223 161q1 7 2 12 3 25 4.5 48t3.5 61q0 11 7.5 16t16.5 5q22 0 23-21l2-36 9-85q0-18-10.5-26t-23.5-8zm0 299q20 0 31.5-12t11.5-32q0-19-11.5-31T257 339t-31.5 12-11.5 31q0 20 11.5 32t31.5 12z";
const ltr$h = false;
const collection$h = "SAP-icons-v4";
const packageName$h = "@ui5/webcomponents-icons";
registerIcon(name$h, { pathData: pathData$h, ltr: ltr$h, collection: collection$h, packageName: packageName$h });
const name$g = "alert";
const pathData$g = "M505 399q7 13 7 27 0 21-15.5 37.5T456 480H56q-25 0-40.5-16.5T0 426q0-14 7-27L208 59q17-27 48-27 14 0 27 6.5T304 59zM288 176q0-14-9-23t-23-9-23 9-9 23v96q0 14 9 23t23 9 23-9 9-23v-96zm-32 240q14 0 23-9t9-23-9-23-23-9-23 9-9 23 9 23 23 9z";
const ltr$g = false;
const collection$g = "SAP-icons-v5";
const packageName$g = "@ui5/webcomponents-icons";
registerIcon(name$g, { pathData: pathData$g, ltr: ltr$g, collection: collection$g, packageName: packageName$g });
isLegacyThemeFamily() ? pathData$h : pathData$g;
const name$f = "sys-enter-2";
const pathData$f = "M512 256q0 54-20 100.5t-54.5 81T356 492t-100 20q-54 0-100.5-20t-81-55T20 355.5 0 256t20.5-100 55-81.5T157 20t99-20q53 0 100 20t81.5 54.5T492 156t20 100zm-118-87q4-8-1-13l-36-36q-3-4-8-4t-8 5L237 294q-3 1-4 0l-70-52q-4-3-7-3t-4.5 2-2.5 3l-29 41q-6 8 2 14l113 95q2 2 7 2t8-4z";
const ltr$f = true;
const collection$f = "SAP-icons-v4";
const packageName$f = "@ui5/webcomponents-icons";
registerIcon(name$f, { pathData: pathData$f, ltr: ltr$f, collection: collection$f, packageName: packageName$f });
const name$e = "sys-enter-2";
const pathData$e = "M256 0q53 0 100 20t81.5 54.5T492 156t20 100-20 100-54.5 81.5T356 492t-100 20-100-20-81.5-54.5T20 356 0 256t20-100 54.5-81.5T156 20 256 0zm150 183q10-9 10-23 0-13-9.5-22.5T384 128t-22 9L186 308l-68-63q-9-9-22-9t-22.5 9.5T64 268q0 15 10 24l91 83q9 9 21 9 13 0 23-9z";
const ltr$e = true;
const collection$e = "SAP-icons-v5";
const packageName$e = "@ui5/webcomponents-icons";
registerIcon(name$e, { pathData: pathData$e, ltr: ltr$e, collection: collection$e, packageName: packageName$e });
isLegacyThemeFamily() ? pathData$f : pathData$e;
const name$d = "information";
const pathData$d = "M0 256q0-53 20.5-100t55-81.5T157 20t99-20q54 0 100.5 20t81 55 54.5 81.5 20 99.5q0 54-20 100.5t-54.5 81T356 492t-100 20q-54 0-100.5-20t-81-55T20 355.5 0 256zm192 112v33h128v-33h-32V215q0-6-7-6h-88v31h32v128h-33zm34-201q14 11 30 11 17 0 29.5-11.5T298 138q0-19-13-31-12-12-29-12-19 0-30.5 12.5T214 138q0 17 12 29z";
const ltr$d = false;
const collection$d = "SAP-icons-v4";
const packageName$d = "@ui5/webcomponents-icons";
registerIcon(name$d, { pathData: pathData$d, ltr: ltr$d, collection: collection$d, packageName: packageName$d });
const name$c = "information";
const pathData$c = "M256 0q53 0 99.5 20T437 75t55 81.5 20 99.5-20 99.5-55 81.5-81.5 55-99.5 20-99.5-20T75 437t-55-81.5T0 256t20-99.5T75 75t81.5-55T256 0zm0 160q14 0 23-9t9-23-9-23-23-9-23 9-9 23 9 23 23 9zm32 64q0-14-9-23t-23-9-23 9-9 23v160q0 14 9 23t23 9 23-9 9-23V224z";
const ltr$c = false;
const collection$c = "SAP-icons-v5";
const packageName$c = "@ui5/webcomponents-icons";
registerIcon(name$c, { pathData: pathData$c, ltr: ltr$c, collection: collection$c, packageName: packageName$c });
isLegacyThemeFamily() ? pathData$d : pathData$c;
function block0$9(context, tags, suffix) {
  return effectiveHtml`<section style="${styleMap(this.styles.root)}" class="${o(this.classes.root)}" role="${l(this._role)}" aria-modal="${l(this._ariaModal)}" aria-label="${l(this._ariaLabel)}" aria-labelledby="${l(this._ariaLabelledBy)}" @keydown=${this._onkeydown} @focusout=${this._onfocusout} @mouseup=${this._onmouseup} @mousedown=${this._onmousedown}><span class="first-fe" data-ui5-focus-trap tabindex="0" @focusin=${this.forwardToLast}></span>${this._displayHeader ? block1$9.call(this, context, tags, suffix) : void 0}<div style="${styleMap(this.styles.content)}" class="${o(this.classes.content)}"  @scroll="${this._scroll}" part="content"><slot></slot></div>${this.footer.length ? block10$1.call(this, context, tags, suffix) : void 0}${this._showResizeHandle ? block11$1.call(this, context, tags, suffix) : void 0}<span class="last-fe" data-ui5-focus-trap tabindex="0" @focusin=${this.forwardToFirst}></span></section> `;
}
function block1$9(context, tags, suffix) {
  return effectiveHtml`<header><div class="ui5-popup-header-root" id="ui5-popup-header" role="group" aria-describedby=${l(this.effectiveAriaDescribedBy)} aria-roledescription=${l(this.ariaRoleDescriptionHeaderText)} tabindex="${l(this._headerTabIndex)}" @keydown="${this._onDragOrResizeKeyDown}" @mousedown="${this._onDragMouseDown}" part="header" state="${l(this.state)}">${this.hasValueState ? block2$8.call(this, context, tags, suffix) : void 0}${this.header.length ? block3$6.call(this, context, tags, suffix) : block4$4.call(this, context, tags, suffix)}${this.resizable ? block5$3.call(this, context, tags, suffix) : block8$2.call(this, context, tags, suffix)}</div></header>`;
}
function block2$8(context, tags, suffix) {
  return suffix ? effectiveHtml`<${scopeTag("ui5-icon", tags, suffix)} class="ui5-dialog-value-state-icon" name="${l(this._dialogStateIcon)}"></${scopeTag("ui5-icon", tags, suffix)}>` : effectiveHtml`<ui5-icon class="ui5-dialog-value-state-icon" name="${l(this._dialogStateIcon)}"></ui5-icon>`;
}
function block3$6(context, tags, suffix) {
  return effectiveHtml`<slot name="header"></slot>`;
}
function block4$4(context, tags, suffix) {
  return effectiveHtml`<h1 id="ui5-popup-header-text" class="ui5-popup-header-text">${l(this.headerText)}</h1>`;
}
function block5$3(context, tags, suffix) {
  return effectiveHtml`${this.draggable ? block6$3.call(this, context, tags, suffix) : block7$2.call(this, context, tags, suffix)}`;
}
function block6$3(context, tags, suffix) {
  return effectiveHtml`<span id="${l(this._id)}-descr" aria-hidden="true" class="ui5-hidden-text">${l(this.ariaDescribedByHeaderTextDraggableAndResizable)}</span>`;
}
function block7$2(context, tags, suffix) {
  return effectiveHtml`<span id="${l(this._id)}-descr" aria-hidden="true" class="ui5-hidden-text">${l(this.ariaDescribedByHeaderTextResizable)}</span>`;
}
function block8$2(context, tags, suffix) {
  return effectiveHtml`${this.draggable ? block9$1.call(this, context, tags, suffix) : void 0}`;
}
function block9$1(context, tags, suffix) {
  return effectiveHtml`<span id="${l(this._id)}-descr" aria-hidden="true" class="ui5-hidden-text">${l(this.ariaDescribedByHeaderTextDraggable)}</span>`;
}
function block10$1(context, tags, suffix) {
  return effectiveHtml`<footer class="ui5-popup-footer-root" part="footer"><slot name="footer"></slot></footer>`;
}
function block11$1(context, tags, suffix) {
  return suffix ? effectiveHtml`<${scopeTag("ui5-icon", tags, suffix)} name="resize-corner" class="ui5-popup-resize-handle" @mousedown="${this._onResizeMouseDown}"></${scopeTag("ui5-icon", tags, suffix)}>` : effectiveHtml`<ui5-icon name="resize-corner" class="ui5-popup-resize-handle" @mousedown="${this._onResizeMouseDown}"></ui5-icon>`;
}
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$k);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$l);
const styleData$b = { packageName: "@ui5/webcomponents", fileName: "themes/Dialog.css.ts", content: `.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host{min-width:20rem;min-height:6rem;max-height:94%;max-width:90%;flex-direction:column;box-shadow:var(--sapContent_Shadow3);border-radius:var(--sapElement_BorderCornerRadius)}:host([stretch]){width:90%;height:94%}:host([stretch][on-phone]){width:100%;height:100%;max-height:100%;max-width:100%;border-radius:0}:host([draggable]) .ui5-popup-header-root,:host([draggable]) ::slotted([slot="header"]){cursor:move}:host([draggable]) .ui5-popup-header-root *{cursor:auto}:host([draggable]) .ui5-popup-root{user-select:text}.ui5-popup-root{display:flex;flex-direction:column;max-width:100vw}.ui5-popup-header-root{position:relative}.ui5-popup-header-root:before{content:"";position:absolute;inset-block-start:auto;inset-block-end:0;inset-inline-start:0;inset-inline-end:0;height:var(--_ui5-v1-21-2_dialog_header_state_line_height);background:var(--sapObjectHeader_BorderColor)}:host([state="Error"]) .ui5-popup-header-root:before{background:var(--sapErrorBorderColor)}:host([state="Information"]) .ui5-popup-header-root:before{background:var(--sapInformationBorderColor)}:host([state="Success"]) .ui5-popup-header-root:before{background:var(--sapSuccessBorderColor)}:host([state="Warning"]) .ui5-popup-header-root:before{background:var(--sapWarningBorderColor)}.ui5-dialog-value-state-icon{margin-inline-end:.5rem}:host([state="Error"]) .ui5-dialog-value-state-icon{color:var(--_ui5-v1-21-2_dialog_header_error_state_icon_color)}:host([state="Information"]) .ui5-dialog-value-state-icon{color:var(--_ui5-v1-21-2_dialog_header_information_state_icon_color)}:host([state="Success"]) .ui5-dialog-value-state-icon{color:var(--_ui5-v1-21-2_dialog_header_success_state_icon_color)}:host([state="Warning"]) .ui5-dialog-value-state-icon{color:var(--_ui5-v1-21-2_dialog_header_warning_state_icon_color)}.ui5-popup-header-root{outline:none}.ui5-popup-header-root:focus:after{content:"";position:absolute;left:var(--_ui5-v1-21-2_dialog_header_focus_left_offset);bottom:var(--_ui5-v1-21-2_dialog_header_focus_bottom_offset);right:var(--_ui5-v1-21-2_dialog_header_focus_right_offset);top:var(--_ui5-v1-21-2_dialog_header_focus_top_offset);border:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);border-radius:var(--_ui5-v1-21-2_dialog_header_border_radius) var(--_ui5-v1-21-2_dialog_header_border_radius) 0 0;pointer-events:none}:host([stretch]) .ui5-popup-content{width:100%;height:100%}.ui5-popup-content{min-height:var(--_ui5-v1-21-2_dialog_content_min_height);flex:1 1 auto}.ui5-popup-resize-handle{position:absolute;bottom:var(--_ui5-v1-21-2_dialog_resize_handle_bottom);inset-inline-end:var(--_ui5-v1-21-2_dialog_resize_handle_right);cursor:var(--_ui5-v1-21-2_dialog_resize_cursor);color:var(--_ui5-v1-21-2_dialog_resize_handle_color)}::slotted([slot="footer"]){height:var(--_ui5-v1-21-2_dialog_footer_height)}::slotted([slot="footer"][ui5-bar][design="Footer"]){border-top:none}::slotted([slot="header"][ui5-bar]){box-shadow:none}
` };
var __decorate$b = function(decorators, target, key, desc) {
  var c2 = arguments.length, r = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i2 = decorators.length - 1; i2 >= 0; i2--)
      if (d = decorators[i2])
        r = (c2 < 3 ? d(r) : c2 > 3 ? d(target, key, r) : d(target, key)) || r;
  return c2 > 3 && r && Object.defineProperty(target, key, r), r;
};
var Dialog_1;
const STEP_SIZE = 16;
const ICON_PER_STATE = {
  [ValueState$1.Error]: "error",
  [ValueState$1.Warning]: "alert",
  [ValueState$1.Success]: "sys-enter-2",
  [ValueState$1.Information]: "information"
};
let Dialog = Dialog_1 = class Dialog2 extends Popup$1 {
  constructor() {
    super();
    this._draggedOrResized = false;
    this._revertSize = () => {
      Object.assign(this.style, {
        top: "",
        left: "",
        width: "",
        height: ""
      });
    };
    this._screenResizeHandler = this._screenResize.bind(this);
    this._dragMouseMoveHandler = this._onDragMouseMove.bind(this);
    this._dragMouseUpHandler = this._onDragMouseUp.bind(this);
    this._resizeMouseMoveHandler = this._onResizeMouseMove.bind(this);
    this._resizeMouseUpHandler = this._onResizeMouseUp.bind(this);
    this._dragStartHandler = this._handleDragStart.bind(this);
  }
  static async onDefine() {
    Dialog_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
  }
  static _isHeader(element) {
    return element.classList.contains("ui5-popup-header-root") || element.getAttribute("slot") === "header";
  }
  /**
   * Shows the dialog.
   *
   * @param {boolean} [preventInitialFocus=false] Prevents applying the focus inside the popup
   * @public
   * @method
   * @name sap.ui.webc.main.Dialog#show
   * @async
   * @returns {Promise} Resolves when the dialog is open
   */
  async show(preventInitialFocus = false) {
    await super._open(preventInitialFocus);
  }
  get isModal() {
    return true;
  }
  get shouldHideBackdrop() {
    return false;
  }
  get _ariaLabelledBy() {
    let ariaLabelledById;
    if (this.headerText !== "" && !this._ariaLabel) {
      ariaLabelledById = "ui5-popup-header-text";
    }
    return ariaLabelledById;
  }
  get ariaRoleDescriptionHeaderText() {
    return this.resizable || this.draggable ? Dialog_1.i18nBundle.getText(DIALOG_HEADER_ARIA_ROLE_DESCRIPTION) : void 0;
  }
  get effectiveAriaDescribedBy() {
    return this.resizable || this.draggable ? `${this._id}-descr` : void 0;
  }
  get ariaDescribedByHeaderTextResizable() {
    return Dialog_1.i18nBundle.getText(DIALOG_HEADER_ARIA_DESCRIBEDBY_RESIZABLE);
  }
  get ariaDescribedByHeaderTextDraggable() {
    return Dialog_1.i18nBundle.getText(DIALOG_HEADER_ARIA_DESCRIBEDBY_DRAGGABLE);
  }
  get ariaDescribedByHeaderTextDraggableAndResizable() {
    return Dialog_1.i18nBundle.getText(DIALOG_HEADER_ARIA_DESCRIBEDBY_DRAGGABLE_RESIZABLE);
  }
  get _displayProp() {
    return "flex";
  }
  /**
   * Determines if the header should be shown.
   */
  get _displayHeader() {
    return this.header.length || this.headerText || this.draggable || this.resizable;
  }
  get _movable() {
    return !this.stretch && this.onDesktop && (this.draggable || this.resizable);
  }
  get _headerTabIndex() {
    return this._movable ? "0" : void 0;
  }
  get _showResizeHandle() {
    return this.resizable && this.onDesktop;
  }
  get _minHeight() {
    let minHeight = Number.parseInt(window.getComputedStyle(this.contentDOM).minHeight);
    const header = this._root.querySelector(".ui5-popup-header-root");
    if (header) {
      minHeight += header.offsetHeight;
    }
    const footer = this._root.querySelector(".ui5-popup-footer-root");
    if (footer) {
      minHeight += footer.offsetHeight;
    }
    return minHeight;
  }
  get hasValueState() {
    return this.state !== ValueState$1.None;
  }
  get _dialogStateIcon() {
    return ICON_PER_STATE[this.state];
  }
  get _role() {
    if (this.accessibleRole === PopupAccessibleRole$1.None) {
      return void 0;
    }
    if (this.state === ValueState$1.Error || this.state === ValueState$1.Warning) {
      return PopupAccessibleRole$1.AlertDialog.toLowerCase();
    }
    return this.accessibleRole.toLowerCase();
  }
  _show() {
    super._show();
    this._center();
  }
  onBeforeRendering() {
    super.onBeforeRendering();
    this._isRTL = this.effectiveDir === "rtl";
    this.onPhone = isPhone();
    this.onDesktop = isDesktop();
  }
  onAfterRendering() {
    super.onAfterRendering();
    if (!this.isOpen() && this.open) {
      this.show();
    } else if (this.isOpen() && !this.open) {
      this.close();
    }
  }
  onEnterDOM() {
    super.onEnterDOM();
    this._attachScreenResizeHandler();
    this.addEventListener("dragstart", this._dragStartHandler);
  }
  onExitDOM() {
    super.onExitDOM();
    this._detachScreenResizeHandler();
    this.removeEventListener("dragstart", this._dragStartHandler);
  }
  /**
   * @override
   */
  _resize() {
    super._resize();
    if (!this._draggedOrResized) {
      this._center();
    }
  }
  _screenResize() {
    this._center();
  }
  _attachScreenResizeHandler() {
    if (!this._screenResizeHandlerAttached) {
      window.addEventListener("resize", this._screenResizeHandler);
      this._screenResizeHandlerAttached = true;
    }
  }
  _detachScreenResizeHandler() {
    if (this._screenResizeHandlerAttached) {
      window.removeEventListener("resize", this._screenResizeHandler);
      this._screenResizeHandlerAttached = false;
    }
  }
  _center() {
    const height = window.innerHeight - this.offsetHeight, width = window.innerWidth - this.offsetWidth;
    Object.assign(this.style, {
      top: `${Math.round(height / 2)}px`,
      left: `${Math.round(width / 2)}px`
    });
  }
  /**
   * Event handlers
   */
  _onDragMouseDown(e2) {
    if (!this._movable || !this.draggable || !Dialog_1._isHeader(e2.target)) {
      return;
    }
    e2.preventDefault();
    const { top, left } = this.getBoundingClientRect();
    const { width, height } = window.getComputedStyle(this);
    Object.assign(this.style, {
      top: `${top}px`,
      left: `${left}px`,
      width: `${Math.round(Number.parseFloat(width) * 100) / 100}px`,
      height: `${Math.round(Number.parseFloat(height) * 100) / 100}px`
    });
    this._x = e2.clientX;
    this._y = e2.clientY;
    this._draggedOrResized = true;
    this._attachMouseDragHandlers();
  }
  _onDragMouseMove(e2) {
    e2.preventDefault();
    const { clientX, clientY } = e2;
    const calcX = this._x - clientX;
    const calcY = this._y - clientY;
    const { left, top } = this.getBoundingClientRect();
    Object.assign(this.style, {
      left: `${Math.floor(left - calcX)}px`,
      top: `${Math.floor(top - calcY)}px`
    });
    this._x = clientX;
    this._y = clientY;
  }
  _onDragMouseUp() {
    delete this._x;
    delete this._y;
    this._detachMouseDragHandlers();
  }
  _onDragOrResizeKeyDown(e2) {
    if (!this._movable || !Dialog_1._isHeader(e2.target)) {
      return;
    }
    if (this.draggable && [isUp, isDown, isLeft, isRight].some((key) => key(e2))) {
      this._dragWithEvent(e2);
      return;
    }
    if (this.resizable && [isUpShift, isDownShift, isLeftShift, isRightShift].some((key) => key(e2))) {
      this._resizeWithEvent(e2);
    }
  }
  _dragWithEvent(e2) {
    const { top, left, width, height } = this.getBoundingClientRect();
    let newPos = 0;
    let posDirection = "top";
    switch (true) {
      case isUp(e2):
        newPos = top - STEP_SIZE;
        posDirection = "top";
        break;
      case isDown(e2):
        newPos = top + STEP_SIZE;
        posDirection = "top";
        break;
      case isLeft(e2):
        newPos = left - STEP_SIZE;
        posDirection = "left";
        break;
      case isRight(e2):
        newPos = left + STEP_SIZE;
        posDirection = "left";
        break;
    }
    newPos = clamp(newPos, 0, posDirection === "left" ? window.innerWidth - width : window.innerHeight - height);
    this.style[posDirection] = `${newPos}px`;
  }
  _resizeWithEvent(e2) {
    this._draggedOrResized = true;
    this.addEventListener("ui5-before-close", this._revertSize, { once: true });
    const { top, left } = this.getBoundingClientRect(), style = window.getComputedStyle(this), minWidth = Number.parseFloat(style.minWidth), maxWidth = window.innerWidth - left, maxHeight = window.innerHeight - top;
    let width = Number.parseFloat(style.width), height = Number.parseFloat(style.height);
    switch (true) {
      case isUpShift(e2):
        height -= STEP_SIZE;
        break;
      case isDownShift(e2):
        height += STEP_SIZE;
        break;
      case isLeftShift(e2):
        width -= STEP_SIZE;
        break;
      case isRightShift(e2):
        width += STEP_SIZE;
        break;
    }
    width = clamp(width, minWidth, maxWidth);
    height = clamp(height, this._minHeight, maxHeight);
    Object.assign(this.style, {
      width: `${width}px`,
      height: `${height}px`
    });
  }
  _attachMouseDragHandlers() {
    window.addEventListener("mousemove", this._dragMouseMoveHandler);
    window.addEventListener("mouseup", this._dragMouseUpHandler);
  }
  _detachMouseDragHandlers() {
    window.removeEventListener("mousemove", this._dragMouseMoveHandler);
    window.removeEventListener("mouseup", this._dragMouseUpHandler);
  }
  _onResizeMouseDown(e2) {
    if (!this._movable || !this.resizable) {
      return;
    }
    e2.preventDefault();
    const { top, left } = this.getBoundingClientRect();
    const { width, height, minWidth } = window.getComputedStyle(this);
    this._initialX = e2.clientX;
    this._initialY = e2.clientY;
    this._initialWidth = Number.parseFloat(width);
    this._initialHeight = Number.parseFloat(height);
    this._initialTop = top;
    this._initialLeft = left;
    this._minWidth = Number.parseFloat(minWidth);
    this._cachedMinHeight = this._minHeight;
    Object.assign(this.style, {
      top: `${top}px`,
      left: `${left}px`
    });
    this._draggedOrResized = true;
    this._attachMouseResizeHandlers();
  }
  _onResizeMouseMove(e2) {
    const { clientX, clientY } = e2;
    let newWidth, newLeft;
    if (this._isRTL) {
      newWidth = clamp(this._initialWidth - (clientX - this._initialX), this._minWidth, this._initialLeft + this._initialWidth);
      newLeft = clamp(this._initialLeft + (clientX - this._initialX), 0, this._initialX + this._initialWidth - this._minWidth);
    } else {
      newWidth = clamp(this._initialWidth + (clientX - this._initialX), this._minWidth, window.innerWidth - this._initialLeft);
    }
    const newHeight = clamp(this._initialHeight + (clientY - this._initialY), this._cachedMinHeight, window.innerHeight - this._initialTop);
    Object.assign(this.style, {
      height: `${newHeight}px`,
      width: `${newWidth}px`,
      left: newLeft ? `${newLeft}px` : void 0
    });
  }
  _onResizeMouseUp() {
    delete this._initialX;
    delete this._initialY;
    delete this._initialWidth;
    delete this._initialHeight;
    delete this._initialTop;
    delete this._initialLeft;
    delete this._minWidth;
    delete this._cachedMinHeight;
    this._detachMouseResizeHandlers();
  }
  _handleDragStart(e2) {
    if (this.draggable) {
      e2.preventDefault();
    }
  }
  _attachMouseResizeHandlers() {
    window.addEventListener("mousemove", this._resizeMouseMoveHandler);
    window.addEventListener("mouseup", this._resizeMouseUpHandler);
    this.addEventListener("ui5-before-close", this._revertSize, { once: true });
  }
  _detachMouseResizeHandlers() {
    window.removeEventListener("mousemove", this._resizeMouseMoveHandler);
    window.removeEventListener("mouseup", this._resizeMouseUpHandler);
  }
};
__decorate$b([
  property()
], Dialog.prototype, "headerText", void 0);
__decorate$b([
  property({ type: Boolean })
], Dialog.prototype, "stretch", void 0);
__decorate$b([
  property({ type: Boolean })
], Dialog.prototype, "draggable", void 0);
__decorate$b([
  property({ type: Boolean })
], Dialog.prototype, "resizable", void 0);
__decorate$b([
  property({ type: ValueState$1, defaultValue: ValueState$1.None })
], Dialog.prototype, "state", void 0);
__decorate$b([
  property({ type: Boolean })
], Dialog.prototype, "onPhone", void 0);
__decorate$b([
  property({ type: Boolean })
], Dialog.prototype, "onDesktop", void 0);
__decorate$b([
  slot()
], Dialog.prototype, "header", void 0);
__decorate$b([
  slot()
], Dialog.prototype, "footer", void 0);
Dialog = Dialog_1 = __decorate$b([
  customElement({
    tag: "ui5-dialog",
    template: block0$9,
    styles: [
      styleData$e,
      styleData$d,
      styleData$b
    ],
    dependencies: [
      Icon
    ]
  })
], Dialog);
Dialog.define();
const Dialog$1 = Dialog;
var TitleLevel;
(function(TitleLevel2) {
  TitleLevel2["H1"] = "H1";
  TitleLevel2["H2"] = "H2";
  TitleLevel2["H3"] = "H3";
  TitleLevel2["H4"] = "H4";
  TitleLevel2["H5"] = "H5";
  TitleLevel2["H6"] = "H6";
})(TitleLevel || (TitleLevel = {}));
const TitleLevel$1 = TitleLevel;
function block0$8(context, tags, suffix) {
  return effectiveHtml`${this.h1 ? block1$8.call(this, context, tags, suffix) : void 0}${this.h2 ? block2$7.call(this, context, tags, suffix) : void 0}${this.h3 ? block3$5.call(this, context, tags, suffix) : void 0}${this.h4 ? block4$3.call(this, context, tags, suffix) : void 0}${this.h5 ? block5$2.call(this, context, tags, suffix) : void 0}${this.h6 ? block6$2.call(this, context, tags, suffix) : void 0}`;
}
function block1$8(context, tags, suffix) {
  return effectiveHtml`<h1 class="ui5-title-root"><span id="${l(this._id)}-inner"><slot></slot></span></h1>`;
}
function block2$7(context, tags, suffix) {
  return effectiveHtml`<h2 class="ui5-title-root"><span id="${l(this._id)}-inner"><slot></slot></span></h2>`;
}
function block3$5(context, tags, suffix) {
  return effectiveHtml`<h3 class="ui5-title-root"><span id="${l(this._id)}-inner"><slot></slot></span></h3>`;
}
function block4$3(context, tags, suffix) {
  return effectiveHtml`<h4 class="ui5-title-root"><span id="${l(this._id)}-inner"><slot></slot></span></h4>`;
}
function block5$2(context, tags, suffix) {
  return effectiveHtml`<h5 class="ui5-title-root"><span id="${l(this._id)}-inner"><slot></slot></span></h5>`;
}
function block6$2(context, tags, suffix) {
  return effectiveHtml`<h6 class="ui5-title-root"><span id="${l(this._id)}-inner"><slot></slot></span></h6>`;
}
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$k);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$l);
const styleData$a = { packageName: "@ui5/webcomponents", fileName: "themes/Title.css.ts", content: `:host(:not([hidden])){display:block;cursor:text}:host{max-width:100%;color:var(--sapGroup_TitleTextColor);font-size:var(--sapFontHeader2Size);font-family:"72override",var(--sapFontHeaderFamily);text-shadow:var(--sapContent_TextShadow)}.ui5-title-root{display:inline-block;position:relative;font-weight:400;font-size:inherit;box-sizing:border-box;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%;vertical-align:bottom;-webkit-margin-before:0;-webkit-margin-after:0;-webkit-margin-start:0;-webkit-margin-end:0;margin:0;cursor:inherit}:host([wrapping-type="Normal"]) .ui5-title-root,:host([wrapping-type="Normal"]) ::slotted(*){white-space:pre-line}::slotted(*){font-size:inherit;font-family:inherit;text-shadow:inherit}:host([level="H1"]){font-size:var(--sapFontHeader1Size)}:host([level="H2"]){font-size:var(--sapFontHeader2Size)}:host([level="H3"]){font-size:var(--sapFontHeader3Size)}:host([level="H4"]){font-size:var(--sapFontHeader4Size)}:host([level="H5"]){font-size:var(--sapFontHeader5Size)}:host([level="H6"]){font-size:var(--sapFontHeader6Size)}
` };
var __decorate$a = function(decorators, target, key, desc) {
  var c2 = arguments.length, r = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i2 = decorators.length - 1; i2 >= 0; i2--)
      if (d = decorators[i2])
        r = (c2 < 3 ? d(r) : c2 > 3 ? d(target, key, r) : d(target, key)) || r;
  return c2 > 3 && r && Object.defineProperty(target, key, r), r;
};
let Title = class Title2 extends UI5Element {
  /**
   * Defines the text of the component.
   * This component supports nesting a <code>Link</code> component inside.
   * <br><br>
   * <b>Note:</b> Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
   *
   * @type {Node[]}
   * @slot
   * @name sap.ui.webc.main.Title.prototype.default
   * @public
   */
  get normalizedLevel() {
    return this.level.toLowerCase();
  }
  get h1() {
    return this.normalizedLevel === "h1";
  }
  get h2() {
    return this.normalizedLevel === "h2";
  }
  get h3() {
    return this.normalizedLevel === "h3";
  }
  get h4() {
    return this.normalizedLevel === "h4";
  }
  get h5() {
    return this.normalizedLevel === "h5";
  }
  get h6() {
    return this.normalizedLevel === "h6";
  }
};
__decorate$a([
  property({ type: WrappingType$1, defaultValue: WrappingType$1.None })
], Title.prototype, "wrappingType", void 0);
__decorate$a([
  property({ type: TitleLevel$1, defaultValue: TitleLevel$1.H2 })
], Title.prototype, "level", void 0);
Title = __decorate$a([
  customElement({
    tag: "ui5-title",
    renderer: litRender,
    template: block0$8,
    styles: styleData$a
  })
], Title);
Title.define();
const Title$1 = Title;
const name$b = "decline";
const pathData$b = "M86 109l22-23q5-5 12-5 6 0 11 5l124 125L380 86q5-5 11-5 7 0 12 5l22 23q12 11 0 23L301 256l124 125q11 11 0 22l-22 23q-8 5-12 5-3 0-11-5L255 301 131 426q-5 5-11 5-4 0-12-5l-22-23q-11-11 0-22l124-125L86 132q-12-12 0-23z";
const ltr$b = false;
const accData$1 = ICON_DECLINE;
const collection$b = "SAP-icons-v4";
const packageName$b = "@ui5/webcomponents-icons";
registerIcon(name$b, { pathData: pathData$b, ltr: ltr$b, accData: accData$1, collection: collection$b, packageName: packageName$b });
const name$a = "decline";
const pathData$a = "M292 256l117 116q7 7 7 18 0 12-7.5 19t-18.5 7q-10 0-18-8L256 292 140 408q-8 8-18 8-11 0-18.5-7.5T96 390q0-10 8-18l116-116-116-116q-8-8-8-18 0-11 7.5-18.5T122 96t18 7l116 117 116-117q7-7 18-7t18.5 7.5T416 122t-7 18z";
const ltr$a = false;
const accData = ICON_DECLINE;
const collection$a = "SAP-icons-v5";
const packageName$a = "@ui5/webcomponents-icons";
registerIcon(name$a, { pathData: pathData$a, ltr: ltr$a, accData, collection: collection$a, packageName: packageName$a });
isLegacyThemeFamily() ? pathData$b : pathData$a;
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$k);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$l);
const styleData$9 = { packageName: "@ui5/webcomponents", fileName: "themes/ResponsivePopover.css.ts", content: `:host{--_ui5-v1-21-2_input_width: 100%;min-width:6.25rem;min-height:2rem}:host([opened]){display:inline-block}.ui5-responsive-popover-header{height:var(--_ui5-v1-21-2-responsive_popover_header_height);display:flex;justify-content:space-between;align-items:center;width:100%}.ui5-responsive-popover-header-text{width:calc(100% - var(--_ui5-v1-21-2_button_base_min_width))}.ui5-responsive-popover-header-no-title{justify-content:flex-end}
` };
var __decorate$9 = function(decorators, target, key, desc) {
  var c2 = arguments.length, r = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i2 = decorators.length - 1; i2 >= 0; i2--)
      if (d = decorators[i2])
        r = (c2 < 3 ? d(r) : c2 > 3 ? d(target, key, r) : d(target, key)) || r;
  return c2 > 3 && r && Object.defineProperty(target, key, r), r;
};
var ResponsivePopover_1;
let ResponsivePopover = ResponsivePopover_1 = class ResponsivePopover2 extends Popover$1 {
  constructor() {
    super();
  }
  /**
   * Shows popover on desktop and dialog on mobile.
   * @param {HTMLElement} opener the element that the popover is shown at
   * @param {boolean} [preventInitialFocus=false] Prevents applying the focus inside the popup
   * @public
   * @async
   * @method
   * @name sap.ui.webc.main.ResponsivePopover#showAt
   * @returns {Promise} Resolves when the responsive popover is open
   */
  async showAt(opener, preventInitialFocus = false) {
    if (!isPhone()) {
      await super.showAt(opener, preventInitialFocus);
    } else {
      this.style.display = "contents";
      const nextZIndex = getNextZIndex();
      if (!nextZIndex) {
        return;
      }
      this.style.zIndex = nextZIndex.toString();
      await this._dialog.show(preventInitialFocus);
    }
  }
  /**
   * Closes the popover/dialog.
   * @public
   * @method
   * @name sap.ui.webc.main.ResponsivePopover#close
   * @returns {void}
   */
  close(escPressed = false, preventRegistryUpdate = false, preventFocusRestore = false) {
    if (!isPhone()) {
      super.close(escPressed, preventRegistryUpdate, preventFocusRestore);
    } else {
      this._dialog.close(escPressed, preventRegistryUpdate, preventFocusRestore);
    }
  }
  toggle(opener) {
    if (this.isOpen()) {
      return this.close();
    }
    this.showAt(opener);
  }
  /**
   * Tells if the responsive popover is open.
   * @public
   * @method
   * @name sap.ui.webc.main.ResponsivePopover#isOpen
   * @returns {boolean}
   */
  isOpen() {
    return isPhone() && this._dialog ? this._dialog.isOpen() : super.isOpen();
  }
  get classes() {
    const allClasses = super.classes;
    allClasses.header = {
      "ui5-responsive-popover-header": true,
      "ui5-responsive-popover-header-no-title": !this.headerText
    };
    return allClasses;
  }
  get _dialog() {
    return this.shadowRoot.querySelector("[ui5-dialog]");
  }
  get contentDOM() {
    return isPhone() ? this._dialog.contentDOM : super.contentDOM;
  }
  get _isPhone() {
    return isPhone();
  }
  get _displayHeader() {
    return (isPhone() || !this.contentOnlyOnDesktop) && super._displayHeader;
  }
  get _displayFooter() {
    return isPhone() || !this.contentOnlyOnDesktop;
  }
  get _closeDialogAriaLabel() {
    return ResponsivePopover_1.i18nBundle.getText(RESPONSIVE_POPOVER_CLOSE_DIALOG_BUTTON);
  }
  _beforeDialogOpen(e2) {
    this.open = true;
    this.opened = true;
    this._propagateDialogEvent(e2);
  }
  _afterDialogClose(e2) {
    this.open = false;
    this.opened = false;
    this._propagateDialogEvent(e2);
  }
  _propagateDialogEvent(e2) {
    const type = e2.type.replace("ui5-", "");
    this.fireEvent(type, e2.detail);
  }
  get isModal() {
    if (!isPhone()) {
      return super.isModal;
    }
    return this._dialog.isModal;
  }
  static async onDefine() {
    ResponsivePopover_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
  }
};
__decorate$9([
  property({ type: Boolean })
], ResponsivePopover.prototype, "contentOnlyOnDesktop", void 0);
__decorate$9([
  property({ type: Boolean })
], ResponsivePopover.prototype, "_hideHeader", void 0);
__decorate$9([
  property({ type: Boolean })
], ResponsivePopover.prototype, "_hideCloseButton", void 0);
ResponsivePopover = ResponsivePopover_1 = __decorate$9([
  customElement({
    tag: "ui5-responsive-popover",
    styles: [Popover$1.styles, styleData$9],
    template: block0$d,
    dependencies: [
      ...Popover$1.dependencies,
      Button,
      Dialog$1,
      Title$1
    ]
  })
], ResponsivePopover);
ResponsivePopover.define();
const ResponsivePopover$1 = ResponsivePopover;
const getNormalizedTarget = (target) => {
  let element = target;
  if (target.shadowRoot && target.shadowRoot.activeElement) {
    element = target.shadowRoot.activeElement;
  }
  return element;
};
let debounceInterval = null;
const debounce = (fn, delay) => {
  debounceInterval && clearTimeout(debounceInterval);
  debounceInterval = setTimeout(() => {
    debounceInterval = null;
    fn();
  }, delay);
};
const isElementInView = (el) => {
  const rect = el.getBoundingClientRect();
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
};
var ListMode;
(function(ListMode2) {
  ListMode2["None"] = "None";
  ListMode2["SingleSelect"] = "SingleSelect";
  ListMode2["SingleSelectBegin"] = "SingleSelectBegin";
  ListMode2["SingleSelectEnd"] = "SingleSelectEnd";
  ListMode2["SingleSelectAuto"] = "SingleSelectAuto";
  ListMode2["MultiSelect"] = "MultiSelect";
  ListMode2["Delete"] = "Delete";
})(ListMode || (ListMode = {}));
const ListMode$1 = ListMode;
var ListGrowingMode;
(function(ListGrowingMode2) {
  ListGrowingMode2["Button"] = "Button";
  ListGrowingMode2["Scroll"] = "Scroll";
  ListGrowingMode2["None"] = "None";
})(ListGrowingMode || (ListGrowingMode = {}));
const ListGrowingMode$1 = ListGrowingMode;
const isElementTabbable = (el) => {
  if (!el) {
    return false;
  }
  const nodeName = el.nodeName.toLowerCase();
  if (el.hasAttribute("data-sap-no-tab-ref")) {
    return false;
  }
  if (isElementHidden(el)) {
    return false;
  }
  const tabIndex = el.getAttribute("tabindex");
  if (tabIndex !== null && tabIndex !== void 0) {
    return parseInt(tabIndex) >= 0;
  }
  if (nodeName === "a" || /input|select|textarea|button|object/.test(nodeName)) {
    return !el.disabled;
  }
  return false;
};
const getTabbableElements = (el) => {
  return getTabbables([...el.children]);
};
const getTabbables = (nodes, tabbables) => {
  const tabbableElements = tabbables || [];
  if (!nodes) {
    return tabbableElements;
  }
  nodes.forEach((currentNode) => {
    if (currentNode.nodeType === Node.TEXT_NODE || currentNode.nodeType === Node.COMMENT_NODE) {
      return;
    }
    let currentElement = currentNode;
    if (currentElement.hasAttribute("data-sap-no-tab-ref")) {
      return;
    }
    if (currentElement.shadowRoot) {
      const children = currentElement.shadowRoot.children;
      currentElement = Array.from(children).find((node) => node.tagName !== "STYLE");
    }
    if (!currentElement) {
      return;
    }
    if (isElementTabbable(currentElement)) {
      tabbableElements.push(currentElement);
    }
    if (currentElement.tagName === "SLOT") {
      getTabbables(currentElement.assignedNodes(), tabbableElements);
    } else {
      getTabbables([...currentElement.children], tabbableElements);
    }
  });
  return tabbableElements;
};
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$k);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$l);
const styleData$8 = { packageName: "@ui5/webcomponents", fileName: "themes/ListItemBase.css.ts", content: `:host(:not([hidden])){display:block}:host{height:var(--_ui5-v1-21-2_list_item_base_height);background:var(--ui5-v1-21-2-listitem-background-color);box-sizing:border-box;border-bottom:1px solid transparent}:host([selected]){background:var(--sapList_SelectionBackgroundColor)}:host([has-border]){border-bottom:var(--ui5-v1-21-2-listitem-border-bottom)}:host([selected]){border-bottom:var(--ui5-v1-21-2-listitem-selected-border-bottom)}:host(:not([focused])[selected][has-border]){border-bottom:var(--ui5-v1-21-2-listitem-selected-border-bottom)}:host([focused][selected]){border-bottom:var(--ui5-v1-21-2-listitem-focused-selected-border-bottom)}.ui5-li-root{position:relative;display:flex;align-items:center;width:100%;height:100%;padding:0 1rem;box-sizing:border-box}:host([focused]) .ui5-li-root.ui5-li--focusable{outline:none}:host([focused]) .ui5-li-root.ui5-li--focusable:after{content:"";border:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);position:absolute;border-radius:0;inset:.125rem;pointer-events:none}:host([focused]) .ui5-li-content:focus:after{content:"";border:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);position:absolute;inset:0;pointer-events:none}:host([active][focused]) .ui5-li-root.ui5-li--focusable:after{border-color:var(--ui5-v1-21-2-listitem-active-border-color)}:host([disabled]){opacity:var(--_ui5-v1-21-2-listitembase_disabled_opacity);pointer-events:none}.ui5-li-content{max-width:100%;font-family:"72override",var(--sapFontFamily);color:var(--sapList_TextColor)}
` };
var __decorate$8 = function(decorators, target, key, desc) {
  var c2 = arguments.length, r = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i2 = decorators.length - 1; i2 >= 0; i2--)
      if (d = decorators[i2])
        r = (c2 < 3 ? d(r) : c2 > 3 ? d(target, key, r) : d(target, key)) || r;
  return c2 > 3 && r && Object.defineProperty(target, key, r), r;
};
let ListItemBase = class ListItemBase2 extends UI5Element {
  _onfocusin(e2) {
    this.fireEvent("_request-tabindex-change", e2);
    if (e2.target !== this.getFocusDomRef()) {
      return;
    }
    this.focused = true;
    this.fireEvent("_focused", e2);
  }
  _onfocusout() {
    this.focused = false;
  }
  _onkeydown(e2) {
    if (isTabNext(e2)) {
      return this._handleTabNext(e2);
    }
    if (isTabPrevious(e2)) {
      return this._handleTabPrevious(e2);
    }
  }
  _onkeyup(e2) {
  }
  // eslint-disable-line
  _handleTabNext(e2) {
    if (this.shouldForwardTabAfter()) {
      if (!this.fireEvent("_forward-after", {}, true)) {
        e2.preventDefault();
      }
    }
  }
  _handleTabPrevious(e2) {
    const target = e2.target;
    if (this.shouldForwardTabBefore(target)) {
      this.fireEvent("_forward-before");
    }
  }
  /*
  * Determines if th current list item either has no tabbable content or
  * [TAB] is performed onto the last tabbale content item.
  */
  shouldForwardTabAfter() {
    const aContent = getTabbableElements(this.getFocusDomRef());
    return aContent.length === 0 || aContent[aContent.length - 1] === getActiveElement();
  }
  /*
  * Determines if the current list item is target of [SHIFT+TAB].
  */
  shouldForwardTabBefore(target) {
    return this.getFocusDomRef() === target;
  }
  get classes() {
    return {
      main: {
        "ui5-li-root": true,
        "ui5-li--focusable": !this.disabled
      }
    };
  }
  get _ariaDisabled() {
    return this.disabled ? true : void 0;
  }
  get hasConfigurableMode() {
    return false;
  }
  get _effectiveTabIndex() {
    if (this.disabled) {
      return -1;
    }
    if (this.selected) {
      return 0;
    }
    return this._tabIndex;
  }
};
__decorate$8([
  property({ type: Boolean })
], ListItemBase.prototype, "selected", void 0);
__decorate$8([
  property({ type: Boolean })
], ListItemBase.prototype, "hasBorder", void 0);
__decorate$8([
  property({ defaultValue: "-1", noAttribute: true })
], ListItemBase.prototype, "_tabIndex", void 0);
__decorate$8([
  property({ type: Boolean })
], ListItemBase.prototype, "disabled", void 0);
__decorate$8([
  property({ type: Boolean })
], ListItemBase.prototype, "focused", void 0);
ListItemBase = __decorate$8([
  customElement({
    renderer: litRender,
    styles: styleData$8
  }),
  event("_request-tabindex-change"),
  event("_focused"),
  event("_forward-after"),
  event("_forward-before")
], ListItemBase);
const ListItemBase$1 = ListItemBase;
var ListSeparators;
(function(ListSeparators2) {
  ListSeparators2["All"] = "All";
  ListSeparators2["Inner"] = "Inner";
  ListSeparators2["None"] = "None";
})(ListSeparators || (ListSeparators = {}));
const ListSeparators$1 = ListSeparators;
var BusyIndicatorSize;
(function(BusyIndicatorSize2) {
  BusyIndicatorSize2["Small"] = "Small";
  BusyIndicatorSize2["Medium"] = "Medium";
  BusyIndicatorSize2["Large"] = "Large";
})(BusyIndicatorSize || (BusyIndicatorSize = {}));
const BusyIndicatorSize$1 = BusyIndicatorSize;
function block0$7(context, tags, suffix) {
  return effectiveHtml`<div class="${o(this.classes.root)}">${this._isBusy ? block1$7.call(this, context, tags, suffix) : void 0}<slot></slot>${this._isBusy ? block3$4.call(this, context, tags, suffix) : void 0}</div>`;
}
function block1$7(context, tags, suffix) {
  return effectiveHtml`<div class="ui5-busy-indicator-busy-area" title="${l(this.ariaTitle)}" tabindex="0" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuetext="Busy" aria-labelledby="${l(this.labelId)}" data-sap-focus-ref><div class="ui5-busy-indicator-circles-wrapper"><div class="ui5-busy-indicator-circle circle-animation-0"></div><div class="ui5-busy-indicator-circle circle-animation-1"></div><div class="ui5-busy-indicator-circle circle-animation-2"></div></div>${this.text ? block2$6.call(this, context, tags, suffix) : void 0}</div>`;
}
function block2$6(context, tags, suffix) {
  return suffix ? effectiveHtml`<${scopeTag("ui5-label", tags, suffix)} id="${l(this._id)}-label" class="ui5-busy-indicator-text" wrapping-type="Normal">${l(this.text)}</${scopeTag("ui5-label", tags, suffix)}>` : effectiveHtml`<ui5-label id="${l(this._id)}-label" class="ui5-busy-indicator-text" wrapping-type="Normal">${l(this.text)}</ui5-label>`;
}
function block3$4(context, tags, suffix) {
  return effectiveHtml`<span data-ui5-focus-redirect tabindex="0" @focusin="${this._redirectFocus}"></span>`;
}
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$k);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$l);
const styleData$7 = { packageName: "@ui5/webcomponents", fileName: "themes/BusyIndicator.css.ts", content: `:host(:not([hidden])){display:inline-block}:host([_is-busy]){color:var(--_ui5-v1-21-2_busy_indicator_color)}:host([size="Small"]) .ui5-busy-indicator-root{min-width:1.625rem;min-height:.5rem}:host([size="Small"][text]:not([text=""])) .ui5-busy-indicator-root{min-height:1.75rem}:host([size="Small"]) .ui5-busy-indicator-circle{width:.5rem;height:.5rem}:host([size="Small"]) .ui5-busy-indicator-circle:first-child,:host([size="Small"]) .ui5-busy-indicator-circle:nth-child(2){margin-inline-end:.0625rem}:host(:not([size])) .ui5-busy-indicator-root,:host([size="Medium"]) .ui5-busy-indicator-root{min-width:3.375rem;min-height:1rem}:host([size="Medium"]) .ui5-busy-indicator-circle:first-child,:host([size="Medium"]) .ui5-busy-indicator-circle:nth-child(2){margin-inline-end:.1875rem}:host(:not([size])[text]:not([text=""])) .ui5-busy-indicator-root,:host([size="Medium"][text]:not([text=""])) .ui5-busy-indicator-root{min-height:2.25rem}:host(:not([size])) .ui5-busy-indicator-circle,:host([size="Medium"]) .ui5-busy-indicator-circle{width:1rem;height:1rem}:host([size="Large"]) .ui5-busy-indicator-root{min-width:6.5rem;min-height:2rem}:host([size="Large"]) .ui5-busy-indicator-circle:first-child,:host([size="Large"]) .ui5-busy-indicator-circle:nth-child(2){margin-inline-end:.25rem}:host([size="Large"][text]:not([text=""])) .ui5-busy-indicator-root{min-height:3.25rem}:host([size="Large"]) .ui5-busy-indicator-circle{width:2rem;height:2rem}.ui5-busy-indicator-root{display:flex;justify-content:center;align-items:center;position:relative;background-color:inherit;height:inherit}.ui5-busy-indicator-busy-area{position:absolute;z-index:99;inset:0;display:flex;justify-content:center;align-items:center;background-color:inherit;flex-direction:column}.ui5-busy-indicator-busy-area:focus{outline:var(--_ui5-v1-21-2_busy_indicator_focus_outline);outline-offset:-2px;border-radius:var(--_ui5-v1-21-2_busy_indicator_focus_border_radius)}.ui5-busy-indicator-circles-wrapper{line-height:0}.ui5-busy-indicator-circle{display:inline-block;background-color:currentColor;border-radius:50%}.ui5-busy-indicator-circle:before{content:"";width:100%;height:100%;border-radius:100%}.circle-animation-0{animation:grow 1.6s infinite cubic-bezier(.32,.06,.85,1.11)}.circle-animation-1{animation:grow 1.6s infinite cubic-bezier(.32,.06,.85,1.11);animation-delay:.2s}.circle-animation-2{animation:grow 1.6s infinite cubic-bezier(.32,.06,.85,1.11);animation-delay:.4s}.ui5-busy-indicator-text{width:100%;margin-top:.25rem;text-align:center}@keyframes grow{0%,50%,to{-webkit-transform:scale(.5);-moz-transform:scale(.5);transform:scale(.5)}25%{-webkit-transform:scale(1);-moz-transform:scale(1);transform:scale(1)}}
` };
var __decorate$7 = function(decorators, target, key, desc) {
  var c2 = arguments.length, r = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i2 = decorators.length - 1; i2 >= 0; i2--)
      if (d = decorators[i2])
        r = (c2 < 3 ? d(r) : c2 > 3 ? d(target, key, r) : d(target, key)) || r;
  return c2 > 3 && r && Object.defineProperty(target, key, r), r;
};
var BusyIndicator_1;
let BusyIndicator = BusyIndicator_1 = class BusyIndicator2 extends UI5Element {
  constructor() {
    super();
    this._keydownHandler = this._handleKeydown.bind(this);
    this._preventEventHandler = this._preventEvent.bind(this);
  }
  onEnterDOM() {
    this.addEventListener("keydown", this._keydownHandler, {
      capture: true
    });
    this.addEventListener("keyup", this._preventEventHandler, {
      capture: true
    });
  }
  onExitDOM() {
    if (this._busyTimeoutId) {
      clearTimeout(this._busyTimeoutId);
      delete this._busyTimeoutId;
    }
    this.removeEventListener("keydown", this._keydownHandler, true);
    this.removeEventListener("keyup", this._preventEventHandler, true);
  }
  static async onDefine() {
    BusyIndicator_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
  }
  get ariaTitle() {
    return BusyIndicator_1.i18nBundle.getText(BUSY_INDICATOR_TITLE);
  }
  get labelId() {
    return this.text ? `${this._id}-label` : void 0;
  }
  get classes() {
    return {
      root: {
        "ui5-busy-indicator-root": true
      }
    };
  }
  onBeforeRendering() {
    if (this.active) {
      if (!this._isBusy && !this._busyTimeoutId) {
        this._busyTimeoutId = setTimeout(() => {
          delete this._busyTimeoutId;
          this._isBusy = true;
        }, Math.max(0, this.delay));
      }
    } else {
      if (this._busyTimeoutId) {
        clearTimeout(this._busyTimeoutId);
        delete this._busyTimeoutId;
      }
      this._isBusy = false;
    }
  }
  _handleKeydown(e2) {
    if (!this._isBusy) {
      return;
    }
    e2.stopImmediatePropagation();
    if (isTabNext(e2)) {
      this.focusForward = true;
      this.shadowRoot.querySelector("[data-ui5-focus-redirect]").focus();
      this.focusForward = false;
    }
  }
  _preventEvent(e2) {
    if (this._isBusy) {
      e2.stopImmediatePropagation();
    }
  }
  /**
   * Moves the focus to busy area when coming with SHIFT + TAB
   */
  _redirectFocus(e2) {
    if (this.focusForward) {
      return;
    }
    e2.preventDefault();
    this.shadowRoot.querySelector(".ui5-busy-indicator-busy-area").focus();
  }
};
__decorate$7([
  property()
], BusyIndicator.prototype, "text", void 0);
__decorate$7([
  property({ type: BusyIndicatorSize$1, defaultValue: BusyIndicatorSize$1.Medium })
], BusyIndicator.prototype, "size", void 0);
__decorate$7([
  property({ type: Boolean })
], BusyIndicator.prototype, "active", void 0);
__decorate$7([
  property({ validator: Integer, defaultValue: 1e3 })
], BusyIndicator.prototype, "delay", void 0);
__decorate$7([
  property({ type: Boolean })
], BusyIndicator.prototype, "_isBusy", void 0);
BusyIndicator = BusyIndicator_1 = __decorate$7([
  customElement({
    tag: "ui5-busy-indicator",
    languageAware: true,
    styles: styleData$7,
    renderer: litRender,
    template: block0$7,
    dependencies: [Label$1]
  })
], BusyIndicator);
BusyIndicator.define();
const BusyIndicator$1 = BusyIndicator;
function block0$6(context, tags, suffix) {
  return effectiveHtml`<div class="${o(this.classes.root)}" @focusin="${this._onfocusin}" @keydown="${this._onkeydown}" @ui5-_press=${l(this.onItemPress)} @ui5-close=${l(this.onItemClose)} @ui5-toggle=${l(this.onItemToggle)} @ui5-_request-tabindex-change=${l(this.onItemTabIndexChange)} @ui5-_focused=${l(this.onItemFocused)} @ui5-_forward-after=${l(this.onForwardAfter)} @ui5-_forward-before=${l(this.onForwardBefore)} @ui5-_selection-requested=${l(this.onSelectionRequested)} @ui5-_focus-requested=${l(this.onFocusRequested)}><div class="ui5-list-scroll-container">${this.header.length ? block1$6.call(this, context, tags, suffix) : void 0}${this.shouldRenderH1 ? block2$5.call(this, context, tags, suffix) : void 0}${this.hasData ? block3$3.call(this, context, tags, suffix) : void 0}<span id="${l(this._id)}-modeLabel" class="ui5-hidden-text">${l(this.ariaLabelModeText)}</span><ul id="${l(this._id)}-listUl" class="ui5-list-ul" role="${l(this.accessibleRole)}" aria-label="${l(this.ariaLabelTxt)}" aria-labelledby="${l(this.ariaLabelledBy)}" aria-roledescription="${l(this.accessibleRoleDescription)}"><slot></slot>${this.showNoDataText ? block4$2.call(this, context, tags, suffix) : void 0}</ul>${this.growsWithButton ? block5$1.call(this, context, tags, suffix) : void 0}${this.footerText ? block6$1.call(this, context, tags, suffix) : void 0}${this.hasData ? block7$1.call(this, context, tags, suffix) : void 0}<span tabindex="-1" aria-hidden="true" class="ui5-list-end-marker"></span></div>${this.busy ? block8$1.call(this, context, tags, suffix) : void 0}</div> `;
}
function block1$6(context, tags, suffix) {
  return effectiveHtml`<slot name="header" />`;
}
function block2$5(context, tags, suffix) {
  return effectiveHtml`<header id="${l(this.headerID)}" class="ui5-list-header">${l(this.headerText)}</header>`;
}
function block3$3(context, tags, suffix) {
  return effectiveHtml`<div id="${l(this._id)}-before" tabindex="0" role="none" class="ui5-list-focusarea"></div>`;
}
function block4$2(context, tags, suffix) {
  return effectiveHtml`<li id="${l(this._id)}-nodata" class="ui5-list-nodata"><div id="${l(this._id)}-nodata-text" class="ui5-list-nodata-text">${l(this.noDataText)}</div></li>`;
}
function block5$1(context, tags, suffix) {
  return effectiveHtml`<div growing-button><div tabindex="0" role="button" id="${l(this._id)}-growing-btn" aria-labelledby="${l(this._id)}-growingButton-text" ?active="${this._loadMoreActive}" @click="${this._onLoadMoreClick}" @keydown="${this._onLoadMoreKeydown}" @keyup="${this._onLoadMoreKeyup}" @mousedown="${this._onLoadMoreMousedown}" @mouseup="${this._onLoadMoreMouseup}" growing-button-inner><span id="${l(this._id)}-growingButton-text" growing-button-text>${l(this._growingButtonText)}</span></div></div>`;
}
function block6$1(context, tags, suffix) {
  return effectiveHtml`<footer id="${l(this._id)}-footer" class="ui5-list-footer">${l(this.footerText)}</footer>`;
}
function block7$1(context, tags, suffix) {
  return effectiveHtml`<div id="${l(this._id)}-after" tabindex="0" role="none" class="ui5-list-focusarea"></div>`;
}
function block8$1(context, tags, suffix) {
  return suffix ? effectiveHtml`<div class="ui5-list-busy-row"><${scopeTag("ui5-busy-indicator", tags, suffix)} delay="${l(this.busyDelay)}" active size="Medium" class="ui5-list-busy-ind" style="${styleMap(this.styles.busyInd)}" data-sap-focus-ref></${scopeTag("ui5-busy-indicator", tags, suffix)}></div>` : effectiveHtml`<div class="ui5-list-busy-row"><ui5-busy-indicator delay="${l(this.busyDelay)}" active size="Medium" class="ui5-list-busy-ind" style="${styleMap(this.styles.busyInd)}" data-sap-focus-ref></ui5-busy-indicator></div>`;
}
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$k);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$l);
const styleData$6 = { packageName: "@ui5/webcomponents", fileName: "themes/List.css.ts", content: `.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}[growing-button]{display:flex;align-items:center;padding:var(--_ui5-v1-21-2_load_more_padding);border-top:1px solid var(--sapList_BorderColor);border-bottom:var(--_ui5-v1-21-2_load_more_border-bottom);box-sizing:border-box;cursor:pointer;outline:none}[growing-button-inner]{display:flex;align-items:center;justify-content:center;flex-direction:column;min-height:var(--_ui5-v1-21-2_load_more_text_height);width:100%;color:var(--sapButton_TextColor);background-color:var(--sapList_Background);border:var(--_ui5-v1-21-2_load_more_border);border-radius:var(--_ui5-v1-21-2_load_more_border_radius);box-sizing:border-box}[growing-button-inner]:focus{outline:var(--_ui5-v1-21-2_load_more_outline_width) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);outline-offset:-.125rem;border-color:transparent}[growing-button-inner]:hover{background-color:var(--sapList_Hover_Background)}[growing-button-inner]:active,[growing-button-inner][active]{background-color:var(--sapList_Active_Background);border-color:var(--sapList_Active_Background)}[growing-button-inner]:active>*,[growing-button-inner][active]>*{color:var(--sapList_Active_TextColor)}[growing-button-text],[growing-button-subtext]{width:100%;text-align:center;font-family:"72override",var(--sapFontFamily);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;box-sizing:border-box}[growing-button-text]{height:var(--_ui5-v1-21-2_load_more_text_height);padding:.875rem 1rem 0;font-size:var(--_ui5-v1-21-2_load_more_text_font_size);font-weight:700}[growing-button-subtext]{font-size:var(--sapFontSize);padding:var(--_ui5-v1-21-2_load_more_desc_padding)}:host(:not([hidden])){display:block;max-width:100%;width:100%;-webkit-tap-highlight-color:transparent}:host([indent]) .ui5-list-root{padding:2rem}:host([separators="None"]) .ui5-list-nodata{border-bottom:0}:host([busy]){opacity:.72}:host([busy]) .ui5-list-busy-row{position:absolute;inset:0;outline:none}:host([busy]) .ui5-list-busy-ind{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:1}.ui5-list-root{width:100%;height:100%;position:relative;box-sizing:border-box}.ui5-list-scroll-container{overflow:auto;height:100%}.ui5-list-ul{list-style-type:none;padding:0;margin:0}.ui5-list-ul:focus{outline:none}.ui5-list-focusarea{position:fixed}.ui5-list-header{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;box-sizing:border-box;font-size:var(--sapFontHeader4Size);font-family:"72override",var(--sapFontFamily);color:var(--sapGroup_TitleTextColor);height:3rem;line-height:3rem;padding:0 1rem;background-color:var(--sapGroup_TitleBackground);border-bottom:1px solid var(--sapGroup_TitleBorderColor)}.ui5-list-footer{height:2rem;box-sizing:border-box;-webkit-text-size-adjust:none;font-size:var(--sapFontSize);font-family:"72override",var(--sapFontFamily);line-height:2rem;background-color:var(--sapList_FooterBackground);color:var(--ui5-v1-21-2_list_footer_text_color);padding:0 1rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ui5-list-nodata{list-style-type:none;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;color:var(--sapTextColor);background-color:var(--sapList_Background);border-bottom:1px solid var(--sapList_BorderColor);padding:0 1rem!important;height:var(--_ui5-v1-21-2_list_no_data_height);font-size:var(--_ui5-v1-21-2_list_no_data_font_size);font-family:"72override",var(--sapFontFamily)}.ui5-list-nodata-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
` };
const name$9 = "accept";
const pathData$9 = "M455.8 94q9 9 3 19l-222 326q-4 8-12 9t-14-5l-151-167q-5-5-4.5-11t5.5-11l25-25q12-12 23 0l96 96q5 5 13 4.5t12-8.5l175-249q4-7 11.5-8t13.5 4z";
const ltr$9 = true;
const collection$9 = "SAP-icons-v4";
const packageName$9 = "@ui5/webcomponents-icons";
registerIcon(name$9, { pathData: pathData$9, ltr: ltr$9, collection: collection$9, packageName: packageName$9 });
const name$8 = "accept";
const pathData$8 = "M187 416q-12 0-20-9L71 299q-7-7-7-17 0-11 7.5-18.5T90 256q12 0 19 9l77 87 217-247q8-9 19-9t18.5 7.5T448 122q0 10-6 16L206 407q-7 9-19 9z";
const ltr$8 = true;
const collection$8 = "SAP-icons-v5";
const packageName$8 = "@ui5/webcomponents-icons";
registerIcon(name$8, { pathData: pathData$8, ltr: ltr$8, collection: collection$8, packageName: packageName$8 });
isLegacyThemeFamily() ? pathData$9 : pathData$8;
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$k);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$l);
const styleData$5 = { packageName: "@ui5/webcomponents", fileName: "themes/CheckBox.css.ts", content: `.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host{-webkit-tap-highlight-color:rgba(0,0,0,0)}:host(:not([hidden])){display:inline-block}:host{overflow:hidden;max-width:100%;outline:none;border-radius:var(--_ui5-v1-21-2_checkbox_border_radius);transition:var(--_ui5-v1-21-2_checkbox_transition);cursor:pointer;user-select:none;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none}:host([disabled]){cursor:default}:host([disabled]) .ui5-checkbox-root{opacity:var(--_ui5-v1-21-2_checkbox_disabled_opacity)}:host([disabled]) .ui5-checkbox-inner{border-color:var(--_ui5-v1-21-2_checkbox_inner_disabled_border_color)}:host([disabled]) .ui5-checkbox-label{color:var(--_ui5-v1-21-2_checkbox_disabled_label_color)}:host([readonly]:not([value-state="Warning"]):not([value-state="Error"])) .ui5-checkbox-inner{background:var(--sapField_ReadOnly_Background);border:var(--_ui5-v1-21-2_checkbox_inner_readonly_border);color:var(--sapField_TextColor)}:host([wrapping-type="Normal"][text]) .ui5-checkbox-root{min-height:auto;box-sizing:border-box;align-items:flex-start;padding-top:var(--_ui5-v1-21-2_checkbox_root_side_padding);padding-bottom:var(--_ui5-v1-21-2_checkbox_root_side_padding)}:host([wrapping-type="Normal"][text]) .ui5-checkbox-root .ui5-checkbox-inner,:host([wrapping-type="Normal"][text]) .ui5-checkbox-root .ui5-checkbox-label{margin-top:var(--_ui5-v1-21-2_checkbox_wrapped_content_margin_top)}:host([wrapping-type="Normal"][text]) .ui5-checkbox-root .ui5-checkbox-label{overflow-wrap:break-word;align-self:center}:host([wrapping-type="Normal"]) .ui5-checkbox-root:focus:before{bottom:var(--_ui5-v1-21-2_checkbox_wrapped_focus_left_top_bottom_position)}:host([value-state="Error"]) .ui5-checkbox-inner,:host([value-state="Error"]) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--sapField_InvalidBackground);border:var(--_ui5-v1-21-2_checkbox_inner_error_border);color:var(--sapField_InvalidColor)}:host([value-state="Error"]) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--_ui5-v1-21-2_checkbox_inner_error_background_hover)}:host([value-state="Warning"]) .ui5-checkbox-inner,:host([value-state="Warning"]) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--sapField_WarningBackground);border:var(--_ui5-v1-21-2_checkbox_inner_warning_border);color:var(--_ui5-v1-21-2_checkbox_inner_warning_color)}:host([value-state="Warning"]) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--_ui5-v1-21-2_checkbox_inner_warning_background_hover)}:host([value-state="Information"]) .ui5-checkbox-inner,:host([value-state="Information"]) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--sapField_InformationBackground);border:var(--_ui5-v1-21-2_checkbox_inner_information_border);color:var(--_ui5-v1-21-2_checkbox_inner_information_color)}:host([value-state="Information"]) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--_ui5-v1-21-2_checkbox_inner_information_background_hover)}:host([value-state="Success"]) .ui5-checkbox-inner,:host([value-state="Success"]) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--sapField_SuccessBackground);border:var(--_ui5-v1-21-2_checkbox_inner_success_border);color:var(--sapField_SuccessColor)}:host([value-state="Success"]) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--_ui5-v1-21-2_checkbox_inner_success_background_hover)}:host([value-state="Warning"]) .ui5-checkbox-icon,:host([value-state="Warning"][indeterminate]) .ui5-checkbox-inner:after{color:var(--_ui5-v1-21-2_checkbox_checkmark_warning_color)}:host([text]) .ui5-checkbox-root{padding-inline-end:var(--_ui5-v1-21-2_checkbox_right_focus_distance)}:host([text]) .ui5-checkbox-root:focus:before{inset-inline-end:0}.ui5-checkbox-root{position:relative;display:inline-flex;align-items:center;width:100%;min-height:var(--_ui5-v1-21-2_checkbox_width_height);min-width:var(--_ui5-v1-21-2_checkbox_width_height);padding:0 var(--_ui5-v1-21-2_checkbox_wrapper_padding);outline:none;transition:var(--_ui5-v1-21-2_checkbox_transition);border:var(--_ui5-v1-21-2_checkbox_default_focus_border);border-radius:var(--_ui5-v1-21-2_checkbox_border_radius);box-sizing:border-box}.ui5-checkbox-root:focus:before{display:var(--_ui5-v1-21-2_checkbox_focus_outline_display);content:"";position:absolute;inset-inline:var(--_ui5-v1-21-2_checkbox_focus_position);inset-block:var(--_ui5-v1-21-2_checkbox_focus_position);border:var(--_ui5-v1-21-2_checkbox_focus_outline);border-radius:var(--_ui5-v1-21-2_checkbox_focus_border_radius)}:host .ui5-checkbox-root:focus{border:var(--_ui5-v1-21-2_checkbox_focus_border);border-radius:.5rem}:host(:hover:not([disabled])){background:var(--_ui5-v1-21-2_checkbox_outer_hover_background)}.ui5-checkbox--hoverable .ui5-checkbox-label:hover{color:var(--_ui5-v1-21-2_checkbox_label_color)}:host(:not([active]):not([checked]):not([value-state])) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner,:host(:not([active]):not([checked])[value-state="None"]) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--_ui5-v1-21-2_checkbox_hover_background);border-color:var(--_ui5-v1-21-2_checkbox_inner_hover_border_color)}:host(:not([active])[checked]:not([value-state])) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner,:host(:not([active])[checked][value-state="None"]) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--_ui5-v1-21-2_checkbox_hover_background);border-color:var(--_ui5-v1-21-2_checkbox_inner_hover_checked_border_color)}:host([checked]:not([value-state])) .ui5-checkbox-inner,:host([checked][value-state="None"]) .ui5-checkbox-inner{border-color:var(--_ui5-v1-21-2_checkbox_inner_selected_border_color)}:host([active]:not([checked]):not([value-state]):not([disabled])) .ui5-checkbox-inner,:host([active]:not([checked])[value-state="None"]:not([disabled])) .ui5-checkbox-inner{border-color:var(--_ui5-v1-21-2_checkbox_inner_active_border_color);background-color:var(--_ui5-v1-21-2_checkbox_active_background)}:host([active][checked]:not([value-state]):not([disabled])) .ui5-checkbox-inner,:host([active][checked][value-state="None"]:not([disabled])) .ui5-checkbox-inner{border-color:var(--_ui5-v1-21-2_checkbox_inner_selected_border_color);background-color:var(--_ui5-v1-21-2_checkbox_active_background)}.ui5-checkbox-inner{min-width:var(--_ui5-v1-21-2_checkbox_inner_width_height);max-width:var(--_ui5-v1-21-2_checkbox_inner_width_height);height:var(--_ui5-v1-21-2_checkbox_inner_width_height);max-height:var(--_ui5-v1-21-2_checkbox_inner_width_height);border:var(--_ui5-v1-21-2_checkbox_inner_border);border-radius:var(--_ui5-v1-21-2_checkbox_inner_border_radius);background:var(--_ui5-v1-21-2_checkbox_inner_background);color:var(--_ui5-v1-21-2_checkbox_checkmark_color);box-sizing:border-box;position:relative;cursor:inherit}:host([indeterminate][checked]) .ui5-checkbox-inner:after{content:"";background-color:currentColor;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:var(--_ui5-v1-21-2_checkbox_partially_icon_size);height:var(--_ui5-v1-21-2_checkbox_partially_icon_size)}.ui5-checkbox-inner input{-webkit-appearance:none;visibility:hidden;width:0;left:0;position:absolute;font-size:inherit}.ui5-checkbox-root .ui5-checkbox-label{margin-inline-start:var(--_ui5-v1-21-2_checkbox_label_offset);cursor:inherit;text-overflow:ellipsis;overflow:hidden;pointer-events:none;color:var(--_ui5-v1-21-2_checkbox_label_color)}.ui5-checkbox-icon{width:var(--_ui5-v1-21-2_checkbox_icon_size);height:var(--_ui5-v1-21-2_checkbox_icon_size);color:currentColor;cursor:inherit;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}
` };
function block0$5(context, tags, suffix) {
  return effectiveHtml`<div class="ui5-checkbox-root ${o(this.classes.main)}" role="checkbox" part="root" aria-checked="${l(this.effectiveAriaChecked)}" aria-readonly="${l(this.ariaReadonly)}" aria-disabled="${l(this.effectiveAriaDisabled)}" aria-label="${l(this.ariaLabelText)}" aria-labelledby="${l(this.ariaLabelledBy)}" aria-describedby="${l(this.ariaDescribedBy)}" aria-required="${l(this.required)}" tabindex="${l(this.effectiveTabIndex)}" @mousedown="${this._onmousedown}" @mouseup="${this._onmouseup}" @keydown="${this._onkeydown}" @keyup="${this._onkeyup}" @click="${this._onclick}" @focusout="${this._onfocusout}"><div id="${l(this._id)}-CbBg" class="ui5-checkbox-inner">${this.isCompletelyChecked ? block1$5.call(this, context, tags, suffix) : void 0}<input id="${l(this._id)}-CB" type='checkbox' ?checked="${this.checked}" ?readonly="${this.readonly}" ?disabled="${this.disabled}" tabindex="-1" aria-hidden="true" data-sap-no-tab-ref /></div>${this.text ? block2$4.call(this, context, tags, suffix) : void 0}${this.hasValueState ? block3$2.call(this, context, tags, suffix) : void 0}<slot name="formSupport"></slot></div>`;
}
function block1$5(context, tags, suffix) {
  return suffix ? effectiveHtml`<${scopeTag("ui5-icon", tags, suffix)} aria-hidden="true" name="accept" class="ui5-checkbox-icon"></${scopeTag("ui5-icon", tags, suffix)}>` : effectiveHtml`<ui5-icon aria-hidden="true" name="accept" class="ui5-checkbox-icon"></ui5-icon>`;
}
function block2$4(context, tags, suffix) {
  return suffix ? effectiveHtml`<${scopeTag("ui5-label", tags, suffix)} part="label" id="${l(this._id)}-label" class="ui5-checkbox-label" wrapping-type="${l(this.wrappingType)}">${l(this.text)}</${scopeTag("ui5-label", tags, suffix)}>` : effectiveHtml`<ui5-label part="label" id="${l(this._id)}-label" class="ui5-checkbox-label" wrapping-type="${l(this.wrappingType)}">${l(this.text)}</ui5-label>`;
}
function block3$2(context, tags, suffix) {
  return effectiveHtml`<span id="${l(this._id)}-descr" class="ui5-hidden-text">${l(this.valueStateText)}</span>`;
}
var __decorate$6 = function(decorators, target, key, desc) {
  var c2 = arguments.length, r = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i2 = decorators.length - 1; i2 >= 0; i2--)
      if (d = decorators[i2])
        r = (c2 < 3 ? d(r) : c2 > 3 ? d(target, key, r) : d(target, key)) || r;
  return c2 > 3 && r && Object.defineProperty(target, key, r), r;
};
var CheckBox_1;
let isGlobalHandlerAttached$1 = false;
let activeCb;
let CheckBox = CheckBox_1 = class CheckBox2 extends UI5Element {
  constructor() {
    super();
    this._deactivate = () => {
      if (activeCb) {
        activeCb.active = false;
      }
    };
    if (!isGlobalHandlerAttached$1) {
      document.addEventListener("mouseup", this._deactivate);
      isGlobalHandlerAttached$1 = true;
    }
  }
  onBeforeRendering() {
    this._enableFormSupport();
  }
  _enableFormSupport() {
    const formSupport = getFeature("FormSupport");
    if (formSupport) {
      formSupport.syncNativeHiddenInput(this, (element, nativeInput) => {
        nativeInput.disabled = !!element.disabled;
        nativeInput.checked = !!element.checked;
        nativeInput.value = element.checked ? "on" : "";
      });
    } else if (this.name) {
      console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`);
    }
  }
  _onclick() {
    this.toggle();
  }
  _onmousedown() {
    if (this.readonly || this.disabled) {
      return;
    }
    this.active = true;
    activeCb = this;
  }
  _onmouseup() {
    this.active = false;
  }
  _onfocusout() {
    this.active = false;
  }
  _onkeydown(e2) {
    if (isSpace(e2)) {
      e2.preventDefault();
      this.active = true;
    }
    if (isEnter(e2)) {
      this.toggle();
      this.active = true;
    }
  }
  _onkeyup(e2) {
    if (isSpace(e2)) {
      this.toggle();
    }
    this.active = false;
  }
  toggle() {
    if (this.canToggle()) {
      const lastState = {
        checked: this.checked,
        indeterminate: this.indeterminate
      };
      if (this.indeterminate) {
        this.indeterminate = false;
        this.checked = true;
      } else {
        this.checked = !this.checked;
      }
      const changePrevented = !this.fireEvent("change", null, true);
      const valueChagnePrevented = !this.fireEvent("value-changed", null, true);
      if (changePrevented || valueChagnePrevented) {
        this.checked = lastState.checked;
        this.indeterminate = lastState.indeterminate;
      }
    }
    return this;
  }
  canToggle() {
    return !(this.disabled || this.readonly);
  }
  valueStateTextMappings() {
    return {
      "Error": CheckBox_1.i18nBundle.getText(VALUE_STATE_ERROR),
      "Warning": CheckBox_1.i18nBundle.getText(VALUE_STATE_WARNING),
      "Success": CheckBox_1.i18nBundle.getText(VALUE_STATE_SUCCESS)
    };
  }
  get ariaLabelText() {
    return getEffectiveAriaLabelText(this);
  }
  get classes() {
    return {
      main: {
        "ui5-checkbox--hoverable": !this.disabled && !this.readonly && isDesktop()
      }
    };
  }
  get ariaReadonly() {
    return this.readonly ? "true" : void 0;
  }
  get effectiveAriaDisabled() {
    return this.disabled ? "true" : void 0;
  }
  get effectiveAriaChecked() {
    return this.indeterminate && this.checked ? "mixed" : this.checked;
  }
  get ariaLabelledBy() {
    if (!this.ariaLabelText) {
      return this.text ? `${this._id}-label` : void 0;
    }
    return void 0;
  }
  get ariaDescribedBy() {
    return this.hasValueState ? `${this._id}-descr` : void 0;
  }
  get hasValueState() {
    return this.valueState !== ValueState$1.None;
  }
  get valueStateText() {
    if (this.valueState !== ValueState$1.None && this.valueState !== ValueState$1.Information) {
      return this.valueStateTextMappings()[this.valueState];
    }
  }
  get effectiveTabIndex() {
    const tabindex = this.getAttribute("tabindex");
    return this.disabled ? void 0 : tabindex || "0";
  }
  get isCompletelyChecked() {
    return this.checked && !this.indeterminate;
  }
  static async onDefine() {
    CheckBox_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
  }
};
__decorate$6([
  property()
], CheckBox.prototype, "accessibleNameRef", void 0);
__decorate$6([
  property()
], CheckBox.prototype, "accessibleName", void 0);
__decorate$6([
  property({ type: Boolean })
], CheckBox.prototype, "disabled", void 0);
__decorate$6([
  property({ type: Boolean })
], CheckBox.prototype, "readonly", void 0);
__decorate$6([
  property({ type: Boolean })
], CheckBox.prototype, "required", void 0);
__decorate$6([
  property({ type: Boolean })
], CheckBox.prototype, "indeterminate", void 0);
__decorate$6([
  property({ type: Boolean })
], CheckBox.prototype, "checked", void 0);
__decorate$6([
  property()
], CheckBox.prototype, "text", void 0);
__decorate$6([
  property({ type: ValueState$1, defaultValue: ValueState$1.None })
], CheckBox.prototype, "valueState", void 0);
__decorate$6([
  property({ type: WrappingType$1, defaultValue: WrappingType$1.None })
], CheckBox.prototype, "wrappingType", void 0);
__decorate$6([
  property()
], CheckBox.prototype, "name", void 0);
__decorate$6([
  property({ type: Boolean })
], CheckBox.prototype, "active", void 0);
__decorate$6([
  slot()
], CheckBox.prototype, "formSupport", void 0);
CheckBox = CheckBox_1 = __decorate$6([
  customElement({
    tag: "ui5-checkbox",
    languageAware: true,
    renderer: litRender,
    template: block0$5,
    styles: styleData$5,
    dependencies: [
      Label$1,
      Icon
    ]
  }),
  event("change")
], CheckBox);
CheckBox.define();
const CheckBox$1 = CheckBox;
class RadioButtonGroup {
  static hasGroup(groupName) {
    return this.groups.has(groupName);
  }
  static getGroup(groupName) {
    return this.groups.get(groupName);
  }
  static getCheckedRadioFromGroup(groupName) {
    return this.checkedRadios.get(groupName);
  }
  static removeGroup(groupName) {
    this.checkedRadios.delete(groupName);
    return this.groups.delete(groupName);
  }
  static addToGroup(radioBtn, groupName) {
    if (this.hasGroup(groupName)) {
      this.enforceSingleSelection(radioBtn, groupName);
      if (this.getGroup(groupName)) {
        this.getGroup(groupName).push(radioBtn);
      }
    } else {
      this.createGroup(radioBtn, groupName);
    }
    this.updateTabOrder(groupName);
  }
  static removeFromGroup(radioBtn, groupName) {
    const group = this.getGroup(groupName);
    if (!group) {
      return;
    }
    const checkedRadio = this.getCheckedRadioFromGroup(groupName);
    group.forEach((_radioBtn, idx, arr) => {
      if (radioBtn._id === _radioBtn._id) {
        return arr.splice(idx, 1);
      }
    });
    if (checkedRadio === radioBtn) {
      this.checkedRadios.set(groupName, null);
    }
    if (!group.length) {
      this.removeGroup(groupName);
    }
    this.updateTabOrder(groupName);
  }
  static createGroup(radioBtn, groupName) {
    if (radioBtn.checked) {
      this.checkedRadios.set(groupName, radioBtn);
    }
    this.groups.set(groupName, [radioBtn]);
  }
  static selectNextItem(item, groupName) {
    const group = this.getGroup(groupName);
    if (!group) {
      return;
    }
    const groupLength = group.length, currentItemPosition = group.indexOf(item);
    if (groupLength <= 1) {
      return;
    }
    const nextItemToSelect = this._nextSelectable(currentItemPosition, group);
    if (!nextItemToSelect) {
      return;
    }
    this.updateSelectionInGroup(nextItemToSelect, groupName);
  }
  static updateFormValidity(groupName) {
    const group = this.getGroup(groupName);
    if (!group) {
      return;
    }
    group.forEach((r) => r._resetFormValidity());
    const groupRequiresValue = group.some((r) => r.required) && group.every((r) => !r.checked);
    if (groupRequiresValue) {
      group[0]._invalidateForm();
    }
  }
  static updateTabOrder(groupName) {
    const group = this.getGroup(groupName);
    if (!group) {
      return;
    }
    const hasCheckedRadio = group.some((radioBtn) => radioBtn.checked);
    group.filter((radioBtn) => !radioBtn.disabled).forEach((radioBtn, idx) => {
      if (hasCheckedRadio) {
        radioBtn._tabIndex = radioBtn.checked ? "0" : "-1";
      } else {
        radioBtn._tabIndex = idx === 0 ? "0" : "-1";
      }
    });
  }
  static selectPreviousItem(item, groupName) {
    const group = this.getGroup(groupName);
    if (!group) {
      return;
    }
    const groupLength = group.length, currentItemPosition = group.indexOf(item);
    if (groupLength <= 1) {
      return;
    }
    const previousItemToSelect = this._previousSelectable(currentItemPosition, group);
    if (!previousItemToSelect) {
      return;
    }
    this.updateSelectionInGroup(previousItemToSelect, groupName);
  }
  static selectItem(item, groupName) {
    this.updateSelectionInGroup(item, groupName);
    this.updateTabOrder(groupName);
  }
  static updateSelectionInGroup(radioBtnToSelect, groupName) {
    const checkedRadio = this.getCheckedRadioFromGroup(groupName);
    if (checkedRadio) {
      this._deselectRadio(checkedRadio);
    }
    this._selectRadio(radioBtnToSelect);
    this.checkedRadios.set(groupName, radioBtnToSelect);
  }
  static _deselectRadio(radioBtn) {
    if (radioBtn) {
      radioBtn.checked = false;
    }
  }
  static _selectRadio(radioBtn) {
    if (radioBtn) {
      radioBtn.focus();
      radioBtn.checked = true;
      radioBtn._checked = true;
      radioBtn.fireEvent("change");
    }
  }
  static _nextSelectable(pos, group) {
    if (!group) {
      return null;
    }
    const groupLength = group.length;
    let nextRadioToSelect = null;
    if (pos === groupLength - 1) {
      if (group[0].disabled || group[0].readonly) {
        return this._nextSelectable(1, group);
      }
      nextRadioToSelect = group[0];
    } else if (group[pos + 1].disabled || group[pos + 1].readonly) {
      return this._nextSelectable(pos + 1, group);
    } else {
      nextRadioToSelect = group[pos + 1];
    }
    return nextRadioToSelect;
  }
  static _previousSelectable(pos, group) {
    const groupLength = group.length;
    let previousRadioToSelect = null;
    if (pos === 0) {
      if (group[groupLength - 1].disabled || group[groupLength - 1].readonly) {
        return this._previousSelectable(groupLength - 1, group);
      }
      previousRadioToSelect = group[groupLength - 1];
    } else if (group[pos - 1].disabled || group[pos - 1].readonly) {
      return this._previousSelectable(pos - 1, group);
    } else {
      previousRadioToSelect = group[pos - 1];
    }
    return previousRadioToSelect;
  }
  static enforceSingleSelection(radioBtn, groupName) {
    const checkedRadio = this.getCheckedRadioFromGroup(groupName);
    if (radioBtn.checked) {
      if (!checkedRadio) {
        this.checkedRadios.set(groupName, radioBtn);
      } else if (radioBtn !== checkedRadio) {
        this._deselectRadio(checkedRadio);
        this.checkedRadios.set(groupName, radioBtn);
      }
    } else if (radioBtn === checkedRadio) {
      this.checkedRadios.set(groupName, null);
    }
    this.updateTabOrder(groupName);
    this.updateFormValidity(groupName);
  }
  static get groups() {
    if (!this._groups) {
      this._groups = /* @__PURE__ */ new Map();
    }
    return this._groups;
  }
  static get checkedRadios() {
    if (!this._checkedRadios) {
      this._checkedRadios = /* @__PURE__ */ new Map();
    }
    return this._checkedRadios;
  }
}
function block0$4(context, tags, suffix) {
  return effectiveHtml`<div class="ui5-radio-root" role="radio" aria-checked="${l(this.checked)}" aria-disabled="${l(this.effectiveAriaDisabled)}" aria-describedby="${l(this.effectiveAriaDescribedBy)}" aria-label="${l(this.ariaLabelText)}" tabindex="${l(this.effectiveTabIndex)}" @click="${this._onclick}" @keydown="${this._onkeydown}" @keyup="${this._onkeyup}" @mousedown="${this._onmousedown}" @mouseup="${this._onmouseup}" @focusout="${this._onfocusout}"><div class='ui5-radio-inner ${o(this.classes.inner)}'><svg class="ui5-radio-svg" focusable="false" aria-hidden="true">${blockSVG1.call(this, context, tags, suffix)}</svg><input type='radio' ?required="${this.required}" ?checked="${this.checked}" ?readonly="${this.readonly}" ?disabled="${this.effectiveAriaDisabled}" name="${l(this.name)}"  data-sap-no-tab-ref/></div>${this.text ? block1$4.call(this, context, tags, suffix) : void 0}${this.hasValueState ? block2$3.call(this, context, tags, suffix) : void 0}<slot name="formSupport"></slot></div>`;
}
function block1$4(context, tags, suffix) {
  return suffix ? effectiveHtml`<${scopeTag("ui5-label", tags, suffix)} id="${l(this._id)}-label" class="ui5-radio-label" for="${l(this._id)}" wrapping-type="${l(this.wrappingType)}">${l(this.text)}</${scopeTag("ui5-label", tags, suffix)}>` : effectiveHtml`<ui5-label id="${l(this._id)}-label" class="ui5-radio-label" for="${l(this._id)}" wrapping-type="${l(this.wrappingType)}">${l(this.text)}</ui5-label>`;
}
function block2$3(context, tags, suffix) {
  return effectiveHtml`<span id="${l(this._id)}-descr" class="ui5-hidden-text">${l(this.valueStateText)}</span>`;
}
function blockSVG1(context, tags, suffix) {
  return effectiveSvg`<circle class="ui5-radio-svg-outer" cx="50%" cy="50%" r="50%" /><circle class="ui5-radio-svg-inner" cx="50%" cy="50%" />`;
}
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$k);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$l);
const styleData$4 = { packageName: "@ui5/webcomponents", fileName: "themes/RadioButton.css.ts", content: `.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host(:not([hidden])){display:inline-block}:host{min-width:var(--_ui5-v1-21-2_radio_button_min_width);max-width:100%;text-overflow:ellipsis;overflow:hidden;color:var(--_ui5-v1-21-2_radio_button_color);border-radius:var(--_ui5-v1-21-2_radio_button_border_radius)}:host(:not([disabled])) .ui5-radio-root{cursor:pointer}:host([checked]){color:var(--_ui5-v1-21-2_radio_button_checked_fill)}:host([checked]) .ui5-radio-svg-inner{fill:var(--_ui5-v1-21-2_radio_button_inner_ring_color)}:host([checked]) .ui5-radio-svg-outer{stroke:var(--_ui5-v1-21-2_radio_button_outer_ring_color)}:host([disabled]) .ui5-radio-root{color:var(--_ui5-v1-21-2_radio_button_color);opacity:var(--sapContent_DisabledOpacity)}:host([disabled][checked]) .ui5-radio-svg-outer{stroke:var(--_ui5-v1-21-2_radio_button_color)}:host(:not([disabled])) .ui5-radio-root:focus:before{content:"";display:var(--_ui5-v1-21-2_radio_button_focus_outline);position:absolute;inset:var(--_ui5-v1-21-2_radio_button_focus_dist);pointer-events:none;border:var(--_ui5-v1-21-2_radio_button_border_width) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);border-radius:var(--_ui5-v1-21-2_radio_button_border_radius)}:host(:not([disabled])) .ui5-radio-root:focus{border-radius:var(--_ui5-v1-21-2_radio_button_border_radius);border:var(--_ui5-v1-21-2_radio_button_focus_border)}:host(:not([value-state="Error"]):not([value-state="Warning"]):not([value-state="Success"]):not([value-state="Information"])) .ui5-radio-root:hover .ui5-radio-inner--hoverable .ui5-radio-svg-outer{stroke:var(--_ui5-v1-21-2_radio_button_outer_ring_hover_color)}:host(:not([value-state="Error"]):not([value-state="Warning"]):not([value-state="Success"]):not([value-state="Information"])[checked]) .ui5-radio-root:hover .ui5-radio-inner--hoverable .ui5-radio-svg-outer{stroke:var(--_ui5-v1-21-2_radio_button_outer_ring_checked_hover_color)}.ui5-radio-root:hover .ui5-radio-inner--hoverable .ui5-radio-svg-outer,:host([checked]) .ui5-radio-root:hover .ui5-radio-inner--hoverable .ui5-radio-svg-outer{fill:var(--_ui5-v1-21-2_radio_button_hover_fill)}:host([active][checked]:not([value-state]):not([disabled]):not([readonly])) .ui5-radio-svg-outer{stroke:var(--_ui5-v1-21-2_radio_button_outer_ring_checked_hover_color)}:host([active]:not([checked]):not([value-state]):not([disabled]):not([readonly])) .ui5-radio-svg-outer{stroke:var(--_ui5-v1-21-2_radio_button_outer_ring_active_color)}:host([text]) .ui5-radio-root{padding-inline-end:var(--_ui5-v1-21-2_radio_button_border_width)}:host([text]) .ui5-radio-root:focus:before{inset-inline-end:0px}:host([text]) .ui5-radio-inner{padding:var(--_ui5-v1-21-2_radio_button_outer_ring_padding_with_label)}:host([checked][readonly]) .ui5-radio-svg-inner{fill:var(--_ui5-v1-21-2_radio_button_read_only_inner_ring_color)}:host([readonly]) .ui5-radio-root .ui5-radio-svg-outer{fill:var(--sapField_ReadOnly_Background);stroke:var(--sapField_ReadOnly_BorderColor);stroke-dasharray:var(--_ui5-v1-21-2_radio_button_read_only_border_type);stroke-width:var(--_ui5-v1-21-2_radio_button_read_only_border_width)}:host([value-state="Error"]) .ui5-radio-svg-outer,:host([value-state="Warning"]) .ui5-radio-svg-outer{stroke-width:var(--sapField_InvalidBorderWidth)}:host([value-state="Information"]) .ui5-radio-svg-outer{stroke-width:var(--_ui5-v1-21-2_radio_button_information_border_width)}:host([value-state="Error"][checked]) .ui5-radio-svg-inner{fill:var(--_ui5-v1-21-2_radio_button_checked_error_fill)}:host([value-state="Error"]) .ui5-radio-svg-outer,:host([value-state="Error"]) .ui5-radio-root:hover .ui5-radio-inner.ui5-radio-inner--hoverable:hover .ui5-radio-svg-outer{stroke:var(--sapField_InvalidColor);fill:var(--sapField_InvalidBackground)}:host([value-state="Error"]) .ui5-radio-root:hover .ui5-radio-inner.ui5-radio-inner--hoverable .ui5-radio-svg-outer{fill:var(--_ui5-v1-21-2_radio_button_hover_fill_error)}:host([value-state="Warning"][checked]) .ui5-radio-svg-inner{fill:var(--_ui5-v1-21-2_radio_button_checked_warning_fill)}:host([value-state="Warning"]) .ui5-radio-svg-outer,:host([value-state="Warning"]) .ui5-radio-root:hover .ui5-radio-inner.ui5-radio-inner--hoverable:hover .ui5-radio-svg-outer{stroke:var(--sapField_WarningColor);fill:var(--sapField_WarningBackground)}:host([value-state="Warning"]) .ui5-radio-root:hover .ui5-radio-inner.ui5-radio-inner--hoverable .ui5-radio-svg-outer{fill:var(--_ui5-v1-21-2_radio_button_hover_fill_warning)}:host([value-state="Success"][checked]) .ui5-radio-svg-inner{fill:var(--_ui5-v1-21-2_radio_button_checked_success_fill)}:host([value-state="Success"]) .ui5-radio-svg-outer,:host([value-state="Success"]) .ui5-radio-root:hover .ui5-radio-inner.ui5-radio-inner--hoverable:hover .ui5-radio-svg-outer{stroke:var(--sapField_SuccessColor);fill:var(--sapField_SuccessBackground)}:host([value-state="Success"]) .ui5-radio-root:hover .ui5-radio-inner.ui5-radio-inner--hoverable .ui5-radio-svg-outer{fill:var(--_ui5-v1-21-2_radio_button_hover_fill_success)}:host([value-state="Information"][checked]) .ui5-radio-svg-inner{fill:var(--_ui5-v1-21-2_radio_button_checked_information_fill)}:host([value-state="Information"]) .ui5-radio-svg-outer,:host([value-state="Information"]) .ui5-radio-root:hover .ui5-radio-inner.ui5-radio-inner--hoverable:hover .ui5-radio-svg-outer{stroke:var(--sapField_InformationColor);fill:var(--sapField_InformationBackground)}:host([value-state="Information"]) .ui5-radio-root:hover .ui5-radio-inner.ui5-radio-inner--hoverable .ui5-radio-svg-outer{fill:var(--_ui5-v1-21-2_radio_button_hover_fill_information)}:host([value-state="Error"]) .ui5-radio-root,:host([value-state="Warning"]) .ui5-radio-root,:host([value-state="Information"]) .ui5-radio-root{stroke-dasharray:var(--_ui5-v1-21-2_radio_button_warning_error_border_dash)}.ui5-radio-root{height:var(--_ui5-v1-21-2_radio_button_height);position:relative;display:inline-flex;flex-wrap:nowrap;outline:none;max-width:100%;box-sizing:border-box;border:var(--_ui5-v1-21-2_radio_button_border);border-radius:var(--_ui5-v1-21-2_radio_button_border_radius)}.ui5-radio-inner{display:flex;align-items:center;padding:var(--_ui5-v1-21-2_radio_button_outer_ring_padding);flex-shrink:0;height:var(--_ui5-v1-21-2_radio_button_inner_size);font-size:1rem;pointer-events:none;vertical-align:top}.ui5-radio-inner{outline:none}.ui5-radio-inner input{-webkit-appearance:none;visibility:hidden;width:0;left:0;position:absolute;font-size:inherit;margin:0}[ui5-label].ui5-radio-label{display:flex;align-items:center;padding-inline-end:var(--_ui5-v1-21-2_radio_button_label_offset);vertical-align:top;max-width:100%;text-overflow:ellipsis;overflow:hidden;pointer-events:none;color:var(--_ui5-v1-21-2_radio_button_label_color)}:host([wrapping-type="Normal"][text]) .ui5-radio-root{height:auto}:host([wrapping-type="Normal"][text]) [ui5-label].ui5-radio-label{padding:var(--_ui5-v1-21-2_radio_button_label_side_padding) 0;overflow-wrap:break-word}.ui5-radio-svg{height:var(--_ui5-v1-21-2_radio_button_svg_size);width:var(--_ui5-v1-21-2_radio_button_svg_size);overflow:visible;pointer-events:none}.ui5-radio-svg-outer{fill:var(--_ui5-v1-21-2_radio_button_outer_ring_bg);stroke:currentColor;stroke-width:var(--_ui5-v1-21-2_radio_button_outer_ring_width)}.ui5-radio-svg-inner{fill:none;r:var(--_ui5-v1-21-2_radio_button_inner_ring_radius)}.ui5-radio-svg-outer,.ui5-radio-svg-inner{flex-shrink:0}:host(.ui5-li-singlesel-radiobtn) .ui5-radio-root .ui5-radio-inner .ui5-radio-svg-outer{fill:var(--sapList_Background)}
` };
var __decorate$5 = function(decorators, target, key, desc) {
  var c2 = arguments.length, r = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i2 = decorators.length - 1; i2 >= 0; i2--)
      if (d = decorators[i2])
        r = (c2 < 3 ? d(r) : c2 > 3 ? d(target, key, r) : d(target, key)) || r;
  return c2 > 3 && r && Object.defineProperty(target, key, r), r;
};
var RadioButton_1;
let isGlobalHandlerAttached = false;
let activeRadio;
let RadioButton = RadioButton_1 = class RadioButton2 extends UI5Element {
  static get formAssociated() {
    return true;
  }
  constructor() {
    super();
    this._internals = this.attachInternals();
    this._deactivate = () => {
      if (activeRadio) {
        activeRadio.active = false;
      }
    };
    if (!isGlobalHandlerAttached) {
      document.addEventListener("mouseup", this._deactivate);
      isGlobalHandlerAttached = true;
    }
  }
  static async onDefine() {
    RadioButton_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
  }
  onBeforeRendering() {
    this.syncGroup();
    this._enableFormSupport();
  }
  onExitDOM() {
    this.syncGroup(true);
  }
  syncGroup(forceRemove) {
    const oldGroup = this._name;
    const currentGroup = this.name;
    const oldChecked = this._checked;
    const currentChecked = this.checked;
    if (forceRemove) {
      RadioButtonGroup.removeFromGroup(this, oldGroup);
    }
    if (currentGroup !== oldGroup) {
      if (oldGroup) {
        RadioButtonGroup.removeFromGroup(this, oldGroup);
      }
      if (currentGroup) {
        RadioButtonGroup.addToGroup(this, currentGroup);
      }
    } else if (currentGroup) {
      RadioButtonGroup.enforceSingleSelection(this, currentGroup);
    }
    if (this.name && currentChecked !== oldChecked) {
      RadioButtonGroup.updateTabOrder(this.name);
    }
    this._name = this.name;
    this._checked = this.checked;
  }
  _enableFormSupport() {
    const formSupport = getFeature("FormSupport");
    if (formSupport) {
      this._setFormValue();
    } else if (this.value) {
      console.warn(`In order for the "value" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`);
    }
  }
  _setFormValue() {
    this._internals.setFormValue(this.checked ? this.value : null);
  }
  _resetFormValidity() {
    this._internals.setValidity({});
  }
  _invalidateForm() {
    this._internals.setValidity({ valueMissing: true }, this.radioButtonGroupRequiredText, this.shadowRoot.firstElementChild);
  }
  _onclick() {
    return this.toggle();
  }
  _handleDown(e2) {
    const currentGroup = this.name;
    if (!currentGroup) {
      return;
    }
    e2.preventDefault();
    RadioButtonGroup.selectNextItem(this, currentGroup);
  }
  _handleUp(e2) {
    const currentGroup = this.name;
    if (!currentGroup) {
      return;
    }
    e2.preventDefault();
    RadioButtonGroup.selectPreviousItem(this, currentGroup);
  }
  _onkeydown(e2) {
    if (isSpace(e2)) {
      this.active = true;
      return e2.preventDefault();
    }
    if (isEnter(e2)) {
      this.active = true;
      return this.toggle();
    }
    const isRTL = this.effectiveDir === "rtl";
    if (isDown(e2) || !isRTL && isRight(e2) || isRTL && isLeft(e2)) {
      this._handleDown(e2);
    }
    if (isUp(e2) || !isRTL && isLeft(e2) || isRTL && isRight(e2)) {
      this._handleUp(e2);
    }
  }
  _onkeyup(e2) {
    if (isSpace(e2)) {
      this.toggle();
    }
    this.active = false;
  }
  _onmousedown() {
    this.active = true;
    activeRadio = this;
  }
  _onmouseup() {
    this.active = false;
  }
  _onfocusout() {
    this.active = false;
  }
  toggle() {
    if (!this.canToggle()) {
      return this;
    }
    if (!this.name) {
      this.checked = !this.checked;
      this.fireEvent("change");
      return this;
    }
    RadioButtonGroup.selectItem(this, this.name);
    return this;
  }
  canToggle() {
    return !(this.disabled || this.readonly || this.checked);
  }
  get classes() {
    return {
      inner: {
        "ui5-radio-inner--hoverable": !this.disabled && !this.readonly && isDesktop()
      }
    };
  }
  get effectiveAriaDisabled() {
    return this.disabled ? "true" : null;
  }
  get ariaLabelText() {
    return [getEffectiveAriaLabelText(this), this.text].filter(Boolean).join(" ");
  }
  get effectiveAriaDescribedBy() {
    return this.hasValueState ? `${this._id}-descr` : void 0;
  }
  get hasValueState() {
    return this.valueState !== ValueState$1.None;
  }
  get valueStateText() {
    switch (this.valueState) {
      case ValueState$1.Error:
        return RadioButton_1.i18nBundle.getText(VALUE_STATE_ERROR);
      case ValueState$1.Warning:
        return RadioButton_1.i18nBundle.getText(VALUE_STATE_WARNING);
      case ValueState$1.Success:
        return RadioButton_1.i18nBundle.getText(VALUE_STATE_SUCCESS);
      case ValueState$1.Information:
        return RadioButton_1.i18nBundle.getText(VALUE_STATE_INFORMATION);
      default:
        return "";
    }
  }
  get radioButtonGroupRequiredText() {
    return RadioButton_1.i18nBundle.getText(RADIO_BUTTON_GROUP_REQUIRED);
  }
  get effectiveTabIndex() {
    const tabindex = this.getAttribute("tabindex");
    if (this.disabled) {
      return "-1";
    }
    if (this.name) {
      return this._tabIndex;
    }
    return tabindex || "0";
  }
  get strokeWidth() {
    return this.valueState === "None" ? "1" : "2";
  }
};
__decorate$5([
  property({ type: Boolean })
], RadioButton.prototype, "disabled", void 0);
__decorate$5([
  property({ type: Boolean })
], RadioButton.prototype, "readonly", void 0);
__decorate$5([
  property({ type: Boolean })
], RadioButton.prototype, "required", void 0);
__decorate$5([
  property({ type: Boolean })
], RadioButton.prototype, "checked", void 0);
__decorate$5([
  property()
], RadioButton.prototype, "text", void 0);
__decorate$5([
  property({ type: ValueState$1, defaultValue: ValueState$1.None })
], RadioButton.prototype, "valueState", void 0);
__decorate$5([
  property()
], RadioButton.prototype, "name", void 0);
__decorate$5([
  property()
], RadioButton.prototype, "value", void 0);
__decorate$5([
  property({ type: WrappingType$1, defaultValue: WrappingType$1.None })
], RadioButton.prototype, "wrappingType", void 0);
__decorate$5([
  property()
], RadioButton.prototype, "accessibleName", void 0);
__decorate$5([
  property()
], RadioButton.prototype, "accessibleNameRef", void 0);
__decorate$5([
  property({ defaultValue: "-1", noAttribute: true })
], RadioButton.prototype, "_tabIndex", void 0);
__decorate$5([
  property({ type: Boolean })
], RadioButton.prototype, "active", void 0);
__decorate$5([
  slot()
], RadioButton.prototype, "formSupport", void 0);
RadioButton = RadioButton_1 = __decorate$5([
  customElement({
    tag: "ui5-radio-button",
    languageAware: true,
    renderer: litRender,
    template: block0$4,
    styles: styleData$4,
    dependencies: [Label$1]
  }),
  event("change")
], RadioButton);
RadioButton.define();
const RadioButton$1 = RadioButton;
var __decorate$4 = function(decorators, target, key, desc) {
  var c2 = arguments.length, r = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i2 = decorators.length - 1; i2 >= 0; i2--)
      if (d = decorators[i2])
        r = (c2 < 3 ? d(r) : c2 > 3 ? d(target, key, r) : d(target, key)) || r;
  return c2 > 3 && r && Object.defineProperty(target, key, r), r;
};
var List_1;
const INFINITE_SCROLL_DEBOUNCE_RATE = 250;
const PAGE_UP_DOWN_SIZE = 10;
let List = List_1 = class List2 extends UI5Element {
  static async onDefine() {
    List_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
  }
  constructor() {
    super();
    this._previouslyFocusedItem = null;
    this._forwardingFocus = false;
    this.resizeListenerAttached = false;
    this.listEndObserved = false;
    this._itemNavigation = new ItemNavigation(this, {
      skipItemsSize: PAGE_UP_DOWN_SIZE,
      navigationMode: NavigationMode$1.Vertical,
      getItemsCallback: () => this.getEnabledItems()
    });
    this._handleResize = this.checkListInViewport.bind(this);
    this._handleResize = this.checkListInViewport.bind(this);
    this.initialIntersection = true;
  }
  onExitDOM() {
    this.unobserveListEnd();
    this.resizeListenerAttached = false;
    ResizeHandler.deregister(this.getDomRef(), this._handleResize);
  }
  onBeforeRendering() {
    this.prepareListItems();
  }
  onAfterRendering() {
    if (this.growsOnScroll) {
      this.observeListEnd();
    } else if (this.listEndObserved) {
      this.unobserveListEnd();
    }
    if (this.grows) {
      this.checkListInViewport();
      this.attachForResize();
    }
  }
  attachForResize() {
    if (!this.resizeListenerAttached) {
      this.resizeListenerAttached = true;
      ResizeHandler.register(this.getDomRef(), this._handleResize);
    }
  }
  get shouldRenderH1() {
    return !this.header.length && this.headerText;
  }
  get headerID() {
    return `${this._id}-header`;
  }
  get modeLabelID() {
    return `${this._id}-modeLabel`;
  }
  get listEndDOM() {
    return this.shadowRoot.querySelector(".ui5-list-end-marker");
  }
  get hasData() {
    return this.getItems().length !== 0;
  }
  get showNoDataText() {
    return !this.hasData && this.noDataText;
  }
  get isDelete() {
    return this.mode === ListMode$1.Delete;
  }
  get isSingleSelect() {
    return [
      ListMode$1.SingleSelect,
      ListMode$1.SingleSelectBegin,
      ListMode$1.SingleSelectEnd,
      ListMode$1.SingleSelectAuto
    ].includes(this.mode);
  }
  get isMultiSelect() {
    return this.mode === ListMode$1.MultiSelect;
  }
  get ariaLabelledBy() {
    if (this.accessibleNameRef || this.accessibleName) {
      return void 0;
    }
    const ids = [];
    if (this.isMultiSelect || this.isSingleSelect || this.isDelete) {
      ids.push(this.modeLabelID);
    }
    if (this.shouldRenderH1) {
      ids.push(this.headerID);
    }
    return ids.length ? ids.join(" ") : void 0;
  }
  get ariaLabelTxt() {
    return getEffectiveAriaLabelText(this);
  }
  get ariaLabelModeText() {
    if (this.hasData) {
      if (this.isMultiSelect) {
        return List_1.i18nBundle.getText(ARIA_LABEL_LIST_MULTISELECTABLE);
      }
      if (this.isSingleSelect) {
        return List_1.i18nBundle.getText(ARIA_LABEL_LIST_SELECTABLE);
      }
      if (this.isDelete) {
        return List_1.i18nBundle.getText(ARIA_LABEL_LIST_DELETABLE);
      }
    }
    return "";
  }
  get grows() {
    return this.growing !== ListGrowingMode$1.None;
  }
  get growsOnScroll() {
    return this.growing === ListGrowingMode$1.Scroll;
  }
  get growsWithButton() {
    return this.growing === ListGrowingMode$1.Button;
  }
  get _growingButtonText() {
    return List_1.i18nBundle.getText(LOAD_MORE_TEXT);
  }
  get busyIndPosition() {
    if (!this.grows) {
      return "absolute";
    }
    return this._inViewport ? "absolute" : "sticky";
  }
  get styles() {
    return {
      busyInd: {
        position: this.busyIndPosition
      }
    };
  }
  get classes() {
    return {
      root: {
        "ui5-list-root": true,
        "ui5-content-native-scrollbars": getEffectiveScrollbarStyle()
      }
    };
  }
  prepareListItems() {
    const slottedItems = this.getItemsForProcessing();
    slottedItems.forEach((item, key) => {
      const isLastChild = key === slottedItems.length - 1;
      const showBottomBorder = this.separators === ListSeparators$1.All || this.separators === ListSeparators$1.Inner && !isLastChild;
      if (item.hasConfigurableMode) {
        item._mode = this.mode;
      }
      item.hasBorder = showBottomBorder;
    });
  }
  async observeListEnd() {
    if (!this.listEndObserved) {
      await renderFinished();
      this.getIntersectionObserver().observe(this.listEndDOM);
      this.listEndObserved = true;
    }
  }
  unobserveListEnd() {
    if (this.growingIntersectionObserver) {
      this.growingIntersectionObserver.disconnect();
      this.growingIntersectionObserver = null;
      this.listEndObserved = false;
    }
  }
  onInteresection(entries) {
    if (this.initialIntersection) {
      this.initialIntersection = false;
      return;
    }
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        debounce(this.loadMore.bind(this), INFINITE_SCROLL_DEBOUNCE_RATE);
      }
    });
  }
  /*
  * ITEM SELECTION BASED ON THE CURRENT MODE
  */
  onSelectionRequested(e2) {
    const previouslySelectedItems = this.getSelectedItems();
    let selectionChange = false;
    this._selectionRequested = true;
    if (this.mode !== ListMode$1.None && this[`handle${this.mode}`]) {
      selectionChange = this[`handle${this.mode}`](e2.detail.item, !!e2.detail.selected);
    }
    if (selectionChange) {
      const changePrevented = !this.fireEvent("selection-change", {
        selectedItems: this.getSelectedItems(),
        previouslySelectedItems,
        selectionComponentPressed: e2.detail.selectionComponentPressed,
        targetItem: e2.detail.item,
        key: e2.detail.key
      }, true);
      if (changePrevented) {
        this._revertSelection(previouslySelectedItems);
      }
    }
  }
  handleSingleSelect(item) {
    if (item.selected) {
      return false;
    }
    this.deselectSelectedItems();
    item.selected = true;
    return true;
  }
  handleSingleSelectBegin(item) {
    return this.handleSingleSelect(item);
  }
  handleSingleSelectEnd(item) {
    return this.handleSingleSelect(item);
  }
  handleSingleSelectAuto(item) {
    return this.handleSingleSelect(item);
  }
  handleMultiSelect(item, selected) {
    item.selected = selected;
    return true;
  }
  handleDelete(item) {
    this.fireEvent("item-delete", { item });
    return true;
  }
  deselectSelectedItems() {
    this.getSelectedItems().forEach((item) => {
      item.selected = false;
    });
  }
  getSelectedItems() {
    return this.getItems().filter((item) => item.selected);
  }
  getEnabledItems() {
    return this.getItems().filter((item) => !item.disabled);
  }
  getItems() {
    return this.getSlottedNodes("items");
  }
  getItemsForProcessing() {
    return this.getItems();
  }
  _revertSelection(previouslySelectedItems) {
    this.getItems().forEach((item) => {
      const oldSelection = previouslySelectedItems.indexOf(item) !== -1;
      const multiSelectCheckBox = item.shadowRoot.querySelector(".ui5-li-multisel-cb");
      const singleSelectRadioButton = item.shadowRoot.querySelector(".ui5-li-singlesel-radiobtn");
      item.selected = oldSelection;
      if (multiSelectCheckBox) {
        multiSelectCheckBox.checked = oldSelection;
      } else if (singleSelectRadioButton) {
        singleSelectRadioButton.checked = oldSelection;
      }
    });
  }
  _onkeydown(e2) {
    if (isTabNext(e2)) {
      this._handleTabNext(e2);
    }
  }
  _onLoadMoreKeydown(e2) {
    if (isSpace(e2)) {
      e2.preventDefault();
      this._loadMoreActive = true;
    }
    if (isEnter(e2)) {
      this._onLoadMoreClick();
      this._loadMoreActive = true;
    }
    if (isTabNext(e2)) {
      this.focusAfterElement();
    }
    if (isTabPrevious(e2)) {
      if (this.getPreviouslyFocusedItem()) {
        this.focusPreviouslyFocusedItem();
      } else {
        this.focusFirstItem();
      }
      e2.preventDefault();
    }
  }
  _onLoadMoreKeyup(e2) {
    if (isSpace(e2)) {
      this._onLoadMoreClick();
    }
    this._loadMoreActive = false;
  }
  _onLoadMoreMousedown() {
    this._loadMoreActive = true;
  }
  _onLoadMoreMouseup() {
    this._loadMoreActive = false;
  }
  _onLoadMoreClick() {
    this.loadMore();
  }
  checkListInViewport() {
    this._inViewport = isElementInView(this.getDomRef());
  }
  loadMore() {
    this.fireEvent("load-more");
  }
  /*
  * KEYBOARD SUPPORT
  */
  _handleTabNext(e2) {
    getNormalizedTarget(e2.target);
    {
      return;
    }
  }
  _onfocusin(e2) {
    const target = getNormalizedTarget(e2.target);
    if (!this.isForwardElement(target)) {
      e2.stopImmediatePropagation();
      return;
    }
    if (!this.getPreviouslyFocusedItem()) {
      if (this.growsWithButton && this.isForwardAfterElement(target)) {
        this.focusGrowingButton();
      } else {
        this.focusFirstItem();
      }
      e2.stopImmediatePropagation();
      return;
    }
    if (!this.getForwardingFocus()) {
      if (this.growsWithButton && this.isForwardAfterElement(target)) {
        this.focusGrowingButton();
        e2.stopImmediatePropagation();
        return;
      }
      this.focusPreviouslyFocusedItem();
      e2.stopImmediatePropagation();
    }
    this.setForwardingFocus(false);
  }
  isForwardElement(element) {
    const elementId = element.id;
    const beforeElement = this.getBeforeElement();
    if (this._id === elementId || beforeElement && beforeElement.id === elementId) {
      return true;
    }
    return this.isForwardAfterElement(element);
  }
  isForwardAfterElement(element) {
    const elementId = element.id;
    const afterElement = this.getAfterElement();
    return afterElement && afterElement.id === elementId;
  }
  onItemTabIndexChange(e2) {
    const target = e2.target;
    this._itemNavigation.setCurrentItem(target);
  }
  onItemFocused(e2) {
    const target = e2.target;
    e2.stopPropagation();
    this._itemNavigation.setCurrentItem(target);
    this.fireEvent("item-focused", { item: target });
    if (this.mode === ListMode$1.SingleSelectAuto) {
      const detail = {
        item: target,
        selectionComponentPressed: false,
        selected: true,
        key: e2.detail.key
      };
      this.onSelectionRequested({ detail });
    }
  }
  onItemPress(e2) {
    const pressedItem = e2.detail.item;
    if (!this.fireEvent("item-click", { item: pressedItem }, true)) {
      return;
    }
    if (!this._selectionRequested && this.mode !== ListMode$1.Delete) {
      this._selectionRequested = true;
      const detail = {
        item: pressedItem,
        selectionComponentPressed: false,
        selected: !pressedItem.selected,
        key: e2.detail.key
      };
      this.onSelectionRequested({ detail });
    }
    this._selectionRequested = false;
  }
  // This is applicable to NotificationListItem
  onItemClose(e2) {
    var _a;
    const target = e2.target;
    const shouldFireItemClose = (target == null ? void 0 : target.hasAttribute("ui5-li-notification")) || (target == null ? void 0 : target.hasAttribute("ui5-li-notification-group"));
    if (shouldFireItemClose) {
      this.fireEvent("item-close", { item: (_a = e2.detail) == null ? void 0 : _a.item });
    }
  }
  onItemToggle(e2) {
    this.fireEvent("item-toggle", { item: e2.detail.item });
  }
  onForwardBefore(e2) {
    this.setPreviouslyFocusedItem(e2.target);
    this.focusBeforeElement();
    e2.stopPropagation();
  }
  onForwardAfter(e2) {
    this.setPreviouslyFocusedItem(e2.target);
    if (!this.growsWithButton) {
      this.focusAfterElement();
    } else {
      this.focusGrowingButton();
      e2.preventDefault();
    }
    e2.stopPropagation();
  }
  focusBeforeElement() {
    this.setForwardingFocus(true);
    this.getBeforeElement().focus();
  }
  focusAfterElement() {
    this.setForwardingFocus(true);
    this.getAfterElement().focus();
  }
  focusGrowingButton() {
    const growingBtn = this.getGrowingButton();
    if (growingBtn) {
      growingBtn.focus();
    }
  }
  getGrowingButton() {
    return this.shadowRoot.querySelector(`[id="${this._id}-growing-btn"]`);
  }
  /**
   * Focuses the first list item and sets its tabindex to "0" via the ItemNavigation
   * @protected
   */
  focusFirstItem() {
    const firstItem = this.getFirstItem((x) => !x.disabled);
    if (firstItem) {
      firstItem.focus();
    }
  }
  focusPreviouslyFocusedItem() {
    const previouslyFocusedItem = this.getPreviouslyFocusedItem();
    if (previouslyFocusedItem) {
      previouslyFocusedItem.focus();
    }
  }
  focusFirstSelectedItem() {
    const firstSelectedItem = this.getFirstItem((x) => x.selected && !x.disabled);
    if (firstSelectedItem) {
      firstSelectedItem.focus();
    }
  }
  /**
   * Focuses a list item and sets its tabindex to "0" via the ItemNavigation
   * @protected
   * @param item
   */
  focusItem(item) {
    this._itemNavigation.setCurrentItem(item);
    item.focus();
  }
  onFocusRequested(e2) {
    setTimeout(() => {
      this.setPreviouslyFocusedItem(e2.target);
      this.focusPreviouslyFocusedItem();
    }, 0);
  }
  setForwardingFocus(forwardingFocus) {
    this._forwardingFocus = forwardingFocus;
  }
  getForwardingFocus() {
    return this._forwardingFocus;
  }
  setPreviouslyFocusedItem(item) {
    this._previouslyFocusedItem = item;
  }
  getPreviouslyFocusedItem() {
    return this._previouslyFocusedItem;
  }
  getFirstItem(filter) {
    const slottedItems = this.getItems();
    let firstItem = null;
    if (!filter) {
      return slottedItems.length ? slottedItems[0] : null;
    }
    for (let i2 = 0; i2 < slottedItems.length; i2++) {
      if (filter(slottedItems[i2])) {
        firstItem = slottedItems[i2];
        break;
      }
    }
    return firstItem;
  }
  getAfterElement() {
    if (!this._afterElement) {
      this._afterElement = this.shadowRoot.querySelector(`[id="${this._id}-after"]`);
    }
    return this._afterElement;
  }
  getBeforeElement() {
    if (!this._beforeElement) {
      this._beforeElement = this.shadowRoot.querySelector(`[id="${this._id}-before"]`);
    }
    return this._beforeElement;
  }
  getIntersectionObserver() {
    if (!this.growingIntersectionObserver) {
      this.growingIntersectionObserver = new IntersectionObserver(this.onInteresection.bind(this), {
        root: null,
        rootMargin: "0px",
        threshold: 1
      });
    }
    return this.growingIntersectionObserver;
  }
};
__decorate$4([
  property()
], List.prototype, "headerText", void 0);
__decorate$4([
  property()
], List.prototype, "footerText", void 0);
__decorate$4([
  property({ type: Boolean })
], List.prototype, "indent", void 0);
__decorate$4([
  property({ type: ListMode$1, defaultValue: ListMode$1.None })
], List.prototype, "mode", void 0);
__decorate$4([
  property()
], List.prototype, "noDataText", void 0);
__decorate$4([
  property({ type: ListSeparators$1, defaultValue: ListSeparators$1.All })
], List.prototype, "separators", void 0);
__decorate$4([
  property({ type: ListGrowingMode$1, defaultValue: ListGrowingMode$1.None })
], List.prototype, "growing", void 0);
__decorate$4([
  property({ type: Boolean })
], List.prototype, "busy", void 0);
__decorate$4([
  property({ validator: Integer, defaultValue: 1e3 })
], List.prototype, "busyDelay", void 0);
__decorate$4([
  property()
], List.prototype, "accessibleName", void 0);
__decorate$4([
  property({ defaultValue: "" })
], List.prototype, "accessibleNameRef", void 0);
__decorate$4([
  property({ defaultValue: "list" })
], List.prototype, "accessibleRole", void 0);
__decorate$4([
  property({ defaultValue: void 0, noAttribute: true })
], List.prototype, "accessibleRoleDescription", void 0);
__decorate$4([
  property({ type: Boolean })
], List.prototype, "_inViewport", void 0);
__decorate$4([
  property({ type: Boolean })
], List.prototype, "_loadMoreActive", void 0);
__decorate$4([
  slot({ type: HTMLElement, "default": true })
], List.prototype, "items", void 0);
__decorate$4([
  slot()
], List.prototype, "header", void 0);
List = List_1 = __decorate$4([
  customElement({
    tag: "ui5-list",
    fastNavigation: true,
    renderer: litRender,
    template: block0$6,
    styles: [styleData$e, styleData$6],
    dependencies: [BusyIndicator$1]
  }),
  event("item-click", {
    detail: {
      item: { type: HTMLElement }
    }
  }),
  event("item-close", {
    detail: {
      item: { type: HTMLElement }
    }
  }),
  event("item-toggle", {
    detail: {
      item: { type: HTMLElement }
    }
  }),
  event("item-delete", {
    detail: {
      item: { type: HTMLElement }
    }
  }),
  event("selection-change", {
    detail: {
      selectedItems: { type: Array },
      previouslySelectedItems: { type: Array },
      targetItem: { type: HTMLElement },
      selectionComponentPressed: { type: Boolean }
      // protected, indicates if the user used the selection components to change the selection
    }
  }),
  event("load-more"),
  event("item-focused", {
    detail: {
      item: { type: HTMLElement }
    }
  })
], List);
List.define();
const List$1 = List;
const name$7 = "edit";
const pathData$7 = "M475 104q5 7 5 12 0 6-5 11L150 453q-4 4-8 4L32 480l22-110q0-5 4-9L384 36q4-4 11-4t11 4zm-121 99l-46-45L84 381l46 46zm87-88l-46-44-64 64 45 45z";
const ltr$7 = false;
const collection$7 = "SAP-icons-v4";
const packageName$7 = "@ui5/webcomponents-icons";
registerIcon(name$7, { pathData: pathData$7, ltr: ltr$7, collection: collection$7, packageName: packageName$7 });
const name$6 = "edit";
const pathData$6 = "M505 94q7 7 7 18t-6 17L130 505q-7 7-18 7H26q-11 0-18.5-7.5T0 486v-86q1-10 6-16L382 7q7-7 18-7t18 7zm-55 18l-50-50-50 50 50 50zm-86 86l-50-50L62 400l50 50z";
const ltr$6 = false;
const collection$6 = "SAP-icons-v5";
const packageName$6 = "@ui5/webcomponents-icons";
registerIcon(name$6, { pathData: pathData$6, ltr: ltr$6, collection: collection$6, packageName: packageName$6 });
isLegacyThemeFamily() ? pathData$7 : pathData$6;
var ListItemType;
(function(ListItemType2) {
  ListItemType2["Inactive"] = "Inactive";
  ListItemType2["Active"] = "Active";
  ListItemType2["Detail"] = "Detail";
  ListItemType2["Navigation"] = "Navigation";
})(ListItemType || (ListItemType = {}));
const ListItemType$1 = ListItemType;
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$k);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$l);
const styleData$3 = { packageName: "@ui5/webcomponents", fileName: "themes/ListItem.css.ts", content: `.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host([actionable]:not([disabled])){cursor:pointer}:host([selected][actionable]:not([active]):hover){background:var(--sapList_Hover_SelectionBackground)}:host([active][actionable]),:host([selected][active][actionable]){background:var(--sapList_Active_Background)}:host([actionable]:not([active]):not([selected]):hover){background:var(--sapList_Hover_Background)}:host([active][actionable]) .ui5-li-root.ui5-li--focusable:focus,:host([active][actionable]) .ui5-li-root.ui5-li--focusable .ui5-li-content:focus{outline-color:var(--sapContent_ContrastFocusColor)}:host([navigated]) .ui5-li-root .ui5-li-navigated{width:.1875rem;position:absolute;right:0;top:0;bottom:0;background-color:var(--sapList_SelectionBorderColor)}:host([active][actionable]) .ui5-li-root .ui5-li-icon{color:var(--sapList_Active_TextColor)}:host([active][actionable]) .ui5-li-title,:host([active][actionable]) .ui5-li-desc,:host([active][actionable]) .ui5-li-additional-text{color:var(--sapList_Active_TextColor)}:host([additional-text-state="Warning"]) .ui5-li-additional-text{color:var(--sapCriticalTextColor)}:host([additional-text-state="Success"]) .ui5-li-additional-text{color:var(--sapPositiveTextColor)}:host([additional-text-state="Error"]) .ui5-li-additional-text{color:var(--sapNegativeTextColor)}:host([additional-text-state="Information"]) .ui5-li-additional-text{color:var(--sapInformativeTextColor)}:host([has-title][description]){height:5rem}:host([has-title][image]){height:5rem}:host([_has-image-content]){height:5rem}:host([image]) .ui5-li-content{height:3rem}:host([description]) .ui5-li-root{padding:1rem}:host([description]) .ui5-li-content{height:3rem}:host([has-title][description]) .ui5-li-title{padding-bottom:.375rem}.ui5-li-text-wrapper{display:flex;flex-direction:column;flex:auto;min-width:1px;line-height:normal}:host([description]) .ui5-li-text-wrapper{height:100%;justify-content:space-between;padding:.125rem 0}.ui5-li-description-info-wrapper{display:flex;justify-content:space-between}.ui5-li-title{color:var(--sapList_TextColor);font-size:var(--_ui5-v1-21-2_list_item_title_size)}.ui5-li-additional-text,:host(:not([wrapping-type="Normal"])) .ui5-li-title,.ui5-li-desc{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host([wrapping-type="Normal"]){height:auto}:host([wrapping-type="Normal"]) .ui5-li-content{margin:var(--_ui5-v1-21-2_list_item_content_vertical_offset) 0}.ui5-li-desc{color:var(--sapContent_LabelColor);font-size:var(--sapFontSize)}.ui5-li-additional-text{margin:0 .25rem;color:var(--sapNeutralTextColor);font-size:var(--sapFontSize);min-width:3.75rem;text-align:end}:host([description]) .ui5-li-additional-text{align-self:flex-end}.ui5-li-img{width:var(--_ui5-v1-21-2_list_item_img_size);height:var(--_ui5-v1-21-2_list_item_img_size);border-radius:var(--ui5-v1-21-2-avatar-border-radius)}.ui5-li-img,.ui5-li-imgContent{min-width:var(--_ui5-v1-21-2_list_item_img_size);min-height:var(--_ui5-v1-21-2_list_item_img_size);margin-top:var(--_ui5-v1-21-2_list_item_img_top_margin);margin-bottom:var(--_ui5-v1-21-2_list_item_img_bottom_margin);margin-inline-end:var(--_ui5-v1-21-2_list_item_img_hn_margin)}.ui5-li-img-inner{object-fit:contain}.ui5-li-icon{min-width:var(--_ui5-v1-21-2_list_item_icon_size);min-height:var(--_ui5-v1-21-2_list_item_icon_size);color:var(--sapContent_NonInteractiveIconColor);padding-inline-end:var(--_ui5-v1-21-2_list_item_icon_padding-inline-end)}.ui5-li-content{display:flex;align-items:center;flex:auto;overflow:hidden}.ui5-li-detailbtn,.ui5-li-deletebtn{display:flex;align-items:center;margin-left:var(--_ui5-v1-21-2_list_buttons_left_space)}.ui5-li-multisel-cb,.ui5-li-singlesel-radiobtn{flex-shrink:0}:host([description]) .ui5-li-singlesel-radiobtn{align-self:flex-start;margin-top:var(--_ui5-v1-21-2_list_item_selection_btn_margin_top)}:host([description]) .ui5-li-multisel-cb{align-self:flex-start;margin-top:var(--_ui5-v1-21-2_list_item_selection_btn_margin_top)}:host([_mode="SingleSelectBegin"]) .ui5-li-root{padding-inline:0 1rem}:host([_mode="MultiSelect"]) .ui5-li-root{padding-inline:0 1rem}:host([_mode="SingleSelectEnd"]) .ui5-li-root{padding-inline:1rem 0}:host [ui5-checkbox].ui5-li-singlesel-radiobtn{margin-right:var(--_ui5-v1-21-2_list_item_cb_margin_right)}
` };
var HasPopup;
(function(HasPopup2) {
  HasPopup2["Dialog"] = "Dialog";
  HasPopup2["Grid"] = "Grid";
  HasPopup2["ListBox"] = "ListBox";
  HasPopup2["Menu"] = "Menu";
  HasPopup2["Tree"] = "Tree";
})(HasPopup || (HasPopup = {}));
const HasPopup$1 = HasPopup;
const name$5 = "slim-arrow-right";
const pathData$5 = "M357.5 233q10 10 10 23t-10 23l-165 165q-12 11-23 0t0-23l160-159q6-6 0-12l-159-159q-5-5-5-11t5-11 11-5 11 5z";
const ltr$5 = false;
const collection$5 = "SAP-icons-v4";
const packageName$5 = "@ui5/webcomponents-icons";
registerIcon(name$5, { pathData: pathData$5, ltr: ltr$5, collection: collection$5, packageName: packageName$5 });
const name$4 = "slim-arrow-right";
const pathData$4 = "M186 416q-11 0-18.5-7.5T160 390q0-10 8-18l121-116-121-116q-8-8-8-18 0-11 7.5-18.5T186 96q10 0 17 7l141 134q8 8 8 19 0 12-8 18L203 409q-7 7-17 7z";
const ltr$4 = false;
const collection$4 = "SAP-icons-v5";
const packageName$4 = "@ui5/webcomponents-icons";
registerIcon(name$4, { pathData: pathData$4, ltr: ltr$4, collection: collection$4, packageName: packageName$4 });
isLegacyThemeFamily() ? pathData$5 : pathData$4;
var __decorate$3 = function(decorators, target, key, desc) {
  var c2 = arguments.length, r = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i2 = decorators.length - 1; i2 >= 0; i2--)
      if (d = decorators[i2])
        r = (c2 < 3 ? d(r) : c2 > 3 ? d(target, key, r) : d(target, key)) || r;
  return c2 > 3 && r && Object.defineProperty(target, key, r), r;
};
var ListItem_1;
let ListItem = ListItem_1 = class ListItem2 extends ListItemBase$1 {
  constructor() {
    super();
    this.deactivateByKey = (e2) => {
      if (isEnter(e2)) {
        this.deactivate();
      }
    };
    this.deactivate = () => {
      if (this.active) {
        this.active = false;
      }
    };
    const handleTouchStartEvent = (e2) => {
      this._onmousedown(e2);
    };
    this._ontouchstart = {
      handleEvent: handleTouchStartEvent,
      passive: true
    };
  }
  onBeforeRendering() {
    this.actionable = (this.type === ListItemType$1.Active || this.type === ListItemType$1.Navigation) && this._mode !== ListMode$1.Delete;
  }
  onEnterDOM() {
    document.addEventListener("mouseup", this.deactivate);
    document.addEventListener("touchend", this.deactivate);
    document.addEventListener("keyup", this.deactivateByKey);
  }
  onExitDOM() {
    document.removeEventListener("mouseup", this.deactivate);
    document.removeEventListener("keyup", this.deactivateByKey);
    document.removeEventListener("touchend", this.deactivate);
  }
  _onkeydown(e2) {
    super._onkeydown(e2);
    const itemActive = this.type === ListItemType$1.Active, itemNavigated = this.typeNavigation;
    if (isSpace(e2)) {
      e2.preventDefault();
    }
    if ((isSpace(e2) || isEnter(e2)) && (itemActive || itemNavigated)) {
      this.activate();
    }
    if (isEnter(e2)) {
      this.fireItemPress(e2);
    }
  }
  _onkeyup(e2) {
    if (isSpace(e2) || isEnter(e2)) {
      this.deactivate();
    }
    if (isSpace(e2)) {
      this.fireItemPress(e2);
    }
    if (this.modeDelete && isDelete(e2)) {
      this.onDelete();
    }
  }
  _onmousedown(e2) {
    if (getEventMark(e2) === "button") {
      return;
    }
    this.activate();
  }
  _onmouseup(e2) {
    if (getEventMark(e2) === "button") {
      return;
    }
    this.deactivate();
  }
  _ontouchend(e2) {
    this._onmouseup(e2);
  }
  _onfocusout() {
    super._onfocusout();
    this.deactivate();
  }
  _onclick(e2) {
    if (getEventMark(e2) === "button") {
      return;
    }
    this.fireItemPress(e2);
  }
  /*
   * Called when selection components in Single (ui5-radio-button)
   * and Multi (ui5-checkbox) selection modes are used.
   */
  onMultiSelectionComponentPress(e2) {
    if (this.isInactive) {
      return;
    }
    this.fireEvent("_selection-requested", { item: this, selected: e2.target.checked, selectionComponentPressed: true });
  }
  onSingleSelectionComponentPress(e2) {
    if (this.isInactive) {
      return;
    }
    this.fireEvent("_selection-requested", { item: this, selected: !e2.target.checked, selectionComponentPressed: true });
  }
  activate() {
    if (this.type === ListItemType$1.Active || this.type === ListItemType$1.Navigation) {
      this.active = true;
    }
  }
  onDelete() {
    this.fireEvent("_selection-requested", { item: this, selectionComponentPressed: false });
  }
  onDetailClick() {
    this.fireEvent("detail-click", { item: this, selected: this.selected });
  }
  fireItemPress(e2) {
    if (this.isInactive) {
      return;
    }
    if (isEnter(e2)) {
      e2.preventDefault();
    }
    this.fireEvent("_press", { item: this, selected: this.selected, key: e2.key });
  }
  get isInactive() {
    return this.type === ListItemType$1.Inactive || this.type === ListItemType$1.Detail;
  }
  get placeSelectionElementBefore() {
    return this._mode === ListMode$1.MultiSelect || this._mode === ListMode$1.SingleSelectBegin;
  }
  get placeSelectionElementAfter() {
    return !this.placeSelectionElementBefore && (this._mode === ListMode$1.SingleSelectEnd || this._mode === ListMode$1.Delete);
  }
  get modeSingleSelect() {
    return [
      ListMode$1.SingleSelectBegin,
      ListMode$1.SingleSelectEnd,
      ListMode$1.SingleSelect
    ].includes(this._mode);
  }
  get modeMultiSelect() {
    return this._mode === ListMode$1.MultiSelect;
  }
  get modeDelete() {
    return this._mode === ListMode$1.Delete;
  }
  /**
   * Used in UploadCollectionItem
   */
  get renderDeleteButton() {
    return this.modeDelete;
  }
  /**
   * End
   */
  get typeDetail() {
    return this.type === ListItemType$1.Detail;
  }
  get typeNavigation() {
    return this.type === ListItemType$1.Navigation;
  }
  get typeActive() {
    return this.type === ListItemType$1.Active;
  }
  get _ariaSelected() {
    if (this.modeMultiSelect || this.modeSingleSelect) {
      return this.selected;
    }
    return void 0;
  }
  get ariaSelectedText() {
    let ariaSelectedText;
    if (this._ariaSelected !== void 0) {
      ariaSelectedText = this._ariaSelected ? ListItem_1.i18nBundle.getText(LIST_ITEM_SELECTED) : ListItem_1.i18nBundle.getText(LIST_ITEM_NOT_SELECTED);
    }
    return ariaSelectedText;
  }
  get deleteText() {
    return ListItem_1.i18nBundle.getText(DELETE);
  }
  get hasDeleteButtonSlot() {
    return !!this.deleteButton.length;
  }
  get _accessibleNameRef() {
    if (this.accessibleName) {
      return `${this._id}-invisibleText`;
    }
    return `${this._id}-content ${this._id}-invisibleText`;
  }
  get _accInfo() {
    return {
      role: this.accessibleRole || this.role,
      ariaExpanded: void 0,
      ariaLevel: this._level || void 0,
      ariaLabel: ListItem_1.i18nBundle.getText(ARIA_LABEL_LIST_ITEM_CHECKBOX),
      ariaLabelRadioButton: ListItem_1.i18nBundle.getText(ARIA_LABEL_LIST_ITEM_RADIO_BUTTON),
      ariaSelectedText: this.ariaSelectedText,
      ariaHaspopup: this.ariaHaspopup || void 0,
      setsize: this.accessibilityAttributes.ariaSetsize,
      posinset: this.accessibilityAttributes.ariaPosinset
    };
  }
  get hasConfigurableMode() {
    return true;
  }
  static async onDefine() {
    ListItem_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
  }
};
__decorate$3([
  property({ type: ListItemType$1, defaultValue: ListItemType$1.Active })
], ListItem.prototype, "type", void 0);
__decorate$3([
  property({ type: Object })
], ListItem.prototype, "accessibilityAttributes", void 0);
__decorate$3([
  property({ type: Boolean })
], ListItem.prototype, "navigated", void 0);
__decorate$3([
  property({ type: Boolean })
], ListItem.prototype, "active", void 0);
__decorate$3([
  property()
], ListItem.prototype, "title", void 0);
__decorate$3([
  property({ type: Boolean })
], ListItem.prototype, "actionable", void 0);
__decorate$3([
  property({ defaultValue: "listitem" })
], ListItem.prototype, "role", void 0);
__decorate$3([
  property({ defaultValue: void 0, noAttribute: true })
], ListItem.prototype, "accessibleRoleDescription", void 0);
__decorate$3([
  property()
], ListItem.prototype, "accessibleRole", void 0);
__decorate$3([
  property({ type: ListMode$1, defaultValue: ListMode$1.None })
], ListItem.prototype, "_mode", void 0);
__decorate$3([
  property({ type: HasPopup$1, noAttribute: true })
], ListItem.prototype, "ariaHaspopup", void 0);
__decorate$3([
  property({ type: Integer })
], ListItem.prototype, "_level", void 0);
__decorate$3([
  property({ type: Boolean, noAttribute: true })
], ListItem.prototype, "disableDeleteButton", void 0);
__decorate$3([
  slot()
], ListItem.prototype, "deleteButton", void 0);
ListItem = ListItem_1 = __decorate$3([
  customElement({
    languageAware: true,
    styles: [ListItemBase$1.styles, styleData$3],
    dependencies: [
      Button,
      RadioButton$1,
      CheckBox$1
    ]
  }),
  event("detail-click"),
  event("_press"),
  event("_focused"),
  event("_selection-requested")
], ListItem);
const ListItem$1 = ListItem;
function block0$3(context, tags, suffix) {
  return effectiveHtml`<div class="ui5-avatar-root" tabindex="${l(this.tabindex)}" data-sap-focus-ref @keyup=${this._onkeyup} @keydown=${this._onkeydown} @focusout=${this._onfocusout} @focusin=${this._onfocusin} @click=${this._onclick} role="${l(this._role)}" aria-haspopup="${l(this._ariaHasPopup)}" aria-label="${l(this.accessibleNameText)}" fallback-icon="${l(this._fallbackIcon)}">${this.hasImage ? block1$3.call(this, context, tags, suffix) : block2$2.call(this, context, tags, suffix)}<slot name="badge"></slot></div>`;
}
function block1$3(context, tags, suffix) {
  return effectiveHtml`<slot></slot>`;
}
function block2$2(context, tags, suffix) {
  return effectiveHtml`${this.icon ? block3$1.call(this, context, tags, suffix) : void 0}${this.initials ? block4$1.call(this, context, tags, suffix) : void 0}`;
}
function block3$1(context, tags, suffix) {
  return suffix ? effectiveHtml`<${scopeTag("ui5-icon", tags, suffix)} class="ui5-avatar-icon" name="${l(this.icon)}"></${scopeTag("ui5-icon", tags, suffix)}>` : effectiveHtml`<ui5-icon class="ui5-avatar-icon" name="${l(this.icon)}"></ui5-icon>`;
}
function block4$1(context, tags, suffix) {
  return suffix ? effectiveHtml`<span class="ui5-avatar-initials">${l(this.validInitials)}</span><${scopeTag("ui5-icon", tags, suffix)} class="ui5-avatar-icon ui5-avatar-icon-fallback" name="${l(this.fallbackIcon)}"></${scopeTag("ui5-icon", tags, suffix)}>` : effectiveHtml`<span class="ui5-avatar-initials">${l(this.validInitials)}</span><ui5-icon class="ui5-avatar-icon ui5-avatar-icon-fallback" name="${l(this.fallbackIcon)}"></ui5-icon>`;
}
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$k);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$l);
const styleData$2 = { packageName: "@ui5/webcomponents", fileName: "themes/Avatar.css.ts", content: `:host(:not([hidden])){display:inline-block;box-sizing:border-box;position:relative}:host(:not([hidden]).ui5_hovered){opacity:.7}:host(:is([interactive]):not([disabled])){cursor:pointer}:host(:is([interactive][pressed]):not([hidden])){background:var(--sapButton_Active_Background);border-color:var(--sapButton_Active_BorderColor);color:var(--sapButton_Active_TextColor)}:host(:is([interactive][pressed]):not([hidden]):hover){background:var(--sapButton_Selected_Hover_Background);border-color:var(--sapButton_Selected_Hover_BorderColor);color:var(--sapButton_Selected_TextColor)}:host(:is([interactive]):not([hidden]):not([pressed]):not([disabled]):hover){box-shadow:var(--ui5-v1-21-2-avatar-hover-box-shadow-offset)}:host(:is([interactive][focused]):not([hidden]):not([pressed])){outline:var(--_ui5-v1-21-2_avatar_outline);outline-offset:var(--_ui5-v1-21-2_avatar_focus_offset)}:host(:is([disabled])){opacity:var(--sapContent_DisabledOpacity)}:host{height:3rem;width:3rem;border-radius:50%;border:var(--ui5-v1-21-2-avatar-initials-border);outline:none;color:var(--ui5-v1-21-2-avatar-initials-color)}.ui5-avatar-root{display:flex;align-items:center;justify-content:center;outline:none;height:100%;width:100%}:host([_size="XS"]),:host([size="XS"]){height:2rem;width:2rem;min-height:2rem;min-width:2rem;font-size:var(--_ui5-v1-21-2_avatar_fontsize_XS)}:host([_size="S"]),:host([size="S"]){min-height:3rem;min-width:3rem;font-size:var(--_ui5-v1-21-2_avatar_fontsize_S)}:host([_size="M"]),:host([size="M"]){min-height:4rem;min-width:4rem;font-size:var(--_ui5-v1-21-2_avatar_fontsize_M)}:host([_size="L"]),:host([size="L"]){min-height:5rem;min-width:5rem;font-size:var(--_ui5-v1-21-2_avatar_fontsize_L)}:host([_size="XL"]),:host([size="XL"]){min-height:7rem;min-width:7rem;font-size:var(--_ui5-v1-21-2_avatar_fontsize_XL)}:host .ui5-avatar-icon{height:var(--_ui5-v1-21-2_avatar_fontsize_S);width:var(--_ui5-v1-21-2_avatar_fontsize_S);color:inherit}:host([_size="XS"]) .ui5-avatar-icon,:host([size="XS"]) .ui5-avatar-icon{height:var(--_ui5-v1-21-2_avatar_icon_XS);width:var(--_ui5-v1-21-2_avatar_icon_XS)}:host([_size="S"]) .ui5-avatar-icon,:host([size="S"]) .ui5-avatar-icon{height:var(--_ui5-v1-21-2_avatar_icon_S);width:var(--_ui5-v1-21-2_avatar_icon_S)}:host([_size="M"]) .ui5-avatar-icon,:host([size="M"]) .ui5-avatar-icon{height:var(--_ui5-v1-21-2_avatar_icon_M);width:var(--_ui5-v1-21-2_avatar_icon_M)}:host([_size="L"]) .ui5-avatar-icon,:host([size="L"]) .ui5-avatar-icon{height:var(--_ui5-v1-21-2_avatar_icon_L);width:var(--_ui5-v1-21-2_avatar_icon_L)}:host([_size="XL"]) .ui5-avatar-icon,:host([size="XL"]) .ui5-avatar-icon{height:var(--_ui5-v1-21-2_avatar_icon_XL);width:var(--_ui5-v1-21-2_avatar_icon_XL)}::slotted(*){border-radius:50%;width:100%;height:100%;pointer-events:none}:host([shape="Square"]){border-radius:var(--ui5-v1-21-2-avatar-border-radius)}:host([shape="Square"]) ::slotted(*){border-radius:calc(var(--ui5-v1-21-2-avatar-border-radius) - var(--ui5-v1-21-2-avatar-border-radius-img-deduction))}:host(:not([color-scheme])),:host(:not([_has-image])),:host([_color-scheme="Accent6"]),:host([ui5-avatar][color-scheme="Accent6"]){background-color:var(--ui5-v1-21-2-avatar-accent6);color:var(--ui5-v1-21-2-avatar-accent6-color);border-color:var(--ui5-v1-21-2-avatar-accent6-border-color)}:host([_color-scheme="Accent1"]),:host([ui5-avatar][color-scheme="Accent1"]){background-color:var(--ui5-v1-21-2-avatar-accent1);color:var(--ui5-v1-21-2-avatar-accent1-color);border-color:var(--ui5-v1-21-2-avatar-accent1-border-color)}:host([_color-scheme="Accent2"]),:host([ui5-avatar][color-scheme="Accent2"]){background-color:var(--ui5-v1-21-2-avatar-accent2);color:var(--ui5-v1-21-2-avatar-accent2-color);border-color:var(--ui5-v1-21-2-avatar-accent2-border-color)}:host([_color-scheme="Accent3"]),:host([ui5-avatar][color-scheme="Accent3"]){background-color:var(--ui5-v1-21-2-avatar-accent3);color:var(--ui5-v1-21-2-avatar-accent3-color);border-color:var(--ui5-v1-21-2-avatar-accent3-border-color)}:host([_color-scheme="Accent4"]),:host([ui5-avatar][color-scheme="Accent4"]){background-color:var(--ui5-v1-21-2-avatar-accent4);color:var(--ui5-v1-21-2-avatar-accent4-color);border-color:var(--ui5-v1-21-2-avatar-accent4-border-color)}:host([_color-scheme="Accent5"]),:host([ui5-avatar][color-scheme="Accent5"]){background-color:var(--ui5-v1-21-2-avatar-accent5);color:var(--ui5-v1-21-2-avatar-accent5-color);border-color:var(--ui5-v1-21-2-avatar-accent5-border-color)}:host([_color-scheme="Accent7"]),:host([ui5-avatar][color-scheme="Accent7"]){background-color:var(--ui5-v1-21-2-avatar-accent7);color:var(--ui5-v1-21-2-avatar-accent7-color);border-color:var(--ui5-v1-21-2-avatar-accent7-border-color)}:host([_color-scheme="Accent8"]),:host([ui5-avatar][color-scheme="Accent8"]){background-color:var(--ui5-v1-21-2-avatar-accent8);color:var(--ui5-v1-21-2-avatar-accent8-color);border-color:var(--ui5-v1-21-2-avatar-accent8-border-color)}:host([_color-scheme="Accent9"]),:host([ui5-avatar][color-scheme="Accent9"]){background-color:var(--ui5-v1-21-2-avatar-accent9);color:var(--ui5-v1-21-2-avatar-accent9-color);border-color:var(--ui5-v1-21-2-avatar-accent9-border-color)}:host([_color-scheme="Accent10"]),:host([ui5-avatar][color-scheme="Accent10"]){background-color:var(--ui5-v1-21-2-avatar-accent10);color:var(--ui5-v1-21-2-avatar-accent10-color);border-color:var(--ui5-v1-21-2-avatar-accent10-border-color)}:host([_color-scheme="Placeholder"]),:host([ui5-avatar][color-scheme="Placeholder"]){background-color:var(--ui5-v1-21-2-avatar-placeholder);color:var(--ui5-v1-21-2-avatar-placeholder-color);border-color:var(--ui5-v1-21-2-avatar-placeholder-border-color)}:host([_has-image]){color:var(--ui5-v1-21-2-avatar-accent10-color);background-color:transparent;vertical-align:middle}.ui5-avatar-initials{color:inherit}.ui5-avatar-icon~.ui5-avatar-initials,.ui5-avatar-icon~.ui5-avatar-icon-fallback{display:none}.ui5-avatar-initials:not(.ui5-avatar-initials-hidden)+.ui5-avatar-icon-fallback{display:none}.ui5-avatar-initials-hidden{position:absolute;visibility:hidden;z-index:0;pointer-events:none}::slotted([slot="badge"]){position:absolute;bottom:0;right:0;width:1.125rem;height:1.125rem;background:var(--sapButton_Emphasized_Background);border:var(--sapButton_Emphasized_Background);border-radius:1rem;color:var(--sapContent_BadgeTextColor);justify-content:center;font-family:"72override",var(--sapFontFamily);font-size:var(--sapFontSmallSize)}::slotted([ui5-badge][slot="badge"]){padding:.1875rem}:host([_size="L"]) ::slotted([slot="badge"]),:host([size="L"]) ::slotted([slot="badge"]){width:1.25rem;height:1.25rem}:host([_size="XL"]) ::slotted([slot="badge"]),:host([size="XL"]) ::slotted([slot="badge"]){padding:.375rem;width:1.75rem;height:1.75rem}:host([shape="Square"]) ::slotted([slot="badge"]){bottom:-.125rem;right:-.125rem}:host([_size="L"][shape="Square"]) ::slotted([slot="badge"]),:host([size="L"][shape="Square"]) ::slotted([slot="badge"]){bottom:-.1875rem;right:-.1875rem}:host([_size="XL"][shape="Square"]) ::slotted([slot="badge"]),:host([size="XL"][shape="Square"]) ::slotted([slot="badge"]){bottom:-.25rem;right:-.25rem}
` };
var AvatarSize;
(function(AvatarSize2) {
  AvatarSize2["XS"] = "XS";
  AvatarSize2["S"] = "S";
  AvatarSize2["M"] = "M";
  AvatarSize2["L"] = "L";
  AvatarSize2["XL"] = "XL";
})(AvatarSize || (AvatarSize = {}));
const AvatarSize$1 = AvatarSize;
var AvatarShape;
(function(AvatarShape2) {
  AvatarShape2["Circle"] = "Circle";
  AvatarShape2["Square"] = "Square";
})(AvatarShape || (AvatarShape = {}));
const AvatarShape$1 = AvatarShape;
var AvatarColorScheme;
(function(AvatarColorScheme2) {
  AvatarColorScheme2["Accent1"] = "Accent1";
  AvatarColorScheme2["Accent2"] = "Accent2";
  AvatarColorScheme2["Accent3"] = "Accent3";
  AvatarColorScheme2["Accent4"] = "Accent4";
  AvatarColorScheme2["Accent5"] = "Accent5";
  AvatarColorScheme2["Accent6"] = "Accent6";
  AvatarColorScheme2["Accent7"] = "Accent7";
  AvatarColorScheme2["Accent8"] = "Accent8";
  AvatarColorScheme2["Accent9"] = "Accent9";
  AvatarColorScheme2["Accent10"] = "Accent10";
  AvatarColorScheme2["Placeholder"] = "Placeholder";
})(AvatarColorScheme || (AvatarColorScheme = {}));
const AvatarColorScheme$1 = AvatarColorScheme;
const name$3 = "employee";
const pathData$3 = "M448 512H64V384q0-26 10-49.5t27.5-41T142 266t50-10h64q-27 0-50-10t-40.5-27.5T138 178t-10-50q0-26 10-49.5t27.5-41T206 10t50-10q26 0 49.5 10t41 27.5 27.5 41 10 49.5q0 27-10 50t-27.5 40.5-41 27.5-49.5 10h64q26 0 49.5 10t41 27.5 27.5 41 10 49.5v128zM96 384v96h320v-96q0-40-28-68t-68-28H192q-40 0-68 28t-28 68zm160-160q40 0 68-28t28-68-28-68-68-28-68 28-28 68 28 68 68 28zm32 192v-32h96v32h-96z";
const ltr$3 = false;
const collection$3 = "SAP-icons-v4";
const packageName$3 = "@ui5/webcomponents-icons";
registerIcon(name$3, { pathData: pathData$3, ltr: ltr$3, collection: collection$3, packageName: packageName$3 });
const name$2 = "employee";
const pathData$2 = "M342 255q48 23 77 67.5t29 99.5v32q0 11-7.5 18.5T422 480H90q-11 0-18.5-7.5T64 454v-32q0-55 29-99.5t77-67.5l-4-5q-19-17-28.5-40.5T128 160q0-27 10-50t27.5-40.5 41-27.5T256 32t49.5 10.5 41 28T374 111t10 49q0 27-11 52t-31 43zm-163-95q0 32 22.5 54.5T256 237t54.5-22.5T333 160t-22.5-54.5T256 83t-54.5 22.5T179 160zm51 181l-25-15q-13-7-13-19v-6q-34 17-55.5 49T115 422v7h115v-88zm167 81q0-40-21-72t-56-49v6q0 12-13 19l-26 15v88h116v-7zm-71-70q11 0 18.5 7.5T352 378t-7.5 18-18.5 7h-12q-11 0-18.5-7t-7.5-18 7.5-18.5T314 352h12z";
const ltr$2 = false;
const collection$2 = "SAP-icons-v5";
const packageName$2 = "@ui5/webcomponents-icons";
registerIcon(name$2, { pathData: pathData$2, ltr: ltr$2, collection: collection$2, packageName: packageName$2 });
isLegacyThemeFamily() ? pathData$3 : pathData$2;
var __decorate$2 = function(decorators, target, key, desc) {
  var c2 = arguments.length, r = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i2 = decorators.length - 1; i2 >= 0; i2--)
      if (d = decorators[i2])
        r = (c2 < 3 ? d(r) : c2 > 3 ? d(target, key, r) : d(target, key)) || r;
  return c2 > 3 && r && Object.defineProperty(target, key, r), r;
};
var Avatar_1;
let Avatar = Avatar_1 = class Avatar2 extends UI5Element {
  constructor() {
    super();
    this._handleResizeBound = this.handleResize.bind(this);
  }
  static async onDefine() {
    Avatar_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
  }
  get tabindex() {
    return this._tabIndex || (this._interactive ? "0" : "-1");
  }
  /**
   * Returns the effective avatar size.
   * @readonly
   * @type {string}
   * @defaultValue "S"
   * @private
   */
  get _effectiveSize() {
    return this.getAttribute("size") || this._size;
  }
  /**
   * Returns the effective background color.
   * @readonly
   * @type {string}
   * @defaultValue "Accent6"
   * @private
   */
  get _effectiveBackgroundColor() {
    return this.getAttribute("color-scheme") || this._colorScheme;
  }
  get _role() {
    return this._interactive ? "button" : "img";
  }
  get _ariaHasPopup() {
    return this._getAriaHasPopup();
  }
  get _fallbackIcon() {
    if (this.fallbackIcon === "") {
      this.fallbackIcon = "employee";
    }
    return this.fallbackIcon;
  }
  get _interactive() {
    return this.interactive && !this.disabled;
  }
  get validInitials() {
    const validInitials = /^[a-zA-Zà-üÀ-Ü]{1,3}$/, areInitialsValid = this.initials && validInitials.test(this.initials);
    if (areInitialsValid) {
      return this.initials;
    }
    return null;
  }
  get accessibleNameText() {
    if (this.accessibleName) {
      return this.accessibleName;
    }
    return Avatar_1.i18nBundle.getText(AVATAR_TOOLTIP) || void 0;
  }
  get hasImage() {
    this._hasImage = !!this.image.length;
    return this._hasImage;
  }
  get initialsContainer() {
    return this.getDomRef().querySelector(".ui5-avatar-initials");
  }
  onBeforeRendering() {
    this._onclick = this._interactive ? this._onClickHandler.bind(this) : void 0;
  }
  async onAfterRendering() {
    await renderFinished();
    if (this.initials && !this.icon) {
      this._checkInitials();
    }
  }
  onEnterDOM() {
    this.initialsContainer && ResizeHandler.register(this.initialsContainer, this._handleResizeBound);
  }
  onExitDOM() {
    this.initialsContainer && ResizeHandler.deregister(this.initialsContainer, this._handleResizeBound);
  }
  handleResize() {
    if (this.initials && !this.icon) {
      this._checkInitials();
    }
  }
  _checkInitials() {
    const avatar = this.getDomRef(), avatarInitials = avatar.querySelector(".ui5-avatar-initials");
    if (!this.validInitials) {
      avatarInitials.classList.add("ui5-avatar-initials-hidden");
      return;
    }
    avatarInitials && avatarInitials.classList.remove("ui5-avatar-initials-hidden");
    if (this.initials && this.initials.length === 3) {
      if (avatarInitials && avatarInitials.scrollWidth > avatar.scrollWidth) {
        avatarInitials.classList.add("ui5-avatar-initials-hidden");
      }
    }
  }
  _onClickHandler(e2) {
    e2.stopPropagation();
    this._fireClick();
  }
  _onkeydown(e2) {
    if (!this._interactive) {
      return;
    }
    if (isEnter(e2)) {
      this._fireClick();
    }
    if (isSpace(e2)) {
      e2.preventDefault();
    }
  }
  _onkeyup(e2) {
    if (this._interactive && !e2.shiftKey && isSpace(e2)) {
      this._fireClick();
    }
  }
  _fireClick() {
    this.fireEvent("click");
    this.pressed = !this.pressed;
  }
  _onfocusout() {
    this.focused = false;
  }
  _onfocusin() {
    if (this._interactive) {
      this.focused = true;
    }
  }
  _getAriaHasPopup() {
    if (!this._interactive || this.ariaHaspopup === "") {
      return;
    }
    return this.ariaHaspopup;
  }
};
__decorate$2([
  property({ type: Boolean })
], Avatar.prototype, "disabled", void 0);
__decorate$2([
  property({ type: Boolean })
], Avatar.prototype, "interactive", void 0);
__decorate$2([
  property({ type: Boolean })
], Avatar.prototype, "focused", void 0);
__decorate$2([
  property({ type: Boolean })
], Avatar.prototype, "pressed", void 0);
__decorate$2([
  property()
], Avatar.prototype, "icon", void 0);
__decorate$2([
  property()
], Avatar.prototype, "fallbackIcon", void 0);
__decorate$2([
  property()
], Avatar.prototype, "initials", void 0);
__decorate$2([
  property({ type: AvatarShape$1, defaultValue: AvatarShape$1.Circle })
], Avatar.prototype, "shape", void 0);
__decorate$2([
  property({ type: AvatarSize$1, defaultValue: AvatarSize$1.S })
], Avatar.prototype, "size", void 0);
__decorate$2([
  property({ type: AvatarSize$1, defaultValue: AvatarSize$1.S })
], Avatar.prototype, "_size", void 0);
__decorate$2([
  property({ type: AvatarColorScheme$1, defaultValue: AvatarColorScheme$1.Accent6 })
], Avatar.prototype, "colorScheme", void 0);
__decorate$2([
  property({ type: AvatarColorScheme$1, defaultValue: AvatarColorScheme$1.Accent6 })
], Avatar.prototype, "_colorScheme", void 0);
__decorate$2([
  property()
], Avatar.prototype, "accessibleName", void 0);
__decorate$2([
  property()
], Avatar.prototype, "ariaHaspopup", void 0);
__decorate$2([
  property({ noAttribute: true })
], Avatar.prototype, "_tabIndex", void 0);
__decorate$2([
  property({ type: Boolean })
], Avatar.prototype, "_hasImage", void 0);
__decorate$2([
  slot({ type: HTMLElement, "default": true })
], Avatar.prototype, "image", void 0);
__decorate$2([
  slot()
], Avatar.prototype, "badge", void 0);
Avatar = Avatar_1 = __decorate$2([
  customElement({
    tag: "ui5-avatar",
    languageAware: true,
    renderer: litRender,
    styles: styleData$2,
    template: block0$3,
    dependencies: [Icon]
  }),
  event("click")
], Avatar);
Avatar.define();
const Avatar$1 = Avatar;
function block0$2(context, tags, suffix) {
  return effectiveHtml`<li part="native-li" data-sap-focus-ref tabindex="${l(this._effectiveTabIndex)}" class="${o(this.classes.main)}" @focusin="${this._onfocusin}" @focusout="${this._onfocusout}" @keyup="${this._onkeyup}" @keydown="${this._onkeydown}" @mouseup="${this._onmouseup}" @mousedown="${this._onmousedown}" @touchstart="${this._ontouchstart}" @touchend="${this._ontouchend}" @click="${this._onclick}" role="${l(this._accInfo.role)}" aria-expanded="${l(this._accInfo.ariaExpanded)}" title="${l(this.title)}" aria-level="${l(this._accInfo.ariaLevel)}" aria-haspopup="${l(this._accInfo.ariaHaspopup)}" aria-posinset="${l(this._accInfo.posinset)}" aria-roledescription="${l(this.accessibleRoleDescription)}" aria-setsize="${l(this._accInfo.setsize)}" aria-describedby="${l(this._id)}-invisibleText-describedby" aria-labelledby="${l(this._accessibleNameRef)}" aria-disabled="${l(this._ariaDisabled)}" aria-selected="${l(this._accInfo.ariaSelected)}" aria-checked="${l(this._accInfo.ariaChecked)}" aria-owns="${l(this._accInfo.ariaOwns)}">${this.placeSelectionElementBefore ? block1$2.call(this, context, tags, suffix) : void 0}<div part="content" id="${l(this._id)}-content" class="ui5-li-content">${this.hasImageContent ? block7.call(this, context, tags, suffix) : block8.call(this, context, tags, suffix)}${this.displayIconBegin ? block10.call(this, context, tags, suffix) : void 0}<div class="ui5-li-text-wrapper"><span part="title" class="ui5-li-title"><slot></slot></span>${this.description ? block11.call(this, context, tags, suffix) : void 0}${!this.typeActive ? block13.call(this, context, tags, suffix) : void 0}</div>${!this.description ? block14.call(this, context, tags, suffix) : void 0}</div>${this.displayIconEnd ? block16.call(this, context, tags, suffix) : void 0}${this.typeDetail ? block17.call(this, context, tags, suffix) : void 0}${this.typeNavigation ? block18.call(this, context, tags, suffix) : void 0}${this.navigated ? block19.call(this, context, tags, suffix) : void 0}${this.placeSelectionElementAfter ? block20.call(this, context, tags, suffix) : void 0}<span id="${l(this._id)}-invisibleText" class="ui5-hidden-text">${l(this._accInfo.listItemAriaLabel)}${l(this.accessibleName)}</span><span id="${l(this._id)}-invisibleText-describedby" class="ui5-hidden-text">${l(this._accInfo.ariaSelectedText)}</span></li> `;
}
function block1$2(context, tags, suffix) {
  return effectiveHtml`${this.modeSingleSelect ? block2$1.call(this, context, tags, suffix) : void 0}${this.modeMultiSelect ? block3.call(this, context, tags, suffix) : void 0}${this.renderDeleteButton ? block4.call(this, context, tags, suffix) : void 0}`;
}
function block2$1(context, tags, suffix) {
  return suffix ? effectiveHtml`<${scopeTag("ui5-radio-button", tags, suffix)} part="radio" ?disabled="${this.isInactive}" accessible-name="${l(this._accInfo.ariaLabelRadioButton)}" tabindex="-1" id="${l(this._id)}-singleSelectionElement" class="ui5-li-singlesel-radiobtn" ?checked="${this.selected}" @click="${this.onSingleSelectionComponentPress}"></${scopeTag("ui5-radio-button", tags, suffix)}>` : effectiveHtml`<ui5-radio-button part="radio" ?disabled="${this.isInactive}" accessible-name="${l(this._accInfo.ariaLabelRadioButton)}" tabindex="-1" id="${l(this._id)}-singleSelectionElement" class="ui5-li-singlesel-radiobtn" ?checked="${this.selected}" @click="${this.onSingleSelectionComponentPress}"></ui5-radio-button>`;
}
function block3(context, tags, suffix) {
  return suffix ? effectiveHtml`<${scopeTag("ui5-checkbox", tags, suffix)} part="checkbox" ?disabled="${this.isInactive}" ?indeterminate=${this.indeterminate} tabindex="-1" id="${l(this._id)}-multiSelectionElement" class="ui5-li-multisel-cb" ?checked="${this.selected}" accessible-name="${l(this._accInfo.ariaLabel)}" @click="${this.onMultiSelectionComponentPress}"></${scopeTag("ui5-checkbox", tags, suffix)}>` : effectiveHtml`<ui5-checkbox part="checkbox" ?disabled="${this.isInactive}" ?indeterminate=${this.indeterminate} tabindex="-1" id="${l(this._id)}-multiSelectionElement" class="ui5-li-multisel-cb" ?checked="${this.selected}" accessible-name="${l(this._accInfo.ariaLabel)}" @click="${this.onMultiSelectionComponentPress}"></ui5-checkbox>`;
}
function block4(context, tags, suffix) {
  return effectiveHtml`<div class="ui5-li-deletebtn">${this.hasDeleteButtonSlot ? block5.call(this, context, tags, suffix) : block6.call(this, context, tags, suffix)}</div>`;
}
function block5(context, tags, suffix) {
  return effectiveHtml`<slot name="deleteButton"></slot>`;
}
function block6(context, tags, suffix) {
  return suffix ? effectiveHtml`<${scopeTag("ui5-button", tags, suffix)} part="delete-button" tabindex="-1" data-sap-no-tab-ref id="${l(this._id)}-deleteSelectionElement" design="Transparent" icon="decline" ?disabled="${this.disableDeleteButton}" @click="${this.onDelete}" tooltip="${l(this.deleteText)}"></${scopeTag("ui5-button", tags, suffix)}>` : effectiveHtml`<ui5-button part="delete-button" tabindex="-1" data-sap-no-tab-ref id="${l(this._id)}-deleteSelectionElement" design="Transparent" icon="decline" ?disabled="${this.disableDeleteButton}" @click="${this.onDelete}" tooltip="${l(this.deleteText)}"></ui5-button>`;
}
function block7(context, tags, suffix) {
  return effectiveHtml`<div class="ui5-li-imgContent"><slot name="imageContent"></slot></div>`;
}
function block8(context, tags, suffix) {
  return effectiveHtml`${this.displayImage ? block9.call(this, context, tags, suffix) : void 0}`;
}
function block9(context, tags, suffix) {
  return suffix ? effectiveHtml`<${scopeTag("ui5-avatar", tags, suffix)} shape="Square" class="ui5-li-img"><img src="${l(this.image)}" class="ui5-li-img-inner" /></${scopeTag("ui5-avatar", tags, suffix)}>` : effectiveHtml`<ui5-avatar shape="Square" class="ui5-li-img"><img src="${l(this.image)}" class="ui5-li-img-inner" /></ui5-avatar>`;
}
function block10(context, tags, suffix) {
  return suffix ? effectiveHtml`<${scopeTag("ui5-icon", tags, suffix)} part="icon" name="${l(this.icon)}" class="ui5-li-icon" accessible-role="presentation" aria-hidden="true"></${scopeTag("ui5-icon", tags, suffix)}>` : effectiveHtml`<ui5-icon part="icon" name="${l(this.icon)}" class="ui5-li-icon" accessible-role="presentation" aria-hidden="true"></ui5-icon>`;
}
function block11(context, tags, suffix) {
  return effectiveHtml`<div class="ui5-li-description-info-wrapper"><span part="description" class="ui5-li-desc">${l(this.description)}</span>${this.additionalText ? block12.call(this, context, tags, suffix) : void 0}</div>`;
}
function block12(context, tags, suffix) {
  return effectiveHtml`<span part="additional-text" class="ui5-li-additional-text">${l(this.additionalText)}</span>`;
}
function block13(context, tags, suffix) {
  return effectiveHtml`<span class="ui5-hidden-text">${l(this.type)}</span>`;
}
function block14(context, tags, suffix) {
  return effectiveHtml`${this.additionalText ? block15.call(this, context, tags, suffix) : void 0}`;
}
function block15(context, tags, suffix) {
  return effectiveHtml`<span part="additional-text" class="ui5-li-additional-text">${l(this.additionalText)}</span>`;
}
function block16(context, tags, suffix) {
  return suffix ? effectiveHtml`<${scopeTag("ui5-icon", tags, suffix)} part="icon" name="${l(this.icon)}" class="ui5-li-icon" accessible-role="presentation" aria-hidden="true"></${scopeTag("ui5-icon", tags, suffix)}>` : effectiveHtml`<ui5-icon part="icon" name="${l(this.icon)}" class="ui5-li-icon" accessible-role="presentation" aria-hidden="true"></ui5-icon>`;
}
function block17(context, tags, suffix) {
  return suffix ? effectiveHtml`<div class="ui5-li-detailbtn"><${scopeTag("ui5-button", tags, suffix)} part="detail-button" design="Transparent" icon="edit" @click="${this.onDetailClick}"></${scopeTag("ui5-button", tags, suffix)}></div>` : effectiveHtml`<div class="ui5-li-detailbtn"><ui5-button part="detail-button" design="Transparent" icon="edit" @click="${this.onDetailClick}"></ui5-button></div>`;
}
function block18(context, tags, suffix) {
  return suffix ? effectiveHtml`<${scopeTag("ui5-icon", tags, suffix)} name ="slim-arrow-right"></${scopeTag("ui5-icon", tags, suffix)}>` : effectiveHtml`<ui5-icon name ="slim-arrow-right"></ui5-icon>`;
}
function block19(context, tags, suffix) {
  return effectiveHtml`<div class="ui5-li-navigated"></div>`;
}
function block20(context, tags, suffix) {
  return effectiveHtml`${this.modeSingleSelect ? block21.call(this, context, tags, suffix) : void 0}${this.modeMultiSelect ? block22.call(this, context, tags, suffix) : void 0}${this.renderDeleteButton ? block23.call(this, context, tags, suffix) : void 0}`;
}
function block21(context, tags, suffix) {
  return suffix ? effectiveHtml`<${scopeTag("ui5-radio-button", tags, suffix)} part="radio" ?disabled="${this.isInactive}" accessible-name="${l(this._accInfo.ariaLabelRadioButton)}" tabindex="-1" id="${l(this._id)}-singleSelectionElement" class="ui5-li-singlesel-radiobtn" ?checked="${this.selected}" @click="${this.onSingleSelectionComponentPress}"></${scopeTag("ui5-radio-button", tags, suffix)}>` : effectiveHtml`<ui5-radio-button part="radio" ?disabled="${this.isInactive}" accessible-name="${l(this._accInfo.ariaLabelRadioButton)}" tabindex="-1" id="${l(this._id)}-singleSelectionElement" class="ui5-li-singlesel-radiobtn" ?checked="${this.selected}" @click="${this.onSingleSelectionComponentPress}"></ui5-radio-button>`;
}
function block22(context, tags, suffix) {
  return suffix ? effectiveHtml`<${scopeTag("ui5-checkbox", tags, suffix)} part="checkbox" ?disabled="${this.isInactive}" ?indeterminate=${this.indeterminate} tabindex="-1" id="${l(this._id)}-multiSelectionElement" class="ui5-li-multisel-cb" ?checked="${this.selected}" accessible-name="${l(this._accInfo.ariaLabel)}" @click="${this.onMultiSelectionComponentPress}"></${scopeTag("ui5-checkbox", tags, suffix)}>` : effectiveHtml`<ui5-checkbox part="checkbox" ?disabled="${this.isInactive}" ?indeterminate=${this.indeterminate} tabindex="-1" id="${l(this._id)}-multiSelectionElement" class="ui5-li-multisel-cb" ?checked="${this.selected}" accessible-name="${l(this._accInfo.ariaLabel)}" @click="${this.onMultiSelectionComponentPress}"></ui5-checkbox>`;
}
function block23(context, tags, suffix) {
  return effectiveHtml`<div class="ui5-li-deletebtn">${this.hasDeleteButtonSlot ? block24.call(this, context, tags, suffix) : block25.call(this, context, tags, suffix)}</div>`;
}
function block24(context, tags, suffix) {
  return effectiveHtml`<slot name="deleteButton"></slot>`;
}
function block25(context, tags, suffix) {
  return suffix ? effectiveHtml`<${scopeTag("ui5-button", tags, suffix)} part="delete-button" tabindex="-1" data-sap-no-tab-ref id="${l(this._id)}-deleteSelectionElement" design="Transparent" icon="decline" ?disabled="${this.disableDeleteButton}" @click="${this.onDelete}" tooltip="${l(this.deleteText)}"></${scopeTag("ui5-button", tags, suffix)}>` : effectiveHtml`<ui5-button part="delete-button" tabindex="-1" data-sap-no-tab-ref id="${l(this._id)}-deleteSelectionElement" design="Transparent" icon="decline" ?disabled="${this.disableDeleteButton}" @click="${this.onDelete}" tooltip="${l(this.deleteText)}"></ui5-button>`;
}
var __decorate$1 = function(decorators, target, key, desc) {
  var c2 = arguments.length, r = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i2 = decorators.length - 1; i2 >= 0; i2--)
      if (d = decorators[i2])
        r = (c2 < 3 ? d(r) : c2 > 3 ? d(target, key, r) : d(target, key)) || r;
  return c2 > 3 && r && Object.defineProperty(target, key, r), r;
};
let StandardListItem = class StandardListItem2 extends ListItem$1 {
  onBeforeRendering() {
    super.onBeforeRendering();
    this.hasTitle = !!this.textContent;
    this._hasImageContent = this.hasImageContent;
  }
  get displayImage() {
    return !!this.image;
  }
  get displayIconBegin() {
    return !!(this.icon && !this.iconEnd);
  }
  get displayIconEnd() {
    return !!(this.icon && this.iconEnd);
  }
  get hasImageContent() {
    return !!this.imageContent.length;
  }
};
__decorate$1([
  property()
], StandardListItem.prototype, "description", void 0);
__decorate$1([
  property()
], StandardListItem.prototype, "icon", void 0);
__decorate$1([
  property({ type: Boolean })
], StandardListItem.prototype, "iconEnd", void 0);
__decorate$1([
  property()
], StandardListItem.prototype, "image", void 0);
__decorate$1([
  property()
], StandardListItem.prototype, "additionalText", void 0);
__decorate$1([
  property({ type: ValueState$1, defaultValue: ValueState$1.None })
], StandardListItem.prototype, "additionalTextState", void 0);
__decorate$1([
  property()
], StandardListItem.prototype, "accessibleName", void 0);
__decorate$1([
  property({ type: WrappingType$1, defaultValue: WrappingType$1.None })
], StandardListItem.prototype, "wrappingType", void 0);
__decorate$1([
  property({ type: Boolean })
], StandardListItem.prototype, "hasTitle", void 0);
__decorate$1([
  property({ type: Boolean })
], StandardListItem.prototype, "_hasImageContent", void 0);
__decorate$1([
  slot()
], StandardListItem.prototype, "imageContent", void 0);
StandardListItem = __decorate$1([
  customElement({
    tag: "ui5-li",
    template: block0$2,
    dependencies: [
      ...ListItem$1.dependencies,
      Icon,
      Avatar$1
    ]
  })
], StandardListItem);
StandardListItem.define();
const StandardListItem$1 = StandardListItem;
const name$1 = "slim-arrow-down";
const pathData$1 = "M420.5 187q11-12 23 0 5 5 5 11t-5 11l-165 165q-10 9-23 9t-22-9l-166-165q-5-5-5-11.5t5-11.5 11.5-5 11.5 5l160 160q5 6 11 0z";
const ltr$1 = false;
const collection$1 = "SAP-icons-v4";
const packageName$1 = "@ui5/webcomponents-icons";
registerIcon(name$1, { pathData: pathData$1, ltr: ltr$1, collection: collection$1, packageName: packageName$1 });
const name = "slim-arrow-down";
const pathData = "M96 186q0-11 7.5-18.5T122 160q10 0 18 8l116 121 116-121q8-8 18-8 11 0 18.5 7.5T416 186q0 10-7 17L275 344q-8 8-19 8-12 0-18-8L103 203q-7-7-7-17z";
const ltr = false;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";
registerIcon(name, { pathData, ltr, collection, packageName });
isLegacyThemeFamily() ? pathData$1 : pathData;
function block0$1(context, tags, suffix) {
  return suffix ? effectiveHtml`<nav class="ui5-breadcrumbs-root" aria-label="${l(this._accessibleNameText)}"><ol @focusin="${this._onfocusin}" @keydown="${this._onkeydown}" @keyup="${this._onkeyup}"><li class="ui5-breadcrumbs-dropdown-arrow-link-wrapper" ?hidden="${this._isOverflowEmpty}"><${scopeTag("ui5-link", tags, suffix)} @ui5-click="${l(this._openRespPopover)}" accessible-role="button" aria-label="${l(this._dropdownArrowAccessibleNameText)}" aria-haspopup="${l(this._ariaHasPopup)}"><${scopeTag("ui5-icon", tags, suffix)} name="slim-arrow-down" title="${l(this._dropdownArrowAccessibleNameText)}"></${scopeTag("ui5-icon", tags, suffix)}></${scopeTag("ui5-link", tags, suffix)}></li>${c(this._linksData, (item, index) => item._id || index, (item, index) => block1$1.call(this, context, tags, suffix, item, index))}${this._endsWithCurrentLocationLabel ? block2.call(this, context, tags, suffix) : void 0}</ol></nav>` : effectiveHtml`<nav class="ui5-breadcrumbs-root" aria-label="${l(this._accessibleNameText)}"><ol @focusin="${this._onfocusin}" @keydown="${this._onkeydown}" @keyup="${this._onkeyup}"><li class="ui5-breadcrumbs-dropdown-arrow-link-wrapper" ?hidden="${this._isOverflowEmpty}"><ui5-link @ui5-click="${l(this._openRespPopover)}" accessible-role="button" aria-label="${l(this._dropdownArrowAccessibleNameText)}" aria-haspopup="${l(this._ariaHasPopup)}"><ui5-icon name="slim-arrow-down" title="${l(this._dropdownArrowAccessibleNameText)}"></ui5-icon></ui5-link></li>${c(this._linksData, (item, index) => item._id || index, (item, index) => block1$1.call(this, context, tags, suffix, item, index))}${this._endsWithCurrentLocationLabel ? block2.call(this, context, tags, suffix) : void 0}</ol></nav>`;
}
function block1$1(context, tags, suffix, item, index) {
  return suffix ? effectiveHtml`<li class="ui5-breadcrumbs-link-wrapper" id="${l(item._id)}-link-wrapper"><${scopeTag("ui5-link", tags, suffix)} @ui5-click="${l(this._onLinkPress)}" href="${l(item.href)}" target="${l(item.target)}" id="${l(item._id)}-link" accessible-name="${l(item._accessibleNameText)}" data-ui5-stable="${l(item.stableDomRef)}">${l(item.innerText)}</${scopeTag("ui5-link", tags, suffix)}></li>` : effectiveHtml`<li class="ui5-breadcrumbs-link-wrapper" id="${l(item._id)}-link-wrapper"><ui5-link @ui5-click="${l(this._onLinkPress)}" href="${l(item.href)}" target="${l(item.target)}" id="${l(item._id)}-link" accessible-name="${l(item._accessibleNameText)}" data-ui5-stable="${l(item.stableDomRef)}">${l(item.innerText)}</ui5-link></li>`;
}
function block2(context, tags, suffix) {
  return suffix ? effectiveHtml`<li class="ui5-breadcrumbs-current-location" @click="${this._onLabelPress}"><span aria-current="page" aria-label="${l(this._currentLocationAccName)}" role="link" id="${l(this._id)}-labelWrapper"><${scopeTag("ui5-label", tags, suffix)}>${l(this._currentLocationText)}</${scopeTag("ui5-label", tags, suffix)}></span></li>` : effectiveHtml`<li class="ui5-breadcrumbs-current-location" @click="${this._onLabelPress}"><span aria-current="page" aria-label="${l(this._currentLocationAccName)}" role="link" id="${l(this._id)}-labelWrapper"><ui5-label>${l(this._currentLocationText)}</ui5-label></span></li>`;
}
function block0(context, tags, suffix) {
  return suffix ? effectiveHtml`<${scopeTag("ui5-responsive-popover", tags, suffix)} class="ui5-breadcrumbs-popover" hide-arrow content-only-on-desktop placement-type="Bottom" horizontal-align="Left" _hide-header @keydown="${this._onkeydown}"><${scopeTag("ui5-list", tags, suffix)} mode="SingleSelect" separators="None" @ui5-selection-change="${l(this._onOverflowListItemSelect)}">${c(this._overflowItemsData, (item, index) => item._id || index, (item, index) => block1.call(this, context, tags, suffix, item, index))}</${scopeTag("ui5-list", tags, suffix)}><div slot="footer" class="ui5-breadcrumbs-popover-footer"><${scopeTag("ui5-button", tags, suffix)} design="Transparent" @click="${this._closeRespPopover}">${l(this._cancelButtonText)}</${scopeTag("ui5-button", tags, suffix)}></div></${scopeTag("ui5-responsive-popover", tags, suffix)}>` : effectiveHtml`<ui5-responsive-popover class="ui5-breadcrumbs-popover" hide-arrow content-only-on-desktop placement-type="Bottom" horizontal-align="Left" _hide-header @keydown="${this._onkeydown}"><ui5-list mode="SingleSelect" separators="None" @ui5-selection-change="${l(this._onOverflowListItemSelect)}">${c(this._overflowItemsData, (item, index) => item._id || index, (item, index) => block1.call(this, context, tags, suffix, item, index))}</ui5-list><div slot="footer" class="ui5-breadcrumbs-popover-footer"><ui5-button design="Transparent" @click="${this._closeRespPopover}">${l(this._cancelButtonText)}</ui5-button></div></ui5-responsive-popover>`;
}
function block1(context, tags, suffix, item, index) {
  return suffix ? effectiveHtml`<${scopeTag("ui5-li", tags, suffix)} id="${l(item._id)}-li" accessible-name="${l(item.accessibleName)}" data-ui5-stable="${l(item.stableDomRef)}">${l(item.textContent)}</${scopeTag("ui5-li", tags, suffix)}>` : effectiveHtml`<ui5-li id="${l(item._id)}-li" accessible-name="${l(item.accessibleName)}" data-ui5-stable="${l(item.stableDomRef)}">${l(item.textContent)}</ui5-li>`;
}
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$k);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$l);
const styleData$1 = { packageName: "@ui5/webcomponents", fileName: "themes/Breadcrumbs.css.ts", content: `:host(:not([hidden])){display:block;width:100%}.ui5-breadcrumbs-root{white-space:nowrap;outline:none;margin:0 0 .5rem}.ui5-breadcrumbs-root>ol{margin:0;padding:0;list-style-type:none;display:-webkit-box;display:-webkit-flex;display:flex}.ui5-breadcrumbs-root>ol>li{display:inline}.ui5-breadcrumbs-current-location{min-width:1%;-webkit-flex:1;-webkit-box-flex:1;flex:1 1 auto;font-size:0;align-self:center}.ui5-breadcrumbs-current-location>span:focus{outline:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);border-radius:var(--_ui5-v1-21-2_breadcrumbs_current_location_focus_border_radius)}.ui5-breadcrumbs-dropdown-arrow-link-wrapper[hidden]{display:none}.ui5-breadcrumbs-dropdown-arrow-link-wrapper [ui5-icon]{width:var(--sapFontSize);height:var(--sapFontSize);padding-left:.675rem;vertical-align:text-top;color:var(--sapLinkColor)}.ui5-breadcrumbs-dropdown-arrow-link-wrapper [ui5-link][focused] [ui5-icon]{color:var(--_ui5-v1-21-2_link_focus_color)}.ui5-breadcrumbs-dropdown-arrow-link-wrapper [ui5-icon]:before{content:"...";vertical-align:middle;position:absolute;left:0;bottom:0}.ui5-breadcrumbs-dropdown-arrow-link-wrapper [ui5-link][focused] [ui5-icon]:after,.ui5-breadcrumbs-dropdown-arrow-link-wrapper:hover [ui5-icon]:after{content:"";position:absolute;border-bottom:.0625rem solid;inset:0 0 1px}li:not(.ui5-breadcrumbs-current-location):after{content:"/";padding:0 .25rem;cursor:auto;color:var(--sapContent_LabelColor);display:inline-block;font-family:"72override",var(--sapFontFamily);font-size:var(--sapFontSize)}.ui5-breadcrumbs-popover-footer{display:flex;justify-content:flex-end;width:100%}:host([separator-style="BackSlash"]) li:not(.ui5-breadcrumbs-current-location):after{content:"\\"}:host([separator-style="DoubleBackSlash"]) li:not(.ui5-breadcrumbs-current-location):after{content:"\\\\"}:host([separator-style="DoubleGreaterThan"]) li:not(.ui5-breadcrumbs-current-location):after{content:">>"}:host([separator-style="DoubleSlash"]) li:not(.ui5-breadcrumbs-current-location):after{content:"//"}:host([separator-style="GreaterThan"]) li:not(.ui5-breadcrumbs-current-location):after{content:">"}
` };
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$k);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$l);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/BreadcrumbsPopover.css.ts", content: `.ui5-breadcrumbs-popover::part(content){padding:0}.ui5-breadcrumbs-popover-footer{display:flex;justify-content:flex-end;width:100%;padding-right:.5rem;align-items:center}
` };
var __decorate = function(decorators, target, key, desc) {
  var c2 = arguments.length, r = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i2 = decorators.length - 1; i2 >= 0; i2--)
      if (d = decorators[i2])
        r = (c2 < 3 ? d(r) : c2 > 3 ? d(target, key, r) : d(target, key)) || r;
  return c2 > 3 && r && Object.defineProperty(target, key, r), r;
};
var Breadcrumbs_1;
let Breadcrumbs = Breadcrumbs_1 = class Breadcrumbs2 extends UI5Element {
  constructor() {
    super();
    this._breadcrumbItemWidths = /* @__PURE__ */ new WeakMap();
    this._dropdownArrowLinkWidth = 0;
    this._itemNavigation = new ItemNavigation(this, {
      navigationMode: NavigationMode$1.Horizontal,
      getItemsCallback: () => this._getFocusableItems()
    });
    this._onResizeHandler = this._updateOverflow.bind(this);
    this._labelFocusAdaptor = {
      id: `${this._id}-labelWrapper`,
      getlabelWrapper: this.getCurrentLocationLabelWrapper.bind(this),
      set _tabIndex(value) {
        const wrapper = this.getlabelWrapper();
        wrapper && wrapper.setAttribute("tabindex", value);
      },
      get _tabIndex() {
        const wrapper = this.getlabelWrapper();
        return (wrapper == null ? void 0 : wrapper.getAttribute("tabindex")) || "";
      }
    };
  }
  onInvalidation(changeInfo) {
    if (changeInfo.reason === "childchange") {
      const itemIndex = this._getItems().indexOf(changeInfo.child), isInOverflow = itemIndex < this._overflowSize;
      if (isInOverflow) {
        this._overflowSize = itemIndex;
      }
    }
  }
  _getItems() {
    return this.getSlottedNodes("items");
  }
  onBeforeRendering() {
    this._preprocessItems();
  }
  onAfterRendering() {
    this._cacheWidths();
    this._updateOverflow();
  }
  onEnterDOM() {
    ResizeHandler.register(this, this._onResizeHandler);
  }
  onExitDOM() {
    ResizeHandler.deregister(this, this._onResizeHandler);
  }
  _initItemNavigation() {
    if (!this._itemNavigation) {
      this._itemNavigation = new ItemNavigation(this, {
        navigationMode: NavigationMode$1.Horizontal,
        getItemsCallback: () => this._getFocusableItems()
      });
    }
  }
  /**
   * Obtains the items for navigation via keyboard
   * @private
   */
  _getFocusableItems() {
    const items = this._links;
    if (!this._isOverflowEmpty) {
      items.unshift(this._dropdownArrowLink);
    }
    if (this._endsWithCurrentLocationLabel) {
      items.push(this._labelFocusAdaptor);
    }
    return items;
  }
  _onfocusin(e2) {
    const target = e2.target, labelWrapper = this.getCurrentLocationLabelWrapper(), currentItem = target === labelWrapper ? this._labelFocusAdaptor : target;
    this._itemNavigation.setCurrentItem(currentItem);
  }
  _onkeydown(e2) {
    const isDropdownArrowFocused = this._isDropdownArrowFocused;
    if (isShow(e2) && isDropdownArrowFocused && !this._isOverflowEmpty) {
      e2.preventDefault();
      this._toggleRespPopover();
      return;
    }
    if (isSpace(e2) && isDropdownArrowFocused && !this._isOverflowEmpty && !this._isPickerOpen) {
      e2.preventDefault();
      return;
    }
    if ((isEnter(e2) || isSpace(e2)) && this._isCurrentLocationLabelFocused) {
      this._onLabelPress(e2);
    }
  }
  _onkeyup(e2) {
    if (this._isDropdownArrowFocused && isSpace(e2) && !this._isOverflowEmpty && !this._isPickerOpen) {
      this._openRespPopover();
    }
  }
  /**
   * Caches the space required to render the content
   * @private
   */
  _cacheWidths() {
    const map = this._breadcrumbItemWidths, items = this._getItems(), label = this._currentLocationLabel;
    for (let i2 = this._overflowSize; i2 < items.length; i2++) {
      const item = items[i2], link = this.shadowRoot.querySelector(`#${item._id}-link-wrapper`);
      map.set(item, this._getElementWidth(link));
    }
    if (items.length && this._endsWithCurrentLocationLabel && label) {
      const item = items[items.length - 1];
      map.set(item, this._getElementWidth(label));
    }
    if (!this._isOverflowEmpty) {
      const arrow = this.shadowRoot.querySelector(".ui5-breadcrumbs-dropdown-arrow-link-wrapper");
      this._dropdownArrowLinkWidth = this._getElementWidth(arrow);
    }
  }
  _updateOverflow() {
    const items = this._getItems(), availableWidth = this.shadowRoot.querySelector(".ui5-breadcrumbs-root").offsetWidth;
    let requiredWidth = this._getTotalContentWidth(), overflowSize = 0;
    if (requiredWidth > availableWidth) {
      requiredWidth += this._dropdownArrowLinkWidth;
    }
    while (requiredWidth >= availableWidth && overflowSize < this._maxAllowedOverflowSize) {
      const itemToOverflow = items[overflowSize];
      let itemWidth = 0;
      if (this._isItemVisible(itemToOverflow)) {
        itemWidth = this._breadcrumbItemWidths.get(itemToOverflow) || 0;
      }
      requiredWidth -= itemWidth;
      overflowSize++;
    }
    this._overflowSize = overflowSize;
    if (this._isOverflowEmpty && this._isPickerOpen) {
      this.responsivePopover.close();
    }
    const focusableItems = this._getFocusableItems();
    if (!focusableItems.some((x) => x._tabIndex === "0")) {
      this._itemNavigation.setCurrentItem(focusableItems[0]);
    }
  }
  _getElementWidth(element) {
    if (element) {
      return Math.ceil(element.getBoundingClientRect().width);
    }
    return 0;
  }
  _getTotalContentWidth() {
    const items = this._getItems(), widthsMap = this._breadcrumbItemWidths, totalLinksWidth = items.reduce((sum, link) => sum + widthsMap.get(link), 0);
    return totalLinksWidth;
  }
  _onLinkPress(e2) {
    const link = e2.target, items = this._getItems(), item = items.find((x) => `${x._id}-link` === link.id), { altKey, ctrlKey, metaKey, shiftKey } = e2.detail;
    if (!this.fireEvent("item-click", {
      item,
      altKey,
      ctrlKey,
      metaKey,
      shiftKey
    }, true)) {
      e2.preventDefault();
    }
  }
  _onLabelPress(e2) {
    const items = this._getItems(), item = items[items.length - 1], { altKey, ctrlKey, metaKey, shiftKey } = e2;
    this.fireEvent("item-click", {
      item,
      altKey,
      ctrlKey,
      metaKey,
      shiftKey
    });
  }
  _onOverflowListItemSelect(e2) {
    const listItem = e2.detail.selectedItems[0], items = this._getItems(), item = items.find((x) => `${x._id}-li` === listItem.id);
    if (this.fireEvent("item-click", { item }, true)) {
      window.open(item.href, item.target || "_self", "noopener,noreferrer");
      this.responsivePopover.close();
    }
  }
  async _respPopover() {
    const staticAreaItem = await this.getStaticAreaItemDomRef();
    return staticAreaItem.querySelector("[ui5-responsive-popover]");
  }
  async _toggleRespPopover() {
    this.responsivePopover = await this._respPopover();
    if (this._isPickerOpen) {
      this._closeRespPopover();
    } else {
      this._openRespPopover();
    }
  }
  _closeRespPopover() {
    this.responsivePopover && this.responsivePopover.close();
  }
  async _openRespPopover() {
    this.responsivePopover = await this._respPopover();
    this.responsivePopover.showAt(this._dropdownArrowLink);
  }
  _isItemVisible(item) {
    return !item.hidden && this._hasVisibleContent(item);
  }
  _hasVisibleContent(item) {
    return item.innerText || Array.from(item.children).some((child) => !child.hidden);
  }
  _preprocessItems() {
    this.items.forEach((item) => {
      item._getRealDomRef = () => this.getDomRef().querySelector(`[data-ui5-stable*=${item.stableDomRef}]`);
    });
  }
  _getItemPositionText(position, size) {
    return Breadcrumbs_1.i18nBundle.getText(BREADCRUMB_ITEM_POS, position, size);
  }
  _getItemAccessibleName(item, position, size) {
    const positionText = this._getItemPositionText(position, size);
    const itemsText = item.textContent || "";
    let text = "";
    if (item.accessibleName) {
      text = `${itemsText.trim()} ${item.accessibleName} ${positionText}`;
    } else {
      text = `${itemsText.trim()} ${positionText}`;
    }
    return text;
  }
  getCurrentLocationLabelWrapper() {
    return this.shadowRoot.querySelector(".ui5-breadcrumbs-current-location > span");
  }
  get _visibleItems() {
    return this._getItems().slice(this._overflowSize).filter((i2) => this._isItemVisible(i2));
  }
  get _endsWithCurrentLocationLabel() {
    return this.design === BreadcrumbsDesign$1.Standard;
  }
  get _currentLocationText() {
    const items = this._getItems();
    if (this._endsWithCurrentLocationLabel && items.length) {
      const item = items[items.length - 1];
      if (this._isItemVisible(item)) {
        return item.innerText;
      }
    }
    return "";
  }
  get _currentLocationLabel() {
    return this.shadowRoot.querySelector(".ui5-breadcrumbs-current-location [ui5-label]");
  }
  get _isDropdownArrowFocused() {
    return this._dropdownArrowLink._tabIndex === "0";
  }
  get _isCurrentLocationLabelFocused() {
    const label = this.getCurrentLocationLabelWrapper();
    return label && label.tabIndex === 0;
  }
  /**
   * Returns the maximum allowed count of items in the overflow
   * with respect to the UX requirement to never overflow the last visible item
   */
  get _maxAllowedOverflowSize() {
    const items = this._getItems().filter((item) => this._isItemVisible(item));
    return items.length - 1;
  }
  /**
   * Getter for the interactive element that opens the overflow
   * @private
   */
  get _dropdownArrowLink() {
    return this.shadowRoot.querySelector(".ui5-breadcrumbs-dropdown-arrow-link-wrapper [ui5-link]");
  }
  /**
   * Getter for the list of abstract breadcrumb items to be rendered as list-items inside the overflow
   */
  get _overflowItemsData() {
    return this._getItems().slice(0, this._overflowSize).filter((item) => this._isItemVisible(item)).reverse();
  }
  /**
   * Getter for the list of abstract breadcrumb items to be rendered as links outside the overflow
   */
  get _linksData() {
    const items = this._visibleItems;
    const itemsCount = items.length;
    if (this._endsWithCurrentLocationLabel) {
      items.pop();
    }
    return items.map((item, index) => {
      item._accessibleNameText = this._getItemAccessibleName(item, index + 1, itemsCount);
      return item;
    });
  }
  /**
   * Getter for accessible name of the current location. Includes the position of the current location and the size of the breadcrumbs
   */
  get _currentLocationAccName() {
    const items = this._visibleItems;
    const positionText = this._getItemPositionText(items.length, items.length);
    const lastItem = items[items.length - 1];
    if (!lastItem) {
      return positionText;
    }
    const lastItemText = lastItem.textContent || "";
    if (lastItem.accessibleName) {
      return `${lastItemText.trim()} ${lastItem.accessibleName} ${positionText}`;
    }
    return `${lastItemText.trim()} ${positionText}`;
  }
  /**
   * Getter for the list of links corresponding to the abstract breadcrumb items
   */
  get _links() {
    return Array.from(this.shadowRoot.querySelectorAll(".ui5-breadcrumbs-link-wrapper [ui5-link]"));
  }
  get _isOverflowEmpty() {
    return this._overflowItemsData.length === 0;
  }
  get _ariaHasPopup() {
    if (!this._isOverflowEmpty) {
      return "listbox";
    }
    return void 0;
  }
  get _isPickerOpen() {
    return !!this.responsivePopover && this.responsivePopover.opened;
  }
  get _accessibleNameText() {
    return Breadcrumbs_1.i18nBundle.getText(BREADCRUMBS_ARIA_LABEL);
  }
  get _dropdownArrowAccessibleNameText() {
    return Breadcrumbs_1.i18nBundle.getText(BREADCRUMBS_OVERFLOW_ARIA_LABEL);
  }
  get _cancelButtonText() {
    return Breadcrumbs_1.i18nBundle.getText(BREADCRUMBS_CANCEL_BUTTON);
  }
  static async onDefine() {
    Breadcrumbs_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
  }
};
__decorate([
  property({ type: BreadcrumbsDesign$1, defaultValue: BreadcrumbsDesign$1.Standard })
], Breadcrumbs.prototype, "design", void 0);
__decorate([
  property({ type: BreadcrumbsSeparatorStyle$1, defaultValue: BreadcrumbsSeparatorStyle$1.Slash })
], Breadcrumbs.prototype, "separatorStyle", void 0);
__decorate([
  property({ validator: Integer, noAttribute: true, defaultValue: 0 })
], Breadcrumbs.prototype, "_overflowSize", void 0);
__decorate([
  slot({ type: HTMLElement, invalidateOnChildChange: true, "default": true })
], Breadcrumbs.prototype, "items", void 0);
Breadcrumbs = Breadcrumbs_1 = __decorate([
  customElement({
    tag: "ui5-breadcrumbs",
    languageAware: true,
    renderer: litRender,
    template: block0$1,
    staticAreaTemplate: block0,
    styles: styleData$1,
    staticAreaStyles: styleData,
    dependencies: [
      BreadcrumbsItem$1,
      Link$1,
      Label$1,
      ResponsivePopover$1,
      List$1,
      StandardListItem$1,
      Icon,
      Button
    ]
  }),
  event("item-click", {
    detail: {
      item: { type: HTMLElement },
      altKey: { type: Boolean },
      ctrlKey: { type: Boolean },
      metaKey: { type: Boolean },
      shiftKey: { type: Boolean }
    }
  })
], Breadcrumbs);
Breadcrumbs.define();
