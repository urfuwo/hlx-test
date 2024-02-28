import { div } from '../../scripts/dom-builder.js';
import { toCamelCase } from '../../scripts/aem.js';
import listArticles from '../article-list/article-list.js';

function extractFilterAttribues(filterInfo) {
  const filterId = filterInfo?.firstElementChild?.textContent?.toLowerCase();
  let filterValue = filterInfo?.lastElementChild?.textContent?.toLowerCase();
  if (filterId && filterValue) {
    filterValue = filterValue.replace('*', '');
    return { name: toCamelCase(filterId), value: filterValue.split(',').map((value) => value.trim()) };
  }
  return null;
}

function filter(entry, attributes) {
  if (Array.isArray(attributes)) {
    if (Array.isArray(entry)) {
      if (!entry.some((e) => attributes.includes(e))) {
        return false;
      }
    } else if (!attributes.includes(entry)) {
      return false;
    }
  } else if (attributes && !entry.includes(attributes)) {
    return false;
  }
  return true;
}

function createFilter(filterAttributes) {
  return (entry) => {
    const cleanedUpTags = JSON.parse(entry.tags)?.map((tag) => tag.toLowerCase()) || [];
    const tags = filter(cleanedUpTags, filterAttributes.tags);
    if (!tags) return false;
    const authors = filter(entry.author?.toLowerCase(), filterAttributes.authors);
    if (!authors) return false;
    const cleanedUpTopics = JSON.parse(entry.topics)?.map((topic) => topic.toLowerCase()) || [];
    const topics = filter(cleanedUpTopics, filterAttributes.topics);
    if (!topics) return false;
    const contentType = filter(entry['content-type']?.toLowerCase(), filterAttributes.contentTypes);
    if (!contentType) return false;
    return entry.path?.startsWith(filterAttributes.paths);
  };
}

export default async function decorateBlock(block) {
  const filterAttributes = {};
  Array.from(block.children)?.forEach((childDiv) => {
    const filterEntry = extractFilterAttribues(childDiv);
    if (filterEntry) {
      filterAttributes[filterEntry.name] = filterEntry.value;
    }
  });
  const limit = filterAttributes.limit ? parseInt(filterAttributes.limit?.[0], 10) : 3;
  delete filterAttributes.limit;
  const filterFunction = createFilter(filterAttributes);

  const articles = div();
  listArticles(articles, { filter: filterFunction, maxEntries: limit });

  block.textContent = '';
  block.append(articles);
}
