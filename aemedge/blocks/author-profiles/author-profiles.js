import { loadCSS } from '../../scripts/aem.js';
import { div } from '../../scripts/dom-builder.js';
import { getAuthorEntries } from '../../scripts/article.js';
import Avatar from '../../libs/avatar/avatar.js';

async function addAuthorProfiles(block, keys) {
  const entries = await getAuthorEntries(keys);
  if (entries && entries.length) {
    if (keys.length > 1) {
      block.classList.add(`elems${keys.length}`);
      entries.forEach((authorEntry) => {
        block.append(div(
          { class: 'author-profile hor' },
          Avatar.fromAuthorEntry(authorEntry).renderDetails('big'),
        ));
      });
    } else {
      block.classList.add('vertical');
      block.append(div(
        { class: 'author-profile' },
        Avatar.fromAuthorEntry(entries[0]).renderDetails('big'),
      ));
    }
  } else {
    block.parentNode.remove();
  }
}

export default async function decorateBlock(block) {
  loadCSS(`${window.hlx.codeBasePath}/blocks/author-profile/author-profile.css`);
  const keys = [];
  block.querySelectorAll('a').forEach((link) => {
    keys.push(new URL(link.href).pathname);
  });
  block.innerHTML = '';
  await addAuthorProfiles(block, keys);
}

export { addAuthorProfiles };
