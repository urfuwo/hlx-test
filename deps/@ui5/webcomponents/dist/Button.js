var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Button_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { markEvent } from "@ui5/webcomponents-base/dist/MarkedEvents.js";
import { getIconAccessibleName } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { isPhone, isTablet, isCombi, isDesktop, isSafari, } from "@ui5/webcomponents-base/dist/Device.js";
import willShowContent from "@ui5/webcomponents-base/dist/util/willShowContent.js";
import ButtonDesign from "./types/ButtonDesign.js";
import ButtonType from "./types/ButtonType.js";
import ButtonTemplate from "./generated/templates/ButtonTemplate.lit.js";
import Icon from "./Icon.js";
import { BUTTON_ARIA_TYPE_ACCEPT, BUTTON_ARIA_TYPE_REJECT, BUTTON_ARIA_TYPE_EMPHASIZED } from "./generated/i18n/i18n-defaults.js";
// Styles
import buttonCss from "./generated/themes/Button.css.js";
let isGlobalHandlerAttached = false;
let activeButton = null;
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-button</code> component represents a simple push button.
 * It enables users to trigger actions by clicking or tapping the <code>ui5-button</code>, or by pressing
 * certain keyboard keys, such as Enter.
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-button</code> UI, you can define text, icon, or both. You can also specify
 * whether the text or the icon is displayed first.
 * <br><br>
 * You can choose from a set of predefined types that offer different
 * styling to correspond to the triggered action.
 * <br><br>
 * You can set the <code>ui5-button</code> as enabled or disabled. An enabled
 * <code>ui5-button</code> can be pressed by clicking or tapping it. The button changes
 * its style to provide visual feedback to the user that it is pressed or hovered over with
 * the mouse cursor. A disabled <code>ui5-button</code> appears inactive and cannot be pressed.
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-button</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>button - Used to style the native button element</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Button";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Button
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-button
 * @implements sap.ui.webc.main.IButton
 * @public
 */
let Button = Button_1 = class Button extends UI5Element {
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
        const handleTouchStartEvent = (e) => {
            markEvent(e, "button");
            if (this.nonInteractive) {
                return;
            }
            this._setActiveState(true);
        };
        this._ontouchstart = {
            handleEvent: handleTouchStartEvent,
            passive: true,
        };
    }
    onEnterDOM() {
        this._isTouch = (isPhone() || isTablet()) && !isCombi();
    }
    async onBeforeRendering() {
        const formSupport = getFeature("FormSupport");
        if (this.type !== ButtonType.Button && !formSupport) {
            console.warn(`In order for the "type" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
        }
        if (this.submits && !formSupport) {
            console.warn(`In order for the "submits" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
        }
        this.iconOnly = this.isIconOnly;
        this.hasIcon = !!this.icon;
        this.buttonTitle = this.tooltip || await getIconAccessibleName(this.icon);
    }
    _onclick(e) {
        if (this.nonInteractive) {
            return;
        }
        markEvent(e, "button");
        const formSupport = getFeature("FormSupport");
        if (formSupport && this._isSubmit) {
            formSupport.triggerFormSubmit(this);
        }
        if (formSupport && this._isReset) {
            formSupport.triggerFormReset(this);
        }
        if (isSafari()) {
            this.getDomRef()?.focus();
        }
    }
    _onmousedown(e) {
        if (this.nonInteractive || this._isTouch) {
            return;
        }
        markEvent(e, "button");
        this._setActiveState(true);
        activeButton = this; // eslint-disable-line
    }
    _ontouchend(e) {
        if (this.disabled) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (this.active) {
            this._setActiveState(false);
        }
        if (activeButton) {
            activeButton._setActiveState(false);
        }
    }
    _onmouseup(e) {
        markEvent(e, "button");
    }
    _onkeydown(e) {
        markEvent(e, "button");
        if (isSpace(e) || isEnter(e)) {
            this._setActiveState(true);
        }
    }
    _onkeyup(e) {
        if (isSpace(e) || isEnter(e)) {
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
    _onfocusin(e) {
        if (this.nonInteractive) {
            return;
        }
        markEvent(e, "button");
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
        return this.design !== ButtonDesign.Default && this.design !== ButtonDesign.Transparent;
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
            "Emphasized": BUTTON_ARIA_TYPE_EMPHASIZED,
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
        return this.type === ButtonType.Submit || this.submits;
    }
    get _isReset() {
        return this.type === ButtonType.Reset;
    }
    static async onDefine() {
        Button_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
};
__decorate([
    property({ type: ButtonDesign, defaultValue: ButtonDesign.Default })
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
    property({ defaultValue: undefined })
], Button.prototype, "accessibleName", void 0);
__decorate([
    property({ defaultValue: "" })
], Button.prototype, "accessibleNameRef", void 0);
__decorate([
    property({ type: Object })
], Button.prototype, "accessibilityAttributes", void 0);
__decorate([
    property({ type: ButtonType, defaultValue: ButtonType.Button })
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
        template: ButtonTemplate,
        styles: buttonCss,
        dependencies: [Icon],
    })
    /**
     * Fired when the component is activated either with a
     * mouse/tap or by using the Enter or Space key.
     * <br><br>
     * <b>Note:</b> The event will not be fired if the <code>disabled</code>
     * property is set to <code>true</code>.
     *
     * @event sap.ui.webc.main.Button#click
     * @public
     * @native
     */
    ,
    event("click")
    /**
     * Fired whenever the active state of the component changes.
     * @private
     */
    ,
    event("_active-state-change")
], Button);
Button.define();
export default Button;
//# sourceMappingURL=Button.js.map