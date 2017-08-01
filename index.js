'use strict';

const XmlWriter = require('./lib/xml/xmlWriter');
const Ad = require('./lib/ad');

const DEFAULT_VAST_VERSION = '3.0';

class VAST {
  constructor(settings = {}) {
    this.version = settings.version || DEFAULT_VAST_VERSION;
    this.VASTErrorURI = settings.VASTErrorURI;
    this.ads = [];
  }

  attachAd(settings = {}) {
    const ad = new Ad(settings);
    this.ads.push(ad);
    return ad;
  }

  xml(options = {}) {
    const xmlResponse = new XmlWriter(options);

    xmlResponse.initVastDocument(this.version)
      .attachErrorUri(this.VASTErrorURI);

    this.ads.forEach(ad => {
      xmlResponse.attachAd(xmlResponse, ad);

      insertLinearCreative(ad, track, creatives);
      insertNonLinearCreative(ad, creatives);
      insertCompanionAdCreatives(ad, creatives);

      addExtensions(ad, creatives);

    });

    return xmlResponse.end(options);
  };
}

function vastFactory(settings) {
  return new VAST(settings);
}

module.exports = vastFactory;
