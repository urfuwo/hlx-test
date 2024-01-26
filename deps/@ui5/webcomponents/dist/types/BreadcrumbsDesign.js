/**
 * Different  Breadcrumbs designs.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.BreadcrumbsDesign
 */
var BreadcrumbsDesign;
(function (BreadcrumbsDesign) {
    /**
     * Shows the current page as the last item in the trail.
     * The last item contains only plain text and is not a link.
     *
     * @public
     * @type {Standard}
     */
    BreadcrumbsDesign["Standard"] = "Standard";
    /**
     * All items are displayed as links.
     * @public
     * @type {NoCurrentPage}
     */
    BreadcrumbsDesign["NoCurrentPage"] = "NoCurrentPage";
})(BreadcrumbsDesign || (BreadcrumbsDesign = {}));
export default BreadcrumbsDesign;
//# sourceMappingURL=BreadcrumbsDesign.js.map