import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/Menu.css.ts", content: `.ui5-menu-rp[ui5-responsive-popover]::part(header),.ui5-menu-rp[ui5-responsive-popover]::part(content),.ui5-menu-rp[ui5-responsive-popover]::part(footer){padding:0}.ui5-menu-rp[ui5-responsive-popover]{box-shadow:var(--sapContent_Shadow1);border-radius:var(--_ui5-v1-21-2_menu_popover_border_radius);max-width:20rem}.ui5-menu-item-icon-end{display:inline-block;vertical-align:middle;padding-inline-start:.5rem;pointer-events:none;position:absolute;inset-inline-end:var(--_ui5-v1-21-2_menu_item_submenu_icon_right)}.ui5-menu-item-no-icon-end{min-width:var(--_ui5-v1-21-2_list_item_icon_size);min-height:var(--_ui5-v1-21-2_list_item_icon_size);display:inline-block;vertical-align:middle;padding-inline-start:.5rem;pointer-events:none;inset-inline-end:var(--_ui5-v1-21-2_menu_item_submenu_icon_right)}.ui5-menu-item[additional-text] .ui5-menu-item-no-icon-end{display:none}.ui5-menu-item-dummy-icon{min-width:var(--_ui5-v1-21-2_list_item_icon_size);min-height:var(--_ui5-v1-21-2_list_item_icon_size);display:inline-block;vertical-align:middle;padding-inline-end:.5rem;pointer-events:none}.ui5-menu-item-submenu-icon{min-width:var(--_ui5-v1-21-2_list_item_icon_size);min-height:var(--_ui5-v1-21-2_list_item_icon_size);display:inline-block;vertical-align:middle;pointer-events:none}.ui5-menu-busy-indicator{width:100%}.ui5-menu-dialog-header{display:flex;height:var(--_ui5-v1-21-2-responsive_popover_header_height);align-items:center;justify-content:space-between;padding:0px 1rem;width:100%;overflow:hidden}.ui5-menu-dialog-title{display:flex;flex-direction:row;align-items:center;justify-content:flex-start;width:calc(100% - 6.5rem);padding-right:1rem}.ui5-menu-dialog-title>div{display:inline-block;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ui5-menu-back-button{margin-right:1rem}.ui5-menu-item::part(title){font-size:var(--sapFontSize);padding-top:.125rem}.ui5-menu-item[icon]:not([is-phone])::part(title),.ui5-menu-item[is-phone]:not([icon=""])::part(title){padding-top:0}.ui5-menu-item:not([is-phone])::part(native-li){padding:var(--_ui5-v1-21-2_menu_item_padding)}.ui5-menu-item[starts-section]{border-top:1px solid var(--sapGroup_ContentBorderColor)}.ui5-menu-item[active] .ui5-menu-item-icon-end{color:var(--sapList_Active_TextColor)}.ui5-menu-item[focused]:not([active]){background-color:var(--sapList_Hover_Background)}.ui5-menu-rp[sub-menu]{margin-top:.25rem;margin-inline:var(--_ui5-v1-21-2_menu_submenu_margin_offset)}.ui5-menu-rp[sub-menu][actual-placement-type=Left]{margin-top:.25rem;margin-inline:var(--_ui5-v1-21-2_menu_submenu_placement_type_left_margin_offset)}.ui5-menu-item::part(additional-text){margin-inline-start:var(--_ui5-v1-21-2_menu_item_additional_text_start_margin);color:var(--sapContent_LabelColor);min-width:max-content}.ui5-menu-item-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;pointer-events:none}.ui5-menu-item-text:has(.ui5-menu-item-submenu-icon){padding-inline-end:1rem}
` };
export default styleData;
//# sourceMappingURL=Menu.css.js.map