import {
  img, select, option, div,
} from '../../scripts/dom-builder.js';

export default async function decorate(block) {
  const beforeContact = div(
    div(
      { class: ['logo-lang-picker'] },
      img({
        src: '/icons/sap-logo.svg',
        class: ['icon', 'icon-sap'],
      }),
      select(
        option({ value: 'us' }, 'United States - English'),
        option({ value: 'cn' }, '中文 - Chinese'),
      ),
    ),
  );
  block.parentNode.prepend(beforeContact);
}
