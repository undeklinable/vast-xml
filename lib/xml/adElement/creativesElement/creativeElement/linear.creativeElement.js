'use strict';

const BaseCreativeElement = require('./base.creativeElement');

class LinearCreativeElement extends BaseCreativeElement {
  constructor(creative, track) {
    super(creative, track);

    this._xmlCreativeTypeElement = null;
  }

  initCreative(xmlCreativesElement) {
    super.initCreative(xmlCreativesElement);
    return this;
  }

  insertLinearCreatives() {
    this._creatives.forEach(creative => {
      super.insertCreativeElement(this._xmlCreativesElement)
        .insertCreativeTypeElement(creative)
        .insertIcons(creative)
        .insertDuration(creative)
        .insertTrackingEvents(creative)
        .insertAdParameters(creative)
        .insertClick(creative, 'VideoClicks')
        .insertMediaFiles(creative);
    });
  }

  insertCreativeTypeElement(creative) {
    const creativeOpts = {};
    if (creative.skipoffset) {
      creativeOpts.skipoffset = creative.skipoffset;
    }

    this._xmlCreativeTypeElement = this._xmlCreativeElement.element(creative.type, creativeOpts);

    return this;
  }

  insertDuration(creative) {
    this._xmlCreativeTypeElement.element('Duration').cdata(creative.Duration);
    return this;
  }

  insertIcons(creative) {
    if (creative.icons.length > 0) {
      const xmlIconsElements = this._xmlCreativeTypeElement.element('Icons');
      creative.icons.forEach(icon => {
        const xmlIconElement = xmlIconsElements.element('Icon', icon.attributes);
        icon.resources.forEach(resource => {
          xmlIconElement.element(resource.type, resource.uri, (resource.creativeType) ? { creativeType : resource.creativeType } : {});
        });
      });
    }

    return this;
  }

  insertTrackingEvents(creative) {
    const trackingEvents = this._xmlCreativeTypeElement.element('TrackingEvents');
    creative.trackingEvents.forEach(trackingEvent => {
      if (this._track) {
        const attributes = { event : trackingEvent.event };
        if (trackingEvent.offset) {
          attributes.offset = trackingEvent.offset;
        }

        trackingEvents.element('Tracking', attributes).cdata(trackingEvent.url);
      }
    });

    return this;
  }

  insertMediaFiles(creative) {
    const mediaFiles = this._xmlCreativeTypeElement.element('MediaFiles');
    creative.mediaFiles.forEach(mediaFile => {
      mediaFiles.element('MediaFile', mediaFile.attributes).cdata(mediaFile.url);
    });

    return this;
  }
}

module.exports = LinearCreativeElement;