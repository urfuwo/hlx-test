import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/accounting-document-verification.js";
import { pathData as pathDatav5 } from "./v5/accounting-document-verification.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "accounting-document-verification";
export { pathData, ltr, accData };