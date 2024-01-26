import { e as effectiveHtml, l, a as registerThemePropertiesLoader, c as styleData$1, d as styleData$2, p as property, f as customElement, U as UI5Element, m as getI18nBundle, n as litRender } from "./parameters-bundle.css-SwkfcYC-.js";
import { M as LABEL_COLON } from "./i18n-defaults-0fqsgv55.js";
var WrappingType;
(function(WrappingType2) {
  WrappingType2["None"] = "None";
  WrappingType2["Normal"] = "Normal";
})(WrappingType || (WrappingType = {}));
const WrappingType$1 = WrappingType;
function block0(context, tags, suffix) {
  return effectiveHtml`<label class="ui5-label-root" @click=${this._onclick}><span class="ui5-label-text-wrapper"><bdi id="${l(this._id)}-bdi"><slot></slot></bdi></span><span aria-hidden="true" class="ui5-label-required-colon" data-colon="${l(this._colonSymbol)}"></span></label>`;
}
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$1);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$2);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/Label.css.ts", content: `:host(:not([hidden])){display:inline-flex}:host{max-width:100%;color:var(--sapContent_LabelColor);font-family:"72override",var(--sapFontFamily);font-size:var(--sapFontSize);font-weight:400;cursor:text}.ui5-label-root{width:100%;cursor:inherit}:host([wrapping-type="Normal"]) .ui5-label-root{white-space:normal}:host(:not([wrapping-type="Normal"])) .ui5-label-root{display:inline-flex;white-space:nowrap}:host(:not([wrapping-type="Normal"])) .ui5-label-text-wrapper{text-overflow:ellipsis;overflow:hidden;display:inline-block;vertical-align:top;flex:0 1 auto;min-width:0}:host([show-colon]) .ui5-label-required-colon:before{content:attr(data-colon)}:host([required]) .ui5-label-required-colon:after{content:"*";color:var(--sapField_RequiredColor);font-size:1.25rem;font-weight:700;position:relative;font-style:normal;vertical-align:middle;line-height:0}:host([required][show-colon]) .ui5-label-required-colon:after{margin-inline-start:.125rem}bdi{padding-right:.075rem}:host([show-colon]) .ui5-label-required-colon{margin-inline-start:-.05rem;white-space:pre}
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
__decorate([
  property()
], Label.prototype, "for", void 0);
__decorate([
  property({ type: Boolean })
], Label.prototype, "showColon", void 0);
__decorate([
  property({ type: Boolean })
], Label.prototype, "required", void 0);
__decorate([
  property({ type: WrappingType$1, defaultValue: WrappingType$1.None })
], Label.prototype, "wrappingType", void 0);
Label = Label_1 = __decorate([
  customElement({
    tag: "ui5-label",
    renderer: litRender,
    template: block0,
    styles: styleData,
    languageAware: true
  })
], Label);
Label.define();
const Label$1 = Label;
export {
  Label$1 as L,
  WrappingType$1 as W
};
