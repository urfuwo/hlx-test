import { decorateIcons } from '../../scripts/aem.js';
import {
  select, option, div, span,
} from '../../scripts/dom-builder.js';

export default async function decorate(block) {
  const beforeContact = div(
    div(
      { class: ['logo-lang-picker'] },
      span({ class: 'icon icon-sap-logo' }),
      select(
        { 'aria-label': 'Country Selector' },
        option({ value: 'us' }, 'United States - English'),
      ),
    ),
  );
  block.parentNode.prepend(beforeContact);
  decorateIcons(block);
}
