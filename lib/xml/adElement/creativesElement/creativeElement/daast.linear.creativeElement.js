'use strict';

const XML_CONSTANTS  = require('../../../../constant/xml.json');
const VastLinearCreatives = require('./vast.linear.creativeElement');

class DaastLinearCreativeElement extends VastLinearCreatives {
  constructor(creative, track) {
    super(creative, track);
  }

  insertClick(creative, subElement = null) {
    const xmlElement = subElement ? this._xmlCreativeTypeElement.element(XML_CONSTANTS.adInteractions) : this._xmlCreativeTypeElement;

    if (creative.clickTrough) {
      xmlElement.element(XML_CONSTANTS.clickThrough, creative.clickTrough);
    }

    if (creative.customClick.length > 0) {
      creative.customClick.forEach(customClick =>  xmlElement.element(XML_CONSTANTS.customClick, customClick));
    }

    if (creative.clickTracking.length > 0) {
      creative.clickTracking.forEach(clickTrack =>  xmlElement.element(XML_CONSTANTS.clickTracking, clickTrack));
    }

    return this;
  }

  insertLinearCreatives() {
    this._creatives.forEach(creative => {
      super.insertCreativeElement(creative)
        .insertCreativeTypeElement(creative)
        .insertAdParameters(creative)
        .insertIcons(creative)
        .insertDuration(creative)
        .insertTrackingEvents(creative)
        .insertClick(creative, XML_CONSTANTS.videoClicks)
        .insertMediaFiles(creative);
    });
  }
}

module.exports = DaastLinearCreativeElement;