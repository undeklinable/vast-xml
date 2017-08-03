'use strict';

const xmlBuilder = require('xmlbuilder');
const AdElement = require('./adElement/adElement');

class XmlWriter {
  constructor(options = {}) {
    this._options = options;
    this._track = !!options.track;
    this._xmlDocument = null;
  }

  _setVersion(version) {
    this._xmlDocument.att('version', version)
  }

  initVastDocument(version) {
    this._xmlDocument = xmlBuilder.create('VAST', { version: '1.0', encoding : 'UTF-8' });
    this._setVersion(version);
    return this;
  }

  attachErrorUri(vastErrorURI) {
    if (vastErrorURI) {
      this._xmlDocument.element('Error').cdata(vastErrorURI);
    }

    return this;
  }

  attachAd(ad) {
    const adElement = new AdElement(ad, this._track);
    adElement.initAd(this._xmlDocument).configureAdByType();
    return this;
  }

  end() {
    return this._xmlDocument.end(this._options);
  }
}

module.exports = XmlWriter;