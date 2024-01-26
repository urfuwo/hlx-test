/**
 * Defines which pickers the calendar is allowed to show - day/month/year, only month/year, or only year.
 *
 * @class
 * @enum {string}
 * @private
 * @author SAP SE
 * @alias sap.ui.webc.main.types.CalendarPickersMode
 */
var CalendarPickersMode;
(function (CalendarPickersMode) {
    /**
     * User can select days, months and years
     * @public
     * @type {DAY_MONTH_YEAR}
     */
    CalendarPickersMode["DAY_MONTH_YEAR"] = "DAY_MONTH_YEAR";
    /**
     * User can select months and years
     * @public
     * @type {MONTH_YEAR}
     */
    CalendarPickersMode["MONTH_YEAR"] = "MONTH_YEAR";
    /**
     * User can select years
     * @public
     * @type {MONTH_YEAR}
     */
    CalendarPickersMode["YEAR"] = "YEAR";
})(CalendarPickersMode || (CalendarPickersMode = {}));
export default CalendarPickersMode;
//# sourceMappingURL=CalendarPickersMode.js.map