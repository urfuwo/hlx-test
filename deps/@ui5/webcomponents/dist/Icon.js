var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import { getIconData, getIconDataSync } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import executeTemplate from "@ui5/webcomponents-base/dist/renderer/executeTemplate.js";
import IconTemplate from "./generated/templates/IconTemplate.lit.js";
import IconDesign from "./types/IconDesign.js";
// Styles
import iconCss from "./generated/themes/Icon.css.js";
const ICON_NOT_FOUND = "ICON_NOT_FOUND";
const PRESENTATION_ROLE = "presentation";
/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-icon</code> component represents an SVG icon.
 * There are two main scenarios how the <code>ui5-icon</code> component is used:
 * as a purely decorative element, <br>
 * or as an interactive element that can be focused and clicked.
 *
 * <h3>Usage</h3>
 *
 * 1. <b>Get familiar with the icons collections.</b>
 * <br>
 * Before displaying an icon, you need to explore the icons collections to find and import the desired icon.
 * <br>
 * Currently there are 3 icons collection, available as 3 npm packages:
 * <br>
 *
 * <ul>
 * <li>
 * <ui5-link target="_blank" href="https://www.npmjs.com/package/@ui5/webcomponents-icons">@ui5/webcomponents-icons</ui5-link> represents the "SAP-icons" collection and includes the following
 * <ui5-link target="_blank" href="https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons">icons</ui5-link>.
 * </li>
 * <li>
 * <ui5-link target="_blank" href="https://www.npmjs.com/package/@ui5/webcomponents-icons-tnt">@ui5/webcomponents-icons-tnt</ui5-link> represents the "tnt" collection and includes the following
 * <ui5-link target="_blank" href="https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons-TNT">icons</ui5-link>.
 * </li>
 * <li>
 * <ui5-link target="_blank" href="https://www.npmjs.com/package/@ui5/webcomponents-icons-business-suite">@ui5/webcomponents-icons-icons-business-suite</ui5-link> represents the "business-suite" collection and includes the following
 * <ui5-link target="_blank" href="https://ui5.sap.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/BusinessSuiteInAppSymbols">icons</ui5-link>.
 * </li>
 * </ul>
 *
 * 2. <b>After exploring the icons collections, add one or more of the packages as dependencies to your project.</b>
 * <br>
 * <code>npm i @ui5/webcomponents-icons</code><br>
 * <code>npm i @ui5/webcomponents-icons-tnt</code><br>
 * <code>npm i @ui5/webcomponents-icons-business-suite</code>
 * <br><br>
 *
 * 3. <b>Then, import the desired icon</b>.
 * <br>
 * <code>import "@ui5/{package_name}/dist/{icon_name}.js";</code>
 * <br><br>
 *
 * <b>For Example</b>:
 * <br>
 *
 * For the standard "SAP-icons" icon collection, import an icon from the <code>@ui5/webcomponents-icons</code> package:
 * <br>
 * <code>import "@ui5/webcomponents-icons/dist/employee.js";</code>
 * <br><br>
 *
 * For the "tnt" (SAP Fiori Tools) icon collection, import an icon from the <code>@ui5/webcomponents-icons-tnt</code> package:
 * <br>
 * <code>import "@ui5/webcomponents-icons-tnt/dist/antenna.js";</code>
 * <br><br>
 *
 * For the "business-suite" (SAP Business Suite) icon collection, import an icon from the <code>@ui5/webcomponents-icons-business-suite</code> package:
 * <br>
 * <code>import "@ui5/webcomponents-icons-business-suite/dist/ab-testing.js";</code>
 * <br><br>
 *
 * 4. <b>Display the icon using the <code>ui5-icon</code> web component.</b><br>
 * Set the icon collection ("SAP-icons", "tnt" or "business-suite" - "SAP-icons" is the default icon collection and can be skipped)<br>
 * and the icon name to the <code>name</code> property.
 * <br><br>
 *
 * <code>&lt;ui5-icon name="employee">&lt;/ui5-icon></code><br>
 * <code>&lt;ui5-icon name="tnt/antenna">&lt;/ui5-icon></code><br>
 * <code>&lt;ui5-icon name="business-suite/ab-testing">&lt;/ui5-icon></code>
 *
 * <br><br>
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-icon</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>root - Used to style the outermost wrapper of the <code>ui5-icon</code></li>
 * </ul>
 *
 * <br><br>
 * <h3>Keyboard Handling</h3>
 *
 * <ul>
 * <li>[SPACE, ENTER, RETURN] - Fires the <code>click</code> event if the <code>interactive</code> property is set to true.</li>
 * <li>[SHIFT] - If [SPACE] or [ENTER],[RETURN] is pressed, pressing [SHIFT] releases the ui5-icon without triggering the click event.</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Icon.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Icon
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-icon
 * @implements sap.ui.webc.main.IIcon
 * @public
 */
let Icon = class Icon extends UI5Element {
    _onFocusInHandler() {
        if (this.interactive) {
            this.focused = true;
        }
    }
    _onFocusOutHandler() {
        this.focused = false;
    }
    _onkeydown(e) {
        if (!this.interactive) {
            return;
        }
        if (isEnter(e)) {
            this.fireEvent("click");
        }
        if (isSpace(e)) {
            e.preventDefault(); // prevent scrolling
        }
    }
    _onkeyup(e) {
        if (this.interactive && isSpace(e)) {
            this.fireEvent("click");
        }
    }
    /**
    * Enforce "ltr" direction, based on the icons collection metadata.
    */
    get _dir() {
        return this.ltr ? "ltr" : undefined;
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
        return this.interactive ? "0" : undefined;
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
            /* eslint-disable-next-line */
            return console.warn("Icon name property is required", this);
        }
        let iconData = getIconDataSync(name);
        if (!iconData) {
            iconData = await getIconData(name);
        }
        if (!iconData) {
            this.invalid = true;
            /* eslint-disable-next-line */
            return console.warn(`Required icon is not registered. Invalid icon name: ${this.name}`);
        }
        if (iconData === ICON_NOT_FOUND) {
            this.invalid = true;
            /* eslint-disable-next-line */
            return console.warn(`Required icon is not registered. You can either import the icon as a module in order to use it e.g. "@ui5/webcomponents-icons/dist/${name.replace("sap-icon://", "")}.js", or setup a JSON build step and import "@ui5/webcomponents-icons/dist/AllIcons.js".`);
        }
        this.viewBox = iconData.viewBox || "0 0 512 512";
        if (iconData.customTemplate) {
            iconData.pathData = [];
            this.customSvg = executeTemplate(iconData.customTemplate, this);
        }
        // in case a new valid name is set, show the icon
        this.invalid = false;
        this.pathData = Array.isArray(iconData.pathData) ? iconData.pathData : [iconData.pathData];
        this.accData = iconData.accData;
        this.ltr = iconData.ltr;
        this.packageName = iconData.packageName;
        this._onfocusout = this.interactive ? this._onFocusOutHandler.bind(this) : undefined;
        this._onfocusin = this.interactive ? this._onFocusInHandler.bind(this) : undefined;
        if (this.accessibleName) {
            this.effectiveAccessibleName = this.accessibleName;
        }
        else if (this.accData) {
            const i18nBundle = await getI18nBundle(this.packageName);
            this.effectiveAccessibleName = i18nBundle.getText(this.accData) || undefined;
        }
        else {
            this.effectiveAccessibleName = undefined;
        }
    }
    get hasIconTooltip() {
        return this.showTooltip && this.effectiveAccessibleName;
    }
};
__decorate([
    property({ type: IconDesign, defaultValue: IconDesign.Default })
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
    property({ type: Object, defaultValue: undefined, noAttribute: true })
], Icon.prototype, "accData", void 0);
__decorate([
    property({ type: Boolean })
], Icon.prototype, "focused", void 0);
__decorate([
    property({ type: Boolean })
], Icon.prototype, "invalid", void 0);
__decorate([
    property({ noAttribute: true, defaultValue: undefined })
], Icon.prototype, "effectiveAccessibleName", void 0);
Icon = __decorate([
    customElement({
        tag: "ui5-icon",
        languageAware: true,
        themeAware: true,
        renderer: litRender,
        template: IconTemplate,
        styles: iconCss,
    })
    /**
     * Fired on mouseup, <code>SPACE</code> and <code>ENTER</code>.
     * - on mouse click, the icon fires native <code>click</code> event
     * - on <code>SPACE</code> and <code>ENTER</code>, the icon fires custom <code>click</code> event
     * @private
     * @since 1.0.0-rc.8
     */
    ,
    event("click")
], Icon);
Icon.define();
export default Icon;
//# sourceMappingURL=Icon.js.map