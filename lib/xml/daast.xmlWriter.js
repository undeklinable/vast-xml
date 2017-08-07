'use strict';

const xmlBuilder = require('xmlbuilder');
const VastXmlWriter = require('./vast.xmlWriter');
const xmlConstants  = require('../constant/xml.json');

class DaastXmlWriter extends VastXmlWriter {
  constructor(options = {}) {
    super(options);
  }

  initVastDocument(version) {
    this._xmlDocument = xmlBuilder.create(xmlConstants.daast, { version: '1.0', encoding : xmlConstants.utf8Encoding });
    this._setVersion(version);
    return this;
  }
}

module.exports = DaastXmlWriter;