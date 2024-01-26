/* eslint no-unused-vars: 0 */
import { html, ifDefined, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
function block0(context, tags, suffix) { return html `<div tabindex="${ifDefined(this._tabIndex)}" @click="${this._handleSelect}" @focusin="${this._focusin}" @focusout="${this._focusout}" @keydown="${this._keydown}" class="ui5-token--wrapper" role="option" aria-selected="${ifDefined(this.selected)}"><span class="ui5-token--text">${ifDefined(this.text)}</span>${!this.readonly ? block1.call(this, context, tags, suffix) : undefined}</div>`; }
function block1(context, tags, suffix) { return html `<div class="ui5-token--icon">${this.closeIcon.length ? block2.call(this, context, tags, suffix) : block3.call(this, context, tags, suffix)}</div>`; }
function block2(context, tags, suffix) { return html `<slot name="closeIcon" @click="${this._delete}"></slot>`; }
function block3(context, tags, suffix) { return suffix ? html `<${scopeTag("ui5-icon", tags, suffix)} name="${ifDefined(this.iconURI)}" accessible-name="${ifDefined(this.tokenDeletableText)}" show-tooltip @click="${this._delete}"></${scopeTag("ui5-icon", tags, suffix)}>` : html `<ui5-icon name="${ifDefined(this.iconURI)}" accessible-name="${ifDefined(this.tokenDeletableText)}" show-tooltip @click="${this._delete}"></ui5-icon>`; }
export default block0;
//# sourceMappingURL=TokenTemplate.lit.js.map