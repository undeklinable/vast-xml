'use strict';

const BaseCreativeElement = require('./base.creativeElement');

class NonLinearCreativesElement extends BaseCreativeElement {
  constructor(creative, track) {
    super(creative, track);
    this._xmlNonLinearAdsElement = null;
    this._xmlCreativeTypeElement = null;
  }

  initCreative(xmlCreativesElement) {
    super.initCreative(xmlCreativesElement);

    super.insertCreativeElement();
    this._xmlNonLinearAdsElement = this._xmlCreativeElement.element('NonLinearAds');
  }

  insertNonLinearCreatives() {
    this._creatives.forEach(creative => {
        this.insertCreativeResources(creative)
        .insertClick(creative)
        .insertAdParameters(creative);
    });

    return this;
  }

  insertCreativeResources(creative) {
    this._xmlCreativeTypeElement = this._xmlNonLinearAdsElement.element(creative.type, creative.attributes);

    creative.resources.forEach(resource => {
      const attributes = {};
      if (resource.creativeType) {
        attributes.creativeType = resource.creativeType;
      }

      this._xmlCreativeTypeElement.element(resource.type, attributes).cdata(resource.uri);
    });

    return this;
  }
}

module.exports = NonLinearCreativesElement;