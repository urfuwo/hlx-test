import { getMetadata, toCamelCase } from './aem.js';

/**
 * Set the JSON-LD script in the head
 * @param {*} data
 * @param {string} name
 */
function setJsonLd(data, name) {
  const existingScript = document.head.querySelector(`script[data-name="${name}"]`);
  if (existingScript) {
    existingScript.innerHTML = JSON.stringify(data);
    return;
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';

  script.innerHTML = JSON.stringify(data);
  script.dataset.name = name;
  document.head.appendChild(script);
}

// eslint-disable-next-line import/prefer-default-export
export function buildArticleSchema() {
  const data = {
    '@context': 'http://schema.org',
    '@type': 'Article',
    '@id': window.location.toString(),
    isPartOf: {
      '@id': window.location.toString(),
    },
    headline: getMetadata('og:title'),
    image: getMetadata('og:image'),
    datePublished: getMetadata('article:published_time'),
    publisher: {
      '@type': 'Organization',
      name: 'SAP',
      url: 'https://www.sap.com/',
      '@id': 'https://www.sap.com/#organization',
      logo: {
        '@type': 'ImageObject',
        '@id': 'https://www.sap.com/#/schema/logo/image/',
        url: 'https://www.sap.com/dam/application/shared/logos/sap-logo-svg.svg',
        caption: 'SAP',
      },
      sameAs: ['https://twitter.com/SAPNews'],
    },
    description: getMetadata('description'),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': window.location.pathname,
    },
    inLanguage: getMetadata('og:locale') || 'en',
  };

  if (getMetadata('article:modified_time')) data.dateModified = getMetadata('article:modified_time');
  if (getMetadata('author')) {
    data.author = {
      '@type': 'Person',
      name: getMetadata('author'),
      url: `${window.location.host}/author/${toCamelCase(getMetadata('author')).toLowerCase()}`,
    };
  }
  if (getMetadata('keywords')) {
    data.keywords = getMetadata('keywords').split(',');
  }
  if (getMetadata('topics')) {
    data.articleSection = getMetadata('topics').split(',');
  }
  setJsonLd(data, 'article');
}
