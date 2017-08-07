'use strict';

const Creative = require('./creative/vast.creative');

const REQUIRED_ATTRIBUTES = require('../constant/creative.json').requiredAttributes;

class VastAd {
  constructor(settings = {}) {

    this.validateSettings(settings, REQUIRED_ATTRIBUTES[settings.structure]);

    this._attributes = Object.assign({}, settings);

    this._surveys = [];
    this._errors = [];
    this._impressions = [];
    this._creatives = [];
  }

  get id() { return this._attributes.id; }

  get sequence() { return this._attributes.sequence; }
  
  get structure() { return this._attributes.structure; }

  get adSystem() { return this._attributes.adSystem; }

  get adTitle() { return this._attributes.adTitle; }

  get vastAdTagURI() { return this._attributes.vastAdTagURI; }
  
  get error() { return this._attributes.error; }
  
  get description() { return this._attributes.description; }
  
  get advertiser() { return this._attributes.advertiser; }
  
  get pricing() { return this._attributes.pricing; }
  
  get extensions() { return this._attributes.extensions; }

  get errors() { return this._errors; }

  get impressions() { return this._impressions; }

  get surveys() { return this._surveys; }
  
  get creatives() { return this._creatives; }

  attachSurvey(settings) {
    const survey = { url : settings.url };
    if (settings.type) {
      survey.type = settings.type;
    }

    this._surveys.push(survey);
  }

  attachCreative(type, options) {
    const creative = new Creative(type, options);

    this._creatives.push(creative);
    return creative;
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

module.exports = VastAd;

