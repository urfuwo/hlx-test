/* eslint-disable import/no-extraneous-dependencies */

import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { createGzip } from 'zlib';
import async from 'async';
import chainFunction from 'stream-chain';
import parserFunction from 'stream-json/Parser.js';
import streamArrayFunction from 'stream-json/streamers/StreamArray.js';
import pickFunction from 'stream-json/filters/Pick.js';
import { SitemapStream, streamToPromise, xmlLint } from 'sitemap';
import { ReadableWebToNodeStream } from 'readable-web-to-node-stream';
import log4js from 'log4js';
import DeDuplicator from './transformers/deDuplicator.js';
import Filter from './transformers/filter.js';

const { chain } = chainFunction;
const { parser } = parserFunction;
const { pick } = pickFunction;
const { streamArray } = streamArrayFunction;
const logger = log4js.getLogger();
logger.level = 'debug';

const formatDate = (value) => {
  try {
    return new Date(value * 1000).toISOString().split('T')[0];
  } catch (error) {
    logger.error('error while parsing date', value, error);
    return '';
  }
};

const addHttpsPrefix = (url) => {
  if (url.startsWith('https://')) {
    return url;
  }
  return `https://${url}`;
};

const convertToCamelCase = (inputString) => {
  const camelCased = inputString.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
  return camelCased.replace(/-/g, '');
};

const getNewsItem = (item, lang) => ({
  url: item.path,
  news: {
    publication: {
      name: item.author,
      language: lang,
    },
    genres: item['content-type'],
    publication_date: formatDate(item.lastModified),
    title: item.title,
    keywords: item.topics,
  },
});

const validateXml = (siteMapPath) => {
  xmlLint(createReadStream(siteMapPath)).then(
    () => logger.info('sitemap valid:', siteMapPath),
    ([err, stderr]) => logger.error('sitemap xml is invalid', stderr),
  );
};

const getSiteMapStream = (siteMapPath, domain) => {
  const sitemap = new SitemapStream({ hostname: addHttpsPrefix(domain) });
  const writeStream = createWriteStream(siteMapPath);
  sitemap.pipe(writeStream);
  sitemap.pipe(createGzip());
  return sitemap;
};

const initialisePipeline = (readStream, functions) => chain([readStream, parser(), pick({ filter: 'data' }), streamArray(), ...functions]);

const buildSiteMap = async (siteMapName, domain, url) => {
  const response = await fetch(url);
  const responseStream = new ReadableWebToNodeStream(response.body);
  const siteMapPath = resolve('../../', 'aemedge', `sitemap-${siteMapName}.xml`);
  const deDuplicator = new DeDuplicator();
  const siteMap = getSiteMapStream(siteMapPath, domain);
  const pipeline = initialisePipeline(responseStream, [
    (data) => {
      const { value } = data;
      return JSON.parse(value[siteMapName]);
    },
    deDuplicator,
    (data) => ({ url: `/${siteMapName}/${data}`, changefreq: 'weekly' }),
    siteMap,
  ]);
  streamToPromise(pipeline).then((sm) => {
    logger.info('sitemap generated successfully at', siteMapPath);
    validateXml(siteMapPath);
  });
  pipeline.on(
    'error',
    (e) => e.code === 'EPIPE' || logger.error('error occurred while streaming data', e),
  );
};

const buildTopicsSiteMap = async (config) => {
  const { domain, 'index.endpoint': endpoint, 'article.index.path': indexPath } = config;
  try {
    buildSiteMap('topics', domain, `${endpoint}${indexPath}`);
  } catch (error) {
    logger.error('error while generating sitemap for topics', error);
  }
};

const buildTagsSiteMap = async (config) => {
  const { domain, 'index.endpoint': endpoint, 'article.index.path': indexPath } = config;
  try {
    buildSiteMap('tags', domain, `${endpoint}${indexPath}`);
  } catch (error) {
    logger.error('error while generating sitemap for tags', error);
  }
};

const buildPagesSiteMap = async (config) => {
  const {
    domain,
    'index.endpoint': endpoint,
    'query.index.path': indexPath,
    'sitemap.page.templates': pageTemplates,
  } = config;
  const templates = pageTemplates.split(',');
  const response = await fetch(`${endpoint}${indexPath}`);
  const responseStream = new ReadableWebToNodeStream(response.body);
  const siteMapPath = resolve('../../', 'aemedge', 'sitemap-pages.xml');
  const sitemap = getSiteMapStream(siteMapPath, domain);
  const filter = new Filter((data) => templates.includes(data.value.template));
  const pipeline = initialisePipeline(responseStream, [
    filter,
    (data) => {
      const { value } = data;
      return { url: value.path, changefreq: 'weekly', lastmod: formatDate(value.lastModified) };
    },
    sitemap,
  ]);
  streamToPromise(pipeline).then((sm) => {
    logger.info('sitemap generated successfully at', siteMapPath);
    validateXml(siteMapPath);
  });
  pipeline.on('error', (e) => e.code === 'EPIPE' || logger.error(e));
};

const generateSiteMap = async (config, filter, index, sitemapName, mappingfn) => {
  const { domain, 'index.endpoint': endpoint } = config;
  const indexPath = config[index];
  const response = await fetch(`${endpoint}${indexPath}`);
  const responseStream = new ReadableWebToNodeStream(response.body);
  const siteMapPath = resolve('../../', 'aemedge', `sitemap-${sitemapName}.xml`);
  const sitemap = getSiteMapStream(siteMapPath, domain);
  const pipeline = initialisePipeline(responseStream, [
    filter,
    (data) => mappingfn(data.value),
    sitemap,
  ]);
  streamToPromise(pipeline).then((sm) => {
    logger.info('sitemap generated successfully at', siteMapPath);
    validateXml(siteMapPath);
  });
  pipeline.on('error', (e) => e.code === 'EPIPE' || logger.error(e));
};

const buildNewsSitemap = (config) => {
  const filter = new Filter((data) => data.value.path.startsWith('/news/'));
  const mappingFn = (item) => {
    const newsItem = {
      url: item.path,
      news: {
        publication: {
          name: item.author,
          language: 'en',
        },
        publication_date: formatDate(item.lastModified),
        title: item.title,
        keywords: JSON.parse(item.topics)[0],
      },
    };
    const contentType = item['content-type'].split(',');
    if (contentType.includes('press-release')) newsItem.genres = 'PressRelease';
    if (contentType.includes('blog')) newsItem.genres = 'Blog';
    return newsItem;
  };
  try {
    generateSiteMap(config, filter, 'article.index.path', 'news', mappingFn);
  } catch (error) {
    logger.error('error while generating sitemap for news', error);
  }
};

(async () => {
  const configAccumulator = (config, data, callback) => {
    const { Key: key, Value: value } = data;
    config[key] = value;
    callback(null, config);
  };

  const response = await fetch('https://main--hlx-test--urfuwo.hlx.page/aemedge/config.json');
  const configResponse = await response.json();
  try {
    const config = await async.reduce(configResponse.data, {}, configAccumulator);
    const taskQueue = async.cargoQueue(
      (tasks, callback) => {
        for (let i = 0; i < tasks.length; i += 1) {
          logger.info(`executing ${tasks[i].name}`);
        }
        callback(config);
      },
      4,
      4,
    );

    taskQueue.push({ name: 'writeSiteMap' }, buildPagesSiteMap);
    taskQueue.push({ name: 'buildTopicsSiteMap' }, buildTopicsSiteMap);
    taskQueue.push({ name: 'buildTagsSiteMap' }, buildTagsSiteMap);
    taskQueue.push({ name: 'buildNewsSitemap' }, buildNewsSitemap);
  } catch (err) {
    logger.error('sitemap generation aborted', err);
  }
})();
