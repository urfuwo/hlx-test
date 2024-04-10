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
    logger.error('error while parsing date {}', error);
    return '';
  }
};

const validateXml = (siteMapPath) => {
  xmlLint(createReadStream(siteMapPath)).then(
    () => logger.info('sitemap valid:', siteMapPath),
    ([err, stderr]) => logger.error('sitemap xml is invalid', stderr),
  );
};

const getSiteMapStream = (siteMapPath) => {
  const sitemap = new SitemapStream({ hostname: 'http://qa-sap.com' });
  const writeStream = createWriteStream(siteMapPath);
  sitemap.pipe(writeStream);
  sitemap.pipe(createGzip());
  return sitemap;
};

const initialisePipeline = (readStream, functions) => chain([readStream, parser(), pick({ filter: 'data' }), streamArray(), ...functions]);

const buildSiteMap = async (url, siteMapName) => {
  const response = await fetch(url);
  const responseStream = new ReadableWebToNodeStream(response.body);
  const siteMapPath = resolve('../../', `sitemap-${siteMapName}.xml`);
  const deDuplicator = new DeDuplicator();
  const siteMap = getSiteMapStream(siteMapPath);
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

const buildTopicsSiteMap = async () => {
  try {
    buildSiteMap('https://main--hlx-test--urfuwo.hlx.page/aemedge/articles-index.json', 'topics');
  } catch (error) {
    logger.error('error while generating sitemap for topics', error);
  }
};

const buildTagsSiteMap = async () => {
  try {
    buildSiteMap('https://main--hlx-test--urfuwo.hlx.page/aemedge/articles-index.json', 'tags');
  } catch (error) {
    logger.error('error while generating sitemap for tags', error);
  }
};

const writeSiteMap = async () => {
  const response = await fetch(
    'https://main--hlx-test--urfuwo.hlx.page/aemedge/authors-index.json',
  );
  const responseStream = new ReadableWebToNodeStream(response.body);
  const siteMapPath = resolve('../../', 'sitemap-pages.xml');
  const sitemap = getSiteMapStream(siteMapPath);
  const pipeline = initialisePipeline(responseStream, [
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

async.parallel([writeSiteMap, buildTopicsSiteMap, buildTagsSiteMap], () => {
  logger.info('All operations completed successfully');
});
