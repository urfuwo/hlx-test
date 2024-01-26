import { PropertyValue } from "../UI5ElementMetadata.js";
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
declare class Integer extends DataType {
    static isValid(value: any): boolean;
    static attributeToProperty(attributeValue: string): PropertyValue;
}
export default Integer;
