/* global WebImporter */

const addToSet = (map, key, value) => {
  if (!map.has(key)) {
    map.set(key, new Set());
  }
  if (value) {
    map.get(key).add(value);
  }
};

const mapToMeta = (meta, map) => {
  // eslint-disable-next-line no-return-assign
  map.entries().forEach((tag) => (meta[tag[0]] = [...tag[1]].join(', ')));
};

// eslint-disable-next-line no-unused-vars
const createMetadata = (main, document, html, params, urlStr) => {
  const meta = {};

  const title = document.querySelector('title');
  if (title) {
    meta.Title = title.textContent.replace(/[\n\t]/gm, '').replace(/ \| .*/gm, '');
  }

  const keywords = document.querySelector('[name="keywords"]');
  if (keywords) {
    meta.keywords = keywords.content;
  }

  const desc = document.querySelector('[property="og:description"]');
  if (desc) {
    meta.Description = desc.content;
  }

  const img = document.querySelector('[property="og:image"]');
  if (img && img.content) {
    const el = document.createElement('img');
    const imgUrl = new URL(img.content);
    el.src = imgUrl.pathname;
    meta.Image = el;
  }
  const published = document.querySelector('[property="article:published_time"]');
  if (published) {
    meta['Published Time'] = published.content;
  }
  const modified = document.querySelector('[property="article:modified_time"]');
  if (modified) {
    meta['Modified Time'] = modified.content;
  }
  const author = document.querySelector('[name="author"]');
  if (author) {
    meta.Author = author.content;
  }
  if (meta.Title && html.originalURL.indexOf('/author') > 0) {
    meta.Author = meta.Title.replace(/[^a-zA-Z\s]+.*/, '').trim();
  }

  if (!meta.Author) {
    // author extraction fro video pages
    const entryMeta = document.querySelector('article.sap-tv div.meta');
    if (entryMeta) {
      const parseInfo = (str) => ({
        timestamp: new Date(str.match(/\b\w+ \d{1,2}, \d{4}/)[0]).toISOString(),
        linkText: str.match(/<a href="[^"]*" title="[^"]*" rel="[^"]*">([^<]*)<\/a>/)[1],
      });
      const info = parseInfo(entryMeta.querySelector('p.entry-meta').innerHTML);
      meta.Author = info.linkText;
      if (!meta['Published Time']) {
        meta['Published Time'] = info.timestamp;
      }
      entryMeta.remove();
    }
  }

  const displayAuthor = [...document.querySelectorAll('.c-hero-post__content .c-entry-author a')]
    .map((el) => el.textContent)
    .join(', ');
  if (displayAuthor) {
    meta['Display Author'] = displayAuthor;
  }

  const hotStory = document.querySelector('.c-hero-post__content .c-entry-hot-story');
  if (hotStory) {
    meta.Priority = 'hot-topic';
  }
  const twitterLabel1 = document.querySelector('[name="twitter:label1"]');
  if (twitterLabel1) {
    meta['twitter:label1'] = twitterLabel1.content;
  }
  const twitterData1 = document.querySelector('[name="twitter:data1"]');
  if (twitterData1) {
    meta['twitter:data1'] = twitterData1.content;
  }
  const twitterLabel2 = document.querySelector('[name="twitter:label2"]');
  if (twitterLabel2) {
    meta['twitter:label2'] = twitterLabel2.content;
  }
  const twitterData2 = document.querySelector('[name="twitter:data2"]');
  if (twitterData2) {
    meta['twitter:data2'] = twitterData2.content;
  }

  // add tags, topics, content types etc based on mapping tables
  const articleContent = document.querySelector(
    'section#main > article.post, section#main > article.sap-tv',
  );
  if (document.mappingTable && articleContent) {
    const types = [...articleContent.classList]
      .filter((className) => className.startsWith('sapn-type-'))
      .map((className) => className.replace('sapn-type-', ''));

    if (types?.length > 0) {
      // eslint-disable-next-line prefer-destructuring
      document.arictleType = types[0];
    } else if (articleContent.classList.contains('type-sap-tv')) {
      document.arictleType = 'video';
      types.push('video');
    }

    // TODO currently additional tags are not mapped as they are not present in the mapping table
    const tagging = new Map();

    // map categories to topics
    const topicsMapping = document.mappingTable.filter((entry) => entry.class === 'topic');
    const categories = [...articleContent.classList]
      .filter((className) => className.startsWith('category-'))
      .map((className) => className.replace('category-', ''));
    if (categories?.length > 0) {
      topicsMapping
        .filter((entry) => categories.includes(entry.path))
        .forEach((topic) => {
          if (topic['action:map'].length > 0) {
            const newTag = topic['action:map'].split('/');
            addToSet(tagging, newTag[0], newTag[1]);
          } else {
            addToSet(tagging, 'topics', topic.path);
          }
        });
    }

    // map types to content types
    const typesMapping = document.mappingTable.filter((entry) => entry.class === 'type');
    if (types?.length > 0) {
      typesMapping
        .filter((entry) => entry.path === types[0])
        .forEach((typeEntry) => {
          if (typeEntry['action:map'].length > 0) {
            const newTag = typeEntry['action:map'].split('/');
            addToSet(tagging, newTag[0], newTag[1]);
          } else {
            addToSet(tagging, 'content-type', typeEntry.path);
          }
        });
    }

    // map tags
    const tagsMapping = document.mappingTable.filter((entry) => entry.class === 'tag');
    const tags = [...articleContent.classList]
      .filter((className) => className.startsWith('tag-'))
      .map((className) => className.replace('tag-', ''));
    if (tags?.length > 0) {
      tagsMapping
        .filter((entry) => tags.includes(entry.path))
        .forEach((tag) => {
          if (tag['action:map'].length > 0) {
            const newTag = tag['action:map'].split('/');
            addToSet(tagging, newTag[0], newTag[1]);
          } else {
            addToSet(tagging, 'tags', tag.path);
          }
        });
    }

    mapToMeta(meta, tagging);
  }

  const block = WebImporter.Blocks.getMetadataBlock(document, meta);
  block.id = 'metadata';
  main.append(block);

  return meta;
};

export default createMetadata;
