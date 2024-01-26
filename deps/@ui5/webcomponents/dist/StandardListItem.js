var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import ListItem from "./ListItem.js";
import Icon from "./Icon.js";
import Avatar from "./Avatar.js";
import WrappingType from "./types/WrappingType.js";
import StandardListItemTemplate from "./generated/templates/StandardListItemTemplate.lit.js";
/**
 * @class
 * The <code>ui5-li</code> represents the simplest type of item for a <code>ui5-list</code>.
 *
 * This is a list item,
 * providing the most common use cases such as <code>text</code>,
 * <code>image</code> and <code>icon</code>.
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-li</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>title - Used to style the title of the list item</li>
 * <li>description - Used to style the description of the list item</li>
 * <li>additional-text - Used to style the additionalText of the list item</li>
 * <li>icon - Used to style the icon of the list item</li>
 * <li>native-li - Used to style the main li tag of the list item</li>
 * <li>content - Used to style the content area of the list item</li>
 * <li>detail-button - Used to style the button rendered when the list item is of type detail</li>
 * <li>delete-button - Used to style the button rendered when the list item is in delete mode</li>
 * <li>radio - Used to style the radio button rendered when the list item is in single selection mode</li>
 * <li>checkbox - Used to style the checkbox rendered when the list item is in multiple selection mode</li>
 * </ul>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.StandardListItem
 * @extends sap.ui.webc.main.ListItem
 * @tagname ui5-li
 * @implements sap.ui.webc.main.IListItem
 * @public
 */
let StandardListItem = class StandardListItem extends ListItem {
    onBeforeRendering() {
        super.onBeforeRendering();
        this.hasTitle = !!this.textContent;
        this._hasImageContent = this.hasImageContent;
    }
    get displayImage() {
        return !!this.image;
    }
    get displayIconBegin() {
        return !!(this.icon && !this.iconEnd);
    }
    get displayIconEnd() {
        return !!(this.icon && this.iconEnd);
    }
    get hasImageContent() {
        return !!this.imageContent.length;
    }
};
__decorate([
    property()
], StandardListItem.prototype, "description", void 0);
__decorate([
    property()
], StandardListItem.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean })
], StandardListItem.prototype, "iconEnd", void 0);
__decorate([
    property()
], StandardListItem.prototype, "image", void 0);
__decorate([
    property()
], StandardListItem.prototype, "additionalText", void 0);
__decorate([
    property({ type: ValueState, defaultValue: ValueState.None })
], StandardListItem.prototype, "additionalTextState", void 0);
__decorate([
    property()
], StandardListItem.prototype, "accessibleName", void 0);
__decorate([
    property({ type: WrappingType, defaultValue: WrappingType.None })
], StandardListItem.prototype, "wrappingType", void 0);
__decorate([
    property({ type: Boolean })
], StandardListItem.prototype, "hasTitle", void 0);
__decorate([
    property({ type: Boolean })
], StandardListItem.prototype, "_hasImageContent", void 0);
__decorate([
    slot()
], StandardListItem.prototype, "imageContent", void 0);
StandardListItem = __decorate([
    customElement({
        tag: "ui5-li",
        template: StandardListItemTemplate,
        dependencies: [
            ...ListItem.dependencies,
            Icon,
            Avatar,
        ],
    })
], StandardListItem);
StandardListItem.define();
export default StandardListItem;
//# sourceMappingURL=StandardListItem.js.map