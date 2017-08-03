'use strict';

const fs = require('fs');
const libxmljs = require('libxmljs');
const VastXML = require('../../index');

const defaultOptions = { pretty : true, indent: '  ', newline: '\n' };

const VAST_30_XSD = libxmljs.parseXmlString(fs.readFileSync('/Users/victor/Projects/vast-xml/test/files/vast3_draft.xsd').toString());
const INLINE_VAST_AD_VALID = require('../data/inlineVASTAdValid.json');
const INLINE_VAST_AD_NO_SEQUENCE_VALID = require('../data/inlineVASTAdNoSeqValid.json');
const CREATIVE_VALID = require('../data/creativeValid.json');

describe('validate VAST XML documents', () => {
  it('should validate an Inline VAST', () => {
    const vast = new VastXML();
    const ad = vast.attachAd(INLINE_VAST_AD_VALID);
    const creative = ad.attachCreative('Linear', CREATIVE_VALID);

    creative.attachVideoClick('ClickThrough', 'http://irrelevantDomain.com');

    const xmlObj = libxmljs.parseXmlString(vast.xml(defaultOptions));
    const result = xmlObj.validate(VAST_30_XSD);

    console.info(xmlObj.toString());


    return result;
  });
});
