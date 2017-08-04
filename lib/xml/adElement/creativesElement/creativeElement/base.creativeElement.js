'use strict';

const XML_CONSTANTS  = require('../../../../constant/xml.json');

class BaseCreativeElement {
  constructor(creatives, track) {
    this._creatives = creatives;
    this._track = track;
    this._xmlRootElement = null;
    this._xmlCreativeElement = null;
    this._xmlCreativeTypeElement = null;
  }

  insertCreativeElement(creative = null) {
    const creativeAttr = creative ? creative.attributes : null;
    this._xmlCreativeElement =  this._xmlRootElement.element(XML_CONSTANTS.creative, creativeAttr);
    return this;
  }

  initCreative(xmlCreativesElement) {
    this._xmlRootElement = xmlCreativesElement;
    return this;
  }

  /** Commmon methods **/

  insertAdParameters(creative) {
    if (creative.adParameters) {
      this._xmlCreativeTypeElement.element(XML_CONSTANTS.adParameters, {
        xmlEncoded : creative.adParameters.xmlEncoded
      }).cdata(creative.adParameters.data);
    }

    return this;
  }

  insertClick(creative, subElement = null) {
    const xmlElement = subElement ? this._xmlCreativeTypeElement.element(XML_CONSTANTS.videoClicks) : this._xmlCreativeTypeElement;

    if (creative.videoClicks.length === 0) {
      throw new Error('No videoClicks defined for creative');
    }

    creative.videoClicks.forEach(click =>
      xmlElement.element(click.type, { id : click.id }).cdata(click.url));

    return this;
  }
}

module.exports = BaseCreativeElement;