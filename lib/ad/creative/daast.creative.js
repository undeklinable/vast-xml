'use strict';

const VastCreative = require('./vast.creative');

class DaastCreative extends VastCreative {
  constructor(type, settings = {}) {
    super(type, settings);

    this._adInteractions = {
      clickTrough: null,
      clickTracking: [],
      customClick: []
    }
  }

  get adInteractions() { return this._attributes.adInteractions; }

  attachClickThrough(clickThroughUrl) {
    this._adInteractions.clickTrough = clickThroughUrl;
  }

  attachClickTracking(clickTrackUrl) {
    this._adInteractions.clickTracking.push(clickTrackUrl);
  }

  attachCustomClick(customClick) {
    this.adInteractions.customClick.push(customClick);
  }

}

module.exports = DaastCreative;