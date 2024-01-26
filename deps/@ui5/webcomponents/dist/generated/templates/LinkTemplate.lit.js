/* eslint no-unused-vars: 0 */
import { html, ifDefined } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
function block0(context, tags, suffix) { return html `<a class="ui5-link-root" role="${ifDefined(this.effectiveAccRole)}" href="${ifDefined(this.parsedRef)}" target="${ifDefined(this.target)}" rel="${ifDefined(this._rel)}" tabindex="${ifDefined(this.effectiveTabIndex)}" title="${ifDefined(this.title)}" ?disabled="${this.disabled}" aria-label="${ifDefined(this.ariaLabelText)}" aria-haspopup="${ifDefined(this.accessibilityAttributes.hasPopup)}" aria-expanded="${ifDefined(this.accessibilityAttributes.expanded)}" @focusin=${this._onfocusin} @focusout=${this._onfocusout} @click=${this._onclick} @keydown=${this._onkeydown} @keyup=${this._onkeyup}><slot></slot>${this.hasLinkType ? block1.call(this, context, tags, suffix) : undefined}</a>`; }
function block1(context, tags, suffix) { return html `<span class="ui5-hidden-text">${ifDefined(this.linkTypeText)}</span>`; }
export default block0;
//# sourceMappingURL=LinkTemplate.lit.js.map