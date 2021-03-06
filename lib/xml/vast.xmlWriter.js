'use strict';

const xmlBuilder = require('xmlbuilder');
const VastAdElement = require('./adElement/vast.adElement');
const xmlConstants  = require('../constant/xml.json');

class VastXmlWriter {
  constructor(options = {}) {
    this._options = options;
    this._track = !options.track;
    this._xmlDocument = null;
  }

  _setVersion(version) {
    this._xmlDocument.att(xmlConstants.version, version)
  }

  initVastDocument(version) {
    this._xmlDocument = xmlBuilder.create(xmlConstants.vast, { version: '1.0', encoding : xmlConstants.utf8Encoding });
    this._setVersion(version);
    return this;
  }

  attachErrorUri(vastErrorURI) {
    if (vastErrorURI) {
      this._xmlDocument.element(xmlConstants.error).cdata(vastErrorURI);
    }

    return this;
  }

  attachAd(ad) {
    const vastAdElement = new VastAdElement(ad, this._track);
    vastAdElement.initAd(this._xmlDocument).configureAdByType();
    return this;
  }

  end() {
    return this._xmlDocument.end(this._options);
  }
}

module.exports = VastXmlWriter;