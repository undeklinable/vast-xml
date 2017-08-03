'use strict';

const CREATIVE_TYPES = {
 LINEAR: 'Linear',
 NON_LINEAR: 'NonLinearAd',
 COMPANION_AD: 'CompanionAd'
};

class BaseCreativeElement {
  constructor(creatives, track) {
    this._creatives = creatives;
    this._track = track;
    this._xmlRootElement = null;
    this._xmlCreativeElement = null;
  }

  static get types() {
    return CREATIVE_TYPES;
  }

  insertCreativeElement(creative = null) {
    const creativeAttr = creative ? creative.attributes : null;
    this._xmlCreativeElement =  this._xmlRootElement.element('Creative', creativeAttr);
    return this;
  }

  initCreative(xmlCreativesElement) {
    this._xmlRootElement = xmlCreativesElement;
    return this;
  }

  /** Commmon methods **/

  insertAdParameters(creative) {
    if (creative.adParameters) {
      this._xmlCreativeTypeElement.element('AdParameters', {
        xmlEncoded : creative.adParameters.xmlEncoded
      }).cdata(creative.adParameters.data);
    }

    return this;
  }

  insertClick(creative, subElement = null) {
    const xmlElement = subElement ? this._xmlCreativeTypeElement.element('VideoClicks') : this._xmlCreativeTypeElement;

    creative.videoClicks.forEach(click =>
      xmlElement.element(click.type, { id : click.id }).cdata(click.url));
  }
}

module.exports = BaseCreativeElement;