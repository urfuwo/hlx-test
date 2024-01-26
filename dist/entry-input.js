import { x, b, r as registerFeature, i as isLegacyThemeFamily, e as effectiveHtml, l as l$1, o as o$1, s as scopeTag, a as registerThemePropertiesLoader, c as styleData$4, d as styleData$5, p as property, f as customElement, U as UI5Element, g as getScopedVarName, h as getFeature, j as isAndroid, k as isPhone, m as getI18nBundle, n as litRender } from "./parameters-bundle.css-SwkfcYC-.js";
import { s as slot, r as registerUI5Element, d as deregisterUI5Element, g as getAssociatedLabelForTexts, a as getAllAccessibleNameRefTexts } from "./AriaLabelHelper-C568z_QZ.js";
import { r as registerIcon, c, e as event, i as isBackSpace, a as isDelete, b as isEscape, d as isUp, f as isDown, g as isSpace, h as isTabNext, j as isEnter, k as isPageUp, l as isPageDown, m as isHome, n as isEnd, I as Icon } from "./entry-icon-6nxMzUd9.js";
import { s as styleMap, o as o$2, V as ValueState, R as ResizeHandler, g as getActiveElement, I as Integer, P as Popover } from "./Popover-cpOKHOlO.js";
import { V as VALUE_STATE_TYPE_SUCCESS, a as VALUE_STATE_TYPE_INFORMATION, b as VALUE_STATE_TYPE_ERROR, c as VALUE_STATE_TYPE_WARNING, d as VALUE_STATE_SUCCESS, e as VALUE_STATE_INFORMATION, f as VALUE_STATE_ERROR, g as VALUE_STATE_WARNING, I as INPUT_SUGGESTIONS_TITLE, h as INPUT_CLEAR_ICON_ACC_NAME, i as INPUT_SUGGESTIONS, j as INPUT_SUGGESTIONS_MORE_HITS, k as INPUT_SUGGESTIONS_ONE_HIT, l as INPUT_SUGGESTIONS_NO_HIT } from "./i18n-defaults-0fqsgv55.js";
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e = Symbol.for(""), l = (t) => {
  if ((null == t ? void 0 : t.r) === e)
    return null == t ? void 0 : t._$litStatic$;
}, o = (t) => ({ _$litStatic$: t, r: e }), s = /* @__PURE__ */ new Map(), a = (t) => (r, ...e2) => {
  const o2 = e2.length;
  let i, a2;
  const n2 = [], u2 = [];
  let c2, $ = 0, f = false;
  for (; $ < o2; ) {
    for (c2 = r[$]; $ < o2 && void 0 !== (a2 = e2[$], i = l(a2)); )
      c2 += i + r[++$], f = true;
    $ !== o2 && u2.push(a2), n2.push(c2), $++;
  }
  if ($ === o2 && n2.push(r[o2]), f) {
    const t2 = n2.join("$$lit$$");
    void 0 === (r = s.get(t2)) && (n2.raw = n2, s.set(t2, r = n2)), e2 = u2;
  }
  return t(r, ...e2);
}, n = a(x), u = a(b);
class LitStatic {
}
LitStatic.html = n;
LitStatic.svg = u;
LitStatic.unsafeStatic = o;
registerFeature("LitStatic", LitStatic);
const getCaretPosition = (field) => {
  let caretPos = 0;
  if (field.selectionStart || field.selectionStart === 0) {
    caretPos = field.selectionDirection === "backward" ? field.selectionStart : field.selectionEnd;
  }
  return caretPos;
};
const setCaretPosition = (field, caretPos) => {
  if (field.selectionStart) {
    field.focus();
    field.setSelectionRange(caretPos, caretPos);
  } else {
    field.focus();
  }
};
const name$1 = "not-editable";
const pathData$1 = "M443 104q5 7 5 12 0 6-5 11L118 453q-4 4-8 4L0 480l22-110q0-5 4-9L352 36q4-4 11-4t11 4zm-121 99l-46-45L52 381l46 46zm87-88l-46-44-64 64 45 45zm71 204l-63 64-65-64-33 32 66 63-66 66 33 32 65-66 63 66 32-32-66-66 66-63z";
const ltr$1 = false;
const collection$1 = "SAP-icons-v4";
const packageName$1 = "@ui5/webcomponents-icons";
registerIcon(name$1, { pathData: pathData$1, ltr: ltr$1, collection: collection$1, packageName: packageName$1 });
const name = "not-editable";
const pathData = "M504 94q7 7 7 18t-7 18L130 505q-9 7-18 7H26q-11 0-18.5-7.5T0 486v-86q0-10 8-18L381 7q9-7 18-7 11 0 18 7zm-55 18l-50-50-50 50 50 50zm-86 86l-50-50L62 400l50 50zm142 270q7 7 7 18t-7.5 18.5T486 512t-18-7l-37-38-38 38q-7 7-18 7t-18.5-7.5T349 486q0-10 8-18l38-37-38-38q-8-8-8-18 0-11 7.5-18.5T375 349q10 0 18 8l38 37 37-37q8-8 18-8 11 0 18.5 7.5T512 375t-7 18l-38 38z";
const ltr = false;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";
registerIcon(name, { pathData, ltr, collection, packageName });
isLegacyThemeFamily() ? pathData$1 : pathData;
var InputType;
(function(InputType2) {
  InputType2["Text"] = "Text";
  InputType2["Email"] = "Email";
  InputType2["Number"] = "Number";
  InputType2["Password"] = "Password";
  InputType2["Tel"] = "Tel";
  InputType2["URL"] = "URL";
})(InputType || (InputType = {}));
const InputType$1 = InputType;
function block0$1(context, tags, suffix) {
  return effectiveHtml`<div class="ui5-input-root ui5-input-focusable-element" @focusin="${this._onfocusin}" @focusout="${this._onfocusout}"><div class="ui5-input-content"><input id="${l$1(this._id)}-inner" class="ui5-input-inner" style="${styleMap(this.styles.innerInput)}" type="${l$1(this.inputType)}" inner-input ?inner-input-with-icon="${this.icon.length}" ?disabled="${this.disabled}" ?readonly="${this._readonly}" .value="${l$1(this._innerValue)}" placeholder="${l$1(this._placeholder)}" maxlength="${l$1(this.maxlength)}" role="${l$1(this.accInfo.input.role)}" aria-controls="${l$1(this.accInfo.input.ariaControls)}" aria-invalid="${l$1(this.accInfo.input.ariaInvalid)}" aria-haspopup="${l$1(this.accInfo.input.ariaHasPopup)}" aria-describedby="${l$1(this.accInfo.input.ariaDescribedBy)}" aria-roledescription="${l$1(this.accInfo.input.ariaRoledescription)}" aria-autocomplete="${l$1(this.accInfo.input.ariaAutoComplete)}" aria-expanded="${l$1(this.accInfo.input.ariaExpanded)}" aria-label="${l$1(this.accInfo.input.ariaLabel)}" aria-required="${l$1(this.required)}" @input="${this._handleInput}" @change="${this._handleChange}" @keydown="${this._onkeydown}" @keyup="${this._onkeyup}" @click=${this._click} @focusin=${this.innerFocusIn} data-sap-focus-ref step="${l$1(this.nativeInputAttributes.step)}" min="${l$1(this.nativeInputAttributes.min)}" max="${l$1(this.nativeInputAttributes.max)}" />${this.effectiveShowClearIcon ? block1$1.call(this, context, tags, suffix) : void 0}${this.icon.length ? block2$1.call(this, context, tags, suffix) : void 0}<div class="ui5-input-value-state-icon">${o$1(this._valueStateInputIcon)}</div>${this.showSuggestions ? block3$1.call(this, context, tags, suffix) : void 0}${this.accInfo.input.ariaDescription ? block4$1.call(this, context, tags, suffix) : void 0}${this.hasValueState ? block5$1.call(this, context, tags, suffix) : void 0}</div><slot name="formSupport"></slot></div>`;
}
function block1$1(context, tags, suffix) {
  return suffix ? effectiveHtml`<div @click=${this._clear} @mousedown=${this._iconMouseDown} class="ui5-input-clear-icon-wrapper" input-icon tabindex="-1"><${scopeTag("ui5-icon", tags, suffix)} tabindex="-1" class="ui5-input-clear-icon" name="decline" accessible-name="${l$1(this.clearIconAccessibleName)}"></${scopeTag("ui5-icon", tags, suffix)}></div>` : effectiveHtml`<div @click=${this._clear} @mousedown=${this._iconMouseDown} class="ui5-input-clear-icon-wrapper" input-icon tabindex="-1"><ui5-icon tabindex="-1" class="ui5-input-clear-icon" name="decline" accessible-name="${l$1(this.clearIconAccessibleName)}"></ui5-icon></div>`;
}
function block2$1(context, tags, suffix) {
  return effectiveHtml`<div class="ui5-input-icon-root"><slot name="icon"></slot></div>`;
}
function block3$1(context, tags, suffix) {
  return effectiveHtml`<span id="${l$1(this._id)}-suggestionsText" class="ui5-hidden-text">${l$1(this.suggestionsText)}</span><span id="${l$1(this._id)}-selectionText" class="ui5-hidden-text" aria-live="polite" role="status"></span><span id="${l$1(this._id)}-suggestionsCount" class="ui5-hidden-text" aria-live="polite">${l$1(this.availableSuggestionsCount)}</span>`;
}
function block4$1(context, tags, suffix) {
  return effectiveHtml`<span id="${l$1(this._id)}-descr" class="ui5-hidden-text">${l$1(this.accInfo.input.ariaDescription)}</span>`;
}
function block5$1(context, tags, suffix) {
  return effectiveHtml`<span id="${l$1(this._id)}-valueStateDesc" class="ui5-hidden-text">${l$1(this.ariaValueStateHiddenText)}</span>`;
}
function block0(context, tags, suffix) {
  return effectiveHtml`${this.showSuggestions ? block1.call(this, context, tags, suffix) : void 0}${this.hasValueStateMessage ? block17.call(this, context, tags, suffix) : void 0} `;
}
function block1(context, tags, suffix) {
  return suffix ? effectiveHtml`<${scopeTag("ui5-responsive-popover", tags, suffix)} class="${o$2(this.classes.popover)}" hide-arrow _disable-initial-focus placement-type="Bottom" horizontal-align="Left" style="${styleMap(this.styles.suggestionsPopover)}" @ui5-after-open="${l$1(this._afterOpenPopover)}" @ui5-after-close="${l$1(this._afterClosePopover)}" @ui5-scroll="${l$1(this._scroll)}">${this._isPhone ? block2.call(this, context, tags, suffix) : void 0}${!this._isPhone ? block7.call(this, context, tags, suffix) : void 0}<${scopeTag("ui5-list", tags, suffix)} separators="${l$1(this.suggestionSeparators)}" @mousedown="${this.onItemMouseDown}" mode="SingleSelect">${c(this.suggestionObjects, (item, index) => item._id || index, (item, index) => block12.call(this, context, tags, suffix, item, index))}</${scopeTag("ui5-list", tags, suffix)}>${this._isPhone ? block16.call(this, context, tags, suffix) : void 0}</${scopeTag("ui5-responsive-popover", tags, suffix)}>` : effectiveHtml`<ui5-responsive-popover class="${o$2(this.classes.popover)}" hide-arrow _disable-initial-focus placement-type="Bottom" horizontal-align="Left" style="${styleMap(this.styles.suggestionsPopover)}" @ui5-after-open="${l$1(this._afterOpenPopover)}" @ui5-after-close="${l$1(this._afterClosePopover)}" @ui5-scroll="${l$1(this._scroll)}">${this._isPhone ? block2.call(this, context, tags, suffix) : void 0}${!this._isPhone ? block7.call(this, context, tags, suffix) : void 0}<ui5-list separators="${l$1(this.suggestionSeparators)}" @mousedown="${this.onItemMouseDown}" mode="SingleSelect">${c(this.suggestionObjects, (item, index) => item._id || index, (item, index) => block12.call(this, context, tags, suffix, item, index))}</ui5-list>${this._isPhone ? block16.call(this, context, tags, suffix) : void 0}</ui5-responsive-popover>`;
}
function block2(context, tags, suffix) {
  return suffix ? effectiveHtml`<div slot="header" class="ui5-responsive-popover-header"><div class="row"><span>${l$1(this._headerTitleText)}</span><${scopeTag("ui5-button", tags, suffix)} class="ui5-responsive-popover-close-btn" icon="decline" design="Transparent" @click="${this._closeRespPopover}"></${scopeTag("ui5-button", tags, suffix)}></div><div class="row"><div class="input-root-phone native-input-wrapper"><${scopeTag("ui5-input", tags, suffix)} class="ui5-input-inner-phone" type="${l$1(this.inputType)}" .value="${l$1(this.value)}" ?show-clear-icon=${this.showClearIcon} placeholder="${l$1(this.placeholder)}" @ui5-input="${l$1(this._handleInput)}" @ui5-change="${l$1(this._handleChange)}"></${scopeTag("ui5-input", tags, suffix)}></div></div></div>${this.hasValueStateMessage ? block3.call(this, context, tags, suffix) : void 0}` : effectiveHtml`<div slot="header" class="ui5-responsive-popover-header"><div class="row"><span>${l$1(this._headerTitleText)}</span><ui5-button class="ui5-responsive-popover-close-btn" icon="decline" design="Transparent" @click="${this._closeRespPopover}"></ui5-button></div><div class="row"><div class="input-root-phone native-input-wrapper"><ui5-input class="ui5-input-inner-phone" type="${l$1(this.inputType)}" .value="${l$1(this.value)}" ?show-clear-icon=${this.showClearIcon} placeholder="${l$1(this.placeholder)}" @ui5-input="${l$1(this._handleInput)}" @ui5-change="${l$1(this._handleChange)}"></ui5-input></div></div></div>${this.hasValueStateMessage ? block3.call(this, context, tags, suffix) : void 0}`;
}
function block3(context, tags, suffix) {
  return suffix ? effectiveHtml`<div class="${o$2(this.classes.popoverValueState)}" style="${styleMap(this.styles.suggestionPopoverHeader)}"><${scopeTag("ui5-icon", tags, suffix)} class="ui5-input-value-state-message-icon" name="${l$1(this._valueStateMessageInputIcon)}"></${scopeTag("ui5-icon", tags, suffix)}>${this.shouldDisplayDefaultValueStateMessage ? block4.call(this, context, tags, suffix) : block5.call(this, context, tags, suffix)}</div>` : effectiveHtml`<div class="${o$2(this.classes.popoverValueState)}" style="${styleMap(this.styles.suggestionPopoverHeader)}"><ui5-icon class="ui5-input-value-state-message-icon" name="${l$1(this._valueStateMessageInputIcon)}"></ui5-icon>${this.shouldDisplayDefaultValueStateMessage ? block4.call(this, context, tags, suffix) : block5.call(this, context, tags, suffix)}</div>`;
}
function block4(context, tags, suffix) {
  return effectiveHtml`${l$1(this.valueStateText)}`;
}
function block5(context, tags, suffix) {
  return effectiveHtml`${c(this.valueStateMessageText, (item, index) => item._id || index, (item, index) => block6.call(this, context, tags, suffix, item, index))}`;
}
function block6(context, tags, suffix, item, index) {
  return effectiveHtml`${l$1(item)}`;
}
function block7(context, tags, suffix) {
  return effectiveHtml`${this.hasValueStateMessage ? block8.call(this, context, tags, suffix) : void 0}`;
}
function block8(context, tags, suffix) {
  return suffix ? effectiveHtml`<div slot="header" ?focused=${this._isValueStateFocused} class="ui5-responsive-popover-header ${o$2(this.classes.popoverValueState)}" style=${styleMap(this.styles.suggestionPopoverHeader)}><${scopeTag("ui5-icon", tags, suffix)} class="ui5-input-value-state-message-icon" name="${l$1(this._valueStateMessageInputIcon)}"></${scopeTag("ui5-icon", tags, suffix)}>${this.shouldDisplayDefaultValueStateMessage ? block9.call(this, context, tags, suffix) : block10.call(this, context, tags, suffix)}</div>` : effectiveHtml`<div slot="header" ?focused=${this._isValueStateFocused} class="ui5-responsive-popover-header ${o$2(this.classes.popoverValueState)}" style=${styleMap(this.styles.suggestionPopoverHeader)}><ui5-icon class="ui5-input-value-state-message-icon" name="${l$1(this._valueStateMessageInputIcon)}"></ui5-icon>${this.shouldDisplayDefaultValueStateMessage ? block9.call(this, context, tags, suffix) : block10.call(this, context, tags, suffix)}</div>`;
}
function block9(context, tags, suffix) {
  return effectiveHtml`${l$1(this.valueStateText)}`;
}
function block10(context, tags, suffix) {
  return effectiveHtml`${c(this.valueStateMessageText, (item, index) => item._id || index, (item, index) => block11.call(this, context, tags, suffix, item, index))}`;
}
function block11(context, tags, suffix, item, index) {
  return effectiveHtml`${l$1(item)}`;
}
function block12(context, tags, suffix, item, index) {
  return effectiveHtml`${item.groupItem ? block13.call(this, context, tags, suffix, item, index) : block14.call(this, context, tags, suffix, item, index)}`;
}
function block13(context, tags, suffix, item, index) {
  return suffix ? effectiveHtml`<${scopeTag("ui5-li-groupheader", tags, suffix)} data-ui5-key="${l$1(item.key)}">${o$1(item.text)}</${scopeTag("ui5-li-groupheader", tags, suffix)}>` : effectiveHtml`<ui5-li-groupheader data-ui5-key="${l$1(item.key)}">${o$1(item.text)}</ui5-li-groupheader>`;
}
function block14(context, tags, suffix, item, index) {
  return suffix ? effectiveHtml`<${scopeTag("ui5-li-suggestion-item", tags, suffix)} wrapping-type="Normal" image="${l$1(item.image)}" icon="${l$1(item.icon)}" additional-text="${l$1(item.additionalText)}" type="${l$1(item.type)}" additional-text-state="${l$1(item.additionalTextState)}" data-ui5-key="${l$1(item.key)}">${o$1(item.text)}${item.description ? block15.call(this, context, tags, suffix, item, index) : void 0}</${scopeTag("ui5-li-suggestion-item", tags, suffix)}>` : effectiveHtml`<ui5-li-suggestion-item wrapping-type="Normal" image="${l$1(item.image)}" icon="${l$1(item.icon)}" additional-text="${l$1(item.additionalText)}" type="${l$1(item.type)}" additional-text-state="${l$1(item.additionalTextState)}" data-ui5-key="${l$1(item.key)}">${o$1(item.text)}${item.description ? block15.call(this, context, tags, suffix, item, index) : void 0}</ui5-li-suggestion-item>`;
}
function block15(context, tags, suffix, item, index) {
  return effectiveHtml`<span slot="richDescription">${o$1(item.description)}</span>`;
}
function block16(context, tags, suffix) {
  return suffix ? effectiveHtml`<div slot="footer" class="ui5-responsive-popover-footer"><${scopeTag("ui5-button", tags, suffix)} design="Transparent" @click="${this._closeRespPopover}">OK</${scopeTag("ui5-button", tags, suffix)}></div>` : effectiveHtml`<div slot="footer" class="ui5-responsive-popover-footer"><ui5-button design="Transparent" @click="${this._closeRespPopover}">OK</ui5-button></div>`;
}
function block17(context, tags, suffix) {
  return suffix ? effectiveHtml`<${scopeTag("ui5-popover", tags, suffix)} skip-registry-update _disable-initial-focus prevent-focus-restore hide-arrow class="ui5-valuestatemessage-popover" placement-type="Bottom" horizontal-align="${l$1(this._valueStatePopoverHorizontalAlign)}"><div slot="header" class="${o$2(this.classes.popoverValueState)}" style="${styleMap(this.styles.popoverHeader)}"><${scopeTag("ui5-icon", tags, suffix)} class="ui5-input-value-state-message-icon" name="${l$1(this._valueStateMessageInputIcon)}"></${scopeTag("ui5-icon", tags, suffix)}>${this.shouldDisplayDefaultValueStateMessage ? block18.call(this, context, tags, suffix) : block19.call(this, context, tags, suffix)}</div></${scopeTag("ui5-popover", tags, suffix)}>` : effectiveHtml`<ui5-popover skip-registry-update _disable-initial-focus prevent-focus-restore hide-arrow class="ui5-valuestatemessage-popover" placement-type="Bottom" horizontal-align="${l$1(this._valueStatePopoverHorizontalAlign)}"><div slot="header" class="${o$2(this.classes.popoverValueState)}" style="${styleMap(this.styles.popoverHeader)}"><ui5-icon class="ui5-input-value-state-message-icon" name="${l$1(this._valueStateMessageInputIcon)}"></ui5-icon>${this.shouldDisplayDefaultValueStateMessage ? block18.call(this, context, tags, suffix) : block19.call(this, context, tags, suffix)}</div></ui5-popover>`;
}
function block18(context, tags, suffix) {
  return effectiveHtml`${l$1(this.valueStateText)}`;
}
function block19(context, tags, suffix) {
  return effectiveHtml`${c(this.valueStateMessageText, (item, index) => item._id || index, (item, index) => block20.call(this, context, tags, suffix, item, index))}`;
}
function block20(context, tags, suffix, item, index) {
  return effectiveHtml`${l$1(item)}`;
}
const StartsWith = (value, items, propName) => items.filter((item) => item[propName].toLowerCase().startsWith(value.toLowerCase()));
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$4);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$5);
const styleData$3 = { packageName: "@ui5/webcomponents", fileName: "themes/Input.css.ts", content: `:host{vertical-align:middle}.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}[input-icon]{color:var(--_ui5-v1-21-2_input_icon_color);cursor:pointer;outline:none;padding:var(--_ui5-v1-21-2_input_icon_padding);border-inline-start:var(--_ui5-v1-21-2_input_icon_border);min-width:1rem;min-height:1rem;border-radius:var(--_ui5-v1-21-2_input_icon_border_radius)}[input-icon][pressed]{background:var(--_ui5-v1-21-2_input_icon_pressed_bg);box-shadow:var(--_ui5-v1-21-2_input_icon_box_shadow);border-inline-start:var(--_ui5-v1-21-2_select_hover_icon_left_border);color:var(--_ui5-v1-21-2_input_icon_pressed_color)}[input-icon]:active{background-color:var(--sapButton_Active_Background);box-shadow:var(--_ui5-v1-21-2_input_icon_box_shadow);border-inline-start:var(--_ui5-v1-21-2_select_hover_icon_left_border);color:var(--_ui5-v1-21-2_input_icon_pressed_color)}[input-icon]:not([pressed]):not(:active):hover{background:var(--_ui5-v1-21-2_input_icon_hover_bg);box-shadow:var(--_ui5-v1-21-2_input_icon_box_shadow)}[input-icon]:hover{border-inline-start:var(--_ui5-v1-21-2_select_hover_icon_left_border);box-shadow:var(--_ui5-v1-21-2_input_icon_box_shadow)}:host(:not([hidden])){display:inline-block}:host{width:var(--_ui5-v1-21-2_input_width);min-width:calc(var(--_ui5-v1-21-2_input_min_width) + (var(--_ui5-v1-21-2-input-icons-count)*var(--_ui5-v1-21-2_input_icon_width)));margin:var(--_ui5-v1-21-2_input_margin_top_bottom) 0;height:var(--_ui5-v1-21-2_input_height);color:var(--sapField_TextColor);font-size:var(--sapFontSize);font-family:"72override",var(--sapFontFamily);font-style:normal;border:var(--_ui5-v1-21-2-input-border);border-radius:var(--_ui5-v1-21-2_input_border_radius);box-sizing:border-box;text-align:start;transition:var(--_ui5-v1-21-2_input_transition);background:var(--sapField_BackgroundStyle);background-color:var(--_ui5-v1-21-2_input_background_color)}:host(:not([readonly])),:host([readonly][disabled]){box-shadow:var(--sapField_Shadow)}:host([focused]:not([opened])){border-color:var(--_ui5-v1-21-2_input_focused_border_color);background-color:var(--sapField_Focus_Background)}.ui5-input-focusable-element{position:relative}:host([focused]:not([opened])) .ui5-input-focusable-element:after{content:var(--ui5-v1-21-2_input_focus_pseudo_element_content);position:absolute;pointer-events:none;z-index:2;border:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--_ui5-v1-21-2_input_focus_outline_color);border-radius:var(--_ui5-v1-21-2_input_focus_border_radius);top:var(--_ui5-v1-21-2_input_focus_offset);bottom:var(--_ui5-v1-21-2_input_focus_offset);left:var(--_ui5-v1-21-2_input_focus_offset);right:var(--_ui5-v1-21-2_input_focus_offset)}:host([focused][readonly]:not([opened])) .ui5-input-focusable-element:after{top:var(--_ui5-v1-21-2_input_readonly_focus_offset);bottom:var(--_ui5-v1-21-2_input_readonly_focus_offset);left:var(--_ui5-v1-21-2_input_readonly_focus_offset);right:var(--_ui5-v1-21-2_input_readonly_focus_offset);border-radius:var(--_ui5-v1-21-2_input_readonly_focus_border_radius)}.ui5-input-root:before{content:"";position:absolute;width:calc(100% - 2px);left:1px;bottom:-2px;border-bottom-left-radius:8px;border-bottom-right-radius:8px;height:var(--_ui5-v1-21-2_input_bottom_border_height);transition:var(--_ui5-v1-21-2_input_transition);background-color:var(--_ui5-v1-21-2_input_bottom_border_color)}.ui5-input-root{width:100%;height:100%;position:relative;background:transparent;display:inline-block;outline:none;box-sizing:border-box;color:inherit;transition:border-color .2s ease-in-out;border-radius:var(--_ui5-v1-21-2_input_border_radius);overflow:hidden}:host([disabled]){opacity:var(--_ui5-v1-21-2_input_disabled_opacity);cursor:default;pointer-events:none;background-color:var(--_ui5-v1-21-2-input_disabled_background);border-color:var(--_ui5-v1-21-2_input_disabled_border_color)}:host([disabled]) .ui5-input-root:before,:host([readonly]) .ui5-input-root:before{content:none}[inner-input]{background:transparent;color:inherit;border:none;font-style:inherit;-webkit-appearance:none;-moz-appearance:textfield;padding:var(--_ui5-v1-21-2_input_inner_padding);box-sizing:border-box;min-width:var(--_ui5-v1-21-2_input_min_width);width:100%;text-overflow:ellipsis;flex:1;outline:none;font-size:inherit;font-family:inherit;line-height:inherit;letter-spacing:inherit;word-spacing:inherit;text-align:inherit}[inner-input][inner-input-with-icon]{padding:var(--_ui5-v1-21-2_input_inner_padding_with_icon)}.ui5-input-value-state-icon{height:100%;display:var(--_ui5-v1-21-2-input-value-state-icon-display);align-items:center}.ui5-input-value-state-icon>svg{margin-right:8px}[inner-input]::selection{background:var(--sapSelectedColor);color:var(--sapContent_ContrastTextColor)}:host([disabled]) [inner-input]::-webkit-input-placeholder{visibility:hidden}:host([readonly]) [inner-input]::-webkit-input-placeholder{visibility:hidden}:host([disabled]) [inner-input]::-moz-placeholder{visibility:hidden}:host([readonly]) [inner-input]::-moz-placeholder{visibility:hidden}[inner-input]::-webkit-input-placeholder{font-weight:400;font-style:var(--_ui5-v1-21-2_input_placeholder_style);color:var(--_ui5-v1-21-2_input_placeholder_color);padding-right:.125rem}[inner-input]::-moz-placeholder{font-weight:400;font-style:var(--_ui5-v1-21-2_input_placeholder_style);color:var(--_ui5-v1-21-2_input_placeholder_color);padding-right:.125rem}:host([value-state="Error"]) [inner-input]::-webkit-input-placeholder{color:var(--_ui5-v1-21-2-input_error_placeholder_color);font-weight:var(--_ui5-v1-21-2_input_value_state_error_warning_placeholder_font_weight)}:host([value-state="Error"]) [inner-input]::-moz-placeholder{color:var(--_ui5-v1-21-2-input_error_placeholder_color);font-weight:var(--_ui5-v1-21-2_input_value_state_error_warning_placeholder_font_weight)}:host([value-state="Warning"]) [inner-input]::-webkit-input-placeholder{font-weight:var(--_ui5-v1-21-2_input_value_state_error_warning_placeholder_font_weight)}:host([value-state="Warning"]) [inner-input]::-moz-placeholder{font-weight:var(--_ui5-v1-21-2_input_value_state_error_warning_placeholder_font_weight)}:host([value-state="Success"]) [inner-input]::-webkit-input-placeholder{color:var(--_ui5-v1-21-2_input_placeholder_color)}:host([value-state="Success"]) [inner-input]::-moz-placeholder{color:var(--_ui5-v1-21-2_input_placeholder_color)}:host([value-state="Information"]) [inner-input]::-webkit-input-placeholder{color:var(--_ui5-v1-21-2_input_placeholder_color)}:host([value-state="Information"]) [inner-input]::-moz-placeholder{color:var(--_ui5-v1-21-2_input_placeholder_color)}.ui5-input-content{height:100%;box-sizing:border-box;display:flex;flex-direction:row;justify-content:flex-end;overflow:hidden;outline:none;background:transparent;color:inherit;border-radius:var(--_ui5-v1-21-2_input_border_radius)}:host([readonly]:not([disabled])){border-color:var(--_ui5-v1-21-2_input_readonly_border_color);background:var(--sapField_ReadOnly_BackgroundStyle);background-color:var(--_ui5-v1-21-2_input_readonly_background)}:host([value-state="None"]:not([readonly]):hover),:host(:not([value-state]):not([readonly]):hover){border:var(--_ui5-v1-21-2_input_hover_border);border-color:var(--_ui5-v1-21-2_input_focused_border_color);box-shadow:var(--sapField_Hover_Shadow);background:var(--sapField_Hover_BackgroundStyle);background-color:var(--sapField_Hover_Background)}:host(:not([value-state]):not([readonly])[focused]:not([opened]):hover),:host([value-state="None"]:not([readonly])[focused]:not([opened]):hover){box-shadow:none}:host([focused]):not([opened]) .ui5-input-root:before{content:none}:host(:not([readonly]):not([disabled])[value-state]:not([value-state="None"])){border-width:var(--_ui5-v1-21-2_input_state_border_width)}:host([value-state="Error"]) [inner-input],:host([value-state="Warning"]) [inner-input]{font-style:var(--_ui5-v1-21-2_input_error_warning_font_style);text-indent:var(--_ui5-v1-21-2_input_error_warning_text_indent)}:host([value-state="Error"]) [inner-input]{font-weight:var(--_ui5-v1-21-2_input_error_font_weight)}:host([value-state="Warning"]) [inner-input]{font-weight:var(--_ui5-v1-21-2_input_warning_font_weight)}:host([value-state="Error"]:not([readonly]):not([disabled])){background:var(--sapField_InvalidBackgroundStyle);background-color:var(--sapField_InvalidBackground);border-color:var(--_ui5-v1-21-2_input_value_state_error_border_color);box-shadow:var(--sapField_InvalidShadow)}:host([value-state="Error"][focused]:not([opened]):not([readonly])){background-color:var(--_ui5-v1-21-2_input_focused_value_state_error_background);border-color:var(--_ui5-v1-21-2_input_focused_value_state_error_border_color)}:host([value-state="Error"][focused]:not([opened]):not([readonly])) .ui5-input-focusable-element:after{border-color:var(--_ui5-v1-21-2_input_focused_value_state_error_focus_outline_color)}:host([value-state="Error"]:not([readonly])) .ui5-input-root:before{background-color:var(--_ui5-v1-21-2-input-value-state-error-border-botom-color)}:host([value-state="Error"]:not([readonly]):not([focused]):hover),:host([value-state="Error"]:not([readonly])[focused][opened]:hover){background-color:var(--_ui5-v1-21-2_input_value_state_error_hover_background);box-shadow:var(--sapField_Hover_InvalidShadow)}:host([value-state="Error"]:not([readonly]):not([disabled])),:host([value-state="Warning"]:not([readonly]):not([disabled])),:host([value-state="Information"]:not([readonly]):not([disabled])){border-style:var(--_ui5-v1-21-2_input_error_warning_border_style)}:host([value-state="Warning"]:not([readonly]):not([disabled])){background:var(--sapField_WarningBackgroundStyle);background-color:var(--sapField_WarningBackground);border-color:var(--_ui5-v1-21-2_input_value_state_warning_border_color);box-shadow:var(--sapField_WarningShadow)}:host([value-state="Warning"][focused]:not([opened]):not([readonly])){background-color:var(--_ui5-v1-21-2_input_focused_value_state_warning_background);border-color:var(--_ui5-v1-21-2_input_focused_value_state_warning_border_color)}:host([value-state="Warning"][focused]:not([opened]):not([readonly])) .ui5-input-focusable-element:after{border-color:var(--_ui5-v1-21-2_input_focused_value_state_warning_focus_outline_color)}:host([value-state="Warning"]:not([readonly])) .ui5-input-root:before{background-color:var(--_ui5-v1-21-2_input_value_state_warning_border_botom_color)}:host([value-state="Warning"]:not([readonly]):not([focused]):hover),:host([value-state="Warning"]:not([readonly])[focused][opened]:hover){background-color:var(--sapField_Hover_Background);box-shadow:var(--sapField_Hover_WarningShadow)}:host([value-state="Success"]:not([readonly]):not([disabled])){background:var(--sapField_SuccessBackgroundStyle);background-color:var(--sapField_SuccessBackground);border-color:var(--_ui5-v1-21-2_input_value_state_success_border_color);border-width:var(--_ui5-v1-21-2_input_value_state_success_border_width);box-shadow:var(--sapField_SuccessShadow)}:host([value-state="Success"][focused]:not([opened]):not([readonly])){background-color:var(--_ui5-v1-21-2_input_focused_value_state_success_background);border-color:var(--_ui5-v1-21-2_input_focused_value_state_success_border_color)}:host([value-state="Success"][focused]:not([opened]):not([readonly])) .ui5-input-focusable-element:after{border-color:var(--_ui5-v1-21-2_input_focused_value_state_success_focus_outline_color)}:host([value-state="Success"]:not([readonly])) .ui5-input-root:before{background-color:var(--_ui5-v1-21-2_input_value_state_success_border_botom_color)}:host([value-state="Success"]:not([readonly]):not([focused]):hover),:host([value-state="Success"]:not([readonly])[focused][opened]:hover){background-color:var(--sapField_Hover_Background);box-shadow:var(--sapField_Hover_SuccessShadow)}:host([value-state="Information"]:not([readonly]):not([disabled])){background:var(--sapField_InformationBackgroundStyle);background-color:var(--sapField_InformationBackground);border-color:var(--_ui5-v1-21-2_input_value_state_information_border_color);border-width:var(--_ui5-v1-21-2_input_information_border_width);box-shadow:var(--sapField_InformationShadow)}:host([value-state="Information"][focused]:not([opened]):not([readonly])){background-color:var(--_ui5-v1-21-2_input_focused_value_state_information_background);border-color:var(--_ui5-v1-21-2_input_focused_value_state_information_border_color)}:host([value-state="Information"]:not([readonly])) .ui5-input-root:before{background-color:var(--_ui5-v1-21-2_input_value_success_information_border_botom_color)}:host([value-state="Information"]:not([readonly]):not([focused]):hover),:host([value-state="Information"]:not([readonly])[focused][opened]:hover){background-color:var(--sapField_Hover_Background);box-shadow:var(--sapField_Hover_InformationShadow)}.ui5-input-icon-root{min-width:var(--_ui5-v1-21-2_input_icon_min_width);height:100%;display:flex;justify-content:center;align-items:center}::slotted([ui5-icon][slot="icon"]){align-self:start;padding:var(--_ui5-v1-21-2_input_custom_icon_padding);box-sizing:content-box!important}:host([value-state="Error"]) [input-icon],:host([value-state="Warning"]) [input-icon]{padding:var(--_ui5-v1-21-2_input_error_warning_icon_padding)}:host([value-state="Error"][focused]) [input-icon],:host([value-state="Warning"][focused]) [input-icon]{padding:var(--_ui5-v1-21-2_input_error_warning_focused_icon_padding)}:host([value-state="Information"]) [input-icon]{padding:var(--_ui5-v1-21-2_input_information_icon_padding)}:host([value-state="Information"][focused]) [input-icon]{padding:var(--_ui5-v1-21-2_input_information_focused_icon_padding)}:host([value-state="Error"]) ::slotted([input-icon][ui5-icon]),:host([value-state="Error"]) ::slotted([ui5-icon][slot="icon"]),:host([value-state="Warning"]) ::slotted([ui5-icon][slot="icon"]){padding:var(--_ui5-v1-21-2_input_error_warning_custom_icon_padding)}:host([value-state="Error"][focused]) ::slotted([input-icon][ui5-icon]),:host([value-state="Error"][focused]) ::slotted([ui5-icon][slot="icon"]),:host([value-state="Warning"][focused]) ::slotted([ui5-icon][slot="icon"]){padding:var(--_ui5-v1-21-2_input_error_warning_custom_focused_icon_padding)}:host([value-state="Information"]) ::slotted([ui5-icon][slot="icon"]){padding:var(--_ui5-v1-21-2_input_information_custom_icon_padding)}:host([value-state="Information"][focused]) ::slotted([ui5-icon][slot="icon"]){padding:var(--_ui5-v1-21-2_input_information_custom_focused_icon_padding)}:host([value-state="Error"]) [input-icon]:active,:host([value-state="Error"]) [input-icon][pressed]{box-shadow:var(--_ui5-v1-21-2_input_error_icon_box_shadow);color:var(--_ui5-v1-21-2_input_icon_error_pressed_color)}:host([value-state="Error"]) [input-icon]:not([pressed]):not(:active):hover{box-shadow:var(--_ui5-v1-21-2_input_error_icon_box_shadow)}:host([value-state="Warning"]) [input-icon]:active,:host([value-state="Warning"]) [input-icon][pressed]{box-shadow:var(--_ui5-v1-21-2_input_warning_icon_box_shadow);color:var(--_ui5-v1-21-2_input_icon_warning_pressed_color)}:host([value-state="Warning"]) [input-icon]:not([pressed]):not(:active):hover{box-shadow:var(--_ui5-v1-21-2_input_warning_icon_box_shadow)}:host([value-state="Information"]) [input-icon]:active,:host([value-state="Information"]) [input-icon][pressed]{box-shadow:var(--_ui5-v1-21-2_input_information_icon_box_shadow);color:var(--_ui5-v1-21-2_input_icon_information_pressed_color)}:host([value-state="Information"]) [input-icon]:not([pressed]):not(:active):hover{box-shadow:var(--_ui5-v1-21-2_input_information_icon_box_shadow)}:host([value-state="Success"]) [input-icon]:active,:host([value-state="Success"]) [input-icon][pressed]{box-shadow:var(--_ui5-v1-21-2_input_success_icon_box_shadow);color:var(--_ui5-v1-21-2_input_icon_success_pressed_color)}:host([value-state="Success"]) [input-icon]:not([pressed]):not(:active):hover{box-shadow:var(--_ui5-v1-21-2_input_success_icon_box_shadow)}.ui5-input-clear-icon-wrapper{height:var(--_ui5-v1-21-2_input_icon_wrapper_height);padding:0;width:var(--_ui5-v1-21-2_input_icon_width);min-width:var(--_ui5-v1-21-2_input_icon_width);display:flex;justify-content:center;align-items:center;box-sizing:border-box}:host([value-state]:not([value-state="None"]):not([value-state="Success"])) .ui5-input-clear-icon-wrapper{height:var(--_ui5-v1-21-2_input_icon_wrapper_state_height);vertical-align:top}:host([value-state="Success"]) .ui5-input-clear-icon-wrapper{height:var(--_ui5-v1-21-2_input_icon_wrapper_success_state_height)}[ui5-icon].ui5-input-clear-icon{padding:0;color:inherit}[inner-input]::-webkit-outer-spin-button,[inner-input]::-webkit-inner-spin-button{-webkit-appearance:inherit;margin:inherit}
` };
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$4);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$5);
const styleData$2 = { packageName: "@ui5/webcomponents", fileName: "themes/ResponsivePopoverCommon.css.ts", content: `.input-root-phone{flex:1;position:relative;height:var(--_ui5-v1-21-2_input_height);color:var(--sapField_TextColor);font-size:var(--sapFontSize);font-family:"72override",var(--sapFontFamily);background:var(--sapField_BackgroundStyle);background-color:var(--_ui5-v1-21-2_input_background_color);border:var(--_ui5-v1-21-2-input-border);border-radius:var(--_ui5-v1-21-2_input_border_radius);box-sizing:border-box}.input-root-phone [inner-input]{padding:0 .5rem;width:100%;height:100%}.input-root-phone [inner-input]:focus{background-color:var(--sapField_Focus_Background)}.input-root-phone:focus-within:before{content:"";position:absolute;pointer-events:none;z-index:2;border:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);border-radius:var(--_ui5-v1-21-2_input_focus_border_radius);top:var(--_ui5-v1-21-2_input_focus_offset);bottom:var(--_ui5-v1-21-2_input_focus_offset);left:var(--_ui5-v1-21-2_input_focus_offset);right:var(--_ui5-v1-21-2_input_focus_offset)}.input-root-phone [value-state=Error] [input-icon][data-ui5-compact-size],.input-root-phone [value-state=Success] [input-icon][data-ui5-compact-size],.input-root-phone [value-state=Warning] [input-icon][data-ui5-compact-size]{padding:.1875rem .5rem}[inner-input]{background:transparent;color:inherit;border:none;font-style:normal;-webkit-appearance:none;-moz-appearance:textfield;line-height:normal;padding:var(--_ui5-v1-21-2_input_inner_padding);box-sizing:border-box;min-width:3rem;text-overflow:ellipsis;flex:1;outline:none;font-size:inherit;font-family:inherit;border-radius:var(--_ui5-v1-21-2_input_border_radius)}[inner-input]::selection,[inner-input]::-moz-selection{background:var(--sapSelectedColor);color:var(--sapContent_ContrastTextColor)}[inner-input]::-webkit-input-placeholder{font-style:italic;color:var(--sapField_PlaceholderTextColor)}[inner-input]::-moz-placeholder{font-style:italic;color:var(--sapField_PlaceholderTextColor)}.input-root-phone[value-state]:not([value-state=None]){border-width:var(--_ui5-v1-21-2_input_state_border_width)}.input-root-phone[value-state=Error] [inner-input],.input-root-phone[value-state=Warning] [inner-input]{font-style:var(--_ui5-v1-21-2_input_error_warning_font_style)}.input-root-phone[value-state=Error] [inner-input]{font-weight:var(--_ui5-v1-21-2_input_error_font_weight)}.input-root-phone[value-state=Error]:not([readonly]){background:var(--sapField_InvalidBackgroundStyle);background-color:var(--sapField_InvalidBackground);border-color:var(--_ui5-v1-21-2_input_value_state_error_border_color)}.input-root-phone[value-state=Error]:not([readonly]) [inner-input]:focus{background-color:var(--_ui5-v1-21-2_input_focused_value_state_error_background);border-color:var(--_ui5-v1-21-2_input_focused_value_state_error_border_color)}.input-root-phone[value-state=Error]:not([readonly]):focus-within:before{border-color:var(--_ui5-v1-21-2_input_focused_value_state_error_focus_outline_color)}.input-root-phone[value-state=Error]:not([readonly]):not([disabled]),.input-root-phone[value-state=Warning]:not([readonly]):not([disabled]),.input-root-phone[value-state=Information]:not([readonly]):not([disabled]){border-style:var(--_ui5-v1-21-2_input_error_warning_border_style)}.input-root-phone[value-state=Warning]:not([readonly]){background:var(--sapField_WarningBackgroundStyle);background-color:var(--sapField_WarningBackground);border-color:var(--_ui5-v1-21-2_input_value_state_warning_border_color)}.input-root-phone[value-state=Warning]:not([readonly]) [inner-input]:focus{background-color:var(--_ui5-v1-21-2_input_focused_value_state_warning_background);border-color:var(--_ui5-v1-21-2_input_focused_value_state_warning_border_color)}.input-root-phone[value-state=Warning]:not([readonly]):focus-within:before{border-color:var(--_ui5-v1-21-2_input_focused_value_state_warning_focus_outline_color)}.input-root-phone[value-state=Success]:not([readonly]){background:var(--sapField_SuccessBackgroundStyle);background-color:var(--sapField_SuccessBackground);border-color:var(--_ui5-v1-21-2_input_value_state_success_border_color);border-width:var(--_ui5-v1-21-2_input_value_state_success_border_width)}.input-root-phone[value-state=Success]:not([readonly]) [inner-input]:focus{background-color:var(--_ui5-v1-21-2_input_focused_value_state_success_background);border-color:var(--_ui5-v1-21-2_input_focused_value_state_success_border_color)}.input-root-phone[value-state=Success]:not([readonly]):focus-within:before{border-color:var(--_ui5-v1-21-2_input_focused_value_state_success_focus_outline_color)}.input-root-phone[value-state=Information]:not([readonly]){background:var(--sapField_InformationBackgroundStyle);background-color:var(--sapField_InformationBackground);border-color:var(--_ui5-v1-21-2_input_value_state_information_border_color);border-width:var(--_ui5-v1-21-2_input_information_border_width)}.input-root-phone[value-state=Information]:not([readonly]) [inner-input]:focus{background-color:var(--_ui5-v1-21-2_input_focused_value_state_information_background);border-color:var(--_ui5-v1-21-2_input_focused_value_state_information_border_color)}.ui5-multi-combobox-toggle-button{margin-left:.5rem}.ui5-responsive-popover-header{width:100%;min-height:2.5rem;display:flex;flex-direction:column}.ui5-responsive-popover-header-text{width:calc(100% - var(--_ui5-v1-21-2_button_base_min_width))}.ui5-responsive-popover-header .row{box-sizing:border-box;padding:.25rem 1rem;min-height:2.5rem;display:flex;justify-content:center;align-items:center;font-size:var(--sapFontHeader5Size)}.ui5-responsive-popover-footer{display:flex;justify-content:flex-end;padding:.25rem 0;width:100%}.ui5-responsive-popover-close-btn{position:absolute;right:1rem}
` };
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$4);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$5);
const styleData$1 = { packageName: "@ui5/webcomponents", fileName: "themes/ValueStateMessage.css.ts", content: `.ui5-valuestatemessage-popover{border-radius:var(--_ui5-v1-21-2_value_state_message_popover_border_radius);box-shadow:var(--_ui5-v1-21-2_value_state_message_popover_box_shadow)}.ui5-input-value-state-message-icon{width:var(--_ui5-v1-21-2_value_state_message_icon_width);height:var(--_ui5-v1-21-2_value_state_message_icon_height);display:var(--_ui5-v1-21-2_input_value_state_icon_display);position:absolute;padding-right:.375rem}.ui5-valuestatemessage-root .ui5-input-value-state-message-icon{left:var(--_ui5-v1-21-2_input_value_state_icon_offset)}.ui5-input-value-state-message-icon[name=error]{color:var(--sapNegativeElementColor)}.ui5-input-value-state-message-icon[name=alert]{color:var(--sapCriticalElementColor)}.ui5-input-value-state-message-icon[name=success]{color:var(--sapPositiveElementColor)}.ui5-input-value-state-message-icon[name=information]{color:var(--sapInformativeElementColor)}.ui5-valuestatemessage-root{box-sizing:border-box;display:inline-block;color:var(--sapTextColor);font-size:var(--sapFontSmallSize);font-family:"72override",var(--sapFontFamily);height:auto;padding:var(--_ui5-v1-21-2_value_state_message_padding);overflow:hidden;text-overflow:ellipsis;min-width:6.25rem;border:var(--_ui5-v1-21-2_value_state_message_border);line-height:var(--_ui5-v1-21-2_value_state_message_line_height)}[ui5-responsive-popover] .ui5-valuestatemessage-header,[ui5-popover] .ui5-valuestatemessage-header{min-height:2rem}[ui5-responsive-popover] .ui5-valuestatemessage-header{padding:var(--_ui5-v1-21-2_value_state_header_padding);border:var(--_ui5-v1-21-2_value_state_header_border);border-bottom:var(--_ui5-v1-21-2_value_state_header_border_bottom);flex-grow:1;position:relative}.ui5-valuestatemessage--success{background:var(--sapSuccessBackground)}.ui5-valuestatemessage--warning{background:var(--sapWarningBackground)}.ui5-valuestatemessage--error{background:var(--sapErrorBackground)}.ui5-valuestatemessage--information{background:var(--sapInformationBackground)}.ui5-responsive-popover-header[focused],.ui5-responsive-popover-header:focus{outline-offset:var(--_ui5-v1-21-2_value_state_header_offset);outline:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor)}.ui5-valuestatemessage-popover::part(header),.ui5-valuestatemessage-popover::part(content){padding:0}.ui5-valuestatemessage-popover::part(header),.ui5-valuestatemessage-popover::part(footer){min-height:0}.ui5-valuestatemessage-popover::part(header),.ui5-popover-with-value-state-header::part(header),.ui5-popover-with-value-state-header-phone::part(header){margin-bottom:0}.ui5-popover-with-value-state-header-phone .ui5-valuestatemessage-root{padding:var(--_ui5-v1-21-2_value_state_message_padding_phone);width:100%}.ui5-popover-with-value-state-header-phone .ui5-input-value-state-message-icon{left:var(--_ui5-v1-21-2_value_state_message_icon_offset_phone)}.ui5-popover-with-value-state-header-phone .ui5-valuestatemessage-header{position:relative;flex:none;top:0;left:0}.ui5-popover-with-value-state-header-phone::part(content){padding:0;overflow:hidden;display:flex;flex-direction:column}.ui5-popover-with-value-state-header-phone .ui5-valuestatemessage-root+[ui5-list]{overflow:auto}[ui5-responsive-popover] .ui5-valuestatemessage--error{box-shadow:var(--_ui5-v1-21-2_value_state_header_box_shadow_error)}[ui5-responsive-popover] .ui5-valuestatemessage--information{box-shadow:var(--_ui5-v1-21-2_value_state_header_box_shadow_information)}[ui5-responsive-popover] .ui5-valuestatemessage--success{box-shadow:var(--_ui5-v1-21-2_value_state_header_box_shadow_success)}[ui5-responsive-popover] .ui5-valuestatemessage--warning{box-shadow:var(--_ui5-v1-21-2_value_state_header_box_shadow_warning)}[ui5-responsive-popover].ui5-popover-with-value-state-header .ui5-valuestatemessage-root:has(+[ui5-list]:empty){box-shadow:none}
` };
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$4);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$5);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/Suggestions.css.ts", content: `.ui5-suggestions-popover{box-shadow:var(--sapContent_Shadow1)}.ui5-suggestions-popover::part(header),.ui5-suggestions-popover::part(content){padding:0}.ui5-suggestions-popover::part(footer){padding:0 1rem}.ui5-suggestions-popover [ui5-li]::part(icon),.ui5-suggestions-popover [ui5-li-suggestion-item]::part(icon){color:var(--sapList_TextColor)}.input-root-phone.native-input-wrapper{display:contents}.input-root-phone.native-input-wrapper:before{display:none}.native-input-wrapper .ui5-input-inner-phone{margin:0}
` };
var __decorate = function(decorators, target, key, desc) {
  var c2 = arguments.length, r = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c2 < 3 ? d(r) : c2 > 3 ? d(target, key, r) : d(target, key)) || r;
  return c2 > 3 && r && Object.defineProperty(target, key, r), r;
};
var Input_1;
var INPUT_EVENTS;
(function(INPUT_EVENTS2) {
  INPUT_EVENTS2["CHANGE"] = "change";
  INPUT_EVENTS2["INPUT"] = "input";
  INPUT_EVENTS2["SUGGESTION_ITEM_SELECT"] = "suggestion-item-select";
})(INPUT_EVENTS || (INPUT_EVENTS = {}));
var INPUT_ACTIONS;
(function(INPUT_ACTIONS2) {
  INPUT_ACTIONS2["ACTION_ENTER"] = "enter";
  INPUT_ACTIONS2["ACTION_USER_INPUT"] = "input";
})(INPUT_ACTIONS || (INPUT_ACTIONS = {}));
let Input = Input_1 = class Input2 extends UI5Element {
  constructor() {
    super();
    this.hasSuggestionItemSelected = false;
    this.valueBeforeItemSelection = "";
    this.valueBeforeItemPreview = "";
    this.suggestionSelectionCancelled = false;
    this.previousValue = "";
    this.firstRendering = true;
    this.typedInValue = "";
    this.lastConfirmedValue = "";
    this.isTyping = false;
    this.suggestionObjects = [];
    this._handleResizeBound = this._handleResize.bind(this);
    this._keepInnerValue = false;
    this._focusedAfterClear = false;
  }
  onEnterDOM() {
    ResizeHandler.register(this, this._handleResizeBound);
    registerUI5Element(this, this._updateAssociatedLabelsTexts.bind(this));
  }
  onExitDOM() {
    ResizeHandler.deregister(this, this._handleResizeBound);
    deregisterUI5Element(this);
  }
  onBeforeRendering() {
    if (!this._keepInnerValue) {
      this._innerValue = this.value;
    }
    if (this.showSuggestions) {
      this.enableSuggestions();
      this.suggestionObjects = this.Suggestions.defaultSlotProperties(this.typedInValue);
    }
    this.effectiveShowClearIcon = this.showClearIcon && !!this.value && !this.readonly && !this.disabled;
    this.style.setProperty(getScopedVarName("--_ui5-input-icons-count"), `${this.iconsCount}`);
    this.FormSupport = getFeature("FormSupport");
    const hasItems = !!this.suggestionItems.length;
    const hasValue = !!this.value;
    const isFocused = this.shadowRoot.querySelector("input") === getActiveElement();
    if (this._isPhone) {
      this.open = this.openOnMobile;
    } else if (this._forceOpen) {
      this.open = true;
    } else {
      this.open = hasValue && hasItems && isFocused && this.isTyping;
    }
    if (this.FormSupport) {
      this.FormSupport.syncNativeHiddenInput(this);
    } else if (this.name) {
      console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`);
    }
    const value = this.value;
    const innerInput = this.getInputDOMRefSync();
    if (!innerInput || !value) {
      return;
    }
    const autoCompletedChars = innerInput.selectionEnd - innerInput.selectionStart;
    if (this._shouldAutocomplete && !isAndroid() && !autoCompletedChars && !this._isKeyNavigation) {
      const item = this._getFirstMatchingItem(value);
      if (item) {
        this._handleTypeAhead(item);
      }
    }
  }
  async onAfterRendering() {
    const innerInput = this.getInputDOMRefSync();
    if (this.Suggestions && this.showSuggestions) {
      this.Suggestions.toggle(this.open, {
        preventFocusRestore: true
      });
      this._listWidth = await this.Suggestions._getListWidth();
    }
    if (this.shouldDisplayOnlyValueStateMessage) {
      this.openPopover();
    } else {
      this.closePopover();
    }
    if (this._performTextSelection) {
      if (innerInput.value !== this._innerValue) {
        innerInput.value = this._innerValue;
      }
      if (this.typedInValue.length && this.value.length) {
        innerInput.setSelectionRange(this.typedInValue.length, this.value.length);
      }
    }
    this._performTextSelection = false;
  }
  _onkeydown(e2) {
    this._isKeyNavigation = true;
    this._shouldAutocomplete = !this.noTypeahead && !(isBackSpace(e2) || isDelete(e2) || isEscape(e2));
    if (isUp(e2)) {
      return this._handleUp(e2);
    }
    if (isDown(e2)) {
      return this._handleDown(e2);
    }
    if (isSpace(e2)) {
      return this._handleSpace(e2);
    }
    if (isTabNext(e2)) {
      return this._handleTab();
    }
    if (isEnter(e2)) {
      return this._handleEnter(e2);
    }
    if (isPageUp(e2)) {
      return this._handlePageUp(e2);
    }
    if (isPageDown(e2)) {
      return this._handlePageDown(e2);
    }
    if (isHome(e2)) {
      return this._handleHome(e2);
    }
    if (isEnd(e2)) {
      return this._handleEnd(e2);
    }
    if (isEscape(e2)) {
      return this._handleEscape();
    }
    if (this.showSuggestions) {
      this._clearPopoverFocusAndSelection();
    }
    this._keyDown = true;
    this._isKeyNavigation = false;
  }
  _onkeyup(e2) {
    if (isDelete(e2)) {
      this.value = e2.target.value;
    }
    this._keyDown = false;
  }
  _handleUp(e2) {
    if (this.Suggestions && this.Suggestions.isOpened()) {
      this.Suggestions.onUp(e2);
    }
  }
  _handleDown(e2) {
    if (this.Suggestions && this.Suggestions.isOpened()) {
      this.Suggestions.onDown(e2);
    }
  }
  _handleSpace(e2) {
    if (this.Suggestions) {
      this.Suggestions.onSpace(e2);
    }
  }
  _handleTab() {
    if (this.Suggestions && this.previousValue !== this.value) {
      this.Suggestions.onTab();
    }
  }
  _handleEnter(e2) {
    const suggestionItemPressed = !!(this.Suggestions && this.Suggestions.onEnter(e2));
    const innerInput = this.getInputDOMRefSync();
    const matchingItem = this.suggestionItems.find((item) => {
      return item.text && item.text === this.value || item.textContent === this.value;
    });
    if (matchingItem) {
      const itemText = matchingItem.text ? matchingItem.text : matchingItem.textContent || "";
      innerInput.setSelectionRange(itemText.length, itemText.length);
      if (!suggestionItemPressed) {
        this.selectSuggestion(matchingItem, true);
        this.open = false;
      }
    }
    if (this._isPhone && !this.suggestionItems.length && !this.isTypeNumber) {
      innerInput.setSelectionRange(this.value.length, this.value.length);
    }
    if (!suggestionItemPressed) {
      this.lastConfirmedValue = this.value;
      if (this.FormSupport) {
        this.FormSupport.triggerFormSubmit(this);
      }
      return;
    }
    this.focused = true;
  }
  _handlePageUp(e2) {
    if (this._isSuggestionsFocused) {
      this.Suggestions.onPageUp(e2);
    } else {
      e2.preventDefault();
    }
  }
  _handlePageDown(e2) {
    if (this._isSuggestionsFocused) {
      this.Suggestions.onPageDown(e2);
    } else {
      e2.preventDefault();
    }
  }
  _handleHome(e2) {
    if (this._isSuggestionsFocused) {
      this.Suggestions.onHome(e2);
    }
  }
  _handleEnd(e2) {
    if (this._isSuggestionsFocused) {
      this.Suggestions.onEnd(e2);
    }
  }
  _handleEscape() {
    const hasSuggestions = this.showSuggestions && !!this.Suggestions;
    const isOpen = hasSuggestions && this.open;
    const innerInput = this.getInputDOMRefSync();
    const isAutoCompleted = innerInput.selectionEnd - innerInput.selectionStart > 0;
    this.isTyping = false;
    if (!isOpen) {
      this.value = this.lastConfirmedValue ? this.lastConfirmedValue : this.previousValue;
      return;
    }
    if (isOpen && this.Suggestions._isItemOnTarget()) {
      this.value = this.typedInValue || this.valueBeforeItemPreview;
      this.suggestionSelectionCancelled = true;
      this.focused = true;
      return;
    }
    if (isAutoCompleted) {
      this.value = this.typedInValue;
    }
    if (this._isValueStateFocused) {
      this._isValueStateFocused = false;
      this.focused = true;
    }
  }
  async _onfocusin(e2) {
    await this.getInputDOMRef();
    this.focused = true;
    if (!this._focusedAfterClear) {
      this.previousValue = this.value;
    }
    this.valueBeforeItemPreview = this.value;
    this._inputIconFocused = !!e2.target && e2.target === this.querySelector("[ui5-icon]");
    this._focusedAfterClear = false;
  }
  /**
   * Called on "focusin" of the native input HTML Element.
   * <b>Note:</b> implemented in MultiInput, but used in the Input template.
   */
  innerFocusIn() {
  }
  _onfocusout(e2) {
    const toBeFocused = e2.relatedTarget;
    const focusedOutToSuggestions = this.Suggestions && toBeFocused && toBeFocused.shadowRoot && toBeFocused.shadowRoot.contains(this.Suggestions.responsivePopover);
    const focusedOutToValueStateMessage = toBeFocused && toBeFocused.shadowRoot && toBeFocused.shadowRoot.querySelector(".ui5-valuestatemessage-root");
    this._keepInnerValue = false;
    if (this.showClearIcon && !this.effectiveShowClearIcon) {
      this._clearIconClicked = false;
      this._handleChange();
    }
    if (focusedOutToSuggestions || focusedOutToValueStateMessage) {
      e2.stopImmediatePropagation();
      return;
    }
    if (toBeFocused && toBeFocused.classList.contains(this._id)) {
      return;
    }
    this.open = false;
    this._clearPopoverFocusAndSelection();
    if (!this._clearIconClicked) {
      this.previousValue = "";
    }
    this.lastConfirmedValue = "";
    this.focused = false;
    this.isTyping = false;
    this._forceOpen = false;
  }
  _clearPopoverFocusAndSelection() {
    if (!this.showSuggestions || !this.Suggestions) {
      return;
    }
    this._isValueStateFocused = false;
    this.hasSuggestionItemSelected = false;
    this.Suggestions._deselectItems();
    this.Suggestions._clearItemFocus();
  }
  _click() {
    if (isPhone() && !this.readonly && this.Suggestions) {
      this.blur();
      this.openOnMobile = true;
    }
  }
  _handleChange() {
    if (this._clearIconClicked) {
      this._clearIconClicked = false;
      return;
    }
    if (this.previousValue !== this.getInputDOMRefSync().value) {
      this.fireEvent(INPUT_EVENTS.CHANGE);
      this.previousValue = this.value;
      this.typedInValue = this.value;
    }
  }
  _clear() {
    this.value = "";
    this.fireEvent(INPUT_EVENTS.INPUT);
    if (!this._isPhone) {
      this.focus();
      this._focusedAfterClear = true;
    }
  }
  _iconMouseDown() {
    this._clearIconClicked = true;
  }
  _scroll(e2) {
    this.fireEvent("suggestion-scroll", {
      scrollTop: e2.detail.scrollTop,
      scrollContainer: e2.detail.targetRef
    });
  }
  _handleInput(e2) {
    const inputDomRef = this.getInputDOMRefSync();
    const emptyValueFiredOnNumberInput = this.value && this.isTypeNumber && !inputDomRef.value;
    const eventType = e2.inputType || e2.detail && e2.detail.inputType || "";
    this._keepInnerValue = false;
    const allowedEventTypes = [
      "deleteWordBackward",
      "deleteWordForward",
      "deleteSoftLineBackward",
      "deleteSoftLineForward",
      "deleteEntireSoftLine",
      "deleteHardLineBackward",
      "deleteHardLineForward",
      "deleteByDrag",
      "deleteByCut",
      "deleteContent",
      "deleteContentBackward",
      "deleteContentForward",
      "historyUndo"
    ];
    this._shouldAutocomplete = !allowedEventTypes.includes(eventType) && !this.noTypeahead;
    this.suggestionSelectionCancelled = false;
    if (e2 instanceof InputEvent) {
      const delimiterCase = this.isTypeNumber && (e2.inputType === "deleteContentForward" || e2.inputType === "deleteContentBackward") && !e2.target.value.includes(".") && this.value.includes(".");
      const eNotationCase = emptyValueFiredOnNumberInput && e2.data === "e";
      const minusRemovalCase = emptyValueFiredOnNumberInput && this.value.startsWith("-") && this.value.length === 2 && (e2.inputType === "deleteContentForward" || e2.inputType === "deleteContentBackward");
      if (delimiterCase || eNotationCase || minusRemovalCase) {
        this.value = e2.target.value;
        this._keepInnerValue = true;
      }
    }
    if (e2.target === inputDomRef) {
      this.focused = true;
      e2.stopImmediatePropagation();
    }
    this.fireEventByAction(INPUT_ACTIONS.ACTION_ENTER, e2);
    this.hasSuggestionItemSelected = false;
    this._isValueStateFocused = false;
    if (this.Suggestions) {
      this.Suggestions.updateSelectedItemPosition(-1);
    }
    this.isTyping = true;
  }
  _startsWithMatchingItems(str) {
    const textProp = this.suggestionItems[0].text ? "text" : "textContent";
    return StartsWith(str, this.suggestionItems, textProp);
  }
  _getFirstMatchingItem(current) {
    if (!this.suggestionItems.length) {
      return;
    }
    const matchingItems = this._startsWithMatchingItems(current).filter((item) => !item.groupItem);
    if (matchingItems.length) {
      return matchingItems[0];
    }
  }
  _handleTypeAhead(item) {
    const value = item.text ? item.text : item.textContent || "";
    this._innerValue = value;
    this.value = value;
    this._performTextSelection = true;
    this._shouldAutocomplete = false;
  }
  _handleResize() {
    this._inputWidth = this.offsetWidth;
  }
  _updateAssociatedLabelsTexts() {
    this._associatedLabelsTexts = getAssociatedLabelForTexts(this);
    this._accessibleLabelsRefTexts = getAllAccessibleNameRefTexts(this);
  }
  _closeRespPopover() {
    this.Suggestions.close(true);
  }
  async _afterOpenPopover() {
    if (isPhone()) {
      (await this.getInputDOMRef()).focus();
    }
  }
  _afterClosePopover() {
    this.announceSelectedItem();
    if (isPhone()) {
      this.blur();
      this.focused = false;
    }
    this.openOnMobile = false;
    this.open = false;
    this._forceOpen = false;
    if (this.hasSuggestionItemSelected) {
      this.focus();
    }
  }
  /**
   * Checks if the value state popover is open.
   * @returns {boolean} true if the value state popover is open, false otherwise
   */
  isValueStateOpened() {
    return !!this._isPopoverOpen;
  }
  async openPopover() {
    const popover = await this._getPopover();
    if (popover) {
      this._isPopoverOpen = true;
      popover.showAt(this);
    }
  }
  async closePopover() {
    const popover = await this._getPopover();
    popover && popover.close();
  }
  async _getPopover() {
    const staticAreaItem = await this.getStaticAreaItemDomRef();
    return staticAreaItem.querySelector("[ui5-popover]");
  }
  /**
   * Manually opens the suggestions popover, assuming suggestions are enabled. Items must be preloaded for it to open.
   * @public
   * @method
   * @name sap.ui.webc.main.Input#openPicker
   * @return {void}
   * @since 1.3.0
   */
  openPicker() {
    if (!this.suggestionItems.length || this.disabled || this.readonly) {
      return;
    }
    this._forceOpen = true;
  }
  enableSuggestions() {
    if (this.Suggestions) {
      return;
    }
    const Suggestions = getFeature("InputSuggestions");
    if (Suggestions) {
      this.Suggestions = new Suggestions(this, "suggestionItems", true, false);
    } else {
      throw new Error(`You have to import "@ui5/webcomponents/dist/features/InputSuggestions.js" module to use ui5-input suggestions`);
    }
  }
  selectSuggestion(item, keyboardUsed) {
    var _a;
    if (item.groupItem) {
      return;
    }
    const value = this.typedInValue || this.value;
    const itemText = item.text || item.textContent || "";
    const fireInput = keyboardUsed ? this.valueBeforeItemSelection !== itemText : value !== itemText;
    this.hasSuggestionItemSelected = true;
    const valueOriginal = this.value;
    const valueBeforeItemSelectionOriginal = this.valueBeforeItemSelection;
    const lastConfirmedValueOriginal = this.lastConfirmedValue;
    const performTextSelectionOriginal = this._performTextSelection;
    const typedInValueOriginal = this.typedInValue;
    const previousValueOriginal = this.previousValue;
    if (fireInput) {
      this.value = itemText;
      this.valueBeforeItemSelection = itemText;
      this.lastConfirmedValue = itemText;
      this._performTextSelection = true;
      this.fireEvent(INPUT_EVENTS.CHANGE);
      if (isPhone()) {
        this.fireEvent(INPUT_EVENTS.INPUT);
      }
      this.typedInValue = this.value;
      this.previousValue = this.value;
    }
    this.valueBeforeItemPreview = "";
    this.suggestionSelectionCancelled = false;
    const isCancelledByUser = !this.fireEvent(INPUT_EVENTS.SUGGESTION_ITEM_SELECT, { item }, true);
    if (isCancelledByUser) {
      (_a = this.Suggestions) == null ? void 0 : _a._clearSelectedSuggestionAndAccInfo();
      this.hasSuggestionItemSelected = false;
      this.suggestionSelectionCancelled = true;
      if (fireInput) {
        if (itemText === this.value) {
          this.value = valueOriginal;
        }
        this.valueBeforeItemSelection = valueBeforeItemSelectionOriginal;
        this.lastConfirmedValue = lastConfirmedValueOriginal;
        this._performTextSelection = performTextSelectionOriginal;
        this.typedInValue = typedInValueOriginal;
        this.previousValue = previousValueOriginal;
      }
    }
    this.isTyping = false;
    this.openOnMobile = false;
    this._forceOpen = false;
  }
  previewSuggestion(item) {
    this.valueBeforeItemSelection = this.value;
    this.updateValueOnPreview(item);
    this.announceSelectedItem();
    this._previewItem = item;
  }
  /**
   * Updates the input value on item preview.
   * @param {Object} item The item that is on preview
   */
  updateValueOnPreview(item) {
    const noPreview = item.type === "Inactive" || item.groupItem;
    const itemValue = noPreview ? this.valueBeforeItemPreview : item.effectiveTitle || item.textContent || "";
    this.value = itemValue;
    this._performTextSelection = true;
  }
  /**
   * The suggestion item on preview.
   * @type {sap.ui.webc.main.IInputSuggestionItem | null}
   * @name sap.ui.webc.main.Input.prototype.previewItem
   * @readonly
   * @public
   */
  get previewItem() {
    if (!this._previewItem) {
      return null;
    }
    return this.getSuggestionByListItem(this._previewItem);
  }
  async fireEventByAction(action, e2) {
    if (this.disabled || this.readonly) {
      return;
    }
    const inputValue = await this.getInputValue();
    const isUserInput = action === INPUT_ACTIONS.ACTION_ENTER;
    this.value = inputValue;
    this.typedInValue = inputValue;
    this.valueBeforeItemPreview = inputValue;
    if (isUserInput) {
      this.fireEvent(INPUT_EVENTS.INPUT, { inputType: e2.inputType });
      this.fireEvent("value-changed");
    }
  }
  async getInputValue() {
    const domRef = this.getDomRef();
    if (domRef) {
      return (await this.getInputDOMRef()).value;
    }
    return "";
  }
  async getInputDOMRef() {
    if (isPhone() && this.Suggestions) {
      await this.Suggestions._getSuggestionPopover();
      return this.Suggestions.responsivePopover.querySelector(".ui5-input-inner-phone");
    }
    return this.nativeInput;
  }
  getInputDOMRefSync() {
    if (isPhone() && this.Suggestions && this.Suggestions.responsivePopover) {
      return this.Suggestions.responsivePopover.querySelector(".ui5-input-inner-phone").shadowRoot.querySelector("input");
    }
    return this.nativeInput;
  }
  /**
   * Returns a reference to the native input element
   * @protected
   */
  get nativeInput() {
    const domRef = this.getDomRef();
    return domRef ? domRef.querySelector(`input`) : null;
  }
  get nativeInputWidth() {
    return this.nativeInput ? this.nativeInput.offsetWidth : 0;
  }
  getLabelableElementId() {
    return this.getInputId();
  }
  getSuggestionByListItem(item) {
    const key = parseInt(item.getAttribute("data-ui5-key"));
    return this.suggestionItems[key];
  }
  /**
   * Returns if the suggestions popover is scrollable.
   * The method returns <code>Promise</code> that resolves to true,
   * if the popup is scrollable and false otherwise.
   * @returns {Promise}
   */
  isSuggestionsScrollable() {
    if (!this.Suggestions) {
      return Promise.resolve(false);
    }
    return this.Suggestions._isScrollable();
  }
  getInputId() {
    return `${this._id}-inner`;
  }
  /* Suggestions interface  */
  onItemMouseOver(e2) {
    const item = e2.target;
    const suggestion = this.getSuggestionByListItem(item);
    suggestion && suggestion.fireEvent("mouseover", {
      item: suggestion,
      targetRef: item
    });
  }
  onItemMouseOut(e2) {
    const item = e2.target;
    const suggestion = this.getSuggestionByListItem(item);
    suggestion && suggestion.fireEvent("mouseout", {
      item: suggestion,
      targetRef: item
    });
  }
  onItemMouseDown(e2) {
    e2.preventDefault();
  }
  onItemSelected(item, keyboardUsed) {
    this.selectSuggestion(item, keyboardUsed);
  }
  onItemPreviewed(item) {
    this.previewSuggestion(item);
    this.fireEvent("suggestion-item-preview", {
      item: this.getSuggestionByListItem(item),
      targetRef: item
    });
  }
  get valueStateTypeMappings() {
    return {
      "Success": Input_1.i18nBundle.getText(VALUE_STATE_TYPE_SUCCESS),
      "Information": Input_1.i18nBundle.getText(VALUE_STATE_TYPE_INFORMATION),
      "Error": Input_1.i18nBundle.getText(VALUE_STATE_TYPE_ERROR),
      "Warning": Input_1.i18nBundle.getText(VALUE_STATE_TYPE_WARNING)
    };
  }
  valueStateTextMappings() {
    return {
      "Success": Input_1.i18nBundle.getText(VALUE_STATE_SUCCESS),
      "Information": Input_1.i18nBundle.getText(VALUE_STATE_INFORMATION),
      "Error": Input_1.i18nBundle.getText(VALUE_STATE_ERROR),
      "Warning": Input_1.i18nBundle.getText(VALUE_STATE_WARNING)
    };
  }
  announceSelectedItem() {
    const invisibleText = this.shadowRoot.querySelector(`[id="${this._id}-selectionText"]`);
    invisibleText.textContent = this.itemSelectionAnnounce;
  }
  get _readonly() {
    return this.readonly && !this.disabled;
  }
  get _headerTitleText() {
    return Input_1.i18nBundle.getText(INPUT_SUGGESTIONS_TITLE);
  }
  get clearIconAccessibleName() {
    return Input_1.i18nBundle.getText(INPUT_CLEAR_ICON_ACC_NAME);
  }
  get inputType() {
    return this.type.toLowerCase();
  }
  get isTypeNumber() {
    return this.type === InputType$1.Number;
  }
  get suggestionsTextId() {
    return this.showSuggestions ? `${this._id}-suggestionsText` : "";
  }
  get valueStateTextId() {
    return this.hasValueState ? `${this._id}-valueStateDesc` : "";
  }
  get accInfo() {
    const ariaHasPopupDefault = this.showSuggestions ? "true" : void 0;
    const ariaAutoCompleteDefault = this.showSuggestions ? "list" : void 0;
    const ariaDescribedBy = this._inputAccInfo.ariaDescribedBy ? `${this.suggestionsTextId} ${this.valueStateTextId} ${this._inputAccInfo.ariaDescribedBy}`.trim() : `${this.suggestionsTextId} ${this.valueStateTextId}`.trim();
    const info = {
      "input": {
        "ariaRoledescription": this._inputAccInfo && (this._inputAccInfo.ariaRoledescription || void 0),
        "ariaDescribedBy": ariaDescribedBy || void 0,
        "ariaInvalid": this.valueState === ValueState.Error ? "true" : void 0,
        "ariaHasPopup": this._inputAccInfo.ariaHasPopup ? this._inputAccInfo.ariaHasPopup : ariaHasPopupDefault,
        "ariaAutoComplete": this._inputAccInfo.ariaAutoComplete ? this._inputAccInfo.ariaAutoComplete : ariaAutoCompleteDefault,
        "role": this._inputAccInfo && this._inputAccInfo.role,
        "ariaControls": this._inputAccInfo && this._inputAccInfo.ariaControls,
        "ariaExpanded": this._inputAccInfo && this._inputAccInfo.ariaExpanded,
        "ariaDescription": this._inputAccInfo && this._inputAccInfo.ariaDescription,
        "ariaLabel": this._inputAccInfo && this._inputAccInfo.ariaLabel || this._accessibleLabelsRefTexts || this.accessibleName || this._associatedLabelsTexts || void 0
      }
    };
    return info;
  }
  get nativeInputAttributes() {
    return {
      "min": this.isTypeNumber ? this._nativeInputAttributes.min : void 0,
      "max": this.isTypeNumber ? this._nativeInputAttributes.max : void 0,
      "step": this.isTypeNumber ? this._nativeInputAttributes.step || "any" : void 0
    };
  }
  get ariaValueStateHiddenText() {
    if (!this.hasValueState) {
      return;
    }
    const valueState = this.valueState !== ValueState.None ? this.valueStateTypeMappings[this.valueState] : "";
    if (this.shouldDisplayDefaultValueStateMessage) {
      return this.valueStateText ? `${valueState} ${this.valueStateText}` : valueState;
    }
    return `${valueState}`.concat(" ", this.valueStateMessageText.map((el) => el.textContent).join(" "));
  }
  get itemSelectionAnnounce() {
    return this.Suggestions ? this.Suggestions.itemSelectionAnnounce : "";
  }
  get iconsCount() {
    const slottedIconsCount = this.icon ? this.icon.length : 0;
    const clearIconCount = Number(this.effectiveShowClearIcon) ?? 0;
    return slottedIconsCount + clearIconCount;
  }
  get classes() {
    return {
      popover: {
        "ui5-suggestions-popover": this.showSuggestions,
        "ui5-popover-with-value-state-header-phone": this._isPhone && this.showSuggestions && this.hasValueStateMessage,
        "ui5-popover-with-value-state-header": !this._isPhone && this.showSuggestions && this.hasValueStateMessage
      },
      popoverValueState: {
        "ui5-valuestatemessage-root": true,
        "ui5-valuestatemessage-header": true,
        "ui5-valuestatemessage--success": this.valueState === ValueState.Success,
        "ui5-valuestatemessage--error": this.valueState === ValueState.Error,
        "ui5-valuestatemessage--warning": this.valueState === ValueState.Warning,
        "ui5-valuestatemessage--information": this.valueState === ValueState.Information
      }
    };
  }
  get styles() {
    const remSizeIxPx = parseInt(getComputedStyle(document.documentElement).fontSize);
    const stylesObject = {
      popoverHeader: {
        "max-width": this._inputWidth ? `${this._inputWidth}px` : ""
      },
      suggestionPopoverHeader: {
        "display": this._listWidth === 0 ? "none" : "inline-block",
        "width": this._listWidth ? `${this._listWidth}px` : ""
      },
      suggestionsPopover: {
        "min-width": this._inputWidth ? `${this._inputWidth}px` : "",
        "max-width": this._inputWidth && this._inputWidth / remSizeIxPx > 40 ? `${this._inputWidth}px` : "40rem"
      },
      innerInput: {
        "padding": ""
      }
    };
    return stylesObject;
  }
  get suggestionSeparators() {
    return "None";
  }
  get valueStateMessageText() {
    return this.getSlottedNodes("valueStateMessage").map((el) => el.cloneNode(true));
  }
  get shouldDisplayOnlyValueStateMessage() {
    return this.hasValueStateMessage && !this.readonly && !this.open && this.focused;
  }
  get shouldDisplayDefaultValueStateMessage() {
    return !this.valueStateMessage.length && this.hasValueStateMessage;
  }
  get hasValueState() {
    return this.valueState !== ValueState.None;
  }
  get hasValueStateMessage() {
    return this.hasValueState && this.valueState !== ValueState.Success && (!this._inputIconFocused || !!(this._isPhone && this.Suggestions));
  }
  get valueStateText() {
    return this.valueState !== ValueState.None ? this.valueStateTextMappings()[this.valueState] : void 0;
  }
  get suggestionsText() {
    return Input_1.i18nBundle.getText(INPUT_SUGGESTIONS);
  }
  get availableSuggestionsCount() {
    if (this.showSuggestions && (this.value || this.Suggestions.isOpened())) {
      const nonGroupItems = this.suggestionObjects.filter((item) => !item.groupItem);
      switch (nonGroupItems.length) {
        case 0:
          return Input_1.i18nBundle.getText(INPUT_SUGGESTIONS_NO_HIT);
        case 1:
          return Input_1.i18nBundle.getText(INPUT_SUGGESTIONS_ONE_HIT);
        default:
          return Input_1.i18nBundle.getText(INPUT_SUGGESTIONS_MORE_HITS, nonGroupItems.length);
      }
    }
    return void 0;
  }
  get step() {
    return this.isTypeNumber ? "any" : void 0;
  }
  get _isPhone() {
    return isPhone();
  }
  get _isSuggestionsFocused() {
    return !this.focused && this.Suggestions && this.Suggestions.isOpened();
  }
  /**
   * Returns the placeholder value.
   * @protected
   */
  get _placeholder() {
    return this.placeholder;
  }
  /**
   * This method is relevant for sap_horizon theme only
   */
  get _valueStateInputIcon() {
    const iconPerValueState = {
      Error: `<path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20ZM7.70711 13.7071C7.31658 14.0976 6.68342 14.0976 6.29289 13.7071C5.90237 13.3166 5.90237 12.6834 6.29289 12.2929L8.58579 10L6.29289 7.70711C5.90237 7.31658 5.90237 6.68342 6.29289 6.29289C6.68342 5.90237 7.31658 5.90237 7.70711 6.29289L10 8.58579L12.2929 6.29289C12.6834 5.90237 13.3166 5.90237 13.7071 6.29289C14.0976 6.68342 14.0976 7.31658 13.7071 7.70711L11.4142 10L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L10 11.4142L7.70711 13.7071Z" fill="#EE3939"/>`,
      Warning: `<path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M11.8619 0.49298C11.6823 0.187541 11.3544 0 11 0C10.6456 0 10.3177 0.187541 10.1381 0.49298L0.138066 17.493C-0.0438112 17.8022 -0.0461447 18.1851 0.13195 18.4965C0.310046 18.8079 0.641283 19 1 19H21C21.3587 19 21.69 18.8079 21.868 18.4965C22.0461 18.1851 22.0438 17.8022 21.8619 17.493L11.8619 0.49298ZM11 6C11.5523 6 12 6.44772 12 7V10C12 10.5523 11.5523 11 11 11C10.4477 11 10 10.5523 10 10V7C10 6.44772 10.4477 6 11 6ZM11 16C11.8284 16 12.5 15.3284 12.5 14.5C12.5 13.6716 11.8284 13 11 13C10.1716 13 9.5 13.6716 9.5 14.5C9.5 15.3284 10.1716 16 11 16Z" fill="#F58B00"/>`,
      Success: `<path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10ZM14.7071 6.29289C14.3166 5.90237 13.6834 5.90237 13.2929 6.29289L8 11.5858L6.70711 10.2929C6.31658 9.90237 5.68342 9.90237 5.29289 10.2929C4.90237 10.6834 4.90237 11.3166 5.29289 11.7071L7.29289 13.7071C7.68342 14.0976 8.31658 14.0976 8.70711 13.7071L14.7071 7.70711C15.0976 7.31658 15.0976 6.68342 14.7071 6.29289Z" fill="#36A41D"/>`,
      Information: `<path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M3 0C1.34315 0 0 1.34315 0 3V15C0 16.6569 1.34315 18 3 18H15C16.6569 18 18 16.6569 18 15V3C18 1.34315 16.6569 0 15 0H3ZM9 6.5C9.82843 6.5 10.5 5.82843 10.5 5C10.5 4.17157 9.82843 3.5 9 3.5C8.17157 3.5 7.5 4.17157 7.5 5C7.5 5.82843 8.17157 6.5 9 6.5ZM9 8.5C9.55228 8.5 10 8.94772 10 9.5V13.5C10 14.0523 9.55228 14.5 9 14.5C8.44771 14.5 8 14.0523 8 13.5V9.5C8 8.94772 8.44771 8.5 9 8.5Z" fill="#1B90FF"/>`
    };
    if (this.valueState !== ValueState.None) {
      return `
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 20 20" fill="none">
				${iconPerValueState[this.valueState]};
			</svg>
			`;
    }
    return "";
  }
  get _valueStatePopoverHorizontalAlign() {
    return this.effectiveDir !== "rtl" ? "Left" : "Right";
  }
  /**
   * This method is relevant for sap_horizon theme only
   */
  get _valueStateMessageInputIcon() {
    const iconPerValueState = {
      Error: "error",
      Warning: "alert",
      Success: "sys-enter-2",
      Information: "information"
    };
    return this.valueState !== ValueState.None ? iconPerValueState[this.valueState] : "";
  }
  /**
   * Returns the caret position inside the native input
   * @protected
   */
  getCaretPosition() {
    return getCaretPosition(this.nativeInput);
  }
  /**
   * Sets the caret to a certain position inside the native input
   * @protected
   * @param pos
   */
  setCaretPosition(pos) {
    setCaretPosition(this.nativeInput, pos);
  }
  /**
   * Removes the fractional part of floating-point number.
   * @param {string} value the numeric value of Input of type "Number"
   */
  removeFractionalPart(value) {
    if (value.includes(".")) {
      return value.slice(0, value.indexOf("."));
    }
    if (value.includes(",")) {
      return value.slice(0, value.indexOf(","));
    }
    return value;
  }
  static async onDefine() {
    const Suggestions = getFeature("InputSuggestions");
    [Input_1.i18nBundle] = await Promise.all([
      getI18nBundle("@ui5/webcomponents"),
      Suggestions ? Suggestions.init() : Promise.resolve()
    ]);
  }
};
__decorate([
  property({ type: Boolean })
], Input.prototype, "disabled", void 0);
__decorate([
  property({ type: Boolean })
], Input.prototype, "highlight", void 0);
__decorate([
  property()
], Input.prototype, "placeholder", void 0);
__decorate([
  property({ type: Boolean })
], Input.prototype, "readonly", void 0);
__decorate([
  property({ type: Boolean })
], Input.prototype, "required", void 0);
__decorate([
  property({ type: Boolean })
], Input.prototype, "noTypeahead", void 0);
__decorate([
  property({ type: InputType$1, defaultValue: InputType$1.Text })
], Input.prototype, "type", void 0);
__decorate([
  property()
], Input.prototype, "value", void 0);
__decorate([
  property({ noAttribute: true })
], Input.prototype, "_innerValue", void 0);
__decorate([
  property({ type: ValueState, defaultValue: ValueState.None })
], Input.prototype, "valueState", void 0);
__decorate([
  property()
], Input.prototype, "name", void 0);
__decorate([
  property({ type: Boolean })
], Input.prototype, "showSuggestions", void 0);
__decorate([
  property({ validator: Integer })
], Input.prototype, "maxlength", void 0);
__decorate([
  property()
], Input.prototype, "accessibleName", void 0);
__decorate([
  property({ defaultValue: "" })
], Input.prototype, "accessibleNameRef", void 0);
__decorate([
  property({ type: Boolean })
], Input.prototype, "showClearIcon", void 0);
__decorate([
  property({ type: Boolean })
], Input.prototype, "effectiveShowClearIcon", void 0);
__decorate([
  property({ type: Boolean })
], Input.prototype, "focused", void 0);
__decorate([
  property({ type: Boolean })
], Input.prototype, "openOnMobile", void 0);
__decorate([
  property({ type: Boolean })
], Input.prototype, "open", void 0);
__decorate([
  property({ type: Boolean })
], Input.prototype, "_forceOpen", void 0);
__decorate([
  property({ type: Boolean })
], Input.prototype, "_isValueStateFocused", void 0);
__decorate([
  property({ type: Object, noAttribute: true })
], Input.prototype, "_inputAccInfo", void 0);
__decorate([
  property({ type: Object, noAttribute: true })
], Input.prototype, "_nativeInputAttributes", void 0);
__decorate([
  property({ validator: Integer })
], Input.prototype, "_inputWidth", void 0);
__decorate([
  property({ validator: Integer })
], Input.prototype, "_listWidth", void 0);
__decorate([
  property({ type: Boolean, noAttribute: true })
], Input.prototype, "_isPopoverOpen", void 0);
__decorate([
  property({ type: Boolean, noAttribute: true })
], Input.prototype, "_inputIconFocused", void 0);
__decorate([
  property({ type: String, noAttribute: true, defaultValue: void 0 })
], Input.prototype, "_associatedLabelsTexts", void 0);
__decorate([
  property({ type: String, noAttribute: true, defaultValue: void 0 })
], Input.prototype, "_accessibleLabelsRefTexts", void 0);
__decorate([
  slot({ type: HTMLElement, "default": true })
], Input.prototype, "suggestionItems", void 0);
__decorate([
  slot()
], Input.prototype, "icon", void 0);
__decorate([
  slot()
], Input.prototype, "formSupport", void 0);
__decorate([
  slot({
    type: HTMLElement,
    invalidateOnChildChange: true,
    cloned: true
  })
], Input.prototype, "valueStateMessage", void 0);
Input = Input_1 = __decorate([
  customElement({
    tag: "ui5-input",
    languageAware: true,
    renderer: litRender,
    template: block0$1,
    staticAreaTemplate: block0,
    styles: styleData$3,
    staticAreaStyles: [styleData$2, styleData$1, styleData],
    get dependencies() {
      const Suggestions = getFeature("InputSuggestions");
      return [Popover, Icon].concat(Suggestions ? Suggestions.dependencies : []);
    }
  }),
  event("change"),
  event("input"),
  event("suggestion-item-select", {
    detail: {
      item: { type: HTMLElement }
    }
  }),
  event("suggestion-item-preview", {
    detail: {
      item: { type: HTMLElement },
      targetRef: { type: HTMLElement }
    }
  }),
  event("suggestion-scroll", {
    detail: {
      scrollTop: { type: Integer },
      scrollContainer: { type: HTMLElement }
    }
  })
], Input);
Input.define();
