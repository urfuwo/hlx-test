function getEnvType(hostname = window.location.hostname) {
  const fqdnToEnvType = {
    'www.sap.com': 'prod',
    'www-qa.sap.com': 'stage',
    'main--hlx-test--urfuwo.hlx.live': 'stage',
  };
  return fqdnToEnvType[hostname] || 'dev';
}

function sVal() {
  // eslint-disable-next-line no-bitwise
  return Math.abs(~~(Math.random() * 100000000000));
}

function getAnonvid() {
  // eslint-disable-next-line no-bitwise
  return Math.abs(~~(Math.random() * 1000000000000));
}

function getBaseURL() {
  return `https://smetrics.sap.com/b/ss/sapnewsdev/1/s${sVal()}`;
}

function ts() {
  const now = new Date();
  const year = now.getYear();
  return `${now.getDate()}/${now.getMonth()}/${year < 1900 ? year + 1900 : year} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${now.getDay()} ${now.getTimezoneOffset()}`;
}

// Ref: https://experienceleague.adobe.com/en/docs/analytics/implementation/validate/query-parameters
function mapParams(dlState) {
  const params = new Map();
  params.set('vid', `${getAnonvid()}`);
  params.set('ce', 'UTF-8');
  params.set('cc', 'USD');
  params.set('ch', dlState.page.section);
  params.set('server', 'sap');
  // params.set('_account', 'sapnewsdev');
  params.set('pageName', `ds${dlState.site.name}:${dlState.page.name}`);
  // pageURL
  const pageURL = window.location.href;
  params.set('g', pageURL);
  // timestamp
  params.set('t', ts());
  // pccr=true for new visitors
  // params.set('pccr', true);
  params.set('v1', `${dlState.site.name}:${dlState.page.country}`);
  params.set('v2', dlState.page.language);
  params.set('v3', dlState.page.section);
  params.set('v4', navigator.userAgent);
  params.set('v7', window.location.hostname);
  // !consentless! params.set('v9', dlState.user.loginStatus === 'yes' ? 'logY' : 'logN');
  params.set('v20', `ds${dlState.site.name}:${dlState.page.name}`);
  params.set('v75', pageURL);
  params.set('v128', document.title);
  return params;
}

function sendBeacon(dl = window.adobeDataLayer) {
  try {
    const dlState = dl.getState();
    let url = `${getBaseURL()}?AQB=1`;
    mapParams(dlState).forEach((value, key) => {
      url += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    });
    url += '&AQE=1';
    navigator.sendBeacon(url);
  } catch (error) {
    // something went wrong
  }
}

export {
  getEnvType,
  sendBeacon,
};
