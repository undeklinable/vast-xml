'use strict';

const LinearCreativeElement = require('./creativeElement/linear.creativeElement');
const NonLinearCreativesElement = require('./creativeElement/nonLinear.creativesElement');
const CompanionAdsCreativeElement = require('./creativeElement/companionAds.creativeElement');


class CreativesElement {
  constructor(ad, track) {
    this._creatives = ad.creatives;
    this._track = track;
  }

  initCreatives(xmlElement) {
    this._xmlCreativesElement = xmlElement.element('Creatives');
    return this;
  }

  insertLinearCreatives() {
    if (this._creatives.includes(c => c.type === 'Linear')) {
      const linearCreativeElement = new LinearCreativeElement(this._creatives.filter(c => c.type === 'Linear'), this._track);
      linearCreativeElement.initCreative(this._xmlCreativesElement)
        .insertLinearCreatives();
    }
  }

  insertNonLinearCreatives() {
    if (this._creatives.includes(c => c.type === 'NonLinear')) {
      const nonLinearCreativeElement = new NonLinearCreativesElement(this._creatives.filter(c => c.type === 'NonLinear'), this._track);
      nonLinearCreativeElement.initCreative(this._xmlCreativesElement)
        .insertNonLinearCreatives();
    }
  }

  insertCompanionAdCreatives() {
    if (this._creatives.includes(c => c.type === 'CompanionAd')) {
      const companionAdsElement = new CompanionAdsCreativeElement(this._creatives.filter(c => c.type === 'CompanionAd'), this._track);
      companionAdsElement.initCreative(this._xmlCreativesElement)
        .insertCompanionAds();
    }
  }
}

module.exports = CreativesElement;