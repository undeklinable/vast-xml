'use strict';

const VastCreative = require('./vast.creative');
const DaastMediaFile = require('./components/daast.mediaFile');
const DaastTrackingEvent = require('./components/daast.trackingEvent');

class DaastCreative extends VastCreative {
  constructor(type, settings = {}) {
    super(type, settings);

    this._adInteractions = {
      clickTrough: null,
      clickTracking: [],
      customClick: []
    }
  }

  attachMediaFile(url, settings = {}) {
    this._mediaFiles.push(new DaastMediaFile(url, settings));
    return this;
  }

  attachTrackingEvent(type, url, offset) {
    this._trackingEvents.push(new DaastTrackingEvent(type, url, offset));
    return this;
  }

  get adInteractions() { return this._attributes.adInteractions; }

  get clickThrough() { return this._adInteractions.clickTrough; }

  attachClickThrough(clickThroughUrl) {
    this._adInteractions.clickTrough = clickThroughUrl;
  }

  get clickTracking() { return this._adInteractions.clickTracking; }

  attachClickTracking(clickTrackUrl) {
    this._adInteractions.clickTracking.push(clickTrackUrl);
  }

  get customClick() { return this._adInteractions.customClick; }

  attachCustomClick(customClick) {
    this.adInteractions.customClick.push(customClick);
  }

}

module.exports = DaastCreative;