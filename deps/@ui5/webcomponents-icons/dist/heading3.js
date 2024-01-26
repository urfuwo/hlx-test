import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/heading3.js";
import { pathData as pathDatav5 } from "./v5/heading3.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "heading3";
export { pathData, ltr, accData };