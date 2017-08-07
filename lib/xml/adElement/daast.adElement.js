'use strict';

const VastAdElement = require('./vast.adElement');
const XML_CONSTANTS  = require('../../constant/xml.json');
const _ = require('underscore');

class DaastAdElement extends VastAdElement {
  constructor(ad, track) {
    super(ad, track);
  }
  
  insertExpires(xmlElement) {
    xmlElement.element('Expires', this._ad.expires);
  }

  insertPricing(xmlElement) {
    if (this._ad.pricing) {
      xmlElement.element('Pricing', _.omit(this._ad.pricing, 'price'), this._ad.pricing.price);
    }
  }

  insertCategory(xmlElement) {
    xmlElement.element('Category', this._ad.category);
  }

  _insertWrapperAdTagURIElement(wrapperElement) {
    wrapperElement.element(XML_CONSTANTS.daastAdTagURI).cdata(this._ad.daastAdTagURI);
    return wrapperElement;
  }

  setAdAsInline() {
    const inlineElement = super.setAdAsInline();
    this.insertExpires(inlineElement);
    this.insertPricing(inlineElement);
    this.insertCategory(inlineElement);
  }
}

module.exports = DaastAdElement;