import fs from 'fs';
import path from 'path';

const IMPORT_MAP = {
  imports: {
    'lit-html': '/node_modules/lit-html/lit-html.js',
    'lit-html-directive-helpers': '/node_modules/lit-html/directive-helpers.js',
    'lit-htmk-directives': '/node_modules/lit-html/directive.js',
    'lit-html-repeat': '/node_modules/lit-html/directives/repeat.js',
    'lit-html-class': '/node_modules/lit-html/directives/class-map.js',
    'lit-html-if-defined': '/node_modules/lit-html/directives/if-defined.js',
    'lit-html-unsafe-html': '/node_modules/lit-html/directives/unsafe-html.js',
    'ui5-base': '/node_modules/@ui5/webcomponents-base/dist/',
    'ui5-theming-horizon-1':
      '/node_modules/@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js',
    'ui5-generated-i18n': '/node_modules/@ui5/webcomponents/dist/generated/i18n/i18n-defaults.js',
    'ui5-button': '/node_modules/@ui5/webcomponents/dist/Button.js',
    'ui5-types': '/node_modules/@ui5/webcomponents/dist/types/',
    'ui5-breadcrumb': '/node_modules/@ui5/webcomponents/dist/Breadcrumbs.js',
    'ui5-breadcrumbitem': '/node_modules/@ui5/webcomponents/dist/BreadcrumbsItem.js',
    'ui5-icon': '/node_modules/@ui5/webcomponents/dist/Icon.js',
    'ui5-templates': '/node_modules/@ui5/webcomponents/dist/generated/templates/',
    'ui5-checkbox': '/node_modules/@ui5/webcomponents/dist/CheckBox.js',
    'ui5-label': '/node_modules/@ui5/webcomponents/dist/Label.js',
    'ui5-link': '/node_modules/@ui5/webcomponents/dist/Link.js',
    'ui5-popup': '/node_modules/@ui5/webcomponents/dist/Popup.js',
    'ui5-list': '/node_modules/@ui5/webcomponents/dist/List.js',
    'ui5-listitem': '/node_modules/@ui5/webcomponents/dist/ListItem.js',
    'ui5-listitembase': '/node_modules/@ui5/webcomponents/dist/ListItemBase.js',
    'ui5-dialog': '/node_modules/@ui5/webcomponents/dist/Dialog.js',
    'ui5-avatar': '/node_modules/@ui5/webcomponents/dist/Avatar.js',
    'ui5-title': '/node_modules/@ui5/webcomponents/dist/Title.js',
    'ui5-popover': '/node_modules/@ui5/webcomponents/dist/Popover.js',
    'ui5-popover-uitls': '/node_modules/@ui5/webcomponents/dist/popup-utils/',
    'ui5-icons': '/node_modules/@ui5/webcomponents-icons/dist/',
    'ui5-radio-button': '/node_modules/@ui5/webcomponents/dist/RadioButton.js',
    'ui5-radio-group': '/node_modules/@ui5/webcomponents/dist/RadioButtonGroup.js',
    'ui5-busy-indicator': '/node_modules/@ui5/webcomponents/dist/BusyIndicator.js',
    'ui5-standard-list-item': '/node_modules/@ui5/webcomponents/dist/StandardListItem.js',
    'ui5-responsive-popover': '/node_modules/@ui5/webcomponents/dist/ResponsivePopover.js',
    'ui5-themes': '/node_modules/@ui5/webcomponents/dist/generated/themes/',
  },
};

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) return true;
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

Object.keys(IMPORT_MAP.imports).forEach((key) => {
  const src = `.${IMPORT_MAP.imports[key]}`;
  const dest = src.replace('node_modules', 'deps');

  ensureDirectoryExistence(dest);
  if (fs.lstatSync(src).isDirectory()) {
    fs.cpSync(src, dest, { recursive: true });
    console.log(`${src} was copied to ${dest} (recursiv)`);
  } else {
    fs.copyFileSync(src, dest);
    console.log(`${src} was copied to ${dest}`);
  }
});
