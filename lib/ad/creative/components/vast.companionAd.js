'use strict';

const TrackingEvent = require('./vast.trackingEvent');

class VastCompanionAd {
  //resource -> { type: static | iframe | html, uri, creativeType (opt) }
  constructor(resources, companionElements, attributes) {
    this._resources = resources;

    this._companionElements =  Object.assign({}, companionElements);
    this._attributes =  Object.assign({}, attributes);

    this._trackingEvents = [];
  }

  get resources() { return this._resources; }

  get type() { return 'CompanionAd'; }

  get adParameters() { return this._companionElements.adParameters; }

  get altText() { return this._companionElements.altText; }

  get companionClickThrough() { return this._companionElements.clickThrough; }

  get companionClickTracking() { return this._companionElements.clickTracking; }

  get companionTrackingEvents() { return this._companionElements.trackingEvents; }

  get width() { return this._attributes.width; }

  get heigth() { return this._attributes.height; }
  
  get attributes() {
    return {
     width: this.width,
     height: this.heigth
    };
  }

  attachTrackingEvent(type, url) {
    this._trackingEvents.push(new TrackingEvent(type, url));
    return this;
  };
}

module.exports = VastCompanionAd;