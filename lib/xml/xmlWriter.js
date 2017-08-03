'use strict';

const xmlBuilder = require('xmlbuilder');
const AdElement = require('./adElement/adElement');

class XmlWriter {
  constructor(options ={}) {
    this._track = !!options.track;
  }

  initVastDocument(version) {
    this._xmlDocument = xmlBuilder.create('VAST', { version, encoding : 'UTF-8' });
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
  }
}

module.exports = XmlWriter;