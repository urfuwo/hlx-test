import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/TableRow.css.ts", content: `:host{display:contents}:host([_busy]) .ui5-table-row-root{opacity:.72;pointer-events:none}.ui5-table-row-root{background-color:var(--sapList_Background);color:var(--sapList_TextColor);border-top:1px solid var(--sapList_BorderColor)}.ui5-table-row-root:focus{outline:var(--ui5-v1-21-2_table_row_outline_width) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);outline-offset:var(--ui5-v1-21-2_table_focus_outline_offset)}.ui5-table-popin-row{background-color:var(--sapList_Background)}.ui5-table-popin-row.all-columns-popped-in.popin-header{border-top:1px solid var(--sapList_BorderColor)}.ui5-table-popin-row td:not(.ui5-table-row-navigated){padding-top:.5rem;padding-inline-start:1rem}:host([mode="MultiSelect"]) .ui5-table-popin-row td:not(.ui5-table-row-navigated){padding-inline-start:var(--ui5-v1-21-2_table_multiselect_popin_row_padding)}.ui5-table-popin-row:last-child td{padding-bottom:.5rem}.ui5-table-row-popin-title{color:var(--sapContent_LabelColor);font-family:"72override",var(--sapFontFamily);font-size:var(--sapFontSize)}.ui5-table-cell-display-inline{margin-inline-start:.5rem}.ui5-table-display-inline-container{display:flex;align-items:center}.ui5-table-multi-select-cell{padding:.25rem 0;box-sizing:border-box;text-align:center;vertical-align:middle}:host([mode="SingleSelect"]) .ui5-table-row-root{cursor:pointer}:host([mode="MultiSelect"]) .ui5-table-row-root .ui5-table-multi-select-cell{cursor:pointer}:host ::slotted([ui5-table-cell]:not([popined])){padding:.25rem .5rem}:host(:not([mode="MultiSelect"])) ::slotted([ui5-table-cell]:not([popined]):first-child){padding-inline-start:1rem}:host([type="Active"]) .ui5-table-row-root:hover,:host([mode="SingleSelect"]) .ui5-table-row-root:hover:not(:active){background-color:var(--sapList_Hover_Background)}:host([type="Active"]) .ui5-table-row-root:active,:host([selected][type="Active"]) .ui5-table-row-root:active{background-color:var(--sapList_Active_Background)}:host([type="Active"]) .ui5-table-row-root:active ::slotted([ui5-table-cell]){color:var(--sapList_Active_TextColor)}:host([selected]) .ui5-table-row-root:not(:active){background-color:var(--sapList_SelectionBackgroundColor);border-bottom:1px solid var(--sapList_SelectionBorderColor)}:host([selected][type="Active"]) .ui5-table-row-root:hover:not(:active),:host([selected][mode="SingleSelect"]) .ui5-table-row-root:hover:not(:active){background-color:var(--sapList_Hover_SelectionBackground)}:host([navigated]) .ui5-table-row-root:focus .ui5-table-div-navigated{width:.09375rem;top:2px;inset-inline-end:2px;bottom:1px}:host([navigated]) .ui5-table-row-navigated{vertical-align:middle;padding:0;position:relative}:host([navigated]) .ui5-table-div-navigated{width:.1875rem;position:absolute;inset:0;background-color:var(--sapList_SelectionBorderColor)}
` };
export default styleData;
//# sourceMappingURL=TableRow.css.js.map