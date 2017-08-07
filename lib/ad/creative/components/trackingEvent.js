'use strict';

const creativeConstants = require('../../../constant/creative.json');

class TrackingEvent {
  constructor(event, url, offset) {
    if (!creativeConstants.validTrackingEventTypes.includes(event)) {
      throw new Error(`Invalid TrackingEvent '${event}'`);
    }

    if (event === creativeConstants.attributes.progress && !offset) {
      throw new Error(`Offset must be present for 'progress' TrackingEvent`);
    }

    this._offset = offset;
    this._event = event;
    this._url = url;
  }

  get offset() { return this._offset; }

  get event() { return this._event; }
  
  get url() { return this._url; }
}

module.exports = TrackingEvent;
