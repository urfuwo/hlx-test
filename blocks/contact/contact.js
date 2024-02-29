import {
  img, select, option, div, label,
} from '../../scripts/dom-builder.js';

export default async function decorate(block) {
  const beforeContact = div(
    div(
      { class: ['logo-lang-picker'] },
      img({
        src: '/icons/sap-logo.svg',
        class: ['icon', 'icon-sap'],
        alt: 'SAP',
      }),
      label({ for: 'lang-picker' }, 'Select Language: '),
      select(
        { id: 'lang-picker' },
        option({ value: 'us' }, 'United States - English'),
        option({ value: 'cn' }, '中文 - Chinese'),
      ),
    ),
  );
  block.parentNode.prepend(beforeContact);
}
