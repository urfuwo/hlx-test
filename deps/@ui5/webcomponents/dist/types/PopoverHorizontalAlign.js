/**
 * Popover horizontal align types.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.PopoverHorizontalAlign
 */
var PopoverHorizontalAlign;
(function (PopoverHorizontalAlign) {
    /**
     * Popover is centered.
     * @public
     * @type {Center}
     */
    PopoverHorizontalAlign["Center"] = "Center";
    /**
     * Popover is aligned with the left side of the target. When direction is RTL, it is right aligned.
     * @public
     * @type {Left}
     */
    PopoverHorizontalAlign["Left"] = "Left";
    /**
     * Popover is aligned with the right side of the target. When direction is RTL, it is left aligned.
     * @public
     * @type {Right}
     */
    PopoverHorizontalAlign["Right"] = "Right";
    /**
     * Popover is stretched.
     * @public
     * @type {Stretch}
     */
    PopoverHorizontalAlign["Stretch"] = "Stretch";
})(PopoverHorizontalAlign || (PopoverHorizontalAlign = {}));
export default PopoverHorizontalAlign;
//# sourceMappingURL=PopoverHorizontalAlign.js.map