import { addAuthorProfiles } from '../author-profiles/author-profiles.js';
import { getAuthorNames } from '../../scripts/article.js';

export default async function decorate(block) {
  const keys = getAuthorNames();
  if (keys && keys.length > 0) {
    block.classList.add('author-profiles');
    block.classList.remove('author-profile');
    await addAuthorProfiles(block, keys);
  }
}
