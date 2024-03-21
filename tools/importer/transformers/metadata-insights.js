/* global WebImporter */

const addToSet = (map, key, value, prefix) => {
  let v = value;
  if (prefix && value.toLowerCase().startsWith(prefix.toLowerCase())) {
    v = value.substring(prefix.length + 1);
  }

  if (!map.has(key)) {
    map.set(key, new Set());
  }
  if (v) {
    map.get(key).add(v);
  }
};

const mapToMeta = (meta, map) => {
  map.entries().forEach((tag) => {
    if (tag[1].size > 0) meta[tag[0]] = [...tag[1]].join(', ');
  });
};

// eslint-disable-next-line no-unused-vars
const createMetadata = (main, document, html, params, urlStr) => {
  const meta = {};

  const title = document.querySelector('title');
  if (title) {
    meta.Title = title.textContent.replace(/[\n\t]/gm, '').replace(/ \| .*/gm, '');
  }

  const desc = document.querySelector('[property="og:description"]');
  if (desc) {
    meta.Description = desc.content;
  }

  const keywords = document.querySelector('[name="keywords"]');
  if (keywords) {
    meta.keywords = keywords.content;
  }

  const img = document.querySelector('[property="og:image"]');
  if (img && img.content) {
    const el = document.createElement('img');
    const imgUrl = new URL(img.content);
    el.src = imgUrl.toString();
    meta.Image = el;
  }

  // extra authors from the page
  main.querySelectorAll('div[data-component="Section"]').forEach((sectionWrapper) => {
    if (sectionWrapper.querySelector('h2')?.textContent.indexOf('Meet the Author') > -1) {
      const authors = [];
      sectionWrapper.querySelectorAll('.Headline__xs--v8bKJ').forEach((authorEL) => {
        authors.push(authorEL.textContent);
      });
      if (authors.length > 0) {
        meta['Display Author'] = authors.join(', ');
        // eslint-disable-next-line prefer-destructuring
        meta.Author = authors[0];
      }
      sectionWrapper.remove();
    }
  });

  // get tagging from mapping table
  if (document.mappingTable) {
    const data = document.mappingTable.find((n) => n.URL === document.originalURL);
    if (data) {
      document.articleFolder = data['Content Type Category action:mapped'];

      const tagging = new Map();
      addToSet(tagging, 'Topic', data['Umbrella action:mapped'], 'topic');
      addToSet(tagging, 'Topic', data['Umbrella action:mapped 2'], 'topic');
      addToSet(tagging, 'Industry', data['Industry 1 action:mapped'], 'industry');
      addToSet(tagging, 'Industry', data['Industry 2 action:mapped'], 'industry');
      addToSet(tagging, 'Content Type', data['Content Type action:mapped'], 'content-type');
      addToSet(tagging, 'Content Type', data['Content Type action:mapped 2'], 'content-type');
      addToSet(tagging, 'Customer Lifecycle Map Stages', data['Customer Lifecycle Map Stages action:mapped'], 'stage');
      mapToMeta(meta, tagging);
    }
  }

  // TODO remove once we have real dates
  const randomDate = new Date(2024, 2, Math.floor(Math.random() * 18) + 1);
  const randomTime = Math.floor(Math.random() * 24 * 60 * 60 * 1000); // Random time in milliseconds
  randomDate.setMilliseconds(randomTime);
  meta['Published Time'] = randomDate.toISOString();
  meta['Modified Time'] = randomDate.toISOString();

  // TODO remove once we know what will happen with tags
  meta.Tags = meta.Topic;

  const block = WebImporter.Blocks.getMetadataBlock(document, meta);
  block.id = 'metadata';
  main.append(block);

  return meta;
};

export default createMetadata;
