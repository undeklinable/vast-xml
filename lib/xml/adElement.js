'use strict';

const CreativesElement = require('./creativesElement');

class AdElement {
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

    this._xmlAdElement = xmlResponse.element('Ad', adOptions);
    return this;
  }

  configureAdByType() {
    const subElementType = (this._ad.structure.toLowerCase() === 'wrapper') ?
      this.setAdAsWrapper():
      this.setAdAsInline();

    const creativesElement = new CreativesElement(this._ad, this._track);

    creativesElement.initCreatives(subElementType)
      .insertLinearCreatives()
      .insertNonLinearCreatives()
      .insertCompanionAdCreatives();

    this.addExtensions(subElementType);
  }


  insertError(xmlElement) {
    if (this._ad.Error) {
      xmlElement.element('Error').cdata(this._ad.Error);
    }

    return xmlElement;
  }

  insertImpressionTracker(xmlElement) {
    if (this._track) {
      this._ad.impressions.forEach(impression =>
        xmlElement.element('Impression', { id : impression.id }).cdata(impression.url));
    }

    return xmlElement;
  }

  setAdAsWrapper() {
    const wrapperElement = this._xmlAdElement.element('Wrapper');

    wrapperElement.element('AdSystem', { version : this._ad.AdSystem.version }).cdata(this._ad.AdSystem.name || '');
    wrapperElement.element('VASTAdTagURI').cdata(this._ad.VASTAdTagURI);
    this.insertError(wrapperElement);
    this.insertImpressionTracker(wrapperElement);

    return wrapperElement;
  }

  setAdAsInline() {
    const inlineElement = this._xmlAdElement.element('InLine');

    inlineElement.element('AdSystem', { version : this._ad.AdSystem.version }).cdata(this._ad.AdSystem.name || '');
    inlineElement.element('AdTitle').cdata(this._ad.AdTitle);
    inlineElement.element('Description').cdata(this._ad.Description || '');

    this._ad.surveys.forEach(survey => {
      const attributes = {};
      if (survey.type) {
        attributes.type = survey.type;
      }

      inlineElement.element('Survey', attributes).cdata(survey.url);
    });

    this.insertError(inlineElement);
    this.insertImpressionTracker(inlineElement);

    return inlineElement;
  }

  addExtensions(xmlElement) {
    if (this._ad.Extensions) {
      const extensions = xmlElement.element('Extensions');

      this._ad.Extensions.forEach(extension => {
        extensions.element('Extension').raw(extension);
      });
    }
  }
}

module.exports = AdElement;