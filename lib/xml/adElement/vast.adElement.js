'use strict';

const CreativesElement = require('./creativesElement/vast.creativesElement');
const XML_CONSTANTS  = require('../../constant/xml.json');

const DEFAULT_AD_SYSTEM_NAME = 'Unknown AdSystem';
const DEFAULT_AD_SYSTEM_VERSION = '1.0';
const DEFAULT_AD_DESCRIPTION = 'No description';
const DEFAULT_AD_TITLE = 'No title';

function isWrapper(ad) {
  return (ad.structure.toLowerCase() === XML_CONSTANTS.wrapper.toLowerCase());
}

class VastAdElement {
  constructor(ad, track) {
    this._ad = ad;
    this._track = track;
    this._xmlAdElement = null;
  }

  initAd(xmlResponse) {
    const adOptions = { id : this._ad.id };
    if (this._ad.sequence) {
      adOptions.sequence = this._ad.sequence;
    }

    this._xmlAdElement = xmlResponse.element(XML_CONSTANTS.ad, adOptions);
    return this;
  }

  configureAdByType() {
    const subElementType = isWrapper(this._ad) ? this.setAdAsWrapper() : this.setAdAsInline();
    const creativesElement = new CreativesElement(this._ad, this._track);

    creativesElement.initCreatives(subElementType)
      .insertLinearCreatives()
      .insertNonLinearCreatives()
      .insertCompanionAdCreatives();

    this.addExtensions(subElementType);
  }

  insertError(xmlElement) {
    if (this._ad.Error) {
      xmlElement.element(XML_CONSTANTS.error).cdata(this._ad.Error);
    }

    return xmlElement;
  }

  insertImpressionTracker(xmlElement) {
    if (this._track) {
      this._ad.impressions.forEach(impression => {
        const impressionAttrs = impression.id ? {id: impression.id} : {};
        xmlElement.element(XML_CONSTANTS.impression, impressionAttrs).cdata(impression.url);
      });
    }

    return xmlElement;
  }

  insertSurvey(inlineElement) {
    this._ad.surveys.forEach(survey => {
      const attributes = {};
      if (survey.type) {
        attributes.type = survey.type;
      }

      inlineElement.element(XML_CONSTANTS.survey, attributes).cdata(survey.url);
    });
    
    return inlineElement;
  }

  _insertWrapperAdTagURIElement(wrapperElement) {
    wrapperElement.element(XML_CONSTANTS.vastAdTagURI).cdata(this._ad.vastAdTagURI);
    return wrapperElement;
  }

  setAdAsWrapper() {
    const wrapperElement = this._xmlAdElement.element(XML_CONSTANTS.wrapper);

    wrapperElement.element(XML_CONSTANTS.adSystem, { version : this._ad.adSystem.version || DEFAULT_AD_SYSTEM_VERSION })
      .cdata(this._ad.adSystem.name || DEFAULT_AD_SYSTEM_NAME);
    //wrapperElement.element(XML_CONSTANTS.vastAdTagURI).cdata(this._ad.vastAdTagURI);
    this._insertWrapperAdTagURIElement(wrapperElement);
    this.insertError(wrapperElement);
    this.insertImpressionTracker(wrapperElement);

    return wrapperElement;
  }

  _insertInlineInfoElements(inlineElement) {
    inlineElement.element(XML_CONSTANTS.adSystem, { version : this._ad.adSystem.version || DEFAULT_AD_SYSTEM_VERSION })
      .cdata(this._ad.adSystem.name || DEFAULT_AD_SYSTEM_NAME);
    inlineElement.element(XML_CONSTANTS.adTitle).cdata(this._ad.adTitle || DEFAULT_AD_TITLE);
    inlineElement.element(XML_CONSTANTS.description).cdata(this._ad.description || DEFAULT_AD_DESCRIPTION);

    return inlineElement;
  }

  setAdAsInline() {
    const inlineElement = this._xmlAdElement.element(XML_CONSTANTS.inline);

    this._insertInlineInfoElements(inlineElement);
    this.insertSurvey(inlineElement);
    this.insertError(inlineElement);
    this.insertImpressionTracker(inlineElement);

    return inlineElement;
  }

  addExtensions(subElementType) {
    if (this._ad.extensions) {
      const extensions = subElementType.element(XML_CONSTANTS.extensions);

      this._ad.extensions.forEach(extension =>
        extensions.element(XML_CONSTANTS.extension).raw(extension));
    }
  }
}

module.exports = VastAdElement;