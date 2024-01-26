var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-breadcrumbs-item</code> component defines the content of an item in <code>ui5-breadcrumbs</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.BreadcrumbsItem
 * @extends sap.ui.webc.base.UI5Element
 * @abstract
 * @tagname ui5-breadcrumbs-item
 * @implements sap.ui.webc.main.IBreadcrumbsItem
 * @public
 * @since 1.0.0-rc.15
 */
let BreadcrumbsItem = class BreadcrumbsItem extends UI5Element {
    get stableDomRef() {
        return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
    }
};
__decorate([
    property()
], BreadcrumbsItem.prototype, "href", void 0);
__decorate([
    property({ defaultValue: undefined })
], BreadcrumbsItem.prototype, "target", void 0);
__decorate([
    property()
], BreadcrumbsItem.prototype, "accessibleName", void 0);
__decorate([
    slot({ type: Node, "default": true })
], BreadcrumbsItem.prototype, "text", void 0);
BreadcrumbsItem = __decorate([
    customElement("ui5-breadcrumbs-item")
], BreadcrumbsItem);
BreadcrumbsItem.define();
export default BreadcrumbsItem;
//# sourceMappingURL=BreadcrumbsItem.js.map