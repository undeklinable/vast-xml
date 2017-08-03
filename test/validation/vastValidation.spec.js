'use strict';

const fs = require('fs');
const libxmljs = require('libxmljs');
const VastXML = require('../../index');

const defaultOptions = { pretty : true, indent: '  ', newline: '\n' };

const VAST_30_XSD = libxmljs.parseXmlString(fs.readFileSync('../files/vast3_draft.xsd').toString());
const INLINE_VAST_VALID = require('../data/inlineVASTAdValid.json');

describe('validate VAST XML documents', () => {
  it('should validate an Inline VAST', () => {

  });
});
