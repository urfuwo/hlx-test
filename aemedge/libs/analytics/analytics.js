function anonId() {
  return Array.from({ length: 75 }, (_, i) => String.fromCharCode(48 + i))
    .filter((a) => /\d|[A-Z]/i.test(a))
    .filter(() => Math.random() * 75 > 70)
    .join('');
}

function mapParams(dlState) {
  const params = new Map();
  params.set('pageName', `${dlState.site.name}:${dlState.page.name}`);
  params.set('pageURL', window.location.href);
  return params;
}

function getBaseURL() {
  return 'https://smetrics.sap.com/b/ss/sapnewsdev/1/JS-2.26.0-LDQM/s7756675555877';
}

function sendBeacon(dl) {
  try {
    const dlState = dl.getState();
    let url = `${getBaseURL()}?vid=${anonId()}`;
    mapParams(dlState).forEach((value, key) => {
      url += `&${key}=${encodeURIComponent(value)}`;
    });
    // #todo: clean url
    window.console.log(`# sendBeacon: ${url}`);
    // navigator.sendBeacon(url);
  } catch (error) {
    // something went wrong
  }
}

export {
  // eslint-disable-next-line import/prefer-default-export
  sendBeacon,
};
