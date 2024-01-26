import { e as effectiveHtml, l, s as scopeTag, a as registerThemePropertiesLoader, c as styleData$1, d as styleData$2, p as property, f as customElement, U as UI5Element, k as isPhone, G as isTablet, H as isCombi, h as getFeature, A as isSafari, E as isDesktop, m as getI18nBundle, n as litRender } from "./parameters-bundle.css-SwkfcYC-.js";
import { e as event, x as getIconAccessibleName, g as isSpace, j as isEnter, I as Icon } from "./entry-icon-6nxMzUd9.js";
import { s as slot, b as getEffectiveAriaLabelText } from "./AriaLabelHelper-C568z_QZ.js";
import { H as BUTTON_ARIA_TYPE_ACCEPT, J as BUTTON_ARIA_TYPE_REJECT, K as BUTTON_ARIA_TYPE_EMPHASIZED } from "./i18n-defaults-0fqsgv55.js";
const markedEvents = /* @__PURE__ */ new WeakMap();
const markEvent = (event2, value) => {
  markedEvents.set(event2, value);
};
const getEventMark = (event2) => {
  return markedEvents.get(event2);
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
function block0(context, tags, suffix) {
  return effectiveHtml`<button type="button" class="ui5-button-root" ?disabled="${this.disabled}" data-sap-focus-ref  @focusout=${this._onfocusout} @focusin=${this._onfocusin} @click=${this._onclick} @mousedown=${this._onmousedown} @mouseup=${this._onmouseup} @keydown=${this._onkeydown} @keyup=${this._onkeyup} @touchstart="${this._ontouchstart}" @touchend="${this._ontouchend}" tabindex=${l(this.tabIndexValue)} aria-expanded="${l(this.accessibilityAttributes.expanded)}" aria-controls="${l(this.accessibilityAttributes.controls)}" aria-haspopup="${l(this.accessibilityAttributes.hasPopup)}" aria-label="${l(this.ariaLabelText)}" title="${l(this.buttonTitle)}" part="button">${this.icon ? block1.call(this, context, tags, suffix) : void 0}<span id="${l(this._id)}-content" class="ui5-button-text"><bdi><slot></slot></bdi></span>${this.hasButtonType ? block2.call(this, context, tags, suffix) : void 0}</button> `;
}
function block1(context, tags, suffix) {
  return suffix ? effectiveHtml`<${scopeTag("ui5-icon", tags, suffix)} class="ui5-button-icon" name="${l(this.icon)}" accessible-role="${l(this.iconRole)}" part="icon" ?show-tooltip=${this.showIconTooltip}></${scopeTag("ui5-icon", tags, suffix)}>` : effectiveHtml`<ui5-icon class="ui5-button-icon" name="${l(this.icon)}" accessible-role="${l(this.iconRole)}" part="icon" ?show-tooltip=${this.showIconTooltip}></ui5-icon>`;
}
function block2(context, tags, suffix) {
  return effectiveHtml`<span class="ui5-hidden-text">${l(this.buttonTypeText)}</span>`;
}
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$1);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$2);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/Button.css.ts", content: `:host{vertical-align:middle}.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host(:not([hidden])){display:inline-block}:host{min-width:var(--_ui5-v1-21-2_button_base_min_width);height:var(--_ui5-v1-21-2_button_base_height);line-height:normal;font-family:var(--_ui5-v1-21-2_button_fontFamily);font-size:var(--sapFontSize);text-shadow:var(--_ui5-v1-21-2_button_text_shadow);border-radius:var(--_ui5-v1-21-2_button_border_radius);cursor:pointer;background-color:var(--sapButton_Background);border:var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);color:var(--sapButton_TextColor);box-sizing:border-box;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ui5-button-root{min-width:inherit;cursor:inherit;height:100%;width:100%;box-sizing:border-box;display:flex;justify-content:center;align-items:center;outline:none;padding:0 var(--_ui5-v1-21-2_button_base_padding);position:relative;background:transparent;border:none;color:inherit;text-shadow:inherit;font:inherit;white-space:inherit;overflow:inherit;text-overflow:inherit;letter-spacing:inherit;word-spacing:inherit;line-height:inherit;-webkit-user-select:none;-moz-user-select:none;user-select:none}:host(:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover),:host(:not([hidden]):not([disabled]).ui5_hovered){background:var(--sapButton_Hover_Background);border:1px solid var(--sapButton_Hover_BorderColor);color:var(--sapButton_Hover_TextColor)}.ui5-button-icon{color:inherit;flex-shrink:0}:host([icon-end]) .ui5-button-root{flex-direction:row-reverse}:host([icon-end]) .ui5-button-icon{margin-inline-start:var(--_ui5-v1-21-2_button_base_icon_margin)}:host([icon-only]) .ui5-button-root{min-width:auto;padding:0}:host([icon-only]) .ui5-button-text{display:none}.ui5-button-text{outline:none;position:relative;white-space:inherit;overflow:inherit;text-overflow:inherit}:host([has-icon]:not([icon-end])) .ui5-button-text{margin-inline-start:var(--_ui5-v1-21-2_button_base_icon_margin)}:host([has-icon][icon-end]) .ui5-button-text{margin-inline-start:0}:host([disabled]){opacity:var(--sapContent_DisabledOpacity);pointer-events:unset;cursor:default}:host([has-icon]:not([icon-only])) .ui5-button-text{min-width:calc(var(--_ui5-v1-21-2_button_base_min_width) - var(--_ui5-v1-21-2_button_base_icon_margin) - 1rem)}:host([disabled]:active){pointer-events:none}:host([focused]) .ui5-button-root:after{content:"";position:absolute;box-sizing:border-box;inset:.0625rem;border:var(--_ui5-v1-21-2_button_focused_border);border-radius:var(--_ui5-v1-21-2_button_focused_border_radius)}:host([design="Emphasized"][focused]) .ui5-button-root:after{border-color:var(--_ui5-v1-21-2_button_emphasized_focused_border_color)}:host([design="Emphasized"][focused]) .ui5-button-root:before{content:"";position:absolute;box-sizing:border-box;inset:.0625rem;border:var(--_ui5-v1-21-2_button_emphasized_focused_border_before);border-radius:var(--_ui5-v1-21-2_button_focused_border_radius)}.ui5-button-root::-moz-focus-inner{border:0}bdi{display:block;white-space:inherit;overflow:inherit;text-overflow:inherit}:host([ui5-button][active]:not([disabled]):not([non-interactive])){background-image:none;background-color:var(--sapButton_Active_Background);border-color:var(--sapButton_Active_BorderColor);color:var(--sapButton_Active_TextColor)}:host([design="Positive"]){background-color:var(--sapButton_Accept_Background);border-color:var(--sapButton_Accept_BorderColor);color:var(--sapButton_Accept_TextColor)}:host([design="Positive"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover),:host([design="Positive"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]).ui5_hovered){background-color:var(--sapButton_Accept_Hover_Background);border-color:var(--sapButton_Accept_Hover_BorderColor);color:var(--sapButton_Accept_Hover_TextColor)}:host([ui5-button][design="Positive"][active]:not([non-interactive])){background-color:var(--sapButton_Accept_Active_Background);border-color:var(--sapButton_Accept_Active_BorderColor);color:var(--sapButton_Accept_Active_TextColor)}:host([design="Negative"]){background-color:var(--sapButton_Reject_Background);border-color:var(--sapButton_Reject_BorderColor);color:var(--sapButton_Reject_TextColor)}:host([design="Negative"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover),:host([design="Negative"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]).ui5_hovered){background-color:var(--sapButton_Reject_Hover_Background);border-color:var(--sapButton_Reject_Hover_BorderColor);color:var(--sapButton_Reject_Hover_TextColor)}:host([ui5-button][design="Negative"][active]:not([non-interactive])){background-color:var(--sapButton_Reject_Active_Background);border-color:var(--sapButton_Reject_Active_BorderColor);color:var(--sapButton_Reject_Active_TextColor)}:host([design="Attention"]){background-color:var(--sapButton_Attention_Background);border-color:var(--sapButton_Attention_BorderColor);color:var(--sapButton_Attention_TextColor)}:host([design="Attention"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover),:host([design="Attention"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]).ui5_hovered){background-color:var(--sapButton_Attention_Hover_Background);border-color:var(--sapButton_Attention_Hover_BorderColor);color:var(--sapButton_Attention_Hover_TextColor)}:host([ui5-button][design="Attention"][active]:not([non-interactive])){background-color:var(--sapButton_Attention_Active_Background);border-color:var(--sapButton_Attention_Active_BorderColor);color:var(--sapButton_Attention_Active_TextColor)}:host([design="Emphasized"]){background-color:var(--sapButton_Emphasized_Background);border-color:var(--sapButton_Emphasized_BorderColor);border-width:var(--_ui5-v1-21-2_button_emphasized_border_width);color:var(--sapButton_Emphasized_TextColor);font-weight:var(--sapButton_Emphasized_FontWeight)}:host([design="Emphasized"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover),:host([design="Emphasized"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]).ui5_hovered){background-color:var(--sapButton_Emphasized_Hover_Background);border-color:var(--sapButton_Emphasized_Hover_BorderColor);border-width:var(--_ui5-v1-21-2_button_emphasized_border_width);color:var(--sapButton_Emphasized_Hover_TextColor)}:host([ui5-button][design="Empasized"][active]:not([non-interactive])){background-color:var(--sapButton_Emphasized_Active_Background);border-color:var(--sapButton_Emphasized_Active_BorderColor);color:var(--sapButton_Emphasized_Active_TextColor)}:host([design="Emphasized"][focused]) .ui5-button-root:after{border-color:var(--_ui5-v1-21-2_button_emphasized_focused_border_color);outline:none}:host([design="Emphasized"][focused][active]:not([non-interactive])) .ui5-button-root:after{border-color:var(--_ui5-v1-21-2_button_emphasized_focused_active_border_color)}:host([design="Transparent"]){background-color:var(--sapButton_Lite_Background);color:var(--sapButton_Lite_TextColor);border-color:var(--sapButton_Lite_BorderColor)}:host([design="Transparent"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover),:host([design="Transparent"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]).ui5_hovered){background-color:var(--sapButton_Lite_Hover_Background);border-color:var(--sapButton_Lite_Hover_BorderColor);color:var(--sapButton_Lite_Hover_TextColor)}:host([ui5-button][design="Transparent"][active]:not([non-interactive])){background-color:var(--sapButton_Lite_Active_Background);border-color:var(--sapButton_Lite_Active_BorderColor);color:var(--sapButton_Active_TextColor)}:host([ui5-segmented-button-item][active][focused]) .ui5-button-root:after,:host([pressed][focused]) .ui5-button-root:after{border-color:var(--_ui5-v1-21-2_button_pressed_focused_border_color);outline:none}:host([ui5-segmented-button-item][focused]:not(:last-child)) .ui5-button-root:after{border-top-right-radius:var(--_ui5-v1-21-2_button_focused_inner_border_radius);border-bottom-right-radius:var(--_ui5-v1-21-2_button_focused_inner_border_radius)}:host([ui5-segmented-button-item][focused]:not(:first-child)) .ui5-button-root:after{border-top-left-radius:var(--_ui5-v1-21-2_button_focused_inner_border_radius);border-bottom-left-radius:var(--_ui5-v1-21-2_button_focused_inner_border_radius)}
` };
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
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
    const handleTouchStartEvent = (e) => {
      markEvent(e, "button");
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
  _onclick(e) {
    var _a;
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
      (_a = this.getDomRef()) == null ? void 0 : _a.focus();
    }
  }
  _onmousedown(e) {
    if (this.nonInteractive || this._isTouch) {
      return;
    }
    markEvent(e, "button");
    this._setActiveState(true);
    activeButton = this;
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
    template: block0,
    styles: styleData,
    dependencies: [Icon]
  }),
  event("click"),
  event("_active-state-change")
], Button);
Button.define();
const Button$1 = Button;
export {
  Button$1 as B,
  getEventMark as g,
  markEvent as m
};
