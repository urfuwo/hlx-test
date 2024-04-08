/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
const { createReadStream, createWriteStream } = require('fs');
const { resolve } = require('path');
const { parser } = require('stream-json/Parser');
const { streamArray } = require('stream-json/streamers/StreamArray');
const { streamValues } = require('stream-json/streamers/StreamValues');
const { disassembler } = require('stream-json/Disassembler');
const { pick } = require('stream-json/filters/Pick');
const { createGzip } = require('zlib');
const { SitemapStream, streamToPromise, xmlLint } = require('sitemap');
const { chain } = require('stream-chain');
const { ReadableWebToNodeStream } = require('readable-web-to-node-stream');
const async = require('async');
const { Collector } = require('./transformers/collector.js');

const formatDate = (value) => {
  try {
    return new Date(value * 1000).toISOString().split('T')[0];
  } catch (error) {
    console.error(error);
    return '';
  }
};

const validateXml = (siteMapPath) => {
  xmlLint(createReadStream(siteMapPath)).then(
    () => console.log('sitemap xml is valid'),
    ([err, stderr]) => console.error('sitemap xml is invalid', stderr),
  );
};

const getSiteMapStream = (siteMapPath) => {
  const sitemap = new SitemapStream({ hostname: 'http://qa-sap.com' });
  const writeStream = createWriteStream(siteMapPath);
  sitemap.pipe(writeStream);
  sitemap.pipe(createGzip());
  return sitemap;
};

const collectTopics = async () => {
  const response = await fetch(
    'https://main--hlx-test--urfuwo.hlx.page/aemedge/articles-index.json',
  );
  const responseStream = new ReadableWebToNodeStream(response.body);
  const siteMapPath = resolve('../../', 'sitemap-topics.xml');
  const collector = new Collector();
  const pipeline = chain([
    responseStream,
    parser(),
    pick({ filter: 'data' }),
    streamArray(),
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
    console.log('sitemap generated successfully at', siteMapPath);
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
  const pipeline = chain([
    responseStream,
    parser(),
    pick({ filter: 'data' }),
    streamArray(),
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
  pipeline.on('data', (data) => console.debug('writing entry', data.path));
  pipeline.on('finish', () => {
    sitemap.end();
    console.log('sitemap generated successfully at', siteMapPath);
    validateXml(siteMapPath);
  });
  pipeline.on('error', (e) => e.code === 'EPIPE' || console.error(e));
};

// writeSiteMap();

// collectTopics();

async.parallel([collectTopics, writeSiteMap], (err, results) => {
  console.log(results);
});
