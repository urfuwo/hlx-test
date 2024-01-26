/**
 * Different table growing modes.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.TableGrowingMode
 */
var TableGrowingMode;
(function (TableGrowingMode) {
    /**
     * Component <code>load-more</code> is fired
     * upon pressing a "More" button at the bottom.
     * @public
     * @type {Button}
     */
    TableGrowingMode["Button"] = "Button";
    /**
     * Component <code>load-more</code> is fired upon scroll.
     * @public
     * @type {Scroll}
     */
    TableGrowingMode["Scroll"] = "Scroll";
    /**
     * Component growing is not enabled.
     * @public
     * @type {None}
     */
    TableGrowingMode["None"] = "None";
})(TableGrowingMode || (TableGrowingMode = {}));
export default TableGrowingMode;
//# sourceMappingURL=TableGrowingMode.js.map