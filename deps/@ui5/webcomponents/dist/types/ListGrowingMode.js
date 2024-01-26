/**
 * Different list growing modes.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.ListGrowingMode
 */
var ListGrowingMode;
(function (ListGrowingMode) {
    /**
     * Component's "load-more" is fired upon pressing a "More" button.
     * at the bottom.
     * @public
     * @type {Button}
     */
    ListGrowingMode["Button"] = "Button";
    /**
     * Component's "load-more" is fired upon scroll.
     * @public
     * @type {Scroll}
     */
    ListGrowingMode["Scroll"] = "Scroll";
    /**
     * Component's growing is not enabled.
     * @public
     * @type {None}
     */
    ListGrowingMode["None"] = "None";
})(ListGrowingMode || (ListGrowingMode = {}));
export default ListGrowingMode;
//# sourceMappingURL=ListGrowingMode.js.map