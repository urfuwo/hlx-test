/**
 * Different calendar types.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.base.types.CalendarType
 */
var CalendarType;
(function (CalendarType) {
    /**
     * @public
     * @type {Gregorian}
     */
    CalendarType["Gregorian"] = "Gregorian";
    /**
     * @public
     * @type {Islamic}
     */
    CalendarType["Islamic"] = "Islamic";
    /**
     * @public
     * @type {Japanese}
     */
    CalendarType["Japanese"] = "Japanese";
    /**
     * @public
     * @type {Buddhist}
     */
    CalendarType["Buddhist"] = "Buddhist";
    /**
     * @public
     * @type {Persian}
     */
    CalendarType["Persian"] = "Persian";
})(CalendarType || (CalendarType = {}));
export default CalendarType;
//# sourceMappingURL=CalendarType.js.map