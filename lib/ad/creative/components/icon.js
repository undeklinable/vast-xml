'use strict';

class Icon {
  constructor(settings) {
    this._attributes = Object.assign({}, settings);
    this._resources = [];
    this._clicks = [];
    this._trackingEvents = [];
  }

  get program() { return this._attributes.program; }

  get width() { return this._attributes.width; }

  get height() { return this._attributes.height; }

  get xPosition() { return this._attributes.xPosition; }

  get yPosition() { return this._attributes.yPosition; }

  get duration() { return this._attributes.duration; }

  get offset() { return this._attributes.offset; }

  get apiFramework() { return this._attributes.apiFramework; }

  attachClick(type, uri) {
    this._clicks.push({ type, uri });
  };

  attachTrackingEvent(type, uri) {
    this._trackingEvents.push({ type, uri });
  };

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
  };
}

module.exports = Icon;
