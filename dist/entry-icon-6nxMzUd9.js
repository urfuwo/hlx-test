import { I as j, q as e, t as i, u as t, T, i as isLegacyThemeFamily, J as getTheme, w as getSharedResource, m as getI18nBundle, e as effectiveHtml, l as l$1, F as effectiveSvg, a as registerThemePropertiesLoader, c as styleData$1, d as styleData$2, p as property, f as customElement, U as UI5Element, K as executeTemplate, n as litRender } from "./parameters-bundle.css-SwkfcYC-.js";
const event = (name, data = {}) => {
  return (target) => {
    if (!Object.prototype.hasOwnProperty.call(target, "metadata")) {
      target.metadata = {};
    }
    const metadata = target.metadata;
    if (!metadata.events) {
      metadata.events = {};
    }
    const eventsMetadata = metadata.events;
    if (!eventsMetadata[name]) {
      eventsMetadata[name] = data;
    }
  };
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: l } = j, r = () => document.createComment(""), c$1 = (o, i2, n) => {
  var t2;
  const v = o._$AA.parentNode, d = void 0 === i2 ? o._$AB : i2._$AA;
  if (void 0 === n) {
    const i3 = v.insertBefore(r(), d), t3 = v.insertBefore(r(), d);
    n = new l(i3, t3, o, o.options);
  } else {
    const l2 = n._$AB.nextSibling, i3 = n._$AM, u2 = i3 !== o;
    if (u2) {
      let l3;
      null === (t2 = n._$AQ) || void 0 === t2 || t2.call(n, o), n._$AM = o, void 0 !== n._$AP && (l3 = o._$AU) !== i3._$AU && n._$AP(l3);
    }
    if (l2 !== d || u2) {
      let o2 = n._$AA;
      for (; o2 !== l2; ) {
        const l3 = o2.nextSibling;
        v.insertBefore(o2, d), o2 = l3;
      }
    }
  }
  return n;
}, f = (o, l2, i2 = o) => (o._$AI(l2, i2), o), s = {}, a = (o, l2 = s) => o._$AH = l2, m = (o) => o._$AH, p = (o) => {
  var l2;
  null === (l2 = o._$AP) || void 0 === l2 || l2.call(o, false, true);
  let i2 = o._$AA;
  const n = o._$AB.nextSibling;
  for (; i2 !== n; ) {
    const o2 = i2.nextSibling;
    i2.remove(), i2 = o2;
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const u = (e2, s2, t2) => {
  const r2 = /* @__PURE__ */ new Map();
  for (let l2 = s2; l2 <= t2; l2++)
    r2.set(e2[l2], l2);
  return r2;
}, c = e(class extends i {
  constructor(e2) {
    if (super(e2), e2.type !== t.CHILD)
      throw Error("repeat() can only be used in text expressions");
  }
  ct(e2, s2, t2) {
    let r2;
    void 0 === t2 ? t2 = s2 : void 0 !== s2 && (r2 = s2);
    const l2 = [], o = [];
    let i2 = 0;
    for (const s3 of e2)
      l2[i2] = r2 ? r2(s3, i2) : i2, o[i2] = t2(s3, i2), i2++;
    return { values: o, keys: l2 };
  }
  render(e2, s2, t2) {
    return this.ct(e2, s2, t2).values;
  }
  update(s2, [t2, r2, c2]) {
    var d;
    const a$1 = m(s2), { values: p$1, keys: v } = this.ct(t2, r2, c2);
    if (!Array.isArray(a$1))
      return this.ut = v, p$1;
    const h = null !== (d = this.ut) && void 0 !== d ? d : this.ut = [], m$1 = [];
    let y, x, j2 = 0, k = a$1.length - 1, w = 0, A = p$1.length - 1;
    for (; j2 <= k && w <= A; )
      if (null === a$1[j2])
        j2++;
      else if (null === a$1[k])
        k--;
      else if (h[j2] === v[w])
        m$1[w] = f(a$1[j2], p$1[w]), j2++, w++;
      else if (h[k] === v[A])
        m$1[A] = f(a$1[k], p$1[A]), k--, A--;
      else if (h[j2] === v[A])
        m$1[A] = f(a$1[j2], p$1[A]), c$1(s2, m$1[A + 1], a$1[j2]), j2++, A--;
      else if (h[k] === v[w])
        m$1[w] = f(a$1[k], p$1[w]), c$1(s2, a$1[j2], a$1[k]), k--, w++;
      else if (void 0 === y && (y = u(v, w, A), x = u(h, j2, k)), y.has(h[j2]))
        if (y.has(h[k])) {
          const e2 = x.get(v[w]), t3 = void 0 !== e2 ? a$1[e2] : null;
          if (null === t3) {
            const e3 = c$1(s2, a$1[j2]);
            f(e3, p$1[w]), m$1[w] = e3;
          } else
            m$1[w] = f(t3, p$1[w]), c$1(s2, a$1[j2], t3), a$1[e2] = null;
          w++;
        } else
          p(a$1[k]), k--;
      else
        p(a$1[j2]), j2++;
    for (; w <= A; ) {
      const e2 = c$1(s2, m$1[A + 1]);
      f(e2, p$1[w]), m$1[w++] = e2;
    }
    for (; j2 <= k; ) {
      const e2 = a$1[j2++];
      null !== e2 && p(e2);
    }
    return this.ut = v, a(s2, m$1), T;
  }
});
const KeyCodes = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  SHIFT: 16,
  CONTROL: 17,
  ALT: 18,
  BREAK: 19,
  CAPS_LOCK: 20,
  ESCAPE: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
  PRINT: 44,
  INSERT: 45,
  DELETE: 46,
  DIGIT_0: 48,
  DIGIT_1: 49,
  DIGIT_2: 50,
  DIGIT_3: 51,
  DIGIT_4: 52,
  DIGIT_5: 53,
  DIGIT_6: 54,
  DIGIT_7: 55,
  DIGIT_8: 56,
  DIGIT_9: 57,
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90,
  WINDOWS: 91,
  CONTEXT_MENU: 93,
  TURN_OFF: 94,
  SLEEP: 95,
  NUMPAD_0: 96,
  NUMPAD_1: 97,
  NUMPAD_2: 98,
  NUMPAD_3: 99,
  NUMPAD_4: 100,
  NUMPAD_5: 101,
  NUMPAD_6: 102,
  NUMPAD_7: 103,
  NUMPAD_8: 104,
  NUMPAD_9: 105,
  NUMPAD_ASTERISK: 106,
  NUMPAD_PLUS: 107,
  NUMPAD_MINUS: 109,
  NUMPAD_COMMA: 110,
  NUMPAD_SLASH: 111,
  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,
  NUM_LOCK: 144,
  SCROLL_LOCK: 145,
  COLON: 186,
  PLUS: 187,
  COMMA: 188,
  SLASH: 189,
  DOT: 190,
  PIPE: 191,
  SEMICOLON: 192,
  MINUS: 219,
  GREAT_ACCENT: 220,
  EQUALS: 221,
  SINGLE_QUOTE: 222,
  BACKSLASH: 226
};
const isEnter = (event2) => (event2.key ? event2.key === "Enter" : event2.keyCode === KeyCodes.ENTER) && !hasModifierKeys(event2);
const isSpace = (event2) => (event2.key ? event2.key === "Spacebar" || event2.key === " " : event2.keyCode === KeyCodes.SPACE) && !hasModifierKeys(event2);
const isLeft = (event2) => (event2.key ? event2.key === "ArrowLeft" || event2.key === "Left" : event2.keyCode === KeyCodes.ARROW_LEFT) && !hasModifierKeys(event2);
const isRight = (event2) => (event2.key ? event2.key === "ArrowRight" || event2.key === "Right" : event2.keyCode === KeyCodes.ARROW_RIGHT) && !hasModifierKeys(event2);
const isUp = (event2) => (event2.key ? event2.key === "ArrowUp" || event2.key === "Up" : event2.keyCode === KeyCodes.ARROW_UP) && !hasModifierKeys(event2);
const isDown = (event2) => (event2.key ? event2.key === "ArrowDown" || event2.key === "Down" : event2.keyCode === KeyCodes.ARROW_DOWN) && !hasModifierKeys(event2);
const isUpShift = (event2) => (event2.key ? event2.key === "ArrowUp" || event2.key === "Up" : event2.keyCode === KeyCodes.ARROW_UP) && checkModifierKeys(event2, false, false, true);
const isDownShift = (event2) => (event2.key ? event2.key === "ArrowDown" || event2.key === "Down" : event2.keyCode === KeyCodes.ARROW_DOWN) && checkModifierKeys(event2, false, false, true);
const isLeftShift = (event2) => (event2.key ? event2.key === "ArrowLeft" || event2.key === "Left" : event2.keyCode === KeyCodes.ARROW_LEFT) && checkModifierKeys(event2, false, false, true);
const isRightShift = (event2) => (event2.key ? event2.key === "ArrowRight" || event2.key === "Right" : event2.keyCode === KeyCodes.ARROW_RIGHT) && checkModifierKeys(event2, false, false, true);
const isHome = (event2) => (event2.key ? event2.key === "Home" : event2.keyCode === KeyCodes.HOME) && !hasModifierKeys(event2);
const isEnd = (event2) => (event2.key ? event2.key === "End" : event2.keyCode === KeyCodes.END) && !hasModifierKeys(event2);
const isEscape = (event2) => (event2.key ? event2.key === "Escape" || event2.key === "Esc" : event2.keyCode === KeyCodes.ESCAPE) && !hasModifierKeys(event2);
const isTabNext = (event2) => (event2.key ? event2.key === "Tab" : event2.keyCode === KeyCodes.TAB) && !hasModifierKeys(event2);
const isTabPrevious = (event2) => (event2.key ? event2.key === "Tab" : event2.keyCode === KeyCodes.TAB) && checkModifierKeys(
  event2,
  /* Ctrl */
  false,
  /* Alt */
  false,
  /* Shift */
  true
);
const isBackSpace = (event2) => (event2.key ? event2.key === "Backspace" : event2.keyCode === KeyCodes.BACKSPACE) && !hasModifierKeys(event2);
const isDelete = (event2) => (event2.key ? event2.key === "Delete" : event2.keyCode === KeyCodes.DELETE) && !hasModifierKeys(event2);
const isPageUp = (event2) => (event2.key ? event2.key === "PageUp" : event2.keyCode === KeyCodes.PAGE_UP) && !hasModifierKeys(event2);
const isPageDown = (event2) => (event2.key ? event2.key === "PageDown" : event2.keyCode === KeyCodes.PAGE_DOWN) && !hasModifierKeys(event2);
const isShow = (event2) => {
  if (event2.key) {
    return isF4(event2) || isShowByArrows(event2);
  }
  return event2.keyCode === KeyCodes.F4 && !hasModifierKeys(event2) || event2.keyCode === KeyCodes.ARROW_DOWN && checkModifierKeys(
    event2,
    /* Ctrl */
    false,
    /* Alt */
    true,
    /* Shift */
    false
  );
};
const isF4 = (event2) => {
  return event2.key === "F4" && !hasModifierKeys(event2);
};
const isShowByArrows = (event2) => {
  return (event2.key === "ArrowDown" || event2.key === "Down" || (event2.key === "ArrowUp" || event2.key === "Up")) && checkModifierKeys(
    event2,
    /* Ctrl */
    false,
    /* Alt */
    true,
    /* Shift */
    false
  );
};
const hasModifierKeys = (event2) => event2.shiftKey || event2.altKey || getCtrlKey(event2);
const getCtrlKey = (event2) => !!(event2.metaKey || event2.ctrlKey);
const checkModifierKeys = (event2, bCtrlKey, bAltKey, bShiftKey) => event2.shiftKey === bShiftKey && event2.altKey === bAltKey && getCtrlKey(event2) === bCtrlKey;
var IconCollectionsAlias;
(function(IconCollectionsAlias2) {
  IconCollectionsAlias2["SAP-icons"] = "SAP-icons-v4";
  IconCollectionsAlias2["horizon"] = "SAP-icons-v5";
  IconCollectionsAlias2["SAP-icons-TNT"] = "tnt";
  IconCollectionsAlias2["BusinessSuiteInAppSymbols"] = "business-suite";
})(IconCollectionsAlias || (IconCollectionsAlias = {}));
const getIconCollectionByAlias = (collectionName) => {
  if (IconCollectionsAlias[collectionName]) {
    return IconCollectionsAlias[collectionName];
  }
  return collectionName;
};
var RegisteredIconCollection;
(function(RegisteredIconCollection2) {
  RegisteredIconCollection2["SAPIconsV4"] = "SAP-icons-v4";
  RegisteredIconCollection2["SAPIconsV5"] = "SAP-icons-v5";
  RegisteredIconCollection2["SAPIconsTNTV2"] = "tnt-v2";
  RegisteredIconCollection2["SAPIconsTNTV3"] = "tnt-v3";
  RegisteredIconCollection2["SAPBSIconsV1"] = "business-suite-v1";
  RegisteredIconCollection2["SAPBSIconsV2"] = "business-suite-v2";
})(RegisteredIconCollection || (RegisteredIconCollection = {}));
const iconCollections = /* @__PURE__ */ new Map();
iconCollections.set("SAP-icons", {
  "legacy": RegisteredIconCollection.SAPIconsV4,
  "sap_horizon": RegisteredIconCollection.SAPIconsV5
});
iconCollections.set("tnt", {
  "legacy": RegisteredIconCollection.SAPIconsTNTV2,
  "sap_horizon": RegisteredIconCollection.SAPIconsTNTV3
});
iconCollections.set("business-suite", {
  "legacy": RegisteredIconCollection.SAPBSIconsV1,
  "sap_horizon": RegisteredIconCollection.SAPBSIconsV2
});
const registerIconCollectionForTheme = (collectionName, themeCollectionMap) => {
  if (iconCollections.has(collectionName)) {
    iconCollections.set(collectionName, { ...themeCollectionMap, ...iconCollections.get(collectionName) });
    return;
  }
  iconCollections.set(collectionName, themeCollectionMap);
};
const getIconCollectionForTheme = (collectionName) => {
  const themeFamily = isLegacyThemeFamily() ? "legacy" : "sap_horizon";
  return iconCollections.has(collectionName) ? iconCollections.get(collectionName)[themeFamily] : collectionName;
};
const IconCollectionConfiguration = /* @__PURE__ */ new Map();
const getDefaultIconCollection = (theme) => {
  return IconCollectionConfiguration.get(theme);
};
const getEffectiveIconCollection = (collectionName) => {
  const defaultIconCollection = getDefaultIconCollection(getTheme());
  if (!collectionName && defaultIconCollection) {
    return getIconCollectionByAlias(defaultIconCollection);
  }
  if (!collectionName) {
    return getIconCollectionForTheme("SAP-icons");
  }
  return getIconCollectionForTheme(collectionName);
};
const DEFAULT_THEME_FAMILY = "legacy";
const loaders = /* @__PURE__ */ new Map();
const registry = getSharedResource("SVGIcons.registry", /* @__PURE__ */ new Map());
const iconCollectionPromises = getSharedResource("SVGIcons.promises", /* @__PURE__ */ new Map());
const ICON_NOT_FOUND$1 = "ICON_NOT_FOUND";
const _loadIconCollectionOnce = async (collectionName) => {
  if (!iconCollectionPromises.has(collectionName)) {
    if (!loaders.has(collectionName)) {
      throw new Error(`No loader registered for the ${collectionName} icons collection. Probably you forgot to import the "AllIcons.js" module for the respective package.`);
    }
    const loadIcons = loaders.get(collectionName);
    iconCollectionPromises.set(collectionName, loadIcons(collectionName));
  }
  return iconCollectionPromises.get(collectionName);
};
const _fillRegistry = (bundleData) => {
  Object.keys(bundleData.data).forEach((iconName) => {
    const iconData = bundleData.data[iconName];
    registerIcon(iconName, {
      pathData: iconData.path || iconData.paths,
      ltr: iconData.ltr,
      accData: iconData.acc,
      collection: bundleData.collection,
      packageName: bundleData.packageName
    });
  });
};
const registerIcon = (name, iconData) => {
  const key = `${iconData.collection}/${name}`;
  registry.set(key, {
    pathData: iconData.pathData,
    ltr: iconData.ltr,
    accData: iconData.accData,
    packageName: iconData.packageName,
    customTemplate: iconData.customTemplate,
    viewBox: iconData.viewBox,
    collection: iconData.collection
  });
};
const processName = (name) => {
  if (name.startsWith("sap-icon://")) {
    name = name.replace("sap-icon://", "");
  }
  let collection;
  [name, collection] = name.split("/").reverse();
  name = name.replace("icon-", "");
  if (collection) {
    collection = getIconCollectionByAlias(collection);
  }
  return { name, collection };
};
const getIconDataSync = (iconName) => {
  const { name, collection } = processName(iconName);
  return getRegisteredIconData(collection, name);
};
const getIconData = async (iconName) => {
  const { name, collection } = processName(iconName);
  let iconData = ICON_NOT_FOUND$1;
  try {
    iconData = await _loadIconCollectionOnce(getEffectiveIconCollection(collection));
  } catch (error) {
    const e2 = error;
    console.error(e2.message);
  }
  if (iconData === ICON_NOT_FOUND$1) {
    return iconData;
  }
  const registeredIconData = getRegisteredIconData(collection, name);
  if (registeredIconData) {
    return registeredIconData;
  }
  if (Array.isArray(iconData)) {
    iconData.forEach((data) => {
      _fillRegistry(data);
      registerIconCollectionForTheme(collection, { [data.themeFamily || DEFAULT_THEME_FAMILY]: data.collection });
    });
  } else {
    _fillRegistry(iconData);
  }
  return getRegisteredIconData(collection, name);
};
const getRegisteredIconData = (collection, name) => {
  const registryKey = `${getEffectiveIconCollection(collection)}/${name}`;
  return registry.get(registryKey);
};
const getIconAccessibleName = async (name) => {
  if (!name) {
    return;
  }
  let iconData = getIconDataSync(name);
  if (!iconData) {
    iconData = await getIconData(name);
  }
  if (iconData && iconData !== ICON_NOT_FOUND$1 && iconData.accData) {
    const i18nBundle = await getI18nBundle(iconData.packageName);
    return i18nBundle.getText(iconData.accData);
  }
};
function block0(context, tags, suffix) {
  return effectiveHtml`<svg class="ui5-icon-root" part="root" tabindex="${l$1(this._tabIndex)}" dir="${l$1(this._dir)}" viewBox="${l$1(this.viewBox)}" role="${l$1(this.effectiveAccessibleRole)}" focusable="false" preserveAspectRatio="xMidYMid meet" aria-label="${l$1(this.effectiveAccessibleName)}" aria-hidden=${l$1(this.effectiveAriaHidden)} xmlns="http://www.w3.org/2000/svg" @focusin=${this._onfocusin} @focusout=${this._onfocusout} @keydown=${this._onkeydown} @keyup=${this._onkeyup}>${blockSVG1.call(this, context, tags, suffix)}</svg>`;
}
function block1(context, tags, suffix) {
  return effectiveSvg`<title id="${l$1(this._id)}-tooltip">${l$1(this.effectiveAccessibleName)}</title>`;
}
function block2(context, tags, suffix) {
  return effectiveSvg`${l$1(this.customSvg)}`;
}
function block3(context, tags, suffix, item, index) {
  return effectiveSvg`<path d="${l$1(item)}"></path>`;
}
function blockSVG1(context, tags, suffix) {
  return effectiveSvg`${this.hasIconTooltip ? block1.call(this, context, tags, suffix) : void 0}<g role="presentation">${this.customSvg ? block2.call(this, context, tags, suffix) : void 0}${c(this.pathData, (item, index) => item._id || index, (item, index) => block3.call(this, context, tags, suffix, item, index))}</g>`;
}
var IconDesign;
(function(IconDesign2) {
  IconDesign2["Contrast"] = "Contrast";
  IconDesign2["Critical"] = "Critical";
  IconDesign2["Default"] = "Default";
  IconDesign2["Information"] = "Information";
  IconDesign2["Negative"] = "Negative";
  IconDesign2["Neutral"] = "Neutral";
  IconDesign2["NonInteractive"] = "NonInteractive";
  IconDesign2["Positive"] = "Positive";
})(IconDesign || (IconDesign = {}));
const IconDesign$1 = IconDesign;
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$1);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$2);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/Icon.css.ts", content: `:host{-webkit-tap-highlight-color:rgba(0,0,0,0)}:host([hidden]){display:none}:host([invalid]){display:none}:host(:not([hidden]).ui5_hovered){opacity:.7}:host{display:inline-block;width:1rem;height:1rem;color:var(--sapContent_NonInteractiveIconColor);fill:currentColor;outline:none}:host([design="Contrast"]){color:var(--sapContent_ContrastIconColor)}:host([design="Critical"]){color:var(--sapCriticalElementColor)}:host([design="Default"]){color:var(--sapContent_IconColor)}:host([design="Information"]){color:var(--sapInformativeElementColor)}:host([design="Negative"]){color:var(--sapNegativeElementColor)}:host([design="Neutral"]){color:var(--sapNeutralElementColor)}:host([design="NonInteractive"]){color:var(--sapContent_NonInteractiveIconColor)}:host([design="Positive"]){color:var(--sapPositiveElementColor)}:host([interactive][focused]) .ui5-icon-root{outline:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);border-radius:var(--ui5-v1-21-2-icon-focus-border-radius)}.ui5-icon-root{display:flex;height:100%;width:100%;outline:none;vertical-align:top}:host([interactive]){cursor:pointer}.ui5-icon-root:not([dir=ltr]){transform:var(--_ui5-v1-21-2_icon_transform_scale);transform-origin:center}
` };
var __decorate = function(decorators, target, key, desc) {
  var c2 = arguments.length, r2 = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r2 = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i2 = decorators.length - 1; i2 >= 0; i2--)
      if (d = decorators[i2])
        r2 = (c2 < 3 ? d(r2) : c2 > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c2 > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const ICON_NOT_FOUND = "ICON_NOT_FOUND";
const PRESENTATION_ROLE = "presentation";
let Icon = class Icon2 extends UI5Element {
  _onFocusInHandler() {
    if (this.interactive) {
      this.focused = true;
    }
  }
  _onFocusOutHandler() {
    this.focused = false;
  }
  _onkeydown(e2) {
    if (!this.interactive) {
      return;
    }
    if (isEnter(e2)) {
      this.fireEvent("click");
    }
    if (isSpace(e2)) {
      e2.preventDefault();
    }
  }
  _onkeyup(e2) {
    if (this.interactive && isSpace(e2)) {
      this.fireEvent("click");
    }
  }
  /**
  * Enforce "ltr" direction, based on the icons collection metadata.
  */
  get _dir() {
    return this.ltr ? "ltr" : void 0;
  }
  get effectiveAriaHidden() {
    if (this.ariaHidden === "") {
      if (this.isDecorative) {
        return true;
      }
      return;
    }
    return this.ariaHidden;
  }
  get _tabIndex() {
    return this.interactive ? "0" : void 0;
  }
  get isDecorative() {
    return this.effectiveAccessibleRole === PRESENTATION_ROLE;
  }
  get effectiveAccessibleRole() {
    if (this.accessibleRole) {
      return this.accessibleRole;
    }
    if (this.interactive) {
      return "button";
    }
    return this.effectiveAccessibleName ? "img" : PRESENTATION_ROLE;
  }
  async onBeforeRendering() {
    const name = this.name;
    if (!name) {
      return console.warn("Icon name property is required", this);
    }
    let iconData = getIconDataSync(name);
    if (!iconData) {
      iconData = await getIconData(name);
    }
    if (!iconData) {
      this.invalid = true;
      return console.warn(`Required icon is not registered. Invalid icon name: ${this.name}`);
    }
    if (iconData === ICON_NOT_FOUND) {
      this.invalid = true;
      return console.warn(`Required icon is not registered. You can either import the icon as a module in order to use it e.g. "@ui5/webcomponents-icons/dist/${name.replace("sap-icon://", "")}.js", or setup a JSON build step and import "@ui5/webcomponents-icons/dist/AllIcons.js".`);
    }
    this.viewBox = iconData.viewBox || "0 0 512 512";
    if (iconData.customTemplate) {
      iconData.pathData = [];
      this.customSvg = executeTemplate(iconData.customTemplate, this);
    }
    this.invalid = false;
    this.pathData = Array.isArray(iconData.pathData) ? iconData.pathData : [iconData.pathData];
    this.accData = iconData.accData;
    this.ltr = iconData.ltr;
    this.packageName = iconData.packageName;
    this._onfocusout = this.interactive ? this._onFocusOutHandler.bind(this) : void 0;
    this._onfocusin = this.interactive ? this._onFocusInHandler.bind(this) : void 0;
    if (this.accessibleName) {
      this.effectiveAccessibleName = this.accessibleName;
    } else if (this.accData) {
      const i18nBundle = await getI18nBundle(this.packageName);
      this.effectiveAccessibleName = i18nBundle.getText(this.accData) || void 0;
    } else {
      this.effectiveAccessibleName = void 0;
    }
  }
  get hasIconTooltip() {
    return this.showTooltip && this.effectiveAccessibleName;
  }
};
__decorate([
  property({ type: IconDesign$1, defaultValue: IconDesign$1.Default })
], Icon.prototype, "design", void 0);
__decorate([
  property({ type: Boolean })
], Icon.prototype, "interactive", void 0);
__decorate([
  property()
], Icon.prototype, "name", void 0);
__decorate([
  property()
], Icon.prototype, "accessibleName", void 0);
__decorate([
  property({ type: Boolean })
], Icon.prototype, "showTooltip", void 0);
__decorate([
  property()
], Icon.prototype, "accessibleRole", void 0);
__decorate([
  property()
], Icon.prototype, "ariaHidden", void 0);
__decorate([
  property({ multiple: true })
], Icon.prototype, "pathData", void 0);
__decorate([
  property({ type: Object, defaultValue: void 0, noAttribute: true })
], Icon.prototype, "accData", void 0);
__decorate([
  property({ type: Boolean })
], Icon.prototype, "focused", void 0);
__decorate([
  property({ type: Boolean })
], Icon.prototype, "invalid", void 0);
__decorate([
  property({ noAttribute: true, defaultValue: void 0 })
], Icon.prototype, "effectiveAccessibleName", void 0);
Icon = __decorate([
  customElement({
    tag: "ui5-icon",
    languageAware: true,
    themeAware: true,
    renderer: litRender,
    template: block0,
    styles: styleData
  }),
  event("click")
], Icon);
Icon.define();
const Icon$1 = Icon;
export {
  Icon$1 as I,
  isDelete as a,
  isEscape as b,
  c,
  isUp as d,
  event as e,
  isDown as f,
  isSpace as g,
  isTabNext as h,
  isBackSpace as i,
  isEnter as j,
  isPageUp as k,
  isPageDown as l,
  isHome as m,
  isEnd as n,
  isTabPrevious as o,
  isLeft as p,
  isRight as q,
  registerIcon as r,
  isUpShift as s,
  isDownShift as t,
  isLeftShift as u,
  isRightShift as v,
  isShow as w,
  getIconAccessibleName as x
};
