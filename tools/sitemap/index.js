/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
const { createReadStream, createWriteStream } = require('fs');
const { resolve } = require('path');
const { parser } = require('stream-json/Parser');
const { streamArray } = require('stream-json/streamers/StreamArray');
const { streamValues } = require('stream-json/streamers/StreamValues');
const { pick } = require('stream-json/filters/Pick');
const { createGzip } = require('zlib');
const { SitemapStream, streamToPromise, xmlLint } = require('sitemap');
const { chain } = require('stream-chain');
const { ReadableWebToNodeStream } = require('readable-web-to-node-stream');
const async = require('async');
const log4js = require('log4js');
const { Collector } = require('./transformers/collector.js');

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
    () => logger.info('sitemap xml is valid'),
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

const getPipeline = (readStream, functions) => chain([readStream, parser(), pick({ filter: 'data' }), streamArray(), ...functions]);

const collectTopics = async () => {
  const response = await fetch(
    'https://main--hlx-test--urfuwo.hlx.page/aemedge/articles-index.json',
  );
  const responseStream = new ReadableWebToNodeStream(response.body);
  const siteMapPath = resolve('../../', 'sitemap-topics.xml');
  const collector = new Collector();
  const pipeline = getPipeline(responseStream, [
    (data) => {
      const { value } = data;
      return JSON.parse(value.topics);
    },
    collector,
  ]);
  pipeline.on('data', () => {});
  pipeline.on('finish', () => {
    const topics = collector.getCollection();
    const siteMap = getSiteMapStream(siteMapPath);
    topics.forEach((value) => {
      siteMap.write({
        url: `/topics/${value}`,
        changefreq: 'weekly',
      });
    });
    siteMap.end();
    logger.info('sitemap generated successfully at', siteMapPath);
    validateXml(siteMapPath);
  });
};

const writeSiteMap = async () => {
  const response = await fetch(
    'https://main--hlx-test--urfuwo.hlx.page/aemedge/authors-index.json',
  );
  const responseStream = new ReadableWebToNodeStream(response.body);
  const siteMapPath = resolve('../../', 'sitemap-authors.xml');
  const sitemap = getSiteMapStream(siteMapPath);
  const pipeline = getPipeline(responseStream, [
    (data) => {
      const { value } = data;
      sitemap.write({
        url: value.path,
        lastmod: formatDate(value.lastModified),
        changefreq: 'weekly',
      });
      return value;
    },
  ]);
  pipeline.on('data', (data) => logger.debug('writing entry', data.path));
  pipeline.on('finish', () => {
    sitemap.end();
    logger.info('sitemap generated successfully at', siteMapPath);
    validateXml(siteMapPath);
  });
  pipeline.on('error', (e) => e.code === 'EPIPE' || logger.error(e));
};

async.parallel([writeSiteMap, collectTopics], () => {
  logger.info('All operations completed successfully');
});
