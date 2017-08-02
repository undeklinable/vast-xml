'use strict';

const BaseCreativeElement = require('./base.creativeElement');

class CompanionAdsCreativeElement extends BaseCreativeElement {
  constructor(creatives, track) {
    super(creatives, track);

    this._xmlCompanionAdsElement = null;
  }

  initCreative(xmlCreativesElement) {
    super.initCreative(xmlCreativesElement);
  }

  insertCompanionAds() {
    this.insertCreativeElement();
    this._xmlCompanionAdsElement = this._xmlCreativeElement.element('CompanionAds');
    return this._creatives.map(creative => this._insertCompanionAd(creative));
  }

  _insertCompanionAd(creative) {
    const companionXmlElement = this._xmlCompanionAdsElement.element('Companion', creative.attributes);
    creative.resources.forEach(resource =>
      this._insertCompanionCreativeResource(resource, companionXmlElement));

    return companionXmlElement;
  }

  _insertCompanionCreativeResource(resource, companionXmlElement) {
    companionXmlElement.element(resource.type, (resource.creativeType) ? { creativeType : resource.creativeType } : {}).cdata(resource.uri);
    if (resource.adParameters) {
      companionXmlElement.element('AdParameters', { xmlEncoded : resource.adParameters.xmlEncoded }).cdata(resource.adParameters.data);
    }

    return companionXmlElement;
  }
}

module.exports = CompanionAdsCreativeElement;