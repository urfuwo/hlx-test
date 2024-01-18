/* global WebImporter */
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

  const tags = document.querySelector('[name="tags"]');
  if (tags && tags.content) {
    meta.Tags = tags.content;
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

  // get doc type from main > article classlist
  const article = document.querySelector('section#main > article');
  if (article && article.className.indexOf('sapn-type') > -1) {
    article.classList.forEach((className) => {
      if (className.startsWith('sapn-type')) {
        meta.template = className.replace('sapn-type-', '');
      }
    });
  }

  const ogLocale = document.querySelector('[property="og:locale"]');
  if (ogLocale) {
    meta['og:locale'] = ogLocale.content;
  }
  const ogType = document.querySelector('[property="og:type"]');
  if (ogType) {
    meta['og:type'] = ogType.content;
  }
  const published = document.querySelector('[property="article:published_time"]');
  if (published) {
    meta['article:published_time'] = published.content;
  }
  const modified = document.querySelector('[property="article:modified_time"]');
  if (modified) {
    meta['article:modified_time'] = modified.content;
  }
  const author = document.querySelector('[name="author"]');
  if (author) {
    meta.Author = author.content;
  }
  if (meta.Title && html.originalURL.indexOf('/author') > 0) {
      meta.Author = meta.Title.replace(/[^a-zA-Z\s]+.*/, '').trim();
  }

  if (!meta.Author) {
    const entryMeta = document.querySelector('p.entry-meta');
    const parseInfo = str => ({ timestamp: new Date(str.match(/\b\w+ \d{1,2}, \d{4}/)[0]).toISOString(), linkText: str.match(/<a href="[^"]*" title="[^"]*" rel="[^"]*">([^<]*)<\/a>/)[1] });
    const info = parseInfo(entryMeta.innerHTML);
    meta.Author = info.linkText;
    if (!meta['article:published_time']) {
      meta['article:published_time'] = info.timestamp;
    }
    entryMeta.remove();
  }

  const displayAuthor = [...document.querySelectorAll('.c-hero-post__content .c-entry-author a')].map((el) => el.textContent).join(', ');
  if (displayAuthor) {
    meta['Display Author'] = displayAuthor;
  }

  const hostStory = document.querySelector('.c-hero-post__content .c-entry-hot-story');
  if (hostStory) {
    meta['Hot Story'] = 'Yes';
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

  if (document._ARTICLE_SECTIONS_) {
    meta['Topics'] = [...document._ARTICLE_SECTIONS_].join(', ');
  }

  const block = WebImporter.Blocks.getMetadataBlock(document, meta);
  block.id = 'metadata';
  main.append(block);

  return meta;
};

export default createMetadata;
