var class2type = {};
var hasOwn = class2type.hasOwnProperty;
var toString = class2type.toString;
var fnToString = hasOwn.toString;
var ObjectFunctionString = fnToString.call(Object);
var fnIsPlainObject = function(obj) {
  var proto, Ctor;
  if (!obj || toString.call(obj) !== "[object Object]") {
    return false;
  }
  proto = Object.getPrototypeOf(obj);
  if (!proto) {
    return true;
  }
  Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
  return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
};
var oToken = /* @__PURE__ */ Object.create(null);
var fnMerge$1 = function(arg1, arg2, arg3, arg4) {
  var src, copyIsArray, copy, name, options, clone, target = arguments[2] || {}, i2 = 3, length = arguments.length, deep = arguments[0] || false, skipToken = arguments[1] ? void 0 : oToken;
  if (typeof target !== "object" && typeof target !== "function") {
    target = {};
  }
  for (; i2 < length; i2++) {
    if ((options = arguments[i2]) != null) {
      for (name in options) {
        src = target[name];
        copy = options[name];
        if (name === "__proto__" || target === copy) {
          continue;
        }
        if (deep && copy && (fnIsPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && Array.isArray(src) ? src : [];
          } else {
            clone = src && fnIsPlainObject(src) ? src : {};
          }
          target[name] = fnMerge$1(deep, arguments[1], clone, copy);
        } else if (copy !== skipToken) {
          target[name] = copy;
        }
      }
    }
  }
  return target;
};
const fnMerge = function(arg1, arg2) {
  return fnMerge$1(true, false, ...arguments);
};
const whenDOMReady = () => {
  return new Promise((resolve) => {
    if (document.body) {
      resolve();
    } else {
      document.addEventListener("DOMContentLoaded", () => {
        resolve();
      });
    }
  });
};
class EventProvider {
  constructor() {
    this._eventRegistry = /* @__PURE__ */ new Map();
  }
  attachEvent(eventName, fnFunction) {
    const eventRegistry = this._eventRegistry;
    const eventListeners = eventRegistry.get(eventName);
    if (!Array.isArray(eventListeners)) {
      eventRegistry.set(eventName, [fnFunction]);
      return;
    }
    if (!eventListeners.includes(fnFunction)) {
      eventListeners.push(fnFunction);
    }
  }
  detachEvent(eventName, fnFunction) {
    const eventRegistry = this._eventRegistry;
    const eventListeners = eventRegistry.get(eventName);
    if (!eventListeners) {
      return;
    }
    const indexOfFnToDetach = eventListeners.indexOf(fnFunction);
    if (indexOfFnToDetach !== -1) {
      eventListeners.splice(indexOfFnToDetach, 1);
    }
    if (eventListeners.length === 0) {
      eventRegistry.delete(eventName);
    }
  }
  /**
   * Fires an event and returns the results of all event listeners as an array.
   *
   * @param eventName the event to fire
   * @param data optional data to pass to each event listener
   * @returns {Array} an array with the results of all event listeners
   */
  fireEvent(eventName, data) {
    const eventRegistry = this._eventRegistry;
    const eventListeners = eventRegistry.get(eventName);
    if (!eventListeners) {
      return [];
    }
    return eventListeners.map((fn) => {
      return fn.call(this, data);
    });
  }
  /**
   * Fires an event and returns a promise that will resolve once all listeners have resolved.
   *
   * @param eventName the event to fire
   * @param data optional data to pass to each event listener
   * @returns {Promise} a promise that will resolve when all listeners have resolved
   */
  fireEventAsync(eventName, data) {
    return Promise.all(this.fireEvent(eventName, data));
  }
  isHandlerAttached(eventName, fnFunction) {
    const eventRegistry = this._eventRegistry;
    const eventListeners = eventRegistry.get(eventName);
    if (!eventListeners) {
      return false;
    }
    return eventListeners.includes(fnFunction);
  }
  hasListeners(eventName) {
    return !!this._eventRegistry.get(eventName);
  }
}
const createStyleInHead = (cssText, attributes) => {
  const style = document.createElement("style");
  style.type = "text/css";
  if (attributes) {
    Object.entries(attributes).forEach((pair) => style.setAttribute(...pair));
  }
  style.textContent = cssText;
  document.head.appendChild(style);
  return style;
};
const createLinkInHead = (href, attributes) => {
  const link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  if (attributes) {
    Object.entries(attributes).forEach((pair) => link.setAttribute(...pair));
  }
  link.href = href;
  document.head.appendChild(link);
  return new Promise((resolve) => {
    link.addEventListener("load", resolve);
    link.addEventListener("error", resolve);
  });
};
const isSSR = typeof document === "undefined";
const internals = {
  get userAgent() {
    if (isSSR) {
      return "";
    }
    return navigator.userAgent;
  },
  get touch() {
    if (isSSR) {
      return false;
    }
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  },
  get ie() {
    if (isSSR) {
      return false;
    }
    return /(msie|trident)/i.test(internals.userAgent);
  },
  get chrome() {
    if (isSSR) {
      return false;
    }
    return !internals.ie && /(Chrome|CriOS)/.test(internals.userAgent);
  },
  get firefox() {
    if (isSSR) {
      return false;
    }
    return /Firefox/.test(internals.userAgent);
  },
  get safari() {
    if (isSSR) {
      return false;
    }
    return !internals.ie && !internals.chrome && /(Version|PhantomJS)\/(\d+\.\d+).*Safari/.test(internals.userAgent);
  },
  get webkit() {
    if (isSSR) {
      return false;
    }
    return !internals.ie && /webkit/.test(internals.userAgent);
  },
  get windows() {
    if (isSSR) {
      return false;
    }
    return navigator.platform.indexOf("Win") !== -1;
  },
  get macOS() {
    if (isSSR) {
      return false;
    }
    return !!navigator.userAgent.match(/Macintosh|Mac OS X/i);
  },
  get iOS() {
    if (isSSR) {
      return false;
    }
    return !!navigator.platform.match(/iPhone|iPad|iPod/) || !!(internals.userAgent.match(/Mac/) && "ontouchend" in document);
  },
  get android() {
    if (isSSR) {
      return false;
    }
    return !internals.windows && /Android/.test(internals.userAgent);
  },
  get androidPhone() {
    if (isSSR) {
      return false;
    }
    return internals.android && /(?=android)(?=.*mobile)/i.test(internals.userAgent);
  },
  get ipad() {
    if (isSSR) {
      return false;
    }
    return /ipad/i.test(internals.userAgent) || /Macintosh/i.test(internals.userAgent) && "ontouchend" in document;
  }
};
let windowsVersion;
let webkitVersion;
let tablet;
const isWindows8OrAbove = () => {
  if (isSSR) {
    return false;
  }
  if (!internals.windows) {
    return false;
  }
  if (windowsVersion === void 0) {
    const matches = internals.userAgent.match(/Windows NT (\d+).(\d)/);
    windowsVersion = matches ? parseFloat(matches[1]) : 0;
  }
  return windowsVersion >= 8;
};
const isWebkit537OrAbove = () => {
  if (isSSR) {
    return false;
  }
  if (!internals.webkit) {
    return false;
  }
  if (webkitVersion === void 0) {
    const matches = internals.userAgent.match(/(webkit)[ /]([\w.]+)/);
    webkitVersion = matches ? parseFloat(matches[1]) : 0;
  }
  return webkitVersion >= 537.1;
};
const detectTablet = () => {
  if (isSSR) {
    return false;
  }
  if (tablet !== void 0) {
    return;
  }
  if (internals.ipad) {
    tablet = true;
    return;
  }
  if (internals.touch) {
    if (isWindows8OrAbove()) {
      tablet = true;
      return;
    }
    if (internals.chrome && internals.android) {
      tablet = !/Mobile Safari\/[.0-9]+/.test(internals.userAgent);
      return;
    }
    let densityFactor = window.devicePixelRatio ? window.devicePixelRatio : 1;
    if (internals.android && isWebkit537OrAbove()) {
      densityFactor = 1;
    }
    tablet = Math.min(window.screen.width / densityFactor, window.screen.height / densityFactor) >= 600;
    return;
  }
  tablet = internals.ie && internals.userAgent.indexOf("Touch") !== -1 || internals.android && !internals.androidPhone;
};
const isSafari = () => internals.safari;
const isChrome = () => internals.chrome;
const isTablet = () => {
  detectTablet();
  return (internals.touch || isWindows8OrAbove()) && tablet;
};
const isPhone = () => {
  detectTablet();
  return internals.touch && !tablet;
};
const isDesktop = () => {
  if (isSSR) {
    return false;
  }
  return !isTablet() && !isPhone() || isWindows8OrAbove();
};
const isCombi = () => {
  return isTablet() && isDesktop();
};
const isIOS = () => {
  return internals.iOS;
};
const VersionInfo = {
  version: "1.21.2",
  major: 1,
  minor: 21,
  patch: 2,
  suffix: "",
  isNext: false,
  buildTime: 1705080645
};
const getSingletonElementInstance = (tag, parentElement = document.body, createEl) => {
  let el = document.querySelector(tag);
  if (el) {
    return el;
  }
  el = createEl ? createEl() : document.createElement(tag);
  return parentElement.insertBefore(el, parentElement.firstChild);
};
const getMetaDomEl = () => {
  const el = document.createElement("meta");
  el.setAttribute("name", "ui5-shared-resources");
  el.setAttribute("content", "");
  return el;
};
const getSharedResourcesInstance = () => {
  if (typeof document === "undefined") {
    return null;
  }
  return getSingletonElementInstance(`meta[name="ui5-shared-resources"]`, document.head, getMetaDomEl);
};
const getSharedResource = (namespace, initialValue) => {
  const parts = namespace.split(".");
  let current = getSharedResourcesInstance();
  if (!current) {
    return initialValue;
  }
  for (let i2 = 0; i2 < parts.length; i2++) {
    const part = parts[i2];
    const lastPart = i2 === parts.length - 1;
    if (!Object.prototype.hasOwnProperty.call(current, part)) {
      current[part] = lastPart ? initialValue : {};
    }
    current = current[part];
  }
  return current;
};
let currentRuntimeIndex;
let currentRuntimeAlias = "";
const compareCache = /* @__PURE__ */ new Map();
const Runtimes = getSharedResource("Runtimes", []);
const registerCurrentRuntime = () => {
  if (currentRuntimeIndex === void 0) {
    currentRuntimeIndex = Runtimes.length;
    const versionInfo = VersionInfo;
    Runtimes.push({
      ...versionInfo,
      alias: currentRuntimeAlias,
      description: `Runtime ${currentRuntimeIndex} - ver ${versionInfo.version}${""}`
    });
  }
};
const getCurrentRuntimeIndex = () => {
  return currentRuntimeIndex;
};
const compareRuntimes = (index1, index2) => {
  const cacheIndex = `${index1},${index2}`;
  if (compareCache.has(cacheIndex)) {
    return compareCache.get(cacheIndex);
  }
  const runtime1 = Runtimes[index1];
  const runtime2 = Runtimes[index2];
  if (!runtime1 || !runtime2) {
    throw new Error("Invalid runtime index supplied");
  }
  if (runtime1.isNext || runtime2.isNext) {
    return runtime1.buildTime - runtime2.buildTime;
  }
  const majorDiff = runtime1.major - runtime2.major;
  if (majorDiff) {
    return majorDiff;
  }
  const minorDiff = runtime1.minor - runtime2.minor;
  if (minorDiff) {
    return minorDiff;
  }
  const patchDiff = runtime1.patch - runtime2.patch;
  if (patchDiff) {
    return patchDiff;
  }
  const collator = new Intl.Collator(void 0, { numeric: true, sensitivity: "base" });
  const result = collator.compare(runtime1.suffix, runtime2.suffix);
  compareCache.set(cacheIndex, result);
  return result;
};
const getAllRuntimes = () => {
  return Runtimes;
};
const getStyleId = (name, value) => {
  return value ? `${name}|${value}` : name;
};
const shouldUpdate = (runtimeIndex) => {
  if (runtimeIndex === void 0) {
    return true;
  }
  return compareRuntimes(getCurrentRuntimeIndex(), parseInt(runtimeIndex)) === 1;
};
const createStyle = (data, name, value = "", theme) => {
  const content = typeof data === "string" ? data : data.content;
  const currentRuntimeIndex2 = getCurrentRuntimeIndex();
  if (document.adoptedStyleSheets && !isSafari()) {
    const stylesheet = new CSSStyleSheet();
    stylesheet.replaceSync(content);
    stylesheet._ui5StyleId = getStyleId(name, value);
    if (theme) {
      stylesheet._ui5RuntimeIndex = currentRuntimeIndex2;
      stylesheet._ui5Theme = theme;
    }
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];
  } else {
    const attributes = {};
    attributes[name] = value;
    if (theme) {
      attributes["data-ui5-runtime-index"] = currentRuntimeIndex2;
      attributes["data-ui5-theme"] = theme;
    }
    createStyleInHead(content, attributes);
  }
};
const updateStyle = (data, name, value = "", theme) => {
  const content = typeof data === "string" ? data : data.content;
  const currentRuntimeIndex2 = getCurrentRuntimeIndex();
  if (document.adoptedStyleSheets && !isSafari()) {
    const stylesheet = document.adoptedStyleSheets.find((sh) => sh._ui5StyleId === getStyleId(name, value));
    if (!stylesheet) {
      return;
    }
    if (!theme) {
      stylesheet.replaceSync(content || "");
    } else {
      const stylesheetRuntimeIndex = stylesheet._ui5RuntimeIndex;
      const stylesheetTheme = stylesheet._ui5Theme;
      if (stylesheetTheme !== theme || shouldUpdate(stylesheetRuntimeIndex)) {
        stylesheet.replaceSync(content || "");
        stylesheet._ui5RuntimeIndex = String(currentRuntimeIndex2);
        stylesheet._ui5Theme = theme;
      }
    }
  } else {
    const style = document.querySelector(`head>style[${name}="${value}"]`);
    if (!style) {
      return;
    }
    if (!theme) {
      style.textContent = content || "";
    } else {
      const styleRuntimeIndex = style.getAttribute("data-ui5-runtime-index") || void 0;
      const styleTheme = style.getAttribute("data-ui5-theme");
      if (styleTheme !== theme || shouldUpdate(styleRuntimeIndex)) {
        style.textContent = content || "";
        style.setAttribute("data-ui5-runtime-index", String(currentRuntimeIndex2));
        style.setAttribute("data-ui5-theme", theme);
      }
    }
  }
};
const hasStyle = (name, value = "") => {
  const styleElement = document.querySelector(`head>style[${name}="${value}"]`);
  if (document.adoptedStyleSheets && !isSafari()) {
    return !!styleElement || !!document.adoptedStyleSheets.find((sh) => sh._ui5StyleId === getStyleId(name, value));
  }
  return !!styleElement;
};
const removeStyle = (name, value = "") => {
  var _a;
  if (document.adoptedStyleSheets && !isSafari()) {
    document.adoptedStyleSheets = document.adoptedStyleSheets.filter((sh) => sh._ui5StyleId !== getStyleId(name, value));
  } else {
    const styleElement = document.querySelector(`head > style[${name}="${value}"]`);
    (_a = styleElement == null ? void 0 : styleElement.parentElement) == null ? void 0 : _a.removeChild(styleElement);
  }
};
const createOrUpdateStyle = (data, name, value = "", theme) => {
  if (hasStyle(name, value)) {
    updateStyle(data, name, value, theme);
  } else {
    createStyle(data, name, value, theme);
  }
};
const mergeStyles = (style1, style2) => {
  if (style1 === void 0) {
    return style2;
  }
  if (style2 === void 0) {
    return style1;
  }
  const style2Content = typeof style2 === "string" ? style2 : style2.content;
  if (typeof style1 === "string") {
    return `${style1} ${style2Content}`;
  }
  return {
    content: `${style1.content} ${style2Content}`,
    packageName: style1.packageName,
    fileName: style1.fileName
  };
};
const features = /* @__PURE__ */ new Map();
const getFeature = (name) => {
  return features.get(name);
};
const styleData$6 = {
  packageName: "@ui5/webcomponents-base",
  fileName: "FontFace.css",
  content: `@font-face{font-family:"72";font-style:normal;font-weight:400;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Regular.woff2?ui5-webcomponents) format("woff2"),local("72");unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:"72full";font-style:normal;font-weight:400;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Regular-full.woff2?ui5-webcomponents) format("woff2"),local('72-full')}@font-face{font-family:"72";font-style:normal;font-weight:700;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold.woff2?ui5-webcomponents) format("woff2"),local('72-Bold');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:"72full";font-style:normal;font-weight:700;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold-full.woff2?ui5-webcomponents) format("woff2")}@font-face{font-family:'72-Bold';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold.woff2?ui5-webcomponents) format("woff2"),local('72-Bold');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72-Boldfull';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold-full.woff2?ui5-webcomponents) format("woff2")}@font-face{font-family:'72-Light';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Light.woff2?ui5-webcomponents) format("woff2"),local('72-Light');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72-Lightfull';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Light-full.woff2?ui5-webcomponents) format("woff2")}@font-face{font-family:'72Mono';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Regular.woff2?ui5-webcomponents) format('woff2'),local('72Mono');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72Monofull';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Regular-full.woff2?ui5-webcomponents) format('woff2')}@font-face{font-family:'72Mono-Bold';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Bold.woff2?ui5-webcomponents) format('woff2'),local('72Mono-Bold');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72Mono-Boldfull';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Bold-full.woff2?ui5-webcomponents) format('woff2')}@font-face{font-family:"72Black";font-style:bold;font-weight:900;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Black.woff2?ui5-webcomponents) format("woff2"),local('72Black');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72Blackfull';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Black-full.woff2?ui5-webcomponents) format('woff2')}@font-face{font-family:"72-SemiboldDuplex";src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-SemiboldDuplex.woff2?ui5-webcomponents) format("woff2"),local('72-SemiboldDuplex');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}`
};
const styleData$5 = {
  packageName: "@ui5/webcomponents-base",
  fileName: "OverrideFontFace.css",
  content: `@font-face{font-family:'72override';unicode-range:U+0102-0103,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EB7,U+1EB8-1EC7,U+1EC8-1ECB,U+1ECC-1EE3,U+1EE4-1EF1,U+1EF4-1EF7;src:local('Arial'),local('Helvetica'),local('sans-serif')}`
};
const insertFontFace = () => {
  const openUI5Support = getFeature("OpenUI5Support");
  if (!openUI5Support || !openUI5Support.isOpenUI5Detected()) {
    insertMainFontFace();
  }
  insertOverrideFontFace();
};
const insertMainFontFace = () => {
  if (!hasStyle("data-ui5-font-face")) {
    createStyle(styleData$6, "data-ui5-font-face");
  }
};
const insertOverrideFontFace = () => {
  if (!hasStyle("data-ui5-font-face-override")) {
    createStyle(styleData$5, "data-ui5-font-face-override");
  }
};
const styleData$4 = {
  packageName: "@ui5/webcomponents-base",
  fileName: "SystemCSSVars.css",
  content: `:root{--_ui5_content_density:cozy}.sapUiSizeCompact,.ui5-content-density-compact,[data-ui5-compact-size]{--_ui5_content_density:compact}[dir=rtl]{--_ui5_dir:rtl}[dir=ltr]{--_ui5_dir:ltr}`
};
const insertSystemCSSVars = () => {
  if (!hasStyle("data-ui5-system-css-vars")) {
    createStyle(styleData$4, "data-ui5-system-css-vars");
  }
};
const assetParameters = { "themes": { "default": "sap_horizon", "all": ["sap_fiori_3", "sap_fiori_3_dark", "sap_belize", "sap_belize_hcb", "sap_belize_hcw", "sap_fiori_3_hcb", "sap_fiori_3_hcw", "sap_horizon", "sap_horizon_dark", "sap_horizon_hcb", "sap_horizon_hcw", "sap_horizon_exp", "sap_horizon_dark_exp", "sap_horizon_hcb_exp", "sap_horizon_hcw_exp"] }, "languages": { "default": "en", "all": ["ar", "bg", "ca", "cnr", "cs", "cy", "da", "de", "el", "en", "en_GB", "en_US_sappsd", "en_US_saprigi", "en_US_saptrc", "es", "es_MX", "et", "fi", "fr", "fr_CA", "hi", "hr", "hu", "in", "it", "iw", "ja", "kk", "ko", "lt", "lv", "mk", "ms", "nl", "no", "pl", "pt_PT", "pt", "ro", "ru", "sh", "sk", "sl", "sr", "sv", "th", "tr", "uk", "vi", "zh_CN", "zh_TW"] }, "locales": { "default": "en", "all": ["ar", "ar_EG", "ar_SA", "bg", "ca", "cs", "da", "de", "de_AT", "de_CH", "el", "el_CY", "en", "en_AU", "en_GB", "en_HK", "en_IE", "en_IN", "en_NZ", "en_PG", "en_SG", "en_ZA", "es", "es_AR", "es_BO", "es_CL", "es_CO", "es_MX", "es_PE", "es_UY", "es_VE", "et", "fa", "fi", "fr", "fr_BE", "fr_CA", "fr_CH", "fr_LU", "he", "hi", "hr", "hu", "id", "it", "it_CH", "ja", "kk", "ko", "lt", "lv", "ms", "nb", "nl", "nl_BE", "pl", "pt", "pt_PT", "ro", "ru", "ru_UA", "sk", "sl", "sr", "sr_Latn", "sv", "th", "tr", "uk", "vi", "zh_CN", "zh_HK", "zh_SG", "zh_TW"] } };
const DEFAULT_THEME = assetParameters.themes.default;
const SUPPORTED_THEMES = assetParameters.themes.all;
const DEFAULT_LANGUAGE = assetParameters.languages.default;
const DEFAULT_LOCALE = assetParameters.locales.default;
const getMetaTagValue = (metaTagName) => {
  const metaTag = document.querySelector(`META[name="${metaTagName}"]`), metaTagContent = metaTag && metaTag.getAttribute("content");
  return metaTagContent;
};
const validateThemeOrigin = (origin) => {
  const allowedOrigins = getMetaTagValue("sap-allowedThemeOrigins");
  return allowedOrigins && allowedOrigins.split(",").some((allowedOrigin) => {
    return allowedOrigin === "*" || origin === allowedOrigin.trim();
  });
};
const buildCorrectUrl = (oldUrl, newOrigin) => {
  const oldUrlPath = new URL(oldUrl).pathname;
  return new URL(oldUrlPath, newOrigin).toString();
};
const validateThemeRoot = (themeRoot) => {
  let resultUrl;
  try {
    if (themeRoot.startsWith(".") || themeRoot.startsWith("/")) {
      resultUrl = new URL(themeRoot, window.location.href).toString();
    } else {
      const themeRootURL = new URL(themeRoot);
      const origin = themeRootURL.origin;
      if (origin && validateThemeOrigin(origin)) {
        resultUrl = themeRootURL.toString();
      } else {
        resultUrl = buildCorrectUrl(themeRootURL.toString(), window.location.href);
      }
    }
    if (!resultUrl.endsWith("/")) {
      resultUrl = `${resultUrl}/`;
    }
    return `${resultUrl}UI5/`;
  } catch (e2) {
  }
};
var AnimationMode;
(function(AnimationMode2) {
  AnimationMode2["Full"] = "full";
  AnimationMode2["Basic"] = "basic";
  AnimationMode2["Minimal"] = "minimal";
  AnimationMode2["None"] = "none";
})(AnimationMode || (AnimationMode = {}));
const AnimationMode$1 = AnimationMode;
let initialized = false;
let initialConfig = {
  animationMode: AnimationMode$1.Full,
  theme: DEFAULT_THEME,
  themeRoot: void 0,
  rtl: void 0,
  language: void 0,
  timezone: void 0,
  calendarType: void 0,
  secondaryCalendarType: void 0,
  noConflict: false,
  formatSettings: {},
  fetchDefaultLanguage: false
};
const getTheme$1 = () => {
  initConfiguration();
  return initialConfig.theme;
};
const getThemeRoot$1 = () => {
  initConfiguration();
  return initialConfig.themeRoot;
};
const getRTL$1 = () => {
  initConfiguration();
  return initialConfig.rtl;
};
const getLanguage$1 = () => {
  initConfiguration();
  return initialConfig.language;
};
const getFetchDefaultLanguage$1 = () => {
  initConfiguration();
  return initialConfig.fetchDefaultLanguage;
};
const getNoConflict$1 = () => {
  initConfiguration();
  return initialConfig.noConflict;
};
const booleanMapping = /* @__PURE__ */ new Map();
booleanMapping.set("true", true);
booleanMapping.set("false", false);
const parseConfigurationScript = () => {
  const configScript = document.querySelector("[data-ui5-config]") || document.querySelector("[data-id='sap-ui-config']");
  let configJSON;
  if (configScript) {
    try {
      configJSON = JSON.parse(configScript.innerHTML);
    } catch (err) {
      console.warn("Incorrect data-sap-ui-config format. Please use JSON");
    }
    if (configJSON) {
      initialConfig = fnMerge(initialConfig, configJSON);
    }
  }
};
const parseURLParameters = () => {
  const params = new URLSearchParams(window.location.search);
  params.forEach((value, key) => {
    const parts = key.split("sap-").length;
    if (parts === 0 || parts === key.split("sap-ui-").length) {
      return;
    }
    applyURLParam(key, value, "sap");
  });
  params.forEach((value, key) => {
    if (!key.startsWith("sap-ui")) {
      return;
    }
    applyURLParam(key, value, "sap-ui");
  });
};
const normalizeThemeRootParamValue = (value) => {
  const themeRoot = value.split("@")[1];
  return validateThemeRoot(themeRoot);
};
const normalizeThemeParamValue = (param, value) => {
  if (param === "theme" && value.includes("@")) {
    return value.split("@")[0];
  }
  return value;
};
const applyURLParam = (key, value, paramType) => {
  const lowerCaseValue = value.toLowerCase();
  const param = key.split(`${paramType}-`)[1];
  if (booleanMapping.has(value)) {
    value = booleanMapping.get(lowerCaseValue);
  }
  if (param === "theme") {
    initialConfig.theme = normalizeThemeParamValue(param, value);
    if (value && value.includes("@")) {
      initialConfig.themeRoot = normalizeThemeRootParamValue(value);
    }
  } else {
    initialConfig[param] = value;
  }
};
const applyOpenUI5Configuration = () => {
  const openUI5Support = getFeature("OpenUI5Support");
  if (!openUI5Support || !openUI5Support.isOpenUI5Detected()) {
    return;
  }
  const OpenUI5Config = openUI5Support.getConfigurationSettingsObject();
  initialConfig = fnMerge(initialConfig, OpenUI5Config);
};
const initConfiguration = () => {
  if (typeof document === "undefined" || initialized) {
    return;
  }
  parseConfigurationScript();
  parseURLParameters();
  applyOpenUI5Configuration();
  initialized = true;
};
const MAX_PROCESS_COUNT = 10;
class RenderQueue {
  constructor() {
    this.list = [];
    this.lookup = /* @__PURE__ */ new Set();
  }
  add(webComponent) {
    if (this.lookup.has(webComponent)) {
      return;
    }
    this.list.push(webComponent);
    this.lookup.add(webComponent);
  }
  remove(webComponent) {
    if (!this.lookup.has(webComponent)) {
      return;
    }
    this.list = this.list.filter((item) => item !== webComponent);
    this.lookup.delete(webComponent);
  }
  shift() {
    const webComponent = this.list.shift();
    if (webComponent) {
      this.lookup.delete(webComponent);
      return webComponent;
    }
  }
  isEmpty() {
    return this.list.length === 0;
  }
  isAdded(webComponent) {
    return this.lookup.has(webComponent);
  }
  /**
   * Processes the whole queue by executing the callback on each component,
   * while also imposing restrictions on how many times a component may be processed.
   *
   * @param callback - function with one argument (the web component to be processed)
   */
  process(callback) {
    let webComponent;
    const stats = /* @__PURE__ */ new Map();
    webComponent = this.shift();
    while (webComponent) {
      const timesProcessed = stats.get(webComponent) || 0;
      if (timesProcessed > MAX_PROCESS_COUNT) {
        throw new Error(`Web component processed too many times this task, max allowed is: ${MAX_PROCESS_COUNT}`);
      }
      callback(webComponent);
      stats.set(webComponent, timesProcessed + 1);
      webComponent = this.shift();
    }
  }
}
const Tags = getSharedResource("Tags", /* @__PURE__ */ new Map());
const Definitions = /* @__PURE__ */ new Set();
let Failures = /* @__PURE__ */ new Map();
let failureTimeout;
const UNKNOWN_RUNTIME = -1;
const registerTag = (tag) => {
  Definitions.add(tag);
  Tags.set(tag, getCurrentRuntimeIndex());
};
const isTagRegistered = (tag) => {
  return Definitions.has(tag);
};
const getAllRegisteredTags = () => {
  return [...Definitions.values()];
};
const recordTagRegistrationFailure = (tag) => {
  let tagRegRuntimeIndex = Tags.get(tag);
  if (tagRegRuntimeIndex === void 0) {
    tagRegRuntimeIndex = UNKNOWN_RUNTIME;
  }
  if (!Failures.has(tagRegRuntimeIndex)) {
    Failures.set(tagRegRuntimeIndex, /* @__PURE__ */ new Set());
  }
  Failures.get(tagRegRuntimeIndex).add(tag);
  if (!failureTimeout) {
    failureTimeout = setTimeout(() => {
      displayFailedRegistrations();
      Failures = /* @__PURE__ */ new Map();
      failureTimeout = void 0;
    }, 1e3);
  }
};
const displayFailedRegistrations = () => {
  const allRuntimes = getAllRuntimes();
  const currentRuntimeIndex2 = getCurrentRuntimeIndex();
  const currentRuntime = allRuntimes[currentRuntimeIndex2];
  let message = `Multiple UI5 Web Components instances detected.`;
  if (allRuntimes.length > 1) {
    message = `${message}
Loading order (versions before 1.1.0 not listed): ${allRuntimes.map((runtime) => `
${runtime.description}`).join("")}`;
  }
  [...Failures.keys()].forEach((otherRuntimeIndex) => {
    let comparison;
    let otherRuntime;
    if (otherRuntimeIndex === UNKNOWN_RUNTIME) {
      comparison = 1;
      otherRuntime = {
        description: `Older unknown runtime`
      };
    } else {
      comparison = compareRuntimes(currentRuntimeIndex2, otherRuntimeIndex);
      otherRuntime = allRuntimes[otherRuntimeIndex];
    }
    let compareWord;
    if (comparison > 0) {
      compareWord = "an older";
    } else if (comparison < 0) {
      compareWord = "a newer";
    } else {
      compareWord = "the same";
    }
    message = `${message}

"${currentRuntime.description}" failed to define ${Failures.get(otherRuntimeIndex).size} tag(s) as they were defined by a runtime of ${compareWord} version "${otherRuntime.description}": ${[...Failures.get(otherRuntimeIndex)].sort().join(", ")}.`;
    if (comparison > 0) {
      message = `${message}
WARNING! If your code uses features of the above web components, unavailable in ${otherRuntime.description}, it might not work as expected!`;
    } else {
      message = `${message}
Since the above web components were defined by the same or newer version runtime, they should be compatible with your code.`;
    }
  });
  message = `${message}

To prevent other runtimes from defining tags that you use, consider using scoping or have third-party libraries use scoping: https://github.com/SAP/ui5-webcomponents/blob/main/docs/2-advanced/03-scoping.md.`;
  console.warn(message);
};
const rtlAwareSet = /* @__PURE__ */ new Set();
const markAsRtlAware = (klass) => {
  rtlAwareSet.add(klass);
};
const isRtlAware = (klass) => {
  return rtlAwareSet.has(klass);
};
const registeredElements = /* @__PURE__ */ new Set();
const eventProvider$4 = new EventProvider();
const invalidatedWebComponents = new RenderQueue();
let renderTaskPromise, renderTaskPromiseResolve;
let mutationObserverTimer;
let queuePromise;
const renderDeferred = async (webComponent) => {
  invalidatedWebComponents.add(webComponent);
  await scheduleRenderTask();
};
const renderImmediately = (webComponent) => {
  eventProvider$4.fireEvent("beforeComponentRender", webComponent);
  registeredElements.add(webComponent);
  webComponent._render();
};
const cancelRender = (webComponent) => {
  invalidatedWebComponents.remove(webComponent);
  registeredElements.delete(webComponent);
};
const scheduleRenderTask = async () => {
  if (!queuePromise) {
    queuePromise = new Promise((resolve) => {
      window.requestAnimationFrame(() => {
        invalidatedWebComponents.process(renderImmediately);
        queuePromise = null;
        resolve();
        if (!mutationObserverTimer) {
          mutationObserverTimer = setTimeout(() => {
            mutationObserverTimer = void 0;
            if (invalidatedWebComponents.isEmpty()) {
              _resolveTaskPromise();
            }
          }, 200);
        }
      });
    });
  }
  await queuePromise;
};
const whenDOMUpdated = () => {
  if (renderTaskPromise) {
    return renderTaskPromise;
  }
  renderTaskPromise = new Promise((resolve) => {
    renderTaskPromiseResolve = resolve;
    window.requestAnimationFrame(() => {
      if (invalidatedWebComponents.isEmpty()) {
        renderTaskPromise = void 0;
        resolve();
      }
    });
  });
  return renderTaskPromise;
};
const whenAllCustomElementsAreDefined = () => {
  const definedPromises = getAllRegisteredTags().map((tag) => customElements.whenDefined(tag));
  return Promise.all(definedPromises);
};
const renderFinished = async () => {
  await whenAllCustomElementsAreDefined();
  await whenDOMUpdated();
};
const _resolveTaskPromise = () => {
  if (!invalidatedWebComponents.isEmpty()) {
    return;
  }
  if (renderTaskPromiseResolve) {
    renderTaskPromiseResolve();
    renderTaskPromiseResolve = void 0;
    renderTaskPromise = void 0;
  }
};
const reRenderAllUI5Elements = async (filters) => {
  registeredElements.forEach((element) => {
    const ctor = element.constructor;
    const tag = ctor.getMetadata().getTag();
    const rtlAware = isRtlAware(ctor);
    const languageAware = ctor.getMetadata().isLanguageAware();
    const themeAware = ctor.getMetadata().isThemeAware();
    if (!filters || filters.tag === tag || filters.rtlAware && rtlAware || filters.languageAware && languageAware || filters.themeAware && themeAware) {
      renderDeferred(element);
    }
  });
  await renderFinished();
};
const eventProvider$3 = new EventProvider();
const THEME_REGISTERED = "themeRegistered";
const attachThemeRegistered = (listener) => {
  eventProvider$3.attachEvent(THEME_REGISTERED, listener);
};
const fireThemeRegistered = (theme) => {
  return eventProvider$3.fireEvent(THEME_REGISTERED, theme);
};
const themeStyles = /* @__PURE__ */ new Map();
const loaders$2 = /* @__PURE__ */ new Map();
const customLoaders = /* @__PURE__ */ new Map();
const registeredPackages = /* @__PURE__ */ new Set();
const registeredThemes = /* @__PURE__ */ new Set();
const registerThemePropertiesLoader = (packageName, themeName, loader) => {
  loaders$2.set(`${packageName}/${themeName}`, loader);
  registeredPackages.add(packageName);
  registeredThemes.add(themeName);
  fireThemeRegistered(themeName);
};
const getThemeProperties = async (packageName, themeName, externalThemeName) => {
  const cacheKey = `${packageName}_${themeName}_${externalThemeName || ""}`;
  const cachedStyleData = themeStyles.get(cacheKey);
  if (cachedStyleData !== void 0) {
    return cachedStyleData;
  }
  if (!registeredThemes.has(themeName)) {
    const regThemesStr = [...registeredThemes.values()].join(", ");
    console.warn(`You have requested a non-registered theme ${themeName} - falling back to ${DEFAULT_THEME}. Registered themes are: ${regThemesStr}`);
    return _getThemeProperties(packageName, DEFAULT_THEME);
  }
  const [style, customStyle] = await Promise.all([
    _getThemeProperties(packageName, themeName),
    externalThemeName ? _getThemeProperties(packageName, externalThemeName, true) : void 0
  ]);
  const styleData2 = mergeStyles(style, customStyle);
  if (styleData2) {
    themeStyles.set(cacheKey, styleData2);
  }
  return styleData2;
};
const _getThemeProperties = async (packageName, themeName, forCustomTheme = false) => {
  const loadersMap = forCustomTheme ? customLoaders : loaders$2;
  const loader = loadersMap.get(`${packageName}/${themeName}`);
  if (!loader) {
    if (!forCustomTheme) {
      console.error(`Theme [${themeName}] not registered for package [${packageName}]`);
    }
    return;
  }
  let data;
  try {
    data = await loader(themeName);
  } catch (error) {
    const e2 = error;
    console.error(packageName, e2.message);
    return;
  }
  const themeProps = data._ || data;
  return themeProps;
};
const getRegisteredPackages = () => {
  return registeredPackages;
};
const isThemeRegistered = (theme) => {
  return registeredThemes.has(theme);
};
const warnings = /* @__PURE__ */ new Set();
const getThemeMetadata = () => {
  let el = document.querySelector(".sapThemeMetaData-Base-baseLib") || document.querySelector(".sapThemeMetaData-UI5-sap-ui-core");
  if (el) {
    return getComputedStyle(el).backgroundImage;
  }
  el = document.createElement("span");
  el.style.display = "none";
  el.classList.add("sapThemeMetaData-Base-baseLib");
  document.body.appendChild(el);
  let metadata = getComputedStyle(el).backgroundImage;
  if (metadata === "none") {
    el.classList.add("sapThemeMetaData-UI5-sap-ui-core");
    metadata = getComputedStyle(el).backgroundImage;
  }
  document.body.removeChild(el);
  return metadata;
};
const parseThemeMetadata = (metadataString) => {
  const params = /\(["']?data:text\/plain;utf-8,(.*?)['"]?\)$/i.exec(metadataString);
  if (params && params.length >= 2) {
    let paramsString = params[1];
    paramsString = paramsString.replace(/\\"/g, `"`);
    if (paramsString.charAt(0) !== "{" && paramsString.charAt(paramsString.length - 1) !== "}") {
      try {
        paramsString = decodeURIComponent(paramsString);
      } catch (ex) {
        if (!warnings.has("decode")) {
          console.warn("Malformed theme metadata string, unable to decodeURIComponent");
          warnings.add("decode");
        }
        return;
      }
    }
    try {
      return JSON.parse(paramsString);
    } catch (ex) {
      if (!warnings.has("parse")) {
        console.warn("Malformed theme metadata string, unable to parse JSON");
        warnings.add("parse");
      }
    }
  }
};
const processThemeMetadata = (metadata) => {
  let themeName;
  let baseThemeName;
  try {
    themeName = metadata.Path.match(/\.([^.]+)\.css_variables$/)[1];
    baseThemeName = metadata.Extends[0];
  } catch (ex) {
    if (!warnings.has("object")) {
      console.warn("Malformed theme metadata Object", metadata);
      warnings.add("object");
    }
    return;
  }
  return {
    themeName,
    baseThemeName
  };
};
const getThemeDesignerTheme = () => {
  const metadataString = getThemeMetadata();
  if (!metadataString || metadataString === "none") {
    return;
  }
  const metadata = parseThemeMetadata(metadataString);
  if (metadata) {
    return processThemeMetadata(metadata);
  }
};
const eventProvider$2 = new EventProvider();
const THEME_LOADED = "themeLoaded";
const fireThemeLoaded = (theme) => {
  return eventProvider$2.fireEvent(THEME_LOADED, theme);
};
let currThemeRoot;
const getThemeRoot = () => {
  if (currThemeRoot === void 0) {
    currThemeRoot = getThemeRoot$1();
  }
  return currThemeRoot;
};
const formatThemeLink = (theme) => {
  return `${getThemeRoot()}Base/baseLib/${theme}/css_variables.css`;
};
const attachCustomThemeStylesToHead = async (theme) => {
  const link = document.querySelector(`[sap-ui-webcomponents-theme="${theme}"]`);
  if (link) {
    document.head.removeChild(link);
  }
  await createLinkInHead(formatThemeLink(theme), { "sap-ui-webcomponents-theme": theme });
};
const BASE_THEME_PACKAGE = "@ui5/webcomponents-theming";
const isThemeBaseRegistered = () => {
  const registeredPackages2 = getRegisteredPackages();
  return registeredPackages2.has(BASE_THEME_PACKAGE);
};
const loadThemeBase = async (theme) => {
  if (!isThemeBaseRegistered()) {
    return;
  }
  const cssData = await getThemeProperties(BASE_THEME_PACKAGE, theme);
  if (cssData) {
    createOrUpdateStyle(cssData, "data-ui5-theme-properties", BASE_THEME_PACKAGE, theme);
  }
};
const deleteThemeBase = () => {
  removeStyle("data-ui5-theme-properties", BASE_THEME_PACKAGE);
};
const loadComponentPackages = async (theme, externalThemeName) => {
  const registeredPackages2 = getRegisteredPackages();
  const packagesStylesPromises = [...registeredPackages2].map(async (packageName) => {
    if (packageName === BASE_THEME_PACKAGE) {
      return;
    }
    const cssData = await getThemeProperties(packageName, theme, externalThemeName);
    if (cssData) {
      createOrUpdateStyle(cssData, `data-ui5-component-properties-${getCurrentRuntimeIndex()}`, packageName);
    }
  });
  return Promise.all(packagesStylesPromises);
};
const detectExternalTheme = async (theme) => {
  var _a;
  const extTheme = getThemeDesignerTheme();
  if (extTheme) {
    return extTheme;
  }
  const openUI5Support = getFeature("OpenUI5Support");
  if (openUI5Support && openUI5Support.isOpenUI5Detected()) {
    const varsLoaded = openUI5Support.cssVariablesLoaded();
    if (varsLoaded) {
      return {
        themeName: (_a = openUI5Support.getConfigurationSettingsObject()) == null ? void 0 : _a.theme,
        baseThemeName: ""
        // baseThemeName is only relevant for custom themes
      };
    }
  } else if (getThemeRoot()) {
    await attachCustomThemeStylesToHead(theme);
    return getThemeDesignerTheme();
  }
};
const applyTheme = async (theme) => {
  const extTheme = await detectExternalTheme(theme);
  if (!extTheme || theme !== extTheme.themeName) {
    await loadThemeBase(theme);
  } else {
    deleteThemeBase();
  }
  const packagesTheme = isThemeRegistered(theme) ? theme : extTheme && extTheme.baseThemeName;
  await loadComponentPackages(packagesTheme || DEFAULT_THEME, extTheme && extTheme.themeName === theme ? theme : void 0);
  fireThemeLoaded(theme);
};
let curTheme;
const getTheme = () => {
  if (curTheme === void 0) {
    curTheme = getTheme$1();
  }
  return curTheme;
};
const isLegacyThemeFamily = () => {
  var _a, _b;
  const currentTheme = getTheme();
  if (!isKnownTheme(currentTheme)) {
    return !((_b = (_a = getThemeDesignerTheme()) == null ? void 0 : _a.baseThemeName) == null ? void 0 : _b.startsWith("sap_horizon"));
  }
  return !currentTheme.startsWith("sap_horizon");
};
const isKnownTheme = (theme) => SUPPORTED_THEMES.includes(theme);
let booted = false;
let bootPromise;
const eventProvider$1 = new EventProvider();
const boot = async () => {
  if (bootPromise !== void 0) {
    return bootPromise;
  }
  const bootExecutor = async (resolve) => {
    if (typeof document === "undefined") {
      resolve();
      return;
    }
    attachThemeRegistered(onThemeRegistered);
    registerCurrentRuntime();
    const openUI5Support = getFeature("OpenUI5Support");
    const isOpenUI5Loaded = openUI5Support ? openUI5Support.isOpenUI5Detected() : false;
    const f6Navigation = getFeature("F6Navigation");
    if (openUI5Support) {
      await openUI5Support.init();
    }
    if (f6Navigation && !isOpenUI5Loaded) {
      f6Navigation.init();
    }
    await whenDOMReady();
    await applyTheme(getTheme());
    openUI5Support && openUI5Support.attachListeners();
    insertFontFace();
    insertSystemCSSVars();
    resolve();
    booted = true;
    await eventProvider$1.fireEventAsync("boot");
  };
  bootPromise = new Promise(bootExecutor);
  return bootPromise;
};
const onThemeRegistered = (theme) => {
  const currentTheme = getTheme();
  if (booted && theme === currentTheme) {
    applyTheme(currentTheme);
  }
};
const kebabToCamelMap = /* @__PURE__ */ new Map();
const camelToKebabMap = /* @__PURE__ */ new Map();
const kebabToCamelCase = (string) => {
  if (!kebabToCamelMap.has(string)) {
    const result = toCamelCase(string.split("-"));
    kebabToCamelMap.set(string, result);
  }
  return kebabToCamelMap.get(string);
};
const camelToKebabCase = (string) => {
  if (!camelToKebabMap.has(string)) {
    const result = string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    camelToKebabMap.set(string, result);
  }
  return camelToKebabMap.get(string);
};
const toCamelCase = (parts) => {
  return parts.map((string, index) => {
    return index === 0 ? string.toLowerCase() : string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }).join("");
};
const getSlotName = (node) => {
  if (!(node instanceof HTMLElement)) {
    return "default";
  }
  const slot2 = node.getAttribute("slot");
  if (slot2) {
    const match = slot2.match(/^(.+?)-\d+$/);
    return match ? match[1] : slot2;
  }
  return "default";
};
const getSlottedNodes = (node) => {
  if (node instanceof HTMLSlotElement) {
    return node.assignedNodes({ flatten: true }).filter((item) => item instanceof HTMLElement);
  }
  return [node];
};
const getSlottedNodesList = (nodeList) => {
  return nodeList.reduce((acc, curr) => acc.concat(getSlottedNodes(curr)), []);
};
let suf;
let rulesObj = {
  include: [/^ui5-/],
  exclude: []
};
const tagsCache = /* @__PURE__ */ new Map();
const getCustomElementsScopingSuffix = () => {
  return suf;
};
const shouldScopeCustomElement = (tag) => {
  if (!tagsCache.has(tag)) {
    const result = rulesObj.include.some((rule) => tag.match(rule)) && !rulesObj.exclude.some((rule) => tag.match(rule));
    tagsCache.set(tag, result);
  }
  return tagsCache.get(tag);
};
const getEffectiveScopingSuffixForTag = (tag) => {
  if (shouldScopeCustomElement(tag)) {
    return getCustomElementsScopingSuffix();
  }
};
class UI5ElementMetadata {
  constructor(metadata) {
    this.metadata = metadata;
  }
  getInitialState() {
    if (Object.prototype.hasOwnProperty.call(this, "_initialState")) {
      return this._initialState;
    }
    const initialState = {};
    const slotsAreManaged = this.slotsAreManaged();
    const props = this.getProperties();
    for (const propName in props) {
      const propType = props[propName].type;
      const propDefaultValue = props[propName].defaultValue;
      if (propType === Boolean) {
        initialState[propName] = false;
        if (propDefaultValue !== void 0) {
          console.warn("The 'defaultValue' metadata key is ignored for all booleans properties, they would be initialized with 'false' by default");
        }
      } else if (props[propName].multiple) {
        initialState[propName] = [];
      } else if (propType === Object) {
        initialState[propName] = "defaultValue" in props[propName] ? props[propName].defaultValue : {};
      } else if (propType === String) {
        initialState[propName] = "defaultValue" in props[propName] ? props[propName].defaultValue : "";
      } else {
        initialState[propName] = propDefaultValue;
      }
    }
    if (slotsAreManaged) {
      const slots = this.getSlots();
      for (const [slotName, slotData] of Object.entries(slots)) {
        const propertyName = slotData.propertyName || slotName;
        initialState[propertyName] = [];
      }
    }
    this._initialState = initialState;
    return initialState;
  }
  /**
   * Validates the property's value and returns it if correct
   * or returns the default value if not.
   * <b>Note:</b> Only intended for use by UI5Element.js
   * @public
   */
  static validatePropertyValue(value, propData) {
    const isMultiple = propData.multiple;
    if (isMultiple && value) {
      return value.map((propValue) => validateSingleProperty(propValue, propData));
    }
    return validateSingleProperty(value, propData);
  }
  /**
   * Validates the slot's value and returns it if correct
   * or throws an exception if not.
   * <b>Note:</b> Only intended for use by UI5Element.js
   * @pubic
   */
  static validateSlotValue(value, slotData) {
    return validateSingleSlot(value, slotData);
  }
  /**
   * Returns the tag of the UI5 Element without the scope
   * @public
   */
  getPureTag() {
    return this.metadata.tag || "";
  }
  /**
   * Returns the tag of the UI5 Element
   * @public
   */
  getTag() {
    const pureTag = this.metadata.tag;
    if (!pureTag) {
      return "";
    }
    const suffix = getEffectiveScopingSuffixForTag(pureTag);
    if (!suffix) {
      return pureTag;
    }
    return `${pureTag}-${suffix}`;
  }
  /**
   * Determines whether a property should have an attribute counterpart
   * @public
   * @param propName
   * @returns {boolean}
   */
  hasAttribute(propName) {
    const propData = this.getProperties()[propName];
    return propData.type !== Object && !propData.noAttribute && !propData.multiple;
  }
  /**
   * Returns an array with the properties of the UI5 Element (in camelCase)
   * @public
   * @returns {string[]}
   */
  getPropertiesList() {
    return Object.keys(this.getProperties());
  }
  /**
   * Returns an array with the attributes of the UI5 Element (in kebab-case)
   * @public
   * @returns {string[]}
   */
  getAttributesList() {
    return this.getPropertiesList().filter(this.hasAttribute.bind(this)).map(camelToKebabCase);
  }
  /**
   * Determines whether this UI5 Element has a default slot of type Node, therefore can slot text
   * @returns {boolean}
   */
  canSlotText() {
    var _a;
    return ((_a = this.getSlots().default) == null ? void 0 : _a.type) === Node;
  }
  /**
   * Determines whether this UI5 Element supports any slots
   * @public
   */
  hasSlots() {
    return !!Object.entries(this.getSlots()).length;
  }
  /**
   * Determines whether this UI5 Element supports any slots with "individualSlots: true"
   * @public
   */
  hasIndividualSlots() {
    return this.slotsAreManaged() && Object.values(this.getSlots()).some((slotData) => slotData.individualSlots);
  }
  /**
   * Determines whether this UI5 Element needs to invalidate if children are added/removed/changed
   * @public
   */
  slotsAreManaged() {
    return !!this.metadata.managedSlots;
  }
  /**
   * Determines whether this control supports F6 fast navigation
   * @public
   */
  supportsF6FastNavigation() {
    return !!this.metadata.fastNavigation;
  }
  /**
   * Returns an object with key-value pairs of properties and their metadata definitions
   * @public
   */
  getProperties() {
    if (!this.metadata.properties) {
      this.metadata.properties = {};
    }
    return this.metadata.properties;
  }
  /**
   * Returns an object with key-value pairs of events and their metadata definitions
   * @public
   */
  getEvents() {
    if (!this.metadata.events) {
      this.metadata.events = {};
    }
    return this.metadata.events;
  }
  /**
   * Returns an object with key-value pairs of slots and their metadata definitions
   * @public
   */
  getSlots() {
    if (!this.metadata.slots) {
      this.metadata.slots = {};
    }
    return this.metadata.slots;
  }
  /**
   * Determines whether this UI5 Element has any translatable texts (needs to be invalidated upon language change)
   * @returns {boolean}
   */
  isLanguageAware() {
    return !!this.metadata.languageAware;
  }
  /**
   * Determines whether this UI5 Element has any theme dependant carachteristics.
   * @returns {boolean}
   */
  isThemeAware() {
    return !!this.metadata.themeAware;
  }
  /**
   * Matches a changed entity (property/slot) with the given name against the "invalidateOnChildChange" configuration
   * and determines whether this should cause and invalidation
   *
   * @param slotName the name of the slot in which a child was changed
   * @param type the type of change in the child: "property" or "slot"
   * @param name the name of the property/slot that changed
   * @returns {boolean}
   */
  shouldInvalidateOnChildChange(slotName, type, name) {
    const config = this.getSlots()[slotName].invalidateOnChildChange;
    if (config === void 0) {
      return false;
    }
    if (typeof config === "boolean") {
      return config;
    }
    if (typeof config === "object") {
      if (type === "property") {
        if (config.properties === void 0) {
          return false;
        }
        if (typeof config.properties === "boolean") {
          return config.properties;
        }
        if (Array.isArray(config.properties)) {
          return config.properties.includes(name);
        }
        throw new Error("Wrong format for invalidateOnChildChange.properties: boolean or array is expected");
      }
      if (type === "slot") {
        if (config.slots === void 0) {
          return false;
        }
        if (typeof config.slots === "boolean") {
          return config.slots;
        }
        if (Array.isArray(config.slots)) {
          return config.slots.includes(name);
        }
        throw new Error("Wrong format for invalidateOnChildChange.slots: boolean or array is expected");
      }
    }
    throw new Error("Wrong format for invalidateOnChildChange: boolean or object is expected");
  }
}
const validateSingleProperty = (value, propData) => {
  const propertyType = propData.type;
  let propertyValidator = propData.validator;
  if (propertyType && propertyType.isDataTypeClass) {
    propertyValidator = propertyType;
  }
  if (propertyValidator) {
    return propertyValidator.isValid(value) ? value : propData.defaultValue;
  }
  if (!propertyType || propertyType === String) {
    return typeof value === "string" || typeof value === "undefined" || value === null ? value : value.toString();
  }
  if (propertyType === Boolean) {
    return typeof value === "boolean" ? value : false;
  }
  if (propertyType === Object) {
    return typeof value === "object" ? value : propData.defaultValue;
  }
  return value in propertyType ? value : propData.defaultValue;
};
const validateSingleSlot = (value, slotData) => {
  value && getSlottedNodes(value).forEach((el) => {
    if (!(el instanceof slotData.type)) {
      throw new Error(`The element is not of type ${slotData.type.toString()}`);
    }
  });
  return value;
};
class StaticArea extends HTMLElement {
}
if (!customElements.get("ui5-static-area")) {
  customElements.define("ui5-static-area", StaticArea);
}
const getEventProvider = () => getSharedResource("CustomStyle.eventProvider", new EventProvider());
const CUSTOM_CSS_CHANGE = "CustomCSSChange";
const attachCustomCSSChange = (listener) => {
  getEventProvider().attachEvent(CUSTOM_CSS_CHANGE, listener);
};
const getCustomCSSFor = () => getSharedResource("CustomStyle.customCSSFor", {});
attachCustomCSSChange((tag) => {
  {
    reRenderAllUI5Elements({ tag });
  }
});
const getCustomCSS = (tag) => {
  const customCSSFor = getCustomCSSFor();
  return customCSSFor[tag] ? customCSSFor[tag].join("") : "";
};
const MAX_DEPTH_INHERITED_CLASSES = 10;
const getStylesString = (styles) => {
  if (Array.isArray(styles)) {
    return styles.filter((style) => !!style).flat(MAX_DEPTH_INHERITED_CLASSES).map((style) => {
      return typeof style === "string" ? style : style.content;
    }).join(" ");
  }
  return typeof styles === "string" ? styles : styles.content;
};
const effectiveStyleMap = /* @__PURE__ */ new Map();
attachCustomCSSChange((tag) => {
  effectiveStyleMap.delete(`${tag}_normal`);
});
const getEffectiveStyle = (ElementClass, forStaticArea = false) => {
  const tag = ElementClass.getMetadata().getTag();
  const key = `${tag}_${forStaticArea ? "static" : "normal"}`;
  const openUI5Enablement = getFeature("OpenUI5Enablement");
  if (!effectiveStyleMap.has(key)) {
    let effectiveStyle;
    let busyIndicatorStyles = "";
    if (openUI5Enablement) {
      busyIndicatorStyles = getStylesString(openUI5Enablement.getBusyIndicatorStyles());
    }
    if (forStaticArea) {
      effectiveStyle = getStylesString(ElementClass.staticAreaStyles);
    } else {
      const customStyle = getCustomCSS(tag) || "";
      const builtInStyles = getStylesString(ElementClass.styles);
      effectiveStyle = `${builtInStyles} ${customStyle}`;
    }
    effectiveStyle = `${effectiveStyle} ${busyIndicatorStyles}`;
    effectiveStyleMap.set(key, effectiveStyle);
  }
  return effectiveStyleMap.get(key);
};
const constructableStyleMap = /* @__PURE__ */ new Map();
attachCustomCSSChange((tag) => {
  constructableStyleMap.delete(`${tag}_normal`);
});
const getConstructableStyle = (ElementClass, forStaticArea = false) => {
  const tag = ElementClass.getMetadata().getTag();
  const key = `${tag}_${forStaticArea ? "static" : "normal"}`;
  if (!constructableStyleMap.has(key)) {
    const styleContent = getEffectiveStyle(ElementClass, forStaticArea);
    const style = new CSSStyleSheet();
    style.replaceSync(styleContent);
    constructableStyleMap.set(key, [style]);
  }
  return constructableStyleMap.get(key);
};
const updateShadowRoot = (element, forStaticArea = false) => {
  let styleStrOrHrefsArr;
  const ctor = element.constructor;
  const shadowRoot = forStaticArea ? element.staticAreaItem.shadowRoot : element.shadowRoot;
  let renderResult;
  if (forStaticArea) {
    renderResult = element.renderStatic();
  } else {
    renderResult = element.render();
  }
  if (!shadowRoot) {
    console.warn(`There is no shadow root to update`);
    return;
  }
  if (document.adoptedStyleSheets && !isSafari()) {
    shadowRoot.adoptedStyleSheets = getConstructableStyle(ctor, forStaticArea);
  } else {
    styleStrOrHrefsArr = getEffectiveStyle(ctor, forStaticArea);
  }
  if (ctor.renderer) {
    ctor.renderer(renderResult, shadowRoot, styleStrOrHrefsArr, forStaticArea, { host: element });
    return;
  }
  ctor.render(renderResult, shadowRoot, styleStrOrHrefsArr, forStaticArea, { host: element });
};
const GLOBAL_CONTENT_DENSITY_CSS_VAR = "--_ui5_content_density";
const getEffectiveContentDensity = (el) => getComputedStyle(el).getPropertyValue(GLOBAL_CONTENT_DENSITY_CSS_VAR);
const eventProvider = new EventProvider();
const LANG_CHANGE = "languageChange";
const attachLanguageChange = (listener) => {
  eventProvider.attachEvent(LANG_CHANGE, listener);
};
let curLanguage;
let fetchDefaultLanguage;
const getLanguage = () => {
  if (curLanguage === void 0) {
    curLanguage = getLanguage$1();
  }
  return curLanguage;
};
const setFetchDefaultLanguage = (fetchDefaultLang) => {
  fetchDefaultLanguage = fetchDefaultLang;
};
const getFetchDefaultLanguage = () => {
  if (fetchDefaultLanguage === void 0) {
    setFetchDefaultLanguage(getFetchDefaultLanguage$1());
  }
  return fetchDefaultLanguage;
};
const getDesigntimePropertyAsArray = (value) => {
  const m2 = /\$([-a-z0-9A-Z._]+)(?::([^$]*))?\$/.exec(value);
  return m2 && m2[2] ? m2[2].split(/,/) : null;
};
const detectNavigatorLanguage = () => {
  const browserLanguages = navigator.languages;
  const navigatorLanguage = () => {
    return navigator.language;
  };
  const rawLocale = browserLanguages && browserLanguages[0] || navigatorLanguage();
  return rawLocale || DEFAULT_LANGUAGE;
};
const M_ISO639_OLD_TO_NEW = {
  "iw": "he",
  "ji": "yi",
  "in": "id",
  "sh": "sr"
};
const A_RTL_LOCALES = getDesigntimePropertyAsArray("$cldr-rtl-locales:ar,fa,he$") || [];
const impliesRTL = (language) => {
  language = language && M_ISO639_OLD_TO_NEW[language] || language;
  return A_RTL_LOCALES.indexOf(language) >= 0;
};
const getRTL = () => {
  if (typeof document === "undefined") {
    return false;
  }
  const configurationRTL = getRTL$1();
  if (configurationRTL !== void 0) {
    return !!configurationRTL;
  }
  return impliesRTL(getLanguage() || detectNavigatorLanguage());
};
const GLOBAL_DIR_CSS_VAR = "--_ui5_dir";
const getEffectiveDir = (element) => {
  const doc = window.document;
  const dirValues = ["ltr", "rtl"];
  const locallyAppliedDir = getComputedStyle(element).getPropertyValue(GLOBAL_DIR_CSS_VAR);
  if (dirValues.includes(locallyAppliedDir)) {
    return locallyAppliedDir;
  }
  if (dirValues.includes(element.dir)) {
    return element.dir;
  }
  if (dirValues.includes(doc.documentElement.dir)) {
    return doc.documentElement.dir;
  }
  if (dirValues.includes(doc.body.dir)) {
    return doc.body.dir;
  }
  return getRTL() ? "rtl" : void 0;
};
const pureTagName = "ui5-static-area-item";
const popupIntegrationAttr = "data-sap-ui-integration-popup-content";
class StaticAreaItem extends HTMLElement {
  constructor() {
    super();
    this._rendered = false;
    this.attachShadow({ mode: "open" });
  }
  /**
   * @param {UI5Element} ownerElement the UI5Element instance that owns this static area item
   */
  setOwnerElement(ownerElement) {
    this.ownerElement = ownerElement;
    this.classList.add(this.ownerElement._id);
    if (this.ownerElement.hasAttribute("data-ui5-static-stable")) {
      this.setAttribute("data-ui5-stable", this.ownerElement.getAttribute("data-ui5-static-stable"));
    }
  }
  /**
   * Updates the shadow root of the static area item with the latest state, if rendered
   */
  update() {
    if (this._rendered) {
      this.updateAdditionalProperties();
      updateShadowRoot(this.ownerElement, true);
    }
  }
  updateAdditionalProperties() {
    this._updateAdditionalAttrs();
    this._updateContentDensity();
    this._updateDirection();
  }
  /**
   * Sets the correct content density based on the owner element's state
   * @private
   */
  _updateContentDensity() {
    if (getEffectiveContentDensity(this.ownerElement) === "compact") {
      this.classList.add("sapUiSizeCompact");
      this.classList.add("ui5-content-density-compact");
    } else {
      this.classList.remove("sapUiSizeCompact");
      this.classList.remove("ui5-content-density-compact");
    }
  }
  _updateDirection() {
    if (this.ownerElement) {
      const dir = getEffectiveDir(this.ownerElement);
      if (dir) {
        this.setAttribute("dir", dir);
      } else {
        this.removeAttribute("dir");
      }
    }
  }
  _updateAdditionalAttrs() {
    this.setAttribute(pureTagName, "");
    this.setAttribute(popupIntegrationAttr, "");
  }
  /**
   * @protected
   * Returns reference to the DOM element where the current fragment is added.
   */
  async getDomRef() {
    this.updateAdditionalProperties();
    if (!this._rendered) {
      this._rendered = true;
      updateShadowRoot(this.ownerElement, true);
    }
    await renderFinished();
    return this.shadowRoot;
  }
  static getTag() {
    const suffix = getEffectiveScopingSuffixForTag(pureTagName);
    if (!suffix) {
      return pureTagName;
    }
    return `${pureTagName}-${suffix}`;
  }
  static createInstance() {
    if (!customElements.get(StaticAreaItem.getTag())) {
      customElements.define(StaticAreaItem.getTag(), StaticAreaItem);
    }
    return document.createElement(this.getTag());
  }
}
const tagPrefixes = [];
const shouldIgnoreCustomElement = (tag) => {
  return tagPrefixes.some((pref) => tag.startsWith(pref));
};
const observers = /* @__PURE__ */ new WeakMap();
const observeDOMNode = (node, callback, options) => {
  const observer = new MutationObserver(callback);
  observers.set(node, observer);
  observer.observe(node, options);
};
const unobserveDOMNode = (node) => {
  const observer = observers.get(node);
  if (observer) {
    observer.disconnect();
    observers.delete(node);
  }
};
const excludeList = [
  "value-changed",
  "click"
];
let noConflict;
const shouldFireOriginalEvent = (eventName) => {
  return excludeList.includes(eventName);
};
const shouldNotFireOriginalEvent = (eventName) => {
  const nc = getNoConflict();
  return !(typeof nc !== "boolean" && nc.events && nc.events.includes && nc.events.includes(eventName));
};
const getNoConflict = () => {
  if (noConflict === void 0) {
    noConflict = getNoConflict$1();
  }
  return noConflict;
};
const skipOriginalEvent = (eventName) => {
  const nc = getNoConflict();
  if (shouldFireOriginalEvent(eventName)) {
    return false;
  }
  if (nc === true) {
    return true;
  }
  return !shouldNotFireOriginalEvent(eventName);
};
const allowList = [
  "disabled",
  "title",
  "hidden",
  "role",
  "draggable"
];
const isValidPropertyName = (name) => {
  if (allowList.includes(name) || name.startsWith("aria")) {
    return true;
  }
  const classes = [
    HTMLElement,
    Element,
    Node
  ];
  return !classes.some((klass) => klass.prototype.hasOwnProperty(name));
};
const arraysAreEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i2 = 0; i2 < arr1.length; i2++) {
    if (arr1[i2] !== arr2[i2]) {
      return false;
    }
  }
  return true;
};
const executeTemplate = (template, component) => {
  const tagsToScope = getTagsToScope(component);
  const scope = getCustomElementsScopingSuffix();
  return template.call(component, component, tagsToScope, scope);
};
const getTagsToScope = (component) => {
  const ctor = component.constructor;
  const componentTag = ctor.getMetadata().getPureTag();
  const tagsToScope = ctor.getUniqueDependencies().map((dep) => dep.getMetadata().getPureTag()).filter(shouldScopeCustomElement);
  if (shouldScopeCustomElement(componentTag)) {
    tagsToScope.push(componentTag);
  }
  return tagsToScope;
};
let autoId = 0;
const elementTimeouts = /* @__PURE__ */ new Map();
const uniqueDependenciesCache = /* @__PURE__ */ new Map();
function _invalidate(changeInfo) {
  if (this._suppressInvalidation) {
    return;
  }
  this.onInvalidation(changeInfo);
  this._changedState.push(changeInfo);
  renderDeferred(this);
  this._invalidationEventProvider.fireEvent("invalidate", { ...changeInfo, target: this });
}
class UI5Element extends HTMLElement {
  constructor() {
    super();
    const ctor = this.constructor;
    this._changedState = [];
    this._suppressInvalidation = true;
    this._inDOM = false;
    this._fullyConnected = false;
    this._childChangeListeners = /* @__PURE__ */ new Map();
    this._slotChangeListeners = /* @__PURE__ */ new Map();
    this._invalidationEventProvider = new EventProvider();
    this._componentStateFinalizedEventProvider = new EventProvider();
    let deferredResolve;
    this._domRefReadyPromise = new Promise((resolve) => {
      deferredResolve = resolve;
    });
    this._domRefReadyPromise._deferredResolve = deferredResolve;
    this._doNotSyncAttributes = /* @__PURE__ */ new Set();
    this._state = { ...ctor.getMetadata().getInitialState() };
    this._upgradeAllProperties();
    if (ctor._needsShadowDOM()) {
      this.attachShadow({ mode: "open" });
    }
  }
  /**
   * Returns a unique ID for this UI5 Element
   *
   * @deprecated - This property is not guaranteed in future releases
   * @protected
   */
  get _id() {
    if (!this.__id) {
      this.__id = `ui5wc_${++autoId}`;
    }
    return this.__id;
  }
  render() {
    const template = this.constructor.template;
    return executeTemplate(template, this);
  }
  renderStatic() {
    const template = this.constructor.staticAreaTemplate;
    return executeTemplate(template, this);
  }
  /**
   * Do not call this method from derivatives of UI5Element, use "onEnterDOM" only
   * @private
   */
  async connectedCallback() {
    const ctor = this.constructor;
    this.setAttribute(ctor.getMetadata().getPureTag(), "");
    if (ctor.getMetadata().supportsF6FastNavigation()) {
      this.setAttribute("data-sap-ui-fastnavgroup", "true");
    }
    const slotsAreManaged = ctor.getMetadata().slotsAreManaged();
    this._inDOM = true;
    if (slotsAreManaged) {
      this._startObservingDOMChildren();
      await this._processChildren();
    }
    if (!this._inDOM) {
      return;
    }
    renderImmediately(this);
    this._domRefReadyPromise._deferredResolve();
    this._fullyConnected = true;
    this.onEnterDOM();
  }
  /**
   * Do not call this method from derivatives of UI5Element, use "onExitDOM" only
   * @private
   */
  disconnectedCallback() {
    const ctor = this.constructor;
    const slotsAreManaged = ctor.getMetadata().slotsAreManaged();
    this._inDOM = false;
    if (slotsAreManaged) {
      this._stopObservingDOMChildren();
    }
    if (this._fullyConnected) {
      this.onExitDOM();
      this._fullyConnected = false;
    }
    if (this.staticAreaItem && this.staticAreaItem.parentElement) {
      this.staticAreaItem.parentElement.removeChild(this.staticAreaItem);
    }
    cancelRender(this);
  }
  /**
   * Called every time before the component renders.
   * @public
   */
  onBeforeRendering() {
  }
  /**
   * Called every time after the component renders.
   * @public
   */
  onAfterRendering() {
  }
  /**
   * Called on connectedCallback - added to the DOM.
   * @public
   */
  onEnterDOM() {
  }
  /**
   * Called on disconnectedCallback - removed from the DOM.
   * @public
   */
  onExitDOM() {
  }
  /**
   * @private
   */
  _startObservingDOMChildren() {
    const ctor = this.constructor;
    const metadata = ctor.getMetadata();
    const shouldObserveChildren = metadata.hasSlots();
    if (!shouldObserveChildren) {
      return;
    }
    const canSlotText = metadata.canSlotText();
    const hasClonedSlot = Object.keys(metadata.getSlots()).some((slotName) => metadata.getSlots()[slotName].cloned);
    const mutationObserverOptions = {
      childList: true,
      subtree: canSlotText || hasClonedSlot,
      characterData: canSlotText
    };
    observeDOMNode(this, this._processChildren.bind(this), mutationObserverOptions);
  }
  /**
   * @private
   */
  _stopObservingDOMChildren() {
    unobserveDOMNode(this);
  }
  /**
   * Note: this method is also manually called by "compatibility/patchNodeValue.js"
   * @private
   */
  async _processChildren() {
    const hasSlots = this.constructor.getMetadata().hasSlots();
    if (hasSlots) {
      await this._updateSlots();
    }
  }
  /**
   * @private
   */
  async _updateSlots() {
    const ctor = this.constructor;
    const slotsMap = ctor.getMetadata().getSlots();
    const canSlotText = ctor.getMetadata().canSlotText();
    const domChildren = Array.from(canSlotText ? this.childNodes : this.children);
    const slotsCachedContentMap = /* @__PURE__ */ new Map();
    const propertyNameToSlotMap = /* @__PURE__ */ new Map();
    for (const [slotName, slotData] of Object.entries(slotsMap)) {
      const propertyName = slotData.propertyName || slotName;
      propertyNameToSlotMap.set(propertyName, slotName);
      slotsCachedContentMap.set(propertyName, [...this._state[propertyName]]);
      this._clearSlot(slotName, slotData);
    }
    const autoIncrementMap = /* @__PURE__ */ new Map();
    const slottedChildrenMap = /* @__PURE__ */ new Map();
    const allChildrenUpgraded = domChildren.map(async (child, idx) => {
      const slotName = getSlotName(child);
      const slotData = slotsMap[slotName];
      if (slotData === void 0) {
        if (slotName !== "default") {
          const validValues = Object.keys(slotsMap).join(", ");
          console.warn(`Unknown slotName: ${slotName}, ignoring`, child, `Valid values are: ${validValues}`);
        }
        return;
      }
      if (slotData.individualSlots) {
        const nextIndex = (autoIncrementMap.get(slotName) || 0) + 1;
        autoIncrementMap.set(slotName, nextIndex);
        child._individualSlot = `${slotName}-${nextIndex}`;
      }
      if (child instanceof HTMLElement) {
        const localName = child.localName;
        const shouldWaitForCustomElement = localName.includes("-") && !shouldIgnoreCustomElement(localName);
        if (shouldWaitForCustomElement) {
          const isDefined = window.customElements.get(localName);
          if (!isDefined) {
            const whenDefinedPromise = window.customElements.whenDefined(localName);
            let timeoutPromise = elementTimeouts.get(localName);
            if (!timeoutPromise) {
              timeoutPromise = new Promise((resolve) => setTimeout(resolve, 1e3));
              elementTimeouts.set(localName, timeoutPromise);
            }
            await Promise.race([whenDefinedPromise, timeoutPromise]);
          }
          window.customElements.upgrade(child);
        }
      }
      child = ctor.getMetadata().constructor.validateSlotValue(child, slotData);
      if (instanceOfUI5Element(child) && slotData.invalidateOnChildChange) {
        const childChangeListener = this._getChildChangeListener(slotName);
        if (childChangeListener) {
          child.attachInvalidate.call(child, childChangeListener);
        }
      }
      if (child instanceof HTMLSlotElement) {
        this._attachSlotChange(child, slotName);
      }
      const propertyName = slotData.propertyName || slotName;
      if (slottedChildrenMap.has(propertyName)) {
        slottedChildrenMap.get(propertyName).push({ child, idx });
      } else {
        slottedChildrenMap.set(propertyName, [{ child, idx }]);
      }
    });
    await Promise.all(allChildrenUpgraded);
    slottedChildrenMap.forEach((children, propertyName) => {
      this._state[propertyName] = children.sort((a2, b2) => a2.idx - b2.idx).map((_2) => _2.child);
    });
    let invalidated = false;
    for (const [slotName, slotData] of Object.entries(slotsMap)) {
      const propertyName = slotData.propertyName || slotName;
      if (!arraysAreEqual(slotsCachedContentMap.get(propertyName), this._state[propertyName])) {
        _invalidate.call(this, {
          type: "slot",
          name: propertyNameToSlotMap.get(propertyName),
          reason: "children"
        });
        invalidated = true;
      }
    }
    if (!invalidated) {
      _invalidate.call(this, {
        type: "slot",
        name: "default",
        reason: "textcontent"
      });
    }
  }
  /**
   * Removes all children from the slot and detaches listeners, if any
   * @private
   */
  _clearSlot(slotName, slotData) {
    const propertyName = slotData.propertyName || slotName;
    const children = this._state[propertyName];
    children.forEach((child) => {
      if (instanceOfUI5Element(child)) {
        const childChangeListener = this._getChildChangeListener(slotName);
        if (childChangeListener) {
          child.detachInvalidate.call(child, childChangeListener);
        }
      }
      if (child instanceof HTMLSlotElement) {
        this._detachSlotChange(child, slotName);
      }
    });
    this._state[propertyName] = [];
  }
  /**
   * Attach a callback that will be executed whenever the component is invalidated
   *
   * @param {InvalidationInfo} callback
   * @public
   */
  attachInvalidate(callback) {
    this._invalidationEventProvider.attachEvent("invalidate", callback);
  }
  /**
   * Detach the callback that is executed whenever the component is invalidated
   *
   * @param {InvalidationInfo} callback
   * @public
   */
  detachInvalidate(callback) {
    this._invalidationEventProvider.detachEvent("invalidate", callback);
  }
  /**
   * Callback that is executed whenever a monitored child changes its state
   *
   * @param {sting} slotName the slot in which a child was invalidated
   * @param { ChangeInfo } childChangeInfo the changeInfo object for the child in the given slot
   * @private
   */
  _onChildChange(slotName, childChangeInfo) {
    if (!this.constructor.getMetadata().shouldInvalidateOnChildChange(slotName, childChangeInfo.type, childChangeInfo.name)) {
      return;
    }
    _invalidate.call(this, {
      type: "slot",
      name: slotName,
      reason: "childchange",
      child: childChangeInfo.target
    });
  }
  /**
   * Do not override this method in derivatives of UI5Element
   * @private
   */
  attributeChangedCallback(name, oldValue, newValue) {
    let newPropertyValue;
    if (this._doNotSyncAttributes.has(name)) {
      return;
    }
    const properties = this.constructor.getMetadata().getProperties();
    const realName = name.replace(/^ui5-/, "");
    const nameInCamelCase = kebabToCamelCase(realName);
    if (properties.hasOwnProperty(nameInCamelCase)) {
      const propData = properties[nameInCamelCase];
      const propertyType = propData.type;
      let propertyValidator = propData.validator;
      if (propertyType && propertyType.isDataTypeClass) {
        propertyValidator = propertyType;
      }
      if (propertyValidator) {
        newPropertyValue = propertyValidator.attributeToProperty(newValue);
      } else if (propertyType === Boolean) {
        newPropertyValue = newValue !== null;
      } else {
        newPropertyValue = newValue;
      }
      this[nameInCamelCase] = newPropertyValue;
    }
  }
  /**
   * @private
   */
  _updateAttribute(name, newValue) {
    const ctor = this.constructor;
    if (!ctor.getMetadata().hasAttribute(name)) {
      return;
    }
    const properties = ctor.getMetadata().getProperties();
    const propData = properties[name];
    const propertyType = propData.type;
    let propertyValidator = propData.validator;
    const attrName = camelToKebabCase(name);
    const attrValue = this.getAttribute(attrName);
    if (propertyType && propertyType.isDataTypeClass) {
      propertyValidator = propertyType;
    }
    if (propertyValidator) {
      const newAttrValue = propertyValidator.propertyToAttribute(newValue);
      if (newAttrValue === null) {
        this._doNotSyncAttributes.add(attrName);
        this.removeAttribute(attrName);
        this._doNotSyncAttributes.delete(attrName);
      } else {
        this.setAttribute(attrName, newAttrValue);
      }
    } else if (propertyType === Boolean) {
      if (newValue === true && attrValue === null) {
        this.setAttribute(attrName, "");
      } else if (newValue === false && attrValue !== null) {
        this.removeAttribute(attrName);
      }
    } else if (typeof newValue !== "object") {
      if (attrValue !== newValue) {
        this.setAttribute(attrName, newValue);
      }
    }
  }
  /**
   * @private
   */
  _upgradeProperty(propertyName) {
    if (this.hasOwnProperty(propertyName)) {
      const value = this[propertyName];
      delete this[propertyName];
      this[propertyName] = value;
    }
  }
  /**
   * @private
   */
  _upgradeAllProperties() {
    const allProps = this.constructor.getMetadata().getPropertiesList();
    allProps.forEach(this._upgradeProperty.bind(this));
  }
  /**
   * Returns a singleton event listener for the "change" event of a child in a given slot
   *
   * @param slotName the name of the slot, where the child is
   * @returns {ChildChangeListener}
   * @private
   */
  _getChildChangeListener(slotName) {
    if (!this._childChangeListeners.has(slotName)) {
      this._childChangeListeners.set(slotName, this._onChildChange.bind(this, slotName));
    }
    return this._childChangeListeners.get(slotName);
  }
  /**
   * Returns a singleton slotchange event listener that invalidates the component due to changes in the given slot
   *
   * @param slotName the name of the slot, where the slot element (whose slotchange event we're listening to) is
   * @returns {SlotChangeListener}
   * @private
   */
  _getSlotChangeListener(slotName) {
    if (!this._slotChangeListeners.has(slotName)) {
      this._slotChangeListeners.set(slotName, this._onSlotChange.bind(this, slotName));
    }
    return this._slotChangeListeners.get(slotName);
  }
  /**
   * @private
   */
  _attachSlotChange(child, slotName) {
    const slotChangeListener = this._getSlotChangeListener(slotName);
    if (slotChangeListener) {
      child.addEventListener("slotchange", slotChangeListener);
    }
  }
  /**
   * @private
   */
  _detachSlotChange(child, slotName) {
    child.removeEventListener("slotchange", this._getSlotChangeListener(slotName));
  }
  /**
   * Whenever a slot element is slotted inside a UI5 Web Component, its slotchange event invalidates the component
   *
   * @param slotName the name of the slot, where the slot element (whose slotchange event we're listening to) is
   * @private
   */
  _onSlotChange(slotName) {
    _invalidate.call(this, {
      type: "slot",
      name: slotName,
      reason: "slotchange"
    });
  }
  /**
   * A callback that is executed each time an already rendered component is invalidated (scheduled for re-rendering)
   *
   * @param  changeInfo An object with information about the change that caused invalidation.
   * The object can have the following properties:
   *  - type: (property|slot) tells what caused the invalidation
   *   1) property: a property value was changed either directly or as a result of changing the corresponding attribute
   *   2) slot: a slotted node(nodes) changed in one of several ways (see "reason")
   *
   *  - name: the name of the property or slot that caused the invalidation
   *
   *  - reason: (children|textcontent|childchange|slotchange) relevant only for type="slot" only and tells exactly what changed in the slot
   *   1) children: immediate children (HTML elements or text nodes) were added, removed or reordered in the slot
   *   2) textcontent: text nodes in the slot changed value (or nested text nodes were added or changed value). Can only trigger for slots of "type: Node"
   *   3) slotchange: a slot element, slotted inside that slot had its "slotchange" event listener called. This practically means that transitively slotted children changed.
   *      Can only trigger if the child of a slot is a slot element itself.
   *   4) childchange: indicates that a UI5Element child in that slot was invalidated and in turn invalidated the component.
   *      Can only trigger for slots with "invalidateOnChildChange" metadata descriptor
   *
   *  - newValue: the new value of the property (for type="property" only)
   *
   *  - oldValue: the old value of the property (for type="property" only)
   *
   *  - child the child that was changed (for type="slot" and reason="childchange" only)
   *
   * @public
   */
  onInvalidation(changeInfo) {
  }
  // eslint-disable-line
  /**
   * Do not call this method directly, only intended to be called by js
   * @protected
   */
  _render() {
    const ctor = this.constructor;
    const hasIndividualSlots = ctor.getMetadata().hasIndividualSlots();
    this._suppressInvalidation = true;
    this.onBeforeRendering();
    this._componentStateFinalizedEventProvider.fireEvent("componentStateFinalized");
    this._suppressInvalidation = false;
    this._changedState = [];
    if (ctor._needsShadowDOM()) {
      updateShadowRoot(this);
    }
    if (this.staticAreaItem) {
      this.staticAreaItem.update();
    }
    if (hasIndividualSlots) {
      this._assignIndividualSlotsToChildren();
    }
    this.onAfterRendering();
  }
  /**
   * @private
   */
  _assignIndividualSlotsToChildren() {
    const domChildren = Array.from(this.children);
    domChildren.forEach((child) => {
      if (child._individualSlot) {
        child.setAttribute("slot", child._individualSlot);
      }
    });
  }
  /**
   * @private
   */
  _waitForDomRef() {
    return this._domRefReadyPromise;
  }
  /**
   * Returns the DOM Element inside the Shadow Root that corresponds to the opening tag in the UI5 Web Component's template
   * *Note:* For logical (abstract) elements (items, options, etc...), returns the part of the parent's DOM that represents this option
   * Use this method instead of "this.shadowRoot" to read the Shadow DOM, if ever necessary
   *
   * @public
   */
  getDomRef() {
    if (typeof this._getRealDomRef === "function") {
      return this._getRealDomRef();
    }
    if (!this.shadowRoot || this.shadowRoot.children.length === 0) {
      return;
    }
    const children = [...this.shadowRoot.children].filter((child) => !["link", "style"].includes(child.localName));
    if (children.length !== 1) {
      console.warn(`The shadow DOM for ${this.constructor.getMetadata().getTag()} does not have a top level element, the getDomRef() method might not work as expected`);
    }
    return children[0];
  }
  /**
   * Returns the DOM Element marked with "data-sap-focus-ref" inside the template.
   * This is the element that will receive the focus by default.
   * @public
   */
  getFocusDomRef() {
    const domRef = this.getDomRef();
    if (domRef) {
      const focusRef = domRef.querySelector("[data-sap-focus-ref]");
      return focusRef || domRef;
    }
  }
  /**
   * Waits for dom ref and then returns the DOM Element marked with "data-sap-focus-ref" inside the template.
   * This is the element that will receive the focus by default.
   * @public
   */
  async getFocusDomRefAsync() {
    await this._waitForDomRef();
    return this.getFocusDomRef();
  }
  /**
   * Set the focus to the element, returned by "getFocusDomRef()" (marked by "data-sap-focus-ref")
   * @param {FocusOptions} focusOptions additional options for the focus
   * @public
   */
  async focus(focusOptions) {
    await this._waitForDomRef();
    const focusDomRef = this.getFocusDomRef();
    if (focusDomRef && typeof focusDomRef.focus === "function") {
      focusDomRef.focus(focusOptions);
    }
  }
  /**
   *
   * @public
   * @param name - name of the event
   * @param data - additional data for the event
   * @param cancelable - true, if the user can call preventDefault on the event object
   * @param bubbles - true, if the event bubbles
   * @returns {boolean} false, if the event was cancelled (preventDefault called), true otherwise
   */
  fireEvent(name, data, cancelable = false, bubbles = true) {
    const eventResult = this._fireEvent(name, data, cancelable, bubbles);
    const camelCaseEventName = kebabToCamelCase(name);
    if (camelCaseEventName !== name) {
      return eventResult && this._fireEvent(camelCaseEventName, data, cancelable, bubbles);
    }
    return eventResult;
  }
  _fireEvent(name, data, cancelable = false, bubbles = true) {
    const noConflictEvent = new CustomEvent(`ui5-${name}`, {
      detail: data,
      composed: false,
      bubbles,
      cancelable
    });
    const noConflictEventResult = this.dispatchEvent(noConflictEvent);
    if (skipOriginalEvent(name)) {
      return noConflictEventResult;
    }
    const normalEvent = new CustomEvent(name, {
      detail: data,
      composed: false,
      bubbles,
      cancelable
    });
    const normalEventResult = this.dispatchEvent(normalEvent);
    return normalEventResult && noConflictEventResult;
  }
  /**
   * Returns the actual children, associated with a slot.
   * Useful when there are transitive slots in nested component scenarios and you don't want to get a list of the slots, but rather of their content.
   * @public
   */
  getSlottedNodes(slotName) {
    return getSlottedNodesList(this[slotName]);
  }
  /**
   * Attach a callback that will be executed whenever the component's state is finalized
   *
   * @param {} callback
   * @public
   */
  attachComponentStateFinalized(callback) {
    this._componentStateFinalizedEventProvider.attachEvent("componentStateFinalized", callback);
  }
  /**
   * Detach the callback that is executed whenever the component's state is finalized
   *
   * @param {} callback
   * @public
   */
  detachComponentStateFinalized(callback) {
    this._componentStateFinalizedEventProvider.detachEvent("componentStateFinalized", callback);
  }
  /**
   * Determines whether the component should be rendered in RTL mode or not.
   * Returns: "rtl", "ltr" or undefined
   *
   * @public
   * @returns {String|undefined}
   */
  get effectiveDir() {
    markAsRtlAware(this.constructor);
    return getEffectiveDir(this);
  }
  /**
   * Used to duck-type UI5 elements without using instanceof
   * @returns {boolean}
   * @public
   */
  get isUI5Element() {
    return true;
  }
  get classes() {
    return {};
  }
  /**
   * Do not override this method in derivatives of UI5Element, use metadata properties instead
   * @private
   */
  static get observedAttributes() {
    return this.getMetadata().getAttributesList();
  }
  /**
   * @private
   */
  static _needsShadowDOM() {
    return !!this.template || Object.prototype.hasOwnProperty.call(this.prototype, "render");
  }
  /**
   * @private
   */
  static _needsStaticArea() {
    return !!this.staticAreaTemplate || Object.prototype.hasOwnProperty.call(this.prototype, "renderStatic");
  }
  /**
   * @public
   */
  getStaticAreaItemDomRef() {
    if (!this.constructor._needsStaticArea()) {
      throw new Error("This component does not use the static area");
    }
    if (!this.staticAreaItem) {
      this.staticAreaItem = StaticAreaItem.createInstance();
      this.staticAreaItem.setOwnerElement(this);
    }
    if (!this.staticAreaItem.parentElement) {
      getSingletonElementInstance("ui5-static-area").appendChild(this.staticAreaItem);
    }
    return this.staticAreaItem.getDomRef();
  }
  /**
   * @private
   */
  static _generateAccessors() {
    const proto = this.prototype;
    const slotsAreManaged = this.getMetadata().slotsAreManaged();
    const properties = this.getMetadata().getProperties();
    for (const [prop, propData] of Object.entries(properties)) {
      if (!isValidPropertyName(prop)) {
        console.warn(`"${prop}" is not a valid property name. Use a name that does not collide with DOM APIs`);
      }
      if (propData.type === Boolean && propData.defaultValue) {
        throw new Error(`Cannot set a default value for property "${prop}". All booleans are false by default.`);
      }
      if (propData.type === Array) {
        throw new Error(`Wrong type for property "${prop}". Properties cannot be of type Array - use "multiple: true" and set "type" to the single value type, such as "String", "Object", etc...`);
      }
      if (propData.type === Object && propData.defaultValue) {
        throw new Error(`Cannot set a default value for property "${prop}". All properties of type "Object" are empty objects by default.`);
      }
      if (propData.multiple && propData.defaultValue) {
        throw new Error(`Cannot set a default value for property "${prop}". All multiple properties are empty arrays by default.`);
      }
      Object.defineProperty(proto, prop, {
        get() {
          if (this._state[prop] !== void 0) {
            return this._state[prop];
          }
          const propDefaultValue = propData.defaultValue;
          if (propData.type === Boolean) {
            return false;
          } else if (propData.type === String) {
            return propDefaultValue;
          } else if (propData.multiple) {
            return [];
          } else {
            return propDefaultValue;
          }
        },
        set(value) {
          let isDifferent;
          const ctor = this.constructor;
          const metadataCtor = ctor.getMetadata().constructor;
          value = metadataCtor.validatePropertyValue(value, propData);
          const propertyType = propData.type;
          let propertyValidator = propData.validator;
          const oldState = this._state[prop];
          if (propertyType && propertyType.isDataTypeClass) {
            propertyValidator = propertyType;
          }
          if (propertyValidator) {
            isDifferent = !propertyValidator.valuesAreEqual(oldState, value);
          } else if (Array.isArray(oldState) && Array.isArray(value) && propData.multiple && propData.compareValues) {
            isDifferent = !arraysAreEqual(oldState, value);
          } else {
            isDifferent = oldState !== value;
          }
          if (isDifferent) {
            this._state[prop] = value;
            _invalidate.call(this, {
              type: "property",
              name: prop,
              newValue: value,
              oldValue: oldState
            });
            this._updateAttribute(prop, value);
          }
        }
      });
    }
    if (slotsAreManaged) {
      const slots = this.getMetadata().getSlots();
      for (const [slotName, slotData] of Object.entries(slots)) {
        if (!isValidPropertyName(slotName)) {
          console.warn(`"${slotName}" is not a valid property name. Use a name that does not collide with DOM APIs`);
        }
        const propertyName = slotData.propertyName || slotName;
        Object.defineProperty(proto, propertyName, {
          get() {
            if (this._state[propertyName] !== void 0) {
              return this._state[propertyName];
            }
            return [];
          },
          set() {
            throw new Error("Cannot set slot content directly, use the DOM APIs (appendChild, removeChild, etc...)");
          }
        });
      }
    }
  }
  /**
   * Returns the CSS for this UI5 Web Component Class
   * @protected
   */
  static get styles() {
    return "";
  }
  /**
   * Returns the Static Area CSS for this UI5 Web Component Class
   * @protected
   */
  static get staticAreaStyles() {
    return "";
  }
  /**
   * Returns an array with the dependencies for this UI5 Web Component, which could be:
   *  - composed components (used in its shadow root or static area item)
   *  - slotted components that the component may need to communicate with
   *
   * @protected
   */
  static get dependencies() {
    return [];
  }
  /**
   * Returns a list of the unique dependencies for this UI5 Web Component
   *
   * @public
   */
  static getUniqueDependencies() {
    if (!uniqueDependenciesCache.has(this)) {
      const filtered = this.dependencies.filter((dep, index, deps) => deps.indexOf(dep) === index);
      uniqueDependenciesCache.set(this, filtered);
    }
    return uniqueDependenciesCache.get(this) || [];
  }
  /**
   * Returns a promise that resolves whenever all dependencies for this UI5 Web Component have resolved
   *
   * @returns {Promise}
   */
  static whenDependenciesDefined() {
    return Promise.all(this.getUniqueDependencies().map((dep) => dep.define()));
  }
  /**
   * Hook that will be called upon custom element definition
   *
   * @protected
   * @returns {Promise<void>}
   */
  static async onDefine() {
    return Promise.resolve();
  }
  /**
   * Registers a UI5 Web Component in the browser window object
   * @public
   * @returns {Promise<UI5Element>}
   */
  static async define() {
    await boot();
    await Promise.all([
      this.whenDependenciesDefined(),
      this.onDefine()
    ]);
    const tag = this.getMetadata().getTag();
    const definedLocally = isTagRegistered(tag);
    const definedGlobally = window.customElements.get(tag);
    if (definedGlobally && !definedLocally) {
      recordTagRegistrationFailure(tag);
    } else if (!definedGlobally) {
      this._generateAccessors();
      registerTag(tag);
      window.customElements.define(tag, this);
    }
    return this;
  }
  /**
   * Returns an instance of UI5ElementMetadata.js representing this UI5 Web Component's full metadata (its and its parents')
   * Note: not to be confused with the "get metadata()" method, which returns an object for this class's metadata only
   * @public
   * @returns {UI5ElementMetadata}
   */
  static getMetadata() {
    if (this.hasOwnProperty("_metadata")) {
      return this._metadata;
    }
    const metadataObjects = [this.metadata];
    let klass = this;
    while (klass !== UI5Element) {
      klass = Object.getPrototypeOf(klass);
      metadataObjects.unshift(klass.metadata);
    }
    const mergedMetadata = fnMerge({}, ...metadataObjects);
    this._metadata = new UI5ElementMetadata(mergedMetadata);
    return this._metadata;
  }
}
UI5Element.metadata = {};
const instanceOfUI5Element = (object) => {
  return "isUI5Element" in object;
};
const customElement = (tagNameOrComponentSettings) => {
  return (target) => {
    if (!Object.prototype.hasOwnProperty.call(target, "metadata")) {
      target.metadata = {};
    }
    if (typeof tagNameOrComponentSettings === "string") {
      target.metadata.tag = tagNameOrComponentSettings;
      return;
    }
    const { tag, languageAware, themeAware, fastNavigation } = tagNameOrComponentSettings;
    target.metadata.tag = tag;
    if (languageAware) {
      target.metadata.languageAware = languageAware;
    }
    if (themeAware) {
      target.metadata.themeAware = themeAware;
    }
    if (fastNavigation) {
      target.metadata.fastNavigation = fastNavigation;
    }
    ["render", "renderer", "template", "staticAreaTemplate", "styles", "staticAreaStyles", "dependencies"].forEach((customElementEntity) => {
      const _customElementEntity = customElementEntity === "render" ? "renderer" : customElementEntity;
      const customElementEntityValue = tagNameOrComponentSettings[_customElementEntity];
      customElementEntityValue && Object.defineProperty(target, customElementEntity, {
        get: () => customElementEntityValue
      });
    });
  };
};
const property = (propData) => {
  return (target, propertyKey) => {
    const ctor = target.constructor;
    if (!Object.prototype.hasOwnProperty.call(ctor, "metadata")) {
      ctor.metadata = {};
    }
    const metadata = ctor.metadata;
    if (!metadata.properties) {
      metadata.properties = {};
    }
    const propsMetadata = metadata.properties;
    if (!propsMetadata[propertyKey]) {
      propsMetadata[propertyKey] = propData || { type: String };
    }
  };
};
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
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1;
const i$1 = window, s$1 = i$1.trustedTypes, e$2 = s$1 ? s$1.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, o = "$lit$", n = `lit$${(Math.random() + "").slice(9)}$`, l$2 = "?" + n, h = `<${l$2}>`, r$1 = document, u$1 = () => r$1.createComment(""), d = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, c$2 = Array.isArray, v = (t2) => c$2(t2) || "function" == typeof (null == t2 ? void 0 : t2[Symbol.iterator]), a$1 = "[ 	\n\f\r]", f$1 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _ = /-->/g, m$1 = />/g, p$1 = RegExp(`>|${a$1}(?:([^\\s"'>=/]+)(${a$1}*=${a$1}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), g = /'/g, $ = /"/g, y = /^(?:script|style|textarea|title)$/i, w = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 }), x = w(1), b = w(2), T = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), E = /* @__PURE__ */ new WeakMap(), C = r$1.createTreeWalker(r$1, 129, null, false);
function P(t2, i2) {
  if (!Array.isArray(t2) || !t2.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return void 0 !== e$2 ? e$2.createHTML(i2) : i2;
}
const V = (t2, i2) => {
  const s2 = t2.length - 1, e2 = [];
  let l2, r2 = 2 === i2 ? "<svg>" : "", u2 = f$1;
  for (let i3 = 0; i3 < s2; i3++) {
    const s3 = t2[i3];
    let d2, c2, v2 = -1, a2 = 0;
    for (; a2 < s3.length && (u2.lastIndex = a2, c2 = u2.exec(s3), null !== c2); )
      a2 = u2.lastIndex, u2 === f$1 ? "!--" === c2[1] ? u2 = _ : void 0 !== c2[1] ? u2 = m$1 : void 0 !== c2[2] ? (y.test(c2[2]) && (l2 = RegExp("</" + c2[2], "g")), u2 = p$1) : void 0 !== c2[3] && (u2 = p$1) : u2 === p$1 ? ">" === c2[0] ? (u2 = null != l2 ? l2 : f$1, v2 = -1) : void 0 === c2[1] ? v2 = -2 : (v2 = u2.lastIndex - c2[2].length, d2 = c2[1], u2 = void 0 === c2[3] ? p$1 : '"' === c2[3] ? $ : g) : u2 === $ || u2 === g ? u2 = p$1 : u2 === _ || u2 === m$1 ? u2 = f$1 : (u2 = p$1, l2 = void 0);
    const w2 = u2 === p$1 && t2[i3 + 1].startsWith("/>") ? " " : "";
    r2 += u2 === f$1 ? s3 + h : v2 >= 0 ? (e2.push(d2), s3.slice(0, v2) + o + s3.slice(v2) + n + w2) : s3 + n + (-2 === v2 ? (e2.push(void 0), i3) : w2);
  }
  return [P(t2, r2 + (t2[s2] || "<?>") + (2 === i2 ? "</svg>" : "")), e2];
};
class N {
  constructor({ strings: t2, _$litType$: i2 }, e2) {
    let h2;
    this.parts = [];
    let r2 = 0, d2 = 0;
    const c2 = t2.length - 1, v2 = this.parts, [a2, f2] = V(t2, i2);
    if (this.el = N.createElement(a2, e2), C.currentNode = this.el.content, 2 === i2) {
      const t3 = this.el.content, i3 = t3.firstChild;
      i3.remove(), t3.append(...i3.childNodes);
    }
    for (; null !== (h2 = C.nextNode()) && v2.length < c2; ) {
      if (1 === h2.nodeType) {
        if (h2.hasAttributes()) {
          const t3 = [];
          for (const i3 of h2.getAttributeNames())
            if (i3.endsWith(o) || i3.startsWith(n)) {
              const s2 = f2[d2++];
              if (t3.push(i3), void 0 !== s2) {
                const t4 = h2.getAttribute(s2.toLowerCase() + o).split(n), i4 = /([.?@])?(.*)/.exec(s2);
                v2.push({ type: 1, index: r2, name: i4[2], strings: t4, ctor: "." === i4[1] ? H : "?" === i4[1] ? L : "@" === i4[1] ? z : k });
              } else
                v2.push({ type: 6, index: r2 });
            }
          for (const i3 of t3)
            h2.removeAttribute(i3);
        }
        if (y.test(h2.tagName)) {
          const t3 = h2.textContent.split(n), i3 = t3.length - 1;
          if (i3 > 0) {
            h2.textContent = s$1 ? s$1.emptyScript : "";
            for (let s2 = 0; s2 < i3; s2++)
              h2.append(t3[s2], u$1()), C.nextNode(), v2.push({ type: 2, index: ++r2 });
            h2.append(t3[i3], u$1());
          }
        }
      } else if (8 === h2.nodeType)
        if (h2.data === l$2)
          v2.push({ type: 2, index: r2 });
        else {
          let t3 = -1;
          for (; -1 !== (t3 = h2.data.indexOf(n, t3 + 1)); )
            v2.push({ type: 7, index: r2 }), t3 += n.length - 1;
        }
      r2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = r$1.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function S(t2, i2, s2 = t2, e2) {
  var o2, n2, l2, h2;
  if (i2 === T)
    return i2;
  let r2 = void 0 !== e2 ? null === (o2 = s2._$Co) || void 0 === o2 ? void 0 : o2[e2] : s2._$Cl;
  const u2 = d(i2) ? void 0 : i2._$litDirective$;
  return (null == r2 ? void 0 : r2.constructor) !== u2 && (null === (n2 = null == r2 ? void 0 : r2._$AO) || void 0 === n2 || n2.call(r2, false), void 0 === u2 ? r2 = void 0 : (r2 = new u2(t2), r2._$AT(t2, s2, e2)), void 0 !== e2 ? (null !== (l2 = (h2 = s2)._$Co) && void 0 !== l2 ? l2 : h2._$Co = [])[e2] = r2 : s2._$Cl = r2), void 0 !== r2 && (i2 = S(t2, r2._$AS(t2, i2.values), r2, e2)), i2;
}
class M {
  constructor(t2, i2) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    var i2;
    const { el: { content: s2 }, parts: e2 } = this._$AD, o2 = (null !== (i2 = null == t2 ? void 0 : t2.creationScope) && void 0 !== i2 ? i2 : r$1).importNode(s2, true);
    C.currentNode = o2;
    let n2 = C.nextNode(), l2 = 0, h2 = 0, u2 = e2[0];
    for (; void 0 !== u2; ) {
      if (l2 === u2.index) {
        let i3;
        2 === u2.type ? i3 = new R(n2, n2.nextSibling, this, t2) : 1 === u2.type ? i3 = new u2.ctor(n2, u2.name, u2.strings, this, t2) : 6 === u2.type && (i3 = new Z(n2, this, t2)), this._$AV.push(i3), u2 = e2[++h2];
      }
      l2 !== (null == u2 ? void 0 : u2.index) && (n2 = C.nextNode(), l2++);
    }
    return C.currentNode = r$1, o2;
  }
  v(t2) {
    let i2 = 0;
    for (const s2 of this._$AV)
      void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
}
class R {
  constructor(t2, i2, s2, e2) {
    var o2;
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cp = null === (o2 = null == e2 ? void 0 : e2.isConnected) || void 0 === o2 || o2;
  }
  get _$AU() {
    var t2, i2;
    return null !== (i2 = null === (t2 = this._$AM) || void 0 === t2 ? void 0 : t2._$AU) && void 0 !== i2 ? i2 : this._$Cp;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return void 0 !== i2 && 11 === (null == t2 ? void 0 : t2.nodeType) && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = S(this, t2, i2), d(t2) ? t2 === A || null == t2 || "" === t2 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t2 !== this._$AH && t2 !== T && this._(t2) : void 0 !== t2._$litType$ ? this.g(t2) : void 0 !== t2.nodeType ? this.$(t2) : v(t2) ? this.T(t2) : this._(t2);
  }
  k(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  $(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.k(t2));
  }
  _(t2) {
    this._$AH !== A && d(this._$AH) ? this._$AA.nextSibling.data = t2 : this.$(r$1.createTextNode(t2)), this._$AH = t2;
  }
  g(t2) {
    var i2;
    const { values: s2, _$litType$: e2 } = t2, o2 = "number" == typeof e2 ? this._$AC(t2) : (void 0 === e2.el && (e2.el = N.createElement(P(e2.h, e2.h[0]), this.options)), e2);
    if ((null === (i2 = this._$AH) || void 0 === i2 ? void 0 : i2._$AD) === o2)
      this._$AH.v(s2);
    else {
      const t3 = new M(o2, this), i3 = t3.u(this.options);
      t3.v(s2), this.$(i3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = E.get(t2.strings);
    return void 0 === i2 && E.set(t2.strings, i2 = new N(t2)), i2;
  }
  T(t2) {
    c$2(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const o2 of t2)
      e2 === i2.length ? i2.push(s2 = new R(this.k(u$1()), this.k(u$1()), this, this.options)) : s2 = i2[e2], s2._$AI(o2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, i2) {
    var s2;
    for (null === (s2 = this._$AP) || void 0 === s2 || s2.call(this, false, true, i2); t2 && t2 !== this._$AB; ) {
      const i3 = t2.nextSibling;
      t2.remove(), t2 = i3;
    }
  }
  setConnected(t2) {
    var i2;
    void 0 === this._$AM && (this._$Cp = t2, null === (i2 = this._$AP) || void 0 === i2 || i2.call(this, t2));
  }
}
class k {
  constructor(t2, i2, s2, e2, o2) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = o2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = A;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2, i2 = this, s2, e2) {
    const o2 = this.strings;
    let n2 = false;
    if (void 0 === o2)
      t2 = S(this, t2, i2, 0), n2 = !d(t2) || t2 !== this._$AH && t2 !== T, n2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let l2, h2;
      for (t2 = o2[0], l2 = 0; l2 < o2.length - 1; l2++)
        h2 = S(this, e3[s2 + l2], i2, l2), h2 === T && (h2 = this._$AH[l2]), n2 || (n2 = !d(h2) || h2 !== this._$AH[l2]), h2 === A ? t2 = A : t2 !== A && (t2 += (null != h2 ? h2 : "") + o2[l2 + 1]), this._$AH[l2] = h2;
    }
    n2 && !e2 && this.j(t2);
  }
  j(t2) {
    t2 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t2 ? t2 : "");
  }
}
class H extends k {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === A ? void 0 : t2;
  }
}
const I = s$1 ? s$1.emptyScript : "";
class L extends k {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    t2 && t2 !== A ? this.element.setAttribute(this.name, I) : this.element.removeAttribute(this.name);
  }
}
class z extends k {
  constructor(t2, i2, s2, e2, o2) {
    super(t2, i2, s2, e2, o2), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    var s2;
    if ((t2 = null !== (s2 = S(this, t2, i2, 0)) && void 0 !== s2 ? s2 : A) === T)
      return;
    const e2 = this._$AH, o2 = t2 === A && e2 !== A || t2.capture !== e2.capture || t2.once !== e2.once || t2.passive !== e2.passive, n2 = t2 !== A && (e2 === A || o2);
    o2 && this.element.removeEventListener(this.name, this, e2), n2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var i2, s2;
    "function" == typeof this._$AH ? this._$AH.call(null !== (s2 = null === (i2 = this.options) || void 0 === i2 ? void 0 : i2.host) && void 0 !== s2 ? s2 : this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class Z {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    S(this, t2);
  }
}
const j = { O: o, P: n, A: l$2, C: 1, M: V, L: M, R: v, D: S, I: R, V: k, H: L, N: z, U: H, F: Z }, B = i$1.litHtmlPolyfillSupport;
null == B || B(N, R), (null !== (t$1 = i$1.litHtmlVersions) && void 0 !== t$1 ? t$1 : i$1.litHtmlVersions = []).push("2.8.0");
const D = (t2, i2, s2) => {
  var e2, o2;
  const n2 = null !== (e2 = null == s2 ? void 0 : s2.renderBefore) && void 0 !== e2 ? e2 : i2;
  let l2 = n2._$litPart$;
  if (void 0 === l2) {
    const t3 = null !== (o2 = null == s2 ? void 0 : s2.renderBefore) && void 0 !== o2 ? o2 : null;
    n2._$litPart$ = l2 = new R(i2.insertBefore(u$1(), t3), t3, void 0, null != s2 ? s2 : {});
  }
  return l2._$AI(t2), l2;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, e$1 = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
class i {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, e2, i2) {
    this._$Ct = t2, this._$AM = e2, this._$Ci = i2;
  }
  _$AS(t2, e2) {
    return this.update(t2, e2);
  }
  update(t2, e2) {
    return this.render(...e2);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: l$1 } = j, r = () => document.createComment(""), c$1 = (o2, i2, n2) => {
  var t2;
  const v2 = o2._$AA.parentNode, d2 = void 0 === i2 ? o2._$AB : i2._$AA;
  if (void 0 === n2) {
    const i3 = v2.insertBefore(r(), d2), t3 = v2.insertBefore(r(), d2);
    n2 = new l$1(i3, t3, o2, o2.options);
  } else {
    const l2 = n2._$AB.nextSibling, i3 = n2._$AM, u2 = i3 !== o2;
    if (u2) {
      let l3;
      null === (t2 = n2._$AQ) || void 0 === t2 || t2.call(n2, o2), n2._$AM = o2, void 0 !== n2._$AP && (l3 = o2._$AU) !== i3._$AU && n2._$AP(l3);
    }
    if (l2 !== d2 || u2) {
      let o3 = n2._$AA;
      for (; o3 !== l2; ) {
        const l3 = o3.nextSibling;
        v2.insertBefore(o3, d2), o3 = l3;
      }
    }
  }
  return n2;
}, f = (o2, l2, i2 = o2) => (o2._$AI(l2, i2), o2), s = {}, a = (o2, l2 = s) => o2._$AH = l2, m = (o2) => o2._$AH, p = (o2) => {
  var l2;
  null === (l2 = o2._$AP) || void 0 === l2 || l2.call(o2, false, true);
  let i2 = o2._$AA;
  const n2 = o2._$AB.nextSibling;
  for (; i2 !== n2; ) {
    const o3 = i2.nextSibling;
    i2.remove(), i2 = o3;
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
}, c = e$1(class extends i {
  constructor(e2) {
    if (super(e2), e2.type !== t.CHILD)
      throw Error("repeat() can only be used in text expressions");
  }
  ct(e2, s2, t2) {
    let r2;
    void 0 === t2 ? t2 = s2 : void 0 !== s2 && (r2 = s2);
    const l2 = [], o2 = [];
    let i2 = 0;
    for (const s3 of e2)
      l2[i2] = r2 ? r2(s3, i2) : i2, o2[i2] = t2(s3, i2), i2++;
    return { values: o2, keys: l2 };
  }
  render(e2, s2, t2) {
    return this.ct(e2, s2, t2).values;
  }
  update(s2, [t2, r2, c2]) {
    var d2;
    const a$12 = m(s2), { values: p$12, keys: v2 } = this.ct(t2, r2, c2);
    if (!Array.isArray(a$12))
      return this.ut = v2, p$12;
    const h2 = null !== (d2 = this.ut) && void 0 !== d2 ? d2 : this.ut = [], m$12 = [];
    let y2, x2, j2 = 0, k2 = a$12.length - 1, w2 = 0, A2 = p$12.length - 1;
    for (; j2 <= k2 && w2 <= A2; )
      if (null === a$12[j2])
        j2++;
      else if (null === a$12[k2])
        k2--;
      else if (h2[j2] === v2[w2])
        m$12[w2] = f(a$12[j2], p$12[w2]), j2++, w2++;
      else if (h2[k2] === v2[A2])
        m$12[A2] = f(a$12[k2], p$12[A2]), k2--, A2--;
      else if (h2[j2] === v2[A2])
        m$12[A2] = f(a$12[j2], p$12[A2]), c$1(s2, m$12[A2 + 1], a$12[j2]), j2++, A2--;
      else if (h2[k2] === v2[w2])
        m$12[w2] = f(a$12[k2], p$12[w2]), c$1(s2, a$12[j2], a$12[k2]), k2--, w2++;
      else if (void 0 === y2 && (y2 = u(v2, w2, A2), x2 = u(h2, j2, k2)), y2.has(h2[j2]))
        if (y2.has(h2[k2])) {
          const e2 = x2.get(v2[w2]), t3 = void 0 !== e2 ? a$12[e2] : null;
          if (null === t3) {
            const e3 = c$1(s2, a$12[j2]);
            f(e3, p$12[w2]), m$12[w2] = e3;
          } else
            m$12[w2] = f(t3, p$12[w2]), c$1(s2, a$12[j2], t3), a$12[e2] = null;
          w2++;
        } else
          p(a$12[k2]), k2--;
      else
        p(a$12[j2]), j2++;
    for (; w2 <= A2; ) {
      const e2 = c$1(s2, m$12[A2 + 1]);
      f(e2, p$12[w2]), m$12[w2++] = e2;
    }
    for (; j2 <= k2; ) {
      const e2 = a$12[j2++];
      null !== e2 && p(e2);
    }
    return this.ut = v2, a(s2, m$12), T;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const l = (l2) => null != l2 ? l2 : A;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class e extends i {
  constructor(i2) {
    if (super(i2), this.et = A, i2.type !== t.CHILD)
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(r2) {
    if (r2 === A || null == r2)
      return this.ft = void 0, this.et = r2;
    if (r2 === T)
      return r2;
    if ("string" != typeof r2)
      throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (r2 === this.et)
      return this.ft;
    this.et = r2;
    const s2 = [r2];
    return s2.raw = s2, this.ft = { _$litType$: this.constructor.resultType, strings: s2, values: [] };
  }
}
e.directiveName = "unsafeHTML", e.resultType = 1;
const effectiveHtml = (strings, ...values) => {
  const litStatic = getFeature("LitStatic");
  const fn = litStatic ? litStatic.html : x;
  return fn(strings, ...values);
};
const effectiveSvg = (strings, ...values) => {
  const litStatic = getFeature("LitStatic");
  const fn = litStatic ? litStatic.svg : b;
  return fn(strings, ...values);
};
const litRender = (templateResult, container, styleStrOrHrefsArr, forStaticArea, options) => {
  const openUI5Enablement = getFeature("OpenUI5Enablement");
  if (openUI5Enablement && !forStaticArea) {
    templateResult = openUI5Enablement.wrapTemplateResultInBusyMarkup(effectiveHtml, options.host, templateResult);
  }
  if (typeof styleStrOrHrefsArr === "string") {
    templateResult = effectiveHtml`<style>${styleStrOrHrefsArr}</style>${templateResult}`;
  } else if (Array.isArray(styleStrOrHrefsArr) && styleStrOrHrefsArr.length) {
    templateResult = effectiveHtml`${styleStrOrHrefsArr.map((href) => effectiveHtml`<link type="text/css" rel="stylesheet" href="${href}">`)}${templateResult}`;
  }
  D(templateResult, container, options);
};
const scopeTag = (tag, tags, suffix) => {
  const litStatic = getFeature("LitStatic");
  if (litStatic) {
    return litStatic.unsafeStatic((tags || []).includes(tag) ? `${tag}-${suffix}` : tag);
  }
};
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
const rLocale = /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;
class Locale {
  constructor(sLocaleId) {
    const aResult = rLocale.exec(sLocaleId.replace(/_/g, "-"));
    if (aResult === null) {
      throw new Error(`The given language ${sLocaleId} does not adhere to BCP-47.`);
    }
    this.sLocaleId = sLocaleId;
    this.sLanguage = aResult[1] || DEFAULT_LANGUAGE;
    this.sScript = aResult[2] || "";
    this.sRegion = aResult[3] || "";
    this.sVariant = aResult[4] && aResult[4].slice(1) || null;
    this.sExtension = aResult[5] && aResult[5].slice(1) || null;
    this.sPrivateUse = aResult[6] || null;
    if (this.sLanguage) {
      this.sLanguage = this.sLanguage.toLowerCase();
    }
    if (this.sScript) {
      this.sScript = this.sScript.toLowerCase().replace(/^[a-z]/, (s2) => {
        return s2.toUpperCase();
      });
    }
    if (this.sRegion) {
      this.sRegion = this.sRegion.toUpperCase();
    }
  }
  getLanguage() {
    return this.sLanguage;
  }
  getScript() {
    return this.sScript;
  }
  getRegion() {
    return this.sRegion;
  }
  getVariant() {
    return this.sVariant;
  }
  getVariantSubtags() {
    return this.sVariant ? this.sVariant.split("-") : [];
  }
  getExtension() {
    return this.sExtension;
  }
  getExtensionSubtags() {
    return this.sExtension ? this.sExtension.slice(2).split("-") : [];
  }
  getPrivateUse() {
    return this.sPrivateUse;
  }
  getPrivateUseSubtags() {
    return this.sPrivateUse ? this.sPrivateUse.slice(2).split("-") : [];
  }
  hasPrivateUseSubtag(sSubtag) {
    return this.getPrivateUseSubtags().indexOf(sSubtag) >= 0;
  }
  toString() {
    const r2 = [this.sLanguage];
    if (this.sScript) {
      r2.push(this.sScript);
    }
    if (this.sRegion) {
      r2.push(this.sRegion);
    }
    if (this.sVariant) {
      r2.push(this.sVariant);
    }
    if (this.sExtension) {
      r2.push(this.sExtension);
    }
    if (this.sPrivateUse) {
      r2.push(this.sPrivateUse);
    }
    return r2.join("-");
  }
}
const cache = /* @__PURE__ */ new Map();
const getLocaleInstance = (lang) => {
  if (!cache.has(lang)) {
    cache.set(lang, new Locale(lang));
  }
  return cache.get(lang);
};
const convertToLocaleOrNull = (lang) => {
  try {
    if (lang && typeof lang === "string") {
      return getLocaleInstance(lang);
    }
  } catch (e2) {
  }
  return new Locale(DEFAULT_LOCALE);
};
const getLocale = (lang) => {
  if (lang) {
    return convertToLocaleOrNull(lang);
  }
  const configLanguage = getLanguage();
  if (configLanguage) {
    return getLocaleInstance(configLanguage);
  }
  return convertToLocaleOrNull(detectNavigatorLanguage());
};
const localeRegEX = /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;
const SAPSupportabilityLocales = /(?:^|-)(saptrc|sappsd)(?:-|$)/i;
const M_ISO639_NEW_TO_OLD = {
  "he": "iw",
  "yi": "ji",
  "nb": "no",
  "sr": "sh"
};
const normalizeLocale = (locale) => {
  let m2;
  if (!locale) {
    return DEFAULT_LOCALE;
  }
  if (typeof locale === "string" && (m2 = localeRegEX.exec(locale.replace(/_/g, "-")))) {
    let language = m2[1].toLowerCase();
    let region = m2[3] ? m2[3].toUpperCase() : void 0;
    const script = m2[2] ? m2[2].toLowerCase() : void 0;
    const variants = m2[4] ? m2[4].slice(1) : void 0;
    const isPrivate = m2[6];
    language = M_ISO639_NEW_TO_OLD[language] || language;
    if (isPrivate && (m2 = SAPSupportabilityLocales.exec(isPrivate)) || variants && (m2 = SAPSupportabilityLocales.exec(variants))) {
      return `en_US_${m2[1].toLowerCase()}`;
    }
    if (language === "zh" && !region) {
      if (script === "hans") {
        region = "CN";
      } else if (script === "hant") {
        region = "TW";
      }
    }
    return language + (region ? "_" + region + (variants ? "_" + variants.replace("-", "_") : "") : "");
  }
  return DEFAULT_LOCALE;
};
const nextFallbackLocale = (locale) => {
  if (!locale) {
    return DEFAULT_LOCALE;
  }
  if (locale === "zh_HK") {
    return "zh_TW";
  }
  const p2 = locale.lastIndexOf("_");
  if (p2 >= 0) {
    return locale.slice(0, p2);
  }
  return locale !== DEFAULT_LOCALE ? DEFAULT_LOCALE : "";
};
const warningShown = /* @__PURE__ */ new Set();
const reportedErrors = /* @__PURE__ */ new Set();
const bundleData = /* @__PURE__ */ new Map();
const bundlePromises = /* @__PURE__ */ new Map();
const loaders$1 = /* @__PURE__ */ new Map();
const _setI18nBundleData = (packageName, data) => {
  bundleData.set(packageName, data);
};
const getI18nBundleData = (packageName) => {
  return bundleData.get(packageName);
};
const _hasLoader = (packageName, localeId) => {
  const bundleKey = `${packageName}/${localeId}`;
  return loaders$1.has(bundleKey);
};
const _loadMessageBundleOnce = (packageName, localeId) => {
  const bundleKey = `${packageName}/${localeId}`;
  const loadMessageBundle = loaders$1.get(bundleKey);
  if (loadMessageBundle && !bundlePromises.get(bundleKey)) {
    bundlePromises.set(bundleKey, loadMessageBundle(localeId));
  }
  return bundlePromises.get(bundleKey);
};
const _showAssetsWarningOnce = (packageName) => {
  if (!warningShown.has(packageName)) {
    console.warn(
      `[${packageName}]: Message bundle assets are not configured. Falling back to English texts.`,
      /* eslint-disable-line */
      ` Add \`import "${packageName}/dist/Assets.js"\` in your bundle and make sure your build tool supports dynamic imports and JSON imports. See section "Assets" in the documentation for more information.`
    );
    warningShown.add(packageName);
  }
};
const useFallbackBundle = (packageName, localeId) => {
  return localeId !== DEFAULT_LANGUAGE && !_hasLoader(packageName, localeId);
};
const fetchI18nBundle = async (packageName) => {
  const language = getLocale().getLanguage();
  const region = getLocale().getRegion();
  const variant = getLocale().getVariant();
  let localeId = language + (region ? `-${region}` : ``) + (variant ? `-${variant}` : ``);
  if (useFallbackBundle(packageName, localeId)) {
    localeId = normalizeLocale(localeId);
    while (useFallbackBundle(packageName, localeId)) {
      localeId = nextFallbackLocale(localeId);
    }
  }
  const fetchDefaultLanguage2 = getFetchDefaultLanguage();
  if (localeId === DEFAULT_LANGUAGE && !fetchDefaultLanguage2) {
    _setI18nBundleData(packageName, null);
    return;
  }
  if (!_hasLoader(packageName, localeId)) {
    _showAssetsWarningOnce(packageName);
    return;
  }
  try {
    const data = await _loadMessageBundleOnce(packageName, localeId);
    _setI18nBundleData(packageName, data);
  } catch (error) {
    const e2 = error;
    if (!reportedErrors.has(e2.message)) {
      reportedErrors.add(e2.message);
      console.error(e2.message);
    }
  }
};
attachLanguageChange((lang) => {
  const allPackages = [...bundleData.keys()];
  return Promise.all(allPackages.map(fetchI18nBundle));
});
const messageFormatRegEX = /('')|'([^']+(?:''[^']*)*)(?:'|$)|\{([0-9]+(?:\s*,[^{}]*)?)\}|[{}]/g;
const formatMessage = (text, values) => {
  values = values || [];
  return text.replace(messageFormatRegEX, ($0, $1, $2, $3, offset) => {
    if ($1) {
      return "'";
    }
    if ($2) {
      return $2.replace(/''/g, "'");
    }
    if ($3) {
      const ind = typeof $3 === "string" ? parseInt($3) : $3;
      return String(values[ind]);
    }
    throw new Error(`[i18n]: pattern syntax error at pos ${offset}`);
  });
};
const I18nBundleInstances = /* @__PURE__ */ new Map();
class I18nBundle {
  constructor(packageName) {
    this.packageName = packageName;
  }
  /**
   * Returns a text in the currently loaded language
   *
   * @public
   * @param {Object|String} textObj key/defaultText pair or just the key
   * @param params Values for the placeholders
   * @returns {string}
   */
  getText(textObj, ...params) {
    if (typeof textObj === "string") {
      textObj = { key: textObj, defaultText: textObj };
    }
    if (!textObj || !textObj.key) {
      return "";
    }
    const bundle = getI18nBundleData(this.packageName);
    if (bundle && !bundle[textObj.key]) {
      console.warn(`Key ${textObj.key} not found in the i18n bundle, the default text will be used`);
    }
    const messageText = bundle && bundle[textObj.key] ? bundle[textObj.key] : textObj.defaultText || textObj.key;
    return formatMessage(messageText, params);
  }
}
const getI18nBundleSync = (packageName) => {
  if (I18nBundleInstances.has(packageName)) {
    return I18nBundleInstances.get(packageName);
  }
  const i18nBundle = new I18nBundle(packageName);
  I18nBundleInstances.set(packageName, i18nBundle);
  return i18nBundle;
};
const getI18nBundle = async (packageName) => {
  await fetchI18nBundle(packageName);
  return getI18nBundleSync(packageName);
};
const markedEvents = /* @__PURE__ */ new WeakMap();
const markEvent = (event2, value) => {
  markedEvents.set(event2, value);
};
const getEventMark = (event2) => {
  return markedEvents.get(event2);
};
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
const _fillRegistry = (bundleData2) => {
  Object.keys(bundleData2.data).forEach((iconName) => {
    const iconData = bundleData2.data[iconName];
    registerIcon(iconName, {
      pathData: iconData.path || iconData.paths,
      ltr: iconData.ltr,
      accData: iconData.acc,
      collection: bundleData2.collection,
      packageName: bundleData2.packageName
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
const willShowContent = (childNodes) => {
  return Array.from(childNodes).filter((node) => {
    return node.nodeType !== Node.COMMENT_NODE && (node.nodeType !== Node.TEXT_NODE || (node.nodeValue || "").trim().length !== 0);
  }).length > 0;
};
var ButtonDesign;
(function(ButtonDesign2) {
  ButtonDesign2["Default"] = "Default";
  ButtonDesign2["Positive"] = "Positive";
  ButtonDesign2["Negative"] = "Negative";
  ButtonDesign2["Transparent"] = "Transparent";
  ButtonDesign2["Emphasized"] = "Emphasized";
  ButtonDesign2["Attention"] = "Attention";
})(ButtonDesign || (ButtonDesign = {}));
const ButtonDesign$1 = ButtonDesign;
var ButtonType;
(function(ButtonType2) {
  ButtonType2["Button"] = "Button";
  ButtonType2["Submit"] = "Submit";
  ButtonType2["Reset"] = "Reset";
})(ButtonType || (ButtonType = {}));
const ButtonType$1 = ButtonType;
function block0$1(context, tags, suffix) {
  return effectiveHtml`<button type="button" class="ui5-button-root" ?disabled="${this.disabled}" data-sap-focus-ref  @focusout=${this._onfocusout} @focusin=${this._onfocusin} @click=${this._onclick} @mousedown=${this._onmousedown} @mouseup=${this._onmouseup} @keydown=${this._onkeydown} @keyup=${this._onkeyup} @touchstart="${this._ontouchstart}" @touchend="${this._ontouchend}" tabindex=${l(this.tabIndexValue)} aria-expanded="${l(this.accessibilityAttributes.expanded)}" aria-controls="${l(this.accessibilityAttributes.controls)}" aria-haspopup="${l(this.accessibilityAttributes.hasPopup)}" aria-label="${l(this.ariaLabelText)}" title="${l(this.buttonTitle)}" part="button">${this.icon ? block1$1.call(this, context, tags, suffix) : void 0}<span id="${l(this._id)}-content" class="ui5-button-text"><bdi><slot></slot></bdi></span>${this.hasButtonType ? block2$1.call(this, context, tags, suffix) : void 0}</button> `;
}
function block1$1(context, tags, suffix) {
  return suffix ? effectiveHtml`<${scopeTag("ui5-icon", tags, suffix)} class="ui5-button-icon" name="${l(this.icon)}" accessible-role="${l(this.iconRole)}" part="icon" ?show-tooltip=${this.showIconTooltip}></${scopeTag("ui5-icon", tags, suffix)}>` : effectiveHtml`<ui5-icon class="ui5-button-icon" name="${l(this.icon)}" accessible-role="${l(this.iconRole)}" part="icon" ?show-tooltip=${this.showIconTooltip}></ui5-icon>`;
}
function block2$1(context, tags, suffix) {
  return effectiveHtml`<span class="ui5-hidden-text">${l(this.buttonTypeText)}</span>`;
}
function block0(context, tags, suffix) {
  return effectiveHtml`<svg class="ui5-icon-root" part="root" tabindex="${l(this._tabIndex)}" dir="${l(this._dir)}" viewBox="${l(this.viewBox)}" role="${l(this.effectiveAccessibleRole)}" focusable="false" preserveAspectRatio="xMidYMid meet" aria-label="${l(this.effectiveAccessibleName)}" aria-hidden=${l(this.effectiveAriaHidden)} xmlns="http://www.w3.org/2000/svg" @focusin=${this._onfocusin} @focusout=${this._onfocusout} @keydown=${this._onkeydown} @keyup=${this._onkeyup}>${blockSVG1.call(this, context, tags, suffix)}</svg>`;
}
function block1(context, tags, suffix) {
  return effectiveSvg`<title id="${l(this._id)}-tooltip">${l(this.effectiveAccessibleName)}</title>`;
}
function block2(context, tags, suffix) {
  return effectiveSvg`${l(this.customSvg)}`;
}
function block3(context, tags, suffix, item, index) {
  return effectiveSvg`<path d="${l(item)}"></path>`;
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
const styleData$3 = { packageName: "@ui5/webcomponents-theming", fileName: "themes/sap_horizon/parameters-bundle.css.ts", content: `:root{--sapThemeMetaData-Base-baseLib:{"Path": "Base.baseLib.sap_horizon.css_variables","PathPattern": "/%frameworkId%/%libId%/%themeId%/%fileId%.css","Extends": ["baseTheme"],"Tags": ["Fiori_3","LightColorScheme"],"FallbackThemeId": "sap_fiori_3","Engine":{"Name": "theming-engine","Version": "1.23061.0"},"Version":{"Build": "11.9.0.20231102110441","Source": "11.9.0"}};--sapBrandColor: #0070f2;--sapHighlightColor: #0064d9;--sapBaseColor: #fff;--sapShellColor: #fff;--sapBackgroundColor: #f5f6f7;--sapFontFamily: "72", "72full", Arial, Helvetica, sans-serif;--sapFontSize: .875rem;--sapTextColor: #1d2d3e;--sapLinkColor: #0064d9;--sapCompanyLogo: none;--sapBackgroundImage: none;--sapBackgroundImageOpacity: 1;--sapBackgroundImageRepeat: false;--sapSelectedColor: #0064d9;--sapHoverColor: #eaecee;--sapActiveColor: #dee2e5;--sapHighlightTextColor: #fff;--sapTitleColor: #1d2d3e;--sapNegativeColor: #aa0808;--sapCriticalColor: #e76500;--sapPositiveColor: #256f3a;--sapInformativeColor: #0070f2;--sapNeutralColor: #788fa6;--sapNegativeElementColor: #f53232;--sapCriticalElementColor: #e76500;--sapPositiveElementColor: #30914c;--sapInformativeElementColor: #0070f2;--sapNeutralElementColor: #788fa6;--sapNegativeTextColor: #aa0808;--sapCriticalTextColor: #b44f00;--sapPositiveTextColor: #256f3a;--sapInformativeTextColor: #0064d9;--sapNeutralTextColor: #1d2d3e;--sapErrorColor: #aa0808;--sapWarningColor: #e76500;--sapSuccessColor: #256f3a;--sapInformationColor: #0070f2;--sapErrorBackground: #ffeaf4;--sapWarningBackground: #fff8d6;--sapSuccessBackground: #f5fae5;--sapInformationBackground: #e1f4ff;--sapNeutralBackground: #eff1f2;--sapErrorBorderColor: #e90b0b;--sapWarningBorderColor: #dd6100;--sapSuccessBorderColor: #30914c;--sapInformationBorderColor: #0070f2;--sapNeutralBorderColor: #788fa6;--sapElement_LineHeight: 2.75rem;--sapElement_Height: 2.25rem;--sapElement_BorderWidth: .0625rem;--sapElement_BorderCornerRadius: .75rem;--sapElement_Compact_LineHeight: 2rem;--sapElement_Compact_Height: 1.625rem;--sapElement_Condensed_LineHeight: 1.5rem;--sapElement_Condensed_Height: 1.375rem;--sapContent_LineHeight: 1.5;--sapContent_IconHeight: 1rem;--sapContent_IconColor: #1d2d3e;--sapContent_ContrastIconColor: #fff;--sapContent_NonInteractiveIconColor: #758ca4;--sapContent_MarkerIconColor: #5d36ff;--sapContent_MarkerTextColor: #046c7a;--sapContent_MeasureIndicatorColor: #556b81;--sapContent_Selected_MeasureIndicatorColor: #0064d9;--sapContent_Placeholderloading_Background: #ccc;--sapContent_Placeholderloading_Gradient: linear-gradient(to right, #ccc 0%, #ccc 20%, #999 50%, #ccc 80%, #ccc 100%);--sapContent_ImagePlaceholderBackground: #eaecee;--sapContent_ImagePlaceholderForegroundColor: #5b738b;--sapContent_RatedColor: #d27700;--sapContent_UnratedColor: #758ca4;--sapContent_BusyColor: #0064d9;--sapContent_FocusColor: #0032a5;--sapContent_FocusStyle: solid;--sapContent_FocusWidth: .125rem;--sapContent_ContrastFocusColor: #fff;--sapContent_ShadowColor: #223548;--sapContent_ContrastShadowColor: #fff;--sapContent_Shadow0: 0 0 .125rem 0 rgba(34,53,72,.2), 0 .125rem .25rem 0 rgba(34,53,72,.2);--sapContent_Shadow1: 0 0 0 .0625rem rgba(34,53,72,.48), 0 .125rem .5rem 0 rgba(34,53,72,.3);--sapContent_Shadow2: 0 0 0 .0625rem rgba(34,53,72,.48), 0 .625rem 1.875rem 0 rgba(34,53,72,.25);--sapContent_Shadow3: 0 0 0 .0625rem rgba(34,53,72,.48), 0 1.25rem 5rem 0 rgba(34,53,72,.25);--sapContent_TextShadow: 0 0 .125rem #fff;--sapContent_ContrastTextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapContent_HeaderShadow: 0 .125rem .125rem 0 rgba(34,53,72,.05), inset 0 -.0625rem 0 0 #d9d9d9;--sapContent_Interaction_Shadow: inset 0 0 0 .0625rem rgba(85,107,129,.25);--sapContent_Selected_Shadow: inset 0 0 0 .0625rem rgba(79,160,255,.5);--sapContent_Negative_Shadow: inset 0 0 0 .0625rem rgba(255,142,196,.45);--sapContent_Critical_Shadow: inset 0 0 0 .0625rem rgba(255,213,10,.4);--sapContent_Positive_Shadow: inset 0 0 0 .0625rem rgba(48,145,76,.18);--sapContent_Informative_Shadow: inset 0 0 0 .0625rem rgba(104,174,255,.5);--sapContent_Neutral_Shadow: inset 0 0 0 .0625rem rgba(120,143,166,.3);--sapContent_SearchHighlightColor: #dafdf5;--sapContent_HelpColor: #188918;--sapContent_LabelColor: #556b82;--sapContent_MonospaceFontFamily: "72Mono", "72Monofull", lucida console, monospace;--sapContent_MonospaceBoldFontFamily: "72Mono-Bold", "72Mono-Boldfull", lucida console, monospace;--sapContent_IconFontFamily: "SAP-icons";--sapContent_DisabledTextColor: rgba(29,45,62,.6);--sapContent_DisabledOpacity: .4;--sapContent_ContrastTextThreshold: .65;--sapContent_ContrastTextColor: #fff;--sapContent_ForegroundColor: #efefef;--sapContent_ForegroundBorderColor: #758ca4;--sapContent_ForegroundTextColor: #1d2d3e;--sapContent_BadgeBackground: #aa0808;--sapContent_BadgeTextColor: #fff;--sapContent_DragAndDropActiveColor: #0064d9;--sapContent_Selected_TextColor: #0064d9;--sapContent_Selected_Background: #fff;--sapContent_Selected_Hover_Background: #e3f0ff;--sapContent_Selected_ForegroundColor: #0064d9;--sapContent_ForcedColorAdjust: none;--sapContent_Illustrative_Color1: #5d36ff;--sapContent_Illustrative_Color2: #0070f2;--sapContent_Illustrative_Color3: #f58b00;--sapContent_Illustrative_Color4: #00144a;--sapContent_Illustrative_Color5: #a9b4be;--sapContent_Illustrative_Color6: #d5dadd;--sapContent_Illustrative_Color7: #ebf8ff;--sapContent_Illustrative_Color8: #fff;--sapContent_Illustrative_Color9: #64edd2;--sapContent_Illustrative_Color10: #ebf8ff;--sapContent_Illustrative_Color11: #f31ded;--sapContent_Illustrative_Color12: #00a800;--sapContent_Illustrative_Color13: #005dc9;--sapContent_Illustrative_Color14: #004da5;--sapContent_Illustrative_Color15: #cc7400;--sapContent_Illustrative_Color16: #3b0ac6;--sapContent_Illustrative_Color17: #00a58a;--sapContent_Illustrative_Color18: #d1efff;--sapContent_Illustrative_Color19: #b8e6ff;--sapContent_Illustrative_Color20: #9eddff;--sapFontLightFamily: "72-Light", "72-Lightfull", "72", "72full", Arial, Helvetica, sans-serif;--sapFontBoldFamily: "72-Bold", "72-Boldfull", "72", "72full", Arial, Helvetica, sans-serif;--sapFontSemiboldFamily: "72-Semibold", "72-Semiboldfull", "72", "72full", Arial, Helvetica, sans-serif;--sapFontSemiboldDuplexFamily: "72-SemiboldDuplex", "72-SemiboldDuplexfull", "72", "72full", Arial, Helvetica, sans-serif;--sapFontBlackFamily: "72Black", "72Blackfull","72", "72full", Arial, Helvetica, sans-serif;--sapFontHeaderFamily: "72-Bold", "72-Boldfull", "72", "72full", Arial, Helvetica, sans-serif;--sapFontSmallSize: .75rem;--sapFontLargeSize: 1rem;--sapFontHeader1Size: 3rem;--sapFontHeader2Size: 2rem;--sapFontHeader3Size: 1.5rem;--sapFontHeader4Size: 1.25rem;--sapFontHeader5Size: 1rem;--sapFontHeader6Size: .875rem;--sapLink_TextDecoration: none;--sapLink_Hover_Color: #0064d9;--sapLink_Hover_TextDecoration: underline;--sapLink_Active_Color: #0064d9;--sapLink_Active_TextDecoration: none;--sapLink_Visited_Color: #0064d9;--sapLink_InvertedColor: #a6cfff;--sapLink_SubtleColor: #1d2d3e;--sapShell_Background: #eff1f2;--sapShell_BackgroundImage: linear-gradient(to bottom, #eff1f2, #eff1f2);--sapShell_BackgroundImageOpacity: 1;--sapShell_BackgroundImageRepeat: false;--sapShell_BorderColor: #fff;--sapShell_TextColor: #1d2d3e;--sapShell_InteractiveBackground: #eff1f2;--sapShell_InteractiveTextColor: #1d2d3e;--sapShell_InteractiveBorderColor: #556b81;--sapShell_GroupTitleTextColor: #1d2d3e;--sapShell_GroupTitleTextShadow: 0 0 .125rem #fff;--sapShell_Hover_Background: #fff;--sapShell_Active_Background: #fff;--sapShell_Active_TextColor: #0070f2;--sapShell_Selected_Background: #fff;--sapShell_Selected_TextColor: #0070f2;--sapShell_Selected_Hover_Background: #fff;--sapShell_Favicon: none;--sapShell_Navigation_Background: #fff;--sapShell_Navigation_Hover_Background: #fff;--sapShell_Navigation_SelectedColor: #0064d9;--sapShell_Navigation_Selected_TextColor: #0064d9;--sapShell_Navigation_TextColor: #1d2d3e;--sapShell_Navigation_Active_TextColor: #0064d9;--sapShell_Navigation_Active_Background: #fff;--sapShell_Shadow: 0 .125rem .125rem 0 rgba(34,53,72,.15), inset 0 -.0625rem 0 0 rgba(34,53,72,.2);--sapShell_NegativeColor: #aa0808;--sapShell_CriticalColor: #b44f00;--sapShell_PositiveColor: #256f3a;--sapShell_InformativeColor: #0064d9;--sapShell_NeutralColor: #1d2d3e;--sapShell_Category_1_Background: #0057d2;--sapShell_Category_1_BorderColor: #0057d2;--sapShell_Category_1_TextColor: #fff;--sapShell_Category_1_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_2_Background: #df1278;--sapShell_Category_2_BorderColor: #df1278;--sapShell_Category_2_TextColor: #fff;--sapShell_Category_2_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_3_Background: #e76500;--sapShell_Category_3_BorderColor: #e76500;--sapShell_Category_3_TextColor: #fff;--sapShell_Category_3_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_4_Background: #7800a4;--sapShell_Category_4_BorderColor: #7800a4;--sapShell_Category_4_TextColor: #fff;--sapShell_Category_4_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_5_Background: #aa2608;--sapShell_Category_5_BorderColor: #aa2608;--sapShell_Category_5_TextColor: #fff;--sapShell_Category_5_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_6_Background: #07838f;--sapShell_Category_6_BorderColor: #07838f;--sapShell_Category_6_TextColor: #fff;--sapShell_Category_6_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_7_Background: #f31ded;--sapShell_Category_7_BorderColor: #f31ded;--sapShell_Category_7_TextColor: #fff;--sapShell_Category_7_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_8_Background: #188918;--sapShell_Category_8_BorderColor: #188918;--sapShell_Category_8_TextColor: #fff;--sapShell_Category_8_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_9_Background: #002a86;--sapShell_Category_9_BorderColor: #002a86;--sapShell_Category_9_TextColor: #fff;--sapShell_Category_9_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_10_Background: #5b738b;--sapShell_Category_10_BorderColor: #5b738b;--sapShell_Category_10_TextColor: #fff;--sapShell_Category_10_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_11_Background: #d20a0a;--sapShell_Category_11_BorderColor: #d20a0a;--sapShell_Category_11_TextColor: #fff;--sapShell_Category_11_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_12_Background: #7858ff;--sapShell_Category_12_BorderColor: #7858ff;--sapShell_Category_12_TextColor: #fff;--sapShell_Category_12_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_13_Background: #a00875;--sapShell_Category_13_BorderColor: #a00875;--sapShell_Category_13_TextColor: #fff;--sapShell_Category_13_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_14_Background: #14565b;--sapShell_Category_14_BorderColor: #14565b;--sapShell_Category_14_TextColor: #fff;--sapShell_Category_14_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_15_Background: #223548;--sapShell_Category_15_BorderColor: #223548;--sapShell_Category_15_TextColor: #fff;--sapShell_Category_15_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_16_Background: #1e592f;--sapShell_Category_16_BorderColor: #1e592f;--sapShell_Category_16_TextColor: #fff;--sapShell_Category_16_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapAvatar_1_Background: #fff3b8;--sapAvatar_1_BorderColor: #fff3b8;--sapAvatar_1_TextColor: #a45d00;--sapAvatar_2_Background: #ffd0e7;--sapAvatar_2_BorderColor: #ffd0e7;--sapAvatar_2_TextColor: #aa0808;--sapAvatar_3_Background: #ffdbe7;--sapAvatar_3_BorderColor: #ffdbe7;--sapAvatar_3_TextColor: #ba066c;--sapAvatar_4_Background: #ffdcf3;--sapAvatar_4_BorderColor: #ffdcf3;--sapAvatar_4_TextColor: #a100c2;--sapAvatar_5_Background: #ded3ff;--sapAvatar_5_BorderColor: #ded3ff;--sapAvatar_5_TextColor: #552cff;--sapAvatar_6_Background: #d1efff;--sapAvatar_6_BorderColor: #d1efff;--sapAvatar_6_TextColor: #0057d2;--sapAvatar_7_Background: #c2fcee;--sapAvatar_7_BorderColor: #c2fcee;--sapAvatar_7_TextColor: #046c7a;--sapAvatar_8_Background: #ebf5cb;--sapAvatar_8_BorderColor: #ebf5cb;--sapAvatar_8_TextColor: #256f3a;--sapAvatar_9_Background: #ddccf0;--sapAvatar_9_BorderColor: #ddccf0;--sapAvatar_9_TextColor: #6c32a9;--sapAvatar_10_Background: #eaecee;--sapAvatar_10_BorderColor: #eaecee;--sapAvatar_10_TextColor: #556b82;--sapButton_Background: #fff;--sapButton_BorderColor: #bcc3ca;--sapButton_BorderWidth: .0625rem;--sapButton_BorderCornerRadius: .5rem;--sapButton_TextColor: #0064d9;--sapButton_Hover_Background: #eaecee;--sapButton_Hover_BorderColor: #bcc3ca;--sapButton_Hover_TextColor: #0064d9;--sapButton_IconColor: #0064d9;--sapButton_Active_Background: #fff;--sapButton_Active_BorderColor: #0064d9;--sapButton_Active_TextColor: #0064d9;--sapButton_Emphasized_Background: #0070f2;--sapButton_Emphasized_BorderColor: #0070f2;--sapButton_Emphasized_TextColor: #fff;--sapButton_Emphasized_Hover_Background: #0064d9;--sapButton_Emphasized_Hover_BorderColor: #0064d9;--sapButton_Emphasized_Hover_TextColor: #fff;--sapButton_Emphasized_Active_Background: #fff;--sapButton_Emphasized_Active_BorderColor: #0064d9;--sapButton_Emphasized_Active_TextColor: #0064d9;--sapButton_Emphasized_TextShadow: transparent;--sapButton_Emphasized_FontWeight: bold;--sapButton_Reject_Background: #ffd6e9;--sapButton_Reject_BorderColor: #ffc2de;--sapButton_Reject_TextColor: #aa0808;--sapButton_Reject_Hover_Background: #ffbddb;--sapButton_Reject_Hover_BorderColor: #ffbddb;--sapButton_Reject_Hover_TextColor: #aa0808;--sapButton_Reject_Active_Background: #fff;--sapButton_Reject_Active_BorderColor: #e90b0b;--sapButton_Reject_Active_TextColor: #aa0808;--sapButton_Reject_Selected_Background: #fff;--sapButton_Reject_Selected_BorderColor: #e90b0b;--sapButton_Reject_Selected_TextColor: #aa0808;--sapButton_Reject_Selected_Hover_Background: #ffbddb;--sapButton_Reject_Selected_Hover_BorderColor: #e90b0b;--sapButton_Accept_Background: #ebf5cb;--sapButton_Accept_BorderColor: #dbeda0;--sapButton_Accept_TextColor: #256f3a;--sapButton_Accept_Hover_Background: #e3f1b6;--sapButton_Accept_Hover_BorderColor: #e3f1b6;--sapButton_Accept_Hover_TextColor: #256f3a;--sapButton_Accept_Active_Background: #fff;--sapButton_Accept_Active_BorderColor: #30914c;--sapButton_Accept_Active_TextColor: #256f3a;--sapButton_Accept_Selected_Background: #fff;--sapButton_Accept_Selected_BorderColor: #30914c;--sapButton_Accept_Selected_TextColor: #256f3a;--sapButton_Accept_Selected_Hover_Background: #e3f1b6;--sapButton_Accept_Selected_Hover_BorderColor: #30914c;--sapButton_Lite_Background: transparent;--sapButton_Lite_BorderColor: transparent;--sapButton_Lite_TextColor: #0064d9;--sapButton_Lite_Hover_Background: #eaecee;--sapButton_Lite_Hover_BorderColor: #bcc3ca;--sapButton_Lite_Hover_TextColor: #0064d9;--sapButton_Lite_Active_Background: #fff;--sapButton_Lite_Active_BorderColor: #0064d9;--sapButton_Selected_Background: #fff;--sapButton_Selected_BorderColor: #0064d9;--sapButton_Selected_TextColor: #0064d9;--sapButton_Selected_Hover_Background: #e3f0ff;--sapButton_Selected_Hover_BorderColor: #0064d9;--sapButton_Attention_Background: #fff3b7;--sapButton_Attention_BorderColor: #ffeb84;--sapButton_Attention_TextColor: #b44f00;--sapButton_Attention_Hover_Background: #ffef9e;--sapButton_Attention_Hover_BorderColor: #ffef9e;--sapButton_Attention_Hover_TextColor: #b44f00;--sapButton_Attention_Active_Background: #fff;--sapButton_Attention_Active_BorderColor: #dd6100;--sapButton_Attention_Active_TextColor: #b44f00;--sapButton_Attention_Selected_Background: #fff;--sapButton_Attention_Selected_BorderColor: #dd6100;--sapButton_Attention_Selected_TextColor: #b44f00;--sapButton_Attention_Selected_Hover_Background: #ffef9e;--sapButton_Attention_Selected_Hover_BorderColor: #dd6100;--sapButton_Negative_Background: #f53232;--sapButton_Negative_BorderColor: #f53232;--sapButton_Negative_TextColor: #fff;--sapButton_Negative_Hover_Background: #e90b0b;--sapButton_Negative_Hover_BorderColor: #e90b0b;--sapButton_Negative_Hover_TextColor: #fff;--sapButton_Negative_Active_Background: #fff;--sapButton_Negative_Active_BorderColor: #f53232;--sapButton_Negative_Active_TextColor: #aa0808;--sapButton_Critical_Background: #e76500;--sapButton_Critical_BorderColor: #e76500;--sapButton_Critical_TextColor: #fff;--sapButton_Critical_Hover_Background: #dd6100;--sapButton_Critical_Hover_BorderColor: #dd6100;--sapButton_Critical_Hover_TextColor: #fff;--sapButton_Critical_Active_Background: #fff;--sapButton_Critical_Active_BorderColor: #dd6100;--sapButton_Critical_Active_TextColor: #b44f00;--sapButton_Success_Background: #30914c;--sapButton_Success_BorderColor: #30914c;--sapButton_Success_TextColor: #fff;--sapButton_Success_Hover_Background: #2c8646;--sapButton_Success_Hover_BorderColor: #2c8646;--sapButton_Success_Hover_TextColor: #fff;--sapButton_Success_Active_Background: #fff;--sapButton_Success_Active_BorderColor: #30914c;--sapButton_Success_Active_TextColor: #256f3a;--sapButton_Information_Background: #e8f3ff;--sapButton_Information_BorderColor: #b5d8ff;--sapButton_Information_TextColor: #0064d9;--sapButton_Information_Hover_Background: #d4e8ff;--sapButton_Information_Hover_BorderColor: #b5d8ff;--sapButton_Information_Hover_TextColor: #0064d9;--sapButton_Information_Active_Background: #fff;--sapButton_Information_Active_BorderColor: #0064d9;--sapButton_Information_Active_TextColor: #0064d9;--sapButton_Neutral_Background: #e8f3ff;--sapButton_Neutral_BorderColor: #b5d8ff;--sapButton_Neutral_TextColor: #0064d9;--sapButton_Neutral_Hover_Background: #d4e8ff;--sapButton_Neutral_Hover_BorderColor: #b5d8ff;--sapButton_Neutral_Hover_TextColor: #0064d9;--sapButton_Neutral_Active_Background: #fff;--sapButton_Neutral_Active_BorderColor: #0064d9;--sapButton_Neutral_Active_TextColor: #0064d9;--sapButton_Track_Background: #788fa6;--sapButton_Track_BorderColor: #788fa6;--sapButton_Track_TextColor: #fff;--sapButton_Track_Hover_Background: #637d97;--sapButton_Track_Hover_BorderColor: #637d97;--sapButton_Track_Selected_Background: #0064d9;--sapButton_Track_Selected_BorderColor: #0064d9;--sapButton_Track_Selected_TextColor: #fff;--sapButton_Track_Selected_Hover_Background: #0058c0;--sapButton_Track_Selected_Hover_BorderColor: #0058c0;--sapButton_Handle_Background: #fff;--sapButton_Handle_BorderColor: #fff;--sapButton_Handle_TextColor: #1d2d3e;--sapButton_Handle_Hover_Background: #fff;--sapButton_Handle_Hover_BorderColor: rgba(255,255,255,.5);--sapButton_Handle_Selected_Background: #fff;--sapButton_Handle_Selected_BorderColor: #fff;--sapButton_Handle_Selected_TextColor: #0064d9;--sapButton_Handle_Selected_Hover_Background: #fff;--sapButton_Handle_Selected_Hover_BorderColor: rgba(255,255,255,.5);--sapButton_Track_Negative_Background: #f53232;--sapButton_Track_Negative_BorderColor: #f53232;--sapButton_Track_Negative_TextColor: #fff;--sapButton_Track_Negative_Hover_Background: #e90b0b;--sapButton_Track_Negative_Hover_BorderColor: #e90b0b;--sapButton_Handle_Negative_Background: #fff;--sapButton_Handle_Negative_BorderColor: #fff;--sapButton_Handle_Negative_TextColor: #aa0808;--sapButton_Handle_Negative_Hover_Background: #fff;--sapButton_Handle_Negative_Hover_BorderColor: rgba(255,255,255,.5);--sapButton_Track_Positive_Background: #30914c;--sapButton_Track_Positive_BorderColor: #30914c;--sapButton_Track_Positive_TextColor: #fff;--sapButton_Track_Positive_Hover_Background: #2c8646;--sapButton_Track_Positive_Hover_BorderColor: #2c8646;--sapButton_Handle_Positive_Background: #fff;--sapButton_Handle_Positive_BorderColor: #fff;--sapButton_Handle_Positive_TextColor: #256f3a;--sapButton_Handle_Positive_Hover_Background: #fff;--sapButton_Handle_Positive_Hover_BorderColor: rgba(255,255,255,.5);--sapButton_TokenBackground: #fff;--sapButton_TokenBorderColor: #bcc3ca;--sapField_Background: #fff;--sapField_BackgroundStyle: 0 100% / 100% .0625rem no-repeat linear-gradient(0deg, #556b81, #556b81) border-box;--sapField_TextColor: #131e29;--sapField_PlaceholderTextColor: #556b82;--sapField_BorderColor: #556b81;--sapField_HelpBackground: #fff;--sapField_BorderWidth: .0625rem;--sapField_BorderStyle: none;--sapField_BorderCornerRadius: .25rem;--sapField_Shadow: inset 0 0 0 .0625rem rgba(85,107,129,.25);--sapField_Hover_Background: #fff;--sapField_Hover_BackgroundStyle: 0 100% / 100% .0625rem no-repeat linear-gradient(0deg, #0064d9, #0064d9) border-box;--sapField_Hover_BorderColor: #0064d9;--sapField_Hover_HelpBackground: #fff;--sapField_Hover_Shadow: inset 0 0 0 .0625rem rgba(79,160,255,.5);--sapField_Hover_InvalidShadow: inset 0 0 0 .0625rem rgba(255,142,196,.45);--sapField_Hover_WarningShadow: inset 0 0 0 .0625rem rgba(255,213,10,.4);--sapField_Hover_SuccessShadow: inset 0 0 0 .0625rem rgba(48,145,76,.18);--sapField_Hover_InformationShadow: inset 0 0 0 .0625rem rgba(104,174,255,.5);--sapField_Active_BorderColor: #0064d9;--sapField_Focus_Background: #fff;--sapField_Focus_BorderColor: #0032a5;--sapField_Focus_HelpBackground: #fff;--sapField_ReadOnly_Background: #eaecee;--sapField_ReadOnly_BackgroundStyle: 0 100% / .375rem .0625rem repeat-x linear-gradient(90deg, #556b81 0, #556b81 .25rem, transparent .25rem) border-box;--sapField_ReadOnly_BorderColor: #556b81;--sapField_ReadOnly_BorderStyle: none;--sapField_ReadOnly_HelpBackground: #eaecee;--sapField_RequiredColor: #ba066c;--sapField_InvalidColor: #e90b0b;--sapField_InvalidBackground: #ffeaf4;--sapField_InvalidBackgroundStyle: 0 100% / 100% .125rem no-repeat linear-gradient(0deg, #e90b0b, #e90b0b) border-box;--sapField_InvalidBorderWidth: .125rem;--sapField_InvalidBorderStyle: none;--sapField_InvalidShadow: inset 0 0 0 .0625rem rgba(255,142,196,.45);--sapField_WarningColor: #dd6100;--sapField_WarningBackground: #fff8d6;--sapField_WarningBackgroundStyle: 0 100% / 100% .125rem no-repeat linear-gradient(0deg, #dd6100, #dd6100) border-box;--sapField_WarningBorderWidth: .125rem;--sapField_WarningBorderStyle: none;--sapField_WarningShadow: inset 0 0 0 .0625rem rgba(255,213,10,.4);--sapField_SuccessColor: #30914c;--sapField_SuccessBackground: #f5fae5;--sapField_SuccessBackgroundStyle: 0 100% / 100% .0625rem no-repeat linear-gradient(0deg, #30914c, #30914c) border-box;--sapField_SuccessBorderWidth: .0625rem;--sapField_SuccessBorderStyle: none;--sapField_SuccessShadow: inset 0 0 0 .0625rem rgba(48,145,76,.18);--sapField_InformationColor: #0070f2;--sapField_InformationBackground: #e1f4ff;--sapField_InformationBackgroundStyle: 0 100% / 100% .125rem no-repeat linear-gradient(0deg, #0070f2, #0070f2) border-box;--sapField_InformationBorderWidth: .125rem;--sapField_InformationBorderStyle: none;--sapField_InformationShadow: inset 0 0 0 .0625rem rgba(104,174,255,.5);--sapGroup_TitleBackground: #fff;--sapGroup_TitleBorderColor: #a8b2bd;--sapGroup_TitleTextColor: #1d2d3e;--sapGroup_Title_FontSize: 1rem;--sapGroup_ContentBackground: #fff;--sapGroup_ContentBorderColor: #d9d9d9;--sapGroup_BorderWidth: .0625rem;--sapGroup_BorderCornerRadius: .5rem;--sapGroup_FooterBackground: transparent;--sapToolbar_Background: #fff;--sapToolbar_SeparatorColor: #d9d9d9;--sapList_HeaderBackground: #fff;--sapList_HeaderBorderColor: #a8b2bd;--sapList_HeaderTextColor: #1d2d3e;--sapList_BorderColor: #e5e5e5;--sapList_BorderWidth: .0625rem;--sapList_TextColor: #1d2d3e;--sapList_Active_TextColor: #1d2d3e;--sapList_Active_Background: #dee2e5;--sapList_SelectionBackgroundColor: #ebf8ff;--sapList_SelectionBorderColor: #0064d9;--sapList_Hover_SelectionBackground: #dcf3ff;--sapList_Background: #fff;--sapList_Hover_Background: #eaecee;--sapList_AlternatingBackground: #f5f6f7;--sapList_GroupHeaderBackground: #fff;--sapList_GroupHeaderBorderColor: #a8b2bd;--sapList_GroupHeaderTextColor: #1d2d3e;--sapList_TableGroupHeaderBackground: #eff1f2;--sapList_TableGroupHeaderBorderColor: #a8b2bd;--sapList_TableGroupHeaderTextColor: #1d2d3e;--sapList_FooterBackground: #fff;--sapList_FooterTextColor: #1d2d3e;--sapList_TableFooterBorder: #a8b2bd;--sapList_TableFixedBorderColor: #8c8c8c;--sapMessage_ErrorBorderColor: #ff8ec4;--sapMessage_WarningBorderColor: #ffe770;--sapMessage_SuccessBorderColor: #cee67e;--sapMessage_InformationBorderColor: #7bcfff;--sapPopover_BorderCornerRadius: .5rem;--sapProgress_Background: #d5dadd;--sapProgress_BorderColor: #d5dadd;--sapProgress_TextColor: #1d2d3e;--sapProgress_FontSize: .875rem;--sapProgress_NegativeBackground: #ffdbec;--sapProgress_NegativeBorderColor: #ffdbec;--sapProgress_NegativeTextColor: #1d2d3e;--sapProgress_CriticalBackground: #fff4bd;--sapProgress_CriticalBorderColor: #fff4bd;--sapProgress_CriticalTextColor: #1d2d3e;--sapProgress_PositiveBackground: #e5f2ba;--sapProgress_PositiveBorderColor: #e5f2ba;--sapProgress_PositiveTextColor: #1d2d3e;--sapProgress_InformationBackground: #cdedff;--sapProgress_InformationBorderColor: #cdedff;--sapProgress_InformationTextColor: #1d2d3e;--sapProgress_Value_Background: #788fa6;--sapProgress_Value_BorderColor: #788fa6;--sapProgress_Value_TextColor: #788fa6;--sapProgress_Value_NegativeBackground: #f53232;--sapProgress_Value_NegativeBorderColor: #f53232;--sapProgress_Value_NegativeTextColor: #f53232;--sapProgress_Value_CriticalBackground: #e76500;--sapProgress_Value_CriticalBorderColor: #e76500;--sapProgress_Value_CriticalTextColor: #e76500;--sapProgress_Value_PositiveBackground: #30914c;--sapProgress_Value_PositiveBorderColor: #30914c;--sapProgress_Value_PositiveTextColor: #30914c;--sapProgress_Value_InformationBackground: #0070f2;--sapProgress_Value_InformationBorderColor: #0070f2;--sapProgress_Value_InformationTextColor: #0070f2;--sapScrollBar_FaceColor: #7b91a8;--sapScrollBar_TrackColor: #fff;--sapScrollBar_BorderColor: #7b91a8;--sapScrollBar_SymbolColor: #0064d9;--sapScrollBar_Dimension: .75rem;--sapScrollBar_Hover_FaceColor: #5b728b;--sapSlider_Background: #d5dadd;--sapSlider_BorderColor: #d5dadd;--sapSlider_Selected_Background: #0064d9;--sapSlider_Selected_BorderColor: #0064d9;--sapSlider_HandleBackground: #fff;--sapSlider_HandleBorderColor: #b0d5ff;--sapSlider_RangeHandleBackground: #fff;--sapSlider_Hover_HandleBackground: #e3f0ff;--sapSlider_Hover_HandleBorderColor: #b0d5ff;--sapSlider_Hover_RangeHandleBackground: #e3f0ff;--sapSlider_Active_HandleBackground: #fff;--sapSlider_Active_HandleBorderColor: #0064d9;--sapSlider_Active_RangeHandleBackground: transparent;--sapPageHeader_Background: #fff;--sapPageHeader_BorderColor: #d9d9d9;--sapPageHeader_TextColor: #1d2d3e;--sapPageFooter_Background: #fff;--sapPageFooter_BorderColor: #d9d9d9;--sapPageFooter_TextColor: #1d2d3e;--sapInfobar_Background: #c2fcee;--sapInfobar_Hover_Background: #fff;--sapInfobar_Active_Background: #fff;--sapInfobar_NonInteractive_Background: #f5f6f7;--sapInfobar_TextColor: #046c7a;--sapObjectHeader_Background: #fff;--sapObjectHeader_Hover_Background: #eaecee;--sapObjectHeader_BorderColor: #d9d9d9;--sapObjectHeader_Title_TextColor: #1d2d3e;--sapObjectHeader_Title_FontSize: 1.5rem;--sapObjectHeader_Title_SnappedFontSize: 1.25rem;--sapObjectHeader_Title_FontFamily: "72Black", "72Blackfull","72", "72full", Arial, Helvetica, sans-serif;--sapObjectHeader_Subtitle_TextColor: #556b82;--sapBlockLayer_Background: #000;--sapTile_Background: #fff;--sapTile_Hover_Background: #eaecee;--sapTile_Active_Background: #dee2e5;--sapTile_BorderColor: transparent;--sapTile_BorderCornerRadius: 1rem;--sapTile_TitleTextColor: #1d2d3e;--sapTile_TextColor: #556b82;--sapTile_IconColor: #556b82;--sapTile_SeparatorColor: #ccc;--sapTile_Interactive_BorderColor: #b3b3b3;--sapTile_OverlayBackground: #fff;--sapTile_OverlayForegroundColor: #1d2d3e;--sapAccentColor1: #d27700;--sapAccentColor2: #aa0808;--sapAccentColor3: #ba066c;--sapAccentColor4: #a100c2;--sapAccentColor5: #5d36ff;--sapAccentColor6: #0057d2;--sapAccentColor7: #046c7a;--sapAccentColor8: #256f3a;--sapAccentColor9: #6c32a9;--sapAccentColor10: #5b738b;--sapAccentBackgroundColor1: #fff3b8;--sapAccentBackgroundColor2: #ffd0e7;--sapAccentBackgroundColor3: #ffdbe7;--sapAccentBackgroundColor4: #ffdcf3;--sapAccentBackgroundColor5: #ded3ff;--sapAccentBackgroundColor6: #d1efff;--sapAccentBackgroundColor7: #c2fcee;--sapAccentBackgroundColor8: #ebf5cb;--sapAccentBackgroundColor9: #ddccf0;--sapAccentBackgroundColor10: #eaecee;--sapIndicationColor_1: #840606;--sapIndicationColor_1_Background: #840606;--sapIndicationColor_1_BorderColor: #840606;--sapIndicationColor_1_TextColor: #fff;--sapIndicationColor_1_Hover_Background: #6c0505;--sapIndicationColor_1_Active_Background: #fff;--sapIndicationColor_1_Active_BorderColor: #fb9d9d;--sapIndicationColor_1_Active_TextColor: #840606;--sapIndicationColor_1_Selected_Background: #fff;--sapIndicationColor_1_Selected_BorderColor: #fb9d9d;--sapIndicationColor_1_Selected_TextColor: #840606;--sapIndicationColor_1b: #fb9d9d;--sapIndicationColor_1b_BorderColor: #fb9d9d;--sapIndicationColor_1b_Hover_Background: #fa8585;--sapIndicationColor_2: #aa0808;--sapIndicationColor_2_Background: #aa0808;--sapIndicationColor_2_BorderColor: #aa0808;--sapIndicationColor_2_TextColor: #fff;--sapIndicationColor_2_Hover_Background: #920707;--sapIndicationColor_2_Active_Background: #fff;--sapIndicationColor_2_Active_BorderColor: #fcc4c4;--sapIndicationColor_2_Active_TextColor: #aa0808;--sapIndicationColor_2_Selected_Background: #fff;--sapIndicationColor_2_Selected_BorderColor: #fcc4c4;--sapIndicationColor_2_Selected_TextColor: #aa0808;--sapIndicationColor_2b: #fcc4c4;--sapIndicationColor_2b_BorderColor: #fcc4c4;--sapIndicationColor_2b_Hover_Background: #fbacac;--sapIndicationColor_3: #b95100;--sapIndicationColor_3_Background: #e76500;--sapIndicationColor_3_BorderColor: #e76500;--sapIndicationColor_3_TextColor: #fff;--sapIndicationColor_3_Hover_Background: #d85e00;--sapIndicationColor_3_Active_Background: #fff;--sapIndicationColor_3_Active_BorderColor: #fff2c0;--sapIndicationColor_3_Active_TextColor: #b95100;--sapIndicationColor_3_Selected_Background: #fff;--sapIndicationColor_3_Selected_BorderColor: #fff2c0;--sapIndicationColor_3_Selected_TextColor: #b95100;--sapIndicationColor_3b: #fff2c0;--sapIndicationColor_3b_BorderColor: #fff2c0;--sapIndicationColor_3b_Hover_Background: #ffeda6;--sapIndicationColor_4: #256f3a;--sapIndicationColor_4_Background: #256f3a;--sapIndicationColor_4_BorderColor: #256f3a;--sapIndicationColor_4_TextColor: #fff;--sapIndicationColor_4_Hover_Background: #1f5c30;--sapIndicationColor_4_Active_Background: #fff;--sapIndicationColor_4_Active_BorderColor: #bae8bc;--sapIndicationColor_4_Active_TextColor: #256f3a;--sapIndicationColor_4_Selected_Background: #fff;--sapIndicationColor_4_Selected_BorderColor: #bae8bc;--sapIndicationColor_4_Selected_TextColor: #256f3a;--sapIndicationColor_4b: #bae8bc;--sapIndicationColor_4b_BorderColor: #bae8bc;--sapIndicationColor_4b_Hover_Background: #a7e2a9;--sapIndicationColor_5: #0070f2;--sapIndicationColor_5_Background: #0070f2;--sapIndicationColor_5_BorderColor: #0070f2;--sapIndicationColor_5_TextColor: #fff;--sapIndicationColor_5_Hover_Background: #0064d9;--sapIndicationColor_5_Active_Background: #fff;--sapIndicationColor_5_Active_BorderColor: #d3effd;--sapIndicationColor_5_Active_TextColor: #0070f2;--sapIndicationColor_5_Selected_Background: #fff;--sapIndicationColor_5_Selected_BorderColor: #d3effd;--sapIndicationColor_5_Selected_TextColor: #0070f2;--sapIndicationColor_5b: #d3effd;--sapIndicationColor_5b_BorderColor: #d3effd;--sapIndicationColor_5b_Hover_Background: #bbe6fc;--sapIndicationColor_6: #046c7a;--sapIndicationColor_6_Background: #046c7a;--sapIndicationColor_6_BorderColor: #046c7a;--sapIndicationColor_6_TextColor: #fff;--sapIndicationColor_6_Hover_Background: #035661;--sapIndicationColor_6_Active_Background: #fff;--sapIndicationColor_6_Active_BorderColor: #cdf5ec;--sapIndicationColor_6_Active_TextColor: #046c7a;--sapIndicationColor_6_Selected_Background: #fff;--sapIndicationColor_6_Selected_BorderColor: #cdf5ec;--sapIndicationColor_6_Selected_TextColor: #046c7a;--sapIndicationColor_6b: #cdf5ec;--sapIndicationColor_6b_BorderColor: #cdf5ec;--sapIndicationColor_6b_Hover_Background: #b8f1e4;--sapIndicationColor_7: #5d36ff;--sapIndicationColor_7_Background: #5d36ff;--sapIndicationColor_7_BorderColor: #5d36ff;--sapIndicationColor_7_TextColor: #fff;--sapIndicationColor_7_Hover_Background: #481cff;--sapIndicationColor_7_Active_Background: #fff;--sapIndicationColor_7_Active_BorderColor: #e2dbff;--sapIndicationColor_7_Active_TextColor: #5d36ff;--sapIndicationColor_7_Selected_Background: #fff;--sapIndicationColor_7_Selected_BorderColor: #e2dbff;--sapIndicationColor_7_Selected_TextColor: #5d36ff;--sapIndicationColor_7b: #e2dbff;--sapIndicationColor_7b_BorderColor: #e2dbff;--sapIndicationColor_7b_Hover_Background: #cdc2ff;--sapIndicationColor_8: #a100c2;--sapIndicationColor_8_Background: #a100c2;--sapIndicationColor_8_BorderColor: #a100c2;--sapIndicationColor_8_TextColor: #fff;--sapIndicationColor_8_Hover_Background: #8c00a9;--sapIndicationColor_8_Active_Background: #fff;--sapIndicationColor_8_Active_BorderColor: #f8d6ff;--sapIndicationColor_8_Active_TextColor: #a100c2;--sapIndicationColor_8_Selected_Background: #fff;--sapIndicationColor_8_Selected_BorderColor: #f8d6ff;--sapIndicationColor_8_Selected_TextColor: #a100c2;--sapIndicationColor_8b: #f8d6ff;--sapIndicationColor_8b_BorderColor: #f8d6ff;--sapIndicationColor_8b_Hover_Background: #f4bdff;--sapIndicationColor_9: #1d2d3e;--sapIndicationColor_9_Background: #1d2d3e;--sapIndicationColor_9_BorderColor: #1d2d3e;--sapIndicationColor_9_TextColor: #fff;--sapIndicationColor_9_Hover_Background: #15202d;--sapIndicationColor_9_Active_Background: #fff;--sapIndicationColor_9_Active_BorderColor: #d9d9d9;--sapIndicationColor_9_Active_TextColor: #1d2d3e;--sapIndicationColor_9_Selected_Background: #fff;--sapIndicationColor_9_Selected_BorderColor: #d9d9d9;--sapIndicationColor_9_Selected_TextColor: #1d2d3e;--sapIndicationColor_9b: #fff;--sapIndicationColor_9b_BorderColor: #d9d9d9;--sapIndicationColor_9b_Hover_Background: #f2f2f2;--sapIndicationColor_10: #45484a;--sapIndicationColor_10_Background: #83888b;--sapIndicationColor_10_BorderColor: #83888b;--sapIndicationColor_10_TextColor: #fff;--sapIndicationColor_10_Hover_Background: #767b7e;--sapIndicationColor_10_Active_Background: #fff;--sapIndicationColor_10_Active_BorderColor: #eaecee;--sapIndicationColor_10_Active_TextColor: #45484a;--sapIndicationColor_10_Selected_Background: #fff;--sapIndicationColor_10_Selected_BorderColor: #eaecee;--sapIndicationColor_10_Selected_TextColor: #45484a;--sapIndicationColor_10b: #eaecee;--sapIndicationColor_10b_BorderColor: #eaecee;--sapIndicationColor_10b_Hover_Background: #dcdfe3;--sapLegend_WorkingBackground: #fff;--sapLegend_NonWorkingBackground: #ebebeb;--sapLegend_CurrentDateTime: #a100c2;--sapLegendColor1: #c35500;--sapLegendColor2: #d23a0a;--sapLegendColor3: #df1278;--sapLegendColor4: #840606;--sapLegendColor5: #cc00dc;--sapLegendColor6: #0057d2;--sapLegendColor7: #07838f;--sapLegendColor8: #188918;--sapLegendColor9: #5b738b;--sapLegendColor10: #7800a4;--sapLegendColor11: #a93e00;--sapLegendColor12: #aa2608;--sapLegendColor13: #ba066c;--sapLegendColor14: #8d2a00;--sapLegendColor15: #4e247a;--sapLegendColor16: #002a86;--sapLegendColor17: #035663;--sapLegendColor18: #1e592f;--sapLegendColor19: #1a4796;--sapLegendColor20: #470ced;--sapLegendBackgroundColor1: #ffef9f;--sapLegendBackgroundColor2: #feeae1;--sapLegendBackgroundColor3: #fbf6f8;--sapLegendBackgroundColor4: #fbebeb;--sapLegendBackgroundColor5: #ffe5fe;--sapLegendBackgroundColor6: #d1efff;--sapLegendBackgroundColor7: #c2fcee;--sapLegendBackgroundColor8: #f5fae5;--sapLegendBackgroundColor9: #f5f6f7;--sapLegendBackgroundColor10: #fff0fa;--sapLegendBackgroundColor11: #fff8d6;--sapLegendBackgroundColor12: #fff6f6;--sapLegendBackgroundColor13: #f7ebef;--sapLegendBackgroundColor14: #f1ecd5;--sapLegendBackgroundColor15: #f0e7f8;--sapLegendBackgroundColor16: #ebf8ff;--sapLegendBackgroundColor17: #dafdf5;--sapLegendBackgroundColor18: #ebf5cb;--sapLegendBackgroundColor19: #fafdff;--sapLegendBackgroundColor20: #eceeff;--sapChart_OrderedColor_1: #0070f2;--sapChart_OrderedColor_2: #c87b00;--sapChart_OrderedColor_3: #75980b;--sapChart_OrderedColor_4: #df1278;--sapChart_OrderedColor_5: #8b47d7;--sapChart_OrderedColor_6: #049f9a;--sapChart_OrderedColor_7: #3c8cdd;--sapChart_OrderedColor_8: #cc00dc;--sapChart_OrderedColor_9: #798c77;--sapChart_OrderedColor_10: #da6c6c;--sapChart_OrderedColor_11: #5d36ff;--sapChart_Bad: #f53232;--sapChart_Critical: #e76500;--sapChart_Good: #30914c;--sapChart_Neutral: #788fa6;--sapChart_Sequence_1: #0070f2;--sapChart_Sequence_2: #c87b00;--sapChart_Sequence_3: #75980b;--sapChart_Sequence_4: #df1278;--sapChart_Sequence_5: #8b47d7;--sapChart_Sequence_6: #049f9a;--sapChart_Sequence_7: #3c8cdd;--sapChart_Sequence_8: #cc00dc;--sapChart_Sequence_9: #798c77;--sapChart_Sequence_10: #da6c6c;--sapChart_Sequence_11: #5d36ff;--sapChart_Sequence_Neutral: #788fa6;}
` };
const styleData$2 = { packageName: "@ui5/webcomponents", fileName: "themes/sap_horizon/parameters-bundle.css.ts", content: `:root{--ui5-v1-21-2-avatar-hover-box-shadow-offset: 0px 0px 0px .0625rem;--ui5-v1-21-2-avatar-initials-color: var(--sapContent_ImagePlaceholderForegroundColor);--ui5-v1-21-2-avatar-border-radius-img-deduction: .0625rem;--_ui5-v1-21-2_avatar_outline: var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5-v1-21-2_avatar_focus_width: 1px;--_ui5-v1-21-2_avatar_focus_color: var(--sapContent_FocusColor);--_ui5-v1-21-2_avatar_focus_offset: .125rem;--ui5-v1-21-2-avatar-initials-border: .0625rem solid var(--sapAvatar_1_BorderColor);--ui5-v1-21-2-avatar-border-radius: var(--sapElement_BorderCornerRadius);--_ui5-v1-21-2_avatar_fontsize_XS: 1rem;--_ui5-v1-21-2_avatar_fontsize_S: 1.125rem;--_ui5-v1-21-2_avatar_fontsize_M: 1.5rem;--_ui5-v1-21-2_avatar_fontsize_L: 2.25rem;--_ui5-v1-21-2_avatar_fontsize_XL: 3rem;--ui5-v1-21-2-avatar-accent1: var(--sapAvatar_1_Background);--ui5-v1-21-2-avatar-accent2: var(--sapAvatar_2_Background);--ui5-v1-21-2-avatar-accent3: var(--sapAvatar_3_Background);--ui5-v1-21-2-avatar-accent4: var(--sapAvatar_4_Background);--ui5-v1-21-2-avatar-accent5: var(--sapAvatar_5_Background);--ui5-v1-21-2-avatar-accent6: var(--sapAvatar_6_Background);--ui5-v1-21-2-avatar-accent7: var(--sapAvatar_7_Background);--ui5-v1-21-2-avatar-accent8: var(--sapAvatar_8_Background);--ui5-v1-21-2-avatar-accent9: var(--sapAvatar_9_Background);--ui5-v1-21-2-avatar-accent10: var(--sapAvatar_10_Background);--ui5-v1-21-2-avatar-placeholder: var(--sapContent_ImagePlaceholderBackground);--ui5-v1-21-2-avatar-accent1-color: var(--sapAvatar_1_TextColor);--ui5-v1-21-2-avatar-accent2-color: var(--sapAvatar_2_TextColor);--ui5-v1-21-2-avatar-accent3-color: var(--sapAvatar_3_TextColor);--ui5-v1-21-2-avatar-accent4-color: var(--sapAvatar_4_TextColor);--ui5-v1-21-2-avatar-accent5-color: var(--sapAvatar_5_TextColor);--ui5-v1-21-2-avatar-accent6-color: var(--sapAvatar_6_TextColor);--ui5-v1-21-2-avatar-accent7-color: var(--sapAvatar_7_TextColor);--ui5-v1-21-2-avatar-accent8-color: var(--sapAvatar_8_TextColor);--ui5-v1-21-2-avatar-accent9-color: var(--sapAvatar_9_TextColor);--ui5-v1-21-2-avatar-accent10-color: var(--sapAvatar_10_TextColor);--ui5-v1-21-2-avatar-placeholder-color: var(--sapContent_ImagePlaceholderForegroundColor);--ui5-v1-21-2-avatar-accent1-border-color: var(--sapAvatar_1_BorderColor);--ui5-v1-21-2-avatar-accent2-border-color: var(--sapAvatar_2_BorderColor);--ui5-v1-21-2-avatar-accent3-border-color: var(--sapAvatar_3_BorderColor);--ui5-v1-21-2-avatar-accent4-border-color: var(--sapAvatar_4_BorderColor);--ui5-v1-21-2-avatar-accent5-border-color: var(--sapAvatar_5_BorderColor);--ui5-v1-21-2-avatar-accent6-border-color: var(--sapAvatar_6_BorderColor);--ui5-v1-21-2-avatar-accent7-border-color: var(--sapAvatar_7_BorderColor);--ui5-v1-21-2-avatar-accent8-border-color: var(--sapAvatar_8_BorderColor);--ui5-v1-21-2-avatar-accent9-border-color: var(--sapAvatar_9_BorderColor);--ui5-v1-21-2-avatar-accent10-border-color: var(--sapAvatar_10_BorderColor);--ui5-v1-21-2-avatar-placeholder-border-color: var(--sapContent_ImagePlaceholderBackground);--_ui5-v1-21-2_avatar_icon_XS: var(--_ui5-v1-21-2_avatar_fontsize_XS);--_ui5-v1-21-2_avatar_icon_S: var(--_ui5-v1-21-2_avatar_fontsize_S);--_ui5-v1-21-2_avatar_icon_M: var(--_ui5-v1-21-2_avatar_fontsize_M);--_ui5-v1-21-2_avatar_icon_L: var(--_ui5-v1-21-2_avatar_fontsize_L);--_ui5-v1-21-2_avatar_icon_XL: var(--_ui5-v1-21-2_avatar_fontsize_XL);--_ui5-v1-21-2_avatar_group_button_focus_border: none;--_ui5-v1-21-2_avatar_group_focus_border_radius: .375rem;--ui5-v1-21-2-badge-color-scheme-1-border: var(--sapAccentColor1);--ui5-v1-21-2-badge-color-scheme-2-border: var(--sapAccentColor2);--ui5-v1-21-2-badge-color-scheme-3-border: var(--sapAccentColor3);--ui5-v1-21-2-badge-color-scheme-4-border: var(--sapAccentColor4);--ui5-v1-21-2-badge-color-scheme-5-border: var(--sapAccentColor5);--ui5-v1-21-2-badge-color-scheme-6-border: var(--sapAccentColor6);--ui5-v1-21-2-badge-color-scheme-7-border: var(--sapAccentColor7);--ui5-v1-21-2-badge-color-scheme-8-border: var(--sapLegendColor18);--ui5-v1-21-2-badge-color-scheme-9-border: var(--sapAccentColor10);--ui5-v1-21-2-badge-color-scheme-10-border: var(--sapAccentColor9);--_ui5-v1-21-2-badge-height: 1.375rem;--_ui5-v1-21-2-badge-border: none;--_ui5-v1-21-2-badge-border-radius: .25rem;--_ui5-v1-21-2-badge-padding-inline: .375em;--_ui5-v1-21-2-badge-padding-inline-icon-only: var(--_ui5-v1-21-2-badge-padding-inline);--_ui5-v1-21-2-badge-text-transform: none;--_ui5-v1-21-2-badge-icon-gap: .25rem;--_ui5-v1-21-2-badge-font-size: var(--sapFontSize);--_ui5-v1-21-2-badge-font: "72override", var(--sapFontSemiboldDuplexFamily);--_ui5-v1-21-2-badge-font-weight: normal;--_ui5-v1-21-2-badge-default-border-color: transparent;--_ui5-v1-21-2-badge-default-background: var(--ui5-v1-21-2-badge-color-scheme-1-background);--_ui5-v1-21-2-badge-default-color: var(--ui5-v1-21-2-badge-color-scheme-1-color);--_ui5-v1-21-2-badge-letter-spacing: normal;--ui5-v1-21-2-badge-color-scheme-1-background: var(--sapAvatar_1_Background);--ui5-v1-21-2-badge-color-scheme-1-color: var(--sapAvatar_1_TextColor);--ui5-v1-21-2-badge-color-scheme-2-background: var(--sapAvatar_2_Background);--ui5-v1-21-2-badge-color-scheme-2-color: var(--sapAvatar_2_TextColor);--ui5-v1-21-2-badge-color-scheme-3-background: var(--sapAvatar_3_Background);--ui5-v1-21-2-badge-color-scheme-3-color: var(--sapAvatar_3_TextColor);--ui5-v1-21-2-badge-color-scheme-4-background: var(--sapAvatar_4_Background);--ui5-v1-21-2-badge-color-scheme-4-color: var(--sapAvatar_4_TextColor);--ui5-v1-21-2-badge-color-scheme-5-background: var(--sapAvatar_5_Background);--ui5-v1-21-2-badge-color-scheme-5-color: var(--sapAvatar_5_TextColor);--ui5-v1-21-2-badge-color-scheme-6-background: var(--sapAvatar_6_Background);--ui5-v1-21-2-badge-color-scheme-6-color: var(--sapAvatar_6_TextColor);--ui5-v1-21-2-badge-color-scheme-7-background: var(--sapAvatar_7_Background);--ui5-v1-21-2-badge-color-scheme-7-color: var(--sapAvatar_7_TextColor);--ui5-v1-21-2-badge-color-scheme-8-background: var(--sapAvatar_8_Background);--ui5-v1-21-2-badge-color-scheme-8-color: var(--sapAvatar_8_TextColor);--ui5-v1-21-2-badge-color-scheme-9-background: var(--sapAvatar_9_Background);--ui5-v1-21-2-badge-color-scheme-9-color: var(--sapAvatar_9_TextColor);--ui5-v1-21-2-badge-color-scheme-10-background: var(--sapAvatar_10_Background);--ui5-v1-21-2-badge-color-scheme-10-color: var(--sapAvatar_10_TextColor);--_ui5-v1-21-2_breadcrumbs_current_location_focus_border_radius: .25rem;--browser_scrollbar_border_radius: var(--sapElement_BorderCornerRadius);--browser_scrollbar_border: none;--_ui5-v1-21-2_busy_indicator_color: var(--sapContent_BusyColor);--_ui5-v1-21-2_busy_indicator_focus_border_radius: .75rem;--_ui5-v1-21-2_busy_indicator_focus_outline: var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5-v1-21-2_button_base_min_compact_width: 2rem;--_ui5-v1-21-2_button_base_height: var(--sapElement_Height);--_ui5-v1-21-2_button_compact_height: 1.625rem;--_ui5-v1-21-2_button_border_radius: var(--sapButton_BorderCornerRadius);--_ui5-v1-21-2_button_compact_padding: .4375rem;--_ui5-v1-21-2_button_emphasized_outline: 1px dotted var(--sapContent_FocusColor);--_ui5-v1-21-2_button_focus_offset: 1px;--_ui5-v1-21-2_button_focus_width: 1px;--_ui5-v1-21-2_button_emphasized_focused_border_before: none;--_ui5-v1-21-2_button_emphasized_focused_active_border_color: transparent;--_ui5-v1-21-2_button_focused_border: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-21-2_button_focused_border_radius: .375rem;--_ui5-v1-21-2_button_focused_inner_border_radius: .375rem;--_ui5-v1-21-2_button_base_min_width: 2.25rem;--_ui5-v1-21-2_button_base_padding: .5625rem;--_ui5-v1-21-2_button_base_icon_only_padding: .5625rem;--_ui5-v1-21-2_button_base_icon_margin: .375rem;--_ui5-v1-21-2_button_icon_font_size: 1rem;--_ui5-v1-21-2_button_text_shadow: none;--_ui5-v1-21-2_button_emphasized_border_width: .0625rem;--_ui5-v1-21-2_button_pressed_focused_border_color: var(--sapContent_FocusColor);--_ui5-v1-21-2_button_fontFamily: var(--sapFontSemiboldDuplexFamily);--_ui5-v1-21-2_button_emphasized_focused_border_color: var(--sapContent_ContrastFocusColor);--_ui5-v1-21-2_card_box_shadow: var(--sapContent_Shadow0);--_ui5-v1-21-2_card_header_border_color: var(--sapTile_SeparatorColor);--_ui5-v1-21-2_card_header_focus_border: var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5-v1-21-2_card_header_focus_bottom_radius: 0px;--_ui5-v1-21-2_card_header_title_font_weight: normal;--_ui5-v1-21-2_card_header_subtitle_margin_top: .25rem;--_ui5-v1-21-2_card_hover_box_shadow: var(--sapContent_Shadow2);--_ui5-v1-21-2_card_header_focus_offset: 0px;--_ui5-v1-21-2_card_header_focus_radius: var(--_ui5-v1-21-2_card_border-radius);--_ui5-v1-21-2_card_header_title_font_family: var(--sapFontHeaderFamily);--_ui5-v1-21-2_card_header_title_font_size: var(--sapFontHeader6Size);--_ui5-v1-21-2_card_header_hover_bg: var(--sapTile_Hover_Background);--_ui5-v1-21-2_card_header_active_bg: var(--sapTile_Active_Background);--_ui5-v1-21-2_card_header_border: none;--_ui5-v1-21-2_card_border-radius: var(--sapTile_BorderCornerRadius);--_ui5-v1-21-2_card_header_padding: 1rem 1rem .75rem 1rem;--_ui5-v1-21-2_card_border: none;--ui5-v1-21-2_carousel_background_color_solid: var(--sapGroup_ContentBackground);--ui5-v1-21-2_carousel_background_color_translucent: var(--sapBackgroundColor);--ui5-v1-21-2_carousel_button_size: 2.5rem;--ui5-v1-21-2_carousel_inactive_dot_size: .25rem;--ui5-v1-21-2_carousel_inactive_dot_margin: 0 .375rem;--ui5-v1-21-2_carousel_inactive_dot_border: 1px solid var(--sapContent_ForegroundBorderColor);--ui5-v1-21-2_carousel_inactive_dot_background: var(--sapContent_ForegroundBorderColor);--ui5-v1-21-2_carousel_active_dot_border: 1px solid var(--sapContent_Selected_ForegroundColor);--ui5-v1-21-2_carousel_active_dot_background: var(--sapContent_Selected_ForegroundColor);--ui5-v1-21-2_carousel_navigation_button_active_box_shadow: none;--_ui5-v1-21-2_checkbox_box_shadow: none;--_ui5-v1-21-2_checkbox_transition: unset;--_ui5-v1-21-2_checkbox_focus_border: none;--_ui5-v1-21-2_checkbox_border_radius: 0;--_ui5-v1-21-2_checkbox_focus_outline: var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5-v1-21-2_checkbox_outer_hover_background: transparent;--_ui5-v1-21-2_checkbox_inner_width_height: 1.375rem;--_ui5-v1-21-2_checkbox_inner_disabled_border_color: var(--sapField_BorderColor);--_ui5-v1-21-2_checkbox_inner_information_box_shadow: none;--_ui5-v1-21-2_checkbox_inner_warning_box_shadow: none;--_ui5-v1-21-2_checkbox_inner_error_box_shadow: none;--_ui5-v1-21-2_checkbox_inner_success_box_shadow: none;--_ui5-v1-21-2_checkbox_inner_default_box_shadow: none;--_ui5-v1-21-2_checkbox_inner_background: var(--sapField_Background);--_ui5-v1-21-2_checkbox_wrapped_focus_padding: .375rem;--_ui5-v1-21-2_checkbox_wrapped_content_margin_top: .125rem;--_ui5-v1-21-2_checkbox_compact_wrapper_padding: .5rem;--_ui5-v1-21-2_checkbox_compact_width_height: 2rem;--_ui5-v1-21-2_checkbox_compact_inner_size: 1rem;--_ui5-v1-21-2_checkbox_compact_focus_position: .375rem;--_ui5-v1-21-2_checkbox_compact_wrapped_label_margin_top: -1px;--_ui5-v1-21-2_checkbox_label_offset: var(--_ui5-v1-21-2_checkbox_wrapper_padding);--_ui5-v1-21-2_checkbox_disabled_label_color: var(--sapContent_LabelColor);--_ui5-v1-21-2_checkbox_default_focus_border: none;--_ui5-v1-21-2_checkbox_focus_outline_display: block;--_ui5-v1-21-2_checkbox_wrapper_padding: .6875rem;--_ui5-v1-21-2_checkbox_width_height: 2.75rem;--_ui5-v1-21-2_checkbox_label_color: var(--sapField_TextColor);--_ui5-v1-21-2_checkbox_inner_border: solid var(--sapField_BorderWidth) var(--sapField_BorderColor);--_ui5-v1-21-2_checkbox_inner_border_radius: var(--sapField_BorderCornerRadius);--_ui5-v1-21-2_checkbox_checkmark_color: var(--sapContent_Selected_ForegroundColor);--_ui5-v1-21-2_checkbox_hover_background: var(--sapContent_Selected_Hover_Background);--_ui5-v1-21-2_checkbox_inner_hover_border_color: var(--sapField_Hover_BorderColor);--_ui5-v1-21-2_checkbox_inner_hover_checked_border_color: var(--sapField_Hover_BorderColor);--_ui5-v1-21-2_checkbox_inner_selected_border_color: var(--sapField_BorderColor);--_ui5-v1-21-2_checkbox_inner_active_border_color: var(--sapField_Hover_BorderColor);--_ui5-v1-21-2_checkbox_active_background: var(--sapContent_Selected_Hover_Background);--_ui5-v1-21-2_checkbox_inner_readonly_border: var(--sapElement_BorderWidth) var(--sapField_ReadOnly_BorderColor) dashed;--_ui5-v1-21-2_checkbox_inner_error_border: var(--sapField_InvalidBorderWidth) solid var(--sapField_InvalidColor);--_ui5-v1-21-2_checkbox_inner_error_background_hover: var(--sapField_Hover_Background);--_ui5-v1-21-2_checkbox_inner_warning_border: var(--sapField_WarningBorderWidth) solid var(--sapField_WarningColor);--_ui5-v1-21-2_checkbox_inner_warning_color: var(--sapField_WarningColor);--_ui5-v1-21-2_checkbox_inner_warning_background_hover: var(--sapField_Hover_Background);--_ui5-v1-21-2_checkbox_checkmark_warning_color: var(--sapField_WarningColor);--_ui5-v1-21-2_checkbox_inner_success_border: var(--sapField_SuccessBorderWidth) solid var(--sapField_SuccessColor);--_ui5-v1-21-2_checkbox_inner_success_background_hover: var(--sapField_Hover_Background);--_ui5-v1-21-2_checkbox_inner_information_color: var(--sapField_InformationColor);--_ui5-v1-21-2_checkbox_inner_information_border: var(--sapField_InformationBorderWidth) solid var(--sapField_InformationColor);--_ui5-v1-21-2_checkbox_inner_information_background_hover: var(--sapField_Hover_Background);--_ui5-v1-21-2_checkbox_disabled_opacity: var(--sapContent_DisabledOpacity);--_ui5-v1-21-2_checkbox_focus_position: .3125rem;--_ui5-v1-21-2_checkbox_focus_border_radius: .5rem;--_ui5-v1-21-2_checkbox_right_focus_distance: var(--_ui5-v1-21-2_checkbox_focus_position);--_ui5-v1-21-2_checkbox_wrapped_focus_left_top_bottom_position: .1875rem;--_ui5-v1-21-2_color-palette-item-outer-border-radius: .25rem;--_ui5-v1-21-2_color-palette-item-inner-border-radius: .1875rem;--_ui5-v1-21-2_color-palette-item-container-sides-padding: .3125rem;--_ui5-v1-21-2_color-palette-item-container-rows-padding: .6875rem;--_ui5-v1-21-2_color-palette-item-focus-height: 1.5rem;--_ui5-v1-21-2_color-palette-item-container-padding: var(--_ui5-v1-21-2_color-palette-item-container-sides-padding) var(--_ui5-v1-21-2_color-palette-item-container-rows-padding);--_ui5-v1-21-2_color-palette-item-hover-margin: .0625rem;--_ui5-v1-21-2_color-palette-row-height: 9.5rem;--_ui5-v1-21-2_color-palette-button-height: 3rem;--_ui5-v1-21-2_color-palette-item-before-focus-color: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-21-2_color-palette-item-before-focus-offset: -.3125rem;--_ui5-v1-21-2_color-palette-item-before-focus-hover-offset: -.0625rem;--_ui5-v1-21-2_color-palette-item-after-focus-color: .0625rem solid var(--sapContent_ContrastFocusColor);--_ui5-v1-21-2_color-palette-item-after-focus-offset: -.1875rem;--_ui5-v1-21-2_color-palette-item-after-focus-hover-offset: .0625rem;--_ui5-v1-21-2_color-palette-item-before-focus-border-radius: .4375rem;--_ui5-v1-21-2_color-palette-item-after-focus-border-radius: .3125rem;--_ui5-v1-21-2_color-palette-item-hover-outer-border-radius: .4375rem;--_ui5-v1-21-2_color-palette-item-hover-inner-border-radius: .375rem;--_ui5-v1-21-2_color_picker_circle_outer_border: .0625rem solid var(--sapContent_ContrastShadowColor);--_ui5-v1-21-2_color_picker_circle_inner_border: .0625rem solid var(--sapField_BorderColor);--_ui5-v1-21-2_color_picker_circle_inner_circle_size: .5625rem;--_ui5-v1-21-2_color_picker_slider_handle_box_shadow: .125rem solid var(--sapField_BorderColor);--_ui5-v1-21-2_color_picker_slider_handle_border: .125rem solid var(--sapField_BorderColor);--_ui5-v1-21-2_color_picker_slider_handle_outline_hover: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-21-2_color_picker_slider_handle_outline_focus: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-21-2_color_picker_slider_handle_margin_top: -.1875rem;--_ui5-v1-21-2_color_picker_slider_handle_focus_margin_top: var(--_ui5-v1-21-2_color_picker_slider_handle_margin_top);--_ui5-v1-21-2_color_picker_slider_container_margin_top: -11px;--_ui5-v1-21-2_color_picker_slider_handle_inline_focus: 1px solid var(--sapContent_ContrastFocusColor);--_ui5-v1-21-2_datepicker_icon_border: none;--_ui5-v1-21-2-datepicker-hover-background: var(--sapField_Hover_Background);--_ui5-v1-21-2-datepicker_border_radius: .25rem;--_ui5-v1-21-2-datepicker_icon_border_radius: .125rem;--_ui5-v1-21-2_daypicker_item_box_shadow: inset 0 0 0 .0625rem var(--sapContent_Selected_ForegroundColor);--_ui5-v1-21-2_daypicker_item_margin: 2px;--_ui5-v1-21-2_daypicker_item_border: none;--_ui5-v1-21-2_daypicker_item_selected_border_color: var(--sapList_Background);--_ui5-v1-21-2_daypicker_daynames_container_height: 2rem;--_ui5-v1-21-2_daypicker_weeknumbers_container_padding_top: 2rem;--_ui5-v1-21-2_daypicker_item_othermonth_background_color: var(--sapList_Background);--_ui5-v1-21-2_daypicker_item_othermonth_color: var(--sapContent_LabelColor);--_ui5-v1-21-2_daypicker_item_othermonth_hover_color: var(--sapContent_LabelColor);--_ui5-v1-21-2_daypicker_item_now_inner_border_radius: 0;--_ui5-v1-21-2_daypicker_item_outline_width: 1px;--_ui5-v1-21-2_daypicker_item_outline_offset: 1px;--_ui5-v1-21-2_daypicker_item_now_focus_after_width: calc(100% - .25rem) ;--_ui5-v1-21-2_daypicker_item_now_focus_after_height: calc(100% - .25rem) ;--_ui5-v1-21-2_daypicker_item_now_selected_focus_after_width: calc(100% - .375rem) ;--_ui5-v1-21-2_daypicker_item_now_selected_focus_after_height: calc(100% - .375rem) ;--_ui5-v1-21-2_daypicker_item_selected_background: transparent;--_ui5-v1-21-2_daypicker_item_outline_focus_after: none;--_ui5-v1-21-2_daypicker_item_border_focus_after: var(--_ui5-v1-21-2_daypicker_item_outline_width) dotted var(--sapContent_FocusColor);--_ui5-v1-21-2_daypicker_item_width_focus_after: calc(100% - .25rem) ;--_ui5-v1-21-2_daypicker_item_height_focus_after: calc(100% - .25rem) ;--_ui5-v1-21-2_daypicker_item_now_outline: none;--_ui5-v1-21-2_daypicker_item_now_outline_offset: none;--_ui5-v1-21-2_daypicker_item_now_outline_offset_focus_after: var(--_ui5-v1-21-2_daypicker_item_now_outline_offset);--_ui5-v1-21-2_daypicker_item_now_not_selected_inset: 0;--_ui5-v1-21-2_daypicker_item_now_border_color: var(--sapLegend_CurrentDateTime);--_ui5-v1-21-2_daypicker_two_calendar_item_now_inset: .1875rem;--_ui5-v1-21-2_dp_two_calendar_item_secondary_text_border_radios: .25rem;--_ui5-v1-21-2_daypicker_item_border_radius: .5rem;--_ui5-v1-21-2_daypicker_item_focus_border: .0625rem dotted var(--sapContent_FocusColor);--_ui5-v1-21-2_daypicker_item_selected_border: .0625rem solid var(--sapList_SelectionBorderColor);--_ui5-v1-21-2_daypicker_item_not_selected_focus_border: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-21-2_daypicker_item_selected_focus_color: var(--sapContent_FocusColor);--_ui5-v1-21-2_daypicker_item_selected_focus_width: .125rem;--_ui5-v1-21-2_daypicker_item_no_selected_inset: .375rem;--_ui5-v1-21-2_daypicker_item_now_border_focus_after: .125rem solid var(--sapList_SelectionBorderColor);--_ui5-v1-21-2_daypicker_item_now_border_radius_focus_after: .3125rem;--_ui5-v1-21-2_day_picker_item_selected_now_border_focus: .1875rem solid var(--sapList_SelectionBorderColor);--_ui5-v1-21-2_day_picker_item_selected_now_border_radius_focus: .1875rem;--ui5-v1-21-2-dp-item_withsecondtype_border: .375rem;--_ui5-v1-21-2_daypicker_item_now_border: .125rem solid var(--sapLegend_CurrentDateTime);--_ui5-v1-21-2_daypicker_dayname_color: var(--sapContent_LabelColor);--_ui5-v1-21-2_daypicker_weekname_color: var(--sapContent_LabelColor);--_ui5-v1-21-2_daypicker_item_selected_box_shadow: inset 0 0 0 .0625rem var(--sapContent_Selected_ForegroundColor);--_ui5-v1-21-2_daypicker_item_selected_daytext_hover_background: transparent;--_ui5-v1-21-2_daypicker_item_border_radius_item: .5rem;--_ui5-v1-21-2_daypicker_item_border_radius_focus_after: .1875rem;--_ui5-v1-21-2_daypicker_item_selected_between_border: .5rem;--_ui5-v1-21-2_daypicker_item_selected_between_background: var(--sapList_SelectionBackgroundColor);--_ui5-v1-21-2_daypicker_item_selected_between_text_background: transparent;--_ui5-v1-21-2_daypicker_item_selected_between_text_font: var(--sapFontFamily);--_ui5-v1-21-2_daypicker_item_selected_text_font: var(--sapFontBoldFamily);--_ui5-v1-21-2_daypicker_item_selected_between_hover_background: var(--sapList_Hover_SelectionBackground);--_ui5-v1-21-2_daypicker_item_now_box_shadow: inset 0 0 0 .35rem var(--sapList_Background);--_ui5-v1-21-2_daypicker_item_selected_text_outline: .0625rem solid var(--sapSelectedColor);--_ui5-v1-21-2_daypicker_item_now_selected_outline_offset: -.25rem;--_ui5-v1-21-2_daypicker_item_now_selected_between_inset: .25rem;--_ui5-v1-21-2_daypicker_item_now_selected_between_border: .0625rem solid var(--sapContent_Selected_ForegroundColor);--_ui5-v1-21-2_daypicker_item_now_selected_between_border_radius: .1875rem;--_ui5-v1-21-2_daypicker_item_select_between_border: 1px solid var(--sapContent_Selected_ForegroundColor);--_ui5-v1-21-2_daypicker_item_weeekend_filter: brightness(105%);--_ui5-v1-21-2_daypicker_item_selected_hover: var(--sapList_Hover_Background);--_ui5-v1-21-2_daypicker_item_now_inset: .375rem;--_ui5-v1-21-2-dp-item_withsecondtype_border: .25rem;--_ui5-v1-21-2_daypicker_item_selected__secondary_type_text_outline: .125rem solid var(--sapSelectedColor);--_ui5-v1-21-2_daypicker_two_calendar_item_now_day_text_content: "";--_ui5-v1-21-2_daypicker_two_calendar_item_now_selected_border_width: .1875rem;--_ui5-v1-21-2_daypicker_two_calendar_item_border_radius: .5rem;--_ui5-v1-21-2_daypicker_two_calendar_item_border_focus_border_radius: .5rem;--_ui5-v1-21-2_daypicker_two_calendar_item_no_selected_inset: 0;--_ui5-v1-21-2_daypicker_two_calendar_item_selected_now_border_radius_focus: .3125rem;--_ui5-v1-21-2_daypicker_two_calendar_item_no_selected_focus_inset: .1875rem;--_ui5-v1-21-2_daypicker_two_calendar_item_no_select_focus_border_radius: .3125rem;--_ui5-v1-21-2_daypicker_two_calendar_item_now_selected_border_inset: 0;--_ui5-v1-21-2_dialog_resize_handle_color: var(--sapButton_Lite_TextColor);--_ui5-v1-21-2_dialog_header_error_state_icon_color: var(--sapNegativeElementColor);--_ui5-v1-21-2_dialog_header_information_state_icon_color: var(--sapInformativeElementColor);--_ui5-v1-21-2_dialog_header_success_state_icon_color: var(--sapPositiveElementColor);--_ui5-v1-21-2_dialog_header_warning_state_icon_color: var(--sapCriticalElementColor);--_ui5-v1-21-2_dialog_header_state_line_height: .0625rem;--_ui5-v1-21-2_dialog_header_focus_bottom_offset: 2px;--_ui5-v1-21-2_dialog_header_focus_top_offset: 1px;--_ui5-v1-21-2_dialog_header_focus_left_offset: 1px;--_ui5-v1-21-2_dialog_header_focus_right_offset: 1px;--_ui5-v1-21-2_dialog_resize_handle_right: 0;--_ui5-v1-21-2_dialog_resize_handle_bottom: 3px;--_ui5-v1-21-2_dialog_header_border_radius: var(--sapElement_BorderCornerRadius);--_ui5-v1-21-2_file_uploader_value_state_error_hover_background_color: var(--sapField_Hover_Background);--_ui5-v1-21-2_file_uploader_hover_border: none;--ui5-v1-21-2-group-header-listitem-background-color: var(--sapList_GroupHeaderBackground);--ui5-v1-21-2-icon-focus-border-radius: .25rem;--_ui5-v1-21-2_input_width: 13.125rem;--_ui5-v1-21-2_input_min_width: 2.75rem;--_ui5-v1-21-2_input_height: var(--sapElement_Height);--_ui5-v1-21-2_input_compact_height: 1.625rem;--_ui5-v1-21-2_input_value_state_error_hover_background: var(--sapField_Hover_Background);--_ui5-v1-21-2_input_background_color: var(--sapField_Background);--_ui5-v1-21-2_input_border_radius: var(--sapField_BorderCornerRadius);--_ui5-v1-21-2_input_placeholder_style: italic;--_ui5-v1-21-2_input_placeholder_color: var(--sapField_PlaceholderTextColor);--_ui5-v1-21-2_input_bottom_border_height: 0;--_ui5-v1-21-2_input_bottom_border_color: transparent;--_ui5-v1-21-2_input_focused_border_color: var(--sapField_Hover_BorderColor);--_ui5-v1-21-2_input_state_border_width: .125rem;--_ui5-v1-21-2_input_information_border_width: .125rem;--_ui5-v1-21-2_input_error_font_weight: normal;--_ui5-v1-21-2_input_warning_font_weight: normal;--_ui5-v1-21-2_input_focus_border_width: 1px;--_ui5-v1-21-2_input_error_warning_font_style: inherit;--_ui5-v1-21-2_input_error_warning_text_indent: 0;--_ui5-v1-21-2_input_disabled_color: var(--sapContent_DisabledTextColor);--_ui5-v1-21-2_input_disabled_font_weight: normal;--_ui5-v1-21-2_input_disabled_border_color: var(--sapField_BorderColor);--_ui5-v1-21-2-input_disabled_background: var(--sapField_Background);--_ui5-v1-21-2_input_readonly_border_color: var(--sapField_ReadOnly_BorderColor);--_ui5-v1-21-2_input_readonly_background: var(--sapField_ReadOnly_Background);--_ui5-v1-21-2_input_disabled_opacity: var(--sapContent_DisabledOpacity);--_ui5-v1-21-2_input_icon_min_width: 2.25rem;--_ui5-v1-21-2_input_compact_min_width: 2rem;--_ui5-v1-21-2_input_transition: none;--_ui5-v1-21-2-input-value-state-icon-display: none;--_ui5-v1-21-2_input_value_state_error_border_color: var(--sapField_InvalidColor);--_ui5-v1-21-2_input_focused_value_state_error_border_color: var(--sapField_InvalidColor);--_ui5-v1-21-2_input_value_state_warning_border_color: var(--sapField_WarningColor);--_ui5-v1-21-2_input_focused_value_state_warning_border_color: var(--sapField_WarningColor);--_ui5-v1-21-2_input_value_state_success_border_color: var(--sapField_SuccessColor);--_ui5-v1-21-2_input_focused_value_state_success_border_color: var(--sapField_SuccessColor);--_ui5-v1-21-2_input_value_state_success_border_width: 1px;--_ui5-v1-21-2_input_value_state_information_border_color: var(--sapField_InformationColor);--_ui5-v1-21-2_input_focused_value_state_information_border_color: var(--sapField_InformationColor);--_ui5-v1-21-2-input-value-state-information-border-width: 1px;--_ui5-v1-21-2-input-background-image: none;--ui5-v1-21-2_input_focus_pseudo_element_content: "";--_ui5-v1-21-2_input_value_state_error_warning_placeholder_font_weight: normal;--_ui5-v1-21-2-input_error_placeholder_color: var(--sapField_PlaceholderTextColor);--_ui5-v1-21-2_input_icon_width: 2.25rem;--_ui5-v1-21-2-input-icons-count: 0;--_ui5-v1-21-2_input_margin_top_bottom: .1875rem;--_ui5-v1-21-2_input_tokenizer_min_width: 3.25rem;--_ui5-v1-21-2-input-border: none;--_ui5-v1-21-2_input_hover_border: none;--_ui5-v1-21-2_input_focus_border_radius: .25rem;--_ui5-v1-21-2_input_readonly_focus_border_radius: .125rem;--_ui5-v1-21-2_input_error_warning_border_style: none;--_ui5-v1-21-2_input_focused_value_state_error_background: var(--sapField_Hover_Background);--_ui5-v1-21-2_input_focused_value_state_warning_background: var(--sapField_Hover_Background);--_ui5-v1-21-2_input_focused_value_state_success_background: var(--sapField_Hover_Background);--_ui5-v1-21-2_input_focused_value_state_information_background: var(--sapField_Hover_Background);--_ui5-v1-21-2_input_focused_value_state_error_focus_outline_color: var(--sapField_InvalidColor);--_ui5-v1-21-2_input_focused_value_state_warning_focus_outline_color: var(--sapField_WarningColor);--_ui5-v1-21-2_input_focused_value_state_success_focus_outline_color: var(--sapField_SuccessColor);--_ui5-v1-21-2_input_focus_offset: 0;--_ui5-v1-21-2_input_readonly_focus_offset: .125rem;--_ui5-v1-21-2_input_information_icon_padding: .625rem .625rem .5rem .625rem;--_ui5-v1-21-2_input_information_focused_icon_padding: .625rem .625rem .5625rem .625rem;--_ui5-v1-21-2_input_error_warning_icon_padding: .625rem .625rem .5rem .625rem;--_ui5-v1-21-2_input_error_warning_focused_icon_padding: .625rem .625rem .5625rem .625rem;--_ui5-v1-21-2_input_custom_icon_padding: .625rem .625rem .5625rem .625rem;--_ui5-v1-21-2_input_error_warning_custom_icon_padding: .625rem .625rem .5rem .625rem;--_ui5-v1-21-2_input_error_warning_custom_focused_icon_padding: .625rem .625rem .5625rem .625rem;--_ui5-v1-21-2_input_information_custom_icon_padding: .625rem .625rem .5rem .625rem;--_ui5-v1-21-2_input_information_custom_focused_icon_padding: .625rem .625rem .5625rem .625rem;--_ui5-v1-21-2_input_focus_outline_color: var(--sapField_Active_BorderColor);--_ui5-v1-21-2_input_icon_wrapper_height: calc(100% - 1px) ;--_ui5-v1-21-2_input_icon_wrapper_state_height: calc(100% - 2px) ;--_ui5-v1-21-2_input_icon_wrapper_success_state_height: calc(100% - var(--_ui5-v1-21-2_input_value_state_success_border_width));--_ui5-v1-21-2_input_icon_color: var(--sapContent_IconColor);--_ui5-v1-21-2_input_icon_pressed_bg: var(--sapButton_Selected_Background);--_ui5-v1-21-2_input_icon_padding: .625rem .625rem .5625rem .625rem;--_ui5-v1-21-2_input_icon_hover_bg: var(--sapField_Focus_Background);--_ui5-v1-21-2_input_icon_pressed_color: var(--sapButton_Active_TextColor);--_ui5-v1-21-2_input_icon_border_radius: .25rem;--_ui5-v1-21-2_input_icon_box_shadow: var(--sapField_Hover_Shadow);--_ui5-v1-21-2_input_icon_border: none;--_ui5-v1-21-2_input_error_icon_box_shadow: var(--sapContent_Negative_Shadow);--_ui5-v1-21-2_input_warning_icon_box_shadow: var(--sapContent_Critical_Shadow);--_ui5-v1-21-2_input_information_icon_box_shadow: var(--sapContent_Informative_Shadow);--_ui5-v1-21-2_input_success_icon_box_shadow: var(--sapContent_Positive_Shadow);--_ui5-v1-21-2_input_icon_error_pressed_color: var(--sapButton_Reject_Selected_TextColor);--_ui5-v1-21-2_input_icon_warning_pressed_color: var(--sapButton_Attention_Selected_TextColor);--_ui5-v1-21-2_input_icon_information_pressed_color: var(--sapButton_Selected_TextColor);--_ui5-v1-21-2_input_icon_success_pressed_color: var(--sapButton_Accept_Selected_TextColor);--_ui5-v1-21-2_link_focus_text_decoration: underline;--_ui5-v1-21-2_link_text_decoration: var(--sapLink_TextDecoration);--_ui5-v1-21-2_link_hover_text_decoration: var(--sapLink_Hover_TextDecoration);--_ui5-v1-21-2_link_focused_hover_text_decoration: none;--_ui5-v1-21-2_link_focused_hover_text_color: var(--sapContent_ContrastTextColor);--_ui5-v1-21-2_link_active_text_decoration: var(--sapLink_Active_TextDecoration);--_ui5-v1-21-2_link_border: .125rem solid transparent;--_ui5-v1-21-2_link_border_focus: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-21-2_link_focus_border-radius: .125rem;--_ui5-v1-21-2_link_focus_background_color: var(--sapContent_FocusColor);--_ui5-v1-21-2_link_focus_color: var(--sapContent_ContrastTextColor);--_ui5-v1-21-2_link_subtle_text_decoration: underline;--_ui5-v1-21-2_link_subtle_text_decoration_hover: none;--ui5-v1-21-2_list_footer_text_color: var(--sapList_FooterTextColor);--ui5-v1-21-2-listitem-background-color: var(--sapList_Background);--ui5-v1-21-2-listitem-border-bottom: var(--sapList_BorderWidth) solid var(--sapList_BorderColor);--ui5-v1-21-2-listitem-selected-border-bottom: 1px solid var(--sapList_SelectionBorderColor);--ui5-v1-21-2-listitem-focused-selected-border-bottom: 1px solid var(--sapList_SelectionBorderColor);--_ui5-v1-21-2_listitembase_focus_width: 1px;--_ui5-v1-21-2-listitembase_disabled_opacity: .5;--_ui5-v1-21-2_product_switch_item_border: none;--ui5-v1-21-2-listitem-active-border-color: var(--sapContent_FocusColor);--_ui5-v1-21-2_menu_item_padding: 0 1rem 0 .75rem;--_ui5-v1-21-2_menu_item_submenu_icon_right: 1rem;--_ui5-v1-21-2_menu_item_additional_text_start_margin: 1rem;--_ui5-v1-21-2_menu_popover_border_radius: var(--sapPopover_BorderCornerRadius);--_ui5-v1-21-2_monthpicker_item_border: none;--_ui5-v1-21-2_monthpicker_item_margin: 1px;--_ui5-v1-21-2_monthpicker_item_border_radius: .5rem;--_ui5-v1-21-2_monthpicker_item_focus_after_border: var(--_ui5-v1-21-2_button_focused_border);--_ui5-v1-21-2_monthpicker_item_focus_after_border_radius: .5rem;--_ui5-v1-21-2_monthpicker_item_focus_after_width: calc(100% - .5rem) ;--_ui5-v1-21-2_monthpicker_item_focus_after_height: calc(100% - .5rem) ;--_ui5-v1-21-2_monthpicker_item_focus_after_offset: .25rem;--_ui5-v1-21-2_monthpicker_item_selected_text_color: var(--sapContent_Selected_TextColor);--_ui5-v1-21-2_monthpicker_item_selected_background_color:var(--sapLegend_WorkingBackground);--_ui5-v1-21-2_monthpicker_item_selected_hover_color: var(--sapList_Hover_Background);--_ui5-v1-21-2_monthpicker_item_selected_box_shadow: none;--_ui5-v1-21-2_monthpicker_item_focus_after_outline: .125rem solid var(--sapSelectedColor);--_ui5-v1-21-2_monthpicker_item_selected_font_wieght: bold;--_ui5-v1-21-2_message_strip_icon_width: 2.5rem;--_ui5-v1-21-2_message_strip_button_border_width: 0;--_ui5-v1-21-2_message_strip_button_border_style: none;--_ui5-v1-21-2_message_strip_button_border_color: transparent;--_ui5-v1-21-2_message_strip_button_border_radius: 0;--_ui5-v1-21-2_message_strip_padding: .4375rem 2.5rem .4375rem 2.5rem;--_ui5-v1-21-2_message_strip_padding_block_no_icon: .4375rem .4375rem;--_ui5-v1-21-2_message_strip_padding_inline_no_icon: 1rem 2.5rem;--_ui5-v1-21-2_message_strip_button_height: 1.625rem;--_ui5-v1-21-2_message_strip_border_width: 1px;--_ui5-v1-21-2_message_strip_close_button_border: none;--_ui5-v1-21-2_message_strip_icon_top: .4375rem;--_ui5-v1-21-2_message_strip_focus_width: 1px;--_ui5-v1-21-2_message_strip_focus_offset: -2px;--_ui5-v1-21-2_message_strip_close_button_top: .125rem;--_ui5-v1-21-2_message_strip_close_button_right: .1875rem;--_ui5-v1-21-2_panel_focus_border: var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5-v1-21-2_panel_header_height: 2.75rem;--_ui5-v1-21-2_panel_button_root_width: 2.75rem;--_ui5-v1-21-2_panel_button_root_height: 2.75rem;--_ui5-v1-21-2_panel_header_padding_right: .5rem;--_ui5-v1-21-2_panel_header_button_wrapper_padding: .25rem;--_ui5-v1-21-2_panel_border_radius: var(--sapElement_BorderCornerRadius);--_ui5-v1-21-2_panel_border_bottom: none;--_ui5-v1-21-2_panel_default_header_border: .0625rem solid var(--sapGroup_TitleBorderColor);--_ui5-v1-21-2_panel_outline_offset: -.125rem;--_ui5-v1-21-2_panel_border_radius_expanded: var(--sapElement_BorderCornerRadius) var(--sapElement_BorderCornerRadius) 0 0;--_ui5-v1-21-2_panel_icon_color: var(--sapButton_Lite_TextColor);--_ui5-v1-21-2_panel_focus_offset: -1px;--_ui5-v1-21-2_panel_content_padding: .625rem 1rem;--_ui5-v1-21-2_panel_header_background_color: var(--sapGroup_TitleBackground);--_ui5-v1-21-2_popover_background: var(--sapGroup_ContentBackground);--_ui5-v1-21-2_popover_box_shadow: var(--sapContent_Shadow2);--_ui5-v1-21-2_popover_no_arrow_box_shadow: var(--sapContent_Shadow1);--_ui5-v1-21-2_popup_content_padding_s: 1rem;--_ui5-v1-21-2_popup_content_padding_m_l: 2rem;--_ui5-v1-21-2_popup_content_padding_xl: 3rem;--_ui5-v1-21-2_popup_header_footer_padding_s: 1rem;--_ui5-v1-21-2_popup_header_footer_padding_m_l: 2rem;--_ui5-v1-21-2_popup_header_footer_padding_xl: 3rem;--_ui5-v1-21-2_popup_viewport_margin: 10px;--_ui5-v1-21-2_popup_header_font_weight: 400;--_ui5-v1-21-2_popup_header_prop_header_text_alignment: flex-start;--_ui5-v1-21-2_popup_header_background: var(--sapPageHeader_Background);--_ui5-v1-21-2_popup_header_shadow: var(--sapContent_HeaderShadow);--_ui5-v1-21-2_popup_header_border: none;--_ui5-v1-21-2_popup_header_font_family: var(--sapFontHeaderFamily);--_ui5-v1-21-2_popup_border_radius: .5rem;--_ui5-v1-21-2_progress_indicator_bar_border_max: none;--_ui5-v1-21-2_progress_indicator_icon_visibility: inline-block;--_ui5-v1-21-2_progress_indicator_side_points_visibility: block;--_ui5-v1-21-2_progress_indicator_padding: 1.25rem 0 .75rem 0;--_ui5-v1-21-2_progress_indicator_padding_end: 1.25rem;--_ui5-v1-21-2_progress_indicator_host_height: unset;--_ui5-v1-21-2_progress_indicator_host_min_height: unset;--_ui5-v1-21-2_progress_indicator_host_box_sizing: border-box;--_ui5-v1-21-2_progress_indicator_root_position: relative;--_ui5-v1-21-2_progress_indicator_root_border_radius: .25rem;--_ui5-v1-21-2_progress_indicator_root_height: .375rem;--_ui5-v1-21-2_progress_indicator_root_min_height: .375rem;--_ui5-v1-21-2_progress_indicator_root_overflow: visible;--_ui5-v1-21-2_progress_indicator_bar_height: .625rem;--_ui5-v1-21-2_progress_indicator_bar_border_radius: .5rem;--_ui5-v1-21-2_progress_indicator_remaining_bar_border_radius: .25rem;--_ui5-v1-21-2_progress_indicator_remaining_bar_position: absolute;--_ui5-v1-21-2_progress_indicator_remaining_bar_width: 100%;--_ui5-v1-21-2_progress_indicator_remaining_bar_overflow: visible;--_ui5-v1-21-2_progress_indicator_icon_position: absolute;--_ui5-v1-21-2_progress_indicator_icon_right_position: -1.25rem;--_ui5-v1-21-2_progress_indicator_value_margin: 0 0 .1875rem 0;--_ui5-v1-21-2_progress_indicator_value_position: absolute;--_ui5-v1-21-2_progress_indicator_value_top_position: -1.3125rem;--_ui5-v1-21-2_progress_indicator_value_left_position: 0;--_ui5-v1-21-2_progress_indicator_background_none: var(--sapProgress_Background);--_ui5-v1-21-2_progress_indicator_background_error: var(--sapProgress_NegativeBackground);--_ui5-v1-21-2_progress_indicator_background_warning: var(--sapProgress_CriticalBackground);--_ui5-v1-21-2_progress_indicator_background_success: var(--sapProgress_PositiveBackground);--_ui5-v1-21-2_progress_indicator_background_information: var(--sapProgress_InformationBackground);--_ui5-v1-21-2_progress_indicator_value_state_none: var(--sapProgress_Value_Background);--_ui5-v1-21-2_progress_indicator_value_state_error: var(--sapProgress_Value_NegativeBackground);--_ui5-v1-21-2_progress_indicator_value_state_warning: var(--sapProgress_Value_CriticalBackground);--_ui5-v1-21-2_progress_indicator_value_state_success: var(--sapProgress_Value_PositiveBackground);--_ui5-v1-21-2_progress_indicator_value_state_information: var(--sapProgress_Value_InformationBackground);--_ui5-v1-21-2_progress_indicator_value_state_none_border_color: var(--sapProgress_Value_BorderColor);--_ui5-v1-21-2_progress_indicator_value_state_error_border_color: var(--sapProgress_Value_NegativeBorderColor);--_ui5-v1-21-2_progress_indicator_value_state_warning_border_color: var(--sapProgress_Value_CriticalBorderColor);--_ui5-v1-21-2_progress_indicator_value_state_success_border_color: var(--sapProgress_Value_PositiveBorderColor);--_ui5-v1-21-2_progress_indicator_value_state_information_border_color: var(--sapProgress_Value_InformationBorderColor);--_ui5-v1-21-2_progress_indicator_value_state_error_icon_color: var(--sapProgress_Value_NegativeTextColor);--_ui5-v1-21-2_progress_indicator_value_state_warning_icon_color: var(--sapProgress_Value_CriticalTextColor);--_ui5-v1-21-2_progress_indicator_value_state_success_icon_color: var(--sapProgress_Value_PositiveTextColor);--_ui5-v1-21-2_progress_indicator_value_state_information_icon_color: var(--sapProgress_Value_InformationTextColor);--_ui5-v1-21-2_progress_indicator_border: none;--_ui5-v1-21-2_progress_indicator_border_color_error: var(--sapErrorBorderColor);--_ui5-v1-21-2_progress_indicator_border_color_warning: var(--sapWarningBorderColor);--_ui5-v1-21-2_progress_indicator_border_color_success: var(--sapSuccessBorderColor);--_ui5-v1-21-2_progress_indicator_border_color_information: var(--sapInformationBorderColor);--_ui5-v1-21-2_progress_indicator_color: var(--sapField_TextColor);--_ui5-v1-21-2_progress_indicator_bar_color: var(--sapProgress_TextColor);--_ui5-v1-21-2_progress_indicator_icon_size: var(--sapFontLargeSize);--_ui5-v1-21-2_rating_indicator_item_height: 1em;--_ui5-v1-21-2_rating_indicator_item_width: 1em;--_ui5-v1-21-2_rating_indicator_component_spacing: .5rem 0px;--_ui5-v1-21-2_rating_indicator_border_radius: .25rem;--_ui5-v1-21-2_rating_indicator_outline_offset: .125rem;--_ui5-v1-21-2_rating_indicator_readonly_item_height: .75em;--_ui5-v1-21-2_rating_indicator_readonly_item_width: .75em;--_ui5-v1-21-2_rating_indicator_readonly_item_spacing: .1875rem .1875rem;--_ui5-v1-21-2_segmented_btn_inner_border: .0625rem solid transparent;--_ui5-v1-21-2_segmented_btn_inner_border_odd_child: .0625rem solid transparent;--_ui5-v1-21-2_segmented_btn_inner_pressed_border_odd_child: .0625rem solid var(--sapButton_Selected_BorderColor);--_ui5-v1-21-2_segmented_btn_inner_border_radius: var(--sapButton_BorderCornerRadius);--_ui5-v1-21-2_segmented_btn_background_color: var(--sapButton_Lite_Background);--_ui5-v1-21-2_segmented_btn_border_color: var(--sapButton_Lite_BorderColor);--_ui5-v1-21-2_segmented_btn_hover_box_shadow: none;--_ui5-v1-21-2_segmented_btn_item_border_left: .0625rem;--_ui5-v1-21-2_segmented_btn_item_border_right: .0625rem;--_ui5-v1-21-2_radio_button_min_width: 2.75rem;--_ui5-v1-21-2_radio_button_hover_fill_error: var(--sapField_Hover_Background);--_ui5-v1-21-2_radio_button_hover_fill_warning: var(--sapField_Hover_Background);--_ui5-v1-21-2_radio_button_hover_fill_success: var(--sapField_Hover_Background);--_ui5-v1-21-2_radio_button_hover_fill_information: var(--sapField_Hover_Background);--_ui5-v1-21-2_radio_button_checked_fill: var(--sapSelectedColor);--_ui5-v1-21-2_radio_button_checked_error_fill: var(--sapField_InvalidColor);--_ui5-v1-21-2_radio_button_checked_success_fill: var(--sapField_SuccessColor);--_ui5-v1-21-2_radio_button_checked_information_fill: var(--sapField_InformationColor);--_ui5-v1-21-2_radio_button_warning_error_border_dash: 0;--_ui5-v1-21-2_radio_button_outer_ring_color: var(--sapField_BorderColor);--_ui5-v1-21-2_radio_button_outer_ring_width: var(--sapField_BorderWidth);--_ui5-v1-21-2_radio_button_outer_ring_bg: var(--sapField_Background);--_ui5-v1-21-2_radio_button_outer_ring_hover_color: var(--sapField_Hover_BorderColor);--_ui5-v1-21-2_radio_button_outer_ring_active_color: var(--sapField_Hover_BorderColor);--_ui5-v1-21-2_radio_button_outer_ring_checked_hover_color: var(--sapField_Hover_BorderColor);--_ui5-v1-21-2_radio_button_outer_ring_padding_with_label: 0 .6875rem;--_ui5-v1-21-2_radio_button_border: none;--_ui5-v1-21-2_radio_button_focus_border: none;--_ui5-v1-21-2_radio_button_focus_outline: block;--_ui5-v1-21-2_radio_button_color: var(--sapField_BorderColor);--_ui5-v1-21-2_radio_button_label_offset: 1px;--_ui5-v1-21-2_radio_button_items_align: unset;--_ui5-v1-21-2_radio_button_information_border_width: var(--sapField_InformationBorderWidth);--_ui5-v1-21-2_radio_button_border_width: var(--sapContent_FocusWidth);--_ui5-v1-21-2_radio_button_border_radius: .5rem;--_ui5-v1-21-2_radio_button_label_color: var(--sapField_TextColor);--_ui5-v1-21-2_radio_button_inner_ring_radius: 27.5%;--_ui5-v1-21-2_radio_button_outer_ring_padding: 0 .6875rem;--_ui5-v1-21-2_radio_button_read_only_border_type: 4,2;--_ui5-v1-21-2_radio_button_inner_ring_color: var(--sapContent_Selected_ForegroundColor);--_ui5-v1-21-2_radio_button_checked_warning_fill: var(--sapField_WarningColor);--_ui5-v1-21-2_radio_button_read_only_inner_ring_color: var(--sapField_TextColor);--_ui5-v1-21-2_radio_button_read_only_border_width: var(--sapElement_BorderWidth);--_ui5-v1-21-2_radio_button_hover_fill: var(--sapContent_Selected_Hover_Background);--_ui5-v1-21-2_radio_button_focus_dist: .375rem;--_ui5-v1-21-2_switch_height: 2.75rem;--_ui5-v1-21-2_switch_foucs_border_size: 1px;--_ui5-v1-21-2-switch-root-border-radius: 0;--_ui5-v1-21-2-switch-root-box-shadow: none;--_ui5-v1-21-2-switch-focus: "";--_ui5-v1-21-2_switch_track_border_radius: .75rem;--_ui5-v1-21-2-switch-track-border: 1px solid;--_ui5-v1-21-2_switch_track_transition: none;--_ui5-v1-21-2_switch_handle_border_radius: 1rem;--_ui5-v1-21-2-switch-handle-icon-display: none;--_ui5-v1-21-2-switch-slider-texts-display: inline;--_ui5-v1-21-2_switch_width: 3.5rem;--_ui5-v1-21-2_switch_min_width: none;--_ui5-v1-21-2_switch_with_label_width: 3.875rem;--_ui5-v1-21-2_switch_focus_outline: none;--_ui5-v1-21-2_switch_root_after_outline: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-21-2_switch_root_after_boreder: none;--_ui5-v1-21-2_switch_root_after_boreder_radius: 1rem;--_ui5-v1-21-2_switch_root_outline_top: .5rem;--_ui5-v1-21-2_switch_root_outline_bottom: .5rem;--_ui5-v1-21-2_switch_root_outline_left: .375rem;--_ui5-v1-21-2_switch_root_outline_right: .375rem;--_ui5-v1-21-2_switch_disabled_opacity: var(--sapContent_DisabledOpacity);--_ui5-v1-21-2_switch_transform: translateX(100%) translateX(-1.625rem);--_ui5-v1-21-2_switch_transform_with_label: translateX(100%) translateX(-1.875rem);--_ui5-v1-21-2_switch_rtl_transform: translateX(-100%) translateX(1.625rem);--_ui5-v1-21-2_switch_rtl_transform_with_label: translateX(-100%) translateX(1.875rem);--_ui5-v1-21-2_switch_track_width: 2.5rem;--_ui5-v1-21-2_switch_track_height: 1.5rem;--_ui5-v1-21-2_switch_track_with_label_width: 2.875rem;--_ui5-v1-21-2_switch_track_with_label_height: 1.5rem;--_ui5-v1-21-2_switch_track_active_background_color: var(--sapButton_Track_Selected_Background);--_ui5-v1-21-2_switch_track_inactive_background_color: var(--sapButton_Track_Background);--_ui5-v1-21-2_switch_track_hover_active_background_color: var(--sapButton_Track_Selected_Hover_Background);--_ui5-v1-21-2_switch_track_hover_inactive_background_color: var(--sapButton_Track_Hover_Background);--_ui5-v1-21-2_switch_track_active_border_color: var(--sapButton_Track_Selected_BorderColor);--_ui5-v1-21-2_switch_track_inactive_border_color: var(--sapButton_Track_BorderColor);--_ui5-v1-21-2_switch_track_hover_active_border_color: var(--sapButton_Track_Selected_Hover_BorderColor);--_ui5-v1-21-2_switch_track_hover_inactive_border_color: var(--sapButton_Track_Hover_BorderColor);--_ui5-v1-21-2_switch_track_semantic_accept_background_color: var(--sapButton_Track_Positive_Background);--_ui5-v1-21-2_switch_track_semantic_reject_background_color: var(--sapButton_Track_Negative_Background);--_ui5-v1-21-2_switch_track_semantic_hover_accept_background_color: var(--sapButton_Track_Positive_Hover_Background);--_ui5-v1-21-2_switch_track_semantic_hover_reject_background_color: var(--sapButton_Track_Negative_Hover_Background);--_ui5-v1-21-2_switch_track_semantic_accept_border_color: var(--sapButton_Track_Positive_BorderColor);--_ui5-v1-21-2_switch_track_semantic_reject_border_color: var(--sapButton_Track_Negative_BorderColor);--_ui5-v1-21-2_switch_track_semantic_hover_accept_border_color: var(--sapButton_Track_Positive_Hover_BorderColor);--_ui5-v1-21-2_switch_track_semantic_hover_reject_border_color: var(--sapButton_Track_Negative_Hover_BorderColor);--_ui5-v1-21-2_switch_track_icon_display: inline-block;--_ui5-v1-21-2_switch_handle_width: 1.5rem;--_ui5-v1-21-2_switch_handle_height: 1.25rem;--_ui5-v1-21-2_switch_handle_with_label_width: 1.75rem;--_ui5-v1-21-2_switch_handle_with_label_height: 1.25rem;--_ui5-v1-21-2_switch_handle_border: var(--_ui5-v1-21-2_switch_handle_border_width) solid var(--sapButton_Handle_BorderColor);--_ui5-v1-21-2_switch_handle_border_width: .125rem;--_ui5-v1-21-2_switch_handle_active_background_color: var(--sapButton_Handle_Selected_Background);--_ui5-v1-21-2_switch_handle_inactive_background_color: var(--sapButton_Handle_Background);--_ui5-v1-21-2_switch_handle_hover_active_background_color: var(--sapButton_Handle_Selected_Hover_Background);--_ui5-v1-21-2_switch_handle_hover_inactive_background_color: var(--sapButton_Handle_Hover_Background);--_ui5-v1-21-2_switch_handle_active_border_color: var(--sapButton_Handle_Selected_BorderColor);--_ui5-v1-21-2_switch_handle_inactive_border_color: var(--sapButton_Handle_BorderColor);--_ui5-v1-21-2_switch_handle_hover_active_border_color: var(--sapButton_Handle_Selected_BorderColor);--_ui5-v1-21-2_switch_handle_hover_inactive_border_color: var(--sapButton_Handle_BorderColor);--_ui5-v1-21-2_switch_handle_semantic_accept_background_color: var(--sapButton_Handle_Positive_Background);--_ui5-v1-21-2_switch_handle_semantic_reject_background_color: var(--sapButton_Handle_Negative_Background);--_ui5-v1-21-2_switch_handle_semantic_hover_accept_background_color: var(--sapButton_Handle_Positive_Hover_Background);--_ui5-v1-21-2_switch_handle_semantic_hover_reject_background_color: var(--sapButton_Handle_Negative_Hover_Background);--_ui5-v1-21-2_switch_handle_semantic_accept_border_color: var(--sapButton_Handle_Positive_BorderColor);--_ui5-v1-21-2_switch_handle_semantic_reject_border_color: var(--sapButton_Handle_Negative_BorderColor);--_ui5-v1-21-2_switch_handle_semantic_hover_accept_border_color: var(--sapButton_Handle_Positive_BorderColor);--_ui5-v1-21-2_switch_handle_semantic_hover_reject_border_color: var(--sapButton_Handle_Negative_BorderColor);--_ui5-v1-21-2_switch_handle_on_hover_box_shadow: 0 0 0 .125rem var(--sapButton_Handle_Selected_Hover_BorderColor);--_ui5-v1-21-2_switch_handle_off_hover_box_shadow: 0 0 0 .125rem var(--sapButton_Handle_Hover_BorderColor);--_ui5-v1-21-2_switch_handle_semantic_on_hover_box_shadow: 0 0 0 .125rem var(--sapButton_Handle_Positive_Hover_BorderColor);--_ui5-v1-21-2_switch_handle_semantic_off_hover_box_shadow: 0 0 0 .125rem var(--sapButton_Handle_Negative_Hover_BorderColor);--_ui5-v1-21-2_switch_handle_left: .0625rem;--_ui5-v1-21-2_switch_text_font_family: var(--sapContent_IconFontFamily);--_ui5-v1-21-2_switch_text_font_size: var(--sapFontLargeSize);--_ui5-v1-21-2_switch_text_width: 1.25rem;--_ui5-v1-21-2_switch_text_with_label_font_family: "72-Condensed-Bold" , "72" , "72full" , Arial, Helvetica, sans-serif;--_ui5-v1-21-2_switch_text_with_label_font_size: var(--sapFontSmallSize);--_ui5-v1-21-2_switch_text_with_label_width: 1.75rem;--_ui5-v1-21-2_switch_text_inactive_left: .1875rem;--_ui5-v1-21-2_switch_text_inactive_left_alternate: .0625rem;--_ui5-v1-21-2_switch_text_inactive_right: auto;--_ui5-v1-21-2_switch_text_inactive_right_alternate: 0;--_ui5-v1-21-2_switch_text_active_left: .1875rem;--_ui5-v1-21-2_switch_text_active_left_alternate: .0625rem;--_ui5-v1-21-2_switch_text_active_right: auto;--_ui5-v1-21-2_switch_text_active_color: var(--sapButton_Handle_Selected_TextColor);--_ui5-v1-21-2_switch_text_inactive_color: var(--sapButton_Handle_TextColor);--_ui5-v1-21-2_switch_text_semantic_accept_color: var(--sapButton_Handle_Positive_TextColor);--_ui5-v1-21-2_switch_text_semantic_reject_color: var(--sapButton_Handle_Negative_TextColor);--_ui5-v1-21-2_switch_text_overflow: hidden;--_ui5-v1-21-2_switch_text_z_index: 1;--_ui5-v1-21-2_switch_text_hidden: hidden;--_ui5-v1-21-2_switch_text_min_width: none;--_ui5-v1-21-2_switch_icon_width: 1rem;--_ui5-v1-21-2_switch_icon_height: 1rem;--_ui5-v1-21-2_select_disabled_background: var(--sapField_Background);--_ui5-v1-21-2_select_disabled_border_color: var(--sapField_BorderColor);--_ui5-v1-21-2_select_state_error_warning_border_style: solid;--_ui5-v1-21-2_select_state_error_warning_border_width: .125rem;--_ui5-v1-21-2_select_focus_width: 1px;--_ui5-v1-21-2_select_label_color: var(--sapField_TextColor);--_ui5-v1-21-2_select_hover_icon_left_border: none;--_ui5-v1-21-2_select_option_focus_border_radius: var(--sapElement_BorderCornerRadius);--_ui5-v1-21-2_split_button_host_transparent_hover_background: transparent;--_ui5-v1-21-2_split_button_transparent_disabled_background: transparent;--_ui5-v1-21-2_split_button_host_default_box_shadow: inset 0 0 0 var(--sapButton_BorderWidth) var(--sapButton_BorderColor);--_ui5-v1-21-2_split_button_host_attention_box_shadow: inset 0 0 0 var(--sapButton_BorderWidth) var(--sapButton_Attention_BorderColor);--_ui5-v1-21-2_split_button_host_emphasized_box_shadow: inset 0 0 0 var(--sapButton_BorderWidth) var(--sapButton_Emphasized_BorderColor);--_ui5-v1-21-2_split_button_host_positive_box_shadow: inset 0 0 0 var(--sapButton_BorderWidth) var(--sapButton_Accept_BorderColor);--_ui5-v1-21-2_split_button_host_negative_box_shadow: inset 0 0 0 var(--sapButton_BorderWidth) var(--sapButton_Reject_BorderColor);--_ui5-v1-21-2_split_button_host_transparent_box_shadow: inset 0 0 0 var(--sapButton_BorderWidth) var(--sapButton_Lite_BorderColor);--_ui5-v1-21-2_split_text_button_border_color: transparent;--_ui5-v1-21-2_split_text_button_background_color: transparent;--_ui5-v1-21-2_split_text_button_emphasized_border: var(--sapButton_BorderWidth) solid var(--sapButton_Emphasized_BorderColor);--_ui5-v1-21-2_split_text_button_emphasized_border_width: .0625rem 0 .0625rem .0625rem;--_ui5-v1-21-2_split_text_button_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-21-2_split_text_button_emphasized_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_Emphasized_BorderColor);--_ui5-v1-21-2_split_text_button_positive_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_Accept_BorderColor);--_ui5-v1-21-2_split_text_button_negative_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_Reject_BorderColor);--_ui5-v1-21-2_split_text_button_attention_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_Attention_BorderColor);--_ui5-v1-21-2_split_text_button_transparent_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_--_ui5-v1-21-2_split_button_text_button_border_width_rtl: .0625rem .0625rem .0625rem 0;--_ui5-v1-21-2_split_text_button_emphasized_border_width_rtl: .0625rem;--_ui5-v1-21-2_split_arrow_button_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-21-2_split_arrow_button_emphasized_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_Emphasized_BorderColor);--_ui5-v1-21-2_split_arrow_button_emphasized_hover_border_left: var(--sapButton_BorderWidth) solid var(--sapButton_Emphasized_BorderColor);--_ui5-v1-21-2_split_arrow_button_positive_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_Accept_BorderColor);--_ui5-v1-21-2_split_arrow_button_negative_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_Reject_BorderColor);--_ui5-v1-21-2_split_arrow_button_attention_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_Attention_BorderColor);--_ui5-v1-21-2_split_arrow_button_transparent_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-21-2_split_text_button_hover_border_left: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-21-2_split_text_button_emphasized_hover_border_left: var(--sapButton_BorderWidth) solid var(--sapButton_Emphasized_BorderColor);--_ui5-v1-21-2_split_text_button_positive_hover_border_left: var(--sapButton_BorderWidth) solid var(--sapButton_Accept_BorderColor);--_ui5-v1-21-2_split_text_button_negative_hover_border_left: var(--sapButton_BorderWidth) solid var(--sapButton_Reject_BorderColor);--_ui5-v1-21-2_split_text_button_attention_hover_border_left: var(--sapButton_BorderWidth) solid var(--sapButton_Attention_BorderColor);--_ui5-v1-21-2_split_text_button_transparent_hover_border_left: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-21-2_split_text_button_hover_border_right_rtl: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-21-2_split_arrow_button_wrapper_emphasized_hover_border_left_width_rtl: var(--sapButton_BorderWidth);--_ui5-v1-21-2_split_button_focused_border: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-21-2_split_button_focused_border_radius: .375rem;--_ui5-v1-21-2_split_button_hover_border_radius: var(--_ui5-v1-21-2_button_border_radius);--_ui5-v1-21-2_split_button_middle_separator_width: 0;--_ui5-v1-21-2_split_button_middle_separator_left: -.0625rem;--_ui5-v1-21-2_split_button_middle_separator_hover_display: none;--_ui5-v1-21-2_split_button_text_button_width: 2.375rem;--_ui5-v1-21-2_split_button_text_button_right_border_width: .0625rem;--_ui5-v1-21-2_split_button_transparent_hover_background: var(--sapButton_Lite_Hover_Background);--_ui5-v1-21-2_split_button_transparent_hover_color: var(--sapButton_TextColor);--_ui5-v1-21-2_split_button_host_transparent_hover_box_shadow: inset 0 0 0 var(--sapButton_BorderWidth) var(--sapButton_BorderColor);--_ui5-v1-21-2_split_button_inner_focused_border_radius_outer: .375rem;--_ui5-v1-21-2_split_button_inner_focused_border_radius_inner: .375rem;--_ui5-v1-21-2_split_button_emphasized_separator_color: transparent;--_ui5-v1-21-2_split_button_positive_separator_color: transparent;--_ui5-v1-21-2_split_button_negative_separator_color: transparent;--_ui5-v1-21-2_split_button_attention_separator_color: transparent;--_ui5-v1-21-2_split_button_attention_separator_color_default: var(--sapButton_Attention_TextColor);--_ui5-v1-21-2_split_text_button_hover_border_right: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-21-2_split_text_button_emphasized_hover_border_right: none;--_ui5-v1-21-2_split_text_button_positive_hover_border_right: var(--sapButton_BorderWidth) solid var(--sapButton_Accept_BorderColor);--_ui5-v1-21-2_split_text_button_negative_hover_border_right: var(--sapButton_BorderWidth) solid var(--sapButton_Reject_BorderColor);--_ui5-v1-21-2_split_text_button_attention_hover_border_right: var(--sapButton_BorderWidth) solid var(--sapButton_Attention_BorderColor);--_ui5-v1-21-2_split_text_button_transparent_hover_border_right: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-21-2_split_text_button_hover_border_left_rtl: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-21-2_split_text_button_emphasized_hover_border_left_rtl: var(--sapButton_BorderWidth) solid var(--sapButton_Emphasized_BorderColor);--_ui5-v1-21-2_split_text_button_positive_hover_border_left_rtl: var(--sapButton_BorderWidth) solid var(--sapButton_Accept_BorderColor);--_ui5-v1-21-2_split_text_button_negative_hover_border_left_rtl: var(--sapButton_BorderWidth) solid var(--sapButton_Reject_BorderColor);--_ui5-v1-21-2_split_text_button_attention_hover_border_left_rtl: var(--sapButton_BorderWidth) solid var(--sapButton_Attention_BorderColor);--_ui5-v1-21-2_split_text_button_transparent_hover_border_left_rtl: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-21-2_split_text_button_emphasized_hover_border_right_rtl: var(--sapButton_BorderWidth) solid var(--sapButton_Emphasized_BorderColor);--_ui5-v1-21-2_split_text_button_positive_hover_border_right_rtl: var(--sapButton_BorderWidth) solid var(--sapButton_Accept_BorderColor);--_ui5-v1-21-2_split_text_button_negative_hover_border_right_rtl: var(--sapButton_BorderWidth) solid var(--sapButton_Reject_BorderColor);--_ui5-v1-21-2_split_text_button_attention_hover_border_right_rtl: var(--sapButton_BorderWidth) solid var(--sapButton_Attention_BorderColor);--_ui5-v1-21-2_split_text_button_transparent_hover_border_right_rtl: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-21-2_tc_header_height: var(--_ui5-v1-21-2_tc_item_height);--_ui5-v1-21-2_tc_header_height_text_only: var(--_ui5-v1-21-2_tc_item_text_only_height);--_ui5-v1-21-2_tc_header_height_text_with_additional_text: var(--_ui5-v1-21-2_tc_item_text_only_with_additional_text_height);--_ui5-v1-21-2_tc_header_box_shadow: var(--sapContent_HeaderShadow);--_ui5-v1-21-2_tc_header_background: var(--sapObjectHeader_Background);--_ui5-v1-21-2_tc_header_background_translucent: var(--sapObjectHeader_Background);--_ui5-v1-21-2_tc_content_background: var(--sapBackgroundColor);--_ui5-v1-21-2_tc_content_background_translucent: var(--sapGroup_ContentBackground);--_ui5-v1-21-2_tc_headeritem_padding: 1rem;--_ui5-v1-21-2_tc_headerItem_additional_text_color: var(--sapContent_LabelColor);--_ui5-v1-21-2_tc_headerItem_text_selected_color: var(--sapSelectedColor);--_ui5-v1-21-2_tc_headerItem_text_selected_hover_color: var(--sapSelectedColor);--_ui5-v1-21-2_tc_headerItem_additional_text_font_weight: normal;--_ui5-v1-21-2_tc_headerItem_neutral_color: var(--sapNeutralTextColor);--_ui5-v1-21-2_tc_headerItem_positive_color: var(--sapPositiveTextColor);--_ui5-v1-21-2_tc_headerItem_negative_color: var(--sapNegativeTextColor);--_ui5-v1-21-2_tc_headerItem_critical_color: var(--sapCriticalTextColor);--_ui5-v1-21-2_tc_headerItem_neutral_border_color: var(--sapNeutralElementColor);--_ui5-v1-21-2_tc_headerItem_positive_border_color: var(--sapPositiveElementColor);--_ui5-v1-21-2_tc_headerItem_negative_border_color: var(--sapNegativeElementColor);--_ui5-v1-21-2_tc_headerItem_critical_border_color: var(--sapCriticalElementColor);--_ui5-v1-21-2_tc_headerItem_neutral_selected_border_color: var(--_ui5-v1-21-2_tc_headerItem_neutral_color);--_ui5-v1-21-2_tc_headerItem_positive_selected_border_color: var(--_ui5-v1-21-2_tc_headerItem_positive_color);--_ui5-v1-21-2_tc_headerItem_negative_selected_border_color: var(--_ui5-v1-21-2_tc_headerItem_negative_color);--_ui5-v1-21-2_tc_headerItem_critical_selected_border_color: var(--_ui5-v1-21-2_tc_headerItem_critical_color);--_ui5-v1-21-2_tc_headerItem_transition: none;--_ui5-v1-21-2_tc_headerItem_hover_border_visibility: hidden;--_ui5-v1-21-2_tc_headerItemContent_border_radius: .125rem .125rem 0 0;--_ui5-v1-21-2_tc_headerItemContent_border_bg: transparent;--_ui5-v1-21-2_tc_headerItem_neutral_border_bg: transparent;--_ui5-v1-21-2_tc_headerItem_positive_border_bg: transparent;--_ui5-v1-21-2_tc_headerItem_negative_border_bg: transparent;--_ui5-v1-21-2_tc_headerItem_critical_border_bg: transparent;--_ui5-v1-21-2_tc_headerItemContent_border_height: 0;--_ui5-v1-21-2_tc_headerItemContent_focus_offset: 1rem;--_ui5-v1-21-2_tc_headerItem_text_focus_border_offset_left: 0px;--_ui5-v1-21-2_tc_headerItem_text_focus_border_offset_right: 0px;--_ui5-v1-21-2_tc_headerItem_text_focus_border_offset_top: 0px;--_ui5-v1-21-2_tc_headerItem_text_focus_border_offset_bottom: 0px;--_ui5-v1-21-2_tc_headerItem_mixed_mode_focus_border_offset_left: .75rem;--_ui5-v1-21-2_tc_headerItem_mixed_mode_focus_border_offset_right: .625rem;--_ui5-v1-21-2_tc_headerItem_mixed_mode_focus_border_offset_top: .75rem;--_ui5-v1-21-2_tc_headerItem_mixed_mode_focus_border_offset_bottom: .75rem;--_ui5-v1-21-2_tc_headerItemContent_focus_border: none;--_ui5-v1-21-2_tc_headerItemContent_default_focus_border: none;--_ui5-v1-21-2_tc_headerItemContent_focus_border_radius: 0;--_ui5-v1-21-2_tc_headerItemSemanticIcon_display: none;--_ui5-v1-21-2_tc_headerItemSemanticIcon_size: .75rem;--_ui5-v1-21-2_tc_mixedMode_itemText_font_family: var(--sapFontFamily);--_ui5-v1-21-2_tc_mixedMode_itemText_font_size: var(--sapFontSmallSize);--_ui5-v1-21-2_tc_mixedMode_itemText_font_weight: normal;--_ui5-v1-21-2_tc_overflowItem_positive_color: var(--sapPositiveColor);--_ui5-v1-21-2_tc_overflowItem_negative_color: var(--sapNegativeColor);--_ui5-v1-21-2_tc_overflowItem_critical_color: var(--sapCriticalColor);--_ui5-v1-21-2_tc_overflowItem_focus_offset: .125rem;--_ui5-v1-21-2_tc_overflowItem_extraIndent: 0rem;--_ui5-v1-21-2_tc_headerItemIcon_positive_selected_background: var(--sapPositiveColor);--_ui5-v1-21-2_tc_headerItemIcon_negative_selected_background: var(--sapNegativeColor);--_ui5-v1-21-2_tc_headerItemIcon_critical_selected_background: var(--sapCriticalColor);--_ui5-v1-21-2_tc_headerItemIcon_neutral_selected_background: var(--sapNeutralColor);--_ui5-v1-21-2_tc_headerItemIcon_semantic_selected_color: var(--sapGroup_ContentBackground);--_ui5-v1-21-2_tc_header_border_bottom: .0625rem solid var(--sapObjectHeader_Background);--_ui5-v1-21-2_tc_headerItemContent_border_bottom: .1875rem solid var(--sapSelectedColor);--_ui5-v1-21-2_tc_headerItem_color: var(--sapTextColor);--_ui5-v1-21-2_tc_overflowItem_default_color: var(--sapTextColor);--_ui5-v1-21-2_tc_overflowItem_current_color: CurrentColor;--_ui5-v1-21-2_tc_content_border_bottom: .0625rem solid var(--sapObjectHeader_BorderColor);--_ui5-v1-21-2_tc_headerItem_expand_button_margin_inline_start: 0rem;--_ui5-v1-21-2_tc_headerItem_single_click_expand_button_margin_inline_start: .25rem;--_ui5-v1-21-2_tc_headerItem_expand_button_border_radius: .25rem;--_ui5-v1-21-2_tc_headerItem_expand_button_separator_display: inline-block;--_ui5-v1-21-2_tc_headerItem_focus_border: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-21-2_tc_headerItem_focus_border_offset: -5px;--_ui5-v1-21-2_tc_headerItemIcon_focus_border_radius: 50%;--_ui5-v1-21-2_tc_headerItem_focus_border_radius: .375rem;--_ui5-v1-21-2_tc_headeritem_text_font_weight: bold;--_ui5-v1-21-2_tc_headerItem_focus_offset: 1px;--_ui5-v1-21-2_tc_headerItem_text_hover_color: var(--sapContent_Selected_ForegroundColor);--_ui5-v1-21-2_tc_headerItemIcon_border: .125rem solid var(--sapContent_Selected_ForegroundColor);--_ui5-v1-21-2_tc_headerItemIcon_color: var(--sapContent_Selected_ForegroundColor);--_ui5-v1-21-2_tc_headerItemIcon_selected_background: var(--sapContent_Selected_ForegroundColor);--_ui5-v1-21-2_tc_headerItemIcon_background_color: var(--sapContent_Selected_Background);--_ui5-v1-21-2_tc_headerItemIcon_selected_color: var(--sapContent_ContrastIconColor);--_ui5-v1-21-2_tc_mixedMode_itemText_color: var(--sapTextColor);--_ui5-v1-21-2_tc_overflow_text_color: var(--sapTextColor);--_ui5-v1-21-2_textarea_state_border_width: .125rem;--_ui5-v1-21-2_textarea_information_border_width: .125rem;--_ui5-v1-21-2_textarea_placeholder_font_style: italic;--_ui5-v1-21-2_textarea_value_state_error_warning_placeholder_font_weight: normal;--_ui5-v1-21-2_textarea_error_placeholder_font_style: italic;--_ui5-v1-21-2_textarea_error_placeholder_color: var(--sapField_PlaceholderTextColor);--_ui5-v1-21-2_textarea_error_hover_background_color: var(--sapField_Hover_Background);--_ui5-v1-21-2_textarea_disabled_opacity: .4;--_ui5-v1-21-2_textarea_focus_pseudo_element_content: "";--_ui5-v1-21-2_textarea_min_height: 2.25rem;--_ui5-v1-21-2_textarea_padding_right_and_left_readonly: .5625rem;--_ui5-v1-21-2_textarea_padding_top_readonly: .4375rem;--_ui5-v1-21-2_textarea_exceeded_text_height: 1rem;--_ui5-v1-21-2_textarea_hover_border: none;--_ui5-v1-21-2_textarea_focus_border_radius: .25rem;--_ui5-v1-21-2_textarea_error_warning_border_style: none;--_ui5-v1-21-2_textarea_line_height: 1.5;--_ui5-v1-21-2_textarea_focused_value_state_error_background: var(--sapField_Hover_Background);--_ui5-v1-21-2_textarea_focused_value_state_warning_background: var(--sapField_Hover_Background);--_ui5-v1-21-2_textarea_focused_value_state_success_background: var(--sapField_Hover_Background);--_ui5-v1-21-2_textarea_focused_value_state_information_background: var(--sapField_Hover_Background);--_ui5-v1-21-2_textarea_focused_value_state_error_focus_outline_color: var(--sapField_InvalidColor);--_ui5-v1-21-2_textarea_focused_value_state_warning_focus_outline_color: var(--sapField_WarningColor);--_ui5-v1-21-2_textarea_focused_value_state_success_focus_outline_color: var(--sapField_SuccessColor);--_ui5-v1-21-2_textarea_focus_offset: 0;--_ui5-v1-21-2_textarea_readonly_focus_offset: 1px;--_ui5-v1-21-2_textarea_focus_outline_color: var(--sapField_Active_BorderColor);--_ui5-v1-21-2_textarea_value_state_focus_offset: 0;--_ui5-v1-21-2_textarea_wrapper_padding: .0625rem;--_ui5-v1-21-2_textarea_success_wrapper_padding: .0625rem;--_ui5-v1-21-2_textarea_warning_error_wrapper_padding: .0625rem .0625rem .125rem .0625rem;--_ui5-v1-21-2_textarea_information_wrapper_padding: .0625rem .0625rem .125rem .0625rem;--_ui5-v1-21-2_textarea_padding_bottom_readonly: .375rem;--_ui5-v1-21-2_textarea_padding_top_error_warning: .5rem;--_ui5-v1-21-2_textarea_padding_bottom_error_warning: .4375rem;--_ui5-v1-21-2_textarea_padding_top_information: .5rem;--_ui5-v1-21-2_textarea_padding_bottom_information: .4375rem;--_ui5-v1-21-2_textarea_padding_right_and_left: .625rem;--_ui5-v1-21-2_textarea_padding_right_and_left_error_warning: .625rem;--_ui5-v1-21-2_textarea_padding_right_and_left_information: .625rem;--_ui5-v1-21-2_textarea_readonly_border_style: dashed;--_ui5-v1-21-2_time_picker_border: .0625rem solid transparent;--_ui5-v1-21-2-time_picker_border_radius: .25rem;--_ui5-v1-21-2_toast_vertical_offset: 3rem;--_ui5-v1-21-2_toast_horizontal_offset: 2rem;--_ui5-v1-21-2_toast_background: var(--sapList_Background);--_ui5-v1-21-2_toast_shadow: var(--sapContent_Shadow2);--_ui5-v1-21-2_toast_offset_width: -.1875rem;--_ui5-v1-21-2_wheelslider_item_text_size: var(--sapFontSize);--_ui5-v1-21-2_wheelslider_label_text_size: var(--sapFontSmallSize);--_ui5-v1-21-2_wheelslider_selection_frame_margin_top: calc(var(--_ui5-v1-21-2_wheelslider_item_height) * 2);--_ui5-v1-21-2_wheelslider_mobile_selection_frame_margin_top: calc(var(--_ui5-v1-21-2_wheelslider_item_height) * 4);--_ui5-v1-21-2_wheelslider_label_text_color: var(--sapContent_LabelColor);--_ui5-v1-21-2_wheelslider_height: 240px;--_ui5-v1-21-2_wheelslider_mobile_height: 432px;--_ui5-v1-21-2_wheelslider_item_width: 48px;--_ui5-v1-21-2_wheelslider_item_height: 46px;--_ui5-v1-21-2_wheelslider_arrows_visibility: hidden;--_ui5-v1-21-2_wheelslider_item_background_color: var(--sapLegend_WorkingBackground);--_ui5-v1-21-2_wheelslider_item_text_color: var(--sapTextColor);--_ui_wheelslider_item_hover_color: var(--sapList_AlternatingBackground);--_ui_wheelslider_item_expanded_hover_color: var(--sapList_AlternatingBackground);--_ui_wheelslider_item_exanded_hover_color: var(--sapList_AlternatingBackground);--_ui5-v1-21-2_wheelslider_item_border_color: var(--sapList_SelectionBorderColor);--_ui5-v1-21-2_wheelslider_item_expanded_border_color: transparent;--_ui5-v1-21-2_wheelslider_item_hovered_border_color: transparent;--_ui5-v1-21-2_wheelslider_collapsed_item_text_color: var(--sapList_SelectionBorderColor);--_ui5-v1-21-2_wheelslider_selected_item_background_color: var(--sapContent_Selected_Background);--_ui5-v1-21-2_wheelslider_selected_item_hover_background_color: var(--sapButton_Emphasized_Hover_BorderColor);--_ui5-v1-21-2_wheelslider_active_item_background_color:var(--sapContent_Selected_Background);--_ui5-v1-21-2_wheelslider_active_item_text_color: var(--sapContent_Selected_TextColor);--_ui5-v1-21-2_wheelslider_selection_frame_color: var(--sapList_SelectionBorderColor);--_ui_wheelslider_item_border_radius: var(--_ui5-v1-21-2_button_border_radius);--_ui5-v1-21-2_toggle_button_pressed_focussed: var(--sapButton_Selected_BorderColor);--_ui5-v1-21-2_toggle_button_pressed_focussed_hovered: var(--sapButton_Selected_BorderColor);--_ui5-v1-21-2_toggle_button_selected_positive_text_color: var(--sapButton_Selected_TextColor);--_ui5-v1-21-2_toggle_button_selected_negative_text_color: var(--sapButton_Selected_TextColor);--_ui5-v1-21-2_toggle_button_selected_attention_text_color: var(--sapButton_Selected_TextColor);--_ui5-v1-21-2_toggle_button_emphasized_pressed_focussed_hovered: var(--sapContent_FocusColor);--_ui5-v1-21-2_toggle_button_emphasized_text_shadow: none;--_ui5-v1-21-2_yearpicker_item_selected_focus: var(--sapContent_Selected_Background);--_ui5-v1-21-2_yearpicker_item_border: none;--_ui5-v1-21-2_yearpicker_item_margin: 1px;--_ui5-v1-21-2_yearpicker_item_border_radius: .5rem;--_ui5-v1-21-2_yearpicker_item_focus_after_offset: .25rem;--_ui5-v1-21-2_yearpicker_item_focus_after_border: var(--_ui5-v1-21-2_button_focused_border);--_ui5-v1-21-2_yearpicker_item_focus_after_border_radius: .5rem;--_ui5-v1-21-2_yearpicker_item_focus_after_width: calc(100% - .5rem) ;--_ui5-v1-21-2_yearpicker_item_focus_after_height: calc(100% - .5rem) ;--_ui5-v1-21-2_yearpicker_item_selected_background_color: transparent;--_ui5-v1-21-2_yearpicker_item_selected_text_color: var(--sapContent_Selected_TextColor);--_ui5-v1-21-2_yearpicker_item_selected_box_shadow: none;--_ui5-v1-21-2_yearpicker_item_selected_hover_color: var(--sapList_Hover_Background);--_ui5-v1-21-2_yearpicker_item_focus_after_outline: none;--_ui5-v1-21-2_calendar_header_middle_button_width: 6.25rem;--_ui5-v1-21-2_calendar_header_middle_button_flex: 1 1 auto;--_ui5-v1-21-2_calendar_header_middle_button_focus_after_display: block;--_ui5-v1-21-2_calendar_header_middle_button_focus_after_width: calc(100% - .375rem) ;--_ui5-v1-21-2_calendar_header_middle_button_focus_after_height: calc(100% - .375rem) ;--_ui5-v1-21-2_calendar_header_middle_button_focus_after_top_offset: .125rem;--_ui5-v1-21-2_calendar_header_middle_button_focus_after_left_offset: .125rem;--_ui5-v1-21-2_calendar_header_arrow_button_border: none;--_ui5-v1-21-2_calendar_header_arrow_button_border_radius: .5rem;--_ui5-v1-21-2_calendar_header_button_background_color: var(--sapButton_Lite_Background);--_ui5-v1-21-2_calendar_header_arrow_button_box_shadow: 0 0 .125rem 0 rgb(85 107 130 / 72%);--_ui5-v1-21-2_calendar_header_middle_button_focus_border_radius: .5rem;--_ui5-v1-21-2_calendar_header_middle_button_focus_border: none;--_ui5-v1-21-2_calendar_header_middle_button_focus_after_border: none;--_ui5-v1-21-2_calendar_header_middle_button_focus_background: transparent;--_ui5-v1-21-2_calendar_header_middle_button_focus_outline: .125rem solid var(--sapSelectedColor);--_ui5-v1-21-2_calendar_header_middle_button_focus_active_outline: .0625rem solid var(--sapSelectedColor);--_ui5-v1-21-2_calendar_header_middle_button_focus_active_background: transparent;--_ui5-v1-21-2_token_background: var(--sapButton_TokenBackground);--_ui5-v1-21-2_token_readonly_background: var(--sapButton_TokenBackground);--_ui5-v1-21-2_token_readonly_color: var(--sapContent_LabelColor);--_ui5-v1-21-2_token_right_margin: .3125rem;--_ui5-v1-21-2_token_padding: .25rem 0;--_ui5-v1-21-2_token_left_padding: .3125rem;--_ui5-v1-21-2_token_focused_selected_border: 1px solid var(--sapButton_Selected_BorderColor);--_ui5-v1-21-2_token_focus_offset: -.25rem;--_ui5-v1-21-2_token_focus_outline_width: .0625rem;--_ui5-v1-21-2_token_hover_border_color: var(--sapButton_TokenBorderColor);--_ui5-v1-21-2_token_selected_focus_outline: none;--_ui5-v1-21-2_token_focus_outline: none;--_ui5-v1-21-2_token_outline_offset: .125rem;--_ui5-v1-21-2_token_selected_hover_border_color: var(--sapButton_Selected_BorderColor);--ui5-v1-21-2_token_focus_pseudo_element_content: "";--_ui5-v1-21-2_token_border_radius: .375rem;--_ui5-v1-21-2_token_focus_outline_border_radius: .5rem;--_ui5-v1-21-2_token_text_color: var(--sapTextColor);--_ui5-v1-21-2_token_selected_text_font_family: var(--sapFontSemiboldDuplexFamily);--_ui5-v1-21-2_token_selected_internal_border_bottom: .125rem solid var(--sapButton_Selected_BorderColor);--_ui5-v1-21-2_token_selected_internal_border_bottom_radius: .1875rem;--_ui5-v1-21-2_token_text_icon_top: .0625rem;--_ui5-v1-21-2_token_selected_focused_offset_bottom: -.375rem;--_ui5-v1-21-2_token_readonly_padding: .25rem .3125rem;--_ui5-v1-21-2_tokenizer-popover_offset: .3125rem;--_ui5-v1-21-2_tokenizer_n_more_text_color: var(--sapLinkColor);--_ui5-v1-21-2-multi_combobox_token_margin_top: 1px;--_ui5-v1-21-2_slider_progress_container_dot_background: var(--sapField_BorderColor);--_ui5-v1-21-2_slider_progress_border: none;--_ui5-v1-21-2_slider_padding: 1.406rem 1.0625rem;--_ui5-v1-21-2_slider_inner_height: .25rem;--_ui5-v1-21-2_slider_outer_height: 1.6875rem;--_ui5-v1-21-2_slider_progress_border_radius: .25rem;--_ui5-v1-21-2_slider_tickmark_bg: var(--sapField_BorderColor);--_ui5-v1-21-2_slider_handle_margin_left: calc(-1 * (var(--_ui5-v1-21-2_slider_handle_width) / 2));--_ui5-v1-21-2_slider_handle_outline_offset: .075rem;--_ui5-v1-21-2_slider_progress_outline: .0625rem dotted var(--sapContent_FocusColor);--_ui5-v1-21-2_slider_progress_outline_offset: -.8125rem;--_ui5-v1-21-2_slider_disabled_opacity: .4;--_ui5-v1-21-2_slider_tooltip_border_color: var(--sapField_BorderColor);--_ui5-v1-21-2_range_slider_handle_background_focus: transparent;--_ui5-v1-21-2_slider_progress_box_sizing: content-box;--_ui5-v1-21-2_range_slider_focus_outline_width: 100%;--_ui5-v1-21-2_slider_progress_outline_offset_left: 0;--_ui5-v1-21-2_range_slider_focus_outline_radius: 0;--_ui5-v1-21-2_slider_progress_container_top: 0;--_ui5-v1-21-2_slider_progress_height: 100%;--_ui5-v1-21-2_slider_active_progress_border: none;--_ui5-v1-21-2_slider_active_progress_left: 0;--_ui5-v1-21-2_slider_active_progress_top: 0;--_ui5-v1-21-2_slider_no_tickmarks_progress_container_top: var(--_ui5-v1-21-2_slider_progress_container_top);--_ui5-v1-21-2_slider_no_tickmarks_progress_height: var(--_ui5-v1-21-2_slider_progress_height);--_ui5-v1-21-2_slider_no_tickmarks_active_progress_border: var(--_ui5-v1-21-2_slider_active_progress_border);--_ui5-v1-21-2_slider_no_tickmarks_active_progress_left: var(--_ui5-v1-21-2_slider_active_progress_left);--_ui5-v1-21-2_slider_no_tickmarks_active_progress_top: var(--_ui5-v1-21-2_slider_active_progress_top);--_ui5-v1-21-2_slider_handle_focus_visibility: none;--_ui5-v1-21-2_slider_handle_icon_size: 1rem;--_ui5-v1-21-2_slider_progress_container_background: var(--sapSlider_Background);--_ui5-v1-21-2_slider_progress_container_dot_display: block;--_ui5-v1-21-2_slider_inner_min_width: 4rem;--_ui5-v1-21-2_slider_progress_background: var(--sapSlider_Selected_Background);--_ui5-v1-21-2_slider_progress_before_background: var(--sapSlider_Selected_Background);--_ui5-v1-21-2_slider_progress_after_background: var(--sapContent_MeasureIndicatorColor);--_ui5-v1-21-2_slider_handle_background: var(--sapSlider_HandleBackground);--_ui5-v1-21-2_slider_handle_icon_display: inline-block;--_ui5-v1-21-2_slider_handle_border: .0625rem solid var(--sapSlider_HandleBorderColor);--_ui5-v1-21-2_slider_handle_border_radius: .5rem;--_ui5-v1-21-2_slider_handle_height: 1.5rem;--_ui5-v1-21-2_slider_handle_width: 2rem;--_ui5-v1-21-2_slider_handle_top: -.625rem;--_ui5-v1-21-2_slider_handle_font_family: "SAP-icons";--_ui5-v1-21-2_slider_handle_hover_border: .0625rem solid var(--sapSlider_Hover_HandleBorderColor);--_ui5-v1-21-2_slider_handle_focus_border: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-21-2_slider_handle_background_focus: var(--sapSlider_Active_RangeHandleBackground);--_ui5-v1-21-2_slider_handle_outline: none;--_ui5-v1-21-2_slider_handle_hover_background: var(--sapSlider_Hover_HandleBackground);--_ui5-v1-21-2_slider_tooltip_background: var(--sapField_Focus_Background);--_ui5-v1-21-2_slider_tooltip_border: none;--_ui5-v1-21-2_slider_tooltip_border_radius: .5rem;--_ui5-v1-21-2_slider_tooltip_box_shadow: var(--sapContent_Shadow1);--_ui5-v1-21-2_range_slider_legacy_progress_focus_display: none;--_ui5-v1-21-2_range_slider_progress_focus_display: block;--_ui5-v1-21-2_slider_tickmark_in_range_bg: var(--sapSlider_Selected_BorderColor);--_ui5-v1-21-2_slider_label_fontsize: var(--sapFontSmallSize);--_ui5-v1-21-2_slider_label_color: var(--sapContent_LabelColor);--_ui5-v1-21-2_slider_tooltip_min_width: 2rem;--_ui5-v1-21-2_slider_tooltip_padding: .25rem;--_ui5-v1-21-2_slider_tooltip_fontsize: var(--sapFontSmallSize);--_ui5-v1-21-2_slider_tooltip_color: var(--sapContent_LabelColor);--_ui5-v1-21-2_slider_tooltip_height: 1.375rem;--_ui5-v1-21-2_slider_handle_focus_width: 1px;--_ui5-v1-21-2_slider_start_end_point_size: .5rem;--_ui5-v1-21-2_slider_start_end_point_left: -.75rem;--_ui5-v1-21-2_slider_start_end_point_top: -.125rem;--_ui5-v1-21-2_slider_handle_focused_tooltip_distance: calc(var(--_ui5-v1-21-2_slider_tooltip_bottom) - var(--_ui5-v1-21-2_slider_handle_focus_width));--_ui5-v1-21-2_slider_tooltip_border_box: border-box;--_ui5-v1-21-2_range_slider_handle_active_background: var(--sapSlider_Active_RangeHandleBackground);--_ui5-v1-21-2_range_slider_active_handle_icon_display: none;--_ui5-v1-21-2_range_slider_progress_focus_top: -15px;--_ui5-v1-21-2_range_slider_progress_focus_left: calc(-1 * (var(--_ui5-v1-21-2_slider_handle_width) / 2) - 5px);--_ui5-v1-21-2_range_slider_progress_focus_padding: 0 1rem 0 1rem;--_ui5-v1-21-2_range_slider_progress_focus_width: calc(100% + var(--_ui5-v1-21-2_slider_handle_width) + 10px);--_ui5-v1-21-2_range_slider_progress_focus_height: calc(var(--_ui5-v1-21-2_slider_handle_height) + 10px);--_ui5-v1-21-2_range_slider_root_hover_handle_icon_display: inline-block;--_ui5-v1-21-2_range_slider_root_hover_handle_bg: var(--_ui5-v1-21-2_slider_handle_hover_background);--_ui5-v1-21-2_range_slider_root_active_handle_icon_display: none;--_ui5-v1-21-2_slider_tickmark_height: .5rem;--_ui5-v1-21-2_slider_tickmark_top: -2px;--_ui5-v1-21-2_slider_handle_box_sizing: border-box;--_ui5-v1-21-2_range_slider_handle_background: var(--sapSlider_RangeHandleBackground);--_ui5-v1-21-2_slider_tooltip_bottom: 2rem;--_ui5-v1-21-2_value_state_message_border: none;--_ui5-v1-21-2_value_state_header_border: none;--_ui5-v1-21-2_input_value_state_icon_offset: .5rem;--_ui5-v1-21-2_value_state_header_box_shadow_error: inset 0 -.0625rem var(--sapField_InvalidColor);--_ui5-v1-21-2_value_state_header_box_shadow_information: inset 0 -.0625rem var(--sapField_InformationColor);--_ui5-v1-21-2_value_state_header_box_shadow_success: inset 0 -.0625rem var(--sapField_SuccessColor);--_ui5-v1-21-2_value_state_header_box_shadow_warning: inset 0 -.0625rem var(--sapField_WarningColor);--_ui5-v1-21-2_value_state_message_icon_offset_phone: 1rem;--_ui5-v1-21-2_value_state_header_border_bottom: none;--_ui5-v1-21-2_input_value_state_icon_display: inline-block;--_ui5-v1-21-2_value_state_message_padding: .5rem .5rem .5rem 1.875rem;--_ui5-v1-21-2_value_state_header_padding: .5rem .5rem .5rem 1.875rem;--_ui5-v1-21-2_value_state_message_popover_box_shadow: var(--sapContent_Shadow1);--_ui5-v1-21-2_value_state_message_icon_width: 1rem;--_ui5-v1-21-2_value_state_message_icon_height: 1rem;--_ui5-v1-21-2_value_state_header_offset: -.25rem;--_ui5-v1-21-2_value_state_message_popover_border_radius: var(--sapPopover_BorderCornerRadius);--_ui5-v1-21-2_value_state_message_padding_phone: .5rem .5rem .5rem 2.375rem;--_ui5-v1-21-2_value_state_message_line_height: 1.125rem;--ui5-v1-21-2_table_bottom_border: 1px solid var(--sapList_BorderColor);--ui5-v1-21-2_table_multiselect_column_width: 2.75rem;--ui5-v1-21-2_table_header_row_border_width: 1px;--_ui5-v1-21-2_table_load_more_border-bottom: none;--ui5-v1-21-2_table_header_row_outline_width: var(--sapContent_FocusWidth);--ui5-v1-21-2_table_header_row_font_family: var(--sapFontSemiboldDuplexFamily);--ui5-v1-21-2_table_header_row_border_bottom_color: var(--sapList_HeaderBorderColor);--ui5-v1-21-2_table_header_row_font_weight: bold;--ui5-v1-21-2_table_multiselect_popin_row_padding: 3.25rem;--ui5-v1-21-2_table_row_outline_width: var(--sapContent_FocusWidth);--ui5-v1-21-2_table_group_row_font-weight: bold;--ui5-v1-21-2_table_border_width: 1px 0 1px 0;--_ui5-v1-21-2-toolbar-padding-left: .5rem;--_ui5-v1-21-2-toolbar-padding-right: .5rem;--_ui5-v1-21-2-toolbar-item-margin-left: 0;--_ui5-v1-21-2-toolbar-item-margin-right: .25rem;--_ui5-v1-21-2_step_input_min_width: 7.25rem;--_ui5-v1-21-2_step_input_padding: 2.5rem;--_ui5-v1-21-2_step_input_input_error_background_color: inherit;--_ui5-v1-21-2-step_input_button_state_hover_background_color: var(--sapField_Hover_Background);--_ui5-v1-21-2_step_input_border_style: none;--_ui5-v1-21-2_step_input_border_style_hover: none;--_ui5-v1-21-2_step_input_button_background_color: transparent;--_ui5-v1-21-2_step_input_input_border: none;--_ui5-v1-21-2_step_input_input_margin_top: 0;--_ui5-v1-21-2_step_input_button_display: inline-flex;--_ui5-v1-21-2_step_input_button_left: 0;--_ui5-v1-21-2_step_input_button_right: 0;--_ui5-v1-21-2_step_input_input_border_focused_after: .125rem solid #0070f2;--_ui5-v1-21-2_step_input_input_border_top_bottom_focused_after: 0;--_ui5-v1-21-2_step_input_input_border_radius_focused_after: .25rem;--_ui5-v1-21-2_step_input_input_information_border_color_focused_after: var(--sapField_InformationColor);--_ui5-v1-21-2_step_input_input_warning_border_color_focused_after: var(--sapField_WarningColor);--_ui5-v1-21-2_step_input_input_success_border_color_focused_after: var(--sapField_SuccessColor);--_ui5-v1-21-2_step_input_input_error_border_color_focused_after: var(--sapField_InvalidColor);--_ui5-v1-21-2_step_input_disabled_button_background: none;--_ui5-v1-21-2_step_input_border_color_hover: none;--_ui5-v1-21-2_step_input_border_hover: none;--_ui5-v1-21-2_input_input_background_color: transparent;--_ui5-v1-21-2_load_more_padding: 0;--_ui5-v1-21-2_load_more_border: 1px top solid transparent;--_ui5-v1-21-2_load_more_border_radius: none;--_ui5-v1-21-2_load_more_outline_width: var(--sapContent_FocusWidth);--_ui5-v1-21-2_load_more_border-bottom: var(--sapList_BorderWidth) solid var(--sapList_BorderColor);--_ui5-v1-21-2_calendar_height: 24.5rem;--_ui5-v1-21-2_calendar_width: 20rem;--_ui5-v1-21-2_calendar_padding: 1rem;--_ui5-v1-21-2_calendar_left_right_padding: .5rem;--_ui5-v1-21-2_calendar_top_bottom_padding: 1rem;--_ui5-v1-21-2_calendar_header_height: 3rem;--_ui5-v1-21-2_calendar_header_arrow_button_width: 2.5rem;--_ui5-v1-21-2_calendar_header_padding: .25rem 0;--_ui5-v1-21-2_checkbox_root_side_padding: .6875rem;--_ui5-v1-21-2_checkbox_icon_size: 1rem;--_ui5-v1-21-2_checkbox_partially_icon_size: .75rem;--_ui5-v1-21-2_custom_list_item_rb_min_width: 2.75rem;--_ui5-v1-21-2_day_picker_item_width: 2.25rem;--_ui5-v1-21-2_day_picker_item_height: 2.875rem;--_ui5-v1-21-2_day_picker_empty_height: 3rem;--_ui5-v1-21-2_day_picker_item_justify_content: space-between;--_ui5-v1-21-2_dp_two_calendar_item_now_text_padding_top: .387rem;--_ui5-v1-21-2_dp_two_calendar_item_primary_text_height: 1.8125rem;--_ui5-v1-21-2_dp_two_calendar_item_secondary_text_height: 1rem;--_ui5-v1-21-2_dp_two_calendar_item_text_padding_top: .575rem;--_ui5-v1-21-2_color-palette-swatch-container-padding: .3125rem .6875rem;--_ui5-v1-21-2_datetime_picker_width: 40.0625rem;--_ui5-v1-21-2_datetime_picker_height: 25rem;--_ui5-v1-21-2_datetime_timeview_width: 17rem;--_ui5-v1-21-2_datetime_timeview_phonemode_width: 19.5rem;--_ui5-v1-21-2_datetime_timeview_padding: 1rem;--_ui5-v1-21-2_dialog_content_min_height: 2.75rem;--_ui5-v1-21-2_dialog_footer_height: 2.75rem;--_ui5-v1-21-2_input_inner_padding: 0 .625rem;--_ui5-v1-21-2_input_inner_padding_with_icon: 0 .25rem 0 .625rem;--_ui5-v1-21-2_input_inner_space_to_tokenizer: .125rem;--_ui5-v1-21-2_input_inner_space_to_n_more_text: .1875rem;--_ui5-v1-21-2_list_no_data_height: 3rem;--_ui5-v1-21-2_list_item_cb_margin_right: 0;--_ui5-v1-21-2_list_item_title_size: var(--sapFontLargeSize);--_ui5-v1-21-2_list_no_data_font_size: var(--sapFontLargeSize);--_ui5-v1-21-2_list_item_img_size: 3rem;--_ui5-v1-21-2_list_item_img_top_margin: .5rem;--_ui5-v1-21-2_list_item_img_bottom_margin: .5rem;--_ui5-v1-21-2_list_item_img_hn_margin: .75rem;--_ui5-v1-21-2_list_item_dropdown_base_height: 2.5rem;--_ui5-v1-21-2_list_item_base_height: var(--sapElement_LineHeight);--_ui5-v1-21-2_list_item_icon_size: 1.125rem;--_ui5-v1-21-2_list_item_icon_padding-inline-end: .5rem;--_ui5-v1-21-2_list_item_selection_btn_margin_top: calc(-1 * var(--_ui5-v1-21-2_checkbox_wrapper_padding));--_ui5-v1-21-2_list_item_content_vertical_offset: calc((var(--_ui5-v1-21-2_list_item_base_height) - var(--_ui5-v1-21-2_list_item_title_size)) / 2);--_ui5-v1-21-2_group_header_list_item_height: 2.75rem;--_ui5-v1-21-2_list_busy_row_height: 3rem;--_ui5-v1-21-2_month_picker_item_height: 3rem;--_ui5-v1-21-2_list_buttons_left_space: .125rem;--_ui5-v1-21-2_popup_default_header_height: 2.75rem;--_ui5-v1-21-2-notification-overflow-popover-padding: .25rem .5rem;--_ui5-v1-21-2_year_picker_item_height: 3rem;--_ui5-v1-21-2_tokenizer_padding: .25rem;--_ui5-v1-21-2_token_height: 1.625rem;--_ui5-v1-21-2_token_icon_size: .75rem;--_ui5-v1-21-2_token_icon_padding: .25rem .5rem;--_ui5-v1-21-2_token_wrapper_right_padding: .3125rem;--_ui5-v1-21-2_token_wrapper_left_padding: 0;--_ui5-v1-21-2_tl_bubble_padding: 1rem;--_ui5-v1-21-2_tl_indicator_before_bottom: -1.625rem;--_ui5-v1-21-2_tl_padding: 1rem 1rem 1rem .5rem;--_ui5-v1-21-2_tl_li_margin_bottom: 1.625rem;--_ui5-v1-21-2_switch_focus_width_size_horizon_exp: calc(100% + 4px) ;--_ui5-v1-21-2_switch_focus_height_size_horizon_exp: calc(100% + 4px) ;--_ui5-v1-21-2_tc_item_text: 3rem;--_ui5-v1-21-2_tc_item_height: 4.75rem;--_ui5-v1-21-2_tc_item_text_only_height: 2.75rem;--_ui5-v1-21-2_tc_item_text_only_with_additional_text_height: 3.75rem;--_ui5-v1-21-2_tc_item_text_line_height: 1.325rem;--_ui5-v1-21-2_tc_item_icon_circle_size: 2.75rem;--_ui5-v1-21-2_tc_item_icon_size: 1.25rem;--_ui5-v1-21-2_tc_item_add_text_margin_top: .375rem;--_ui5-v1-21-2_textarea_margin: .25rem 0;--_ui5-v1-21-2_radio_button_height: 2.75rem;--_ui5-v1-21-2_radio_button_label_side_padding: .875rem;--_ui5-v1-21-2_radio_button_inner_size: 2.75rem;--_ui5-v1-21-2_radio_button_svg_size: 1.375rem;--_ui5-v1-21-2-responsive_popover_header_height: 2.75rem;--ui5-v1-21-2_side_navigation_item_height: 2.75rem;--_ui5-v1-21-2_load_more_text_height: 2.75rem;--_ui5-v1-21-2_load_more_text_font_size: var(--sapFontMediumSize);--_ui5-v1-21-2_load_more_desc_padding: .375rem 2rem .875rem 2rem;--ui5-v1-21-2_table_header_row_height: 2.75rem;--ui5-v1-21-2_table_row_height: 2.75rem;--ui5-v1-21-2_table_focus_outline_offset: -.125rem;--ui5-v1-21-2_table_group_row_height: 2rem;--_ui5-v1-21-2-tree-indent-step: 1.5rem;--_ui5-v1-21-2-tree-toggle-box-width: 2.75rem;--_ui5-v1-21-2-tree-toggle-box-height: 2.25rem;--_ui5-v1-21-2-tree-toggle-icon-size: 1.0625rem;--_ui5-v1-21-2_timeline_tli_indicator_before_bottom: -1.625rem;--_ui5-v1-21-2_timeline_tli_indicator_before_right: -1.625rem;--_ui5-v1-21-2_timeline_tli_indicator_before_without_icon_bottom: -1.875rem;--_ui5-v1-21-2_timeline_tli_indicator_before_without_icon_right: -1.9375rem;--_ui5-v1-21-2-toolbar-separator-height: 2rem;--_ui5-v1-21-2-toolbar-height: 2.75rem;--_ui5-v1-21-2_toolbar_overflow_padding: .25rem .5rem;--_ui5-v1-21-2_split_button_middle_separator_top: .625rem;--_ui5-v1-21-2_split_button_middle_separator_height: 1rem;--_ui5-v1-21-2_color-palette-item-height: 1.75rem;--_ui5-v1-21-2_color-palette-item-hover-height: 2.25rem;--_ui5-v1-21-2_color-palette-item-margin: calc(((var(--_ui5-v1-21-2_color-palette-item-hover-height) - var(--_ui5-v1-21-2_color-palette-item-height)) / 2) + .0625rem);--_ui5-v1-21-2_color-palette-row-width: 12rem;--_ui5-v1-21-2_textarea_padding_top: .5rem;--_ui5-v1-21-2_textarea_padding_bottom: .4375rem}[data-ui5-compact-size],.ui5-content-density-compact,.sapUiSizeCompact{--_ui5-v1-21-2_input_min_width: 2rem;--_ui5-v1-21-2_input_icon_width: 2rem;--_ui5-v1-21-2_input_information_icon_padding: .3125rem .5rem .1875rem .5rem;--_ui5-v1-21-2_input_information_focused_icon_padding: .3125rem .5rem .25rem .5rem;--_ui5-v1-21-2_input_error_warning_icon_padding: .3125rem .5rem .1875rem .5rem;--_ui5-v1-21-2_input_error_warning_focused_icon_padding: .3125rem .5rem .25rem .5rem;--_ui5-v1-21-2_input_custom_icon_padding: .3125rem .5rem .25rem .5rem;--_ui5-v1-21-2_input_error_warning_custom_icon_padding: .3125rem .5rem .1875rem .5rem;--_ui5-v1-21-2_input_error_warning_custom_focused_icon_padding: .3125rem .5rem .25rem .5rem;--_ui5-v1-21-2_input_information_custom_icon_padding: .3125rem .5rem .1875rem .5rem;--_ui5-v1-21-2_input_information_custom_focused_icon_padding: .3125rem .5rem .25rem .5rem;--_ui5-v1-21-2_input_icon_padding: .3125rem .5rem .25rem .5rem;--_ui5-v1-21-2_panel_header_button_wrapper_padding: .1875rem .25rem;--_ui5-v1-21-2_rating_indicator_item_height: .67em;--_ui5-v1-21-2_rating_indicator_item_width: .67em;--_ui5-v1-21-2_rating_indicator_component_spacing: .8125rem 0px;--_ui5-v1-21-2_rating_indicator_readonly_item_height: .5em;--_ui5-v1-21-2_rating_indicator_readonly_item_width: .5em;--_ui5-v1-21-2_rating_indicator_readonly_item_spacing: .125rem .125rem;--_ui5-v1-21-2_radio_button_min_width: 2rem;--_ui5-v1-21-2_radio_button_outer_ring_padding_with_label: 0 .5rem;--_ui5-v1-21-2_radio_button_outer_ring_padding: 0 .5rem;--_ui5-v1-21-2_radio_button_focus_dist: .1875rem;--_ui5-v1-21-2_switch_height: 2rem;--_ui5-v1-21-2_switch_width: 3rem;--_ui5-v1-21-2_switch_min_width: none;--_ui5-v1-21-2_switch_with_label_width: 3.75rem;--_ui5-v1-21-2_switch_root_outline_top: .25rem;--_ui5-v1-21-2_switch_root_outline_bottom: .25rem;--_ui5-v1-21-2_switch_transform: translateX(100%) translateX(-1.375rem);--_ui5-v1-21-2_switch_transform_with_label: translateX(100%) translateX(-1.875rem);--_ui5-v1-21-2_switch_rtl_transform: translateX(1.375rem) translateX(-100%);--_ui5-v1-21-2_switch_rtl_transform_with_label: translateX(1.875rem) translateX(-100%);--_ui5-v1-21-2_switch_track_width: 2rem;--_ui5-v1-21-2_switch_track_height: 1.25rem;--_ui5-v1-21-2_switch_track_with_label_width: 2.75rem;--_ui5-v1-21-2_switch_track_with_label_height: 1.25rem;--_ui5-v1-21-2_switch_handle_width: 1.25rem;--_ui5-v1-21-2_switch_handle_height: 1rem;--_ui5-v1-21-2_switch_handle_with_label_width: 1.75rem;--_ui5-v1-21-2_switch_handle_with_label_height: 1rem;--_ui5-v1-21-2_switch_text_font_size: var(--sapFontSize);--_ui5-v1-21-2_switch_text_width: 1rem;--_ui5-v1-21-2_switch_text_active_left: .1875rem;--_ui5-v1-21-2_textarea_padding_right_and_left_readonly: .4375rem;--_ui5-v1-21-2_textarea_padding_top_readonly: .125rem;--_ui5-v1-21-2_textarea_exceeded_text_height: .375rem;--_ui5-v1-21-2_textarea_min_height: 1.625rem;--_ui5-v1-21-2_textarea_padding_bottom_readonly: .0625rem;--_ui5-v1-21-2_textarea_padding_top_error_warning: .1875rem;--_ui5-v1-21-2_textarea_padding_bottom_error_warning: .125rem;--_ui5-v1-21-2_textarea_padding_top_information: .1875rem;--_ui5-v1-21-2_textarea_padding_bottom_information: .125rem;--_ui5-v1-21-2_textarea_padding_right_and_left: .5rem;--_ui5-v1-21-2_textarea_padding_right_and_left_error_warning: .5rem;--_ui5-v1-21-2_textarea_padding_right_and_left_information: .5rem;--_ui5-v1-21-2_token_selected_focused_offset_bottom: -.25rem;--_ui5-v1-21-2_tokenizer-popover_offset: .1875rem;--_ui5-v1-21-2_slider_handle_icon_size: .875rem;--_ui5-v1-21-2_slider_padding: 1rem 1.0625rem;--_ui5-v1-21-2_range_slider_progress_focus_width: calc(100% + var(--_ui5-v1-21-2_slider_handle_width) + 10px);--_ui5-v1-21-2_range_slider_progress_focus_height: calc(var(--_ui5-v1-21-2_slider_handle_height) + 10px);--_ui5-v1-21-2_range_slider_progress_focus_top: -.8125rem;--_ui5-v1-21-2_slider_tooltip_bottom: 1.75rem;--_ui5-v1-21-2_slider_handle_focused_tooltip_distance: calc(var(--_ui5-v1-21-2_slider_tooltip_bottom) - var(--_ui5-v1-21-2_slider_handle_focus_width));--_ui5-v1-21-2_range_slider_progress_focus_left: calc(-1 * (var(--_ui5-v1-21-2_slider_handle_width) / 2) - 5px);--_ui5-v1-21-2_button_base_height: var(--sapElement_Compact_Height);--_ui5-v1-21-2_button_base_padding: .4375rem;--_ui5-v1-21-2_button_base_min_width: 2rem;--_ui5-v1-21-2_button_icon_font_size: 1rem;--_ui5-v1-21-2_calendar_height: 18rem;--_ui5-v1-21-2_calendar_width: 17.75rem;--_ui5-v1-21-2_calendar_left_right_padding: .25rem;--_ui5-v1-21-2_calendar_top_bottom_padding: .5rem;--_ui5-v1-21-2_calendar_header_height: 2rem;--_ui5-v1-21-2_calendar_header_arrow_button_width: 2rem;--_ui5-v1-21-2_calendar_header_padding: 0;--_ui5-v1-21-2_checkbox_root_side_padding: var(--_ui5-v1-21-2_checkbox_wrapped_focus_padding);--_ui5-v1-21-2_checkbox_wrapped_content_margin_top: var(--_ui5-v1-21-2_checkbox_compact_wrapped_label_margin_top);--_ui5-v1-21-2_checkbox_wrapped_focus_left_top_bottom_position: var(--_ui5-v1-21-2_checkbox_compact_focus_position);--_ui5-v1-21-2_checkbox_width_height: var(--_ui5-v1-21-2_checkbox_compact_width_height);--_ui5-v1-21-2_checkbox_wrapper_padding: var(--_ui5-v1-21-2_checkbox_compact_wrapper_padding);--_ui5-v1-21-2_checkbox_inner_width_height: var(--_ui5-v1-21-2_checkbox_compact_inner_size);--_ui5-v1-21-2_checkbox_icon_size: .75rem;--_ui5-v1-21-2_checkbox_partially_icon_size: .5rem;--_ui5-v1-21-2_custom_list_item_rb_min_width: 2rem;--_ui5-v1-21-2_daypicker_weeknumbers_container_padding_top: 2rem;--_ui5-v1-21-2_day_picker_item_width: 2rem;--_ui5-v1-21-2_day_picker_item_height: 2rem;--_ui5-v1-21-2_day_picker_empty_height: 2.125rem;--_ui5-v1-21-2_day_picker_item_justify_content: flex-end;--_ui5-v1-21-2_dp_two_calendar_item_now_text_padding_top: 0rem;--_ui5-v1-21-2_dp_two_calendar_item_primary_text_height: 1rem;--_ui5-v1-21-2_dp_two_calendar_item_secondary_text_height: .75rem;--_ui5-v1-21-2_dp_two_calendar_item_text_padding_top: 0;--_ui5-v1-21-2_datetime_picker_height: 17rem;--_ui5-v1-21-2_datetime_picker_width: 34.0625rem;--_ui5-v1-21-2_datetime_timeview_width: 17rem;--_ui5-v1-21-2_datetime_timeview_phonemode_width: 18.5rem;--_ui5-v1-21-2_datetime_timeview_padding: .5rem;--_ui5-v1-21-2_dialog_content_min_height: 2.5rem;--_ui5-v1-21-2_dialog_footer_height: 2.5rem;--_ui5-v1-21-2_input_height: var(--sapElement_Compact_Height);--_ui5-v1-21-2_input_inner_padding: 0 .5rem;--_ui5-v1-21-2_input_inner_padding_with_icon: 0 .2rem 0 .5rem;--_ui5-v1-21-2_input_inner_space_to_tokenizer: .125rem;--_ui5-v1-21-2_input_inner_space_to_n_more_text: .125rem;--_ui5-v1-21-2_input_icon_min_width: var(--_ui5-v1-21-2_input_compact_min_width);--_ui5-v1-21-2_menu_item_padding: 0 .75rem 0 .5rem;--_ui5-v1-21-2_menu_item_submenu_icon_right: .75rem;--_ui5-v1-21-2-notification-overflow-popover-padding: .25rem .5rem;--_ui5-v1-21-2_popup_default_header_height: 2.5rem;--_ui5-v1-21-2_textarea_margin: .1875rem 0;--_ui5-v1-21-2_list_no_data_height: 2rem;--_ui5-v1-21-2_list_item_cb_margin_right: .5rem;--_ui5-v1-21-2_list_item_title_size: var(--sapFontSize);--_ui5-v1-21-2_list_item_img_top_margin: .55rem;--_ui5-v1-21-2_list_no_data_font_size: var(--sapFontSize);--_ui5-v1-21-2_list_item_dropdown_base_height: 2rem;--_ui5-v1-21-2_list_item_base_height: 2rem;--_ui5-v1-21-2_list_item_icon_size: 1rem;--_ui5-v1-21-2_list_item_selection_btn_margin_top: calc(-1 * var(--_ui5-v1-21-2_checkbox_wrapper_padding));--_ui5-v1-21-2_list_item_content_vertical_offset: calc((var(--_ui5-v1-21-2_list_item_base_height) - var(--_ui5-v1-21-2_list_item_title_size)) / 2);--_ui5-v1-21-2_list_busy_row_height: 2rem;--_ui5-v1-21-2_list_buttons_left_space: .125rem;--_ui5-v1-21-2_month_picker_item_height: 2rem;--_ui5-v1-21-2_year_picker_item_height: 2rem;--_ui5-v1-21-2_panel_header_height: 2rem;--_ui5-v1-21-2_panel_button_root_height: 2rem;--_ui5-v1-21-2_panel_button_root_width: 2.5rem;--_ui5-v1-21-2_token_height: 1.25rem;--_ui5-v1-21-2_token_right_margin: .25rem;--_ui5-v1-21-2_token_left_padding: .25rem;--_ui5-v1-21-2_token_readonly_padding: .125rem .25rem;--_ui5-v1-21-2_token_focus_offset: -.125rem;--_ui5-v1-21-2_token_icon_size: .75rem;--_ui5-v1-21-2_token_icon_padding: .125rem .25rem;--_ui5-v1-21-2_token_wrapper_right_padding: .25rem;--_ui5-v1-21-2_token_wrapper_left_padding: 0;--_ui5-v1-21-2_token_outline_offset: -.125rem;--_ui5-v1-21-2_tl_bubble_padding: .5rem;--_ui5-v1-21-2_tl_indicator_before_bottom: -.5rem;--_ui5-v1-21-2_tl_padding: .5rem;--_ui5-v1-21-2_tl_li_margin_bottom: .5rem;--_ui5-v1-21-2_wheelslider_item_width: 64px;--_ui5-v1-21-2_wheelslider_item_height: 32px;--_ui5-v1-21-2_wheelslider_height: 224px;--_ui5-v1-21-2_wheelslider_selection_frame_margin_top: calc(var(--_ui5-v1-21-2_wheelslider_item_height) * 2);--_ui5-v1-21-2_wheelslider_arrows_visibility: visible;--_ui5-v1-21-2_wheelslider_mobile_selection_frame_margin_top: 128px;--_ui5-v1-21-2_tc_item_text: 2rem;--_ui5-v1-21-2_tc_item_text_line_height: 1.325rem;--_ui5-v1-21-2_tc_item_add_text_margin_top: .3125rem;--_ui5-v1-21-2_tc_item_height: 4rem;--_ui5-v1-21-2_tc_header_height: var(--_ui5-v1-21-2_tc_item_height);--_ui5-v1-21-2_tc_item_icon_circle_size: 2rem;--_ui5-v1-21-2_tc_item_icon_size: 1rem;--_ui5-v1-21-2_radio_button_height: 2rem;--_ui5-v1-21-2_radio_button_label_side_padding: .5rem;--_ui5-v1-21-2_radio_button_inner_size: 2rem;--_ui5-v1-21-2_radio_button_svg_size: 1rem;--_ui5-v1-21-2-responsive_popover_header_height: 2.5rem;--ui5-v1-21-2_side_navigation_item_height: 2rem;--_ui5-v1-21-2_slider_handle_height: 1.25rem;--_ui5-v1-21-2_slider_handle_width: 1.25rem;--_ui5-v1-21-2_slider_tooltip_padding: .25rem;--_ui5-v1-21-2_slider_progress_outline_offset: -.625rem;--_ui5-v1-21-2_slider_outer_height: 1.3125rem;--_ui5-v1-21-2_step_input_min_width: 6rem;--_ui5-v1-21-2_step_input_padding: 2rem;--_ui5-v1-21-2_load_more_text_height: 2.625rem;--_ui5-v1-21-2_load_more_text_font_size: var(--sapFontSize);--_ui5-v1-21-2_load_more_desc_padding: 0 2rem .875rem 2rem;--ui5-v1-21-2_table_header_row_height: 2rem;--ui5-v1-21-2_table_row_height: 2rem;--_ui5-v1-21-2-tree-indent-step: .5rem;--_ui5-v1-21-2-tree-toggle-box-width: 2rem;--_ui5-v1-21-2-tree-toggle-box-height: 1.5rem;--_ui5-v1-21-2-tree-toggle-icon-size: .8125rem;--_ui5-v1-21-2_timeline_tli_indicator_before_bottom: -.5rem;--_ui5-v1-21-2_timeline_tli_indicator_before_right: -.5rem;--_ui5-v1-21-2_timeline_tli_indicator_before_without_icon_bottom: -.75rem;--_ui5-v1-21-2_timeline_tli_indicator_before_without_icon_right: -.8125rem;--_ui5-v1-21-2_vsd_header_container: 2.5rem;--_ui5-v1-21-2_vsd_sub_header_container_height: 2rem;--_ui5-v1-21-2_vsd_header_height: 4rem;--_ui5-v1-21-2_vsd_expand_content_height: 25.4375rem;--_ui5-v1-21-2-toolbar-separator-height: 1.5rem;--_ui5-v1-21-2-toolbar-height: 2rem;--_ui5-v1-21-2_toolbar_overflow_padding: .1875rem .375rem;--_ui5-v1-21-2_textarea_padding_top: .1875rem;--_ui5-v1-21-2_textarea_padding_bottom: .125rem;--_ui5-v1-21-2_checkbox_focus_position: .25rem;--_ui5-v1-21-2_split_button_middle_separator_top: .3125rem;--_ui5-v1-21-2_split_button_middle_separator_height: 1rem;--_ui5-v1-21-2_slider_handle_top: -.5rem;--_ui5-v1-21-2_slider_tooltip_height: 1.375rem;--_ui5-v1-21-2_color-palette-item-height: 1.25rem;--_ui5-v1-21-2_color-palette-item-focus-height: 1rem;--_ui5-v1-21-2_color-palette-item-container-sides-padding: .1875rem;--_ui5-v1-21-2_color-palette-item-container-rows-padding: .8125rem;--_ui5-v1-21-2_color-palette-item-hover-height: 1.625rem;--_ui5-v1-21-2_color-palette-item-margin: calc(((var(--_ui5-v1-21-2_color-palette-item-hover-height) - var(--_ui5-v1-21-2_color-palette-item-height)) / 2) + .0625rem);--_ui5-v1-21-2_color-palette-row-width: 8.75rem;--_ui5-v1-21-2_color-palette-swatch-container-padding: .1875rem .5rem;--_ui5-v1-21-2_color-palette-item-hover-margin: .0625rem;--_ui5-v1-21-2_color-palette-row-height: 7.5rem;--_ui5-v1-21-2_color-palette-button-height: 2rem;--_ui5-v1-21-2_color-palette-item-before-focus-offset: -.25rem;--_ui5-v1-21-2_color-palette-item-after-focus-offset: -.125rem;--_ui5-v1-21-2_color_picker_slider_container_margin_top: -9px}[dir=rtl]{--_ui5-v1-21-2_progress_indicator_bar_border_radius: .5rem;--_ui5-v1-21-2_icon_transform_scale: scale(-1, 1);--_ui5-v1-21-2_panel_toggle_btn_rotation: var(--_ui5-v1-21-2_rotation_minus_90deg);--_ui5-v1-21-2_li_notification_group_toggle_btn_rotation: var(--_ui5-v1-21-2_rotation_minus_90deg);--_ui5-v1-21-2_timeline_scroll_container_offset: -.5rem;--_ui5-v1-21-2_popover_upward_arrow_margin: .1875rem .125rem 0 0;--_ui5-v1-21-2_popover_right_arrow_margin: .1875rem .25rem 0 0;--_ui5-v1-21-2_popover_downward_arrow_margin: -.4375rem .125rem 0 0;--_ui5-v1-21-2_popover_left_arrow_margin: .1875rem -.375rem 0 0;--_ui5-v1-21-2_dialog_resize_cursor:sw-resize;--_ui5-v1-21-2_progress_indicator_bar_border_radius: 0 .5rem .5rem 0;--_ui5-v1-21-2_progress_indicator_remaining_bar_border_radius: .5rem 0 0 .5rem;--_ui5-v1-21-2_menu_submenu_margin_offset: 0 -.25rem;--_ui5-v1-21-2_menu_submenu_placement_type_left_margin_offset: 0 .25rem;--_ui5-v1-21-2-menu_item_icon_float: left;--_ui5-v1-21-2-shellbar-notification-btn-count-offset: auto;--_ui5-v1-21-2_split_text_button_hover_border_left: none;--_ui5-v1-21-2_split_text_button_emphasized_hover_border_left: none;--_ui5-v1-21-2_split_text_button_positive_hover_border_left: none;--_ui5-v1-21-2_split_text_button_negative_hover_border_left: none;--_ui5-v1-21-2_split_text_button_attention_hover_border_left: none;--_ui5-v1-21-2_split_text_button_transparent_hover_border_left: none;--_ui5-v1-21-2_split_text_button_hover_border_right: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-21-2_split_text_button_emphasized_hover_border_right: var(--sapButton_BorderWidth) solid var(--sapButton_Emphasized_BorderColor);--_ui5-v1-21-2_split_text_button_positive_hover_border_right: var(--sapButton_BorderWidth) solid var(--sapButton_Accept_BorderColor);--_ui5-v1-21-2_split_text_button_negative_hover_border_right: var(--sapButton_BorderWidth) solid var(--sapButton_Reject_BorderColor);--_ui5-v1-21-2_split_text_button_attention_hover_border_right: var(--sapButton_BorderWidth) solid var(--sapButton_Attention_BorderColor);--_ui5-v1-21-2_split_text_button_transparent_hover_border_right: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-21-2_segmented_btn_item_border_left: .0625rem;--_ui5-v1-21-2_segmented_btn_item_border_right: .0625rem}:root,[dir=ltr]{--_ui5-v1-21-2_rotation_90deg: rotate(90deg);--_ui5-v1-21-2_rotation_minus_90deg: rotate(-90deg);--_ui5-v1-21-2_icon_transform_scale: none;--_ui5-v1-21-2_panel_toggle_btn_rotation: var(--_ui5-v1-21-2_rotation_90deg);--_ui5-v1-21-2_li_notification_group_toggle_btn_rotation: var(--_ui5-v1-21-2_rotation_90deg);--_ui5-v1-21-2_timeline_scroll_container_offset: .5rem;--_ui5-v1-21-2_popover_upward_arrow_margin: .1875rem 0 0 .1875rem;--_ui5-v1-21-2_popover_right_arrow_margin: .1875rem 0 0 -.375rem;--_ui5-v1-21-2_popover_downward_arrow_margin: -.375rem 0 0 .125rem;--_ui5-v1-21-2_popover_left_arrow_margin: .125rem 0 0 .25rem;--_ui5-v1-21-2_dialog_resize_cursor: se-resize;--_ui5-v1-21-2_progress_indicator_bar_border_radius: .5rem 0 0 .5rem;--_ui5-v1-21-2_progress_indicator_remaining_bar_border_radius: 0 .5rem .5rem 0;--_ui5-v1-21-2_menu_submenu_margin_offset: -.25rem 0;--_ui5-v1-21-2_menu_submenu_placement_type_left_margin_offset: .25rem 0;--_ui5-v1-21-2-menu_item_icon_float: right;--_ui5-v1-21-2-shellbar-notification-btn-count-offset: -.125rem}
` };
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$3);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$2);
const styleData$1 = { packageName: "@ui5/webcomponents", fileName: "themes/Icon.css.ts", content: `:host{-webkit-tap-highlight-color:rgba(0,0,0,0)}:host([hidden]){display:none}:host([invalid]){display:none}:host(:not([hidden]).ui5_hovered){opacity:.7}:host{display:inline-block;width:1rem;height:1rem;color:var(--sapContent_NonInteractiveIconColor);fill:currentColor;outline:none}:host([design="Contrast"]){color:var(--sapContent_ContrastIconColor)}:host([design="Critical"]){color:var(--sapCriticalElementColor)}:host([design="Default"]){color:var(--sapContent_IconColor)}:host([design="Information"]){color:var(--sapInformativeElementColor)}:host([design="Negative"]){color:var(--sapNegativeElementColor)}:host([design="Neutral"]){color:var(--sapNeutralElementColor)}:host([design="NonInteractive"]){color:var(--sapContent_NonInteractiveIconColor)}:host([design="Positive"]){color:var(--sapPositiveElementColor)}:host([interactive][focused]) .ui5-icon-root{outline:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);border-radius:var(--ui5-v1-21-2-icon-focus-border-radius)}.ui5-icon-root{display:flex;height:100%;width:100%;outline:none;vertical-align:top}:host([interactive]){cursor:pointer}.ui5-icon-root:not([dir=ltr]){transform:var(--_ui5-v1-21-2_icon_transform_scale);transform-origin:center}
` };
var __decorate$1 = function(decorators, target, key, desc) {
  var c2 = arguments.length, r2 = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d2;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r2 = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i2 = decorators.length - 1; i2 >= 0; i2--)
      if (d2 = decorators[i2])
        r2 = (c2 < 3 ? d2(r2) : c2 > 3 ? d2(target, key, r2) : d2(target, key)) || r2;
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
__decorate$1([
  property({ type: IconDesign$1, defaultValue: IconDesign$1.Default })
], Icon.prototype, "design", void 0);
__decorate$1([
  property({ type: Boolean })
], Icon.prototype, "interactive", void 0);
__decorate$1([
  property()
], Icon.prototype, "name", void 0);
__decorate$1([
  property()
], Icon.prototype, "accessibleName", void 0);
__decorate$1([
  property({ type: Boolean })
], Icon.prototype, "showTooltip", void 0);
__decorate$1([
  property()
], Icon.prototype, "accessibleRole", void 0);
__decorate$1([
  property()
], Icon.prototype, "ariaHidden", void 0);
__decorate$1([
  property({ multiple: true })
], Icon.prototype, "pathData", void 0);
__decorate$1([
  property({ type: Object, defaultValue: void 0, noAttribute: true })
], Icon.prototype, "accData", void 0);
__decorate$1([
  property({ type: Boolean })
], Icon.prototype, "focused", void 0);
__decorate$1([
  property({ type: Boolean })
], Icon.prototype, "invalid", void 0);
__decorate$1([
  property({ noAttribute: true, defaultValue: void 0 })
], Icon.prototype, "effectiveAccessibleName", void 0);
Icon = __decorate$1([
  customElement({
    tag: "ui5-icon",
    languageAware: true,
    themeAware: true,
    renderer: litRender,
    template: block0,
    styles: styleData$1
  }),
  event("click")
], Icon);
Icon.define();
const Icon$1 = Icon;
const AVATAR_TOOLTIP = { key: "AVATAR_TOOLTIP", defaultText: "Avatar" };
const BREADCRUMB_ITEM_POS = { key: "BREADCRUMB_ITEM_POS", defaultText: "{0} of {1}" };
const BREADCRUMBS_ARIA_LABEL = { key: "BREADCRUMBS_ARIA_LABEL", defaultText: "Breadcrumb Trail" };
const BREADCRUMBS_OVERFLOW_ARIA_LABEL = { key: "BREADCRUMBS_OVERFLOW_ARIA_LABEL", defaultText: "More" };
const BREADCRUMBS_CANCEL_BUTTON = { key: "BREADCRUMBS_CANCEL_BUTTON", defaultText: "Cancel" };
const BUSY_INDICATOR_TITLE = { key: "BUSY_INDICATOR_TITLE", defaultText: "Please wait" };
const BUTTON_ARIA_TYPE_ACCEPT = { key: "BUTTON_ARIA_TYPE_ACCEPT", defaultText: "Positive Action" };
const BUTTON_ARIA_TYPE_REJECT = { key: "BUTTON_ARIA_TYPE_REJECT", defaultText: "Negative Action" };
const BUTTON_ARIA_TYPE_EMPHASIZED = { key: "BUTTON_ARIA_TYPE_EMPHASIZED", defaultText: "Emphasized" };
const DELETE = { key: "DELETE", defaultText: "Delete" };
const LINK_SUBTLE = { key: "LINK_SUBTLE", defaultText: "Subtle" };
const LINK_EMPHASIZED = { key: "LINK_EMPHASIZED", defaultText: "Emphasized" };
const LIST_ITEM_SELECTED = { key: "LIST_ITEM_SELECTED", defaultText: "Selected" };
const LIST_ITEM_NOT_SELECTED = { key: "LIST_ITEM_NOT_SELECTED", defaultText: "Not Selected" };
const ARIA_LABEL_LIST_ITEM_CHECKBOX = { key: "ARIA_LABEL_LIST_ITEM_CHECKBOX", defaultText: "Multiple Selection mode." };
const ARIA_LABEL_LIST_ITEM_RADIO_BUTTON = { key: "ARIA_LABEL_LIST_ITEM_RADIO_BUTTON", defaultText: "Item Selection." };
const ARIA_LABEL_LIST_SELECTABLE = { key: "ARIA_LABEL_LIST_SELECTABLE", defaultText: "Contains Selectable Items" };
const ARIA_LABEL_LIST_MULTISELECTABLE = { key: "ARIA_LABEL_LIST_MULTISELECTABLE", defaultText: "Contains Multi-Selectable Items" };
const ARIA_LABEL_LIST_DELETABLE = { key: "ARIA_LABEL_LIST_DELETABLE", defaultText: "Contains Deletable Items" };
const RADIO_BUTTON_GROUP_REQUIRED = { key: "RADIO_BUTTON_GROUP_REQUIRED", defaultText: "Select one of the available options." };
const RESPONSIVE_POPOVER_CLOSE_DIALOG_BUTTON = { key: "RESPONSIVE_POPOVER_CLOSE_DIALOG_BUTTON", defaultText: "Decline" };
const LOAD_MORE_TEXT = { key: "LOAD_MORE_TEXT", defaultText: "More" };
const VALUE_STATE_ERROR = { key: "VALUE_STATE_ERROR", defaultText: "Invalid entry" };
const VALUE_STATE_WARNING = { key: "VALUE_STATE_WARNING", defaultText: "Warning issued" };
const VALUE_STATE_INFORMATION = { key: "VALUE_STATE_INFORMATION", defaultText: "Informative entry" };
const VALUE_STATE_SUCCESS = { key: "VALUE_STATE_SUCCESS", defaultText: "Entry successfully validated" };
const DIALOG_HEADER_ARIA_ROLE_DESCRIPTION = { key: "DIALOG_HEADER_ARIA_ROLE_DESCRIPTION", defaultText: "Interactive Header" };
const DIALOG_HEADER_ARIA_DESCRIBEDBY_RESIZABLE = { key: "DIALOG_HEADER_ARIA_DESCRIBEDBY_RESIZABLE", defaultText: "Use Shift+Arrow keys to resize" };
const DIALOG_HEADER_ARIA_DESCRIBEDBY_DRAGGABLE = { key: "DIALOG_HEADER_ARIA_DESCRIBEDBY_DRAGGABLE", defaultText: "Use Arrow keys to move" };
const DIALOG_HEADER_ARIA_DESCRIBEDBY_DRAGGABLE_RESIZABLE = { key: "DIALOG_HEADER_ARIA_DESCRIBEDBY_DRAGGABLE_RESIZABLE", defaultText: "Use Arrow keys to move, Shift+Arrow keys to resize" };
const LABEL_COLON = { key: "LABEL_COLON", defaultText: ":" };
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$3);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$2);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/Button.css.ts", content: `:host{vertical-align:middle}.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host(:not([hidden])){display:inline-block}:host{min-width:var(--_ui5-v1-21-2_button_base_min_width);height:var(--_ui5-v1-21-2_button_base_height);line-height:normal;font-family:var(--_ui5-v1-21-2_button_fontFamily);font-size:var(--sapFontSize);text-shadow:var(--_ui5-v1-21-2_button_text_shadow);border-radius:var(--_ui5-v1-21-2_button_border_radius);cursor:pointer;background-color:var(--sapButton_Background);border:var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);color:var(--sapButton_TextColor);box-sizing:border-box;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ui5-button-root{min-width:inherit;cursor:inherit;height:100%;width:100%;box-sizing:border-box;display:flex;justify-content:center;align-items:center;outline:none;padding:0 var(--_ui5-v1-21-2_button_base_padding);position:relative;background:transparent;border:none;color:inherit;text-shadow:inherit;font:inherit;white-space:inherit;overflow:inherit;text-overflow:inherit;letter-spacing:inherit;word-spacing:inherit;line-height:inherit;-webkit-user-select:none;-moz-user-select:none;user-select:none}:host(:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover),:host(:not([hidden]):not([disabled]).ui5_hovered){background:var(--sapButton_Hover_Background);border:1px solid var(--sapButton_Hover_BorderColor);color:var(--sapButton_Hover_TextColor)}.ui5-button-icon{color:inherit;flex-shrink:0}:host([icon-end]) .ui5-button-root{flex-direction:row-reverse}:host([icon-end]) .ui5-button-icon{margin-inline-start:var(--_ui5-v1-21-2_button_base_icon_margin)}:host([icon-only]) .ui5-button-root{min-width:auto;padding:0}:host([icon-only]) .ui5-button-text{display:none}.ui5-button-text{outline:none;position:relative;white-space:inherit;overflow:inherit;text-overflow:inherit}:host([has-icon]:not([icon-end])) .ui5-button-text{margin-inline-start:var(--_ui5-v1-21-2_button_base_icon_margin)}:host([has-icon][icon-end]) .ui5-button-text{margin-inline-start:0}:host([disabled]){opacity:var(--sapContent_DisabledOpacity);pointer-events:unset;cursor:default}:host([has-icon]:not([icon-only])) .ui5-button-text{min-width:calc(var(--_ui5-v1-21-2_button_base_min_width) - var(--_ui5-v1-21-2_button_base_icon_margin) - 1rem)}:host([disabled]:active){pointer-events:none}:host([focused]) .ui5-button-root:after{content:"";position:absolute;box-sizing:border-box;inset:.0625rem;border:var(--_ui5-v1-21-2_button_focused_border);border-radius:var(--_ui5-v1-21-2_button_focused_border_radius)}:host([design="Emphasized"][focused]) .ui5-button-root:after{border-color:var(--_ui5-v1-21-2_button_emphasized_focused_border_color)}:host([design="Emphasized"][focused]) .ui5-button-root:before{content:"";position:absolute;box-sizing:border-box;inset:.0625rem;border:var(--_ui5-v1-21-2_button_emphasized_focused_border_before);border-radius:var(--_ui5-v1-21-2_button_focused_border_radius)}.ui5-button-root::-moz-focus-inner{border:0}bdi{display:block;white-space:inherit;overflow:inherit;text-overflow:inherit}:host([ui5-button][active]:not([disabled]):not([non-interactive])){background-image:none;background-color:var(--sapButton_Active_Background);border-color:var(--sapButton_Active_BorderColor);color:var(--sapButton_Active_TextColor)}:host([design="Positive"]){background-color:var(--sapButton_Accept_Background);border-color:var(--sapButton_Accept_BorderColor);color:var(--sapButton_Accept_TextColor)}:host([design="Positive"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover),:host([design="Positive"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]).ui5_hovered){background-color:var(--sapButton_Accept_Hover_Background);border-color:var(--sapButton_Accept_Hover_BorderColor);color:var(--sapButton_Accept_Hover_TextColor)}:host([ui5-button][design="Positive"][active]:not([non-interactive])){background-color:var(--sapButton_Accept_Active_Background);border-color:var(--sapButton_Accept_Active_BorderColor);color:var(--sapButton_Accept_Active_TextColor)}:host([design="Negative"]){background-color:var(--sapButton_Reject_Background);border-color:var(--sapButton_Reject_BorderColor);color:var(--sapButton_Reject_TextColor)}:host([design="Negative"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover),:host([design="Negative"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]).ui5_hovered){background-color:var(--sapButton_Reject_Hover_Background);border-color:var(--sapButton_Reject_Hover_BorderColor);color:var(--sapButton_Reject_Hover_TextColor)}:host([ui5-button][design="Negative"][active]:not([non-interactive])){background-color:var(--sapButton_Reject_Active_Background);border-color:var(--sapButton_Reject_Active_BorderColor);color:var(--sapButton_Reject_Active_TextColor)}:host([design="Attention"]){background-color:var(--sapButton_Attention_Background);border-color:var(--sapButton_Attention_BorderColor);color:var(--sapButton_Attention_TextColor)}:host([design="Attention"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover),:host([design="Attention"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]).ui5_hovered){background-color:var(--sapButton_Attention_Hover_Background);border-color:var(--sapButton_Attention_Hover_BorderColor);color:var(--sapButton_Attention_Hover_TextColor)}:host([ui5-button][design="Attention"][active]:not([non-interactive])){background-color:var(--sapButton_Attention_Active_Background);border-color:var(--sapButton_Attention_Active_BorderColor);color:var(--sapButton_Attention_Active_TextColor)}:host([design="Emphasized"]){background-color:var(--sapButton_Emphasized_Background);border-color:var(--sapButton_Emphasized_BorderColor);border-width:var(--_ui5-v1-21-2_button_emphasized_border_width);color:var(--sapButton_Emphasized_TextColor);font-weight:var(--sapButton_Emphasized_FontWeight)}:host([design="Emphasized"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover),:host([design="Emphasized"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]).ui5_hovered){background-color:var(--sapButton_Emphasized_Hover_Background);border-color:var(--sapButton_Emphasized_Hover_BorderColor);border-width:var(--_ui5-v1-21-2_button_emphasized_border_width);color:var(--sapButton_Emphasized_Hover_TextColor)}:host([ui5-button][design="Empasized"][active]:not([non-interactive])){background-color:var(--sapButton_Emphasized_Active_Background);border-color:var(--sapButton_Emphasized_Active_BorderColor);color:var(--sapButton_Emphasized_Active_TextColor)}:host([design="Emphasized"][focused]) .ui5-button-root:after{border-color:var(--_ui5-v1-21-2_button_emphasized_focused_border_color);outline:none}:host([design="Emphasized"][focused][active]:not([non-interactive])) .ui5-button-root:after{border-color:var(--_ui5-v1-21-2_button_emphasized_focused_active_border_color)}:host([design="Transparent"]){background-color:var(--sapButton_Lite_Background);color:var(--sapButton_Lite_TextColor);border-color:var(--sapButton_Lite_BorderColor)}:host([design="Transparent"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover),:host([design="Transparent"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]).ui5_hovered){background-color:var(--sapButton_Lite_Hover_Background);border-color:var(--sapButton_Lite_Hover_BorderColor);color:var(--sapButton_Lite_Hover_TextColor)}:host([ui5-button][design="Transparent"][active]:not([non-interactive])){background-color:var(--sapButton_Lite_Active_Background);border-color:var(--sapButton_Lite_Active_BorderColor);color:var(--sapButton_Active_TextColor)}:host([ui5-segmented-button-item][active][focused]) .ui5-button-root:after,:host([pressed][focused]) .ui5-button-root:after{border-color:var(--_ui5-v1-21-2_button_pressed_focused_border_color);outline:none}:host([ui5-segmented-button-item][focused]:not(:last-child)) .ui5-button-root:after{border-top-right-radius:var(--_ui5-v1-21-2_button_focused_inner_border_radius);border-bottom-right-radius:var(--_ui5-v1-21-2_button_focused_inner_border_radius)}:host([ui5-segmented-button-item][focused]:not(:first-child)) .ui5-button-root:after{border-top-left-radius:var(--_ui5-v1-21-2_button_focused_inner_border_radius);border-bottom-left-radius:var(--_ui5-v1-21-2_button_focused_inner_border_radius)}
` };
var __decorate = function(decorators, target, key, desc) {
  var c2 = arguments.length, r2 = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d2;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r2 = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i2 = decorators.length - 1; i2 >= 0; i2--)
      if (d2 = decorators[i2])
        r2 = (c2 < 3 ? d2(r2) : c2 > 3 ? d2(target, key, r2) : d2(target, key)) || r2;
  return c2 > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
var Button_1;
let isGlobalHandlerAttached = false;
let activeButton = null;
let Button = Button_1 = class Button2 extends UI5Element {
  constructor() {
    super();
    this._deactivate = () => {
      if (activeButton) {
        activeButton._setActiveState(false);
      }
    };
    if (!isGlobalHandlerAttached) {
      document.addEventListener("mouseup", this._deactivate);
      isGlobalHandlerAttached = true;
    }
    const handleTouchStartEvent = (e2) => {
      markEvent(e2, "button");
      if (this.nonInteractive) {
        return;
      }
      this._setActiveState(true);
    };
    this._ontouchstart = {
      handleEvent: handleTouchStartEvent,
      passive: true
    };
  }
  onEnterDOM() {
    this._isTouch = (isPhone() || isTablet()) && !isCombi();
  }
  async onBeforeRendering() {
    const formSupport = getFeature("FormSupport");
    if (this.type !== ButtonType$1.Button && !formSupport) {
      console.warn(`In order for the "type" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`);
    }
    if (this.submits && !formSupport) {
      console.warn(`In order for the "submits" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`);
    }
    this.iconOnly = this.isIconOnly;
    this.hasIcon = !!this.icon;
    this.buttonTitle = this.tooltip || await getIconAccessibleName(this.icon);
  }
  _onclick(e2) {
    var _a;
    if (this.nonInteractive) {
      return;
    }
    markEvent(e2, "button");
    const formSupport = getFeature("FormSupport");
    if (formSupport && this._isSubmit) {
      formSupport.triggerFormSubmit(this);
    }
    if (formSupport && this._isReset) {
      formSupport.triggerFormReset(this);
    }
    if (isSafari()) {
      (_a = this.getDomRef()) == null ? void 0 : _a.focus();
    }
  }
  _onmousedown(e2) {
    if (this.nonInteractive || this._isTouch) {
      return;
    }
    markEvent(e2, "button");
    this._setActiveState(true);
    activeButton = this;
  }
  _ontouchend(e2) {
    if (this.disabled) {
      e2.preventDefault();
      e2.stopPropagation();
    }
    if (this.active) {
      this._setActiveState(false);
    }
    if (activeButton) {
      activeButton._setActiveState(false);
    }
  }
  _onmouseup(e2) {
    markEvent(e2, "button");
  }
  _onkeydown(e2) {
    markEvent(e2, "button");
    if (isSpace(e2) || isEnter(e2)) {
      this._setActiveState(true);
    }
  }
  _onkeyup(e2) {
    if (isSpace(e2) || isEnter(e2)) {
      if (this.active) {
        this._setActiveState(false);
      }
    }
  }
  _onfocusout() {
    if (this.nonInteractive) {
      return;
    }
    if (this.active) {
      this._setActiveState(false);
    }
    if (isDesktop()) {
      this.focused = false;
    }
  }
  _onfocusin(e2) {
    if (this.nonInteractive) {
      return;
    }
    markEvent(e2, "button");
    if (isDesktop()) {
      this.focused = true;
    }
  }
  _setActiveState(active) {
    const eventPrevented = !this.fireEvent("_active-state-change", null, true);
    if (eventPrevented) {
      return;
    }
    this.active = active;
  }
  get hasButtonType() {
    return this.design !== ButtonDesign$1.Default && this.design !== ButtonDesign$1.Transparent;
  }
  get iconRole() {
    if (!this.icon) {
      return "";
    }
    return "presentation";
  }
  get isIconOnly() {
    return !willShowContent(this.text);
  }
  static typeTextMappings() {
    return {
      "Positive": BUTTON_ARIA_TYPE_ACCEPT,
      "Negative": BUTTON_ARIA_TYPE_REJECT,
      "Emphasized": BUTTON_ARIA_TYPE_EMPHASIZED
    };
  }
  get buttonTypeText() {
    return Button_1.i18nBundle.getText(Button_1.typeTextMappings()[this.design]);
  }
  get tabIndexValue() {
    const tabindex = this.getAttribute("tabindex");
    if (tabindex) {
      return tabindex;
    }
    return this.nonInteractive ? "-1" : this._tabIndex;
  }
  get showIconTooltip() {
    return this.iconOnly && !this.tooltip;
  }
  get ariaLabelText() {
    return getEffectiveAriaLabelText(this);
  }
  get _isSubmit() {
    return this.type === ButtonType$1.Submit || this.submits;
  }
  get _isReset() {
    return this.type === ButtonType$1.Reset;
  }
  static async onDefine() {
    Button_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
  }
};
__decorate([
  property({ type: ButtonDesign$1, defaultValue: ButtonDesign$1.Default })
], Button.prototype, "design", void 0);
__decorate([
  property({ type: Boolean })
], Button.prototype, "disabled", void 0);
__decorate([
  property()
], Button.prototype, "icon", void 0);
__decorate([
  property({ type: Boolean })
], Button.prototype, "iconEnd", void 0);
__decorate([
  property({ type: Boolean })
], Button.prototype, "submits", void 0);
__decorate([
  property()
], Button.prototype, "tooltip", void 0);
__decorate([
  property({ defaultValue: void 0 })
], Button.prototype, "accessibleName", void 0);
__decorate([
  property({ defaultValue: "" })
], Button.prototype, "accessibleNameRef", void 0);
__decorate([
  property({ type: Object })
], Button.prototype, "accessibilityAttributes", void 0);
__decorate([
  property({ type: ButtonType$1, defaultValue: ButtonType$1.Button })
], Button.prototype, "type", void 0);
__decorate([
  property({ type: Boolean })
], Button.prototype, "active", void 0);
__decorate([
  property({ type: Boolean })
], Button.prototype, "iconOnly", void 0);
__decorate([
  property({ type: Boolean })
], Button.prototype, "focused", void 0);
__decorate([
  property({ type: Boolean })
], Button.prototype, "hasIcon", void 0);
__decorate([
  property({ type: Boolean })
], Button.prototype, "nonInteractive", void 0);
__decorate([
  property({ noAttribute: true })
], Button.prototype, "buttonTitle", void 0);
__decorate([
  property({ type: Object })
], Button.prototype, "_iconSettings", void 0);
__decorate([
  property({ defaultValue: "0", noAttribute: true })
], Button.prototype, "_tabIndex", void 0);
__decorate([
  property({ type: Boolean })
], Button.prototype, "_isTouch", void 0);
__decorate([
  slot({ type: Node, "default": true })
], Button.prototype, "text", void 0);
Button = Button_1 = __decorate([
  customElement({
    tag: "ui5-button",
    languageAware: true,
    renderer: litRender,
    template: block0$1,
    styles: styleData,
    dependencies: [Icon$1]
  }),
  event("click"),
  event("_active-state-change")
], Button);
Button.define();
const Button$1 = Button;
export {
  isLeftShift as $,
  isSpace as A,
  litRender as B,
  LABEL_COLON as C,
  getSharedResource as D,
  getFeature as E,
  scopeTag as F,
  isEscape as G,
  hasStyle as H,
  createStyle as I,
  isTabPrevious as J,
  isSafari as K,
  LINK_SUBTLE as L,
  isChrome as M,
  renderFinished as N,
  isIOS as O,
  registerIcon as P,
  isLegacyThemeFamily as Q,
  DIALOG_HEADER_ARIA_ROLE_DESCRIPTION as R,
  DIALOG_HEADER_ARIA_DESCRIBEDBY_RESIZABLE as S,
  T,
  UI5Element as U,
  DIALOG_HEADER_ARIA_DESCRIBEDBY_DRAGGABLE as V,
  DIALOG_HEADER_ARIA_DESCRIBEDBY_DRAGGABLE_RESIZABLE as W,
  isPhone as X,
  isDesktop as Y,
  isUpShift as Z,
  isDownShift as _,
  isLeft as a,
  isRightShift as a0,
  Icon$1 as a1,
  Button$1 as a2,
  RESPONSIVE_POPOVER_CLOSE_DIALOG_BUTTON as a3,
  isTabNext as a4,
  BUSY_INDICATOR_TITLE as a5,
  VALUE_STATE_ERROR as a6,
  VALUE_STATE_WARNING as a7,
  VALUE_STATE_SUCCESS as a8,
  effectiveSvg as a9,
  VALUE_STATE_INFORMATION as aa,
  RADIO_BUTTON_GROUP_REQUIRED as ab,
  ARIA_LABEL_LIST_MULTISELECTABLE as ac,
  ARIA_LABEL_LIST_SELECTABLE as ad,
  ARIA_LABEL_LIST_DELETABLE as ae,
  LOAD_MORE_TEXT as af,
  isDelete as ag,
  getEventMark as ah,
  LIST_ITEM_SELECTED as ai,
  LIST_ITEM_NOT_SELECTED as aj,
  DELETE as ak,
  ARIA_LABEL_LIST_ITEM_CHECKBOX as al,
  ARIA_LABEL_LIST_ITEM_RADIO_BUTTON as am,
  AVATAR_TOOLTIP as an,
  c as ao,
  isShow as ap,
  BREADCRUMB_ITEM_POS as aq,
  BREADCRUMBS_ARIA_LABEL as ar,
  BREADCRUMBS_OVERFLOW_ARIA_LABEL as as,
  BREADCRUMBS_CANCEL_BUTTON as at,
  isRight as b,
  isUp as c,
  isDown as d,
  e$1 as e,
  isHome as f,
  isEnd as g,
  isPageUp as h,
  i,
  isPageDown as j,
  instanceOfUI5Element as k,
  customElement as l,
  effectiveHtml as m,
  l as n,
  styleData$3 as o,
  property as p,
  styleData$2 as q,
  registerThemePropertiesLoader as r,
  slot as s,
  t,
  event as u,
  getEffectiveAriaLabelText as v,
  LINK_EMPHASIZED as w,
  getI18nBundle as x,
  markEvent as y,
  isEnter as z
};
