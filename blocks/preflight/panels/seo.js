import { div } from '../../../scripts/dom-builder.js';

const DEF_ICON = 'orange';
const DEF_DESC = 'Checking...';
const pass = 'green';
const fail = 'red';
const limbo = 'orange';

const checks = new Map();

function checkH1s() {
  const h1s = document.querySelectorAll('h1');
  const result = { icon: DEF_ICON, title: 'H1 count', description: DEF_DESC };
  if (h1s.length === 1) {
    result.icon = pass;
    result.description = 'Only one H1 on the page.';
  } else {
    result.icon = fail;
    if (h1s.length > 1) {
      result.description = 'Reason: More than one H1 on the page.';
    } else {
      result.description = 'Reason: No H1 on the page.';
    }
  }
  checks.set('h1s', result);
  return result.icon;
}

async function checkTitle() {
  const titleSize = document.title.replace(/\s/g, '').length;
  const result = { icon: DEF_ICON, title: 'Title size', description: DEF_DESC };
  if (titleSize < 15) {
    result.icon = fail;
    result.description = 'Reason: Title size is too short.';
  } else if (titleSize > 70) {
    result.icon = fail;
    result.description = 'Reason: Title size is too long.';
  } else {
    result.icon = pass;
    result.description = 'Title size is good.';
  }
  checks.set('title', result);
  return result.icon;
}

async function checkCanon() {
  const canon = document.querySelector("link[rel='canonical']");
  const result = { icon: DEF_ICON, title: 'Canonical', description: DEF_DESC };
  const { href } = canon;

  try {
    const resp = await fetch(href, { method: 'HEAD' });
    if (!resp.ok) {
      result.icon = fail;
      result.description = 'Reason: Error with canonical reference.';
    }
    if (resp.ok) {
      if (resp.status >= 300 && resp.status <= 308) {
        result.icon = fail;
        result.description = 'Reason: Canonical reference redirects.';
      } else {
        result.icon = pass;
        result.description = 'Canonical referenced is valid.';
      }
    }
  } catch (e) {
    result.icon = limbo;
    result.description = 'Canonical cannot be crawled.';
  }
  checks.set('canonical', result);
  return result.icon;
}

function checkDescription() {
  const metaDesc = document.querySelector('meta[name="description"]');
  const result = { icon: DEF_ICON, title: 'Meta description', description: DEF_DESC };
  if (!metaDesc) {
    result.icon = fail;
    result.description = 'Reason: No meta description found.';
  } else {
    const descSize = metaDesc.content.replace(/\s/g, '').length;
    if (descSize < 50) {
      result.icon = fail;
      result.description = 'Reason: Meta description too short.';
    } else if (descSize > 150) {
      result.icon = fail;
      result.description = 'Reason: Meta description too long.';
    } else {
      result.icon = pass;
      result.description = 'Meta description is good.';
    }
  }
  checks.set('desc', result);
  return result.icon;
}

function checkPublishedDate() {
  const pubDate = document.querySelector('meta[property="article:published_time"]');
  const result = { icon: DEF_ICON, title: 'Published Date', description: DEF_DESC };
  if (!pubDate) {
    result.icon = fail;
    result.description = 'Reason: No published date metadata found.';
  } else {
    const publishedDate = new Date(pubDate.content);
    if (!publishedDate) {
      result.icon = fail;
      result.description = 'Reason: Published date is not a valid date.';
    } else {
      result.icon = pass;
      result.description = 'Published date is good.';
    }
  }
  checks.set('pubDate', result);
  return result.icon;
}

async function checkBody() {
  const result = { icon: DEF_ICON, title: 'Body size', description: DEF_DESC };
  const { length } = document.documentElement.innerText;

  if (length > 100) {
    result.icon = pass;
    result.description = 'Body content has a good length.';
  } else {
    result.icon = fail;
    result.description = 'Reason: Not enough content.';
  }
  checks.set('body', result);
  return result.icon;
}

function checkLorem() {
  const result = { icon: DEF_ICON, title: 'Lorem Ipsum', description: DEF_DESC };
  const { innerHTML } = document.documentElement;
  if (innerHTML.includes('Lorem ipsum')) {
    result.icon = fail;
    result.description = 'Reason: Lorem ipsum is used on the page.';
  } else {
    result.icon = pass;
    result.description = 'No Lorem ipsum is used on the page.';
  }
  checks.set('lorem', result);
  return result.icon;
}

async function checkLinks() {
  const result = { icon: DEF_ICON, title: 'Links', description: DEF_DESC };
  const links = document.querySelectorAll('a[href^="/"]');

  let badLink;
  links.forEach(async (link) => {
    const resp = await fetch(link.href, { method: 'HEAD' });
    if (!resp.ok) badLink = true;
  });

  if (badLink) {
    result.icon = fail;
    result.description = 'Reason: There are one or more broken links.';
  } else {
    result.icon = pass;
    result.description = 'Links are valid.';
  }
  checks.set('links', result);
  return result.icon;
}

function renderSEOItem({ icon, title, description }) {
  return div(
    { class: 'seo-item' },
    div({ class: `result-icon ${icon}` }),
    div(
      { class: 'seo-item-text' },
      div({ class: 'seo-item-title' }, title),
      div({ class: 'seo-item-description' }, description),
    ),
  );
}

export async function getSEOResults() {
  checkH1s();
  checkTitle();
  await checkCanon();
  checkDescription();
  checkBody();
  checkLorem();
  await checkLinks();
  checkPublishedDate();
}

export function renderSEOPanel() {
  return div(
    { class: 'seo-columns' },
    div(
      { class: 'seo-column' },
      renderSEOItem(checks.get('h1s')),
      renderSEOItem(checks.get('title')),
      renderSEOItem(checks.get('desc')),
      renderSEOItem(checks.get('pubDate')),
    ),
    div(
      { class: 'seo-column' },
      renderSEOItem(checks.get('body')),
      renderSEOItem(checks.get('lorem')),
      renderSEOItem(checks.get('canonical')),
      renderSEOItem(checks.get('links')),
    ),
  );
}
