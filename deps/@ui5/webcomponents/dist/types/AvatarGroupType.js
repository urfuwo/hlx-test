/**
 * Different types of AvatarGroupType.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.AvatarGroupType
 */
var AvatarGroupType;
(function (AvatarGroupType) {
    /**
     * The avatars are displayed as partially overlapped on top of each other and the entire group has one click or tap area.
     *
     * @public
     * @type {Group}
     */
    AvatarGroupType["Group"] = "Group";
    /**
     * The avatars are displayed side-by-side and each avatar has its own click or tap area.
     *
     * @public
     * @type {Individual}
     */
    AvatarGroupType["Individual"] = "Individual";
})(AvatarGroupType || (AvatarGroupType = {}));
export default AvatarGroupType;
//# sourceMappingURL=AvatarGroupType.js.map