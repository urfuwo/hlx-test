// eslint-disable-next-line import/no-cycle
import { loadScript } from './aem.js';

function getEnvType(hostname = window.location.hostname) {
  const fqdnToEnvType = {
    'www.sap.com': 'prod',
    'www-qa.sap.com': 'stage',
    'main--hlx-test--urfuwo.hlx.live': 'stage',
  };
  return fqdnToEnvType[hostname] || 'dev';
}

async function sendAdobeDCBeacon(stl = null) {
  window.adobeDataLayer.push({
    event: stl ? 'stlBeaconReady' : 'stBeaconReady',
  });
  window.console.log(`#L1: Beacon sent at ${Date.now() - window.adobeDCStart}ms`);
}

async function loadAdobeDC() {
  const adobeTagsSrc = {
    dev: 'https://assets.adobedtm.com/ccc66c06b30b/6fa889b263e0/launch-3318725e3375-development.min.js',
    stage: 'https://assets.adobedtm.com/ccc66c06b30b/6fa889b263e0/launch-3318725e3375-development.min.js',
    prod: 'https://assets.adobedtm.com/ccc66c06b30b/6fa889b263e0/launch-3318725e3375-development.min.js',
  };
  const envType = getEnvType();
  if (envType && adobeTagsSrc[envType]) {
    await loadScript(adobeTagsSrc[envType], {});
    window.console.log(`#L1-4: AdobeDC loaded at ${Date.now() - window.adobeDCStart}ms`);
  }
}

window.console.log(`#L1: AdobeDC loading at ${Date.now() - window.adobeDCStart}ms...`);
await loadAdobeDC();
await sendAdobeDCBeacon();
