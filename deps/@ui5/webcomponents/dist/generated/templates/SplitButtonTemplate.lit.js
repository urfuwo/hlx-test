/* eslint no-unused-vars: 0 */
import { html, ifDefined, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
function block0(context, tags, suffix) { return suffix ? html `<div class="ui5-split-button-root" role="group" tabindex=${ifDefined(this._tabIndex)} aria-labelledby="${ifDefined(this._id)}-invisibleTextDefault ${ifDefined(this._id)}-invisibleText" @focusout=${this._onFocusOut} @focusin=${this._onFocusIn} @keydown=${this._onKeyDown} @keyup=${this._onKeyUp}><${scopeTag("ui5-button", tags, suffix)} class="ui5-split-text-button" design="${ifDefined(this.design)}" dir=${ifDefined(this.effectiveDir)} icon="${ifDefined(this._textButtonIcon)}" tabindex="-1" ?disabled="${this.disabled}" ?active="${this._textButtonActive}" @click="${this._handleMouseClick}" @touchstart=${this._textButtonPress} @mousedown=${this._textButtonPress} @mouseup=${this._textButtonRelease} @focusin=${this._textButtonFocusIn} @focusout=${this._onFocusOut}>${this.isTextButton ? block1.call(this, context, tags, suffix) : undefined}</${scopeTag("ui5-button", tags, suffix)}><div class="ui5-split-arrow-button-wrapper" dir=${ifDefined(this.effectiveDir)}><${scopeTag("ui5-button", tags, suffix)} class="ui5-split-arrow-button" design="${ifDefined(this.design)}" icon="slim-arrow-down" tabindex="-1" ?disabled="${this.disabled}" ?active="${this.effectiveActiveArrowButton}" aria-expanded="${ifDefined(this.accessibilityInfo.ariaExpanded)}" aria-haspopup="${ifDefined(this.accessibilityInfo.ariaHaspopup)}" @click="${this._handleArrowButtonAction}" @mousedown=${this._arrowButtonPress} @mouseup=${this._arrowButtonRelease} @focusin=${this._setTabIndexValue} @ui5-_active-state-change=${ifDefined(this._onArrowButtonActiveStateChange)}></${scopeTag("ui5-button", tags, suffix)}></div><span id="${ifDefined(this._id)}-invisibleText" class="ui5-hidden-text">${ifDefined(this.accessibilityInfo.description)}${ifDefined(this.accessibilityInfo.keyboardHint)}${ifDefined(this.accessibleName)}</span><span id="${ifDefined(this._id)}-invisibleTextDefault" class="ui5-hidden-text">${ifDefined(this.textButtonAccText)}</span></div>` : html `<div class="ui5-split-button-root" role="group" tabindex=${ifDefined(this._tabIndex)} aria-labelledby="${ifDefined(this._id)}-invisibleTextDefault ${ifDefined(this._id)}-invisibleText" @focusout=${this._onFocusOut} @focusin=${this._onFocusIn} @keydown=${this._onKeyDown} @keyup=${this._onKeyUp}><ui5-button class="ui5-split-text-button" design="${ifDefined(this.design)}" dir=${ifDefined(this.effectiveDir)} icon="${ifDefined(this._textButtonIcon)}" tabindex="-1" ?disabled="${this.disabled}" ?active="${this._textButtonActive}" @click="${this._handleMouseClick}" @touchstart=${this._textButtonPress} @mousedown=${this._textButtonPress} @mouseup=${this._textButtonRelease} @focusin=${this._textButtonFocusIn} @focusout=${this._onFocusOut}>${this.isTextButton ? block1.call(this, context, tags, suffix) : undefined}</ui5-button><div class="ui5-split-arrow-button-wrapper" dir=${ifDefined(this.effectiveDir)}><ui5-button class="ui5-split-arrow-button" design="${ifDefined(this.design)}" icon="slim-arrow-down" tabindex="-1" ?disabled="${this.disabled}" ?active="${this.effectiveActiveArrowButton}" aria-expanded="${ifDefined(this.accessibilityInfo.ariaExpanded)}" aria-haspopup="${ifDefined(this.accessibilityInfo.ariaHaspopup)}" @click="${this._handleArrowButtonAction}" @mousedown=${this._arrowButtonPress} @mouseup=${this._arrowButtonRelease} @focusin=${this._setTabIndexValue} @ui5-_active-state-change=${ifDefined(this._onArrowButtonActiveStateChange)}></ui5-button></div><span id="${ifDefined(this._id)}-invisibleText" class="ui5-hidden-text">${ifDefined(this.accessibilityInfo.description)}${ifDefined(this.accessibilityInfo.keyboardHint)}${ifDefined(this.accessibleName)}</span><span id="${ifDefined(this._id)}-invisibleTextDefault" class="ui5-hidden-text">${ifDefined(this.textButtonAccText)}</span></div>`; }
function block1(context, tags, suffix) { return html `<slot></slot>`; }
export default block0;
//# sourceMappingURL=SplitButtonTemplate.lit.js.map