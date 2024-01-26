/**
 * Different list modes.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.ListMode
 */
var ListMode;
(function (ListMode) {
    /**
     * Default mode (no selection).
     * @public
     * @type {None}
     */
    ListMode["None"] = "None";
    /**
     * Right-positioned single selection mode (only one list item can be selected).
     * @public
     * @type {SingleSelect}
     */
    ListMode["SingleSelect"] = "SingleSelect";
    /**
     * Left-positioned single selection mode (only one list item can be selected).
     * @public
     * @type {SingleSelectBegin}
     */
    ListMode["SingleSelectBegin"] = "SingleSelectBegin";
    /**
     * Selected item is highlighted but no selection element is visible
     * (only one list item can be selected).
     * @public
     * @type {SingleSelectEnd}
     */
    ListMode["SingleSelectEnd"] = "SingleSelectEnd";
    /**
     * Selected item is highlighted and selection is changed upon arrow navigation
     * (only one list item can be selected - this is always the focused item).
     * @public
     * @type {SingleSelectAuto}
     */
    ListMode["SingleSelectAuto"] = "SingleSelectAuto";
    /**
     * Multi selection mode (more than one list item can be selected).
     * @public
     * @type {MultiSelect}
     */
    ListMode["MultiSelect"] = "MultiSelect";
    /**
     * Delete mode (only one list item can be deleted via provided delete button)
     * @public
     * @type {Delete}
     */
    ListMode["Delete"] = "Delete";
})(ListMode || (ListMode = {}));
export default ListMode;
//# sourceMappingURL=ListMode.js.map