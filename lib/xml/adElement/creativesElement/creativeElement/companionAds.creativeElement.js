'use strict';

const BaseCreativeElement = require('./base.creativeElement');
const XML_CONSTANTS  = require('../../../../constant/xml.json');


class CompanionAdsCreativeElement extends BaseCreativeElement {
  constructor(companionAds, track) {
    super(companionAds, track);
    this._track = track;
    this._xmlCompanionAdsElement = null;
  }

  initCreative(xmlCreativesElement) {
    super.initCreative(xmlCreativesElement);
    super.insertCreativeElement();
    return this;
  }

  insertCompanionAds() {
    this._xmlCompanionAdsElement = this._xmlCreativeElement.element(XML_CONSTANTS.companionAds, { required: 'any' });
    this._creatives.map((companionAd, index) => this._insertCompanionAd(companionAd, index));

    return this;
  }

  _insertCompanionAd(companionAd, index) {
    const companionXmlElement = this._xmlCompanionAdsElement.element(XML_CONSTANTS.companion, Object.assign({id : index}, companionAd.attributes));
    companionAd.resources.forEach(resource =>
      this._insertCompanionCreativeResource(resource, companionXmlElement));
    this._insertAdditionalCompanionElements(companionAd, companionXmlElement);

    return companionXmlElement;
  }

  _insertCompanionCreativeResource(resource, companionXmlElement) {
    companionXmlElement.element(XML_CONSTANTS[resource.type], (resource.creativeType) ? { creativeType : resource.creativeType } : {}).cdata(resource.uri);

    return this;
  }

  _insertAdditionalCompanionElements(companionAd, companionXmlElement) {
    if (companionAd.companionTrackingEvents && companionAd.companionTrackingEvents.length > 0) {
      const trackingEvents = companionXmlElement.element(XML_CONSTANTS.trackingEvent);
      companionAd.companionTrackingEvents.forEach(trackingEvent =>
        trackingEvents.element(XML_CONSTANTS.tracking, {event: trackingEvent.event }).cdata(trackingEvent.url));
    }

    if (companionAd.companionClickThrough) {
      companionXmlElement.element(XML_CONSTANTS.companionClickThrough).cdata(companionAd.companionClickThrough);
    }

    if (companionAd.altText) {
      companionXmlElement.element(XML_CONSTANTS.altText).cdata(companionAd.altText);
    }

    if (companionAd.adParameters) {
      companionXmlElement.element(XML_CONSTANTS.adParameters, { xmlEncoded : companionAd.adParameters.xmlEncoded }).cdata(companionAd.adParameters.data);
    }

    return this;
  }
}

module.exports = CompanionAdsCreativeElement;