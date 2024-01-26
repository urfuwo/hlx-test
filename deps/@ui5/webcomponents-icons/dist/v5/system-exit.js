import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "system-exit";
const pathData = "M256 512q-53 0-100-20t-81.5-54.5T20 356 0 256t20-100 54.5-81.5T156 20 256 0t100 20 81.5 54.5T492 156t20 100-20 100-54.5 81.5T356 492t-100 20zm0-461q-43 0-80 16t-65 43.5-44 65T51 256t16 80 44 65 65 44 80 16 80.5-16 65-44 43.5-65 16-80-16-80.5-43.5-65-65-43.5T256 51zm77 205q-10 0-18-8l-59-58-59 58q-8 8-18 8-11 0-18-7.5t-7-18.5 7-18l77-77q7-7 18-7t18 7l77 77q8 8 8 18 0 11-7.5 18.5T333 256zm0 128q-10 0-18-8l-59-58-59 58q-8 8-18 8-11 0-18-7.5t-7-18.5 7-18l77-77q7-7 18-7t18 7l77 77q8 8 8 18 0 11-7.5 18.5T333 384z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/system-exit";
export { pathData, ltr, accData };