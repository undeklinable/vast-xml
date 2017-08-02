'use strict';

const Creative = require('./creative/creative');

const REQUIRED_ATTRIBUTES = {
  inline: [ 'AdSystem', 'AdTitle' ],
  wrapper: [ 'AdSystem', 'VASTAdTagURI' ]
};

class Ad {
  constructor(settings = {}) {
    this._errors = [];

    this.validateSettings(settings, REQUIRED_ATTRIBUTES[settings.structure]);

    this._id = settings.id;
    this._sequence = settings.sequence;
    this._structure = settings.structure;
    this._adSystem = settings.AdSystem;
    this._adTitle = settings.AdTitle;
    // Optional elements:

    this._error = settings.Error;
    this._description = settings.Description;
    this._advertiser = settings.Advertiser;
    this._surveys = [];

    this._pricing = settings.Pricing;
    this._extensions = settings.Extensions;
    this._impressions = [];

    this._creatives = [];
  }

  get errors() {
    return this._errors;
  }

  get id() {
    return this._id;
  }

  get sequence() {
    return this._sequence;
  }
  
  get structure() {
    return this._structure;
  }

  get adSystem() {
    return this._adSystem;
  }

  get adTitle() {
    return this._adTitle;
  }
  
  get error() {
    return this._error;
  }
  
  get description() {
    return this._description;
  }
  
  get advertiser() {
    return this._advertiser;
  }
  
  get pricing() {
    return this._pricing;
  }
  
  get extensions() {
    return this._extensions;
  }

  attachSurvey(settings) {
    const survey = { url : settings.url };
    if (settings.type) {
      survey.type = settings.type;
    }

    this._surveys.push(survey);
  }

  attachCreative(type, options) {
    this._creatives.push(new Creative(type, options));
  }

  attachImpression(settings) {
    this._impressions.push(settings);
    return this;
  }

  validateSettings(settings, requiredAttrs) {
    const settingsAttrs = Object.keys(settings);

    requiredAttrs.forEach(attr => {
      if (!settingsAttrs.includes(attr)) {
        throw new Error('Missing required settings: ' + attr);
      }
    });
  }
}

module.exports = Ad;

