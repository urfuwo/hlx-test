/**
 * Determines if the button has special form-related functionality.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.ButtonType
 */
var ButtonType;
(function (ButtonType) {
    /**
     * The button does not do anything special when inside a form
     * @public
     * @type {Button}
     */
    ButtonType["Button"] = "Button";
    /**
     * The button acts as a submit button (submits a form)
     * @public
     * @type {Submit}
     */
    ButtonType["Submit"] = "Submit";
    /**
     * The button acts as a reset button (resets a form)
     * @public
     * @type {Reset}
     */
    ButtonType["Reset"] = "Reset";
})(ButtonType || (ButtonType = {}));
export default ButtonType;
//# sourceMappingURL=ButtonType.js.map