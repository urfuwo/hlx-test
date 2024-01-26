/**
 * Defines the priority of the toolbar item to go inside overflow popover.
 *
 * @readonly
 * @enum {string}
 * @public
 * @type {string}
 * @author SAP SE
 * @alias sap.ui.webc.main.types.ToolbarItemOverflowBehavior
 */
var ToolbarItemOverflowBehavior;
(function (ToolbarItemOverflowBehavior) {
    /**
     * The item is presented inside the toolbar and goes in the popover, when there is not enough space.
     * @public
     * @type {Default}
     */
    ToolbarItemOverflowBehavior["Default"] = "Default";
    /**
     * When set, the item will never go to the overflow popover.
     * @public
     * @type {NeverOverflow}
     */
    ToolbarItemOverflowBehavior["NeverOverflow"] = "NeverOverflow";
    /**
     * @public
     * When set, the item will be always part of the overflow part of ui5-toolbar.
     * @type {AlwaysOverflow}
     */
    ToolbarItemOverflowBehavior["AlwaysOverflow"] = "AlwaysOverflow";
})(ToolbarItemOverflowBehavior || (ToolbarItemOverflowBehavior = {}));
export default ToolbarItemOverflowBehavior;
//# sourceMappingURL=ToolbarItemOverflowBehavior.js.map