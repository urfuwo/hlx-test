var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CheckBox_1;
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import "@ui5/webcomponents-icons/dist/accept.js";
import Icon from "./Icon.js";
import Label from "./Label.js";
import WrappingType from "./types/WrappingType.js";
import { VALUE_STATE_ERROR, VALUE_STATE_WARNING, VALUE_STATE_SUCCESS, } from "./generated/i18n/i18n-defaults.js";
// Styles
import checkboxCss from "./generated/themes/CheckBox.css.js";
// Template
import CheckBoxTemplate from "./generated/templates/CheckBoxTemplate.lit.js";
let isGlobalHandlerAttached = false;
let activeCb;
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * Allows the user to set a binary value, such as true/false or yes/no for an item.
 * <br><br>
 * The <code>ui5-checkbox</code> component consists of a box and a label that describes its purpose.
 * If it's checked, an indicator is displayed inside the box.
 * To check/uncheck the <code>ui5-checkbox</code>, the user has to click or tap the square
 * box or its label.
 * <br><br>
 * The <code>ui5-checkbox</code> component only has 2 states - checked and unchecked.
 * Clicking or tapping toggles the <code>ui5-checkbox</code> between checked and unchecked state.
 *
 * <h3>Usage</h3>
 *
 * You can define the checkbox text with via the <code>text</code> property. If the text exceeds the available width, it is truncated by default.
 * In case you prefer text to wrap, set the <code>wrappingType</code> property to "Normal".
 * The touchable area for toggling the <code>ui5-checkbox</code> ends where the text ends.
 * <br><br>
 * You can disable the <code>ui5-checkbox</code> by setting the <code>disabled</code> property to
 * <code>true</code>,
 * or use the <code>ui5-checkbox</code> in read-only mode by setting the <code>readonly</code>
 * property to <code>true</code>.
 *
 * <br><br>
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-checkbox</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>root - Used to style the outermost wrapper of the <code>ui5-checkbox</code></li>
 * <li>label - Used to style the label of the <code>ui5-checkbox</code></li>
 * </ul>
 *
 * <br><br>
 * <h3>Keyboard Handling</h3>
 *
 * The user can use the following keyboard shortcuts to toggle the checked state of the <code>ui5-checkbox</code>.
 * <ul>
 * <li>[SPACE, ENTER] - Toggles between different states: checked, not checked.</li>
 * </ul>
 * <br><br>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/CheckBox";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.CheckBox
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-checkbox
 * @public
 */
let CheckBox = CheckBox_1 = class CheckBox extends UI5Element {
    constructor() {
        super();
        this._deactivate = () => {
            if (activeCb) {
                activeCb.active = false;
            }
        };
        if (!isGlobalHandlerAttached) {
            document.addEventListener("mouseup", this._deactivate);
            isGlobalHandlerAttached = true;
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
        }
        else if (this.name) {
            console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
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
        activeCb = this; // eslint-disable-line
    }
    _onmouseup() {
        this.active = false;
    }
    _onfocusout() {
        this.active = false;
    }
    _onkeydown(e) {
        if (isSpace(e)) {
            e.preventDefault();
            this.active = true;
        }
        if (isEnter(e)) {
            this.toggle();
            this.active = true;
        }
    }
    _onkeyup(e) {
        if (isSpace(e)) {
            this.toggle();
        }
        this.active = false;
    }
    toggle() {
        if (this.canToggle()) {
            const lastState = {
                checked: this.checked,
                indeterminate: this.indeterminate,
            };
            if (this.indeterminate) {
                this.indeterminate = false;
                this.checked = true;
            }
            else {
                this.checked = !this.checked;
            }
            const changePrevented = !this.fireEvent("change", null, true);
            // Angular two way data binding
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
            "Success": CheckBox_1.i18nBundle.getText(VALUE_STATE_SUCCESS),
        };
    }
    get ariaLabelText() {
        return getEffectiveAriaLabelText(this);
    }
    get classes() {
        return {
            main: {
                "ui5-checkbox--hoverable": !this.disabled && !this.readonly && isDesktop(),
            },
        };
    }
    get ariaReadonly() {
        return this.readonly ? "true" : undefined;
    }
    get effectiveAriaDisabled() {
        return this.disabled ? "true" : undefined;
    }
    get effectiveAriaChecked() {
        return this.indeterminate && this.checked ? "mixed" : this.checked;
    }
    get ariaLabelledBy() {
        if (!this.ariaLabelText) {
            return this.text ? `${this._id}-label` : undefined;
        }
        return undefined;
    }
    get ariaDescribedBy() {
        return this.hasValueState ? `${this._id}-descr` : undefined;
    }
    get hasValueState() {
        return this.valueState !== ValueState.None;
    }
    get valueStateText() {
        if (this.valueState !== ValueState.None && this.valueState !== ValueState.Information) {
            return this.valueStateTextMappings()[this.valueState];
        }
    }
    get effectiveTabIndex() {
        const tabindex = this.getAttribute("tabindex");
        return this.disabled ? undefined : tabindex || "0";
    }
    get isCompletelyChecked() {
        return this.checked && !this.indeterminate;
    }
    static async onDefine() {
        CheckBox_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
};
__decorate([
    property()
], CheckBox.prototype, "accessibleNameRef", void 0);
__decorate([
    property()
], CheckBox.prototype, "accessibleName", void 0);
__decorate([
    property({ type: Boolean })
], CheckBox.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], CheckBox.prototype, "readonly", void 0);
__decorate([
    property({ type: Boolean })
], CheckBox.prototype, "required", void 0);
__decorate([
    property({ type: Boolean })
], CheckBox.prototype, "indeterminate", void 0);
__decorate([
    property({ type: Boolean })
], CheckBox.prototype, "checked", void 0);
__decorate([
    property()
], CheckBox.prototype, "text", void 0);
__decorate([
    property({ type: ValueState, defaultValue: ValueState.None })
], CheckBox.prototype, "valueState", void 0);
__decorate([
    property({ type: WrappingType, defaultValue: WrappingType.None })
], CheckBox.prototype, "wrappingType", void 0);
__decorate([
    property()
], CheckBox.prototype, "name", void 0);
__decorate([
    property({ type: Boolean })
], CheckBox.prototype, "active", void 0);
__decorate([
    slot()
], CheckBox.prototype, "formSupport", void 0);
CheckBox = CheckBox_1 = __decorate([
    customElement({
        tag: "ui5-checkbox",
        languageAware: true,
        renderer: litRender,
        template: CheckBoxTemplate,
        styles: checkboxCss,
        dependencies: [
            Label,
            Icon,
        ],
    })
    /**
     * Fired when the component checked state changes.
     *
     * @public
     * @event sap.ui.webc.main.CheckBox#change
     */
    ,
    event("change")
], CheckBox);
CheckBox.define();
export default CheckBox;
//# sourceMappingURL=CheckBox.js.map