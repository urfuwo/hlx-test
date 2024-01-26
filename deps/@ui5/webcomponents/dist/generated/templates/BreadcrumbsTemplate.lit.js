/* eslint no-unused-vars: 0 */
import { html, repeat, ifDefined, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
function block0(context, tags, suffix) { return suffix ? html `<nav class="ui5-breadcrumbs-root" aria-label="${ifDefined(this._accessibleNameText)}"><ol @focusin="${this._onfocusin}" @keydown="${this._onkeydown}" @keyup="${this._onkeyup}"><li class="ui5-breadcrumbs-dropdown-arrow-link-wrapper" ?hidden="${this._isOverflowEmpty}"><${scopeTag("ui5-link", tags, suffix)} @ui5-click="${ifDefined(this._openRespPopover)}" accessible-role="button" aria-label="${ifDefined(this._dropdownArrowAccessibleNameText)}" aria-haspopup="${ifDefined(this._ariaHasPopup)}"><${scopeTag("ui5-icon", tags, suffix)} name="slim-arrow-down" title="${ifDefined(this._dropdownArrowAccessibleNameText)}"></${scopeTag("ui5-icon", tags, suffix)}></${scopeTag("ui5-link", tags, suffix)}></li>${repeat(this._linksData, (item, index) => item._id || index, (item, index) => block1.call(this, context, tags, suffix, item, index))}${this._endsWithCurrentLocationLabel ? block2.call(this, context, tags, suffix) : undefined}</ol></nav>` : html `<nav class="ui5-breadcrumbs-root" aria-label="${ifDefined(this._accessibleNameText)}"><ol @focusin="${this._onfocusin}" @keydown="${this._onkeydown}" @keyup="${this._onkeyup}"><li class="ui5-breadcrumbs-dropdown-arrow-link-wrapper" ?hidden="${this._isOverflowEmpty}"><ui5-link @ui5-click="${ifDefined(this._openRespPopover)}" accessible-role="button" aria-label="${ifDefined(this._dropdownArrowAccessibleNameText)}" aria-haspopup="${ifDefined(this._ariaHasPopup)}"><ui5-icon name="slim-arrow-down" title="${ifDefined(this._dropdownArrowAccessibleNameText)}"></ui5-icon></ui5-link></li>${repeat(this._linksData, (item, index) => item._id || index, (item, index) => block1.call(this, context, tags, suffix, item, index))}${this._endsWithCurrentLocationLabel ? block2.call(this, context, tags, suffix) : undefined}</ol></nav>`; }
function block1(context, tags, suffix, item, index) { return suffix ? html `<li class="ui5-breadcrumbs-link-wrapper" id="${ifDefined(item._id)}-link-wrapper"><${scopeTag("ui5-link", tags, suffix)} @ui5-click="${ifDefined(this._onLinkPress)}" href="${ifDefined(item.href)}" target="${ifDefined(item.target)}" id="${ifDefined(item._id)}-link" accessible-name="${ifDefined(item._accessibleNameText)}" data-ui5-stable="${ifDefined(item.stableDomRef)}">${ifDefined(item.innerText)}</${scopeTag("ui5-link", tags, suffix)}></li>` : html `<li class="ui5-breadcrumbs-link-wrapper" id="${ifDefined(item._id)}-link-wrapper"><ui5-link @ui5-click="${ifDefined(this._onLinkPress)}" href="${ifDefined(item.href)}" target="${ifDefined(item.target)}" id="${ifDefined(item._id)}-link" accessible-name="${ifDefined(item._accessibleNameText)}" data-ui5-stable="${ifDefined(item.stableDomRef)}">${ifDefined(item.innerText)}</ui5-link></li>`; }
function block2(context, tags, suffix) { return suffix ? html `<li class="ui5-breadcrumbs-current-location" @click="${this._onLabelPress}"><span aria-current="page" aria-label="${ifDefined(this._currentLocationAccName)}" role="link" id="${ifDefined(this._id)}-labelWrapper"><${scopeTag("ui5-label", tags, suffix)}>${ifDefined(this._currentLocationText)}</${scopeTag("ui5-label", tags, suffix)}></span></li>` : html `<li class="ui5-breadcrumbs-current-location" @click="${this._onLabelPress}"><span aria-current="page" aria-label="${ifDefined(this._currentLocationAccName)}" role="link" id="${ifDefined(this._id)}-labelWrapper"><ui5-label>${ifDefined(this._currentLocationText)}</ui5-label></span></li>`; }
export default block0;
//# sourceMappingURL=BreadcrumbsTemplate.lit.js.map