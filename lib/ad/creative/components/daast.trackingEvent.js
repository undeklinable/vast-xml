'use strict';

const VastTrackingEvent = require('./vast.trackingEvent');
const creativeConstants = require('../../../constant/creative.json');

class DaastTrackingEvent extends VastTrackingEvent{
  get trackingEvents() { return creativeConstants.validDAASTTrackingEventTypes; }

  constructor(event, url, offset) {
    super(event, url, offset);
  }
}

module.exports = DaastTrackingEvent;
