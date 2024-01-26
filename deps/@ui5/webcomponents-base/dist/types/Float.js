import DataType from "./DataType.js";
/**
 * @class
 * Float data type.
 *
 * @constructor
 * @extends sap.ui.webc.base.types.DataType
 * @author SAP SE
 * @alias sap.ui.webc.base.types.Float
 * @public
 */
class Float extends DataType {
    static isValid(value) {
        return Number(value) === value;
    }
    static attributeToProperty(attributeValue) {
        return parseFloat(attributeValue);
    }
}
export default Float;
//# sourceMappingURL=Float.js.map