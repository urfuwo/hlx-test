import DataType from "./DataType.js";
/**
 * @class
 * CSSSize data type.
 *
 * @extends sap.ui.webc.base.types.DataType
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.base.types.CSSSize
 * @public
 */
declare class CSSSize extends DataType {
    static isValid(value: string): boolean;
}
export default CSSSize;
