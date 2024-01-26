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
    'ui5-theming-horizon-1': '/node_modules/@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js',
    'ui5-theming-horizon-2': '/node_modules/@ui5/webcomponents/dist/generated/themes/sap_horizon/parameters-bundle.css.js',
    'ui5-generated-i18n': '/node_modules/@ui5/webcomponents/dist/generated/i18n/i18n-defaults.js',
    'ui5-generated-buttontemplate': '/node_modules/@ui5/webcomponents/dist/generated/templates/ButtonTemplate.lit.js',
    'ui5-generated-button-theme': '/node_modules/@ui5/webcomponents/dist/generated/themes/Button.css.js',
    'ui5-button': '/node_modules/@ui5/webcomponents/dist/Button.js',
    'ui5-buttondesign': '/node_modules/@ui5/webcomponents/dist/types/ButtonDesign.js',
    'ui5-buttontype': '/node_modules/@ui5/webcomponents/dist/types/ButtonType.js',
    'ui5-icon': '/node_modules/@ui5/webcomponents/dist/Icon.js',
    'ui5-icon-template': '/node_modules/@ui5/webcomponents/dist/generated/templates/IconTemplate.lit.js',
    'ui5-icon-theme': '/node_modules/@ui5/webcomponents/dist/generated/themes/Icon.css.js',
    'ui5-icon-design': '/node_modules/@ui5/webcomponents/dist/types/IconDesign.js',
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
