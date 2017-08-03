'use strict';

const XmlWriter = require('./lib/xml/xmlWriter');
const Ad = require('./lib/ad/ad');

const DEFAULT_VAST_VERSION = '3.0';

class VAST {
  constructor(settings = {}) {
    this._version = settings.version || DEFAULT_VAST_VERSION;
    this._vastErrorURI = settings.vastErrorURI;
    this._ads = [];
  }

  attachAd(settings = {}) {
    const ad = new Ad(settings);
    this._ads.push(ad);
    return ad;
  }

  get ads() { return this._ads; }

  get vastErrorURI() { return this._vastErrorURI; }

  get version() { return this._version; }

  xml(options = {}) {
    const xmlResponse = new XmlWriter(options);

    xmlResponse.initVastDocument(this._version)
      .attachErrorUri(this._VASTErrorURI);

    this._ads.forEach(ad => {
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
