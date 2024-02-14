var ct = {}, _t = ct.hasOwnProperty, Zt = ct.toString, ft = _t.toString, Xt = ft.call(Object), De = function(t) {
  var e, o;
  return !t || Zt.call(t) !== "[object Object]" ? !1 : (e = Object.getPrototypeOf(t), e ? (o = _t.call(e, "constructor") && e.constructor, typeof o == "function" && ft.call(o) === Xt) : !0);
}, Jt = /* @__PURE__ */ Object.create(null), ut = function(t, e, o, r) {
  var a, n, s, i, l, c, _ = arguments[2] || {}, d = 3, u = arguments.length, f = arguments[0] || !1, B = arguments[1] ? void 0 : Jt;
  for (typeof _ != "object" && typeof _ != "function" && (_ = {}); d < u; d++)
    if ((l = arguments[d]) != null)
      for (i in l)
        a = _[i], s = l[i], !(i === "__proto__" || _ === s) && (f && s && (De(s) || (n = Array.isArray(s))) ? (n ? (n = !1, c = a && Array.isArray(a) ? a : []) : c = a && De(a) ? a : {}, _[i] = ut(f, arguments[1], c, s)) : s !== B && (_[i] = s));
  return _;
};
const Me = function(t, e) {
  return ut(!0, !1, ...arguments);
}, Kt = () => new Promise((t) => {
  document.body ? t() : document.addEventListener("DOMContentLoaded", () => {
    t();
  });
});
class x {
  constructor() {
    this._eventRegistry = /* @__PURE__ */ new Map();
  }
  attachEvent(e, o) {
    const r = this._eventRegistry, a = r.get(e);
    if (!Array.isArray(a)) {
      r.set(e, [o]);
      return;
    }
    a.includes(o) || a.push(o);
  }
  detachEvent(e, o) {
    const r = this._eventRegistry, a = r.get(e);
    if (!a)
      return;
    const n = a.indexOf(o);
    n !== -1 && a.splice(n, 1), a.length === 0 && r.delete(e);
  }
  /**
   * Fires an event and returns the results of all event listeners as an array.
   *
   * @param eventName the event to fire
   * @param data optional data to pass to each event listener
   * @returns {Array} an array with the results of all event listeners
   */
  fireEvent(e, o) {
    const a = this._eventRegistry.get(e);
    return a ? a.map((n) => n.call(this, o)) : [];
  }
  /**
   * Fires an event and returns a promise that will resolve once all listeners have resolved.
   *
   * @param eventName the event to fire
   * @param data optional data to pass to each event listener
   * @returns {Promise} a promise that will resolve when all listeners have resolved
   */
  fireEventAsync(e, o) {
    return Promise.all(this.fireEvent(e, o));
  }
  isHandlerAttached(e, o) {
    const a = this._eventRegistry.get(e);
    return a ? a.includes(o) : !1;
  }
  hasListeners(e) {
    return !!this._eventRegistry.get(e);
  }
}
const Yt = (t, e) => {
  const o = document.createElement("style");
  return o.type = "text/css", e && Object.entries(e).forEach((r) => o.setAttribute(...r)), o.textContent = t, document.head.appendChild(o), o;
}, Qt = (t, e) => {
  const o = document.createElement("link");
  return o.type = "text/css", o.rel = "stylesheet", e && Object.entries(e).forEach((r) => o.setAttribute(...r)), o.href = t, document.head.appendChild(o), new Promise((r) => {
    o.addEventListener("load", r), o.addEventListener("error", r);
  });
}, C = typeof document > "u", g = {
  get userAgent() {
    return C ? "" : navigator.userAgent;
  },
  get touch() {
    return C ? !1 : "ontouchstart" in window || navigator.maxTouchPoints > 0;
  },
  get ie() {
    return C ? !1 : /(msie|trident)/i.test(g.userAgent);
  },
  get chrome() {
    return C ? !1 : !g.ie && /(Chrome|CriOS)/.test(g.userAgent);
  },
  get firefox() {
    return C ? !1 : /Firefox/.test(g.userAgent);
  },
  get safari() {
    return C ? !1 : !g.ie && !g.chrome && /(Version|PhantomJS)\/(\d+\.\d+).*Safari/.test(g.userAgent);
  },
  get webkit() {
    return C ? !1 : !g.ie && /webkit/.test(g.userAgent);
  },
  get windows() {
    return C ? !1 : navigator.platform.indexOf("Win") !== -1;
  },
  get macOS() {
    return C ? !1 : !!navigator.userAgent.match(/Macintosh|Mac OS X/i);
  },
  get iOS() {
    return C ? !1 : !!navigator.platform.match(/iPhone|iPad|iPod/) || !!(g.userAgent.match(/Mac/) && "ontouchend" in document);
  },
  get android() {
    return C ? !1 : !g.windows && /Android/.test(g.userAgent);
  },
  get androidPhone() {
    return C ? !1 : g.android && /(?=android)(?=.*mobile)/i.test(g.userAgent);
  },
  get ipad() {
    return C ? !1 : /ipad/i.test(g.userAgent) || /Macintosh/i.test(g.userAgent) && "ontouchend" in document;
  }
}, G = () => g.safari, eo = {
  version: "1.22.0-rc.3",
  major: 1,
  minor: 22,
  patch: 0,
  suffix: "-rc.3",
  isNext: !1,
  buildTime: 1707121089
}, pt = (t, e = document.body, o) => {
  let r = document.querySelector(t);
  return r || (r = o ? o() : document.createElement(t), e.insertBefore(r, e.firstChild));
}, to = () => {
  const t = document.createElement("meta");
  return t.setAttribute("name", "ui5-shared-resources"), t.setAttribute("content", ""), t;
}, oo = () => typeof document > "u" ? null : pt('meta[name="ui5-shared-resources"]', document.head, to), de = (t, e) => {
  const o = t.split(".");
  let r = oo();
  if (!r)
    return e;
  for (let a = 0; a < o.length; a++) {
    const n = o[a], s = a === o.length - 1;
    Object.prototype.hasOwnProperty.call(r, n) || (r[n] = s ? e : {}), r = r[n];
  }
  return r;
};
let Q, ro = "";
const he = /* @__PURE__ */ new Map(), N = de("Runtimes", []), ao = () => {
  if (Q === void 0) {
    Q = N.length;
    const t = eo;
    N.push({
      ...t,
      alias: ro,
      description: `Runtime ${Q} - ver ${t.version}`
    });
  }
}, M = () => Q, gt = (t, e) => {
  const o = `${t},${e}`;
  if (he.has(o))
    return he.get(o);
  const r = N[t], a = N[e];
  if (!r || !a)
    throw new Error("Invalid runtime index supplied");
  if (r.isNext || a.isNext)
    return r.buildTime - a.buildTime;
  const n = r.major - a.major;
  if (n)
    return n;
  const s = r.minor - a.minor;
  if (s)
    return s;
  const i = r.patch - a.patch;
  if (i)
    return i;
  const c = new Intl.Collator(void 0, { numeric: !0, sensitivity: "base" }).compare(r.suffix, a.suffix);
  return he.set(o, c), c;
}, no = () => N, so = typeof document > "u", ce = (t, e) => e ? `${t}|${e}` : t, je = (t) => t === void 0 ? !0 : gt(M(), parseInt(t)) === 1, _e = (t, e, o = "", r) => {
  const a = typeof t == "string" ? t : t.content, n = M();
  if (document.adoptedStyleSheets && !G()) {
    const s = new CSSStyleSheet();
    s.replaceSync(a), s._ui5StyleId = ce(e, o), r && (s._ui5RuntimeIndex = n, s._ui5Theme = r), document.adoptedStyleSheets = [...document.adoptedStyleSheets, s];
  } else {
    const s = {};
    s[e] = o, r && (s["data-ui5-runtime-index"] = n, s["data-ui5-theme"] = r), Yt(a, s);
  }
}, io = (t, e, o = "", r) => {
  const a = typeof t == "string" ? t : t.content, n = M();
  if (document.adoptedStyleSheets && !G()) {
    const s = document.adoptedStyleSheets.find((i) => i._ui5StyleId === ce(e, o));
    if (!s)
      return;
    if (!r)
      s.replaceSync(a || "");
    else {
      const i = s._ui5RuntimeIndex;
      (s._ui5Theme !== r || je(i)) && (s.replaceSync(a || ""), s._ui5RuntimeIndex = String(n), s._ui5Theme = r);
    }
  } else {
    const s = document.querySelector(`head>style[${e}="${o}"]`);
    if (!s)
      return;
    if (!r)
      s.textContent = a || "";
    else {
      const i = s.getAttribute("data-ui5-runtime-index") || void 0;
      (s.getAttribute("data-ui5-theme") !== r || je(i)) && (s.textContent = a || "", s.setAttribute("data-ui5-runtime-index", String(n)), s.setAttribute("data-ui5-theme", r));
    }
  }
}, fe = (t, e = "") => {
  if (so)
    return !0;
  const o = document.querySelector(`head>style[${t}="${e}"]`);
  return document.adoptedStyleSheets && !G() ? !!o || !!document.adoptedStyleSheets.find((r) => r._ui5StyleId === ce(t, e)) : !!o;
}, lo = (t, e = "") => {
  var o;
  if (document.adoptedStyleSheets && !G())
    document.adoptedStyleSheets = document.adoptedStyleSheets.filter((r) => r._ui5StyleId !== ce(t, e));
  else {
    const r = document.querySelector(`head > style[${t}="${e}"]`);
    (o = r == null ? void 0 : r.parentElement) == null || o.removeChild(r);
  }
}, ht = (t, e, o = "", r) => {
  fe(e, o) ? io(t, e, o, r) : _e(t, e, o, r);
}, co = (t, e) => {
  if (t === void 0)
    return e;
  if (e === void 0)
    return t;
  const o = typeof e == "string" ? e : e.content;
  return typeof t == "string" ? `${t} ${o}` : {
    content: `${t.content} ${o}`,
    packageName: t.packageName,
    fileName: t.fileName
  };
}, _o = /* @__PURE__ */ new Map(), A = (t) => _o.get(t), fo = {
  packageName: "@ui5/webcomponents-base",
  fileName: "FontFace.css",
  content: `@font-face{font-family:"72";font-style:normal;font-weight:400;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Regular.woff2?ui5-webcomponents) format("woff2"),local("72");unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:"72full";font-style:normal;font-weight:400;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Regular-full.woff2?ui5-webcomponents) format("woff2"),local('72-full')}@font-face{font-family:"72";font-style:normal;font-weight:700;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold.woff2?ui5-webcomponents) format("woff2"),local('72-Bold');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:"72full";font-style:normal;font-weight:700;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold-full.woff2?ui5-webcomponents) format("woff2")}@font-face{font-family:'72-Bold';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold.woff2?ui5-webcomponents) format("woff2"),local('72-Bold');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72-Boldfull';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold-full.woff2?ui5-webcomponents) format("woff2")}@font-face{font-family:'72-Light';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Light.woff2?ui5-webcomponents) format("woff2"),local('72-Light');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72-Lightfull';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Light-full.woff2?ui5-webcomponents) format("woff2")}@font-face{font-family:'72Mono';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Regular.woff2?ui5-webcomponents) format('woff2'),local('72Mono');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72Monofull';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Regular-full.woff2?ui5-webcomponents) format('woff2')}@font-face{font-family:'72Mono-Bold';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Bold.woff2?ui5-webcomponents) format('woff2'),local('72Mono-Bold');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72Mono-Boldfull';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Bold-full.woff2?ui5-webcomponents) format('woff2')}@font-face{font-family:"72Black";font-style:bold;font-weight:900;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Black.woff2?ui5-webcomponents) format("woff2"),local('72Black');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72Blackfull';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Black-full.woff2?ui5-webcomponents) format('woff2')}@font-face{font-family:"72-SemiboldDuplex";src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-SemiboldDuplex.woff2?ui5-webcomponents) format("woff2"),local('72-SemiboldDuplex');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}`
}, uo = {
  packageName: "@ui5/webcomponents-base",
  fileName: "OverrideFontFace.css",
  content: "@font-face{font-family:'72override';unicode-range:U+0102-0103,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EB7,U+1EB8-1EC7,U+1EC8-1ECB,U+1ECC-1EE3,U+1EE4-1EF1,U+1EF4-1EF7;src:local('Arial'),local('Helvetica'),local('sans-serif')}"
}, po = () => {
  const t = A("OpenUI5Support");
  (!t || !t.isOpenUI5Detected()) && go(), ho();
}, go = () => {
  fe("data-ui5-font-face") || _e(fo, "data-ui5-font-face");
}, ho = () => {
  fe("data-ui5-font-face-override") || _e(uo, "data-ui5-font-face-override");
}, Co = {
  packageName: "@ui5/webcomponents-base",
  fileName: "SystemCSSVars.css",
  content: ":root{--_ui5_content_density:cozy}.sapUiSizeCompact,.ui5-content-density-compact,[data-ui5-compact-size]{--_ui5_content_density:compact}[dir=rtl]{--_ui5_dir:rtl}[dir=ltr]{--_ui5_dir:ltr}"
}, mo = () => {
  fe("data-ui5-system-css-vars") || _e(Co, "data-ui5-system-css-vars");
}, Ct = { themes: { default: "sap_horizon", all: ["sap_fiori_3", "sap_fiori_3_dark", "sap_belize", "sap_belize_hcb", "sap_belize_hcw", "sap_fiori_3_hcb", "sap_fiori_3_hcw", "sap_horizon", "sap_horizon_dark", "sap_horizon_hcb", "sap_horizon_hcw", "sap_horizon_exp", "sap_horizon_dark_exp", "sap_horizon_hcb_exp", "sap_horizon_hcw_exp"] }, languages: { default: "en", all: ["ar", "bg", "ca", "cnr", "cs", "cy", "da", "de", "el", "en", "en_GB", "en_US_sappsd", "en_US_saprigi", "en_US_saptrc", "es", "es_MX", "et", "fi", "fr", "fr_CA", "hi", "hr", "hu", "in", "it", "iw", "ja", "kk", "ko", "lt", "lv", "mk", "ms", "nl", "no", "pl", "pt_PT", "pt", "ro", "ru", "sh", "sk", "sl", "sr", "sv", "th", "tr", "uk", "vi", "zh_CN", "zh_TW"] }, locales: { default: "en", all: ["ar", "ar_EG", "ar_SA", "bg", "ca", "cs", "da", "de", "de_AT", "de_CH", "el", "el_CY", "en", "en_AU", "en_GB", "en_HK", "en_IE", "en_IN", "en_NZ", "en_PG", "en_SG", "en_ZA", "es", "es_AR", "es_BO", "es_CL", "es_CO", "es_MX", "es_PE", "es_UY", "es_VE", "et", "fa", "fi", "fr", "fr_BE", "fr_CA", "fr_CH", "fr_LU", "he", "hi", "hr", "hu", "id", "it", "it_CH", "ja", "kk", "ko", "lt", "lv", "ms", "nb", "nl", "nl_BE", "pl", "pt", "pt_PT", "ro", "ru", "ru_UA", "sk", "sl", "sr", "sr_Latn", "sv", "th", "tr", "uk", "vi", "zh_CN", "zh_HK", "zh_SG", "zh_TW"] } }, ae = Ct.themes.default, ze = Ct.languages.default, Bo = (t) => {
  const e = document.querySelector(`META[name="${t}"]`);
  return e && e.getAttribute("content");
}, vo = (t) => {
  const e = Bo("sap-allowedThemeOrigins");
  return e && e.split(",").some((o) => o === "*" || t === o.trim());
}, bo = (t, e) => {
  const o = new URL(t).pathname;
  return new URL(o, e).toString();
}, So = (t) => {
  let e;
  try {
    if (t.startsWith(".") || t.startsWith("/"))
      e = new URL(t, window.location.href).toString();
    else {
      const o = new URL(t), r = o.origin;
      r && vo(r) ? e = o.toString() : e = bo(o.toString(), window.location.href);
    }
    return e.endsWith("/") || (e = `${e}/`), `${e}UI5/`;
  } catch {
  }
};
var Ee;
(function(t) {
  t.Full = "full", t.Basic = "basic", t.Minimal = "minimal", t.None = "none";
})(Ee || (Ee = {}));
const yo = Ee;
let Ve = !1, m = {
  animationMode: yo.Full,
  theme: ae,
  themeRoot: void 0,
  rtl: void 0,
  language: void 0,
  timezone: void 0,
  calendarType: void 0,
  secondaryCalendarType: void 0,
  noConflict: !1,
  formatSettings: {},
  fetchDefaultLanguage: !1
};
const Ao = () => (q(), m.theme), ko = () => (q(), m.themeRoot), To = () => (q(), m.rtl), Io = () => (q(), m.language), wo = () => (q(), m.noConflict), ne = /* @__PURE__ */ new Map();
ne.set("true", !0);
ne.set("false", !1);
const xo = () => {
  const t = document.querySelector("[data-ui5-config]") || document.querySelector("[data-id='sap-ui-config']");
  let e;
  if (t) {
    try {
      e = JSON.parse(t.innerHTML);
    } catch {
      console.warn("Incorrect data-sap-ui-config format. Please use JSON");
    }
    e && (m = Me(m, e));
  }
}, Uo = () => {
  const t = new URLSearchParams(window.location.search);
  t.forEach((e, o) => {
    const r = o.split("sap-").length;
    r === 0 || r === o.split("sap-ui-").length || We(o, e, "sap");
  }), t.forEach((e, o) => {
    o.startsWith("sap-ui") && We(o, e, "sap-ui");
  });
}, Eo = (t) => {
  const e = t.split("@")[1];
  return So(e);
}, Ho = (t, e) => t === "theme" && e.includes("@") ? e.split("@")[0] : e, We = (t, e, o) => {
  const r = e.toLowerCase(), a = t.split(`${o}-`)[1];
  ne.has(e) && (e = ne.get(r)), a === "theme" ? (m.theme = Ho(a, e), e && e.includes("@") && (m.themeRoot = Eo(e))) : m[a] = e;
}, Lo = () => {
  const t = A("OpenUI5Support");
  if (!t || !t.isOpenUI5Detected())
    return;
  const e = t.getConfigurationSettingsObject();
  m = Me(m, e);
}, q = () => {
  typeof document > "u" || Ve || (xo(), Uo(), Lo(), Ve = !0);
}, Ge = 10;
class $o {
  constructor() {
    this.list = [], this.lookup = /* @__PURE__ */ new Set();
  }
  add(e) {
    this.lookup.has(e) || (this.list.push(e), this.lookup.add(e));
  }
  remove(e) {
    this.lookup.has(e) && (this.list = this.list.filter((o) => o !== e), this.lookup.delete(e));
  }
  shift() {
    const e = this.list.shift();
    if (e)
      return this.lookup.delete(e), e;
  }
  isEmpty() {
    return this.list.length === 0;
  }
  isAdded(e) {
    return this.lookup.has(e);
  }
  /**
   * Processes the whole queue by executing the callback on each component,
   * while also imposing restrictions on how many times a component may be processed.
   *
   * @param callback - function with one argument (the web component to be processed)
   */
  process(e) {
    let o;
    const r = /* @__PURE__ */ new Map();
    for (o = this.shift(); o; ) {
      const a = r.get(o) || 0;
      if (a > Ge)
        throw new Error(`Web component processed too many times this task, max allowed is: ${Ge}`);
      e(o), r.set(o, a + 1), o = this.shift();
    }
  }
}
const mt = de("Tags", /* @__PURE__ */ new Map()), Fe = /* @__PURE__ */ new Set();
let I = /* @__PURE__ */ new Map(), Ce;
const Bt = -1, Po = (t) => {
  Fe.add(t), mt.set(t, M());
}, Mo = (t) => Fe.has(t), Fo = () => [...Fe.values()], Ro = (t) => {
  let e = mt.get(t);
  e === void 0 && (e = Bt), I.has(e) || I.set(e, /* @__PURE__ */ new Set()), I.get(e).add(t), Ce || (Ce = setTimeout(() => {
    Oo(), I = /* @__PURE__ */ new Map(), Ce = void 0;
  }, 1e3));
}, Oo = () => {
  const t = no(), e = M(), o = t[e];
  let r = "Multiple UI5 Web Components instances detected.";
  t.length > 1 && (r = `${r}
Loading order (versions before 1.1.0 not listed): ${t.map((a) => `
${a.description}`).join("")}`), [...I.keys()].forEach((a) => {
    let n, s;
    a === Bt ? (n = 1, s = {
      description: "Older unknown runtime"
    }) : (n = gt(e, a), s = t[a]);
    let i;
    n > 0 ? i = "an older" : n < 0 ? i = "a newer" : i = "the same", r = `${r}

"${o.description}" failed to define ${I.get(a).size} tag(s) as they were defined by a runtime of ${i} version "${s.description}": ${[...I.get(a)].sort().join(", ")}.`, n > 0 ? r = `${r}
WARNING! If your code uses features of the above web components, unavailable in ${s.description}, it might not work as expected!` : r = `${r}
Since the above web components were defined by the same or newer version runtime, they should be compatible with your code.`;
  }), r = `${r}

To prevent other runtimes from defining tags that you use, consider using scoping or have third-party libraries use scoping: https://github.com/SAP/ui5-webcomponents/blob/main/docs/2-advanced/03-scoping.md.`, console.warn(r);
}, vt = /* @__PURE__ */ new Set(), No = (t) => {
  vt.add(t);
}, Do = (t) => vt.has(t), Re = /* @__PURE__ */ new Set(), jo = new x(), L = new $o();
let E, ee, me, J;
const bt = async (t) => {
  L.add(t), await Vo();
}, St = (t) => {
  jo.fireEvent("beforeComponentRender", t), Re.add(t), t._render();
}, zo = (t) => {
  L.remove(t), Re.delete(t);
}, Vo = async () => {
  J || (J = new Promise((t) => {
    window.requestAnimationFrame(() => {
      L.process(St), J = null, t(), me || (me = setTimeout(() => {
        me = void 0, L.isEmpty() && qo();
      }, 200));
    });
  })), await J;
}, Wo = () => E || (E = new Promise((t) => {
  ee = t, window.requestAnimationFrame(() => {
    L.isEmpty() && (E = void 0, t());
  });
}), E), Go = () => {
  const t = Fo().map((e) => customElements.whenDefined(e));
  return Promise.all(t);
}, yt = async () => {
  await Go(), await Wo();
}, qo = () => {
  L.isEmpty() && ee && (ee(), ee = void 0, E = void 0);
}, Zo = async (t) => {
  Re.forEach((e) => {
    const o = e.constructor, r = o.getMetadata().getTag(), a = Do(o), n = o.getMetadata().isLanguageAware(), s = o.getMetadata().isThemeAware();
    (!t || t.tag === r || t.rtlAware && a || t.languageAware && n || t.themeAware && s) && bt(e);
  }), await yt();
}, At = new x(), kt = "themeRegistered", Xo = (t) => {
  At.attachEvent(kt, t);
}, Jo = (t) => At.fireEvent(kt, t), qe = /* @__PURE__ */ new Map(), Tt = /* @__PURE__ */ new Map(), Ko = /* @__PURE__ */ new Map(), It = /* @__PURE__ */ new Set(), se = /* @__PURE__ */ new Set(), wt = (t, e, o) => {
  Tt.set(`${t}/${e}`, o), It.add(t), se.add(e), Jo(e);
}, xt = async (t, e, o) => {
  const r = `${t}_${e}_${o || ""}`, a = qe.get(r);
  if (a !== void 0)
    return a;
  if (!se.has(e)) {
    const l = [...se.values()].join(", ");
    return console.warn(`You have requested a non-registered theme ${e} - falling back to ${ae}. Registered themes are: ${l}`), Be(t, ae);
  }
  const [n, s] = await Promise.all([
    Be(t, e),
    o ? Be(t, o, !0) : void 0
  ]), i = co(n, s);
  return i && qe.set(r, i), i;
}, Be = async (t, e, o = !1) => {
  const a = (o ? Ko : Tt).get(`${t}/${e}`);
  if (!a) {
    o || console.error(`Theme [${e}] not registered for package [${t}]`);
    return;
  }
  let n;
  try {
    n = await a(e);
  } catch (i) {
    console.error(t, i.message);
    return;
  }
  return n._ || n;
}, Ut = () => It, Yo = (t) => se.has(t), H = /* @__PURE__ */ new Set(), Qo = () => {
  let t = document.querySelector(".sapThemeMetaData-Base-baseLib") || document.querySelector(".sapThemeMetaData-UI5-sap-ui-core");
  if (t)
    return getComputedStyle(t).backgroundImage;
  t = document.createElement("span"), t.style.display = "none", t.classList.add("sapThemeMetaData-Base-baseLib"), document.body.appendChild(t);
  let e = getComputedStyle(t).backgroundImage;
  return e === "none" && (t.classList.add("sapThemeMetaData-UI5-sap-ui-core"), e = getComputedStyle(t).backgroundImage), document.body.removeChild(t), e;
}, er = (t) => {
  const e = /\(["']?data:text\/plain;utf-8,(.*?)['"]?\)$/i.exec(t);
  if (e && e.length >= 2) {
    let o = e[1];
    if (o = o.replace(/\\"/g, '"'), o.charAt(0) !== "{" && o.charAt(o.length - 1) !== "}")
      try {
        o = decodeURIComponent(o);
      } catch {
        H.has("decode") || (console.warn("Malformed theme metadata string, unable to decodeURIComponent"), H.add("decode"));
        return;
      }
    try {
      return JSON.parse(o);
    } catch {
      H.has("parse") || (console.warn("Malformed theme metadata string, unable to parse JSON"), H.add("parse"));
    }
  }
}, tr = (t) => {
  let e, o;
  try {
    e = t.Path.match(/\.([^.]+)\.css_variables$/)[1], o = t.Extends[0];
  } catch {
    H.has("object") || (console.warn("Malformed theme metadata Object", t), H.add("object"));
    return;
  }
  return {
    themeName: e,
    baseThemeName: o
  };
}, Ze = () => {
  const t = Qo();
  if (!t || t === "none")
    return;
  const e = er(t);
  if (e)
    return tr(e);
}, or = new x(), rr = "themeLoaded", ar = (t) => or.fireEvent(rr, t);
let ve;
const Et = () => (ve === void 0 && (ve = ko()), ve), nr = (t) => `${Et()}Base/baseLib/${t}/css_variables.css`, sr = async (t) => {
  const e = document.querySelector(`[sap-ui-webcomponents-theme="${t}"]`);
  e && document.head.removeChild(e), await Qt(nr(t), { "sap-ui-webcomponents-theme": t });
}, D = "@ui5/webcomponents-theming", ir = () => Ut().has(D), lr = async (t) => {
  if (!ir())
    return;
  const e = await xt(D, t);
  e && ht(e, "data-ui5-theme-properties", D, t);
}, dr = () => {
  lo("data-ui5-theme-properties", D);
}, cr = async (t, e) => {
  const r = [...Ut()].map(async (a) => {
    if (a === D)
      return;
    const n = await xt(a, t, e);
    n && ht(n, `data-ui5-component-properties-${M()}`, a);
  });
  return Promise.all(r);
}, _r = async (t) => {
  var r;
  const e = Ze();
  if (e)
    return e;
  const o = A("OpenUI5Support");
  if (o && o.isOpenUI5Detected()) {
    if (o.cssVariablesLoaded())
      return {
        themeName: (r = o.getConfigurationSettingsObject()) == null ? void 0 : r.theme,
        baseThemeName: ""
        // baseThemeName is only relevant for custom themes
      };
  } else if (Et())
    return await sr(t), Ze();
}, Ht = async (t) => {
  const e = await _r(t);
  !e || t !== e.themeName ? await lr(t) : dr();
  const o = Yo(t) ? t : e && e.baseThemeName;
  await cr(o || ae, e && e.themeName === t ? t : void 0), ar(t);
};
let be;
const Lt = () => (be === void 0 && (be = Ao()), be);
let $t = !1, K;
const fr = new x(), ur = async () => {
  if (K !== void 0)
    return K;
  const t = async (e) => {
    if (typeof document > "u") {
      e();
      return;
    }
    Xo(pr), ao();
    const o = A("OpenUI5Support"), r = o ? o.isOpenUI5Detected() : !1, a = A("F6Navigation");
    o && await o.init(), a && !r && a.init(), await Kt(), await Ht(Lt()), o && o.attachListeners(), po(), mo(), e(), $t = !0, await fr.fireEventAsync("boot");
  };
  return K = new Promise(t), K;
}, pr = (t) => {
  const e = Lt();
  $t && t === e && Ht(e);
}, Se = /* @__PURE__ */ new Map(), ye = /* @__PURE__ */ new Map(), Xe = (t) => {
  if (!Se.has(t)) {
    const e = gr(t.split("-"));
    Se.set(t, e);
  }
  return Se.get(t);
}, Pt = (t) => {
  if (!ye.has(t)) {
    const e = t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    ye.set(t, e);
  }
  return ye.get(t);
}, gr = (t) => t.map((e, o) => o === 0 ? e.toLowerCase() : e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()).join(""), hr = (t) => {
  if (!(t instanceof HTMLElement))
    return "default";
  const e = t.getAttribute("slot");
  if (e) {
    const o = e.match(/^(.+?)-\d+$/);
    return o ? o[1] : e;
  }
  return "default";
}, Mt = (t) => t instanceof HTMLSlotElement ? t.assignedNodes({ flatten: !0 }).filter((e) => e instanceof HTMLElement) : [t], Cr = (t) => t.reduce((e, o) => e.concat(Mt(o)), []);
let mr, Je = {
  include: [/^ui5-/],
  exclude: []
};
const Ae = /* @__PURE__ */ new Map(), Ft = () => mr, He = (t) => {
  if (!Ae.has(t)) {
    const e = Je.include.some((o) => t.match(o)) && !Je.exclude.some((o) => t.match(o));
    Ae.set(t, e);
  }
  return Ae.get(t);
}, Rt = (t) => {
  if (He(t))
    return Ft();
};
class Br {
  constructor(e) {
    this.metadata = e;
  }
  getInitialState() {
    if (Object.prototype.hasOwnProperty.call(this, "_initialState"))
      return this._initialState;
    const e = {}, o = this.slotsAreManaged(), r = this.getProperties();
    for (const a in r) {
      const n = r[a].type, s = r[a].defaultValue;
      n === Boolean ? (e[a] = !1, s !== void 0 && console.warn("The 'defaultValue' metadata key is ignored for all booleans properties, they would be initialized with 'false' by default")) : r[a].multiple ? Object.defineProperty(e, a, {
        enumerable: !0,
        get() {
          return [];
        }
      }) : n === Object ? Object.defineProperty(e, a, {
        enumerable: !0,
        get() {
          return "defaultValue" in r[a] ? r[a].defaultValue : {};
        }
      }) : n === String ? e[a] = "defaultValue" in r[a] ? r[a].defaultValue : "" : e[a] = s;
    }
    if (o) {
      const a = this.getSlots();
      for (const [n, s] of Object.entries(a)) {
        const i = s.propertyName || n;
        e[i] = [];
      }
    }
    return this._initialState = e, e;
  }
  /**
   * Validates the property's value and returns it if correct
   * or returns the default value if not.
   * <b>Note:</b> Only intended for use by UI5Element.js
   * @public
   */
  static validatePropertyValue(e, o) {
    return o.multiple && e ? e.map((a) => Ke(a, o)) : Ke(e, o);
  }
  /**
   * Validates the slot's value and returns it if correct
   * or throws an exception if not.
   * <b>Note:</b> Only intended for use by UI5Element.js
   * @public
   */
  static validateSlotValue(e, o) {
    return vr(e, o);
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
    const e = this.metadata.tag;
    if (!e)
      return "";
    const o = Rt(e);
    return o ? `${e}-${o}` : e;
  }
  /**
   * Determines whether a property should have an attribute counterpart
   * @public
   * @param propName
   */
  hasAttribute(e) {
    const o = this.getProperties()[e];
    return o.type !== Object && !o.noAttribute && !o.multiple;
  }
  /**
   * Returns an array with the properties of the UI5 Element (in camelCase)
   * @public
   */
  getPropertiesList() {
    return Object.keys(this.getProperties());
  }
  /**
   * Returns an array with the attributes of the UI5 Element (in kebab-case)
   * @public
   */
  getAttributesList() {
    return this.getPropertiesList().filter(this.hasAttribute.bind(this)).map(Pt);
  }
  /**
   * Determines whether this UI5 Element has a default slot of type Node, therefore can slot text
   */
  canSlotText() {
    var e;
    return ((e = this.getSlots().default) == null ? void 0 : e.type) === Node;
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
    return this.slotsAreManaged() && Object.values(this.getSlots()).some((e) => e.individualSlots);
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
    return this.metadata.properties || (this.metadata.properties = {}), this.metadata.properties;
  }
  /**
   * Returns an object with key-value pairs of events and their metadata definitions
   * @public
   */
  getEvents() {
    return this.metadata.events || (this.metadata.events = {}), this.metadata.events;
  }
  /**
   * Returns an object with key-value pairs of slots and their metadata definitions
   * @public
   */
  getSlots() {
    return this.metadata.slots || (this.metadata.slots = {}), this.metadata.slots;
  }
  /**
   * Determines whether this UI5 Element has any translatable texts (needs to be invalidated upon language change)
   */
  isLanguageAware() {
    return !!this.metadata.languageAware;
  }
  /**
   * Determines whether this UI5 Element has any theme dependant carachteristics.
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
   */
  shouldInvalidateOnChildChange(e, o, r) {
    const a = this.getSlots()[e].invalidateOnChildChange;
    if (a === void 0)
      return !1;
    if (typeof a == "boolean")
      return a;
    if (typeof a == "object") {
      if (o === "property") {
        if (a.properties === void 0)
          return !1;
        if (typeof a.properties == "boolean")
          return a.properties;
        if (Array.isArray(a.properties))
          return a.properties.includes(r);
        throw new Error("Wrong format for invalidateOnChildChange.properties: boolean or array is expected");
      }
      if (o === "slot") {
        if (a.slots === void 0)
          return !1;
        if (typeof a.slots == "boolean")
          return a.slots;
        if (Array.isArray(a.slots))
          return a.slots.includes(r);
        throw new Error("Wrong format for invalidateOnChildChange.slots: boolean or array is expected");
      }
    }
    throw new Error("Wrong format for invalidateOnChildChange: boolean or object is expected");
  }
}
const Ke = (t, e) => {
  const o = e.type;
  let r = e.validator;
  return o && o.isDataTypeClass && (r = o), r ? r.isValid(t) ? t : e.defaultValue : !o || o === String ? typeof t == "string" || typeof t > "u" || t === null ? t : t.toString() : o === Boolean ? typeof t == "boolean" ? t : !1 : o === Object ? typeof t == "object" ? t : e.defaultValue : t in o ? t : e.defaultValue;
}, vr = (t, e) => (t && Mt(t).forEach((o) => {
  if (!(o instanceof e.type))
    throw new Error(`The element is not of type ${e.type.toString()}`);
}), t);
class br extends HTMLElement {
}
customElements.get("ui5-static-area") || customElements.define("ui5-static-area", br);
const Sr = () => de("CustomStyle.eventProvider", new x()), yr = "CustomCSSChange", Oe = (t) => {
  Sr().attachEvent(yr, t);
}, Ar = () => de("CustomStyle.customCSSFor", {});
Oe((t) => {
  Zo({ tag: t });
});
const kr = (t) => {
  const e = Ar();
  return e[t] ? e[t].join("") : "";
}, Tr = 10, ke = (t) => Array.isArray(t) ? t.filter((e) => !!e).flat(Tr).map((e) => typeof e == "string" ? e : e.content).join(" ") : typeof t == "string" ? t : t.content, te = /* @__PURE__ */ new Map();
Oe((t) => {
  te.delete(`${t}_normal`);
});
const Ot = (t, e = !1) => {
  const o = t.getMetadata().getTag(), r = `${o}_${e ? "static" : "normal"}`, a = A("OpenUI5Enablement");
  if (!te.has(r)) {
    let n, s = "";
    if (a && (s = ke(a.getBusyIndicatorStyles())), e)
      n = ke(t.staticAreaStyles);
    else {
      const i = kr(o) || "";
      n = `${ke(t.styles)} ${i}`;
    }
    n = `${n} ${s}`, te.set(r, n);
  }
  return te.get(r);
}, oe = /* @__PURE__ */ new Map();
Oe((t) => {
  oe.delete(`${t}_normal`);
});
const Ir = (t, e = !1) => {
  const r = `${t.getMetadata().getTag()}_${e ? "static" : "normal"}`;
  if (!oe.has(r)) {
    const a = Ot(t, e), n = new CSSStyleSheet();
    n.replaceSync(a), oe.set(r, [n]);
  }
  return oe.get(r);
}, Le = (t, e = !1) => {
  let o;
  const r = t.constructor, a = e ? t.staticAreaItem.shadowRoot : t.shadowRoot;
  let n;
  if (e ? n = t.renderStatic() : n = t.render(), !a) {
    console.warn("There is no shadow root to update");
    return;
  }
  if (document.adoptedStyleSheets && !G() ? a.adoptedStyleSheets = Ir(r, e) : o = Ot(r, e), r.renderer) {
    r.renderer(n, a, o, e, { host: t });
    return;
  }
  r.render(n, a, o, e, { host: t });
}, wr = "--_ui5_content_density", xr = (t) => getComputedStyle(t).getPropertyValue(wr);
let Te;
const Ur = () => (Te === void 0 && (Te = Io()), Te), Er = (t) => {
  const e = /\$([-a-z0-9A-Z._]+)(?::([^$]*))?\$/.exec(t);
  return e && e[2] ? e[2].split(/,/) : null;
}, Hr = typeof document > "u", Lr = () => {
  if (Hr)
    return ze;
  const t = navigator.languages, e = () => navigator.language;
  return t && t[0] || e() || ze;
}, $r = {
  iw: "he",
  ji: "yi",
  in: "id",
  sh: "sr"
}, Pr = Er("$cldr-rtl-locales:ar,fa,he$") || [], Mr = (t) => (t = t && $r[t] || t, Pr.indexOf(t) >= 0), Fr = () => {
  if (typeof document > "u")
    return !1;
  const t = To();
  return t !== void 0 ? !!t : Mr(Ur() || Lr());
}, Rr = "--_ui5_dir", Nt = (t) => {
  const e = window.document, o = ["ltr", "rtl"], r = getComputedStyle(t).getPropertyValue(Rr);
  return o.includes(r) ? r : o.includes(t.dir) ? t.dir : o.includes(e.documentElement.dir) ? e.documentElement.dir : o.includes(e.body.dir) ? e.body.dir : Fr() ? "rtl" : void 0;
}, Y = "ui5-static-area-item", Or = "data-sap-ui-integration-popup-content";
class O extends HTMLElement {
  constructor() {
    super(), this._rendered = !1, this.attachShadow({ mode: "open" });
  }
  /**
   * @param ownerElement the UI5Element instance that owns this static area item
   */
  setOwnerElement(e) {
    this.ownerElement = e, this.classList.add(this.ownerElement._id), this.ownerElement.hasAttribute("data-ui5-static-stable") && this.setAttribute("data-ui5-stable", this.ownerElement.getAttribute("data-ui5-static-stable"));
  }
  /**
   * Updates the shadow root of the static area item with the latest state, if rendered
   */
  update() {
    this._rendered && (this.updateAdditionalProperties(), Le(this.ownerElement, !0));
  }
  updateAdditionalProperties() {
    this._updateAdditionalAttrs(), this._updateContentDensity(), this._updateDirection();
  }
  /**
   * Sets the correct content density based on the owner element's state
   * @private
   */
  _updateContentDensity() {
    xr(this.ownerElement) === "compact" ? (this.classList.add("sapUiSizeCompact"), this.classList.add("ui5-content-density-compact")) : (this.classList.remove("sapUiSizeCompact"), this.classList.remove("ui5-content-density-compact"));
  }
  _updateDirection() {
    if (this.ownerElement) {
      const e = Nt(this.ownerElement);
      e ? this.setAttribute("dir", e) : this.removeAttribute("dir");
    }
  }
  _updateAdditionalAttrs() {
    this.setAttribute(Y, ""), this.setAttribute(Or, "");
  }
  /**
   * Returns reference to the DOM element where the current fragment is added.
   * @protected
   */
  async getDomRef() {
    return this.updateAdditionalProperties(), this._rendered || (this._rendered = !0, Le(this.ownerElement, !0)), await yt(), this.shadowRoot;
  }
  static getTag() {
    const e = Rt(Y);
    return e ? `${Y}-${e}` : Y;
  }
  static createInstance() {
    return customElements.get(O.getTag()) || customElements.define(O.getTag(), O), document.createElement(this.getTag());
  }
}
const Nr = [], Dr = (t) => Nr.some((e) => t.startsWith(e)), $e = /* @__PURE__ */ new WeakMap(), jr = (t, e, o) => {
  const r = new MutationObserver(e);
  $e.set(t, r), r.observe(t, o);
}, zr = (t) => {
  const e = $e.get(t);
  e && (e.disconnect(), $e.delete(t));
}, Vr = [
  "value-changed",
  "click"
];
let Ie;
const Wr = (t) => Vr.includes(t), Gr = (t) => {
  const e = Dt();
  return !(typeof e != "boolean" && e.events && e.events.includes && e.events.includes(t));
}, Dt = () => (Ie === void 0 && (Ie = wo()), Ie), qr = (t) => {
  const e = Dt();
  return Wr(t) ? !1 : e === !0 ? !0 : !Gr(t);
}, Zr = [
  "disabled",
  "title",
  "hidden",
  "role",
  "draggable"
], Ye = (t) => Zr.includes(t) || t.startsWith("aria") ? !0 : ![
  HTMLElement,
  Element,
  Node
].some((o) => o.prototype.hasOwnProperty(t)), Qe = (t, e) => {
  if (t.length !== e.length)
    return !1;
  for (let o = 0; o < t.length; o++)
    if (t[o] !== e[o])
      return !1;
  return !0;
}, et = (t, e) => {
  const o = Xr(e), r = Ft();
  return t.call(e, e, o, r);
}, Xr = (t) => {
  const e = t.constructor, o = e.getMetadata().getPureTag(), r = e.getUniqueDependencies().map((a) => a.getMetadata().getPureTag()).filter(He);
  return He(o) && r.push(o), r;
};
let Jr = 0;
const tt = /* @__PURE__ */ new Map(), we = /* @__PURE__ */ new Map();
function F(t) {
  this._suppressInvalidation || (this.onInvalidation(t), this._changedState.push(t), bt(this), this._invalidationEventProvider.fireEvent("invalidate", { ...t, target: this }));
}
class ue extends HTMLElement {
  constructor() {
    super();
    const e = this.constructor;
    this._changedState = [], this._suppressInvalidation = !0, this._inDOM = !1, this._fullyConnected = !1, this._childChangeListeners = /* @__PURE__ */ new Map(), this._slotChangeListeners = /* @__PURE__ */ new Map(), this._invalidationEventProvider = new x(), this._componentStateFinalizedEventProvider = new x();
    let o;
    this._domRefReadyPromise = new Promise((r) => {
      o = r;
    }), this._domRefReadyPromise._deferredResolve = o, this._doNotSyncAttributes = /* @__PURE__ */ new Set(), this._state = { ...e.getMetadata().getInitialState() }, this._upgradeAllProperties(), e._needsShadowDOM() && this.attachShadow({ mode: "open" });
  }
  /**
   * Returns a unique ID for this UI5 Element
   *
   * @deprecated - This property is not guaranteed in future releases
   * @protected
   */
  get _id() {
    return this.__id || (this.__id = `ui5wc_${++Jr}`), this.__id;
  }
  render() {
    const e = this.constructor.template;
    return et(e, this);
  }
  renderStatic() {
    const e = this.constructor.staticAreaTemplate;
    return et(e, this);
  }
  /**
   * Do not call this method from derivatives of UI5Element, use "onEnterDOM" only
   * @private
   */
  async connectedCallback() {
    const e = this.constructor;
    this.setAttribute(e.getMetadata().getPureTag(), ""), e.getMetadata().supportsF6FastNavigation() && this.setAttribute("data-sap-ui-fastnavgroup", "true");
    const o = e.getMetadata().slotsAreManaged();
    this._inDOM = !0, o && (this._startObservingDOMChildren(), await this._processChildren()), this._inDOM && (St(this), this._domRefReadyPromise._deferredResolve(), this._fullyConnected = !0, this.onEnterDOM());
  }
  /**
   * Do not call this method from derivatives of UI5Element, use "onExitDOM" only
   * @private
   */
  disconnectedCallback() {
    const o = this.constructor.getMetadata().slotsAreManaged();
    this._inDOM = !1, o && this._stopObservingDOMChildren(), this._fullyConnected && (this.onExitDOM(), this._fullyConnected = !1), this.staticAreaItem && this.staticAreaItem.parentElement && this.staticAreaItem.parentElement.removeChild(this.staticAreaItem), zo(this);
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
    const o = this.constructor.getMetadata();
    if (!o.hasSlots())
      return;
    const a = o.canSlotText(), n = Object.keys(o.getSlots()).some((i) => o.getSlots()[i].cloned), s = {
      childList: !0,
      subtree: a || n,
      characterData: a
    };
    jr(this, this._processChildren.bind(this), s);
  }
  /**
   * @private
   */
  _stopObservingDOMChildren() {
    zr(this);
  }
  /**
   * Note: this method is also manually called by "compatibility/patchNodeValue.js"
   * @private
   */
  async _processChildren() {
    this.constructor.getMetadata().hasSlots() && await this._updateSlots();
  }
  /**
   * @private
   */
  async _updateSlots() {
    const e = this.constructor, o = e.getMetadata().getSlots(), r = e.getMetadata().canSlotText(), a = Array.from(r ? this.childNodes : this.children), n = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
    for (const [d, u] of Object.entries(o)) {
      const f = u.propertyName || d;
      s.set(f, d), n.set(f, [...this._state[f]]), this._clearSlot(d, u);
    }
    const i = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), c = a.map(async (d, u) => {
      const f = hr(d), B = o[f];
      if (B === void 0) {
        if (f !== "default") {
          const h = Object.keys(o).join(", ");
          console.warn(`Unknown slotName: ${f}, ignoring`, d, `Valid values are: ${h}`);
        }
        return;
      }
      if (B.individualSlots) {
        const h = (i.get(f) || 0) + 1;
        i.set(f, h), d._individualSlot = `${f}-${h}`;
      }
      if (d instanceof HTMLElement) {
        const h = d.localName;
        if (h.includes("-") && !Dr(h)) {
          if (!customElements.get(h)) {
            const Gt = customElements.whenDefined(h);
            let X = tt.get(h);
            X || (X = new Promise((qt) => setTimeout(qt, 1e3)), tt.set(h, X)), await Promise.race([Gt, X]);
          }
          customElements.upgrade(d);
        }
      }
      if (d = e.getMetadata().constructor.validateSlotValue(d, B), ot(d) && B.invalidateOnChildChange) {
        const h = this._getChildChangeListener(f);
        h && d.attachInvalidate.call(d, h);
      }
      d instanceof HTMLSlotElement && this._attachSlotChange(d, f);
      const S = B.propertyName || f;
      l.has(S) ? l.get(S).push({ child: d, idx: u }) : l.set(S, [{ child: d, idx: u }]);
    });
    await Promise.all(c), l.forEach((d, u) => {
      this._state[u] = d.sort((f, B) => f.idx - B.idx).map((f) => f.child);
    });
    let _ = !1;
    for (const [d, u] of Object.entries(o)) {
      const f = u.propertyName || d;
      Qe(n.get(f), this._state[f]) || (F.call(this, {
        type: "slot",
        name: s.get(f),
        reason: "children"
      }), _ = !0);
    }
    _ || F.call(this, {
      type: "slot",
      name: "default",
      reason: "textcontent"
    });
  }
  /**
   * Removes all children from the slot and detaches listeners, if any
   * @private
   */
  _clearSlot(e, o) {
    const r = o.propertyName || e;
    this._state[r].forEach((n) => {
      if (ot(n)) {
        const s = this._getChildChangeListener(e);
        s && n.detachInvalidate.call(n, s);
      }
      n instanceof HTMLSlotElement && this._detachSlotChange(n, e);
    }), this._state[r] = [];
  }
  /**
   * Attach a callback that will be executed whenever the component is invalidated
   *
   * @param callback
   * @public
   */
  attachInvalidate(e) {
    this._invalidationEventProvider.attachEvent("invalidate", e);
  }
  /**
   * Detach the callback that is executed whenever the component is invalidated
   *
   * @param callback
   * @public
   */
  detachInvalidate(e) {
    this._invalidationEventProvider.detachEvent("invalidate", e);
  }
  /**
   * Callback that is executed whenever a monitored child changes its state
   *
   * @param slotName the slot in which a child was invalidated
   * @param childChangeInfo the changeInfo object for the child in the given slot
   * @private
   */
  _onChildChange(e, o) {
    this.constructor.getMetadata().shouldInvalidateOnChildChange(e, o.type, o.name) && F.call(this, {
      type: "slot",
      name: e,
      reason: "childchange",
      child: o.target
    });
  }
  /**
   * Do not override this method in derivatives of UI5Element
   * @private
   */
  attributeChangedCallback(e, o, r) {
    let a;
    if (this._doNotSyncAttributes.has(e))
      return;
    const n = this.constructor.getMetadata().getProperties(), s = e.replace(/^ui5-/, ""), i = Xe(s);
    if (n.hasOwnProperty(i)) {
      const l = n[i], c = l.type;
      let _ = l.validator;
      c && c.isDataTypeClass && (_ = c), _ ? a = _.attributeToProperty(r) : c === Boolean ? a = r !== null : a = r, this[i] = a;
    }
  }
  /**
   * @private
   */
  _updateAttribute(e, o) {
    const r = this.constructor;
    if (!r.getMetadata().hasAttribute(e))
      return;
    const n = r.getMetadata().getProperties()[e], s = n.type;
    let i = n.validator;
    const l = Pt(e), c = this.getAttribute(l);
    if (s && s.isDataTypeClass && (i = s), i) {
      const _ = i.propertyToAttribute(o);
      _ === null ? (this._doNotSyncAttributes.add(l), this.removeAttribute(l), this._doNotSyncAttributes.delete(l)) : this.setAttribute(l, _);
    } else
      s === Boolean ? o === !0 && c === null ? this.setAttribute(l, "") : o === !1 && c !== null && this.removeAttribute(l) : typeof o != "object" && c !== o && this.setAttribute(l, o);
  }
  /**
   * @private
   */
  _upgradeProperty(e) {
    if (this.hasOwnProperty(e)) {
      const o = this[e];
      delete this[e], this[e] = o;
    }
  }
  /**
   * @private
   */
  _upgradeAllProperties() {
    this.constructor.getMetadata().getPropertiesList().forEach(this._upgradeProperty.bind(this));
  }
  /**
   * Returns a singleton event listener for the "change" event of a child in a given slot
   *
   * @param slotName the name of the slot, where the child is
   * @private
   */
  _getChildChangeListener(e) {
    return this._childChangeListeners.has(e) || this._childChangeListeners.set(e, this._onChildChange.bind(this, e)), this._childChangeListeners.get(e);
  }
  /**
   * Returns a singleton slotchange event listener that invalidates the component due to changes in the given slot
   *
   * @param slotName the name of the slot, where the slot element (whose slotchange event we're listening to) is
   * @private
   */
  _getSlotChangeListener(e) {
    return this._slotChangeListeners.has(e) || this._slotChangeListeners.set(e, this._onSlotChange.bind(this, e)), this._slotChangeListeners.get(e);
  }
  /**
   * @private
   */
  _attachSlotChange(e, o) {
    const r = this._getSlotChangeListener(o);
    r && e.addEventListener("slotchange", r);
  }
  /**
   * @private
   */
  _detachSlotChange(e, o) {
    e.removeEventListener("slotchange", this._getSlotChangeListener(o));
  }
  /**
   * Whenever a slot element is slotted inside a UI5 Web Component, its slotchange event invalidates the component
   *
   * @param slotName the name of the slot, where the slot element (whose slotchange event we're listening to) is
   * @private
   */
  _onSlotChange(e) {
    F.call(this, {
      type: "slot",
      name: e,
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
  onInvalidation(e) {
  }
  // eslint-disable-line
  /**
   * Do not call this method directly, only intended to be called by js
   * @protected
   */
  _render() {
    const e = this.constructor, o = e.getMetadata().hasIndividualSlots();
    this._suppressInvalidation = !0, this.onBeforeRendering(), this._componentStateFinalizedEventProvider.fireEvent("componentStateFinalized"), this._suppressInvalidation = !1, this._changedState = [], e._needsShadowDOM() && Le(this), this.staticAreaItem && this.staticAreaItem.update(), o && this._assignIndividualSlotsToChildren(), this.onAfterRendering();
  }
  /**
   * @private
   */
  _assignIndividualSlotsToChildren() {
    Array.from(this.children).forEach((o) => {
      o._individualSlot && o.setAttribute("slot", o._individualSlot);
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
    if (typeof this._getRealDomRef == "function")
      return this._getRealDomRef();
    if (!this.shadowRoot || this.shadowRoot.children.length === 0)
      return;
    const e = [...this.shadowRoot.children].filter((o) => !["link", "style"].includes(o.localName));
    return e.length !== 1 && console.warn(`The shadow DOM for ${this.constructor.getMetadata().getTag()} does not have a top level element, the getDomRef() method might not work as expected`), e[0];
  }
  /**
   * Returns the DOM Element marked with "data-sap-focus-ref" inside the template.
   * This is the element that will receive the focus by default.
   * @public
   */
  getFocusDomRef() {
    const e = this.getDomRef();
    if (e)
      return e.querySelector("[data-sap-focus-ref]") || e;
  }
  /**
   * Waits for dom ref and then returns the DOM Element marked with "data-sap-focus-ref" inside the template.
   * This is the element that will receive the focus by default.
   * @public
   */
  async getFocusDomRefAsync() {
    return await this._waitForDomRef(), this.getFocusDomRef();
  }
  /**
   * Set the focus to the element, returned by "getFocusDomRef()" (marked by "data-sap-focus-ref")
   * @param focusOptions additional options for the focus
   * @public
   */
  async focus(e) {
    await this._waitForDomRef();
    const o = this.getFocusDomRef();
    o && typeof o.focus == "function" && o.focus(e);
  }
  /**
   *
   * @public
   * @param name - name of the event
   * @param data - additional data for the event
   * @param cancelable - true, if the user can call preventDefault on the event object
   * @param bubbles - true, if the event bubbles
   * @returns false, if the event was cancelled (preventDefault called), true otherwise
   */
  fireEvent(e, o, r = !1, a = !0) {
    const n = this._fireEvent(e, o, r, a), s = Xe(e);
    return s !== e ? n && this._fireEvent(s, o, r, a) : n;
  }
  _fireEvent(e, o, r = !1, a = !0) {
    const n = new CustomEvent(`ui5-${e}`, {
      detail: o,
      composed: !1,
      bubbles: a,
      cancelable: r
    }), s = this.dispatchEvent(n);
    if (qr(e))
      return s;
    const i = new CustomEvent(e, {
      detail: o,
      composed: !1,
      bubbles: a,
      cancelable: r
    });
    return this.dispatchEvent(i) && s;
  }
  /**
   * Returns the actual children, associated with a slot.
   * Useful when there are transitive slots in nested component scenarios and you don't want to get a list of the slots, but rather of their content.
   * @public
   */
  getSlottedNodes(e) {
    return Cr(this[e]);
  }
  /**
   * Attach a callback that will be executed whenever the component's state is finalized
   *
   * @param callback
   * @public
   */
  attachComponentStateFinalized(e) {
    this._componentStateFinalizedEventProvider.attachEvent("componentStateFinalized", e);
  }
  /**
   * Detach the callback that is executed whenever the component's state is finalized
   *
   * @param callback
   * @public
   */
  detachComponentStateFinalized(e) {
    this._componentStateFinalizedEventProvider.detachEvent("componentStateFinalized", e);
  }
  /**
   * Determines whether the component should be rendered in RTL mode or not.
   * Returns: "rtl", "ltr" or undefined
   *
   * @public
   * @default undefined
   */
  get effectiveDir() {
    return No(this.constructor), Nt(this);
  }
  /**
   * Used to duck-type UI5 elements without using instanceof
   * @public
   * @default true
   */
  get isUI5Element() {
    return !0;
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
    if (!this.constructor._needsStaticArea())
      throw new Error("This component does not use the static area");
    return this.staticAreaItem || (this.staticAreaItem = O.createInstance(), this.staticAreaItem.setOwnerElement(this)), this.staticAreaItem.parentElement || pt("ui5-static-area").appendChild(this.staticAreaItem), this.staticAreaItem.getDomRef();
  }
  /**
   * @private
   */
  static _generateAccessors() {
    const e = this.prototype, o = this.getMetadata().slotsAreManaged(), r = this.getMetadata().getProperties();
    for (const [a, n] of Object.entries(r)) {
      if (Ye(a) || console.warn(`"${a}" is not a valid property name. Use a name that does not collide with DOM APIs`), n.type === Boolean && n.defaultValue)
        throw new Error(`Cannot set a default value for property "${a}". All booleans are false by default.`);
      if (n.type === Array)
        throw new Error(`Wrong type for property "${a}". Properties cannot be of type Array - use "multiple: true" and set "type" to the single value type, such as "String", "Object", etc...`);
      if (n.type === Object && n.defaultValue)
        throw new Error(`Cannot set a default value for property "${a}". All properties of type "Object" are empty objects by default.`);
      if (n.multiple && n.defaultValue)
        throw new Error(`Cannot set a default value for property "${a}". All multiple properties are empty arrays by default.`);
      Object.defineProperty(e, a, {
        get() {
          if (this._state[a] !== void 0)
            return this._state[a];
          const s = n.defaultValue;
          return n.type === Boolean ? !1 : n.type === String ? s : n.multiple ? [] : s;
        },
        set(s) {
          let i;
          s = this.constructor.getMetadata().constructor.validatePropertyValue(s, n);
          const _ = n.type;
          let d = n.validator;
          const u = this._state[a];
          _ && _.isDataTypeClass && (d = _), d ? i = !d.valuesAreEqual(u, s) : Array.isArray(u) && Array.isArray(s) && n.multiple && n.compareValues ? i = !Qe(u, s) : i = u !== s, i && (this._state[a] = s, F.call(this, {
            type: "property",
            name: a,
            newValue: s,
            oldValue: u
          }), this._updateAttribute(a, s));
        }
      });
    }
    if (o) {
      const a = this.getMetadata().getSlots();
      for (const [n, s] of Object.entries(a)) {
        Ye(n) || console.warn(`"${n}" is not a valid property name. Use a name that does not collide with DOM APIs`);
        const i = s.propertyName || n;
        Object.defineProperty(e, i, {
          get() {
            return this._state[i] !== void 0 ? this._state[i] : [];
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
    if (!we.has(this)) {
      const e = this.dependencies.filter((o, r, a) => a.indexOf(o) === r);
      we.set(this, e);
    }
    return we.get(this) || [];
  }
  /**
   * Returns a promise that resolves whenever all dependencies for this UI5 Web Component have resolved
   */
  static whenDependenciesDefined() {
    return Promise.all(this.getUniqueDependencies().map((e) => e.define()));
  }
  /**
   * Hook that will be called upon custom element definition
   *
   * @protected
   */
  static async onDefine() {
    return Promise.resolve();
  }
  /**
   * Registers a UI5 Web Component in the browser window object
   * @public
   */
  static async define() {
    await ur(), await Promise.all([
      this.whenDependenciesDefined(),
      this.onDefine()
    ]);
    const e = this.getMetadata().getTag(), o = Mo(e), r = customElements.get(e);
    return r && !o ? Ro(e) : r || (this._generateAccessors(), Po(e), customElements.define(e, this)), this;
  }
  /**
   * Returns an instance of UI5ElementMetadata.js representing this UI5 Web Component's full metadata (its and its parents')
   * Note: not to be confused with the "get metadata()" method, which returns an object for this class's metadata only
   * @public
   */
  static getMetadata() {
    if (this.hasOwnProperty("_metadata"))
      return this._metadata;
    const e = [this.metadata];
    let o = this;
    for (; o !== ue; )
      o = Object.getPrototypeOf(o), e.unshift(o.metadata);
    const r = Me({}, ...e);
    return this._metadata = new Br(r), this._metadata;
  }
}
ue.metadata = {};
const ot = (t) => "isUI5Element" in t, Kr = (t = {}) => (e) => {
  if (Object.prototype.hasOwnProperty.call(e, "metadata") || (e.metadata = {}), typeof t == "string") {
    e.metadata.tag = t;
    return;
  }
  const { tag: o, languageAware: r, themeAware: a, fastNavigation: n } = t;
  e.metadata.tag = o, r && (e.metadata.languageAware = r), a && (e.metadata.themeAware = a), n && (e.metadata.fastNavigation = n), ["render", "renderer", "template", "staticAreaTemplate", "styles", "staticAreaStyles", "dependencies"].forEach((s) => {
    const l = t[s === "render" ? "renderer" : s];
    l && Object.defineProperty(e, s, {
      get: () => l
    });
  });
}, pe = (t) => (e, o) => {
  const r = e.constructor;
  Object.prototype.hasOwnProperty.call(r, "metadata") || (r.metadata = {});
  const a = r.metadata;
  a.properties || (a.properties = {});
  const n = a.properties;
  n[o] || (n[o] = t || { type: String });
}, Ne = (t) => (e, o) => {
  const r = e.constructor;
  Object.prototype.hasOwnProperty.call(r, "metadata") || (r.metadata = {});
  const a = r.metadata;
  a.slots || (a.slots = {});
  const n = a.slots;
  if (t && t.default && n.default)
    throw new Error("Only one slot can be the default slot.");
  const s = t && t.default ? "default" : o;
  t = t || { type: HTMLElement }, t.type || (t.type = HTMLElement), n[s] || (n[s] = t), t.default && (delete n.default.default, n.default.propertyName = o), r.metadata.managedSlots = !0;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var xe;
const ie = window, $ = ie.trustedTypes, rt = $ ? $.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Pe = "$lit$", y = `lit$${(Math.random() + "").slice(9)}$`, jt = "?" + y, Yr = `<${jt}>`, U = document, j = () => U.createComment(""), z = (t) => t === null || typeof t != "object" && typeof t != "function", zt = Array.isArray, Qr = (t) => zt(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", Ue = `[ 	
\f\r]`, R = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, at = /-->/g, nt = />/g, T = RegExp(`>|${Ue}(?:([^\\s"'>=/]+)(${Ue}*=${Ue}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), st = /'/g, it = /"/g, Vt = /^(?:script|style|textarea|title)$/i, ea = (t) => (e, ...o) => ({ _$litType$: t, strings: e, values: o }), ta = ea(1), V = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), lt = /* @__PURE__ */ new WeakMap(), w = U.createTreeWalker(U, 129, null, !1);
function Wt(t, e) {
  if (!Array.isArray(t) || !t.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return rt !== void 0 ? rt.createHTML(e) : e;
}
const oa = (t, e) => {
  const o = t.length - 1, r = [];
  let a, n = e === 2 ? "<svg>" : "", s = R;
  for (let i = 0; i < o; i++) {
    const l = t[i];
    let c, _, d = -1, u = 0;
    for (; u < l.length && (s.lastIndex = u, _ = s.exec(l), _ !== null); )
      u = s.lastIndex, s === R ? _[1] === "!--" ? s = at : _[1] !== void 0 ? s = nt : _[2] !== void 0 ? (Vt.test(_[2]) && (a = RegExp("</" + _[2], "g")), s = T) : _[3] !== void 0 && (s = T) : s === T ? _[0] === ">" ? (s = a ?? R, d = -1) : _[1] === void 0 ? d = -2 : (d = s.lastIndex - _[2].length, c = _[1], s = _[3] === void 0 ? T : _[3] === '"' ? it : st) : s === it || s === st ? s = T : s === at || s === nt ? s = R : (s = T, a = void 0);
    const f = s === T && t[i + 1].startsWith("/>") ? " " : "";
    n += s === R ? l + Yr : d >= 0 ? (r.push(c), l.slice(0, d) + Pe + l.slice(d) + y + f) : l + y + (d === -2 ? (r.push(void 0), i) : f);
  }
  return [Wt(t, n + (t[o] || "<?>") + (e === 2 ? "</svg>" : "")), r];
};
class W {
  constructor({ strings: e, _$litType$: o }, r) {
    let a;
    this.parts = [];
    let n = 0, s = 0;
    const i = e.length - 1, l = this.parts, [c, _] = oa(e, o);
    if (this.el = W.createElement(c, r), w.currentNode = this.el.content, o === 2) {
      const d = this.el.content, u = d.firstChild;
      u.remove(), d.append(...u.childNodes);
    }
    for (; (a = w.nextNode()) !== null && l.length < i; ) {
      if (a.nodeType === 1) {
        if (a.hasAttributes()) {
          const d = [];
          for (const u of a.getAttributeNames())
            if (u.endsWith(Pe) || u.startsWith(y)) {
              const f = _[s++];
              if (d.push(u), f !== void 0) {
                const B = a.getAttribute(f.toLowerCase() + Pe).split(y), S = /([.?@])?(.*)/.exec(f);
                l.push({ type: 1, index: n, name: S[2], strings: B, ctor: S[1] === "." ? aa : S[1] === "?" ? sa : S[1] === "@" ? ia : ge });
              } else
                l.push({ type: 6, index: n });
            }
          for (const u of d)
            a.removeAttribute(u);
        }
        if (Vt.test(a.tagName)) {
          const d = a.textContent.split(y), u = d.length - 1;
          if (u > 0) {
            a.textContent = $ ? $.emptyScript : "";
            for (let f = 0; f < u; f++)
              a.append(d[f], j()), w.nextNode(), l.push({ type: 2, index: ++n });
            a.append(d[u], j());
          }
        }
      } else if (a.nodeType === 8)
        if (a.data === jt)
          l.push({ type: 2, index: n });
        else {
          let d = -1;
          for (; (d = a.data.indexOf(y, d + 1)) !== -1; )
            l.push({ type: 7, index: n }), d += y.length - 1;
        }
      n++;
    }
  }
  static createElement(e, o) {
    const r = U.createElement("template");
    return r.innerHTML = e, r;
  }
}
function P(t, e, o = t, r) {
  var a, n, s, i;
  if (e === V)
    return e;
  let l = r !== void 0 ? (a = o._$Co) === null || a === void 0 ? void 0 : a[r] : o._$Cl;
  const c = z(e) ? void 0 : e._$litDirective$;
  return (l == null ? void 0 : l.constructor) !== c && ((n = l == null ? void 0 : l._$AO) === null || n === void 0 || n.call(l, !1), c === void 0 ? l = void 0 : (l = new c(t), l._$AT(t, o, r)), r !== void 0 ? ((s = (i = o)._$Co) !== null && s !== void 0 ? s : i._$Co = [])[r] = l : o._$Cl = l), l !== void 0 && (e = P(t, l._$AS(t, e.values), l, r)), e;
}
class ra {
  constructor(e, o) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = o;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    var o;
    const { el: { content: r }, parts: a } = this._$AD, n = ((o = e == null ? void 0 : e.creationScope) !== null && o !== void 0 ? o : U).importNode(r, !0);
    w.currentNode = n;
    let s = w.nextNode(), i = 0, l = 0, c = a[0];
    for (; c !== void 0; ) {
      if (i === c.index) {
        let _;
        c.type === 2 ? _ = new Z(s, s.nextSibling, this, e) : c.type === 1 ? _ = new c.ctor(s, c.name, c.strings, this, e) : c.type === 6 && (_ = new la(s, this, e)), this._$AV.push(_), c = a[++l];
      }
      i !== (c == null ? void 0 : c.index) && (s = w.nextNode(), i++);
    }
    return w.currentNode = U, n;
  }
  v(e) {
    let o = 0;
    for (const r of this._$AV)
      r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, o), o += r.strings.length - 2) : r._$AI(e[o])), o++;
  }
}
class Z {
  constructor(e, o, r, a) {
    var n;
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = e, this._$AB = o, this._$AM = r, this.options = a, this._$Cp = (n = a == null ? void 0 : a.isConnected) === null || n === void 0 || n;
  }
  get _$AU() {
    var e, o;
    return (o = (e = this._$AM) === null || e === void 0 ? void 0 : e._$AU) !== null && o !== void 0 ? o : this._$Cp;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const o = this._$AM;
    return o !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = o.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, o = this) {
    e = P(this, e, o), z(e) ? e === p || e == null || e === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : e !== this._$AH && e !== V && this._(e) : e._$litType$ !== void 0 ? this.g(e) : e.nodeType !== void 0 ? this.$(e) : Qr(e) ? this.T(e) : this._(e);
  }
  k(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  $(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.k(e));
  }
  _(e) {
    this._$AH !== p && z(this._$AH) ? this._$AA.nextSibling.data = e : this.$(U.createTextNode(e)), this._$AH = e;
  }
  g(e) {
    var o;
    const { values: r, _$litType$: a } = e, n = typeof a == "number" ? this._$AC(e) : (a.el === void 0 && (a.el = W.createElement(Wt(a.h, a.h[0]), this.options)), a);
    if (((o = this._$AH) === null || o === void 0 ? void 0 : o._$AD) === n)
      this._$AH.v(r);
    else {
      const s = new ra(n, this), i = s.u(this.options);
      s.v(r), this.$(i), this._$AH = s;
    }
  }
  _$AC(e) {
    let o = lt.get(e.strings);
    return o === void 0 && lt.set(e.strings, o = new W(e)), o;
  }
  T(e) {
    zt(this._$AH) || (this._$AH = [], this._$AR());
    const o = this._$AH;
    let r, a = 0;
    for (const n of e)
      a === o.length ? o.push(r = new Z(this.k(j()), this.k(j()), this, this.options)) : r = o[a], r._$AI(n), a++;
    a < o.length && (this._$AR(r && r._$AB.nextSibling, a), o.length = a);
  }
  _$AR(e = this._$AA.nextSibling, o) {
    var r;
    for ((r = this._$AP) === null || r === void 0 || r.call(this, !1, !0, o); e && e !== this._$AB; ) {
      const a = e.nextSibling;
      e.remove(), e = a;
    }
  }
  setConnected(e) {
    var o;
    this._$AM === void 0 && (this._$Cp = e, (o = this._$AP) === null || o === void 0 || o.call(this, e));
  }
}
class ge {
  constructor(e, o, r, a, n) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = e, this.name = o, this._$AM = a, this.options = n, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = p;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e, o = this, r, a) {
    const n = this.strings;
    let s = !1;
    if (n === void 0)
      e = P(this, e, o, 0), s = !z(e) || e !== this._$AH && e !== V, s && (this._$AH = e);
    else {
      const i = e;
      let l, c;
      for (e = n[0], l = 0; l < n.length - 1; l++)
        c = P(this, i[r + l], o, l), c === V && (c = this._$AH[l]), s || (s = !z(c) || c !== this._$AH[l]), c === p ? e = p : e !== p && (e += (c ?? "") + n[l + 1]), this._$AH[l] = c;
    }
    s && !a && this.j(e);
  }
  j(e) {
    e === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class aa extends ge {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === p ? void 0 : e;
  }
}
const na = $ ? $.emptyScript : "";
class sa extends ge {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    e && e !== p ? this.element.setAttribute(this.name, na) : this.element.removeAttribute(this.name);
  }
}
class ia extends ge {
  constructor(e, o, r, a, n) {
    super(e, o, r, a, n), this.type = 5;
  }
  _$AI(e, o = this) {
    var r;
    if ((e = (r = P(this, e, o, 0)) !== null && r !== void 0 ? r : p) === V)
      return;
    const a = this._$AH, n = e === p && a !== p || e.capture !== a.capture || e.once !== a.once || e.passive !== a.passive, s = e !== p && (a === p || n);
    n && this.element.removeEventListener(this.name, this, a), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var o, r;
    typeof this._$AH == "function" ? this._$AH.call((r = (o = this.options) === null || o === void 0 ? void 0 : o.host) !== null && r !== void 0 ? r : this.element, e) : this._$AH.handleEvent(e);
  }
}
class la {
  constructor(e, o, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = o, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    P(this, e);
  }
}
const dt = ie.litHtmlPolyfillSupport;
dt == null || dt(W, Z), ((xe = ie.litHtmlVersions) !== null && xe !== void 0 ? xe : ie.litHtmlVersions = []).push("2.8.0");
const da = (t, e, o) => {
  var r, a;
  const n = (r = o == null ? void 0 : o.renderBefore) !== null && r !== void 0 ? r : e;
  let s = n._$litPart$;
  if (s === void 0) {
    const i = (a = o == null ? void 0 : o.renderBefore) !== null && a !== void 0 ? a : null;
    n._$litPart$ = s = new Z(e.insertBefore(j(), i), i, void 0, o ?? {});
  }
  return s._$AI(t), s;
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const re = (t) => t ?? p, b = (t, ...e) => {
  const o = A("LitStatic");
  return (o ? o.html : ta)(t, ...e);
}, ca = (t, e, o, r, a) => {
  const n = A("OpenUI5Enablement");
  n && !r && (t = n.wrapTemplateResultInBusyMarkup(b, a.host, t)), typeof o == "string" ? t = b`<style>${o}</style>${t}` : Array.isArray(o) && o.length && (t = b`${o.map((s) => b`<link type="text/css" rel="stylesheet" href="${s}">`)}${t}`), da(t, e, a);
};
function _a(t, e, o) {
  return b`<div class="udex-hero-banner" part="wrapper" style="background-color: ${re(this.wrapperBackgroundColor)}">${this.hasCustomBackgroundPicture ? fa.call(this, t, e, o) : ua.call(this, t, e, o)}<slot name="content" part="content"></slot>${this.hasAdditionalContent ? ga.call(this, t, e, o) : void 0}</div>`;
}
function fa(t, e, o) {
  return b`<slot name="backgroundPicture"></slot>`;
}
function ua(t, e, o) {
  return b`${this.hasBackgroundImage ? pa.call(this, t, e, o) : void 0}`;
}
function pa(t, e, o) {
  return b`<picture><img loading="${re(this.backgroundImageLoadingStrategy)}" src="${re(this.backgroundImage)}" part="background-image" class="udex-hero-banner__background-image" alt="${re(this.backgroundImageLabel)}" /></picture>`;
}
function ga(t, e, o) {
  return b`<slot name="additionalContent" part="additionalContent"></slot>`;
}
const ha = { packageName: "@ui5/webcomponents-theming", fileName: "themes/sap_horizon/parameters-bundle.css.ts", content: `:root{--sapThemeMetaData-Base-baseLib:{"Path": "Base.baseLib.sap_horizon.css_variables","PathPattern": "/%frameworkId%/%libId%/%themeId%/%fileId%.css","Extends": ["baseTheme"],"Tags": ["Fiori_3","LightColorScheme"],"FallbackThemeId": "sap_fiori_3","Engine":{"Name": "theming-engine","Version": "1.23061.0"},"Version":{"Build": "11.10.0.20231213074408","Source": "11.10.0"}};--sapBrandColor: #0070f2;--sapHighlightColor: #0064d9;--sapBaseColor: #fff;--sapShellColor: #fff;--sapBackgroundColor: #f5f6f7;--sapFontFamily: "72", "72full", Arial, Helvetica, sans-serif;--sapFontSize: .875rem;--sapTextColor: #1d2d3e;--sapLinkColor: #0064d9;--sapCompanyLogo: none;--sapBackgroundImage: none;--sapBackgroundImageOpacity: 1;--sapBackgroundImageRepeat: false;--sapSelectedColor: #0064d9;--sapHoverColor: #eaecee;--sapActiveColor: #dee2e5;--sapHighlightTextColor: #fff;--sapTitleColor: #1d2d3e;--sapNegativeColor: #aa0808;--sapCriticalColor: #e76500;--sapPositiveColor: #256f3a;--sapInformativeColor: #0070f2;--sapNeutralColor: #788fa6;--sapNegativeElementColor: #f53232;--sapCriticalElementColor: #e76500;--sapPositiveElementColor: #30914c;--sapInformativeElementColor: #0070f2;--sapNeutralElementColor: #788fa6;--sapNegativeTextColor: #aa0808;--sapCriticalTextColor: #b44f00;--sapPositiveTextColor: #256f3a;--sapInformativeTextColor: #0064d9;--sapNeutralTextColor: #1d2d3e;--sapErrorColor: #aa0808;--sapWarningColor: #e76500;--sapSuccessColor: #256f3a;--sapInformationColor: #0070f2;--sapErrorBackground: #ffeaf4;--sapWarningBackground: #fff8d6;--sapSuccessBackground: #f5fae5;--sapInformationBackground: #e1f4ff;--sapNeutralBackground: #eff1f2;--sapErrorBorderColor: #e90b0b;--sapWarningBorderColor: #dd6100;--sapSuccessBorderColor: #30914c;--sapInformationBorderColor: #0070f2;--sapNeutralBorderColor: #788fa6;--sapElement_LineHeight: 2.75rem;--sapElement_Height: 2.25rem;--sapElement_BorderWidth: .0625rem;--sapElement_BorderCornerRadius: .75rem;--sapElement_Compact_LineHeight: 2rem;--sapElement_Compact_Height: 1.625rem;--sapElement_Condensed_LineHeight: 1.5rem;--sapElement_Condensed_Height: 1.375rem;--sapContent_LineHeight: 1.5;--sapContent_IconHeight: 1rem;--sapContent_IconColor: #1d2d3e;--sapContent_ContrastIconColor: #fff;--sapContent_NonInteractiveIconColor: #758ca4;--sapContent_MarkerIconColor: #5d36ff;--sapContent_MarkerTextColor: #046c7a;--sapContent_MeasureIndicatorColor: #556b81;--sapContent_Selected_MeasureIndicatorColor: #0064d9;--sapContent_Placeholderloading_Background: #ccc;--sapContent_Placeholderloading_Gradient: linear-gradient(to right, #ccc 0%, #ccc 20%, #999 50%, #ccc 80%, #ccc 100%);--sapContent_ImagePlaceholderBackground: #eaecee;--sapContent_ImagePlaceholderForegroundColor: #5b738b;--sapContent_RatedColor: #d27700;--sapContent_UnratedColor: #758ca4;--sapContent_BusyColor: #0064d9;--sapContent_FocusColor: #0032a5;--sapContent_FocusStyle: solid;--sapContent_FocusWidth: .125rem;--sapContent_ContrastFocusColor: #fff;--sapContent_ShadowColor: #223548;--sapContent_ContrastShadowColor: #fff;--sapContent_Shadow0: 0 0 .125rem 0 rgba(34,53,72,.2), 0 .125rem .25rem 0 rgba(34,53,72,.2);--sapContent_Shadow1: 0 0 0 .0625rem rgba(34,53,72,.48), 0 .125rem .5rem 0 rgba(34,53,72,.3);--sapContent_Shadow2: 0 0 0 .0625rem rgba(34,53,72,.48), 0 .625rem 1.875rem 0 rgba(34,53,72,.25);--sapContent_Shadow3: 0 0 0 .0625rem rgba(34,53,72,.48), 0 1.25rem 5rem 0 rgba(34,53,72,.25);--sapContent_TextShadow: 0 0 .125rem #fff;--sapContent_ContrastTextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapContent_HeaderShadow: 0 .125rem .125rem 0 rgba(34,53,72,.05), inset 0 -.0625rem 0 0 #d9d9d9;--sapContent_Interaction_Shadow: inset 0 0 0 .0625rem rgba(85,107,129,.25);--sapContent_Selected_Shadow: inset 0 0 0 .0625rem rgba(79,160,255,.5);--sapContent_Negative_Shadow: inset 0 0 0 .0625rem rgba(255,142,196,.45);--sapContent_Critical_Shadow: inset 0 0 0 .0625rem rgba(255,213,10,.4);--sapContent_Positive_Shadow: inset 0 0 0 .0625rem rgba(48,145,76,.18);--sapContent_Informative_Shadow: inset 0 0 0 .0625rem rgba(104,174,255,.5);--sapContent_Neutral_Shadow: inset 0 0 0 .0625rem rgba(120,143,166,.3);--sapContent_SearchHighlightColor: #dafdf5;--sapContent_HelpColor: #188918;--sapContent_LabelColor: #556b82;--sapContent_MonospaceFontFamily: "72Mono", "72Monofull", lucida console, monospace;--sapContent_MonospaceBoldFontFamily: "72Mono-Bold", "72Mono-Boldfull", lucida console, monospace;--sapContent_IconFontFamily: "SAP-icons";--sapContent_DisabledTextColor: rgba(29,45,62,.6);--sapContent_DisabledOpacity: .4;--sapContent_ContrastTextThreshold: .65;--sapContent_ContrastTextColor: #fff;--sapContent_ForegroundColor: #efefef;--sapContent_ForegroundBorderColor: #758ca4;--sapContent_ForegroundTextColor: #1d2d3e;--sapContent_BadgeBackground: #aa0808;--sapContent_BadgeTextColor: #fff;--sapContent_DragAndDropActiveColor: #0064d9;--sapContent_Selected_TextColor: #0064d9;--sapContent_Selected_Background: #fff;--sapContent_Selected_Hover_Background: #e3f0ff;--sapContent_Selected_ForegroundColor: #0064d9;--sapContent_ForcedColorAdjust: none;--sapContent_Illustrative_Color1: #5d36ff;--sapContent_Illustrative_Color2: #0070f2;--sapContent_Illustrative_Color3: #f58b00;--sapContent_Illustrative_Color4: #00144a;--sapContent_Illustrative_Color5: #a9b4be;--sapContent_Illustrative_Color6: #d5dadd;--sapContent_Illustrative_Color7: #ebf8ff;--sapContent_Illustrative_Color8: #fff;--sapContent_Illustrative_Color9: #64edd2;--sapContent_Illustrative_Color10: #ebf8ff;--sapContent_Illustrative_Color11: #f31ded;--sapContent_Illustrative_Color12: #00a800;--sapContent_Illustrative_Color13: #005dc9;--sapContent_Illustrative_Color14: #004da5;--sapContent_Illustrative_Color15: #cc7400;--sapContent_Illustrative_Color16: #3b0ac6;--sapContent_Illustrative_Color17: #00a58a;--sapContent_Illustrative_Color18: #d1efff;--sapContent_Illustrative_Color19: #b8e6ff;--sapContent_Illustrative_Color20: #9eddff;--sapFontLightFamily: "72-Light", "72-Lightfull", "72", "72full", Arial, Helvetica, sans-serif;--sapFontBoldFamily: "72-Bold", "72-Boldfull", "72", "72full", Arial, Helvetica, sans-serif;--sapFontSemiboldFamily: "72-Semibold", "72-Semiboldfull", "72", "72full", Arial, Helvetica, sans-serif;--sapFontSemiboldDuplexFamily: "72-SemiboldDuplex", "72-SemiboldDuplexfull", "72", "72full", Arial, Helvetica, sans-serif;--sapFontBlackFamily: "72Black", "72Blackfull","72", "72full", Arial, Helvetica, sans-serif;--sapFontHeaderFamily: "72-Bold", "72-Boldfull", "72", "72full", Arial, Helvetica, sans-serif;--sapFontSmallSize: .75rem;--sapFontLargeSize: 1rem;--sapFontHeader1Size: 3rem;--sapFontHeader2Size: 2rem;--sapFontHeader3Size: 1.5rem;--sapFontHeader4Size: 1.25rem;--sapFontHeader5Size: 1rem;--sapFontHeader6Size: .875rem;--sapLink_TextDecoration: none;--sapLink_Hover_Color: #0064d9;--sapLink_Hover_TextDecoration: underline;--sapLink_Active_Color: #0064d9;--sapLink_Active_TextDecoration: none;--sapLink_Visited_Color: #0064d9;--sapLink_InvertedColor: #a6cfff;--sapLink_SubtleColor: #1d2d3e;--sapShell_Background: #eff1f2;--sapShell_BackgroundImage: linear-gradient(to bottom, #eff1f2, #eff1f2);--sapShell_BackgroundImageOpacity: 1;--sapShell_BackgroundImageRepeat: false;--sapShell_BorderColor: #fff;--sapShell_TextColor: #1d2d3e;--sapShell_InteractiveBackground: #eff1f2;--sapShell_InteractiveTextColor: #1d2d3e;--sapShell_InteractiveBorderColor: #556b81;--sapShell_GroupTitleTextColor: #1d2d3e;--sapShell_GroupTitleTextShadow: 0 0 .125rem #fff;--sapShell_Hover_Background: #fff;--sapShell_Active_Background: #fff;--sapShell_Active_TextColor: #0070f2;--sapShell_Selected_Background: #fff;--sapShell_Selected_TextColor: #0070f2;--sapShell_Selected_Hover_Background: #fff;--sapShell_Favicon: none;--sapShell_Navigation_Background: #fff;--sapShell_Navigation_Hover_Background: #fff;--sapShell_Navigation_SelectedColor: #0064d9;--sapShell_Navigation_Selected_TextColor: #0064d9;--sapShell_Navigation_TextColor: #1d2d3e;--sapShell_Navigation_Active_TextColor: #0064d9;--sapShell_Navigation_Active_Background: #fff;--sapShell_Shadow: 0 .125rem .125rem 0 rgba(34,53,72,.15), inset 0 -.0625rem 0 0 rgba(34,53,72,.2);--sapShell_NegativeColor: #aa0808;--sapShell_CriticalColor: #b44f00;--sapShell_PositiveColor: #256f3a;--sapShell_InformativeColor: #0064d9;--sapShell_NeutralColor: #1d2d3e;--sapShell_Category_1_Background: #0057d2;--sapShell_Category_1_BorderColor: #0057d2;--sapShell_Category_1_TextColor: #fff;--sapShell_Category_1_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_2_Background: #df1278;--sapShell_Category_2_BorderColor: #df1278;--sapShell_Category_2_TextColor: #fff;--sapShell_Category_2_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_3_Background: #e76500;--sapShell_Category_3_BorderColor: #e76500;--sapShell_Category_3_TextColor: #fff;--sapShell_Category_3_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_4_Background: #7800a4;--sapShell_Category_4_BorderColor: #7800a4;--sapShell_Category_4_TextColor: #fff;--sapShell_Category_4_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_5_Background: #aa2608;--sapShell_Category_5_BorderColor: #aa2608;--sapShell_Category_5_TextColor: #fff;--sapShell_Category_5_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_6_Background: #07838f;--sapShell_Category_6_BorderColor: #07838f;--sapShell_Category_6_TextColor: #fff;--sapShell_Category_6_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_7_Background: #f31ded;--sapShell_Category_7_BorderColor: #f31ded;--sapShell_Category_7_TextColor: #fff;--sapShell_Category_7_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_8_Background: #188918;--sapShell_Category_8_BorderColor: #188918;--sapShell_Category_8_TextColor: #fff;--sapShell_Category_8_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_9_Background: #002a86;--sapShell_Category_9_BorderColor: #002a86;--sapShell_Category_9_TextColor: #fff;--sapShell_Category_9_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_10_Background: #5b738b;--sapShell_Category_10_BorderColor: #5b738b;--sapShell_Category_10_TextColor: #fff;--sapShell_Category_10_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_11_Background: #d20a0a;--sapShell_Category_11_BorderColor: #d20a0a;--sapShell_Category_11_TextColor: #fff;--sapShell_Category_11_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_12_Background: #7858ff;--sapShell_Category_12_BorderColor: #7858ff;--sapShell_Category_12_TextColor: #fff;--sapShell_Category_12_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_13_Background: #a00875;--sapShell_Category_13_BorderColor: #a00875;--sapShell_Category_13_TextColor: #fff;--sapShell_Category_13_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_14_Background: #14565b;--sapShell_Category_14_BorderColor: #14565b;--sapShell_Category_14_TextColor: #fff;--sapShell_Category_14_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_15_Background: #223548;--sapShell_Category_15_BorderColor: #223548;--sapShell_Category_15_TextColor: #fff;--sapShell_Category_15_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_16_Background: #1e592f;--sapShell_Category_16_BorderColor: #1e592f;--sapShell_Category_16_TextColor: #fff;--sapShell_Category_16_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapAvatar_1_Background: #fff3b8;--sapAvatar_1_BorderColor: #fff3b8;--sapAvatar_1_TextColor: #a45d00;--sapAvatar_2_Background: #ffd0e7;--sapAvatar_2_BorderColor: #ffd0e7;--sapAvatar_2_TextColor: #aa0808;--sapAvatar_3_Background: #ffdbe7;--sapAvatar_3_BorderColor: #ffdbe7;--sapAvatar_3_TextColor: #ba066c;--sapAvatar_4_Background: #ffdcf3;--sapAvatar_4_BorderColor: #ffdcf3;--sapAvatar_4_TextColor: #a100c2;--sapAvatar_5_Background: #ded3ff;--sapAvatar_5_BorderColor: #ded3ff;--sapAvatar_5_TextColor: #552cff;--sapAvatar_6_Background: #d1efff;--sapAvatar_6_BorderColor: #d1efff;--sapAvatar_6_TextColor: #0057d2;--sapAvatar_7_Background: #c2fcee;--sapAvatar_7_BorderColor: #c2fcee;--sapAvatar_7_TextColor: #046c7a;--sapAvatar_8_Background: #ebf5cb;--sapAvatar_8_BorderColor: #ebf5cb;--sapAvatar_8_TextColor: #256f3a;--sapAvatar_9_Background: #ddccf0;--sapAvatar_9_BorderColor: #ddccf0;--sapAvatar_9_TextColor: #6c32a9;--sapAvatar_10_Background: #eaecee;--sapAvatar_10_BorderColor: #eaecee;--sapAvatar_10_TextColor: #556b82;--sapButton_Background: #fff;--sapButton_BorderColor: #bcc3ca;--sapButton_BorderWidth: .0625rem;--sapButton_BorderCornerRadius: .5rem;--sapButton_TextColor: #0064d9;--sapButton_Hover_Background: #eaecee;--sapButton_Hover_BorderColor: #bcc3ca;--sapButton_Hover_TextColor: #0064d9;--sapButton_IconColor: #0064d9;--sapButton_Active_Background: #fff;--sapButton_Active_BorderColor: #0064d9;--sapButton_Active_TextColor: #0064d9;--sapButton_Emphasized_Background: #0070f2;--sapButton_Emphasized_BorderColor: #0070f2;--sapButton_Emphasized_TextColor: #fff;--sapButton_Emphasized_Hover_Background: #0064d9;--sapButton_Emphasized_Hover_BorderColor: #0064d9;--sapButton_Emphasized_Hover_TextColor: #fff;--sapButton_Emphasized_Active_Background: #fff;--sapButton_Emphasized_Active_BorderColor: #0064d9;--sapButton_Emphasized_Active_TextColor: #0064d9;--sapButton_Emphasized_TextShadow: transparent;--sapButton_Emphasized_FontWeight: bold;--sapButton_Reject_Background: #ffd6e9;--sapButton_Reject_BorderColor: #ffc2de;--sapButton_Reject_TextColor: #aa0808;--sapButton_Reject_Hover_Background: #ffbddb;--sapButton_Reject_Hover_BorderColor: #ffbddb;--sapButton_Reject_Hover_TextColor: #aa0808;--sapButton_Reject_Active_Background: #fff;--sapButton_Reject_Active_BorderColor: #e90b0b;--sapButton_Reject_Active_TextColor: #aa0808;--sapButton_Reject_Selected_Background: #fff;--sapButton_Reject_Selected_BorderColor: #e90b0b;--sapButton_Reject_Selected_TextColor: #aa0808;--sapButton_Reject_Selected_Hover_Background: #ffbddb;--sapButton_Reject_Selected_Hover_BorderColor: #e90b0b;--sapButton_Accept_Background: #ebf5cb;--sapButton_Accept_BorderColor: #dbeda0;--sapButton_Accept_TextColor: #256f3a;--sapButton_Accept_Hover_Background: #e3f1b6;--sapButton_Accept_Hover_BorderColor: #e3f1b6;--sapButton_Accept_Hover_TextColor: #256f3a;--sapButton_Accept_Active_Background: #fff;--sapButton_Accept_Active_BorderColor: #30914c;--sapButton_Accept_Active_TextColor: #256f3a;--sapButton_Accept_Selected_Background: #fff;--sapButton_Accept_Selected_BorderColor: #30914c;--sapButton_Accept_Selected_TextColor: #256f3a;--sapButton_Accept_Selected_Hover_Background: #e3f1b6;--sapButton_Accept_Selected_Hover_BorderColor: #30914c;--sapButton_Lite_Background: transparent;--sapButton_Lite_BorderColor: transparent;--sapButton_Lite_TextColor: #0064d9;--sapButton_Lite_Hover_Background: #eaecee;--sapButton_Lite_Hover_BorderColor: #bcc3ca;--sapButton_Lite_Hover_TextColor: #0064d9;--sapButton_Lite_Active_Background: #fff;--sapButton_Lite_Active_BorderColor: #0064d9;--sapButton_Selected_Background: #edf6ff;--sapButton_Selected_BorderColor: #0064d9;--sapButton_Selected_TextColor: #0064d9;--sapButton_Selected_Hover_Background: #d9ecff;--sapButton_Selected_Hover_BorderColor: #0064d9;--sapButton_Attention_Background: #fff3b7;--sapButton_Attention_BorderColor: #ffeb84;--sapButton_Attention_TextColor: #b44f00;--sapButton_Attention_Hover_Background: #ffef9e;--sapButton_Attention_Hover_BorderColor: #ffef9e;--sapButton_Attention_Hover_TextColor: #b44f00;--sapButton_Attention_Active_Background: #fff;--sapButton_Attention_Active_BorderColor: #dd6100;--sapButton_Attention_Active_TextColor: #b44f00;--sapButton_Attention_Selected_Background: #fff;--sapButton_Attention_Selected_BorderColor: #dd6100;--sapButton_Attention_Selected_TextColor: #b44f00;--sapButton_Attention_Selected_Hover_Background: #ffef9e;--sapButton_Attention_Selected_Hover_BorderColor: #dd6100;--sapButton_Negative_Background: #f53232;--sapButton_Negative_BorderColor: #f53232;--sapButton_Negative_TextColor: #fff;--sapButton_Negative_Hover_Background: #e90b0b;--sapButton_Negative_Hover_BorderColor: #e90b0b;--sapButton_Negative_Hover_TextColor: #fff;--sapButton_Negative_Active_Background: #fff;--sapButton_Negative_Active_BorderColor: #f53232;--sapButton_Negative_Active_TextColor: #aa0808;--sapButton_Critical_Background: #e76500;--sapButton_Critical_BorderColor: #e76500;--sapButton_Critical_TextColor: #fff;--sapButton_Critical_Hover_Background: #dd6100;--sapButton_Critical_Hover_BorderColor: #dd6100;--sapButton_Critical_Hover_TextColor: #fff;--sapButton_Critical_Active_Background: #fff;--sapButton_Critical_Active_BorderColor: #dd6100;--sapButton_Critical_Active_TextColor: #b44f00;--sapButton_Success_Background: #30914c;--sapButton_Success_BorderColor: #30914c;--sapButton_Success_TextColor: #fff;--sapButton_Success_Hover_Background: #2c8646;--sapButton_Success_Hover_BorderColor: #2c8646;--sapButton_Success_Hover_TextColor: #fff;--sapButton_Success_Active_Background: #fff;--sapButton_Success_Active_BorderColor: #30914c;--sapButton_Success_Active_TextColor: #256f3a;--sapButton_Information_Background: #e8f3ff;--sapButton_Information_BorderColor: #b5d8ff;--sapButton_Information_TextColor: #0064d9;--sapButton_Information_Hover_Background: #d4e8ff;--sapButton_Information_Hover_BorderColor: #b5d8ff;--sapButton_Information_Hover_TextColor: #0064d9;--sapButton_Information_Active_Background: #fff;--sapButton_Information_Active_BorderColor: #0064d9;--sapButton_Information_Active_TextColor: #0064d9;--sapButton_Neutral_Background: #e8f3ff;--sapButton_Neutral_BorderColor: #b5d8ff;--sapButton_Neutral_TextColor: #0064d9;--sapButton_Neutral_Hover_Background: #d4e8ff;--sapButton_Neutral_Hover_BorderColor: #b5d8ff;--sapButton_Neutral_Hover_TextColor: #0064d9;--sapButton_Neutral_Active_Background: #fff;--sapButton_Neutral_Active_BorderColor: #0064d9;--sapButton_Neutral_Active_TextColor: #0064d9;--sapButton_Track_Background: #788fa6;--sapButton_Track_BorderColor: #788fa6;--sapButton_Track_TextColor: #fff;--sapButton_Track_Hover_Background: #637d97;--sapButton_Track_Hover_BorderColor: #637d97;--sapButton_Track_Selected_Background: #0064d9;--sapButton_Track_Selected_BorderColor: #0064d9;--sapButton_Track_Selected_TextColor: #fff;--sapButton_Track_Selected_Hover_Background: #0058c0;--sapButton_Track_Selected_Hover_BorderColor: #0058c0;--sapButton_Handle_Background: #fff;--sapButton_Handle_BorderColor: #fff;--sapButton_Handle_TextColor: #1d2d3e;--sapButton_Handle_Hover_Background: #fff;--sapButton_Handle_Hover_BorderColor: rgba(255,255,255,.5);--sapButton_Handle_Selected_Background: #edf6ff;--sapButton_Handle_Selected_BorderColor: #edf6ff;--sapButton_Handle_Selected_TextColor: #0064d9;--sapButton_Handle_Selected_Hover_Background: #edf6ff;--sapButton_Handle_Selected_Hover_BorderColor: rgba(237,246,255,.5);--sapButton_Track_Negative_Background: #f53232;--sapButton_Track_Negative_BorderColor: #f53232;--sapButton_Track_Negative_TextColor: #fff;--sapButton_Track_Negative_Hover_Background: #e90b0b;--sapButton_Track_Negative_Hover_BorderColor: #e90b0b;--sapButton_Handle_Negative_Background: #fff;--sapButton_Handle_Negative_BorderColor: #fff;--sapButton_Handle_Negative_TextColor: #aa0808;--sapButton_Handle_Negative_Hover_Background: #fff;--sapButton_Handle_Negative_Hover_BorderColor: rgba(255,255,255,.5);--sapButton_Track_Positive_Background: #30914c;--sapButton_Track_Positive_BorderColor: #30914c;--sapButton_Track_Positive_TextColor: #fff;--sapButton_Track_Positive_Hover_Background: #2c8646;--sapButton_Track_Positive_Hover_BorderColor: #2c8646;--sapButton_Handle_Positive_Background: #fff;--sapButton_Handle_Positive_BorderColor: #fff;--sapButton_Handle_Positive_TextColor: #256f3a;--sapButton_Handle_Positive_Hover_Background: #fff;--sapButton_Handle_Positive_Hover_BorderColor: rgba(255,255,255,.5);--sapButton_TokenBackground: #fff;--sapButton_TokenBorderColor: #bcc3ca;--sapField_Background: #fff;--sapField_BackgroundStyle: 0 100% / 100% .0625rem no-repeat linear-gradient(0deg, #556b81, #556b81) border-box;--sapField_TextColor: #131e29;--sapField_PlaceholderTextColor: #556b82;--sapField_BorderColor: #556b81;--sapField_HelpBackground: #fff;--sapField_BorderWidth: .0625rem;--sapField_BorderStyle: none;--sapField_BorderCornerRadius: .25rem;--sapField_Shadow: inset 0 0 0 .0625rem rgba(85,107,129,.25);--sapField_Hover_Background: #fff;--sapField_Hover_BackgroundStyle: 0 100% / 100% .0625rem no-repeat linear-gradient(0deg, #0064d9, #0064d9) border-box;--sapField_Hover_BorderColor: #0064d9;--sapField_Hover_HelpBackground: #fff;--sapField_Hover_Shadow: inset 0 0 0 .0625rem rgba(79,160,255,.5);--sapField_Hover_InvalidShadow: inset 0 0 0 .0625rem rgba(255,142,196,.45);--sapField_Hover_WarningShadow: inset 0 0 0 .0625rem rgba(255,213,10,.4);--sapField_Hover_SuccessShadow: inset 0 0 0 .0625rem rgba(48,145,76,.18);--sapField_Hover_InformationShadow: inset 0 0 0 .0625rem rgba(104,174,255,.5);--sapField_Active_BorderColor: #0064d9;--sapField_Focus_Background: #fff;--sapField_Focus_BorderColor: #0032a5;--sapField_Focus_HelpBackground: #fff;--sapField_ReadOnly_Background: #eaecee;--sapField_ReadOnly_BackgroundStyle: 0 100% / .375rem .0625rem repeat-x linear-gradient(90deg, #556b81 0, #556b81 .25rem, transparent .25rem) border-box;--sapField_ReadOnly_BorderColor: #556b81;--sapField_ReadOnly_BorderStyle: none;--sapField_ReadOnly_HelpBackground: #eaecee;--sapField_RequiredColor: #ba066c;--sapField_InvalidColor: #e90b0b;--sapField_InvalidBackground: #ffeaf4;--sapField_InvalidBackgroundStyle: 0 100% / 100% .125rem no-repeat linear-gradient(0deg, #e90b0b, #e90b0b) border-box;--sapField_InvalidBorderWidth: .125rem;--sapField_InvalidBorderStyle: none;--sapField_InvalidShadow: inset 0 0 0 .0625rem rgba(255,142,196,.45);--sapField_WarningColor: #dd6100;--sapField_WarningBackground: #fff8d6;--sapField_WarningBackgroundStyle: 0 100% / 100% .125rem no-repeat linear-gradient(0deg, #dd6100, #dd6100) border-box;--sapField_WarningBorderWidth: .125rem;--sapField_WarningBorderStyle: none;--sapField_WarningShadow: inset 0 0 0 .0625rem rgba(255,213,10,.4);--sapField_SuccessColor: #30914c;--sapField_SuccessBackground: #f5fae5;--sapField_SuccessBackgroundStyle: 0 100% / 100% .0625rem no-repeat linear-gradient(0deg, #30914c, #30914c) border-box;--sapField_SuccessBorderWidth: .0625rem;--sapField_SuccessBorderStyle: none;--sapField_SuccessShadow: inset 0 0 0 .0625rem rgba(48,145,76,.18);--sapField_InformationColor: #0070f2;--sapField_InformationBackground: #e1f4ff;--sapField_InformationBackgroundStyle: 0 100% / 100% .125rem no-repeat linear-gradient(0deg, #0070f2, #0070f2) border-box;--sapField_InformationBorderWidth: .125rem;--sapField_InformationBorderStyle: none;--sapField_InformationShadow: inset 0 0 0 .0625rem rgba(104,174,255,.5);--sapGroup_TitleBackground: #fff;--sapGroup_TitleBorderColor: #a8b2bd;--sapGroup_TitleTextColor: #1d2d3e;--sapGroup_Title_FontSize: 1rem;--sapGroup_ContentBackground: #fff;--sapGroup_ContentBorderColor: #d9d9d9;--sapGroup_BorderWidth: .0625rem;--sapGroup_BorderCornerRadius: .5rem;--sapGroup_FooterBackground: transparent;--sapToolbar_Background: #fff;--sapToolbar_SeparatorColor: #d9d9d9;--sapList_HeaderBackground: #fff;--sapList_HeaderBorderColor: #a8b2bd;--sapList_HeaderTextColor: #1d2d3e;--sapList_BorderColor: #e5e5e5;--sapList_BorderWidth: .0625rem;--sapList_TextColor: #1d2d3e;--sapList_Active_TextColor: #1d2d3e;--sapList_Active_Background: #dee2e5;--sapList_SelectionBackgroundColor: #ebf8ff;--sapList_SelectionBorderColor: #0064d9;--sapList_Hover_SelectionBackground: #dcf3ff;--sapList_Background: #fff;--sapList_Hover_Background: #eaecee;--sapList_AlternatingBackground: #f5f6f7;--sapList_GroupHeaderBackground: #fff;--sapList_GroupHeaderBorderColor: #a8b2bd;--sapList_GroupHeaderTextColor: #1d2d3e;--sapList_TableGroupHeaderBackground: #eff1f2;--sapList_TableGroupHeaderBorderColor: #a8b2bd;--sapList_TableGroupHeaderTextColor: #1d2d3e;--sapList_FooterBackground: #fff;--sapList_FooterTextColor: #1d2d3e;--sapList_TableFooterBorder: #a8b2bd;--sapList_TableFixedBorderColor: #8c8c8c;--sapMessage_ErrorBorderColor: #ff8ec4;--sapMessage_WarningBorderColor: #ffe770;--sapMessage_SuccessBorderColor: #cee67e;--sapMessage_InformationBorderColor: #7bcfff;--sapPopover_BorderCornerRadius: .5rem;--sapProgress_Background: #d5dadd;--sapProgress_BorderColor: #d5dadd;--sapProgress_TextColor: #1d2d3e;--sapProgress_FontSize: .875rem;--sapProgress_NegativeBackground: #ffdbec;--sapProgress_NegativeBorderColor: #ffdbec;--sapProgress_NegativeTextColor: #1d2d3e;--sapProgress_CriticalBackground: #fff4bd;--sapProgress_CriticalBorderColor: #fff4bd;--sapProgress_CriticalTextColor: #1d2d3e;--sapProgress_PositiveBackground: #e5f2ba;--sapProgress_PositiveBorderColor: #e5f2ba;--sapProgress_PositiveTextColor: #1d2d3e;--sapProgress_InformationBackground: #cdedff;--sapProgress_InformationBorderColor: #cdedff;--sapProgress_InformationTextColor: #1d2d3e;--sapProgress_Value_Background: #617b94;--sapProgress_Value_BorderColor: #617b94;--sapProgress_Value_TextColor: #788fa6;--sapProgress_Value_NegativeBackground: #f53232;--sapProgress_Value_NegativeBorderColor: #f53232;--sapProgress_Value_NegativeTextColor: #f53232;--sapProgress_Value_CriticalBackground: #e76500;--sapProgress_Value_CriticalBorderColor: #e76500;--sapProgress_Value_CriticalTextColor: #e76500;--sapProgress_Value_PositiveBackground: #30914c;--sapProgress_Value_PositiveBorderColor: #30914c;--sapProgress_Value_PositiveTextColor: #30914c;--sapProgress_Value_InformationBackground: #0070f2;--sapProgress_Value_InformationBorderColor: #0070f2;--sapProgress_Value_InformationTextColor: #0070f2;--sapScrollBar_FaceColor: #7b91a8;--sapScrollBar_TrackColor: #fff;--sapScrollBar_BorderColor: #7b91a8;--sapScrollBar_SymbolColor: #0064d9;--sapScrollBar_Dimension: .75rem;--sapScrollBar_Hover_FaceColor: #5b728b;--sapSlider_Background: #d5dadd;--sapSlider_BorderColor: #d5dadd;--sapSlider_Selected_Background: #0064d9;--sapSlider_Selected_BorderColor: #0064d9;--sapSlider_HandleBackground: #fff;--sapSlider_HandleBorderColor: #b0d5ff;--sapSlider_RangeHandleBackground: #fff;--sapSlider_Hover_HandleBackground: #d9ecff;--sapSlider_Hover_HandleBorderColor: #b0d5ff;--sapSlider_Hover_RangeHandleBackground: #d9ecff;--sapSlider_Active_HandleBackground: #fff;--sapSlider_Active_HandleBorderColor: #0064d9;--sapSlider_Active_RangeHandleBackground: transparent;--sapPageHeader_Background: #fff;--sapPageHeader_BorderColor: #d9d9d9;--sapPageHeader_TextColor: #1d2d3e;--sapPageFooter_Background: #fff;--sapPageFooter_BorderColor: #d9d9d9;--sapPageFooter_TextColor: #1d2d3e;--sapInfobar_Background: #c2fcee;--sapInfobar_Hover_Background: #fff;--sapInfobar_Active_Background: #fff;--sapInfobar_NonInteractive_Background: #f5f6f7;--sapInfobar_TextColor: #046c7a;--sapObjectHeader_Background: #fff;--sapObjectHeader_Hover_Background: #eaecee;--sapObjectHeader_BorderColor: #d9d9d9;--sapObjectHeader_Title_TextColor: #1d2d3e;--sapObjectHeader_Title_FontSize: 1.5rem;--sapObjectHeader_Title_SnappedFontSize: 1.25rem;--sapObjectHeader_Title_FontFamily: "72Black", "72Blackfull","72", "72full", Arial, Helvetica, sans-serif;--sapObjectHeader_Subtitle_TextColor: #556b82;--sapBlockLayer_Background: #000;--sapTile_Background: #fff;--sapTile_Hover_Background: #eaecee;--sapTile_Active_Background: #dee2e5;--sapTile_BorderColor: transparent;--sapTile_BorderCornerRadius: 1rem;--sapTile_TitleTextColor: #1d2d3e;--sapTile_TextColor: #556b82;--sapTile_IconColor: #556b82;--sapTile_SeparatorColor: #ccc;--sapTile_Interactive_BorderColor: #b3b3b3;--sapTile_OverlayBackground: #fff;--sapTile_OverlayForegroundColor: #1d2d3e;--sapAccentColor1: #d27700;--sapAccentColor2: #aa0808;--sapAccentColor3: #ba066c;--sapAccentColor4: #a100c2;--sapAccentColor5: #5d36ff;--sapAccentColor6: #0057d2;--sapAccentColor7: #046c7a;--sapAccentColor8: #256f3a;--sapAccentColor9: #6c32a9;--sapAccentColor10: #5b738b;--sapAccentBackgroundColor1: #fff3b8;--sapAccentBackgroundColor2: #ffd0e7;--sapAccentBackgroundColor3: #ffdbe7;--sapAccentBackgroundColor4: #ffdcf3;--sapAccentBackgroundColor5: #ded3ff;--sapAccentBackgroundColor6: #d1efff;--sapAccentBackgroundColor7: #c2fcee;--sapAccentBackgroundColor8: #ebf5cb;--sapAccentBackgroundColor9: #ddccf0;--sapAccentBackgroundColor10: #eaecee;--sapIndicationColor_1: #840606;--sapIndicationColor_1_Background: #840606;--sapIndicationColor_1_BorderColor: #840606;--sapIndicationColor_1_TextColor: #fff;--sapIndicationColor_1_Hover_Background: #6c0505;--sapIndicationColor_1_Active_Background: #fff;--sapIndicationColor_1_Active_BorderColor: #fb9d9d;--sapIndicationColor_1_Active_TextColor: #840606;--sapIndicationColor_1_Selected_Background: #fff;--sapIndicationColor_1_Selected_BorderColor: #fb9d9d;--sapIndicationColor_1_Selected_TextColor: #840606;--sapIndicationColor_1b: #fb9d9d;--sapIndicationColor_1b_BorderColor: #fb9d9d;--sapIndicationColor_1b_Hover_Background: #fa8585;--sapIndicationColor_2: #aa0808;--sapIndicationColor_2_Background: #aa0808;--sapIndicationColor_2_BorderColor: #aa0808;--sapIndicationColor_2_TextColor: #fff;--sapIndicationColor_2_Hover_Background: #920707;--sapIndicationColor_2_Active_Background: #fff;--sapIndicationColor_2_Active_BorderColor: #fcc4c4;--sapIndicationColor_2_Active_TextColor: #aa0808;--sapIndicationColor_2_Selected_Background: #fff;--sapIndicationColor_2_Selected_BorderColor: #fcc4c4;--sapIndicationColor_2_Selected_TextColor: #aa0808;--sapIndicationColor_2b: #fcc4c4;--sapIndicationColor_2b_BorderColor: #fcc4c4;--sapIndicationColor_2b_Hover_Background: #fbacac;--sapIndicationColor_3: #b95100;--sapIndicationColor_3_Background: #e76500;--sapIndicationColor_3_BorderColor: #e76500;--sapIndicationColor_3_TextColor: #fff;--sapIndicationColor_3_Hover_Background: #d85e00;--sapIndicationColor_3_Active_Background: #fff;--sapIndicationColor_3_Active_BorderColor: #fff2c0;--sapIndicationColor_3_Active_TextColor: #b95100;--sapIndicationColor_3_Selected_Background: #fff;--sapIndicationColor_3_Selected_BorderColor: #fff2c0;--sapIndicationColor_3_Selected_TextColor: #b95100;--sapIndicationColor_3b: #fff2c0;--sapIndicationColor_3b_BorderColor: #fff2c0;--sapIndicationColor_3b_Hover_Background: #ffeda6;--sapIndicationColor_4: #256f3a;--sapIndicationColor_4_Background: #256f3a;--sapIndicationColor_4_BorderColor: #256f3a;--sapIndicationColor_4_TextColor: #fff;--sapIndicationColor_4_Hover_Background: #1f5c30;--sapIndicationColor_4_Active_Background: #fff;--sapIndicationColor_4_Active_BorderColor: #bae8bc;--sapIndicationColor_4_Active_TextColor: #256f3a;--sapIndicationColor_4_Selected_Background: #fff;--sapIndicationColor_4_Selected_BorderColor: #bae8bc;--sapIndicationColor_4_Selected_TextColor: #256f3a;--sapIndicationColor_4b: #bae8bc;--sapIndicationColor_4b_BorderColor: #bae8bc;--sapIndicationColor_4b_Hover_Background: #a7e2a9;--sapIndicationColor_5: #0070f2;--sapIndicationColor_5_Background: #0070f2;--sapIndicationColor_5_BorderColor: #0070f2;--sapIndicationColor_5_TextColor: #fff;--sapIndicationColor_5_Hover_Background: #0064d9;--sapIndicationColor_5_Active_Background: #fff;--sapIndicationColor_5_Active_BorderColor: #d3effd;--sapIndicationColor_5_Active_TextColor: #0070f2;--sapIndicationColor_5_Selected_Background: #fff;--sapIndicationColor_5_Selected_BorderColor: #d3effd;--sapIndicationColor_5_Selected_TextColor: #0070f2;--sapIndicationColor_5b: #d3effd;--sapIndicationColor_5b_BorderColor: #d3effd;--sapIndicationColor_5b_Hover_Background: #bbe6fc;--sapIndicationColor_6: #046c7a;--sapIndicationColor_6_Background: #046c7a;--sapIndicationColor_6_BorderColor: #046c7a;--sapIndicationColor_6_TextColor: #fff;--sapIndicationColor_6_Hover_Background: #035661;--sapIndicationColor_6_Active_Background: #fff;--sapIndicationColor_6_Active_BorderColor: #cdf5ec;--sapIndicationColor_6_Active_TextColor: #046c7a;--sapIndicationColor_6_Selected_Background: #fff;--sapIndicationColor_6_Selected_BorderColor: #cdf5ec;--sapIndicationColor_6_Selected_TextColor: #046c7a;--sapIndicationColor_6b: #cdf5ec;--sapIndicationColor_6b_BorderColor: #cdf5ec;--sapIndicationColor_6b_Hover_Background: #b8f1e4;--sapIndicationColor_7: #5d36ff;--sapIndicationColor_7_Background: #5d36ff;--sapIndicationColor_7_BorderColor: #5d36ff;--sapIndicationColor_7_TextColor: #fff;--sapIndicationColor_7_Hover_Background: #481cff;--sapIndicationColor_7_Active_Background: #fff;--sapIndicationColor_7_Active_BorderColor: #e2dbff;--sapIndicationColor_7_Active_TextColor: #5d36ff;--sapIndicationColor_7_Selected_Background: #fff;--sapIndicationColor_7_Selected_BorderColor: #e2dbff;--sapIndicationColor_7_Selected_TextColor: #5d36ff;--sapIndicationColor_7b: #e2dbff;--sapIndicationColor_7b_BorderColor: #e2dbff;--sapIndicationColor_7b_Hover_Background: #cdc2ff;--sapIndicationColor_8: #a100c2;--sapIndicationColor_8_Background: #a100c2;--sapIndicationColor_8_BorderColor: #a100c2;--sapIndicationColor_8_TextColor: #fff;--sapIndicationColor_8_Hover_Background: #8c00a9;--sapIndicationColor_8_Active_Background: #fff;--sapIndicationColor_8_Active_BorderColor: #f8d6ff;--sapIndicationColor_8_Active_TextColor: #a100c2;--sapIndicationColor_8_Selected_Background: #fff;--sapIndicationColor_8_Selected_BorderColor: #f8d6ff;--sapIndicationColor_8_Selected_TextColor: #a100c2;--sapIndicationColor_8b: #f8d6ff;--sapIndicationColor_8b_BorderColor: #f8d6ff;--sapIndicationColor_8b_Hover_Background: #f4bdff;--sapIndicationColor_9: #1d2d3e;--sapIndicationColor_9_Background: #1d2d3e;--sapIndicationColor_9_BorderColor: #1d2d3e;--sapIndicationColor_9_TextColor: #fff;--sapIndicationColor_9_Hover_Background: #15202d;--sapIndicationColor_9_Active_Background: #fff;--sapIndicationColor_9_Active_BorderColor: #d9d9d9;--sapIndicationColor_9_Active_TextColor: #1d2d3e;--sapIndicationColor_9_Selected_Background: #fff;--sapIndicationColor_9_Selected_BorderColor: #d9d9d9;--sapIndicationColor_9_Selected_TextColor: #1d2d3e;--sapIndicationColor_9b: #fff;--sapIndicationColor_9b_BorderColor: #d9d9d9;--sapIndicationColor_9b_Hover_Background: #f2f2f2;--sapIndicationColor_10: #45484a;--sapIndicationColor_10_Background: #83888b;--sapIndicationColor_10_BorderColor: #83888b;--sapIndicationColor_10_TextColor: #fff;--sapIndicationColor_10_Hover_Background: #767b7e;--sapIndicationColor_10_Active_Background: #fff;--sapIndicationColor_10_Active_BorderColor: #eaecee;--sapIndicationColor_10_Active_TextColor: #45484a;--sapIndicationColor_10_Selected_Background: #fff;--sapIndicationColor_10_Selected_BorderColor: #eaecee;--sapIndicationColor_10_Selected_TextColor: #45484a;--sapIndicationColor_10b: #eaecee;--sapIndicationColor_10b_BorderColor: #eaecee;--sapIndicationColor_10b_Hover_Background: #dcdfe3;--sapLegend_WorkingBackground: #fff;--sapLegend_NonWorkingBackground: #ebebeb;--sapLegend_CurrentDateTime: #a100c2;--sapLegendColor1: #c35500;--sapLegendColor2: #d23a0a;--sapLegendColor3: #df1278;--sapLegendColor4: #840606;--sapLegendColor5: #cc00dc;--sapLegendColor6: #0057d2;--sapLegendColor7: #07838f;--sapLegendColor8: #188918;--sapLegendColor9: #5b738b;--sapLegendColor10: #7800a4;--sapLegendColor11: #a93e00;--sapLegendColor12: #aa2608;--sapLegendColor13: #ba066c;--sapLegendColor14: #8d2a00;--sapLegendColor15: #4e247a;--sapLegendColor16: #002a86;--sapLegendColor17: #035663;--sapLegendColor18: #1e592f;--sapLegendColor19: #1a4796;--sapLegendColor20: #470ced;--sapLegendBackgroundColor1: #ffef9f;--sapLegendBackgroundColor2: #feeae1;--sapLegendBackgroundColor3: #fbf6f8;--sapLegendBackgroundColor4: #fbebeb;--sapLegendBackgroundColor5: #ffe5fe;--sapLegendBackgroundColor6: #d1efff;--sapLegendBackgroundColor7: #c2fcee;--sapLegendBackgroundColor8: #f5fae5;--sapLegendBackgroundColor9: #f5f6f7;--sapLegendBackgroundColor10: #fff0fa;--sapLegendBackgroundColor11: #fff8d6;--sapLegendBackgroundColor12: #fff6f6;--sapLegendBackgroundColor13: #f7ebef;--sapLegendBackgroundColor14: #f1ecd5;--sapLegendBackgroundColor15: #f0e7f8;--sapLegendBackgroundColor16: #ebf8ff;--sapLegendBackgroundColor17: #dafdf5;--sapLegendBackgroundColor18: #ebf5cb;--sapLegendBackgroundColor19: #fafdff;--sapLegendBackgroundColor20: #eceeff;--sapChart_OrderedColor_1: #0070f2;--sapChart_OrderedColor_2: #c87b00;--sapChart_OrderedColor_3: #75980b;--sapChart_OrderedColor_4: #df1278;--sapChart_OrderedColor_5: #8b47d7;--sapChart_OrderedColor_6: #049f9a;--sapChart_OrderedColor_7: #3c8cdd;--sapChart_OrderedColor_8: #cc00dc;--sapChart_OrderedColor_9: #798c77;--sapChart_OrderedColor_10: #da6c6c;--sapChart_OrderedColor_11: #5d36ff;--sapChart_Bad: #f53232;--sapChart_Critical: #e76500;--sapChart_Good: #30914c;--sapChart_Neutral: #788fa6;--sapChart_Sequence_1: #0070f2;--sapChart_Sequence_2: #c87b00;--sapChart_Sequence_3: #75980b;--sapChart_Sequence_4: #df1278;--sapChart_Sequence_5: #8b47d7;--sapChart_Sequence_6: #049f9a;--sapChart_Sequence_7: #3c8cdd;--sapChart_Sequence_8: #cc00dc;--sapChart_Sequence_9: #798c77;--sapChart_Sequence_10: #da6c6c;--sapChart_Sequence_11: #5d36ff;--sapChart_Sequence_Neutral: #788fa6;}
` }, Ca = { packageName: "@udex/web-components", fileName: "themes/sap_horizon/parameters-bundle.css", content: "" };
wt("@ui5/webcomponents-theming", "sap_horizon", async () => ha);
wt("@udex/web-components", "sap_horizon", async () => Ca);
const ma = { packageName: "@udex/web-components", fileName: "themes/HeroBanner.css", content: ":host{--udexHeroBannerMinHeight:200px;--udexHeroBannerSlotMaxWidth:calc(50% - var(--udexHeroBannerContentPaddingVertical, 24px)*2);--udexHeroBannerBackgroundImageObjectFit:contain;--udexHeroBannerVerticalLayoutLTRBackgroundImageAlignment:bottom right;--udexHeroBannerVerticalLayoutRTLBackgroundImageAlignment:bottom left;--udexHeroBannerHorizontalLayoutLTRBackgroundImageAlignment:top right;--udexHeroBannerHorizontalLayoutRTLBackgroundImageAlignment:top left;--udexHeroBannerBackroundImageZIndex:1;--udexHeroBannerContentZIndex:2;--udexHeroBannerContentPaddingHorizontal:var(--udexGridXSMargins,24px);--udexHeroBannerContentPaddingVertical:var(--udexGridXSMargins,24px)}.udex-hero-banner{container-type:inline-size;display:flex;flex-wrap:wrap;min-height:var(--udexHeroBannerMinHeight,200px);position:relative}.udex-hero-banner__background-image{height:100%;object-fit:var(--udexHeroBannerBackgroundImageObjectFit,contain);object-position:var(--udexHeroBannerVerticalLayoutLTRBackgroundImageAlignment,bottom right);position:absolute;width:100%;z-index:var(--udexHeroBannerBackroundImageZIndex,1)}.udex-hero-banner__background-image:dir(ltr){object-position:var(--udexHeroBannerVerticalLayoutLTRBackgroundImageAlignment,bottom right)}.udex-hero-banner__background-image:dir(rtl){object-position:var(--udexHeroBannerVerticalLayoutRTLBackgroundImageAlignment,bottom left)}.udex-hero-banner slot[name=additionalContent],.udex-hero-banner slot[name=content]{display:flex;flex-basis:100%;flex-grow:1;padding:var(--udexHeroBannerContentPaddingVertical,24px) var(--udexHeroBannerContentPaddingHorizontal,24px);z-index:var(--udexHeroBannerContentZIndex,2)}@container (min-width: 800px){.udex-hero-banner__background-image,.udex-hero-banner__background-image:dir(ltr){object-position:var(--udexHeroBannerHorizontalLayoutLTRBackgroundImageAlignment,top right)}.udex-hero-banner__background-image:dir(rtl){object-position:var(--udexHeroBannerHorizontalLayoutRTLBackgroundImageAlignment,top left)}.udex-hero-banner slot[name=additionalContent],.udex-hero-banner slot[name=content]{flex-basis:var(--udexHeroBannerSlotMaxWidth);max-width:var(--udexHeroBannerSlotMaxWidth)}}" };
var k = function(t, e, o, r) {
  var a = arguments.length, n = a < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, o) : r, s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    n = Reflect.decorate(t, e, o, r);
  else
    for (var i = t.length - 1; i >= 0; i--)
      (s = t[i]) && (n = (a < 3 ? s(n) : a > 3 ? s(e, o, n) : s(e, o)) || n);
  return a > 3 && n && Object.defineProperty(e, o, n), n;
}, le;
(function(t) {
  t.eager = "eager", t.lazy = "lazy";
})(le || (le = {}));
let v = class extends ue {
  get hasBackgroundImage() {
    return !!this.backgroundImage;
  }
  get wrapperBackgroundColor() {
    return this.backgroundColor ? this.backgroundColor : "transparent";
  }
  get hasAdditionalContent() {
    var e;
    return !!((e = this.additionalContent) != null && e.length);
  }
  get hasCustomBackgroundPicture() {
    var e;
    return !!((e = this.backgroundPicture) != null && e.length);
  }
};
k([
  pe({ type: String })
], v.prototype, "backgroundImage", void 0);
k([
  pe({ type: le, defaultValue: le.eager })
], v.prototype, "backgroundImageLoadingStrategy", void 0);
k([
  pe({ type: String })
], v.prototype, "backgroundImageLabel", void 0);
k([
  pe({ type: String })
], v.prototype, "backgroundColor", void 0);
k([
  Ne()
], v.prototype, "content", void 0);
k([
  Ne()
], v.prototype, "additionalContent", void 0);
k([
  Ne()
], v.prototype, "backgroundPicture", void 0);
v = k([
  Kr({
    tag: "udex-hero-banner",
    renderer: ca,
    styles: ma,
    template: _a
  })
], v);
v.define();
