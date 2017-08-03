'use strict';

const TrackingEvent = require('./tracking-event');

class CompanionAd {
  constructor(resource, settings = {}) {
    this._resource = resource;

    this._attributes =  Object.assign({}, settings);
    this._trackingEvents = [];
  }

  get resource() { return this._resource; }

  get type() { return this._attributes.type; }

  get url() { return this._attributes.url; }

  get adParameters() { return this._attributes.adParameters; }

  get altText() { return this._attributes.altText; }

  get companionClickThrough() { return this._attributes.companionClickThrough; }

  get companionClickTracking() { return this._attributes.companionClickTracking; }

  get width() { return this._attributes.width; }

  get heigth() { return this._attributes.height; }

  attachTrackingEvent(type, url) {
    this._trackingEvents.push(new TrackingEvent(type, url));
    return this;
  };
}

module.exports = CompanionAd;