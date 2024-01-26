/**
 * Different link designs.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.LinkDesign
 */
var LinkDesign;
(function (LinkDesign) {
    /**
     * default type (no special styling)
     * @public
     * @type {Default}
     */
    LinkDesign["Default"] = "Default";
    /**
     * subtle type (appears as regular text, rather than a link)
     * @public
     * @type {Subtle}
     */
    LinkDesign["Subtle"] = "Subtle";
    /**
     * emphasized type
     * @public
     * @type {Emphasized}
     */
    LinkDesign["Emphasized"] = "Emphasized";
})(LinkDesign || (LinkDesign = {}));
export default LinkDesign;
//# sourceMappingURL=LinkDesign.js.map