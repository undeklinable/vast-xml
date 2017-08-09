'use strict';

const LinearCreativeElement = require('./creativeElement/vast.linear.creativeElement');
const NonLinearCreativesElement = require('./creativeElement/nonLinear.creativesElement');
const CompanionAdsCreativeElement = require('./creativeElement/companionAds.creativeElement');
const XML_CONSTANTS  = require('../../../constant/xml.json');

class VastCreativesElement {
  constructor(ad, track) {
    this._creatives = ad.creatives;
    this._track = track;
  }

  initCreatives(xmlElement) {
    this._xmlCreativesElement = xmlElement.element(XML_CONSTANTS.creatives);
    return this;
  }

  insertLinearCreatives() {
    const linearCreatives = this._creatives.filter(c => c.type === XML_CONSTANTS.linear);

    if (linearCreatives.length > 0) {
      const linearCreativeElement = new LinearCreativeElement(linearCreatives, this._track);
      linearCreativeElement.initCreative(this._xmlCreativesElement)
        .insertLinearCreatives(this._xmlCreativesElement);

      this.insertCompanionAdCreatives();
    }

    return this;
  }

  insertNonLinearCreatives() {
    const nonLinearCreatives = this._creatives.filter(c => c.type === XML_CONSTANTS.nonLinear);

    if (nonLinearCreatives.length > 0) {
      const nonLinearCreativeElement = new NonLinearCreativesElement(nonLinearCreatives, this._track);
      nonLinearCreativeElement.initCreative(this._xmlCreativesElement)
        .insertNonLinearCreatives();
    }

    return this;
  }

  insertCompanionAdCreatives() {
    const companionAds = this._creatives.filter(c => c.type === XML_CONSTANTS.companionAd);

    if (companionAds.length > 0) {
      const companionAdsElement = new CompanionAdsCreativeElement(companionAds, this._track);
      companionAdsElement.initCreative(this._xmlCreativesElement)
        .insertCompanionAds();
    }

    return this;
  }
}

module.exports = VastCreativesElement;