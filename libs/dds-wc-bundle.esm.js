class EventProvider {
    constructor() {
        this._eventRegistry = new Map();
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
        return eventListeners.map(fn => {
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

const MAX_PROCESS_COUNT = 10;
class RenderQueue {
    constructor() {
        this.list = []; // Used to store the web components in order
        this.lookup = new Set(); // Used for faster search
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
        this.list = this.list.filter(item => item !== webComponent);
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
        const stats = new Map();
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

/**
 * Returns a singleton HTML element, inserted in given parent element of HTML page,
 * used mostly to store and share global resources between multiple UI5 Web Components runtimes.
 *
 * @param { string } tag the element tag/selector
 * @param { HTMLElement } parentElement the parent element to insert the singleton element instance
 * @param { Function } createEl a factory function for the element instantiation, by default document.createElement is used
 * @returns { Element }
 */
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
    el.setAttribute("content", ""); // attribute "content" should be present when "name" is set.
    return el;
};
const getSharedResourcesInstance = () => {
    if (typeof document === "undefined") {
        return null;
    }
    return getSingletonElementInstance(`meta[name="ui5-shared-resources"]`, document.head, getMetaDomEl);
};
/**
 * Use this method to initialize/get resources that you would like to be shared among UI5 Web Components runtime instances.
 * The data will be accessed via a singleton "ui5-shared-resources" HTML element in the "body" element of the page.
 *
 * @public
 * @param namespace Unique ID of the resource, may contain "." to denote hierarchy
 * @param initialValue Object or primitive that will be used as an initial value if the resource does not exist
 * @returns {*}
 */
const getSharedResource = (namespace, initialValue) => {
    const parts = namespace.split(".");
    let current = getSharedResourcesInstance();
    if (!current) {
        return initialValue;
    }
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const lastPart = i === parts.length - 1;
        if (!Object.prototype.hasOwnProperty.call(current, part)) {
            current[part] = lastPart ? initialValue : {};
        }
        current = current[part];
    }
    return current;
};

const VersionInfo = {
	version: "0.0.0-c6c04c609",
	major: 0,
	minor: 0,
	patch: 0,
	suffix: "-c6c04c609",
	isNext: true,
	buildTime: 1700752478,
};

let currentRuntimeIndex;
let currentRuntimeAlias = "";
const compareCache = new Map();
/**
 * Central registry where all runtimes register themselves by pushing an object.
 * The index in the registry servers as an ID for the runtime.
 * @type {*}
 */
const Runtimes = getSharedResource("Runtimes", []);
/**
 * Registers the current runtime in the shared runtimes resource registry
 */
const registerCurrentRuntime = () => {
    if (currentRuntimeIndex === undefined) {
        currentRuntimeIndex = Runtimes.length;
        const versionInfo = VersionInfo;
        Runtimes.push({
            ...versionInfo,
            alias: currentRuntimeAlias,
            description: `Runtime ${currentRuntimeIndex} - ver ${versionInfo.version}${""}`,
        });
    }
};
/**
 * Returns the index of the current runtime's object in the shared runtimes resource registry
 * @returns {*}
 */
const getCurrentRuntimeIndex = () => {
    return currentRuntimeIndex;
};
/**
 * Compares two runtimes and returns 1 if the first is of a bigger version, -1 if the second is of a bigger version, and 0 if equal
 * @param index1 The index of the first runtime to compare
 * @param index2 The index of the second runtime to compare
 * @returns {number}
 */
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
    // If any of the two is a next version, bigger buildTime wins
    if (runtime1.isNext || runtime2.isNext) {
        return runtime1.buildTime - runtime2.buildTime;
    }
    // If major versions differ, bigger one wins
    const majorDiff = runtime1.major - runtime2.major;
    if (majorDiff) {
        return majorDiff;
    }
    // If minor versions differ, bigger one wins
    const minorDiff = runtime1.minor - runtime2.minor;
    if (minorDiff) {
        return minorDiff;
    }
    // If patch versions differ, bigger one wins
    const patchDiff = runtime1.patch - runtime2.patch;
    if (patchDiff) {
        return patchDiff;
    }
    // Bigger suffix wins, f.e. rc10 > rc9
    // Important: suffix is alphanumeric, must use natural compare
    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });
    const result = collator.compare(runtime1.suffix, runtime2.suffix);
    compareCache.set(cacheIndex, result);
    return result;
};
const getAllRuntimes = () => {
    return Runtimes;
};

const Tags = getSharedResource("Tags", new Map());
const Definitions = new Set();
let Failures = new Map();
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
    if (tagRegRuntimeIndex === undefined) {
        tagRegRuntimeIndex = UNKNOWN_RUNTIME; // If the tag is taken, but not registered in Tags, then a version before 1.1.0 defined it => use the "unknown" key
    }
    if (!Failures.has(tagRegRuntimeIndex)) {
        Failures.set(tagRegRuntimeIndex, new Set());
    }
    Failures.get(tagRegRuntimeIndex).add(tag);
    if (!failureTimeout) {
        failureTimeout = setTimeout(() => {
            displayFailedRegistrations();
            Failures = new Map();
            failureTimeout = undefined;
        }, 1000);
    }
};
const displayFailedRegistrations = () => {
    const allRuntimes = getAllRuntimes();
    const currentRuntimeIndex = getCurrentRuntimeIndex();
    const currentRuntime = allRuntimes[currentRuntimeIndex];
    let message = `Multiple UI5 Web Components instances detected.`;
    if (allRuntimes.length > 1) {
        message = `${message}\nLoading order (versions before 1.1.0 not listed): ${allRuntimes.map(runtime => `\n${runtime.description}`).join("")}`;
    }
    [...Failures.keys()].forEach(otherRuntimeIndex => {
        let comparison;
        let otherRuntime;
        if (otherRuntimeIndex === UNKNOWN_RUNTIME) { // version < 1.1.0 defined the tag
            comparison = 1; // the current runtime is considered newer
            otherRuntime = {
                description: `Older unknown runtime`,
            };
        }
        else {
            comparison = compareRuntimes(currentRuntimeIndex, otherRuntimeIndex);
            otherRuntime = allRuntimes[otherRuntimeIndex];
        }
        let compareWord;
        if (comparison > 0) {
            compareWord = "an older";
        }
        else if (comparison < 0) {
            compareWord = "a newer";
        }
        else {
            compareWord = "the same";
        }
        message = `${message}\n\n"${currentRuntime.description}" failed to define ${Failures.get(otherRuntimeIndex).size} tag(s) as they were defined by a runtime of ${compareWord} version "${otherRuntime.description}": ${([...Failures.get(otherRuntimeIndex)]).sort().join(", ")}.`;
        if (comparison > 0) {
            message = `${message}\nWARNING! If your code uses features of the above web components, unavailable in ${otherRuntime.description}, it might not work as expected!`;
        }
        else {
            message = `${message}\nSince the above web components were defined by the same or newer version runtime, they should be compatible with your code.`;
        }
    });
    message = `${message}\n\nTo prevent other runtimes from defining tags that you use, consider using scoping or have third-party libraries use scoping: https://github.com/SAP/ui5-webcomponents/blob/main/docs/2-advanced/03-scoping.md.`;
    console.warn(message); // eslint-disable-line
};

const rtlAwareSet = new Set();
const markAsRtlAware = (klass) => {
    rtlAwareSet.add(klass);
};
const isRtlAware = (klass) => {
    return rtlAwareSet.has(klass);
};

const registeredElements = new Set();
const eventProvider$4 = new EventProvider();
const invalidatedWebComponents = new RenderQueue(); // Queue for invalidated web components
let renderTaskPromise, renderTaskPromiseResolve;
let mutationObserverTimer;
let queuePromise;
/**
 * Schedules a render task (if not already scheduled) to render the component
 *
 * @param webComponent
 * @returns {Promise}
 */
const renderDeferred = async (webComponent) => {
    // Enqueue the web component
    invalidatedWebComponents.add(webComponent);
    // Schedule a rendering task
    await scheduleRenderTask();
};
/**
 * Renders a component synchronously and adds it to the registry of rendered components
 *
 * @param webComponent
 */
const renderImmediately = (webComponent) => {
    eventProvider$4.fireEvent("beforeComponentRender", webComponent);
    registeredElements.add(webComponent);
    webComponent._render();
};
/**
 * Cancels the rendering of a component, if awaiting to be rendered, and removes it from the registry of rendered components
 *
 * @param webComponent
 */
const cancelRender = (webComponent) => {
    invalidatedWebComponents.remove(webComponent);
    registeredElements.delete(webComponent);
};
/**
 * Schedules a rendering task, if not scheduled already
 */
const scheduleRenderTask = async () => {
    if (!queuePromise) {
        queuePromise = new Promise(resolve => {
            window.requestAnimationFrame(() => {
                // Render all components in the queue
                // console.log(`--------------------RENDER TASK START------------------------------`); // eslint-disable-line
                invalidatedWebComponents.process(renderImmediately);
                // console.log(`--------------------RENDER TASK END------------------------------`); // eslint-disable-line
                // Resolve the promise so that callers of renderDeferred can continue
                queuePromise = null;
                resolve();
                // Wait for Mutation observer before the render task is considered finished
                if (!mutationObserverTimer) {
                    mutationObserverTimer = setTimeout(() => {
                        mutationObserverTimer = undefined;
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
/**
 * return a promise that will be resolved once all invalidated web components are rendered
 */
const whenDOMUpdated = () => {
    if (renderTaskPromise) {
        return renderTaskPromise;
    }
    renderTaskPromise = new Promise(resolve => {
        renderTaskPromiseResolve = resolve;
        window.requestAnimationFrame(() => {
            if (invalidatedWebComponents.isEmpty()) {
                renderTaskPromise = undefined;
                resolve();
            }
        });
    });
    return renderTaskPromise;
};
const whenAllCustomElementsAreDefined = () => {
    const definedPromises = getAllRegisteredTags().map(tag => customElements.whenDefined(tag));
    return Promise.all(definedPromises);
};
const renderFinished = async () => {
    await whenAllCustomElementsAreDefined();
    await whenDOMUpdated();
};
const _resolveTaskPromise = () => {
    if (!invalidatedWebComponents.isEmpty()) {
        // More updates are pending. Resolve will be called again
        return;
    }
    if (renderTaskPromiseResolve) {
        renderTaskPromiseResolve();
        renderTaskPromiseResolve = undefined;
        renderTaskPromise = undefined;
    }
};
/**
 * Re-renders all UI5 Elements on the page, with the option to specify filters to rerender only some components.
 *
 * Usage:
 * reRenderAllUI5Elements() -> re-renders all components
 * reRenderAllUI5Elements({tag: "ui5-button"}) -> re-renders only instances of ui5-button
 * reRenderAllUI5Elements({rtlAware: true}) -> re-renders only rtlAware components
 * reRenderAllUI5Elements({languageAware: true}) -> re-renders only languageAware components
 * reRenderAllUI5Elements({themeAware: true}) -> re-renders only themeAware components
 * reRenderAllUI5Elements({rtlAware: true, languageAware: true}) -> re-renders components that are rtlAware or languageAware
 * etc...
 *
 * @public
 * @param {object|undefined} filters - Object with keys that can be "rtlAware" or "languageAware"
 * @returns {Promise<void>}
 */
const reRenderAllUI5Elements = async (filters) => {
    registeredElements.forEach((element) => {
        const ctor = element.constructor;
        const tag = ctor.getMetadata().getTag();
        const rtlAware = isRtlAware(ctor);
        const languageAware = ctor.getMetadata().isLanguageAware();
        const themeAware = ctor.getMetadata().isThemeAware();
        if (!filters || (filters.tag === tag) || (filters.rtlAware && rtlAware) || (filters.languageAware && languageAware) || (filters.themeAware && themeAware)) {
            renderDeferred(element);
        }
    });
    await renderFinished();
};

var class2type = {};
var hasOwn = class2type.hasOwnProperty;
var toString = class2type.toString;
var fnToString = hasOwn.toString;
var ObjectFunctionString = fnToString.call(Object);
var fnIsPlainObject = function (obj) {
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

var oToken = Object.create(null);
var fnMerge$1 = function (arg1, arg2, arg3, arg4) {
    var src, copyIsArray, copy, name, options, clone, target = arguments[2] || {}, i = 3, length = arguments.length, deep = arguments[0] || false, skipToken = arguments[1] ? undefined : oToken;
    if (typeof target !== 'object' && typeof target !== 'function') {
        target = {};
    }
    for (; i < length; i++) {
        if ((options = arguments[i]) != null) {
            for (name in options) {
                src = target[name];
                copy = options[name];
                if (name === '__proto__' || target === copy) {
                    continue;
                }
                if (deep && copy && (fnIsPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && Array.isArray(src) ? src : [];
                    }
                    else {
                        clone = src && fnIsPlainObject(src) ? src : {};
                    }
                    target[name] = fnMerge$1(deep, arguments[1], clone, copy);
                }
                else if (copy !== skipToken) {
                    target[name] = copy;
                }
            }
        }
    }
    return target;
};

const fnMerge = function (arg1, arg2) {
    return fnMerge$1(true, false, ...arguments);
};

const features = new Map();
const registerFeature = (name, feature) => {
    features.set(name, feature);
};
const getFeature = (name) => {
    return features.get(name);
};

const assetParameters = {"themes":{"default":"sap_horizon","all":["sap_fiori_3","sap_fiori_3_dark","sap_belize","sap_belize_hcb","sap_belize_hcw","sap_fiori_3_hcb","sap_fiori_3_hcw","sap_horizon","sap_horizon_dark","sap_horizon_hcb","sap_horizon_hcw","sap_horizon_exp","sap_horizon_dark_exp","sap_horizon_hcb_exp","sap_horizon_hcw_exp"]},"languages":{"default":"en","all":["ar","bg","ca","cs","cy","da","de","el","en","en_GB","en_US_sappsd","en_US_saprigi","en_US_saptrc","es","es_MX","et","fi","fr","fr_CA","hi","hr","hu","in","it","iw","ja","kk","ko","lt","lv","ms","nl","no","pl","pt_PT","pt","ro","ru","sh","sk","sl","sv","th","tr","uk","vi","zh_CN","zh_TW"]},"locales":{"default":"en","all":["ar","ar_EG","ar_SA","bg","ca","cs","da","de","de_AT","de_CH","el","el_CY","en","en_AU","en_GB","en_HK","en_IE","en_IN","en_NZ","en_PG","en_SG","en_ZA","es","es_AR","es_BO","es_CL","es_CO","es_MX","es_PE","es_UY","es_VE","et","fa","fi","fr","fr_BE","fr_CA","fr_CH","fr_LU","he","hi","hr","hu","id","it","it_CH","ja","kk","ko","lt","lv","ms","nb","nl","nl_BE","pl","pt","pt_PT","ro","ru","ru_UA","sk","sl","sr","sr_Latn","sv","th","tr","uk","vi","zh_CN","zh_HK","zh_SG","zh_TW"]}};

const DEFAULT_THEME = assetParameters.themes.default;
const DEFAULT_LANGUAGE = assetParameters.languages.default;
const DEFAULT_LOCALE = assetParameters.locales.default;

const getMetaTagValue = (metaTagName) => {
    const metaTag = document.querySelector(`META[name="${metaTagName}"]`), metaTagContent = metaTag && metaTag.getAttribute("content");
    return metaTagContent;
};
const validateThemeOrigin = (origin) => {
    const allowedOrigins = getMetaTagValue("sap-allowedThemeOrigins");
    return allowedOrigins && allowedOrigins.split(",").some(allowedOrigin => {
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
            // Handle relative url
            // new URL("/newExmPath", "http://example.com/exmPath") => http://example.com/newExmPath
            // new URL("./newExmPath", "http://example.com/exmPath") => http://example.com/exmPath/newExmPath
            // new URL("../newExmPath", "http://example.com/exmPath") => http://example.com/newExmPath
            resultUrl = new URL(themeRoot, window.location.href).toString();
        }
        else {
            const themeRootURL = new URL(themeRoot);
            const origin = themeRootURL.origin;
            if (origin && validateThemeOrigin(origin)) {
                // If origin is allowed, use it
                resultUrl = themeRootURL.toString();
            }
            else {
                // If origin is not allow and the URL is not relative, we have to replace the origin
                // with current location
                resultUrl = buildCorrectUrl(themeRootURL.toString(), window.location.href);
            }
        }
        if (!resultUrl.endsWith("/")) {
            resultUrl = `${resultUrl}/`;
        }
        return `${resultUrl}UI5/`;
    }
    catch (e) {
        // Catch if URL is not correct
    }
};

/**
 * Different types of AnimationMode.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.base.types.AnimationMode
 */
var AnimationMode;
(function (AnimationMode) {
    /**
     * @public
     * @type {Full}
     */
    AnimationMode["Full"] = "full";
    /**
     * @public
     * @type {Basic}
     */
    AnimationMode["Basic"] = "basic";
    /**
     * @public
     * @type {Minimal}
     */
    AnimationMode["Minimal"] = "minimal";
    /**
     * @public
     * @type {None}
     */
    AnimationMode["None"] = "none";
})(AnimationMode || (AnimationMode = {}));
var AnimationMode$1 = AnimationMode;

let initialized = false;
let initialConfig = {
    animationMode: AnimationMode$1.Full,
    theme: DEFAULT_THEME,
    themeRoot: undefined,
    rtl: undefined,
    language: undefined,
    timezone: undefined,
    calendarType: undefined,
    secondaryCalendarType: undefined,
    noConflict: false,
    formatSettings: {},
    fetchDefaultLanguage: false,
};
/* General settings */
const getAnimationMode$1 = () => {
    initConfiguration();
    return initialConfig.animationMode;
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
/**
 * Returns if the default language, that is inlined at build time,
 * should be fetched over the network instead.
 * @returns {Boolean}
 */
const getFetchDefaultLanguage$1 = () => {
    initConfiguration();
    return initialConfig.fetchDefaultLanguage;
};
const getNoConflict$1 = () => {
    initConfiguration();
    return initialConfig.noConflict;
};
/**
 * Get the configured calendar type
 * @returns { String } the name of the configured calendar type
 */
const getCalendarType$1 = () => {
    initConfiguration();
    return initialConfig.calendarType;
};
const getFormatSettings = () => {
    initConfiguration();
    return initialConfig.formatSettings;
};
const booleanMapping = new Map();
booleanMapping.set("true", true);
booleanMapping.set("false", false);
const parseConfigurationScript = () => {
    const configScript = document.querySelector("[data-ui5-config]") || document.querySelector("[data-id='sap-ui-config']"); // for backward compatibility
    let configJSON;
    if (configScript) {
        try {
            configJSON = JSON.parse(configScript.innerHTML);
        }
        catch (err) {
            console.warn("Incorrect data-sap-ui-config format. Please use JSON"); /* eslint-disable-line */
        }
        if (configJSON) {
            initialConfig = fnMerge(initialConfig, configJSON);
        }
    }
};
const parseURLParameters = () => {
    const params = new URLSearchParams(window.location.search);
    // Process "sap-*" params first
    params.forEach((value, key) => {
        const parts = key.split("sap-").length;
        if (parts === 0 || parts === key.split("sap-ui-").length) {
            return;
        }
        applyURLParam(key, value, "sap");
    });
    // Process "sap-ui-*" params
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
    if (param === "theme" && value.includes("@")) { // the theme parameter might have @<URL-TO-THEME> in the value - strip this
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
    }
    else {
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
    // 1. Lowest priority - configuration script
    parseConfigurationScript();
    // 2. URL parameters overwrite configuration script parameters
    parseURLParameters();
    // 3. If OpenUI5 is detected, it has the highest priority
    applyOpenUI5Configuration();
    initialized = true;
};

let curAnimationMode;
/**
 * Returns the animation mode - "full", "basic", "minimal" or "none".
 * @public
 * @returns { AnimationMode }
 */
const getAnimationMode = () => {
    if (curAnimationMode === undefined) {
        curAnimationMode = getAnimationMode$1();
    }
    return curAnimationMode;
};

const eventProvider$3 = new EventProvider();
const LANG_CHANGE = "languageChange";
const attachLanguageChange = (listener) => {
    eventProvider$3.attachEvent(LANG_CHANGE, listener);
};

let curLanguage;
let fetchDefaultLanguage;
/**
 * Returns the currently configured language, or the browser language as a fallback.
 * @public
 * @returns {string}
 */
const getLanguage = () => {
    if (curLanguage === undefined) {
        curLanguage = getLanguage$1();
    }
    return curLanguage;
};
/**
 * Defines if the default language, that is inlined, should be
 * fetched over the network instead of using the inlined one.
 * <b>Note:</b> By default the language will not be fetched.
 *
 * @public
 * @param {boolean} fetchDefaultLang
 */
const setFetchDefaultLanguage = (fetchDefaultLang) => {
    fetchDefaultLanguage = fetchDefaultLang;
};
/**
 * Returns if the default language, that is inlined, should be fetched over the network.
 * @public
 * @returns {boolean}
 */
const getFetchDefaultLanguage = () => {
    if (fetchDefaultLanguage === undefined) {
        setFetchDefaultLanguage(getFetchDefaultLanguage$1());
    }
    return fetchDefaultLanguage;
};

/**
 * Different calendar types.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.base.types.CalendarType
 */
var CalendarType;
(function (CalendarType) {
    /**
     * @public
     * @type {Gregorian}
     */
    CalendarType["Gregorian"] = "Gregorian";
    /**
     * @public
     * @type {Islamic}
     */
    CalendarType["Islamic"] = "Islamic";
    /**
     * @public
     * @type {Japanese}
     */
    CalendarType["Japanese"] = "Japanese";
    /**
     * @public
     * @type {Buddhist}
     */
    CalendarType["Buddhist"] = "Buddhist";
    /**
     * @public
     * @type {Persian}
     */
    CalendarType["Persian"] = "Persian";
})(CalendarType || (CalendarType = {}));
var CalendarType$1 = CalendarType;

let calendarType;
/**
 * Returns the configured or default calendar type.
 * @public
 * @returns { CalendarType } the effective calendar type
 */
const getCalendarType = () => {
    if (calendarType === undefined) {
        calendarType = getCalendarType$1();
    }
    if (calendarType && calendarType in CalendarType$1) {
        return calendarType;
    }
    return CalendarType$1.Gregorian;
};

/**
 * Creates a <style> tag in the <head> tag
 * @param cssText - the CSS
 * @param attributes - optional attributes to add to the tag
 * @returns {HTMLElement}
 */
const createStyleInHead = (cssText, attributes) => {
    const style = document.createElement("style");
    style.type = "text/css";
    if (attributes) {
        Object.entries(attributes).forEach(pair => style.setAttribute(...pair));
    }
    style.textContent = cssText;
    document.head.appendChild(style);
    return style;
};

/**
 * Creates a <link> tag in the <head> tag
 * @param href - the CSS
 * @param attributes - optional attributes to add to the tag
 */
const createLinkInHead = (href, attributes) => {
    const link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    if (attributes) {
        Object.entries(attributes).forEach(pair => link.setAttribute(...pair));
    }
    link.href = href;
    document.head.appendChild(link);
    return new Promise(resolve => {
        link.addEventListener("load", resolve);
        link.addEventListener("error", resolve); // intended
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
        return !!(navigator.platform.match(/iPhone|iPad|iPod/)) || !!(internals.userAgent.match(/Mac/) && "ontouchend" in document);
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
        // With iOS 13 the string 'iPad' was removed from the user agent string through a browser setting, which is applied on all sites by default:
        // "Request Desktop Website -> All websites" (for more infos see: https://forums.developer.apple.com/thread/119186).
        // Therefore the OS is detected as MACINTOSH instead of iOS and the device is a tablet if the Device.support.touch is true.
        return /ipad/i.test(internals.userAgent) || (/Macintosh/i.test(internals.userAgent) && "ontouchend" in document);
    },
};
const isSafari = () => internals.safari;

const getStyleId = (name, value) => {
    return value ? `${name}|${value}` : name;
};
const shouldUpdate = (runtimeIndex) => {
    if (runtimeIndex === undefined) {
        return true;
    }
    return compareRuntimes(getCurrentRuntimeIndex(), parseInt(runtimeIndex)) === 1; // 1 means the current is newer, 0 means the same, -1 means the resource's runtime is newer
};
const createStyle = (data, name, value = "", theme) => {
    const content = typeof data === "string" ? data : data.content;
    const currentRuntimeIndex = getCurrentRuntimeIndex();
    if (document.adoptedStyleSheets && !isSafari()) {
        const stylesheet = new CSSStyleSheet();
        stylesheet.replaceSync(content);
        stylesheet._ui5StyleId = getStyleId(name, value); // set an id so that we can find the style later
        if (theme) {
            stylesheet._ui5RuntimeIndex = currentRuntimeIndex;
            stylesheet._ui5Theme = theme;
        }
        document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];
    }
    else {
        const attributes = {};
        attributes[name] = value;
        if (theme) {
            attributes["data-ui5-runtime-index"] = currentRuntimeIndex;
            attributes["data-ui5-theme"] = theme;
        }
        createStyleInHead(content, attributes);
    }
};
const updateStyle = (data, name, value = "", theme) => {
    const content = typeof data === "string" ? data : data.content;
    const currentRuntimeIndex = getCurrentRuntimeIndex();
    if (document.adoptedStyleSheets && !isSafari()) {
        const stylesheet = document.adoptedStyleSheets.find(sh => sh._ui5StyleId === getStyleId(name, value));
        if (!stylesheet) {
            return;
        }
        if (!theme) {
            stylesheet.replaceSync(content || "");
        }
        else {
            const stylesheetRuntimeIndex = stylesheet._ui5RuntimeIndex;
            const stylesheetTheme = stylesheet._ui5Theme;
            if (stylesheetTheme !== theme || shouldUpdate(stylesheetRuntimeIndex)) {
                stylesheet.replaceSync(content || "");
                stylesheet._ui5RuntimeIndex = String(currentRuntimeIndex);
                stylesheet._ui5Theme = theme;
            }
        }
    }
    else {
        const style = document.querySelector(`head>style[${name}="${value}"]`);
        if (!style) {
            return;
        }
        if (!theme) {
            style.textContent = content || "";
        }
        else {
            const styleRuntimeIndex = style.getAttribute("data-ui5-runtime-index") || undefined;
            const styleTheme = style.getAttribute("data-ui5-theme");
            if (styleTheme !== theme || shouldUpdate(styleRuntimeIndex)) {
                style.textContent = content || "";
                style.setAttribute("data-ui5-runtime-index", String(currentRuntimeIndex));
                style.setAttribute("data-ui5-theme", theme);
            }
        }
    }
};
const hasStyle = (name, value = "") => {
    const styleElement = document.querySelector(`head>style[${name}="${value}"]`);
    if (document.adoptedStyleSheets && !isSafari()) {
        return !!styleElement || !!document.adoptedStyleSheets.find(sh => sh._ui5StyleId === getStyleId(name, value));
    }
    return !!styleElement;
};
const removeStyle = (name, value = "") => {
    if (document.adoptedStyleSheets && !isSafari()) {
        document.adoptedStyleSheets = document.adoptedStyleSheets.filter(sh => sh._ui5StyleId !== getStyleId(name, value));
    }
    else {
        const styleElement = document.querySelector(`head > style[${name}="${value}"]`);
        styleElement?.parentElement?.removeChild(styleElement);
    }
};
const createOrUpdateStyle = (data, name, value = "", theme) => {
    if (hasStyle(name, value)) {
        updateStyle(data, name, value, theme);
    }
    else {
        createStyle(data, name, value, theme);
    }
};
const mergeStyles = (style1, style2) => {
    if (style1 === undefined) {
        return style2;
    }
    if (style2 === undefined) {
        return style1;
    }
    const style2Content = typeof style2 === "string" ? style2 : style2.content;
    if (typeof style1 === "string") {
        return `${style1} ${style2Content}`;
    }
    return {
        content: `${style1.content} ${style2Content}`,
        packageName: style1.packageName,
        fileName: style1.fileName,
    };
};

const eventProvider$2 = new EventProvider();
const THEME_REGISTERED = "themeRegistered";
const attachThemeRegistered = (listener) => {
    eventProvider$2.attachEvent(THEME_REGISTERED, listener);
};
const fireThemeRegistered = (theme) => {
    return eventProvider$2.fireEvent(THEME_REGISTERED, theme);
};

const themeStyles = new Map();
const loaders$1 = new Map();
const customLoaders = new Map();
const registeredPackages = new Set();
const registeredThemes = new Set();
const registerThemePropertiesLoader = (packageName, themeName, loader) => {
    loaders$1.set(`${packageName}/${themeName}`, loader);
    registeredPackages.add(packageName);
    registeredThemes.add(themeName);
    fireThemeRegistered(themeName);
};
const getThemeProperties = async (packageName, themeName, externalThemeName) => {
    const cacheKey = `${packageName}_${themeName}_${externalThemeName || ""}`;
    const cachedStyleData = themeStyles.get(cacheKey);
    if (cachedStyleData !== undefined) { // it's valid for style to be an empty string
        return cachedStyleData;
    }
    if (!registeredThemes.has(themeName)) {
        const regThemesStr = [...registeredThemes.values()].join(", ");
        console.warn(`You have requested a non-registered theme ${themeName} - falling back to ${DEFAULT_THEME}. Registered themes are: ${regThemesStr}`); /* eslint-disable-line */
        return _getThemeProperties(packageName, DEFAULT_THEME);
    }
    const [style, customStyle] = await Promise.all([
        _getThemeProperties(packageName, themeName),
        externalThemeName ? _getThemeProperties(packageName, externalThemeName, true) : undefined,
    ]);
    const styleData = mergeStyles(style, customStyle);
    if (styleData) {
        themeStyles.set(cacheKey, styleData);
    }
    return styleData;
};
const _getThemeProperties = async (packageName, themeName, forCustomTheme = false) => {
    const loadersMap = forCustomTheme ? customLoaders : loaders$1;
    const loader = loadersMap.get(`${packageName}/${themeName}`);
    if (!loader) {
        // no themes for package
        if (!forCustomTheme) {
            console.error(`Theme [${themeName}] not registered for package [${packageName}]`); /* eslint-disable-line */
        }
        return;
    }
    let data;
    try {
        data = await loader(themeName);
    }
    catch (error) {
        const e = error;
        console.error(packageName, e.message); /* eslint-disable-line */
        return;
    }
    const themeProps = data._ || data; // Refactor: remove _ everywhere
    return themeProps;
};
const getRegisteredPackages = () => {
    return registeredPackages;
};
const isThemeRegistered = (theme) => {
    return registeredThemes.has(theme);
};

const warnings = new Set();
const getThemeMetadata = () => {
    // Check if the class was already applied, most commonly to the link/style tag with the CSS Variables
    let el = document.querySelector(".sapThemeMetaData-Base-baseLib") || document.querySelector(".sapThemeMetaData-UI5-sap-ui-core");
    if (el) {
        return getComputedStyle(el).backgroundImage;
    }
    el = document.createElement("span");
    el.style.display = "none";
    // Try with sapThemeMetaData-Base-baseLib first
    el.classList.add("sapThemeMetaData-Base-baseLib");
    document.body.appendChild(el);
    let metadata = getComputedStyle(el).backgroundImage;
    // Try with sapThemeMetaData-UI5-sap-ui-core only if the previous selector was not found
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
            }
            catch (ex) {
                if (!warnings.has("decode")) {
                    console.warn("Malformed theme metadata string, unable to decodeURIComponent"); // eslint-disable-line
                    warnings.add("decode");
                }
                return;
            }
        }
        try {
            return JSON.parse(paramsString);
        }
        catch (ex) {
            if (!warnings.has("parse")) {
                console.warn("Malformed theme metadata string, unable to parse JSON"); // eslint-disable-line
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
    }
    catch (ex) {
        if (!warnings.has("object")) {
            console.warn("Malformed theme metadata Object", metadata); // eslint-disable-line
            warnings.add("object");
        }
        return;
    }
    return {
        themeName,
        baseThemeName,
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

const eventProvider$1 = new EventProvider();
const THEME_LOADED = "themeLoaded";
const fireThemeLoaded = (theme) => {
    return eventProvider$1.fireEvent(THEME_LOADED, theme);
};

let currThemeRoot;
/**
 * Returns the current theme root.
 *
 * @public
 * @since 1.14.0
 * @returns { string } the current theme root
 */
const getThemeRoot = () => {
    if (currThemeRoot === undefined) {
        currThemeRoot = getThemeRoot$1();
    }
    return currThemeRoot;
};
const formatThemeLink = (theme) => {
    return `${getThemeRoot()}Base/baseLib/${theme}/css_variables.css`; // theme root is always set at this point.
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
    const registeredPackages = getRegisteredPackages();
    return registeredPackages.has(BASE_THEME_PACKAGE);
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
    const registeredPackages = getRegisteredPackages();
    const packagesStylesPromises = [...registeredPackages].map(async (packageName) => {
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
    // If theme designer theme is detected, use this
    const extTheme = getThemeDesignerTheme();
    if (extTheme) {
        return extTheme;
    }
    // If OpenUI5Support is enabled, try to find out if it loaded variables
    const openUI5Support = getFeature("OpenUI5Support");
    if (openUI5Support && openUI5Support.isOpenUI5Detected()) {
        const varsLoaded = openUI5Support.cssVariablesLoaded();
        if (varsLoaded) {
            return {
                themeName: openUI5Support.getConfigurationSettingsObject()?.theme,
                baseThemeName: "", // baseThemeName is only relevant for custom themes
            };
        }
    }
    else if (getThemeRoot()) {
        await attachCustomThemeStylesToHead(theme);
        return getThemeDesignerTheme();
    }
};
const applyTheme = async (theme) => {
    const extTheme = await detectExternalTheme(theme);
    // Only load theme_base properties if there is no externally loaded theme, or there is, but it is not being loaded
    if (!extTheme || theme !== extTheme.themeName) {
        await loadThemeBase(theme);
    }
    else {
        deleteThemeBase();
    }
    // Always load component packages properties. For non-registered themes, try with the base theme, if any
    const packagesTheme = isThemeRegistered(theme) ? theme : extTheme && extTheme.baseThemeName;
    await loadComponentPackages(packagesTheme || DEFAULT_THEME, extTheme && extTheme.themeName === theme ? theme : undefined);
    fireThemeLoaded(theme);
};

let curTheme;
/**
 * Returns the current theme.
 * @public
 * @returns {string} the current theme name
 */
const getTheme = () => {
    if (curTheme === undefined) {
        curTheme = getTheme$1();
    }
    return curTheme;
};
/**
 * Applies a new theme after fetching its assets from the network.
 * @public
 * @param {string} theme the name of the new theme
 * @returns {Promise<void>} a promise that is resolved when the new theme assets have been fetched and applied to the DOM
 */
const setTheme = async (theme) => {
    if (curTheme === theme) {
        return;
    }
    curTheme = theme;
    // Update CSS Custom Properties
    await applyTheme(curTheme);
    await reRenderAllUI5Elements({ themeAware: true });
};

// Fire these events even with noConflict: true
const excludeList = [
    "value-changed",
    "click",
];
let noConflict;
const shouldFireOriginalEvent = (eventName) => {
    return excludeList.includes(eventName);
};
const shouldNotFireOriginalEvent = (eventName) => {
    const nc = getNoConflict();
    // return !(nc.events && nc.events.includes && nc.events.includes(eventName));
    return !(typeof nc !== "boolean" && nc.events && nc.events.includes && nc.events.includes(eventName));
};
/**
 * Returns if the "noConflict" configuration is set.
 * @public
 * @returns { NoConflictData }
 */
const getNoConflict = () => {
    if (noConflict === undefined) {
        noConflict = getNoConflict$1();
    }
    return noConflict;
};
/**
 * Sets the "noConflict" mode.
 * - When "false" (default value), all custom events are fired with and without the "ui5-" prefix.
 * - When "true", all custom events are fired with the "ui5-" prefix only.
 * - When an object is supplied, just the specified events will be fired with the "ui5-" prefix.
 * @public
 * @param { NoConflictData } noConflictData
 */
const setNoConflict = (noConflictData) => {
    noConflict = noConflictData;
};
const skipOriginalEvent = (eventName) => {
    const nc = getNoConflict();
    // Always fire these events
    if (shouldFireOriginalEvent(eventName)) {
        return false;
    }
    // Read from the configuration
    if (nc === true) {
        return true;
    }
    return !shouldNotFireOriginalEvent(eventName);
};

var getDesigntimePropertyAsArray = (value) => {
    const m = /\$([-a-z0-9A-Z._]+)(?::([^$]*))?\$/.exec(value);
    return m && m[2] ? m[2].split(/,/) : null;
};

var detectNavigatorLanguage = () => {
    const browserLanguages = navigator.languages;
    const navigatorLanguage = () => {
        return navigator.language;
    };
    const rawLocale = (browserLanguages && browserLanguages[0]) || navigatorLanguage();
    return rawLocale || DEFAULT_LANGUAGE;
};

const M_ISO639_OLD_TO_NEW = {
    "iw": "he",
    "ji": "yi",
    "in": "id",
    "sh": "sr",
};
const A_RTL_LOCALES = getDesigntimePropertyAsArray("$cldr-rtl-locales:ar,fa,he$") || [];
/**
 * Checks whether the language is using RTL
 * @param {string} language
 * @returns {boolean} whether the language is using RTL
 */
const impliesRTL = (language) => {
    language = (language && M_ISO639_OLD_TO_NEW[language]) || language;
    return A_RTL_LOCALES.indexOf(language) >= 0;
};
/**
 * Gets the effective RTL setting by first checking the configuration
 * and if not set using the currently set language or the navigator language if the language is not explicitly set.
 * @returns {boolean} whether RTL should be used
 */
const getRTL = () => {
    if (typeof document === "undefined") {
        return false;
    }
    const configurationRTL = getRTL$1();
    if (configurationRTL !== undefined) {
        return !!configurationRTL;
    }
    return impliesRTL(getLanguage() || detectNavigatorLanguage());
};

let formatSettings$1;
class LegacyDateFormats {
    /**
     * Returns the currently set customizing data for Islamic calendar support
     *
     * @return {object[]} Returns an array that contains the customizing data.
     * @public
     */
    static getLegacyDateCalendarCustomizing() {
        if (formatSettings$1 === undefined) {
            formatSettings$1 = getFormatSettings();
        }
        return formatSettings$1.legacyDateCalendarCustomizing || [];
    }
}
registerFeature("LegacyDateFormats", LegacyDateFormats);

let formatSettings;
/**
 * Returns the first day of the week from the configured format settings or based on the current locale.
 * @public
 * @returns {Number} 0 (Sunday) through 6 (Saturday)
 */
const getFirstDayOfWeek = () => {
    if (formatSettings === undefined) {
        formatSettings = getFormatSettings();
    }
    return formatSettings.firstDayOfWeek;
};
const legacyDateFormats = getFeature("LegacyDateFormats");
legacyDateFormats ? LegacyDateFormats.getLegacyDateCalendarCustomizing : () => { return []; };

const loadThemeProperties = async (themeName) => {
	switch (themeName) {
		case "sap_fiori_3": return (await Promise.resolve().then(function () { return parametersBundle_css$3; })).default;
		case "sap_horizon": return (await Promise.resolve().then(function () { return parametersBundle_css$1; })).default;
		default: throw "unknown theme"
	}
};

const loadAndCheck = async (themeName) => {
	const data = await loadThemeProperties(themeName);
	if (typeof data === "string" && data.endsWith(".json")) {
		throw new Error(`[themes] Invalid bundling detected - dynamic JSON imports bundled as URLs. Switch to inlining JSON files from the build or use 'import ".../Assets-static.js"'. Check the "Assets" documentation for more information.`);
	}
	return data;
};

["sap_fiori_3", "sap_horizon"]
  .forEach(themeName => registerThemePropertiesLoader("@udex/web-components", themeName, loadAndCheck));

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
        this.sVariant = (aResult[4] && aResult[4].slice(1)) || null;
        this.sExtension = (aResult[5] && aResult[5].slice(1)) || null;
        this.sPrivateUse = aResult[6] || null;
        if (this.sLanguage) {
            this.sLanguage = this.sLanguage.toLowerCase();
        }
        if (this.sScript) {
            this.sScript = this.sScript.toLowerCase().replace(/^[a-z]/, s => {
                return s.toUpperCase();
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
        const r = [this.sLanguage];
        if (this.sScript) {
            r.push(this.sScript);
        }
        if (this.sRegion) {
            r.push(this.sRegion);
        }
        if (this.sVariant) {
            r.push(this.sVariant);
        }
        if (this.sExtension) {
            r.push(this.sExtension);
        }
        if (this.sPrivateUse) {
            r.push(this.sPrivateUse);
        }
        return r.join("-");
    }
}

const cache = new Map();
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
    }
    catch (e) {
        // ignore
    }
    return new Locale(DEFAULT_LOCALE);
};
/**
 * Returns the locale based on the parameter or configured language Configuration#getLanguage
 * If no language has been configured - a new locale based on browser language is returned
 */
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
/* Map for old language names for a few ISO639 codes. */
const M_ISO639_NEW_TO_OLD = {
    "he": "iw",
    "yi": "ji",
    "nb": "no",
    "sr": "sh",
};
/**
 * Normalizes the given locale in BCP-47 syntax.
 * @param {string} locale locale to normalize
 * @returns {string} Normalized locale, "undefined" if the locale can't be normalized or the default locale, if no locale provided.
 */
const normalizeLocale = (locale) => {
    let m;
    if (!locale) {
        return DEFAULT_LOCALE;
    }
    if (typeof locale === "string" && (m = localeRegEX.exec(locale.replace(/_/g, "-")))) { /* eslint-disable-line */
        let language = m[1].toLowerCase();
        let region = m[3] ? m[3].toUpperCase() : undefined;
        const script = m[2] ? m[2].toLowerCase() : undefined;
        const variants = m[4] ? m[4].slice(1) : undefined;
        const isPrivate = m[6];
        language = M_ISO639_NEW_TO_OLD[language] || language;
        // recognize and convert special SAP supportability locales (overwrites m[]!)
        if ((isPrivate && (m = SAPSupportabilityLocales.exec(isPrivate))) /* eslint-disable-line */ ||
            (variants && (m = SAPSupportabilityLocales.exec(variants)))) { /* eslint-disable-line */
            return `en_US_${m[1].toLowerCase()}`; // for now enforce en_US (agreed with SAP SLS)
        }
        // Chinese: when no region but a script is specified, use default region for each script
        if (language === "zh" && !region) {
            if (script === "hans") {
                region = "CN";
            }
            else if (script === "hant") {
                region = "TW";
            }
        }
        return language + (region ? "_" + region + (variants ? "_" + variants.replace("-", "_") : "") : ""); /* eslint-disable-line */
    }
    return DEFAULT_LOCALE;
};

/**
 * Calculates the next fallback locale for the given locale.
 *
 * @param {string} locale Locale string in Java format (underscores) or null
 * @returns {string} Next fallback Locale or "en" if no fallbacks found.
 */
const nextFallbackLocale = (locale) => {
    if (!locale) {
        return DEFAULT_LOCALE;
    }
    if (locale === "zh_HK") {
        return "zh_TW";
    }
    // if there are multiple segments (separated by underscores), remove the last one
    const p = locale.lastIndexOf("_");
    if (p >= 0) {
        return locale.slice(0, p);
    }
    // for any language but the default, fallback to the default first before falling back to the 'raw' language (empty string)
    return locale !== DEFAULT_LOCALE ? DEFAULT_LOCALE : "";
};

// contains package names for which the warning has been shown
const warningShown = new Set();
const reportedErrors = new Set();
const bundleData = new Map();
const bundlePromises = new Map();
const loaders = new Map();
/**
 * Registers i18n loader function for given package and locale.
 *
 * @public
 * @param {string} packageName for which package this loader can fetch data
 * @param {string} localeId locale that this loader can handle
 * @param {function} loader async function that will be passed a localeId and should return a JSON object
 */
const registerI18nLoader = (packageName, localeId, loader) => {
    // register loader by key
    const bundleKey = `${packageName}/${localeId}`;
    loaders.set(bundleKey, loader);
};
const _setI18nBundleData = (packageName, data) => {
    bundleData.set(packageName, data);
};
const _hasLoader = (packageName, localeId) => {
    const bundleKey = `${packageName}/${localeId}`;
    return loaders.has(bundleKey);
};
// load bundle over the network once
const _loadMessageBundleOnce = (packageName, localeId) => {
    const bundleKey = `${packageName}/${localeId}`;
    const loadMessageBundle = loaders.get(bundleKey);
    if (loadMessageBundle && !bundlePromises.get(bundleKey)) {
        bundlePromises.set(bundleKey, loadMessageBundle(localeId));
    }
    return bundlePromises.get(bundleKey); // Investigate if i18n loader exists and this won't return undefined.
};
const _showAssetsWarningOnce = (packageName) => {
    if (!warningShown.has(packageName)) {
        console.warn(`[${packageName}]: Message bundle assets are not configured. Falling back to English texts.`, /* eslint-disable-line */ ` Add \`import "${packageName}/dist/Assets.js"\` in your bundle and make sure your build tool supports dynamic imports and JSON imports. See section "Assets" in the documentation for more information.`); /* eslint-disable-line */
        warningShown.add(packageName);
    }
};
const useFallbackBundle = (packageName, localeId) => {
    return localeId !== DEFAULT_LANGUAGE && !_hasLoader(packageName, localeId);
};
/**
 * This method preforms the asynchronous task of fetching the actual text resources. It will fetch
 * each text resource over the network once (even for multiple calls to the same method).
 * It should be fully finished before the i18nBundle class is created in the webcomponents.
 * This method uses the bundle URLs that are populated by the <code>registerI18nBundle</code> method.
 * To simplify the usage, the synchronization of both methods happens internally for the same <code>bundleId</code>
 * @param {packageName} packageName the NPM package name
 * @public
 */
const fetchI18nBundle = async (packageName) => {
    const language = getLocale().getLanguage();
    const region = getLocale().getRegion();
    let localeId = language + (region ? `-${region}` : ``);
    if (useFallbackBundle(packageName, localeId)) {
        localeId = normalizeLocale(localeId);
        while (useFallbackBundle(packageName, localeId)) {
            localeId = nextFallbackLocale(localeId);
        }
    }
    // use default language unless configured to always fetch it from the network
    const fetchDefaultLanguage = getFetchDefaultLanguage();
    if (localeId === DEFAULT_LANGUAGE && !fetchDefaultLanguage) {
        _setI18nBundleData(packageName, null); // reset for the default language (if data was set for a previous language)
        return;
    }
    if (!_hasLoader(packageName, localeId)) {
        _showAssetsWarningOnce(packageName);
        return;
    }
    try {
        const data = await _loadMessageBundleOnce(packageName, localeId);
        _setI18nBundleData(packageName, data);
    }
    catch (error) {
        const e = error;
        if (!reportedErrors.has(e.message)) {
            reportedErrors.add(e.message);
            console.error(e.message); /* eslint-disable-line */
        }
    }
};
// When the language changes dynamically (the user calls setLanguage), re-fetch all previously fetched bundles
attachLanguageChange((lang /* eslint-disable-line */) => {
    const allPackages = [...bundleData.keys()];
    return Promise.all(allPackages.map(fetchI18nBundle));
});

const importMessageBundle = async (localeId) => {
		switch (localeId) {
			case "de": return (await Promise.resolve().then(function () { return messagebundle_de$1; })).default;
		case "en": return (await Promise.resolve().then(function () { return messagebundle_en$1; })).default;
		case "es": return (await Promise.resolve().then(function () { return messagebundle_es$1; })).default;
		case "fr": return (await Promise.resolve().then(function () { return messagebundle_fr$1; })).default;
			default: throw "unknown locale"
		}
	};

	const importAndCheck = async (localeId) => {
		const data = await importMessageBundle(localeId);
		if (typeof data === "string" && data.endsWith(".json")) {
			throw new Error(`[i18n] Invalid bundling detected - dynamic JSON imports bundled as URLs. Switch to inlining JSON files from the build or use 'import ".../Assets-static.js"'. Check the "Assets" documentation for more information.`);
		}
		return data;
	};

	const localeIds = ["de",
	"en",
	"es",
	"fr",];

	localeIds.forEach(localeId => {
		registerI18nLoader("@udex/web-components", localeId, importAndCheck);
	});

const whenDOMReady = () => {
    return new Promise(resolve => {
        if (document.body) {
            resolve();
        }
        else {
            document.addEventListener("DOMContentLoaded", () => {
                resolve();
            });
        }
    });
};

const styleData$5 = {
    packageName: "@ui5/webcomponents-base",
    fileName: "FontFace.css",
    content: `@font-face{font-family:"72";font-style:normal;font-weight:400;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Regular.woff2?ui5-webcomponents) format("woff2"),local("72")}@font-face{font-family:"72full";font-style:normal;font-weight:400;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Regular-full.woff2?ui5-webcomponents) format("woff2"),local('72-full')}@font-face{font-family:"72";font-style:normal;font-weight:700;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold.woff2?ui5-webcomponents) format("woff2"),local('72-Bold')}@font-face{font-family:"72full";font-style:normal;font-weight:700;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold-full.woff2?ui5-webcomponents) format("woff2")}@font-face{font-family:'72-Bold';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold.woff2?ui5-webcomponents) format("woff2"),local('72-Bold')}@font-face{font-family:'72-Boldfull';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold-full.woff2?ui5-webcomponents) format("woff2")}@font-face{font-family:'72-Light';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Light.woff2?ui5-webcomponents) format("woff2"),local('72-Light')}@font-face{font-family:'72-Lightfull';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Light-full.woff2?ui5-webcomponents) format("woff2")}@font-face{font-family:'72Mono';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Regular.woff2?ui5-webcomponents) format('woff2'),local('72Mono')}@font-face{font-family:'72Monofull';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Regular-full.woff2?ui5-webcomponents) format('woff2')}@font-face{font-family:'72Mono-Bold';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Bold.woff2?ui5-webcomponents) format('woff2'),local('72Mono-Bold')}@font-face{font-family:'72Mono-Boldfull';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Bold-full.woff2?ui5-webcomponents) format('woff2')}@font-face{font-family:"72Black";font-style:bold;font-weight:900;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Black.woff2?ui5-webcomponents) format("woff2"),local('72Black')}@font-face{font-family:"72-SemiboldDuplex";src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-SemiboldDuplex.woff2?ui5-webcomponents) format("woff2"),local('72-SemiboldDuplex')}`,
};

const styleData$4 = {
    packageName: "@ui5/webcomponents-base",
    fileName: "OverrideFontFace.css",
    content: `@font-face{font-family:'72override';unicode-range:U+0102-0103,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EB7,U+1EB8-1EC7,U+1EC8-1ECB,U+1ECC-1EE3,U+1EE4-1EF1,U+1EF4-1EF7;src:local('Arial'),local('Helvetica'),local('sans-serif')}`,
};

const insertFontFace = () => {
    const openUI5Support = getFeature("OpenUI5Support");
    // Only set the main font if there is no OpenUI5 support, or there is, but OpenUI5 is not loaded
    if (!openUI5Support || !openUI5Support.isOpenUI5Detected()) {
        insertMainFontFace();
    }
    // Always set the override font - OpenUI5 in CSS Vars mode does not set it, unlike the main font
    insertOverrideFontFace();
};
const insertMainFontFace = () => {
    if (!hasStyle("data-ui5-font-face")) {
        createStyle(styleData$5, "data-ui5-font-face");
    }
};
const insertOverrideFontFace = () => {
    if (!hasStyle("data-ui5-font-face-override")) {
        createStyle(styleData$4, "data-ui5-font-face-override");
    }
};

const styleData$3 = {
    packageName: "@ui5/webcomponents-base",
    fileName: "SystemCSSVars.css",
    content: `:root{--_ui5_content_density:cozy}.sapUiSizeCompact,.ui5-content-density-compact,[data-ui5-compact-size]{--_ui5_content_density:compact}[dir=rtl]{--_ui5_dir:rtl}[dir=ltr]{--_ui5_dir:ltr}`,
};

const insertSystemCSSVars = () => {
    if (!hasStyle("data-ui5-system-css-vars")) {
        createStyle(styleData$3, "data-ui5-system-css-vars");
    }
};

let booted = false;
let bootPromise;
const eventProvider = new EventProvider();
const boot = async () => {
    if (bootPromise !== undefined) {
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
        await eventProvider.fireEventAsync("boot");
    };
    bootPromise = new Promise(bootExecutor);
    return bootPromise;
};
/**
 * Callback, executed after theme properties registration
 * to apply the newly registered theme.
 * @private
 * @param { string } theme
 */
const onThemeRegistered = (theme) => {
    const currentTheme = getTheme();
    if (booted && theme === currentTheme) {
        applyTheme(currentTheme);
    }
};

const kebabToCamelMap = new Map();
const camelToKebabMap = new Map();
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

/**
 * Determines the slot to which a node should be assigned
 * @param node Text node or HTML element
 * @returns {string}
 */
const getSlotName = (node) => {
    // Text nodes can only go to the default slot
    if (!(node instanceof HTMLElement)) {
        return "default";
    }
    // Discover the slot based on the real slot name (f.e. footer => footer, or content-32 => content)
    const slot = node.getAttribute("slot");
    if (slot) {
        const match = slot.match(/^(.+?)-\d+$/);
        return match ? match[1] : slot;
    }
    // Use default slot as a fallback
    return "default";
};
const getSlottedNodes = (node) => {
    if (node instanceof HTMLSlotElement) {
        return node.assignedNodes({ flatten: true }).filter(item => item instanceof HTMLElement);
    }
    return [node];
};
const getSlottedNodesList = (nodeList) => {
    return nodeList.reduce((acc, curr) => acc.concat(getSlottedNodes(curr)), []);
};

let suf;
let rulesObj = {
    include: [/^ui5-/],
    exclude: [],
};
const tagsCache = new Map(); // true/false means the tag should/should not be cached, undefined means not known yet.
/**
 * Returns the currently set scoping suffix, or undefined if not set.
 *
 * @public
 * @returns {String|undefined}
 */
const getCustomElementsScopingSuffix = () => {
    return suf;
};
/**
 * Determines whether custom elements with the given tag should be scoped or not.
 * The tag is first matched against the "include" rules and then against the "exclude" rules and the
 * result is cached until new rules are set.
 *
 * @public
 * @param tag
 */
const shouldScopeCustomElement = (tag) => {
    if (!tagsCache.has(tag)) {
        const result = rulesObj.include.some(rule => tag.match(rule)) && !rulesObj.exclude.some(rule => tag.match(rule));
        tagsCache.set(tag, result);
    }
    return tagsCache.get(tag);
};
/**
 * Returns the currently set scoping suffix, if any and if the tag should be scoped, or undefined otherwise.
 *
 * @public
 * @param tag
 * @returns {String}
 */
const getEffectiveScopingSuffixForTag = (tag) => {
    if (shouldScopeCustomElement(tag)) {
        return getCustomElementsScopingSuffix();
    }
};

/**
 *
 * @class
 * @public
 */
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
        // Initialize properties
        const props = this.getProperties();
        for (const propName in props) { // eslint-disable-line
            const propType = props[propName].type;
            const propDefaultValue = props[propName].defaultValue;
            if (propType === Boolean) {
                initialState[propName] = false;
                if (propDefaultValue !== undefined) {
                    console.warn("The 'defaultValue' metadata key is ignored for all booleans properties, they would be initialized with 'false' by default"); // eslint-disable-line
                }
            }
            else if (props[propName].multiple) {
                initialState[propName] = [];
            }
            else if (propType === Object) {
                initialState[propName] = "defaultValue" in props[propName] ? props[propName].defaultValue : {};
            }
            else if (propType === String) {
                initialState[propName] = "defaultValue" in props[propName] ? props[propName].defaultValue : "";
            }
            else {
                initialState[propName] = propDefaultValue;
            }
        }
        // Initialize slots
        if (slotsAreManaged) {
            const slots = this.getSlots();
            for (const [slotName, slotData] of Object.entries(slots)) { // eslint-disable-line
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
        const defaultSlot = this.getSlots().default;
        return defaultSlot && defaultSlot.type === Node;
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
        return this.slotsAreManaged() && Object.values(this.getSlots()).some(slotData => slotData.individualSlots);
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
        // invalidateOnChildChange was not set in the slot metadata - by default child changes do not affect the component
        if (config === undefined) {
            return false;
        }
        // The simple format was used: invalidateOnChildChange: true/false;
        if (typeof config === "boolean") {
            return config;
        }
        // The complex format was used: invalidateOnChildChange: { properties, slots }
        if (typeof config === "object") {
            // A property was changed
            if (type === "property") {
                // The config object does not have a properties field
                if (config.properties === undefined) {
                    return false;
                }
                // The config object has the short format: properties: true/false
                if (typeof config.properties === "boolean") {
                    return config.properties;
                }
                // The config object has the complex format: properties: [...]
                if (Array.isArray(config.properties)) {
                    return config.properties.includes(name);
                }
                throw new Error("Wrong format for invalidateOnChildChange.properties: boolean or array is expected");
            }
            // A slot was changed
            if (type === "slot") {
                // The config object does not have a slots field
                if (config.slots === undefined) {
                    return false;
                }
                // The config object has the short format: slots: true/false
                if (typeof config.slots === "boolean") {
                    return config.slots;
                }
                // The config object has the complex format: slots: [...]
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
        return (typeof value === "string" || typeof value === "undefined" || value === null) ? value : value.toString();
    }
    if (propertyType === Boolean) {
        return typeof value === "boolean" ? value : false;
    }
    if (propertyType === Object) {
        return typeof value === "object" ? value : propData.defaultValue;
    }
    // Check if "value" is part of the enum (propertyType) values and return the defaultValue if not found.
    return value in propertyType ? value : propData.defaultValue;
};
const validateSingleSlot = (value, slotData) => {
    value && getSlottedNodes(value).forEach(el => {
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

const MAX_DEPTH_INHERITED_CLASSES = 10; // TypeScript complains about Infinity and big numbers
const getStylesString = (styles) => {
    if (Array.isArray(styles)) {
        return styles.filter(style => !!style).flat(MAX_DEPTH_INHERITED_CLASSES).map((style) => {
            return typeof style === "string" ? style : style.content;
        }).join(" ");
    }
    return typeof styles === "string" ? styles : styles.content;
};

const effectiveStyleMap = new Map();
attachCustomCSSChange((tag) => {
    effectiveStyleMap.delete(`${tag}_normal`); // there is custom CSS only for the component itself, not for its static area part
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
        }
        else {
            const customStyle = getCustomCSS(tag) || "";
            const builtInStyles = getStylesString(ElementClass.styles);
            effectiveStyle = `${builtInStyles} ${customStyle}`;
        }
        effectiveStyle = `${effectiveStyle} ${busyIndicatorStyles}`;
        effectiveStyleMap.set(key, effectiveStyle);
    }
    return effectiveStyleMap.get(key); // The key is guaranteed to exist
};

const constructableStyleMap = new Map();
attachCustomCSSChange((tag) => {
    constructableStyleMap.delete(`${tag}_normal`); // there is custom CSS only for the component itself, not for its static area part
});
/**
 * Returns (and caches) a constructable style sheet for a web component class
 * Note: Chrome
 * @param ElementClass
 * @returns {*}
 */
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

/**
 * Updates the shadow root of a UI5Element or its static area item
 * @param element
 * @param forStaticArea
 */
const updateShadowRoot = (element, forStaticArea = false) => {
    let styleStrOrHrefsArr;
    const ctor = element.constructor;
    const shadowRoot = forStaticArea ? element.staticAreaItem.shadowRoot : element.shadowRoot;
    let renderResult;
    if (forStaticArea) {
        renderResult = element.renderStatic(); // this is checked before calling updateShadowRoot
    }
    else {
        renderResult = element.render(); // this is checked before calling updateShadowRoot
    }
    if (!shadowRoot) {
        console.warn(`There is no shadow root to update`); // eslint-disable-line
        return;
    }
    if (document.adoptedStyleSheets && !isSafari()) { // Chrome
        shadowRoot.adoptedStyleSheets = getConstructableStyle(ctor, forStaticArea);
    }
    else { // FF, Safari
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

const GLOBAL_DIR_CSS_VAR = "--_ui5_dir";
const getEffectiveDir = (element) => {
    const doc = window.document;
    const dirValues = ["ltr", "rtl"]; // exclude "auto" and "" from all calculations
    const locallyAppliedDir = getComputedStyle(element).getPropertyValue(GLOBAL_DIR_CSS_VAR);
    // In that order, inspect the CSS Var (for modern browsers), the element itself, html and body (for IE fallback)
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
    // Finally, check the configuration for explicitly set RTL or language-implied RTL
    return getRTL() ? "rtl" : undefined;
};

const pureTagName = "ui5-static-area-item";
const popupIntegrationAttr = "data-sap-ui-integration-popup-content";
/**
 *
 * @class
 * @author SAP SE
 * @private
 */
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
        this.classList.add(this.ownerElement._id); // used for getting the popover in the tests
        if (this.ownerElement.hasAttribute("data-ui5-static-stable")) {
            this.setAttribute("data-ui5-stable", this.ownerElement.getAttribute("data-ui5-static-stable")); // stable selector
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
        }
        else {
            this.classList.remove("sapUiSizeCompact");
            this.classList.remove("ui5-content-density-compact");
        }
    }
    _updateDirection() {
        if (this.ownerElement) {
            const dir = getEffectiveDir(this.ownerElement);
            if (dir) {
                this.setAttribute("dir", dir);
            }
            else {
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
        await renderFinished(); // Wait for the content of the ui5-static-area-item to be rendered
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

/**
 * The tag prefixes to be ignored.
 */
const tagPrefixes = [];
/**
 * Determines whether custom elements with the given tag should be ignored.
 *
 * @private
 * @param { string } tag
 */
const shouldIgnoreCustomElement = (tag) => {
    return tagPrefixes.some(pref => tag.startsWith(pref));
};

const observers = new WeakMap();
/**
 * @param node
 * @param callback
 * @param options
 */
const observeDOMNode = (node, callback, options) => {
    const observer = new MutationObserver(callback);
    observers.set(node, observer);
    observer.observe(node, options);
};
/**
 * @param node
 */
const unobserveDOMNode = (node) => {
    const observer = observers.get(node);
    if (observer) {
        observer.disconnect();
        observers.delete(node);
    }
};

// Note: disabled is present in IE so we explicitly allow it here.
// Others, such as title/hidden, we explicitly override, so valid too
const allowList = [
    "disabled",
    "title",
    "hidden",
    "role",
    "draggable",
];
/**
 * Checks whether a property name is valid (does not collide with existing DOM API properties)
 *
 * @param name
 * @returns {boolean}
 */
const isValidPropertyName = (name) => {
    if (allowList.includes(name) || name.startsWith("aria")) {
        return true;
    }
    const classes = [
        HTMLElement,
        Element,
        Node,
    ];
    return !classes.some(klass => klass.prototype.hasOwnProperty(name)); // eslint-disable-line
};

const arraysAreEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
};

/**
 * Runs a component's template with the component's current state, while also scoping HTML
 *
 * @param template - the template to execute
 * @param component - the component
 * @public
 */
const executeTemplate = (template, component) => {
    const tagsToScope = getTagsToScope(component);
    const scope = getCustomElementsScopingSuffix();
    return template.call(component, component, tagsToScope, scope);
};
/**
 * Returns all tags, used inside component's template subject to scoping.
 * @param component - the component
 * @returns {Array[]}
 * @private
 */
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
const elementTimeouts = new Map();
const uniqueDependenciesCache = new Map();
/**
 * Triggers re-rendering of a UI5Element instance due to state change.
 * @param {ChangeInfo} changeInfo An object with information about the change that caused invalidation.
 * @private
 */
function _invalidate(changeInfo) {
    // Invalidation should be suppressed: 1) before the component is rendered for the first time 2) and during the execution of onBeforeRendering
    // This is necessary not only as an optimization, but also to avoid infinite loops on invalidation between children and parents (when invalidateOnChildChange is used)
    if (this._suppressInvalidation) {
        return;
    }
    // Call the onInvalidation hook
    this.onInvalidation(changeInfo);
    this._changedState.push(changeInfo);
    renderDeferred(this);
    this._invalidationEventProvider.fireEvent("invalidate", { ...changeInfo, target: this });
}
/**
 * Base class for all UI5 Web Components
 *
 * @class
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.base.UI5Element
 * @extends HTMLElement
 * @public
 */
class UI5Element extends HTMLElement {
    constructor() {
        super();
        const ctor = this.constructor;
        this._changedState = []; // Filled on each invalidation, cleared on re-render (used for debugging)
        this._suppressInvalidation = true; // A flag telling whether all invalidations should be ignored. Initialized with "true" because a UI5Element can not be invalidated until it is rendered for the first time
        this._inDOM = false; // A flag telling whether the UI5Element is currently in the DOM tree of the document or not
        this._fullyConnected = false; // A flag telling whether the UI5Element's onEnterDOM hook was called (since it's possible to have the element removed from DOM before that)
        this._childChangeListeners = new Map(); // used to store lazy listeners per slot for the child change event of every child inside that slot
        this._slotChangeListeners = new Map(); // used to store lazy listeners per slot for the slotchange event of all slot children inside that slot
        this._invalidationEventProvider = new EventProvider(); // used by parent components for listening to changes to child components
        this._componentStateFinalizedEventProvider = new EventProvider(); // used by friend classes for synchronization
        let deferredResolve;
        this._domRefReadyPromise = new Promise(resolve => {
            deferredResolve = resolve;
        });
        this._domRefReadyPromise._deferredResolve = deferredResolve;
        this._doNotSyncAttributes = new Set(); // attributes that are excluded from attributeChangedCallback synchronization
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
            // always register the observer before yielding control to the main thread (await)
            this._startObservingDOMChildren();
            await this._processChildren();
        }
        if (!this._inDOM) { // Component removed from DOM while _processChildren was running
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
    onBeforeRendering() { }
    /**
     * Called every time after the component renders.
     * @public
     */
    onAfterRendering() { }
    /**
     * Called on connectedCallback - added to the DOM.
     * @public
     */
    onEnterDOM() { }
    /**
     * Called on disconnectedCallback - removed from the DOM.
     * @public
     */
    onExitDOM() { }
    /**
     * @private
     */
    _startObservingDOMChildren() {
        const ctor = this.constructor;
        const shouldObserveChildren = ctor.getMetadata().hasSlots();
        if (!shouldObserveChildren) {
            return;
        }
        const canSlotText = ctor.getMetadata().canSlotText();
        const mutationObserverOptions = {
            childList: true,
            subtree: canSlotText,
            characterData: canSlotText,
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
        const slotsCachedContentMap = new Map(); // Store here the content of each slot before the mutation occurred
        const propertyNameToSlotMap = new Map(); // Used for reverse lookup to determine to which slot the property name corresponds
        // Init the _state object based on the supported slots and store the previous values
        for (const [slotName, slotData] of Object.entries(slotsMap)) { // eslint-disable-line
            const propertyName = slotData.propertyName || slotName;
            propertyNameToSlotMap.set(propertyName, slotName);
            slotsCachedContentMap.set(propertyName, [...this._state[propertyName]]);
            this._clearSlot(slotName, slotData);
        }
        const autoIncrementMap = new Map();
        const slottedChildrenMap = new Map();
        const allChildrenUpgraded = domChildren.map(async (child, idx) => {
            // Determine the type of the child (mainly by the slot attribute)
            const slotName = getSlotName(child);
            const slotData = slotsMap[slotName];
            // Check if the slotName is supported
            if (slotData === undefined) {
                if (slotName !== "default") {
                    const validValues = Object.keys(slotsMap).join(", ");
                    console.warn(`Unknown slotName: ${slotName}, ignoring`, child, `Valid values are: ${validValues}`); // eslint-disable-line
                }
                return;
            }
            // For children that need individual slots, calculate them
            if (slotData.individualSlots) {
                const nextIndex = (autoIncrementMap.get(slotName) || 0) + 1;
                autoIncrementMap.set(slotName, nextIndex);
                child._individualSlot = `${slotName}-${nextIndex}`;
            }
            // Await for not-yet-defined custom elements
            if (child instanceof HTMLElement) {
                const localName = child.localName;
                const shouldWaitForCustomElement = localName.includes("-") && !shouldIgnoreCustomElement(localName);
                if (shouldWaitForCustomElement) {
                    const isDefined = window.customElements.get(localName);
                    if (!isDefined) {
                        const whenDefinedPromise = window.customElements.whenDefined(localName); // Class registered, but instances not upgraded yet
                        let timeoutPromise = elementTimeouts.get(localName);
                        if (!timeoutPromise) {
                            timeoutPromise = new Promise(resolve => setTimeout(resolve, 1000));
                            elementTimeouts.set(localName, timeoutPromise);
                        }
                        await Promise.race([whenDefinedPromise, timeoutPromise]);
                    }
                    window.customElements.upgrade(child);
                }
            }
            child = ctor.getMetadata().constructor.validateSlotValue(child, slotData);
            // Listen for any invalidation on the child if invalidateOnChildChange is true or an object (ignore when false or not set)
            if (instanceOfUI5Element(child) && slotData.invalidateOnChildChange) {
                const childChangeListener = this._getChildChangeListener(slotName);
                if (childChangeListener) {
                    child.attachInvalidate.call(child, childChangeListener);
                }
            }
            // Listen for the slotchange event if the child is a slot itself
            if (child instanceof HTMLSlotElement) {
                this._attachSlotChange(child, slotName);
            }
            const propertyName = slotData.propertyName || slotName;
            if (slottedChildrenMap.has(propertyName)) {
                slottedChildrenMap.get(propertyName).push({ child, idx });
            }
            else {
                slottedChildrenMap.set(propertyName, [{ child, idx }]);
            }
        });
        await Promise.all(allChildrenUpgraded);
        // Distribute the child in the _state object, keeping the Light DOM order,
        // not the order elements are defined.
        slottedChildrenMap.forEach((children, propertyName) => {
            this._state[propertyName] = children.sort((a, b) => a.idx - b.idx).map(_ => _.child);
        });
        // Compare the content of each slot with the cached values and invalidate for the ones that changed
        let invalidated = false;
        for (const [slotName, slotData] of Object.entries(slotsMap)) { // eslint-disable-line
            const propertyName = slotData.propertyName || slotName;
            if (!arraysAreEqual(slotsCachedContentMap.get(propertyName), this._state[propertyName])) {
                _invalidate.call(this, {
                    type: "slot",
                    name: propertyNameToSlotMap.get(propertyName),
                    reason: "children",
                });
                invalidated = true;
            }
        }
        // If none of the slots had an invalidation due to changes to immediate children,
        // the change is considered to be text content of the default slot
        if (!invalidated) {
            _invalidate.call(this, {
                type: "slot",
                name: "default",
                reason: "textcontent",
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
        children.forEach(child => {
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
        // The component should be invalidated as this type of change on the child is listened for
        // However, no matter what changed on the child (property/slot), the invalidation is registered as "type=slot" for the component itself
        _invalidate.call(this, {
            type: "slot",
            name: slotName,
            reason: "childchange",
            child: childChangeInfo.target,
        });
    }
    /**
     * Do not override this method in derivatives of UI5Element
     * @private
     */
    attributeChangedCallback(name, oldValue, newValue) {
        let newPropertyValue;
        if (this._doNotSyncAttributes.has(name)) { // This attribute is mutated internally, not by the user
            return;
        }
        const properties = this.constructor.getMetadata().getProperties();
        const realName = name.replace(/^ui5-/, "");
        const nameInCamelCase = kebabToCamelCase(realName);
        if (properties.hasOwnProperty(nameInCamelCase)) { // eslint-disable-line
            const propData = properties[nameInCamelCase];
            const propertyType = propData.type;
            let propertyValidator = propData.validator;
            if (propertyType && propertyType.isDataTypeClass) {
                propertyValidator = propertyType;
            }
            if (propertyValidator) {
                newPropertyValue = propertyValidator.attributeToProperty(newValue);
            }
            else if (propertyType === Boolean) {
                newPropertyValue = newValue !== null;
            }
            else {
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
            if (newAttrValue === null) { // null means there must be no attribute for the current value of the property
                this._doNotSyncAttributes.add(attrName); // skip the attributeChangedCallback call for this attribute
                this.removeAttribute(attrName); // remove the attribute safely (will not trigger synchronization to the property value due to the above line)
                this._doNotSyncAttributes.delete(attrName); // enable synchronization again for this attribute
            }
            else {
                this.setAttribute(attrName, newAttrValue);
            }
        }
        else if (propertyType === Boolean) {
            if (newValue === true && attrValue === null) {
                this.setAttribute(attrName, "");
            }
            else if (newValue === false && attrValue !== null) {
                this.removeAttribute(attrName);
            }
        }
        else if (typeof newValue !== "object") {
            if (attrValue !== newValue) {
                this.setAttribute(attrName, newValue);
            }
        } // else { return; } // old object handling
    }
    /**
     * @private
     */
    _upgradeProperty(propertyName) {
        if (this.hasOwnProperty(propertyName)) { // eslint-disable-line
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
            reason: "slotchange",
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
    onInvalidation(changeInfo) { } // eslint-disable-line
    /**
     * Do not call this method directly, only intended to be called by js
     * @protected
     */
    _render() {
        const ctor = this.constructor;
        const hasIndividualSlots = ctor.getMetadata().hasIndividualSlots();
        // suppress invalidation to prevent state changes scheduling another rendering
        this._suppressInvalidation = true;
        this.onBeforeRendering();
        // Intended for framework usage only. Currently ItemNavigation updates tab indexes after the component has updated its state but before the template is rendered
        this._componentStateFinalizedEventProvider.fireEvent("componentStateFinalized");
        // resume normal invalidation handling
        this._suppressInvalidation = false;
        // Update the shadow root with the render result
        /*
        if (this._changedState.length) {
            let element = this.localName;
            if (this.id) {
                element = `${element}#${this.id}`;
            }
            console.log("Re-rendering:", element, this._changedState.map(x => { // eslint-disable-line
                let res = `${x.type}`;
                if (x.reason) {
                    res = `${res}(${x.reason})`;
                }
                res = `${res}: ${x.name}`;
                if (x.type === "property") {
                    res = `${res} ${JSON.stringify(x.oldValue)} => ${JSON.stringify(x.newValue)}`;
                }

                return res;
            }));
        }
        */
        this._changedState = [];
        // Update shadow root and static area item
        if (ctor._needsShadowDOM()) {
            updateShadowRoot(this);
        }
        if (this.staticAreaItem) {
            this.staticAreaItem.update();
        }
        // Safari requires that children get the slot attribute only after the slot tags have been rendered in the shadow DOM
        if (hasIndividualSlots) {
            this._assignIndividualSlotsToChildren();
        }
        // Call the onAfterRendering hook
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
        // If a component set _getRealDomRef to its children, use the return value of this function
        if (typeof this._getRealDomRef === "function") {
            return this._getRealDomRef();
        }
        if (!this.shadowRoot || this.shadowRoot.children.length === 0) {
            return;
        }
        const children = [...this.shadowRoot.children].filter(child => !["link", "style"].includes(child.localName));
        if (children.length !== 1) {
            console.warn(`The shadow DOM for ${this.constructor.getMetadata().getTag()} does not have a top level element, the getDomRef() method might not work as expected`); // eslint-disable-line
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
            cancelable,
        });
        // This will be false if the no-conflict event is prevented
        const noConflictEventResult = this.dispatchEvent(noConflictEvent);
        if (skipOriginalEvent(name)) {
            return noConflictEventResult;
        }
        const normalEvent = new CustomEvent(name, {
            detail: data,
            composed: false,
            bubbles,
            cancelable,
        });
        // This will be false if the normal event is prevented
        const normalEventResult = this.dispatchEvent(normalEvent);
        // Return false if any of the two events was prevented (its result was false).
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
        markAsRtlAware(this.constructor); // if a UI5 Element calls this method, it's considered to be rtl-aware
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
        // Properties
        const properties = this.getMetadata().getProperties();
        for (const [prop, propData] of Object.entries(properties)) { // eslint-disable-line
            if (!isValidPropertyName(prop)) {
                console.warn(`"${prop}" is not a valid property name. Use a name that does not collide with DOM APIs`); /* eslint-disable-line */
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
                    if (this._state[prop] !== undefined) {
                        return this._state[prop];
                    }
                    const propDefaultValue = propData.defaultValue;
                    if (propData.type === Boolean) {
                        return false;
                    }
                    else if (propData.type === String) { // eslint-disable-line
                        return propDefaultValue;
                    }
                    else if (propData.multiple) { // eslint-disable-line
                        return [];
                    }
                    else {
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
                    }
                    else if (Array.isArray(oldState) && Array.isArray(value) && propData.multiple && propData.compareValues) { // compareValues is added for IE, test if needed now
                        isDifferent = !arraysAreEqual(oldState, value);
                    }
                    else {
                        isDifferent = oldState !== value;
                    }
                    if (isDifferent) {
                        this._state[prop] = value;
                        _invalidate.call(this, {
                            type: "property",
                            name: prop,
                            newValue: value,
                            oldValue: oldState,
                        });
                        this._updateAttribute(prop, value);
                    }
                },
            });
        }
        // Slots
        if (slotsAreManaged) {
            const slots = this.getMetadata().getSlots();
            for (const [slotName, slotData] of Object.entries(slots)) { // eslint-disable-line
                if (!isValidPropertyName(slotName)) {
                    console.warn(`"${slotName}" is not a valid property name. Use a name that does not collide with DOM APIs`); /* eslint-disable-line */
                }
                const propertyName = slotData.propertyName || slotName;
                Object.defineProperty(proto, propertyName, {
                    get() {
                        if (this._state[propertyName] !== undefined) {
                            return this._state[propertyName];
                        }
                        return [];
                    },
                    set() {
                        throw new Error("Cannot set slot content directly, use the DOM APIs (appendChild, removeChild, etc...)");
                    },
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
        return Promise.all(this.getUniqueDependencies().map(dep => dep.define()));
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
            this.onDefine(),
        ]);
        const tag = this.getMetadata().getTag();
        const definedLocally = isTagRegistered(tag);
        const definedGlobally = window.customElements.get(tag);
        if (definedGlobally && !definedLocally) {
            recordTagRegistrationFailure(tag);
        }
        else if (!definedGlobally) {
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
        if (this.hasOwnProperty("_metadata")) { // eslint-disable-line
            return this._metadata;
        }
        const metadataObjects = [this.metadata];
        let klass = this; // eslint-disable-line
        while (klass !== UI5Element) {
            klass = Object.getPrototypeOf(klass);
            metadataObjects.unshift(klass.metadata);
        }
        const mergedMetadata = fnMerge({}, ...metadataObjects);
        this._metadata = new UI5ElementMetadata(mergedMetadata);
        return this._metadata;
    }
}
/**
 * Returns the metadata object for this UI5 Web Component Class
 * @protected
 */
UI5Element.metadata = {};
/**
 * Always use duck-typing to cover all runtimes on the page.
 * @returns {boolean}
 */
const instanceOfUI5Element = (object) => {
    return "isUI5Element" in object;
};

/**
 * Returns a custom element class decorator.
 *
 * @param { string | object } tagNameOrComponentSettings
 * @returns { ClassDecorator }
 */
const customElement = (tagNameOrComponentSettings) => {
    return (target) => {
        if (!Object.prototype.hasOwnProperty.call(target, "metadata")) {
            target.metadata = {};
        }
        if (typeof tagNameOrComponentSettings === "string") {
            target.metadata.tag = tagNameOrComponentSettings;
            return;
        }
        const { tag, languageAware, themeAware, fastNavigation, } = tagNameOrComponentSettings;
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
                get: () => customElementEntityValue,
            });
        });
    };
};

/**
 * Returns a property decorator.
 *
 * @param { Property } propData
 * @returns { PropertyDecorator }
 */
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

/**
 * Returns a slot decorator.
 *
 * @param { Slot } slotData
 * @returns { PropertyDecorator }
 */
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
var t;const i=window,s=i.trustedTypes,e=s?s.createPolicy("lit-html",{createHTML:t=>t}):void 0,o="$lit$",n=`lit$${(Math.random()+"").slice(9)}$`,l$1="?"+n,h=`<${l$1}>`,r=document,u=()=>r.createComment(""),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c=Array.isArray,v=t=>c(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),a="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_$2=/-->/g,m=/>/g,p=RegExp(`>|${a}(?:([^\\s"'>=/]+)(${a}*=${a}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,w=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=w(1),T=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),E=new WeakMap,C=r.createTreeWalker(r,129,null,!1);function P(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e?e.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,e=[];let l,r=2===i?"<svg>":"",u=f;for(let i=0;i<s;i++){const s=t[i];let d,c,v=-1,a=0;for(;a<s.length&&(u.lastIndex=a,c=u.exec(s),null!==c);)a=u.lastIndex,u===f?"!--"===c[1]?u=_$2:void 0!==c[1]?u=m:void 0!==c[2]?(y.test(c[2])&&(l=RegExp("</"+c[2],"g")),u=p):void 0!==c[3]&&(u=p):u===p?">"===c[0]?(u=null!=l?l:f,v=-1):void 0===c[1]?v=-2:(v=u.lastIndex-c[2].length,d=c[1],u=void 0===c[3]?p:'"'===c[3]?$:g):u===$||u===g?u=p:u===_$2||u===m?u=f:(u=p,l=void 0);const w=u===p&&t[i+1].startsWith("/>")?" ":"";r+=u===f?s+h:v>=0?(e.push(d),s.slice(0,v)+o+s.slice(v)+n+w):s+n+(-2===v?(e.push(void 0),i):w);}return [P(t,r+(t[s]||"<?>")+(2===i?"</svg>":"")),e]};class N{constructor({strings:t,_$litType$:i},e){let h;this.parts=[];let r=0,d=0;const c=t.length-1,v=this.parts,[a,f]=V(t,i);if(this.el=N.createElement(a,e),C.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(h=C.nextNode())&&v.length<c;){if(1===h.nodeType){if(h.hasAttributes()){const t=[];for(const i of h.getAttributeNames())if(i.endsWith(o)||i.startsWith(n)){const s=f[d++];if(t.push(i),void 0!==s){const t=h.getAttribute(s.toLowerCase()+o).split(n),i=/([.?@])?(.*)/.exec(s);v.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?H:"?"===i[1]?L:"@"===i[1]?z:k});}else v.push({type:6,index:r});}for(const i of t)h.removeAttribute(i);}if(y.test(h.tagName)){const t=h.textContent.split(n),i=t.length-1;if(i>0){h.textContent=s?s.emptyScript:"";for(let s=0;s<i;s++)h.append(t[s],u()),C.nextNode(),v.push({type:2,index:++r});h.append(t[i],u());}}}else if(8===h.nodeType)if(h.data===l$1)v.push({type:2,index:r});else {let t=-1;for(;-1!==(t=h.data.indexOf(n,t+1));)v.push({type:7,index:r}),t+=n.length-1;}r++;}}static createElement(t,i){const s=r.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){var o,n,l,h;if(i===T)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=S(t,r._$AS(t,i.values),r,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:r).importNode(s,!0);C.currentNode=o;let n=C.nextNode(),l=0,h=0,u=e[0];for(;void 0!==u;){if(l===u.index){let i;2===u.type?i=new R(n,n.nextSibling,this,t):1===u.type?i=new u.ctor(n,u.name,u.strings,this,t):6===u.type&&(i=new Z(n,this,t)),this._$AV.push(i),u=e[++h];}l!==(null==u?void 0:u.index)&&(n=C.nextNode(),l++);}return C.currentNode=r,o}v(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{constructor(t,i,s,e){var o;this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cp=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null==t?void 0:t.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),d(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):v(t)?this.T(t):this._(t);}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t));}_(t){this._$AH!==A&&d(this._$AH)?this._$AA.nextSibling.data=t:this.$(r.createTextNode(t)),this._$AH=t;}g(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=N.createElement(P(e.h,e.h[0]),this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.v(s);else {const t=new M(o,this),i=t.u(this.options);t.v(s),this.$(i),this._$AH=t;}}_$AC(t){let i=E.get(t.strings);return void 0===i&&E.set(t.strings,i=new N(t)),i}T(t){c(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new R(this.k(u()),this.k(u()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cp=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class k{constructor(t,i,s,e,o){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=S(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==T,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=S(this,e[s+l],i,l),h===T&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}const I=s?s.emptyScript:"";class L extends k{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==A?this.element.setAttribute(this.name,I):this.element.removeAttribute(this.name);}}class z extends k{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=S(this,t,i,0))&&void 0!==s?s:A)===T)return;const e=this._$AH,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const B=i.litHtmlPolyfillSupport;null==B||B(N,R),(null!==(t=i.litHtmlVersions)&&void 0!==t?t:i.litHtmlVersions=[]).push("2.8.0");const D=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new R(i.insertBefore(u(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const l=l=>null!=l?l:A;

const effectiveHtml = (strings, ...values) => {
    const litStatic = getFeature("LitStatic");
    const fn = litStatic ? litStatic.html : x;
    return fn(strings, ...values);
};
const litRender = (templateResult, container, styleStrOrHrefsArr, forStaticArea, options) => {
    const openUI5Enablement = getFeature("OpenUI5Enablement");
    if (openUI5Enablement && !forStaticArea) {
        templateResult = openUI5Enablement.wrapTemplateResultInBusyMarkup(effectiveHtml, options.host, templateResult);
    }
    if (typeof styleStrOrHrefsArr === "string") {
        templateResult = effectiveHtml `<style>${styleStrOrHrefsArr}</style>${templateResult}`;
    }
    else if (Array.isArray(styleStrOrHrefsArr) && styleStrOrHrefsArr.length) {
        templateResult = effectiveHtml `${styleStrOrHrefsArr.map(href => effectiveHtml `<link type="text/css" rel="stylesheet" href="${href}">`)}${templateResult}`;
    }
    D(templateResult, container, options);
};

/* eslint no-unused-vars: 0 */
function block0(context, tags, suffix) { return effectiveHtml `<div class="udex-hero-banner" part="wrapper" style="background-color: ${l(this.wrapperBackgroundColor)}">${this.hasBackgroundImage ? block1.call(this, context, tags, suffix) : undefined}<slot name="content" part="content"></slot>${this.hasAdditionalContent ? block2.call(this, context, tags, suffix) : undefined}</div>`; }
function block1(context, tags, suffix) { return effectiveHtml `<img src="${l(this.backgroundImage)}" part="background-image" class="udex-hero-banner__background-image" alt="${l(this.backgroundImageLabel)}" />`; }
function block2(context, tags, suffix) { return effectiveHtml `<slot name="additionalContent" part="additionalContent"></slot>`; }

const styleData$2 = { packageName: "@ui5/webcomponents-theming", fileName: "themes/sap_horizon/parameters-bundle.css", content: ":root{--sapThemeMetaData-Base-baseLib:{\"Path\":\"Base.baseLib.sap_horizon.css_variables\",\"PathPattern\":\"/%frameworkId%/%libId%/%themeId%/%fileId%.css\",\"Extends\":[\"baseTheme\"],\"Tags\":[\"Fiori_3\",\"LightColorScheme\"],\"FallbackThemeId\":\"sap_fiori_3\",\"Engine\":{\"Name\":\"theming-engine\",\"Version\":\"1.23061.0\"},\"Version\":{ \"Build\":\"11.9.0.20231102110441\",\"Source\":\"11.9.0\"}};--sapBrandColor:#0070f2;--sapHighlightColor:#0064d9;--sapBaseColor:#fff;--sapShellColor:#fff;--sapBackgroundColor:#f5f6f7;--sapFontFamily:\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontSize:.875rem;--sapTextColor:#1d2d3e;--sapLinkColor:#0064d9;--sapCompanyLogo:none;--sapBackgroundImage:none;--sapBackgroundImageOpacity:1.0;--sapBackgroundImageRepeat:false;--sapSelectedColor:#0064d9;--sapHoverColor:#eaecee;--sapActiveColor:#dee2e5;--sapHighlightTextColor:#fff;--sapTitleColor:#1d2d3e;--sapNegativeColor:#aa0808;--sapCriticalColor:#e76500;--sapPositiveColor:#256f3a;--sapInformativeColor:#0070f2;--sapNeutralColor:#788fa6;--sapNegativeElementColor:#f53232;--sapCriticalElementColor:#e76500;--sapPositiveElementColor:#30914c;--sapInformativeElementColor:#0070f2;--sapNeutralElementColor:#788fa6;--sapNegativeTextColor:#aa0808;--sapCriticalTextColor:#b44f00;--sapPositiveTextColor:#256f3a;--sapInformativeTextColor:#0064d9;--sapNeutralTextColor:#1d2d3e;--sapErrorColor:#aa0808;--sapWarningColor:#e76500;--sapSuccessColor:#256f3a;--sapInformationColor:#0070f2;--sapErrorBackground:#ffeaf4;--sapWarningBackground:#fff8d6;--sapSuccessBackground:#f5fae5;--sapInformationBackground:#e1f4ff;--sapNeutralBackground:#eff1f2;--sapErrorBorderColor:#e90b0b;--sapWarningBorderColor:#dd6100;--sapSuccessBorderColor:#30914c;--sapInformationBorderColor:#0070f2;--sapNeutralBorderColor:#788fa6;--sapElement_LineHeight:2.75rem;--sapElement_Height:2.25rem;--sapElement_BorderWidth:.0625rem;--sapElement_BorderCornerRadius:.75rem;--sapElement_Compact_LineHeight:2rem;--sapElement_Compact_Height:1.625rem;--sapElement_Condensed_LineHeight:1.5rem;--sapElement_Condensed_Height:1.375rem;--sapContent_LineHeight:1.5;--sapContent_IconHeight:1rem;--sapContent_IconColor:#1d2d3e;--sapContent_ContrastIconColor:#fff;--sapContent_NonInteractiveIconColor:#758ca4;--sapContent_MarkerIconColor:#5d36ff;--sapContent_MarkerTextColor:#046c7a;--sapContent_MeasureIndicatorColor:#556b81;--sapContent_Selected_MeasureIndicatorColor:#0064d9;--sapContent_Placeholderloading_Background:#ccc;--sapContent_Placeholderloading_Gradient:linear-gradient(90deg,#ccc 0%,#ccc 20%,#999 50%,#ccc 80%,#ccc);--sapContent_ImagePlaceholderBackground:#eaecee;--sapContent_ImagePlaceholderForegroundColor:#5b738b;--sapContent_RatedColor:#d27700;--sapContent_UnratedColor:#758ca4;--sapContent_BusyColor:#0064d9;--sapContent_FocusColor:#0032a5;--sapContent_FocusStyle:solid;--sapContent_FocusWidth:.125rem;--sapContent_ContrastFocusColor:#fff;--sapContent_ShadowColor:#223548;--sapContent_ContrastShadowColor:#fff;--sapContent_Shadow0:0 0 0.125rem 0 rgba(34,53,72,.2),0 0.125rem 0.25rem 0 rgba(34,53,72,.2);--sapContent_Shadow1:0 0 0 0.0625rem rgba(34,53,72,.48),0 0.125rem 0.5rem 0 rgba(34,53,72,.3);--sapContent_Shadow2:0 0 0 0.0625rem rgba(34,53,72,.48),0 0.625rem 1.875rem 0 rgba(34,53,72,.25);--sapContent_Shadow3:0 0 0 0.0625rem rgba(34,53,72,.48),0 1.25rem 5rem 0 rgba(34,53,72,.25);--sapContent_TextShadow:0 0 0.125rem #fff;--sapContent_ContrastTextShadow:0 0 0.0625rem rgba(0,0,0,.7);--sapContent_HeaderShadow:0 0.125rem 0.125rem 0 rgba(34,53,72,.05),inset 0 -0.0625rem 0 0 #d9d9d9;--sapContent_Interaction_Shadow:inset 0 0 0 0.0625rem rgba(85,107,129,.25);--sapContent_Selected_Shadow:inset 0 0 0 0.0625rem rgba(79,160,255,.5);--sapContent_Negative_Shadow:inset 0 0 0 0.0625rem rgba(255,142,196,.45);--sapContent_Critical_Shadow:inset 0 0 0 0.0625rem rgba(255,213,10,.4);--sapContent_Positive_Shadow:inset 0 0 0 0.0625rem rgba(48,145,76,.18);--sapContent_Informative_Shadow:inset 0 0 0 0.0625rem rgba(104,174,255,.5);--sapContent_Neutral_Shadow:inset 0 0 0 0.0625rem rgba(120,143,166,.3);--sapContent_SearchHighlightColor:#dafdf5;--sapContent_HelpColor:#188918;--sapContent_LabelColor:#556b82;--sapContent_MonospaceFontFamily:\"72Mono\",\"72Monofull\",lucida console,monospace;--sapContent_MonospaceBoldFontFamily:\"72Mono-Bold\",\"72Mono-Boldfull\",lucida console,monospace;--sapContent_IconFontFamily:\"SAP-icons\";--sapContent_DisabledTextColor:rgba(29,45,62,.6);--sapContent_DisabledOpacity:0.4;--sapContent_ContrastTextThreshold:0.65;--sapContent_ContrastTextColor:#fff;--sapContent_ForegroundColor:#efefef;--sapContent_ForegroundBorderColor:#758ca4;--sapContent_ForegroundTextColor:#1d2d3e;--sapContent_BadgeBackground:#aa0808;--sapContent_BadgeTextColor:#fff;--sapContent_DragAndDropActiveColor:#0064d9;--sapContent_Selected_TextColor:#0064d9;--sapContent_Selected_Background:#fff;--sapContent_Selected_Hover_Background:#e3f0ff;--sapContent_Selected_ForegroundColor:#0064d9;--sapContent_ForcedColorAdjust:none;--sapContent_Illustrative_Color1:#5d36ff;--sapContent_Illustrative_Color2:#0070f2;--sapContent_Illustrative_Color3:#f58b00;--sapContent_Illustrative_Color4:#00144a;--sapContent_Illustrative_Color5:#a9b4be;--sapContent_Illustrative_Color6:#d5dadd;--sapContent_Illustrative_Color7:#ebf8ff;--sapContent_Illustrative_Color8:#fff;--sapContent_Illustrative_Color9:#64edd2;--sapContent_Illustrative_Color10:#ebf8ff;--sapContent_Illustrative_Color11:#f31ded;--sapContent_Illustrative_Color12:#00a800;--sapContent_Illustrative_Color13:#005dc9;--sapContent_Illustrative_Color14:#004da5;--sapContent_Illustrative_Color15:#cc7400;--sapContent_Illustrative_Color16:#3b0ac6;--sapContent_Illustrative_Color17:#00a58a;--sapContent_Illustrative_Color18:#d1efff;--sapContent_Illustrative_Color19:#b8e6ff;--sapContent_Illustrative_Color20:#9eddff;--sapFontLightFamily:\"72-Light\",\"72-Lightfull\",\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontBoldFamily:\"72-Bold\",\"72-Boldfull\",\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontSemiboldFamily:\"72-Semibold\",\"72-Semiboldfull\",\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontSemiboldDuplexFamily:\"72-SemiboldDuplex\",\"72-SemiboldDuplexfull\",\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontBlackFamily:\"72Black\",\"72Blackfull\",\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontHeaderFamily:\"72-Bold\",\"72-Boldfull\",\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontSmallSize:.75rem;--sapFontLargeSize:1rem;--sapFontHeader1Size:3rem;--sapFontHeader2Size:2rem;--sapFontHeader3Size:1.5rem;--sapFontHeader4Size:1.25rem;--sapFontHeader5Size:1rem;--sapFontHeader6Size:.875rem;--sapLink_TextDecoration:none;--sapLink_Hover_Color:#0064d9;--sapLink_Hover_TextDecoration:underline;--sapLink_Active_Color:#0064d9;--sapLink_Active_TextDecoration:none;--sapLink_Visited_Color:#0064d9;--sapLink_InvertedColor:#a6cfff;--sapLink_SubtleColor:#1d2d3e;--sapShell_Background:#eff1f2;--sapShell_BackgroundImage:linear-gradient(180deg,#eff1f2,#eff1f2);--sapShell_BackgroundImageOpacity:1.0;--sapShell_BackgroundImageRepeat:false;--sapShell_BorderColor:#fff;--sapShell_TextColor:#1d2d3e;--sapShell_InteractiveBackground:#eff1f2;--sapShell_InteractiveTextColor:#1d2d3e;--sapShell_InteractiveBorderColor:#556b81;--sapShell_GroupTitleTextColor:#1d2d3e;--sapShell_GroupTitleTextShadow:0 0 0.125rem #fff;--sapShell_Hover_Background:#fff;--sapShell_Active_Background:#fff;--sapShell_Active_TextColor:#0070f2;--sapShell_Selected_Background:#fff;--sapShell_Selected_TextColor:#0070f2;--sapShell_Selected_Hover_Background:#fff;--sapShell_Favicon:none;--sapShell_Navigation_Background:#fff;--sapShell_Navigation_Hover_Background:#fff;--sapShell_Navigation_SelectedColor:#0064d9;--sapShell_Navigation_Selected_TextColor:#0064d9;--sapShell_Navigation_TextColor:#1d2d3e;--sapShell_Navigation_Active_TextColor:#0064d9;--sapShell_Navigation_Active_Background:#fff;--sapShell_Shadow:0 0.125rem 0.125rem 0 rgba(34,53,72,.15),inset 0 -0.0625rem 0 0 rgba(34,53,72,.2);--sapShell_NegativeColor:#aa0808;--sapShell_CriticalColor:#b44f00;--sapShell_PositiveColor:#256f3a;--sapShell_InformativeColor:#0064d9;--sapShell_NeutralColor:#1d2d3e;--sapShell_Category_1_Background:#0057d2;--sapShell_Category_1_BorderColor:#0057d2;--sapShell_Category_1_TextColor:#fff;--sapShell_Category_1_TextShadow:0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_2_Background:#df1278;--sapShell_Category_2_BorderColor:#df1278;--sapShell_Category_2_TextColor:#fff;--sapShell_Category_2_TextShadow:0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_3_Background:#e76500;--sapShell_Category_3_BorderColor:#e76500;--sapShell_Category_3_TextColor:#fff;--sapShell_Category_3_TextShadow:0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_4_Background:#7800a4;--sapShell_Category_4_BorderColor:#7800a4;--sapShell_Category_4_TextColor:#fff;--sapShell_Category_4_TextShadow:0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_5_Background:#aa2608;--sapShell_Category_5_BorderColor:#aa2608;--sapShell_Category_5_TextColor:#fff;--sapShell_Category_5_TextShadow:0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_6_Background:#07838f;--sapShell_Category_6_BorderColor:#07838f;--sapShell_Category_6_TextColor:#fff;--sapShell_Category_6_TextShadow:0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_7_Background:#f31ded;--sapShell_Category_7_BorderColor:#f31ded;--sapShell_Category_7_TextColor:#fff;--sapShell_Category_7_TextShadow:0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_8_Background:#188918;--sapShell_Category_8_BorderColor:#188918;--sapShell_Category_8_TextColor:#fff;--sapShell_Category_8_TextShadow:0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_9_Background:#002a86;--sapShell_Category_9_BorderColor:#002a86;--sapShell_Category_9_TextColor:#fff;--sapShell_Category_9_TextShadow:0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_10_Background:#5b738b;--sapShell_Category_10_BorderColor:#5b738b;--sapShell_Category_10_TextColor:#fff;--sapShell_Category_10_TextShadow:0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_11_Background:#d20a0a;--sapShell_Category_11_BorderColor:#d20a0a;--sapShell_Category_11_TextColor:#fff;--sapShell_Category_11_TextShadow:0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_12_Background:#7858ff;--sapShell_Category_12_BorderColor:#7858ff;--sapShell_Category_12_TextColor:#fff;--sapShell_Category_12_TextShadow:0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_13_Background:#a00875;--sapShell_Category_13_BorderColor:#a00875;--sapShell_Category_13_TextColor:#fff;--sapShell_Category_13_TextShadow:0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_14_Background:#14565b;--sapShell_Category_14_BorderColor:#14565b;--sapShell_Category_14_TextColor:#fff;--sapShell_Category_14_TextShadow:0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_15_Background:#223548;--sapShell_Category_15_BorderColor:#223548;--sapShell_Category_15_TextColor:#fff;--sapShell_Category_15_TextShadow:0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_16_Background:#1e592f;--sapShell_Category_16_BorderColor:#1e592f;--sapShell_Category_16_TextColor:#fff;--sapShell_Category_16_TextShadow:0 0 .0625rem rgba(0,0,0,.7);--sapAvatar_1_Background:#fff3b8;--sapAvatar_1_BorderColor:#fff3b8;--sapAvatar_1_TextColor:#a45d00;--sapAvatar_2_Background:#ffd0e7;--sapAvatar_2_BorderColor:#ffd0e7;--sapAvatar_2_TextColor:#aa0808;--sapAvatar_3_Background:#ffdbe7;--sapAvatar_3_BorderColor:#ffdbe7;--sapAvatar_3_TextColor:#ba066c;--sapAvatar_4_Background:#ffdcf3;--sapAvatar_4_BorderColor:#ffdcf3;--sapAvatar_4_TextColor:#a100c2;--sapAvatar_5_Background:#ded3ff;--sapAvatar_5_BorderColor:#ded3ff;--sapAvatar_5_TextColor:#552cff;--sapAvatar_6_Background:#d1efff;--sapAvatar_6_BorderColor:#d1efff;--sapAvatar_6_TextColor:#0057d2;--sapAvatar_7_Background:#c2fcee;--sapAvatar_7_BorderColor:#c2fcee;--sapAvatar_7_TextColor:#046c7a;--sapAvatar_8_Background:#ebf5cb;--sapAvatar_8_BorderColor:#ebf5cb;--sapAvatar_8_TextColor:#256f3a;--sapAvatar_9_Background:#ddccf0;--sapAvatar_9_BorderColor:#ddccf0;--sapAvatar_9_TextColor:#6c32a9;--sapAvatar_10_Background:#eaecee;--sapAvatar_10_BorderColor:#eaecee;--sapAvatar_10_TextColor:#556b82;--sapButton_Background:#fff;--sapButton_BorderColor:#bcc3ca;--sapButton_BorderWidth:.0625rem;--sapButton_BorderCornerRadius:.5rem;--sapButton_TextColor:#0064d9;--sapButton_Hover_Background:#eaecee;--sapButton_Hover_BorderColor:#bcc3ca;--sapButton_Hover_TextColor:#0064d9;--sapButton_IconColor:#0064d9;--sapButton_Active_Background:#fff;--sapButton_Active_BorderColor:#0064d9;--sapButton_Active_TextColor:#0064d9;--sapButton_Emphasized_Background:#0070f2;--sapButton_Emphasized_BorderColor:#0070f2;--sapButton_Emphasized_TextColor:#fff;--sapButton_Emphasized_Hover_Background:#0064d9;--sapButton_Emphasized_Hover_BorderColor:#0064d9;--sapButton_Emphasized_Hover_TextColor:#fff;--sapButton_Emphasized_Active_Background:#fff;--sapButton_Emphasized_Active_BorderColor:#0064d9;--sapButton_Emphasized_Active_TextColor:#0064d9;--sapButton_Emphasized_TextShadow:transparent;--sapButton_Emphasized_FontWeight:bold;--sapButton_Reject_Background:#ffd6e9;--sapButton_Reject_BorderColor:#ffc2de;--sapButton_Reject_TextColor:#aa0808;--sapButton_Reject_Hover_Background:#ffbddb;--sapButton_Reject_Hover_BorderColor:#ffbddb;--sapButton_Reject_Hover_TextColor:#aa0808;--sapButton_Reject_Active_Background:#fff;--sapButton_Reject_Active_BorderColor:#e90b0b;--sapButton_Reject_Active_TextColor:#aa0808;--sapButton_Reject_Selected_Background:#fff;--sapButton_Reject_Selected_BorderColor:#e90b0b;--sapButton_Reject_Selected_TextColor:#aa0808;--sapButton_Reject_Selected_Hover_Background:#ffbddb;--sapButton_Reject_Selected_Hover_BorderColor:#e90b0b;--sapButton_Accept_Background:#ebf5cb;--sapButton_Accept_BorderColor:#dbeda0;--sapButton_Accept_TextColor:#256f3a;--sapButton_Accept_Hover_Background:#e3f1b6;--sapButton_Accept_Hover_BorderColor:#e3f1b6;--sapButton_Accept_Hover_TextColor:#256f3a;--sapButton_Accept_Active_Background:#fff;--sapButton_Accept_Active_BorderColor:#30914c;--sapButton_Accept_Active_TextColor:#256f3a;--sapButton_Accept_Selected_Background:#fff;--sapButton_Accept_Selected_BorderColor:#30914c;--sapButton_Accept_Selected_TextColor:#256f3a;--sapButton_Accept_Selected_Hover_Background:#e3f1b6;--sapButton_Accept_Selected_Hover_BorderColor:#30914c;--sapButton_Lite_Background:transparent;--sapButton_Lite_BorderColor:transparent;--sapButton_Lite_TextColor:#0064d9;--sapButton_Lite_Hover_Background:#eaecee;--sapButton_Lite_Hover_BorderColor:#bcc3ca;--sapButton_Lite_Hover_TextColor:#0064d9;--sapButton_Lite_Active_Background:#fff;--sapButton_Lite_Active_BorderColor:#0064d9;--sapButton_Selected_Background:#fff;--sapButton_Selected_BorderColor:#0064d9;--sapButton_Selected_TextColor:#0064d9;--sapButton_Selected_Hover_Background:#e3f0ff;--sapButton_Selected_Hover_BorderColor:#0064d9;--sapButton_Attention_Background:#fff3b7;--sapButton_Attention_BorderColor:#ffeb84;--sapButton_Attention_TextColor:#b44f00;--sapButton_Attention_Hover_Background:#ffef9e;--sapButton_Attention_Hover_BorderColor:#ffef9e;--sapButton_Attention_Hover_TextColor:#b44f00;--sapButton_Attention_Active_Background:#fff;--sapButton_Attention_Active_BorderColor:#dd6100;--sapButton_Attention_Active_TextColor:#b44f00;--sapButton_Attention_Selected_Background:#fff;--sapButton_Attention_Selected_BorderColor:#dd6100;--sapButton_Attention_Selected_TextColor:#b44f00;--sapButton_Attention_Selected_Hover_Background:#ffef9e;--sapButton_Attention_Selected_Hover_BorderColor:#dd6100;--sapButton_Negative_Background:#f53232;--sapButton_Negative_BorderColor:#f53232;--sapButton_Negative_TextColor:#fff;--sapButton_Negative_Hover_Background:#e90b0b;--sapButton_Negative_Hover_BorderColor:#e90b0b;--sapButton_Negative_Hover_TextColor:#fff;--sapButton_Negative_Active_Background:#fff;--sapButton_Negative_Active_BorderColor:#f53232;--sapButton_Negative_Active_TextColor:#aa0808;--sapButton_Critical_Background:#e76500;--sapButton_Critical_BorderColor:#e76500;--sapButton_Critical_TextColor:#fff;--sapButton_Critical_Hover_Background:#dd6100;--sapButton_Critical_Hover_BorderColor:#dd6100;--sapButton_Critical_Hover_TextColor:#fff;--sapButton_Critical_Active_Background:#fff;--sapButton_Critical_Active_BorderColor:#dd6100;--sapButton_Critical_Active_TextColor:#b44f00;--sapButton_Success_Background:#30914c;--sapButton_Success_BorderColor:#30914c;--sapButton_Success_TextColor:#fff;--sapButton_Success_Hover_Background:#2c8646;--sapButton_Success_Hover_BorderColor:#2c8646;--sapButton_Success_Hover_TextColor:#fff;--sapButton_Success_Active_Background:#fff;--sapButton_Success_Active_BorderColor:#30914c;--sapButton_Success_Active_TextColor:#256f3a;--sapButton_Information_Background:#e8f3ff;--sapButton_Information_BorderColor:#b5d8ff;--sapButton_Information_TextColor:#0064d9;--sapButton_Information_Hover_Background:#d4e8ff;--sapButton_Information_Hover_BorderColor:#b5d8ff;--sapButton_Information_Hover_TextColor:#0064d9;--sapButton_Information_Active_Background:#fff;--sapButton_Information_Active_BorderColor:#0064d9;--sapButton_Information_Active_TextColor:#0064d9;--sapButton_Neutral_Background:#e8f3ff;--sapButton_Neutral_BorderColor:#b5d8ff;--sapButton_Neutral_TextColor:#0064d9;--sapButton_Neutral_Hover_Background:#d4e8ff;--sapButton_Neutral_Hover_BorderColor:#b5d8ff;--sapButton_Neutral_Hover_TextColor:#0064d9;--sapButton_Neutral_Active_Background:#fff;--sapButton_Neutral_Active_BorderColor:#0064d9;--sapButton_Neutral_Active_TextColor:#0064d9;--sapButton_Track_Background:#788fa6;--sapButton_Track_BorderColor:#788fa6;--sapButton_Track_TextColor:#fff;--sapButton_Track_Hover_Background:#637d97;--sapButton_Track_Hover_BorderColor:#637d97;--sapButton_Track_Selected_Background:#0064d9;--sapButton_Track_Selected_BorderColor:#0064d9;--sapButton_Track_Selected_TextColor:#fff;--sapButton_Track_Selected_Hover_Background:#0058c0;--sapButton_Track_Selected_Hover_BorderColor:#0058c0;--sapButton_Handle_Background:#fff;--sapButton_Handle_BorderColor:#fff;--sapButton_Handle_TextColor:#1d2d3e;--sapButton_Handle_Hover_Background:#fff;--sapButton_Handle_Hover_BorderColor:hsla(0,0%,100%,.5);--sapButton_Handle_Selected_Background:#fff;--sapButton_Handle_Selected_BorderColor:#fff;--sapButton_Handle_Selected_TextColor:#0064d9;--sapButton_Handle_Selected_Hover_Background:#fff;--sapButton_Handle_Selected_Hover_BorderColor:hsla(0,0%,100%,.5);--sapButton_Track_Negative_Background:#f53232;--sapButton_Track_Negative_BorderColor:#f53232;--sapButton_Track_Negative_TextColor:#fff;--sapButton_Track_Negative_Hover_Background:#e90b0b;--sapButton_Track_Negative_Hover_BorderColor:#e90b0b;--sapButton_Handle_Negative_Background:#fff;--sapButton_Handle_Negative_BorderColor:#fff;--sapButton_Handle_Negative_TextColor:#aa0808;--sapButton_Handle_Negative_Hover_Background:#fff;--sapButton_Handle_Negative_Hover_BorderColor:hsla(0,0%,100%,.5);--sapButton_Track_Positive_Background:#30914c;--sapButton_Track_Positive_BorderColor:#30914c;--sapButton_Track_Positive_TextColor:#fff;--sapButton_Track_Positive_Hover_Background:#2c8646;--sapButton_Track_Positive_Hover_BorderColor:#2c8646;--sapButton_Handle_Positive_Background:#fff;--sapButton_Handle_Positive_BorderColor:#fff;--sapButton_Handle_Positive_TextColor:#256f3a;--sapButton_Handle_Positive_Hover_Background:#fff;--sapButton_Handle_Positive_Hover_BorderColor:hsla(0,0%,100%,.5);--sapButton_TokenBackground:#fff;--sapButton_TokenBorderColor:#bcc3ca;--sapField_Background:#fff;--sapField_BackgroundStyle:0 100%/100% .0625rem no-repeat linear-gradient(0deg,#556b81,#556b81) border-box;--sapField_TextColor:#131e29;--sapField_PlaceholderTextColor:#556b82;--sapField_BorderColor:#556b81;--sapField_HelpBackground:#fff;--sapField_BorderWidth:.0625rem;--sapField_BorderStyle:none;--sapField_BorderCornerRadius:.25rem;--sapField_Shadow:inset 0 0 0 0.0625rem rgba(85,107,129,.25);--sapField_Hover_Background:#fff;--sapField_Hover_BackgroundStyle:0 100%/100% .0625rem no-repeat linear-gradient(0deg,#0064d9,#0064d9) border-box;--sapField_Hover_BorderColor:#0064d9;--sapField_Hover_HelpBackground:#fff;--sapField_Hover_Shadow:inset 0 0 0 0.0625rem rgba(79,160,255,.5);--sapField_Hover_InvalidShadow:inset 0 0 0 0.0625rem rgba(255,142,196,.45);--sapField_Hover_WarningShadow:inset 0 0 0 0.0625rem rgba(255,213,10,.4);--sapField_Hover_SuccessShadow:inset 0 0 0 0.0625rem rgba(48,145,76,.18);--sapField_Hover_InformationShadow:inset 0 0 0 0.0625rem rgba(104,174,255,.5);--sapField_Active_BorderColor:#0064d9;--sapField_Focus_Background:#fff;--sapField_Focus_BorderColor:#0032a5;--sapField_Focus_HelpBackground:#fff;--sapField_ReadOnly_Background:#eaecee;--sapField_ReadOnly_BackgroundStyle:0 100%/0.375rem .0625rem repeat-x linear-gradient(90deg,#556b81,#556b81 0.25rem,transparent 0) border-box;--sapField_ReadOnly_BorderColor:#556b81;--sapField_ReadOnly_BorderStyle:none;--sapField_ReadOnly_HelpBackground:#eaecee;--sapField_RequiredColor:#ba066c;--sapField_InvalidColor:#e90b0b;--sapField_InvalidBackground:#ffeaf4;--sapField_InvalidBackgroundStyle:0 100%/100% .125rem no-repeat linear-gradient(0deg,#e90b0b,#e90b0b) border-box;--sapField_InvalidBorderWidth:.125rem;--sapField_InvalidBorderStyle:none;--sapField_InvalidShadow:inset 0 0 0 0.0625rem rgba(255,142,196,.45);--sapField_WarningColor:#dd6100;--sapField_WarningBackground:#fff8d6;--sapField_WarningBackgroundStyle:0 100%/100% .125rem no-repeat linear-gradient(0deg,#dd6100,#dd6100) border-box;--sapField_WarningBorderWidth:.125rem;--sapField_WarningBorderStyle:none;--sapField_WarningShadow:inset 0 0 0 0.0625rem rgba(255,213,10,.4);--sapField_SuccessColor:#30914c;--sapField_SuccessBackground:#f5fae5;--sapField_SuccessBackgroundStyle:0 100%/100% .0625rem no-repeat linear-gradient(0deg,#30914c,#30914c) border-box;--sapField_SuccessBorderWidth:.0625rem;--sapField_SuccessBorderStyle:none;--sapField_SuccessShadow:inset 0 0 0 0.0625rem rgba(48,145,76,.18);--sapField_InformationColor:#0070f2;--sapField_InformationBackground:#e1f4ff;--sapField_InformationBackgroundStyle:0 100%/100% .125rem no-repeat linear-gradient(0deg,#0070f2,#0070f2) border-box;--sapField_InformationBorderWidth:.125rem;--sapField_InformationBorderStyle:none;--sapField_InformationShadow:inset 0 0 0 0.0625rem rgba(104,174,255,.5);--sapGroup_TitleBackground:#fff;--sapGroup_TitleBorderColor:#a8b2bd;--sapGroup_TitleTextColor:#1d2d3e;--sapGroup_Title_FontSize:1rem;--sapGroup_ContentBackground:#fff;--sapGroup_ContentBorderColor:#d9d9d9;--sapGroup_BorderWidth:.0625rem;--sapGroup_BorderCornerRadius:.5rem;--sapGroup_FooterBackground:transparent;--sapToolbar_Background:#fff;--sapToolbar_SeparatorColor:#d9d9d9;--sapList_HeaderBackground:#fff;--sapList_HeaderBorderColor:#a8b2bd;--sapList_HeaderTextColor:#1d2d3e;--sapList_BorderColor:#e5e5e5;--sapList_BorderWidth:.0625rem;--sapList_TextColor:#1d2d3e;--sapList_Active_TextColor:#1d2d3e;--sapList_Active_Background:#dee2e5;--sapList_SelectionBackgroundColor:#ebf8ff;--sapList_SelectionBorderColor:#0064d9;--sapList_Hover_SelectionBackground:#dcf3ff;--sapList_Background:#fff;--sapList_Hover_Background:#eaecee;--sapList_AlternatingBackground:#f5f6f7;--sapList_GroupHeaderBackground:#fff;--sapList_GroupHeaderBorderColor:#a8b2bd;--sapList_GroupHeaderTextColor:#1d2d3e;--sapList_TableGroupHeaderBackground:#eff1f2;--sapList_TableGroupHeaderBorderColor:#a8b2bd;--sapList_TableGroupHeaderTextColor:#1d2d3e;--sapList_FooterBackground:#fff;--sapList_FooterTextColor:#1d2d3e;--sapList_TableFooterBorder:#a8b2bd;--sapList_TableFixedBorderColor:#8c8c8c;--sapMessage_ErrorBorderColor:#ff8ec4;--sapMessage_WarningBorderColor:#ffe770;--sapMessage_SuccessBorderColor:#cee67e;--sapMessage_InformationBorderColor:#7bcfff;--sapPopover_BorderCornerRadius:.5rem;--sapProgress_Background:#d5dadd;--sapProgress_BorderColor:#d5dadd;--sapProgress_TextColor:#1d2d3e;--sapProgress_FontSize:.875rem;--sapProgress_NegativeBackground:#ffdbec;--sapProgress_NegativeBorderColor:#ffdbec;--sapProgress_NegativeTextColor:#1d2d3e;--sapProgress_CriticalBackground:#fff4bd;--sapProgress_CriticalBorderColor:#fff4bd;--sapProgress_CriticalTextColor:#1d2d3e;--sapProgress_PositiveBackground:#e5f2ba;--sapProgress_PositiveBorderColor:#e5f2ba;--sapProgress_PositiveTextColor:#1d2d3e;--sapProgress_InformationBackground:#cdedff;--sapProgress_InformationBorderColor:#cdedff;--sapProgress_InformationTextColor:#1d2d3e;--sapProgress_Value_Background:#788fa6;--sapProgress_Value_BorderColor:#788fa6;--sapProgress_Value_TextColor:#788fa6;--sapProgress_Value_NegativeBackground:#f53232;--sapProgress_Value_NegativeBorderColor:#f53232;--sapProgress_Value_NegativeTextColor:#f53232;--sapProgress_Value_CriticalBackground:#e76500;--sapProgress_Value_CriticalBorderColor:#e76500;--sapProgress_Value_CriticalTextColor:#e76500;--sapProgress_Value_PositiveBackground:#30914c;--sapProgress_Value_PositiveBorderColor:#30914c;--sapProgress_Value_PositiveTextColor:#30914c;--sapProgress_Value_InformationBackground:#0070f2;--sapProgress_Value_InformationBorderColor:#0070f2;--sapProgress_Value_InformationTextColor:#0070f2;--sapScrollBar_FaceColor:#7b91a8;--sapScrollBar_TrackColor:#fff;--sapScrollBar_BorderColor:#7b91a8;--sapScrollBar_SymbolColor:#0064d9;--sapScrollBar_Dimension:.75rem;--sapScrollBar_Hover_FaceColor:#5b728b;--sapSlider_Background:#d5dadd;--sapSlider_BorderColor:#d5dadd;--sapSlider_Selected_Background:#0064d9;--sapSlider_Selected_BorderColor:#0064d9;--sapSlider_HandleBackground:#fff;--sapSlider_HandleBorderColor:#b0d5ff;--sapSlider_RangeHandleBackground:#fff;--sapSlider_Hover_HandleBackground:#e3f0ff;--sapSlider_Hover_HandleBorderColor:#b0d5ff;--sapSlider_Hover_RangeHandleBackground:#e3f0ff;--sapSlider_Active_HandleBackground:#fff;--sapSlider_Active_HandleBorderColor:#0064d9;--sapSlider_Active_RangeHandleBackground:transparent;--sapPageHeader_Background:#fff;--sapPageHeader_BorderColor:#d9d9d9;--sapPageHeader_TextColor:#1d2d3e;--sapPageFooter_Background:#fff;--sapPageFooter_BorderColor:#d9d9d9;--sapPageFooter_TextColor:#1d2d3e;--sapInfobar_Background:#c2fcee;--sapInfobar_Hover_Background:#fff;--sapInfobar_Active_Background:#fff;--sapInfobar_NonInteractive_Background:#f5f6f7;--sapInfobar_TextColor:#046c7a;--sapObjectHeader_Background:#fff;--sapObjectHeader_Hover_Background:#eaecee;--sapObjectHeader_BorderColor:#d9d9d9;--sapObjectHeader_Title_TextColor:#1d2d3e;--sapObjectHeader_Title_FontSize:1.5rem;--sapObjectHeader_Title_SnappedFontSize:1.25rem;--sapObjectHeader_Title_FontFamily:\"72Black\",\"72Blackfull\",\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapObjectHeader_Subtitle_TextColor:#556b82;--sapBlockLayer_Background:#000;--sapTile_Background:#fff;--sapTile_Hover_Background:#eaecee;--sapTile_Active_Background:#dee2e5;--sapTile_BorderColor:transparent;--sapTile_BorderCornerRadius:1rem;--sapTile_TitleTextColor:#1d2d3e;--sapTile_TextColor:#556b82;--sapTile_IconColor:#556b82;--sapTile_SeparatorColor:#ccc;--sapTile_Interactive_BorderColor:#b3b3b3;--sapTile_OverlayBackground:#fff;--sapTile_OverlayForegroundColor:#1d2d3e;--sapAccentColor1:#d27700;--sapAccentColor2:#aa0808;--sapAccentColor3:#ba066c;--sapAccentColor4:#a100c2;--sapAccentColor5:#5d36ff;--sapAccentColor6:#0057d2;--sapAccentColor7:#046c7a;--sapAccentColor8:#256f3a;--sapAccentColor9:#6c32a9;--sapAccentColor10:#5b738b;--sapAccentBackgroundColor1:#fff3b8;--sapAccentBackgroundColor2:#ffd0e7;--sapAccentBackgroundColor3:#ffdbe7;--sapAccentBackgroundColor4:#ffdcf3;--sapAccentBackgroundColor5:#ded3ff;--sapAccentBackgroundColor6:#d1efff;--sapAccentBackgroundColor7:#c2fcee;--sapAccentBackgroundColor8:#ebf5cb;--sapAccentBackgroundColor9:#ddccf0;--sapAccentBackgroundColor10:#eaecee;--sapIndicationColor_1:#840606;--sapIndicationColor_1_Background:#840606;--sapIndicationColor_1_BorderColor:#840606;--sapIndicationColor_1_TextColor:#fff;--sapIndicationColor_1_Hover_Background:#6c0505;--sapIndicationColor_1_Active_Background:#fff;--sapIndicationColor_1_Active_BorderColor:#fb9d9d;--sapIndicationColor_1_Active_TextColor:#840606;--sapIndicationColor_1_Selected_Background:#fff;--sapIndicationColor_1_Selected_BorderColor:#fb9d9d;--sapIndicationColor_1_Selected_TextColor:#840606;--sapIndicationColor_1b:#fb9d9d;--sapIndicationColor_1b_BorderColor:#fb9d9d;--sapIndicationColor_1b_Hover_Background:#fa8585;--sapIndicationColor_2:#aa0808;--sapIndicationColor_2_Background:#aa0808;--sapIndicationColor_2_BorderColor:#aa0808;--sapIndicationColor_2_TextColor:#fff;--sapIndicationColor_2_Hover_Background:#920707;--sapIndicationColor_2_Active_Background:#fff;--sapIndicationColor_2_Active_BorderColor:#fcc4c4;--sapIndicationColor_2_Active_TextColor:#aa0808;--sapIndicationColor_2_Selected_Background:#fff;--sapIndicationColor_2_Selected_BorderColor:#fcc4c4;--sapIndicationColor_2_Selected_TextColor:#aa0808;--sapIndicationColor_2b:#fcc4c4;--sapIndicationColor_2b_BorderColor:#fcc4c4;--sapIndicationColor_2b_Hover_Background:#fbacac;--sapIndicationColor_3:#b95100;--sapIndicationColor_3_Background:#e76500;--sapIndicationColor_3_BorderColor:#e76500;--sapIndicationColor_3_TextColor:#fff;--sapIndicationColor_3_Hover_Background:#d85e00;--sapIndicationColor_3_Active_Background:#fff;--sapIndicationColor_3_Active_BorderColor:#fff2c0;--sapIndicationColor_3_Active_TextColor:#b95100;--sapIndicationColor_3_Selected_Background:#fff;--sapIndicationColor_3_Selected_BorderColor:#fff2c0;--sapIndicationColor_3_Selected_TextColor:#b95100;--sapIndicationColor_3b:#fff2c0;--sapIndicationColor_3b_BorderColor:#fff2c0;--sapIndicationColor_3b_Hover_Background:#ffeda6;--sapIndicationColor_4:#256f3a;--sapIndicationColor_4_Background:#256f3a;--sapIndicationColor_4_BorderColor:#256f3a;--sapIndicationColor_4_TextColor:#fff;--sapIndicationColor_4_Hover_Background:#1f5c30;--sapIndicationColor_4_Active_Background:#fff;--sapIndicationColor_4_Active_BorderColor:#bae8bc;--sapIndicationColor_4_Active_TextColor:#256f3a;--sapIndicationColor_4_Selected_Background:#fff;--sapIndicationColor_4_Selected_BorderColor:#bae8bc;--sapIndicationColor_4_Selected_TextColor:#256f3a;--sapIndicationColor_4b:#bae8bc;--sapIndicationColor_4b_BorderColor:#bae8bc;--sapIndicationColor_4b_Hover_Background:#a7e2a9;--sapIndicationColor_5:#0070f2;--sapIndicationColor_5_Background:#0070f2;--sapIndicationColor_5_BorderColor:#0070f2;--sapIndicationColor_5_TextColor:#fff;--sapIndicationColor_5_Hover_Background:#0064d9;--sapIndicationColor_5_Active_Background:#fff;--sapIndicationColor_5_Active_BorderColor:#d3effd;--sapIndicationColor_5_Active_TextColor:#0070f2;--sapIndicationColor_5_Selected_Background:#fff;--sapIndicationColor_5_Selected_BorderColor:#d3effd;--sapIndicationColor_5_Selected_TextColor:#0070f2;--sapIndicationColor_5b:#d3effd;--sapIndicationColor_5b_BorderColor:#d3effd;--sapIndicationColor_5b_Hover_Background:#bbe6fc;--sapIndicationColor_6:#046c7a;--sapIndicationColor_6_Background:#046c7a;--sapIndicationColor_6_BorderColor:#046c7a;--sapIndicationColor_6_TextColor:#fff;--sapIndicationColor_6_Hover_Background:#035661;--sapIndicationColor_6_Active_Background:#fff;--sapIndicationColor_6_Active_BorderColor:#cdf5ec;--sapIndicationColor_6_Active_TextColor:#046c7a;--sapIndicationColor_6_Selected_Background:#fff;--sapIndicationColor_6_Selected_BorderColor:#cdf5ec;--sapIndicationColor_6_Selected_TextColor:#046c7a;--sapIndicationColor_6b:#cdf5ec;--sapIndicationColor_6b_BorderColor:#cdf5ec;--sapIndicationColor_6b_Hover_Background:#b8f1e4;--sapIndicationColor_7:#5d36ff;--sapIndicationColor_7_Background:#5d36ff;--sapIndicationColor_7_BorderColor:#5d36ff;--sapIndicationColor_7_TextColor:#fff;--sapIndicationColor_7_Hover_Background:#481cff;--sapIndicationColor_7_Active_Background:#fff;--sapIndicationColor_7_Active_BorderColor:#e2dbff;--sapIndicationColor_7_Active_TextColor:#5d36ff;--sapIndicationColor_7_Selected_Background:#fff;--sapIndicationColor_7_Selected_BorderColor:#e2dbff;--sapIndicationColor_7_Selected_TextColor:#5d36ff;--sapIndicationColor_7b:#e2dbff;--sapIndicationColor_7b_BorderColor:#e2dbff;--sapIndicationColor_7b_Hover_Background:#cdc2ff;--sapIndicationColor_8:#a100c2;--sapIndicationColor_8_Background:#a100c2;--sapIndicationColor_8_BorderColor:#a100c2;--sapIndicationColor_8_TextColor:#fff;--sapIndicationColor_8_Hover_Background:#8c00a9;--sapIndicationColor_8_Active_Background:#fff;--sapIndicationColor_8_Active_BorderColor:#f8d6ff;--sapIndicationColor_8_Active_TextColor:#a100c2;--sapIndicationColor_8_Selected_Background:#fff;--sapIndicationColor_8_Selected_BorderColor:#f8d6ff;--sapIndicationColor_8_Selected_TextColor:#a100c2;--sapIndicationColor_8b:#f8d6ff;--sapIndicationColor_8b_BorderColor:#f8d6ff;--sapIndicationColor_8b_Hover_Background:#f4bdff;--sapIndicationColor_9:#1d2d3e;--sapIndicationColor_9_Background:#1d2d3e;--sapIndicationColor_9_BorderColor:#1d2d3e;--sapIndicationColor_9_TextColor:#fff;--sapIndicationColor_9_Hover_Background:#15202d;--sapIndicationColor_9_Active_Background:#fff;--sapIndicationColor_9_Active_BorderColor:#d9d9d9;--sapIndicationColor_9_Active_TextColor:#1d2d3e;--sapIndicationColor_9_Selected_Background:#fff;--sapIndicationColor_9_Selected_BorderColor:#d9d9d9;--sapIndicationColor_9_Selected_TextColor:#1d2d3e;--sapIndicationColor_9b:#fff;--sapIndicationColor_9b_BorderColor:#d9d9d9;--sapIndicationColor_9b_Hover_Background:#f2f2f2;--sapIndicationColor_10:#45484a;--sapIndicationColor_10_Background:#83888b;--sapIndicationColor_10_BorderColor:#83888b;--sapIndicationColor_10_TextColor:#fff;--sapIndicationColor_10_Hover_Background:#767b7e;--sapIndicationColor_10_Active_Background:#fff;--sapIndicationColor_10_Active_BorderColor:#eaecee;--sapIndicationColor_10_Active_TextColor:#45484a;--sapIndicationColor_10_Selected_Background:#fff;--sapIndicationColor_10_Selected_BorderColor:#eaecee;--sapIndicationColor_10_Selected_TextColor:#45484a;--sapIndicationColor_10b:#eaecee;--sapIndicationColor_10b_BorderColor:#eaecee;--sapIndicationColor_10b_Hover_Background:#dcdfe3;--sapLegend_WorkingBackground:#fff;--sapLegend_NonWorkingBackground:#ebebeb;--sapLegend_CurrentDateTime:#a100c2;--sapLegendColor1:#c35500;--sapLegendColor2:#d23a0a;--sapLegendColor3:#df1278;--sapLegendColor4:#840606;--sapLegendColor5:#cc00dc;--sapLegendColor6:#0057d2;--sapLegendColor7:#07838f;--sapLegendColor8:#188918;--sapLegendColor9:#5b738b;--sapLegendColor10:#7800a4;--sapLegendColor11:#a93e00;--sapLegendColor12:#aa2608;--sapLegendColor13:#ba066c;--sapLegendColor14:#8d2a00;--sapLegendColor15:#4e247a;--sapLegendColor16:#002a86;--sapLegendColor17:#035663;--sapLegendColor18:#1e592f;--sapLegendColor19:#1a4796;--sapLegendColor20:#470ced;--sapLegendBackgroundColor1:#ffef9f;--sapLegendBackgroundColor2:#feeae1;--sapLegendBackgroundColor3:#fbf6f8;--sapLegendBackgroundColor4:#fbebeb;--sapLegendBackgroundColor5:#ffe5fe;--sapLegendBackgroundColor6:#d1efff;--sapLegendBackgroundColor7:#c2fcee;--sapLegendBackgroundColor8:#f5fae5;--sapLegendBackgroundColor9:#f5f6f7;--sapLegendBackgroundColor10:#fff0fa;--sapLegendBackgroundColor11:#fff8d6;--sapLegendBackgroundColor12:#fff6f6;--sapLegendBackgroundColor13:#f7ebef;--sapLegendBackgroundColor14:#f1ecd5;--sapLegendBackgroundColor15:#f0e7f8;--sapLegendBackgroundColor16:#ebf8ff;--sapLegendBackgroundColor17:#dafdf5;--sapLegendBackgroundColor18:#ebf5cb;--sapLegendBackgroundColor19:#fafdff;--sapLegendBackgroundColor20:#eceeff;--sapChart_OrderedColor_1:#0070f2;--sapChart_OrderedColor_2:#c87b00;--sapChart_OrderedColor_3:#75980b;--sapChart_OrderedColor_4:#df1278;--sapChart_OrderedColor_5:#8b47d7;--sapChart_OrderedColor_6:#049f9a;--sapChart_OrderedColor_7:#3c8cdd;--sapChart_OrderedColor_8:#cc00dc;--sapChart_OrderedColor_9:#798c77;--sapChart_OrderedColor_10:#da6c6c;--sapChart_OrderedColor_11:#5d36ff;--sapChart_Bad:#f53232;--sapChart_Critical:#e76500;--sapChart_Good:#30914c;--sapChart_Neutral:#788fa6;--sapChart_Sequence_1:#0070f2;--sapChart_Sequence_2:#c87b00;--sapChart_Sequence_3:#75980b;--sapChart_Sequence_4:#df1278;--sapChart_Sequence_5:#8b47d7;--sapChart_Sequence_6:#049f9a;--sapChart_Sequence_7:#3c8cdd;--sapChart_Sequence_8:#cc00dc;--sapChart_Sequence_9:#798c77;--sapChart_Sequence_10:#da6c6c;--sapChart_Sequence_11:#5d36ff;--sapChart_Sequence_Neutral:#788fa6;}" };

const styleData$1 = { packageName: "@udex/web-components", fileName: "themes/sap_horizon/parameters-bundle.css", content: "" };

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$2);
registerThemePropertiesLoader("@udex/web-components", "sap_horizon", async () => styleData$1);
const styleData = { packageName: "@udex/web-components", fileName: "themes/HeroBanner.css", content: ":host{--udexHeroBannerMinHeight:200px;--udexHeroBannerSlotMaxWidth:calc(50% - var(--udexHeroBannerContentPaddingVertical, 24px)*2);--udexHeroBannerBackgroundImageObjectFit:contain;--udexHeroBannerVerticalLayoutLTRBackgroundImageAlignment:bottom right;--udexHeroBannerVerticalLayoutRTLBackgroundImageAlignment:bottom left;--udexHeroBannerHorizontalLayoutLTRBackgroundImageAlignment:top right;--udexHeroBannerHorizontalLayoutRTLBackgroundImageAlignment:top left;--udexHeroBannerBackroundImageZIndex:1;--udexHeroBannerContentZIndex:2;--udexHeroBannerContentPaddingHorizontal:var(--udexGridXSMargins,24px);--udexHeroBannerContentPaddingVertical:var(--udexGridXSMargins,24px)}.udex-hero-banner{container-type:inline-size;display:flex;flex-wrap:wrap;min-height:var(--udexHeroBannerMinHeight,200px);position:relative}.udex-hero-banner__background-image{height:100%;object-fit:var(--udexHeroBannerBackgroundImageObjectFit,contain);object-position:var(--udexHeroBannerVerticalLayoutLTRBackgroundImageAlignment,bottom right);position:absolute;width:100%;z-index:var(--udexHeroBannerBackroundImageZIndex,1)}.udex-hero-banner__background-image:dir(ltr){object-position:var(--udexHeroBannerVerticalLayoutLTRBackgroundImageAlignment,bottom right)}.udex-hero-banner__background-image:dir(rtl){object-position:var(--udexHeroBannerVerticalLayoutRTLBackgroundImageAlignment,bottom left)}.udex-hero-banner slot{display:flex;flex-basis:100%;flex-grow:1;padding:var(--udexHeroBannerContentPaddingVertical,24px) var(--udexHeroBannerContentPaddingHorizontal,24px);z-index:var(--udexHeroBannerContentZIndex,2)}@container (min-width: 800px){.udex-hero-banner__background-image,.udex-hero-banner__background-image:dir(ltr){object-position:var(--udexHeroBannerHorizontalLayoutLTRBackgroundImageAlignment,top right)}.udex-hero-banner__background-image:dir(rtl){object-position:var(--udexHeroBannerHorizontalLayoutRTLBackgroundImageAlignment,top left)}.udex-hero-banner slot{flex-basis:var(--udexHeroBannerSlotMaxWidth);max-width:var(--udexHeroBannerSlotMaxWidth)}}" };

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @class
 *
 * @constructor
 * @alias udex.components.HeroBanner
 * @extends sap.ui.webc.base.UI5Element
 * @tagname udex-hero-banner
 * @public
 */
let HeroBanner = class HeroBanner extends UI5Element {
    get hasBackgroundImage() {
        return !!this.backgroundImage;
    }
    get wrapperBackgroundColor() {
        return this.backgroundColor ? this.backgroundColor : "transparent";
    }
    get hasAdditionalContent() {
        return !!this.additionalContent?.length;
    }
};
__decorate([
    property({ type: String })
], HeroBanner.prototype, "backgroundImage", void 0);
__decorate([
    property({ type: String })
], HeroBanner.prototype, "backgroundImageLabel", void 0);
__decorate([
    property({ type: String })
], HeroBanner.prototype, "backgroundColor", void 0);
__decorate([
    slot()
], HeroBanner.prototype, "content", void 0);
__decorate([
    slot()
], HeroBanner.prototype, "additionalContent", void 0);
HeroBanner = __decorate([
    customElement({
        tag: "udex-hero-banner",
        renderer: litRender,
        styles: styleData,
        template: block0,
    })
], HeroBanner);
HeroBanner.define();

// used in test pages
// import "./dist/TextField.js";
// import "./dist/Pagination.js";
// import "./dist/Button.js";
// import "./dist/Modal.js";
// import "./dist/Divider.js";
// import "./dist/Search.js";
// import "./dist/features/SearchSuggestionsPopover.js";

window["sap-ui-webcomponents-bundle"] = {
  renderFinished,
  configuration: {
    getAnimationMode,
    getLanguage,
    getTheme,
    setTheme,
    getNoConflict,
    setNoConflict,
    getCalendarType,
    getRTL,
    getFirstDayOfWeek,
  },
};

var _$1 = {
	packageName: "@udex/web-components",
	fileName: "themes/sap_fiori_3/parameters-bundle.css",
	content: ""
};
var parametersBundle_css$2 = {
	_: _$1
};

var parametersBundle_css$3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    _: _$1,
    default: parametersBundle_css$2
});

var _ = {
	packageName: "@udex/web-components",
	fileName: "themes/sap_horizon/parameters-bundle.css",
	content: ""
};
var parametersBundle_css = {
	_: _
};

var parametersBundle_css$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    _: _,
    default: parametersBundle_css
});

var COUNT$3 = "Zählung";
var SUGGESTED_TEXT$3 = "Vorgeschlagene Suchanfragen";
var RECOMMENDED_TEXT$3 = "Empfohlene Seiten";
var messagebundle_de = {
	COUNT: COUNT$3,
	SUGGESTED_TEXT: SUGGESTED_TEXT$3,
	RECOMMENDED_TEXT: RECOMMENDED_TEXT$3
};

var messagebundle_de$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    COUNT: COUNT$3,
    RECOMMENDED_TEXT: RECOMMENDED_TEXT$3,
    SUGGESTED_TEXT: SUGGESTED_TEXT$3,
    default: messagebundle_de
});

var COUNT$2 = "Count";
var OF = "of";
var SUGGESTED_TEXT$2 = "Suggested searches";
var RECOMMENDED_TEXT$2 = "Recommended pages";
var messagebundle_en = {
	COUNT: COUNT$2,
	OF: OF,
	SUGGESTED_TEXT: SUGGESTED_TEXT$2,
	RECOMMENDED_TEXT: RECOMMENDED_TEXT$2
};

var messagebundle_en$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    COUNT: COUNT$2,
    OF: OF,
    RECOMMENDED_TEXT: RECOMMENDED_TEXT$2,
    SUGGESTED_TEXT: SUGGESTED_TEXT$2,
    default: messagebundle_en
});

var COUNT$1 = "Cuenta";
var SUGGESTED_TEXT$1 = "Búsquedas sugeridas";
var RECOMMENDED_TEXT$1 = "Páginas recomendadas";
var messagebundle_es = {
	COUNT: COUNT$1,
	SUGGESTED_TEXT: SUGGESTED_TEXT$1,
	RECOMMENDED_TEXT: RECOMMENDED_TEXT$1
};

var messagebundle_es$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    COUNT: COUNT$1,
    RECOMMENDED_TEXT: RECOMMENDED_TEXT$1,
    SUGGESTED_TEXT: SUGGESTED_TEXT$1,
    default: messagebundle_es
});

var COUNT = "Comte";
var SUGGESTED_TEXT = "Recherches suggérées";
var RECOMMENDED_TEXT = "Pages recommandées";
var messagebundle_fr = {
	COUNT: COUNT,
	SUGGESTED_TEXT: SUGGESTED_TEXT,
	RECOMMENDED_TEXT: RECOMMENDED_TEXT
};

var messagebundle_fr$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    COUNT: COUNT,
    RECOMMENDED_TEXT: RECOMMENDED_TEXT,
    SUGGESTED_TEXT: SUGGESTED_TEXT,
    default: messagebundle_fr
});
