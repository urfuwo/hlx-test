/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable class-methods-use-this */

import { preTransformers, transformers } from './transformers/index.js';

const PROJECT_BASE_URL = 'https://main--hlx-test--urfuwo.hlx.page';

const BASEPATH_MAPPING = [
  {
    type: 'feature-article',
    basePath: '/blog',
  },
  {
    type: 'blog',
    basePath: '/blog',
  },
  {
    type: 'insight',
    basePath: '/blog',
  },
  {
    type: 'support-update',
    basePath: '/news',
  },
  {
    type: 'perspective',
    basePath: '/news',
  },
  {
    type: 'statement',
    basePath: '/news',
  },
  {
    type: 'press-release',
    basePath: '/news',
  },
  {
    type: 'newsbyte',
    basePath: '/news',
  },
  {
    type: 'video',
    basePath: '/',
  },
];

/**
 * Apply DOM operations to the provided document and return
 * the root element to be then transformed to Markdown.
 * @param {HTMLDocument} document The document
 * @param {string} url The url of the page imported
 * @param {string} html The raw html (the document is cleaned up during preprocessing)
 * @param {object} params Object containing some parameters given by the import process.
 * @returns {HTMLElement} The root element to be transformed
 */
async function transformDOM(document, url, html, params) {
  // define the main element: the one that will be transformed to Markdown
  const main = document.body;

  // use helper method to remove header, footer, etc.
  WebImporter.DOMUtils.remove(main, [
    'header',
    'footer',
    'component',
    'div.social',
    'ul.social-share-list',
    'ds-contextual-navigation',
    'div.breadcrumbs',
    'div.cmp-container',
    'a.skip-link',
  ]);

  transformers.forEach((fn) => fn.call(this, main, document, params, url));
  return main;
}

/**
 * Return a path that describes the document being transformed (file name, nesting...).
 * The path is then used to create the corresponding Word document.
 * @param {HTMLDocument} document The document
 * @param {string} url The url of the page imported
 * @param {string} html The raw html (the document is cleaned up during preprocessing)
 * @param {object} params Object containing some parameters given by the import process.
 * @return {string} The path
 */
// eslint-disable-next-line no-unused-vars
async function generateDocumentPath(document, url, html, params) {
  // let newUrl = new URL(url).pathname.replace(/\.html$/, '').replace(/\/$/, ''),
  const newUrl = new URL(url);
  if (document.arictleType) {
    const type = BASEPATH_MAPPING.find((mapping) => mapping.type === document.arictleType);
    if (type) {
      newUrl.pathname = `/${type.basePath}${newUrl.pathname}`;
    }
  }

  return WebImporter.FileUtils.sanitizePath(newUrl.pathname.replace(/\.html$/, '').replace(/\/$/, ''));
}

async function loadImportMappings(document) {
  const mappingTable = await fetch(`${PROJECT_BASE_URL}/draft/mhaack/import-mapping.json?sheet=news-us-mapping&limit=1000`).then((res) => res.json());
  if (mappingTable) {
    document.mappingTable = mappingTable.data;
  }
}

export default {
  /**
   * Apply DOM pre processing
   * @param {HTMLDocument} document The document
   * @param {string} url The url of the page imported
   * @param {string} html The raw html (the document is cleaned up during preprocessing)
   * @param {object} params Object containing some parameters given by the import process.
   * @returns {HTMLElement} The root element to be transformed
   */
  preprocess: ({
    // eslint-disable-next-line no-unused-vars
    document,
    url,
    html,
    params,
  }) => {
    const main = document.body;
    preTransformers.forEach((fn) => fn.call(this, main, document, html, params, url));
  },

  transform: async ({
    // eslint-disable-next-line no-unused-vars
    document, url, html, params,
  }) => {
    await loadImportMappings(document);

    const authorLinks = [...document.body.querySelectorAll('a[rel=author]')].map((a) => a.href);

    return [
      {
        element: await transformDOM(document, url, html, params),
        path: await generateDocumentPath(document, url, html, params),
        report: {
          'author-links': authorLinks,
        },
      },
    ];
  },
};
