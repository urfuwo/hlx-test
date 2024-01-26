import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/TabSeparatorInStrip.css.ts", content: `.ui5-tc__separator{width:0;border-left:.0625rem solid var(--sapGroup_TitleBorderColor);margin:.5rem .25rem}
` };
export default styleData;
//# sourceMappingURL=TabSeparatorInStrip.css.js.map