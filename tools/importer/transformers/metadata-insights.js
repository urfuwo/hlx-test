/* global WebImporter */

const addToSet = (map, key, value, prefix) => {
  let v = value;
  if (prefix && value.toLowerCase().startsWith(prefix.toLowerCase())) {
    v = value.split('/').pop().trim();
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
    // eslint-disable-next-line prefer-destructuring
    el.src = imgUrl.toString().split('?')[0];
    meta.Image = el;
  }

  // extra authors from the page
  main.querySelectorAll('div[data-component="Section"]').forEach((sectionWrapper) => {
    if (sectionWrapper.querySelector('h2')?.textContent.indexOf('Meet the Author') > -1) {
      const authors = [];
      sectionWrapper.querySelectorAll('.Headline__xs--v8bKJ').forEach((authorEL) => {
        authors.push(authorEL.textContent.trim());
      });
      if (authors.length > 0) {
        meta.Author = authors.join(', ');
      }
      sectionWrapper.remove();
    }
  });

  // get tagging from mapping table
  if (document.mappingTable) {
    const data = document.mappingTable.find((n) => n.URL === document.originalURL.toString());
    if (data) {
      document.articleFolder = data['Content Type Category action:mapped'];

      const tagging = new Map();
      addToSet(tagging, 'topic', data['Umbrella action:mapped'], 'topic');
      addToSet(tagging, 'topic', data['Umbrella action:mapped 2'], 'topic');
      addToSet(tagging, 'industry', data['Industry 1 action:mapped'], 'industry');
      addToSet(tagging, 'industry', data['Industry 2 action:mapped'], 'industry');
      addToSet(tagging, 'content-type', data['Content Type action:mapped'], 'content-type');
      addToSet(tagging, 'content-type', data['Content Type action:mapped 2'], 'content-type');
      addToSet(tagging, 'clm-stage', data['Customer Lifecycle Map Stages action:mapped'], 'stage');
      mapToMeta(meta, tagging);

      if (data['Original Publish Date'] && !Number.isNaN(+data['Original Publish Date'])) {
        const date = new Date(Math.round((+data['Original Publish Date'] - (1 + 25567 + 1)) * 86400 * 1000));
        meta['Published Time'] = date.toISOString();
      }
      if (data['Last Updated Date'] && !Number.isNaN(+data['Last Updated Date'])) {
        const date = new Date(Math.round((+data['Last Updated Date'] - (1 + 25567 + 1)) * 86400 * 1000));
        meta['Modified Time'] = date.toISOString();
      }
    }
  }

  const block = WebImporter.Blocks.getMetadataBlock(document, meta);
  block.id = 'metadata';
  main.append(block);

  return meta;
};

export default createMetadata;
