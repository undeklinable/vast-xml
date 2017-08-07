'use strict';

const VastAd = require('./vast.ad');
const Creative = require('./creative/daast.creative');

const SUPPORTED_PRICING_MODELS = ['CPM', 'CPC', 'CPE', 'CPV', 'CPO'];

class DaastAd extends VastAd {
  constructor(settings) {
    super(settings);
  }

  get expires() { return this._attributes.expires; }

  //{ price: xx, model: xxx, currency: XXX }
  get pricing() { return this._attributes.pricing; }

  get category() { return this._attributes.category; }

  get daastAdTagURI() { return this._attributes.daastAdTagURI; }

  attachCreative(type, options) {
    const creative = new Creative(type, options);

    this._creatives.push(creative);
    return creative;
  }
}

module.exports = DaastAd;