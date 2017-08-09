'use strict';

const VastAdElement = require('./vast.adElement');
const DaastCreativesElement = require('./creativesElement/daast.creativeElement');
const XML_CONSTANTS  = require('../../constant/xml.json');
const _ = require('underscore');

class DaastAdElement extends VastAdElement {
  constructor(ad, track) {
    super(ad, track);
  }
  
  insertExpires(xmlElement) {
    if (this._ad.expires) {
      xmlElement.element(XML_CONSTANTS.expires, this._ad.expires);
    }
  }

  insertPricing(xmlElement) {
    if (this._ad.pricing) {
      xmlElement.element(XML_CONSTANTS.pricing, _.omit(this._ad.pricing, 'price'), this._ad.pricing.price);
    }
  }

  insertCategory(xmlElement) {
    xmlElement.element(XML_CONSTANTS.category, this._ad.category);
  }

  _insertWrapperAdTagURIElement(wrapperElement) {
    wrapperElement.element(XML_CONSTANTS.daastAdTagURI).cdata(this._ad.daastAdTagURI);
    return wrapperElement;
  }

  configureAdByType() {
    const subElementType = DaastAdElement.isWrapper(this._ad) ? this.setAdAsWrapper() : this.setAdAsInline();
    const daastCreativesElement = new DaastCreativesElement(this._ad, this._track);

    daastCreativesElement.initCreatives(subElementType)
      .insertLinearCreatives();

    this.addExtensions(subElementType);
  }

  setAdAsInline() {
    const inlineElement = this._xmlAdElement.element(XML_CONSTANTS.inline);

    this._insertInlineInfoElements(inlineElement);
    this.insertCategory(inlineElement);
    this.insertExpires(inlineElement);
    this.insertPricing(inlineElement);
    this.insertSurvey(inlineElement);
    this.insertError(inlineElement);
    this.insertImpressionTracker(inlineElement);

    return inlineElement;
  }
}

module.exports = DaastAdElement;