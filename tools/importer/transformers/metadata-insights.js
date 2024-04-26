/* global WebImporter */

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
    meta.Keywords = keywords.content;
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
      sectionWrapper.querySelectorAll('div[class^="Headline__xs--"]').forEach((authorEL) => {
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

      const tagging = new Set();
      tagging.add(data['Umbrella action:mapped']);
      tagging.add(data['Umbrella action:mapped 2']);
      tagging.add(data['Industry 1 action:mapped']);
      tagging.add(data['Industry 2 action:mapped']);
      tagging.add(data['Content Type action:mapped']);
      tagging.add(data['Content Type action:mapped 2']);
      tagging.add(data['Customer Lifecycle Map Stages action:mapped']);

      meta.Tags = [...tagging].filter((t) => t !== '').join(', ');

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
