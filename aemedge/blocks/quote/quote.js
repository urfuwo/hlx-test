import { getAuthorEntries, removeAuthorsSuffixes } from '../../scripts/article.js';
import Avatar from '../../libs/avatar/avatar.js';
import { getMetadata } from '../../scripts/aem.js';

export default async function decorate(block) {
  const qtContent = block.querySelector(':scope > div:first-of-type > div');
  const qsContent = block.querySelector(':scope > div:nth-of-type(2) > div');
  const linkContent = block.querySelector(':scope > div:nth-of-type(3) > div');
  const isNotArticle = getMetadata('template') !== 'article';
  const isSmall = block.classList.contains('small');
  qtContent.classList.add('col', 'content');
  qtContent.parentNode.classList.add('qt');
  if (qsContent) {
    qsContent.classList.add('col', 'content');
    qsContent.parentNode.classList.add('qs');
    if (isNotArticle) {
      const [author] = removeAuthorsSuffixes(qsContent.textContent).split(',');
      const [authorEntry] = await getAuthorEntries([author.trim()]);
      if (authorEntry) {
        const avatar = Avatar.fromAuthorEntry(authorEntry).render(isSmall ? 'medium' : 'big', false, true);
        block.insertBefore(avatar, qtContent.parentNode);
      }
    }
  }
  if (linkContent && isNotArticle) {
    // Unwrap link from button container added by aem.js
    const link = linkContent.querySelector('a');
    link.classList = ['col', 'content'];
    linkContent.parentNode.classList.add('quote-link');
    linkContent.parentNode.replaceChild(link, linkContent);
  } else if (linkContent) {
    // If article page, remove from DOM and ignore
    linkContent.parentNode.remove();
  }
  if (!linkContent && !qsContent) {
    qtContent.parentNode.classList.add('qt single-qt');
  }
}
