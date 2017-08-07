'use strict';

const XmlWriter = require('./lib/xml/vast.xmlWriter');
const Ad = require('./lib/ad/vast.ad');
const Validator = require('./lib/validation/validator');

const DEFAULT_VAST_VERSION = '3.0';

class VastXml {
  constructor(settings = {}) {
    this._version = settings.version || DEFAULT_VAST_VERSION;
    this._vastErrorURI = settings.vastErrorURI;
    this._ads = [];
  }

  static validate(vastXml, type, version) {
    return Validator.validateVAST(vastXml, version);
  }

  attachAd(settings) {
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
      .attachErrorUri(this._vastErrorURI);

    this._ads.forEach(ad => xmlResponse.attachAd(ad));

    return xmlResponse.end(options);
  };
}


class DaastXml {

}

module.exports = VastXml;
