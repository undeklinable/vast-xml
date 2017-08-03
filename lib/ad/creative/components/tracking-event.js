'use strict';

const VALID_TRACKING_EVENT_TYPES = [
  'creativeView',
  'start',
  'firstQuartile',
  'midpoint',
  'thirdQuartile',
  'complete',
  'mute',
  'unmute',
  'pause',
  'rewind',
  'resume',
  'fullscreen',
  'exitFullscreen',
  'expand',
  'collapse',
  'acceptInvitationLinear',
  'closeLinear',
  'skip',
  'progress',
  'close',
  'acceptInvitation'
];

class TrackingEvent {
  constructor(event, url, offset) {
    if (!VALID_TRACKING_EVENT_TYPES.includes(event)) {
      throw new Error(`Invalid TrackingEvent '${event}'`);
    }

    if (event === 'progress' && !offset) {
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
