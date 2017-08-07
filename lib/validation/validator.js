'use strict';

const fs = require('fs');
const libxmljs = require('libxmljs');

const VAST_SCHEMAS = {
  VAST_30: libxmljs.parseXmlString(fs.readFileSync('/Users/victor/Projects/vast-xml/lib/schemas/vast3_draft.xsd').toString()),
  VAST_201: libxmljs.parseXmlString(fs.readFileSync('/Users/victor/Projects/vast-xml/lib/schemas/vast_2.0.1.xsd').toString())
};

const VAST_VERSIONS = {
  VAST_30: 'VAST_30',
  VAST_201: 'VAST_201'
};

const DAAST_SCHEMAS = {
  DAST_11: libxmljs.parseXmlString(fs.readFileSync('/Users/victor/Projects/vast-xml/lib/schemas/daast-1.1.xsd').toString())
};

const DAAST_VERSIONS = {
  DAST_11: 'DAAST_11'
};


const DEFAULT_OPTIONS = { pretty : true, indent: '  ', newline: '\n' };

class Validator {
  static validateVAST(vastXml, version) {
    if (!VAST_VERSIONS[version]) {
      throw new Error(`Unknown VAST version - Supported versions: ${Object.keys(VAST_VERSIONS)}`);
    }

    const xmlObj = libxmljs.parseXmlString(vastXml.xml(DEFAULT_OPTIONS));
    const isValidXML = xmlObj.validate(VAST_SCHEMAS[version]);

    if (!isValidXML) {
      throw new Error(`Invalid XML:\n${xmlObj.toString()}\n${xmlObj.validationErrors}`)
    }
  }

  static validateDAAST(daastXml, version) {
    if (!DAAST_VERSIONS[version]) {
      throw new Error(`Unknown DAAST version - Supported versions: ${Object.keys(DAAST_VERSIONS)}`);
    }

    const xmlObj = libxmljs.parseXmlString(daastXml.xml(DEFAULT_OPTIONS));
    const isValidXML = xmlObj.validate(DAAST_SCHEMAS[version]);

    if (!isValidXML) {
      throw new Error(`Invalid XML:\n${xmlObj.toString()}\n${xmlObj.validationErrors}`)
    }
  }
}

module.exports = Validator;