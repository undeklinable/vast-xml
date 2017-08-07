'use strict';

const DastXmlWriter = require('./xml/daast.xmlWriter');
const DastAd = require('./ad/daast.ad');
const Validator = require('./validation/validator');

const DEFAULT_DAAST_VERSION = '1.0';

class DaastXml {
  constructor(settings = {}) {
    this._version = settings.version || DEFAULT_DAAST_VERSION;
    this._daastErrorURI = settings.daastErrorURI;
    this._ads = [];
  }

  static validate(daastXml, version) {
    return Validator.validateDAAST(daastXml, version);
  }

  attachAd(settings) {
    const ad = new DastAd(settings);
    this._ads.push(ad);
    return ad;
  }

  get ads() { return this._ads; }

  get daastErrorURI() { return this._daastErrorURI; }

  get version() { return this._version; }

  xml(options = {}) {
    const xmlResponse = new DastXmlWriter(options);

    xmlResponse.initVastDocument(this._version)
      .attachErrorUri(this._daastErrorURI);

    this._ads.forEach(ad => xmlResponse.attachAd(ad));

    return xmlResponse.end(options);
  };
}

module.exports = DaastXml;
