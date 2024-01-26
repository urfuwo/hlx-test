import DataType from "./DataType.js";
/**
 * @class
 * Integer data type.
 *
 * @constructor
 * @extends sap.ui.webc.base.types.DataType
 * @author SAP SE
 * @alias sap.ui.webc.base.types.Integer
 * @public
 */
class Integer extends DataType {
    static isValid(value) {
        return Number.isInteger(value);
    }
    static attributeToProperty(attributeValue) {
        return parseInt(attributeValue);
    }
}
export default Integer;
//# sourceMappingURL=Integer.js.map