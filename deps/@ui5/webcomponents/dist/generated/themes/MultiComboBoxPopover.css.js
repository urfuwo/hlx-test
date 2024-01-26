import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/MultiComboBoxPopover.css.ts", content: `.ui5-suggestions-popover .ui5-multi-combobox-all-items-list{--_ui5-v1-21-2_checkbox_width_height: var(--_ui5-v1-21-2_list_item_dropdown_base_height)}
` };
export default styleData;
//# sourceMappingURL=MultiComboBoxPopover.css.js.map