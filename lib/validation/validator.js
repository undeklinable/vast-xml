'use strict';

const fs = require('fs');
const libxmljs = require('libxmljs');

const VAST_SCHEMAS = {
  VAST_30: libxmljs.parseXmlString(fs.readFileSync('/Users/victor/Projects/vast-xml/lib/schemas/vast3_draft.xsd').toString()),
  VAST_201: libxmljs.parseXmlString(fs.readFileSync('/Users/victor/Projects/vast-xml/lib/schemas/vast_2.0.1.xsd').toString())
};

const VAST_TYPES = {
  VAST_30: 'VAST_30',
  VAST_201: 'VAST_201'
};

const DEFAULT_OPTIONS = { pretty : true, indent: '  ', newline: '\n' };

class Validator {
  static validateVAST(vastXml, version) {
    if (!VAST_TYPES[version]) {
      throw new Error(`Unknown VAST version - Supported versions: ${Object.keys(VAST_TYPES)}`);
    }

    const xmlObj = libxmljs.parseXmlString(vastXml.xml(DEFAULT_OPTIONS));
    const isValidXML = xmlObj.validate(VAST_SCHEMAS[version]);

    if (!isValidXML) {
      throw new Error(`Invalid XML:\n${xmlObj.toString()}\n${xmlObj.validationErrors}`)
    }
  }
}

module.exports = Validator;