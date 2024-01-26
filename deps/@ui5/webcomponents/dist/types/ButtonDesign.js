/**
 * Different Button designs.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.ButtonDesign
 */
var ButtonDesign;
(function (ButtonDesign) {
    /**
     * default type (no special styling)
     * @public
     * @type {Default}
     */
    ButtonDesign["Default"] = "Default";
    /**
     * accept type (green button)
     * @public
     * @type {Positive}
     */
    ButtonDesign["Positive"] = "Positive";
    /**
     * reject style (red button)
     * @public
     * @type {Negative}
     */
    ButtonDesign["Negative"] = "Negative";
    /**
     * transparent type
     * @public
     * @type {Transparent}
     */
    ButtonDesign["Transparent"] = "Transparent";
    /**
     * emphasized type
     * @public
     * @type {Emphasized}
     */
    ButtonDesign["Emphasized"] = "Emphasized";
    /**
     * attention type
     * @public
     * @type {Attention}
     */
    ButtonDesign["Attention"] = "Attention";
})(ButtonDesign || (ButtonDesign = {}));
export default ButtonDesign;
//# sourceMappingURL=ButtonDesign.js.map