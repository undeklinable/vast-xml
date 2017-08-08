'use strict';

const creativeConstants = require('../../../constant/creative.json');

class VastTrackingEvent {
  get trackingEvents() { return creativeConstants.validVASTTrackingEventTypes; }

  constructor(event, url, offset) {
    if (!this.trackingEvents.includes(event)) {
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

module.exports = VastTrackingEvent;
