'use strict';

const CompanionAd = require('./components/companion-ad');
const Icon = require('./components/icon');
const TrackingEvent = require('./components/tracking-event');

const DEFAULT_MEDIA_FILE_ATTR = {
  type: 'video/mp4',
  width: '640',
  height: '360',
  delivery: 'progressive'
};

const VALID_VIDEO_CLICKS = ['ClickThrough', 'ClickTracking', 'CustomClick'];

class Creative {
  constructor(type, settings = {}) {
    if (!settings.Duration && type === 'Linear') {
      throw new Error('A Duration is required for all creatives. Consider defaulting to "00:00:00"');
    }

    this._attributes = Object.assign({}, settings);

    this._mediaFiles = [];
    this._trackingEvents = [];
    this._videoClicks = [];
    this._clickThroughs = [];
    this._clicks = [];
    this._resources = [];
    this._icons = [];
  }

  get type() { return this._attributes.type; }
  
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

  get skipOffset() { return this._attributes.skipoffset; }
  
  attachMediaFile(url, settings = {}) {
    if (!settings.id) {
      throw new Error('An \'id\' attribute is required for all media files');
    }

    this._mediaFiles.push({
      url,
      attributes : Object.assign({}, DEFAULT_MEDIA_FILE_ATTR, settings)
    });

    return this;
  }

  attachTrackingEvent(type, url, offset) {
    this._trackingEvents.push(new TrackingEvent(type, url, offset));
    return this;
  }

  attachVideoClick(type, url, id = '') {
    if (!VALID_VIDEO_CLICKS.includes(type)) {
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
      type = 'NonLinearClickThrough';
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

    if (type === 'HTMLResource') {
      resource.html = uri;
    }

    if (creativeType) {
      resource.creativeType = creativeType;
    }

    this._resources.push(resource);
    return this;
  }

  attachIcon(settings) {
    this._icons.push(new Icon(settings));
    return this;
  }
}

module.exports = Creative;

module.exports = Creative;
