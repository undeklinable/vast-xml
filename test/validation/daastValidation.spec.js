'use strict';

const fs = require('fs');
const libxmljs = require('libxmljs');
const DaastXML = require('../../index').DaastXml;

const defaultOptions = { pretty : true, indent: '  ', newline: '\n' };

const DAAST_11_XSD = libxmljs.parseXmlString(fs.readFileSync('/Users/victor/Projects/vast-xml/lib/schemas/daast-1.1.xsd').toString());
const INLINE_DAAST_AD_VALID = require('../data/DAAST/inlineDAASTAdValid.json');
const CREATIVE_VALID = require('../data/DAAST/creativeValid.json');
const MEDIA_FILE_ATTR = require('../data/DAAST/mediaFileAttr.json');
const WRAPPER_DAAST_AD_VALID = require('../data/DAAST/wrapperDAASTAdValid.json');
const COMPANION_AD_VALID = require('../data/DAAST/companionAdValid.json');

describe('validate DAAST XML documents', () => {
  beforeEach(() => {
    this._daast = new DaastXML();
  });

  it('should validate an Inline DAAST', () => {
    const ad = this._daast.attachAd(INLINE_DAAST_AD_VALID);
    const creative = ad.attachCreative('Linear', CREATIVE_VALID);

    ad.attachImpression({ id : 23, url : 'http://irrelevantDomain.com' });
    creative.attachVideoClick('ClickThrough', 'http://irrelevantDomain.com');
    creative.attachMediaFile('http://irrelevantDAASTCreative.com', MEDIA_FILE_ATTR);
  });

  it.only('should validate an Inline DAAST with companion Ad', () => {
    const ad = this._daast.attachAd(INLINE_DAAST_AD_VALID);
    const creative = ad.attachCreative('Linear', CREATIVE_VALID);

    ad.attachImpression({ id : 23, url : 'http://irrelevantDomain.com' });
    creative.attachVideoClick('ClickThrough', 'http://irrelevantDomain.com');
    creative.attachMediaFile('http://irrelevantDAASTCreative.com', MEDIA_FILE_ATTR);
    ad.attachCompanionAd(COMPANION_AD_VALID.resources, COMPANION_AD_VALID.elements, COMPANION_AD_VALID.attributes);
  });

  it('should validate a wrapper DAAST', () => {
    const ad = this._daast.attachAd(WRAPPER_DAAST_AD_VALID);
    ad.attachImpression({ url: 'http://irrelevantDomain.com' });
  });

  afterEach(() => {
    const xmlObj = libxmljs.parseXmlString(this._daast.xml(defaultOptions));
    const isValidXML = xmlObj.validate(DAAST_11_XSD);


    console.log(xmlObj.toString());

    if (!isValidXML) {
      throw new Error(`Invalid XML:\n${xmlObj.toString()}\n${xmlObj.validationErrors}`)
    }
  })
});
