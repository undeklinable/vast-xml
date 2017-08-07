'use strict';

const XML_CONSTANTS  = require('../../../../constant/xml.json');
const VastLinearCreatives = require('./linear.creativeElement');

class DaastLinearCreativeElement extends VastLinearCreatives {
  constructor(creative, track) {
    super(creative, track);
  }

  insertClick(creative, subElement = null) {
    const xmlElement = subElement ? this._xmlCreativeTypeElement.element(XML_CONSTANTS.adInteractions) : this._xmlCreativeTypeElement;

    if (creative.clickTrough) {
      xmlElement.element('ClickThrough', creative.clickTrough);
    }

    if (creative.customClick.length > 0) {
      creative.customClick.forEach(customClick =>  xmlElement.element('CustomClick', customClick));
    }

    if (creative.clickTracking.length > 0) {
      creative.clickTracking.forEach(clickTrack =>  xmlElement.element('CustomClick', clickTrack));
    }

    return this;
  }
}

module.exports = DaastLinearCreativeElement;