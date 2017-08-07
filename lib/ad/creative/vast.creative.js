'use strict';

const CompanionAd = require('./components/companion-ad');
const Icon = require('./components/icon');
const TrackingEvent = require('./components/tracking-event');
const MediaFile = require('./components/mediaFile');

const Common = require('../../common/common');
const creativeConstants = require('../../constant/creative.json');

class Creative {
  constructor(type, settings = {}) {
    if (!settings.duration && type === 'Linear') {
      throw new Error('A Duration is required for all creatives. Consider defaulting to "00:00:00"');
    }

    this._type = type;
    this._attributes = Object.assign({}, settings);
    this._mediaFiles = [];
    this._trackingEvents = [];
    this._videoClicks = [];
    this._clickThroughs = [];
    this._clicks = [];
    this._resources = [];
    this._icons = [];
    this._companionAds = [];
  }

  get type() { return this._type; }
  
  get adParameters() { return this._attributes.adParameters; }
  
  get duration() { return this._attributes.duration; }
  
  get id() { return this._attributes.id; }
  
  get width() { return this._attributes.width; }
  
  get height() { return this._attributes.height; }
  
  get expandedWidth() { return this._attributes.expandedWidth; }

  get expandedHeight() { return this._attributes.expandedHeight; }
  
  get scalable() { return this._attributes.scalable; }

  get maintainAspectRatio() { return this._attributes.maintainAspectRatio; }

  get minSuggestedDuration() { return this._attributes.minSuggestedDuration; }

  get apiFramework() { return this._attributes.apiFramework; }

  get skipOffset() { return this._attributes.skipOffset; }

  get mediaFiles() { return this._mediaFiles; }
  
  get videoClicks() { return this._videoClicks; }

  get icons() { return this._icons; }

  get clicks() { return this._clicks; }

  get clickThroughs() {return this._clickThroughs; }

  get resources() { return this._resources; }
  
  get trackingEvents() { return this._trackingEvents; }
  
  attachMediaFile(url, settings = {}) {
    this._mediaFiles.push(new MediaFile(url, settings));
    return this;
  }

  attachTrackingEvent(type, url, offset) {
    this._trackingEvents.push(new TrackingEvent(type, url, offset));
    return this;
  }

  attachVideoClick(type, url, id = Common.generateRandomString()) {
    if (!creativeConstants.validVideoClicks.includes(type)) {
      throw new Error(`The supplied VideoClick type \'${type}\' is not a valid VAST VideoClick type`);
    }

    this._videoClicks.push({ type, url, id});
    return this;
  }

  attachClickThrough(url) {
    this._clickThroughs.push(url);
    return this;
  }

  attachClick(uri, type) {
    if (typeof uri === 'string') {
      type = creativeConstants.attributes.nonLinearClickThrough;
    }

    this._clicks = [ { type, uri } ];
    return this;
  }

  attachAdParameters(data, xmlEncoded) {
    this._attributes.adParameters = { data, xmlEncoded };
    return this;
  }

  attachResource(type, uri, creativeType) {
    const resource = { type, uri };

    if (type === creativeConstants.attributes.htmlResource) {
      resource.html = uri;
    }

    if (creativeType) {
      resource.creativeType = creativeType;
    }

    this._resources.push(resource);
    return this;
  }

  attachIcon(settings) {
    const icon = new Icon(settings);
    this._icons.push(icon);
    return icon;
  }

  attachCompanionAd(rawCompanionAd) {
    const companionAd = new CompanionAd(resource, rawCompanionAd);

    this._companionAds.push(companionAd);
    return companionAd;
  }
}

module.exports = Creative;
