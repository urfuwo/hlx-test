import { loadCSS } from '../../scripts/aem.js';
import { div } from '../../scripts/dom-builder.js';
import { getAuthorEntries } from '../../scripts/article.js';
import Avatar from '../../libs/avatar/avatar.js';

async function addAuthorProfiles(block, keys) {
  const entries = await getAuthorEntries(keys);
  if (entries && entries.length) {
    if (keys.length > 1) {
      block.classList.add(`elems${keys.length}`);
      entries.forEach((e) => {
        const avatar = new Avatar(e.author, e.title, e.description, e.path, e.image);
        const profile = div({ class: 'author-profile hor' }, avatar.renderDetails('big'));
        block.append(profile);
      });
    } else {
      block.classList.add('vertical');
      const avatar = new Avatar(
        entries[0].author,
        entries[0].title,
        entries[0].description,
        entries[0].path,
        entries[0].image,
      );
      block.append(div({ class: 'author-profile' }, avatar.renderDetails('big')));
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
