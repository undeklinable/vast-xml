'use strict';

const BaseCreativeElement = require('./base.creativeElement');
const XML_CONSTANTS  = require('../../../../constant/xml.json');

class LinearCreativeElement extends BaseCreativeElement {
  constructor(creative, track) {
    super(creative, track);
  }

  initCreative(xmlCreativesElement) {
    super.initCreative(xmlCreativesElement);
    return this;
  }

  insertLinearCreatives() {
    this._creatives.forEach(creative => {
      super.insertCreativeElement(creative)
        .insertCreativeTypeElement(creative)
        .insertIcons(creative)
        .insertDuration(creative)
        .insertTrackingEvents(creative)
        .insertAdParameters(creative)
        .insertClick(creative, XML_CONSTANTS.videoClicks)
        .insertMediaFiles(creative);
    });
  }

  insertCreativeTypeElement(creative) {
    const creativeOpts = {};
    if (creative.skipOffset) {
      creativeOpts.skipOffset = creative.skipOffset;
    }

    this._xmlCreativeTypeElement = this._xmlCreativeElement.element(creative.type, creativeOpts);

    return this;
  }

  insertDuration(creative) {
    this._xmlCreativeTypeElement.element(XML_CONSTANTS.duration, creative.duration);
    return this;
  }

  insertIcons(creative) {
    if (creative.icons.length > 0) {
      const xmlIconsElements = this._xmlCreativeTypeElement.element(XML_CONSTANTS.icons);
      creative.icons.forEach(icon => {
        const xmlIconElement = xmlIconsElements.element(XML_CONSTANTS.icon, icon.attributes);
        icon.resources.forEach(resource => {
          xmlIconElement.element(resource.type, resource.uri, (resource.creativeType) ? { creativeType : resource.creativeType } : {});
        });
      });
    }

    return this;
  }

  insertTrackingEvents(creative) {
    const trackingEvents = this._xmlCreativeTypeElement.element(XML_CONSTANTS.trackingEvent);
    creative.trackingEvents.forEach(trackingEvent => {
      if (this._track) {
        const attributes = { event : trackingEvent.event };
        if (trackingEvent.offset) {
          attributes.offset = trackingEvent.offset;
        }

        trackingEvents.element(XML_CONSTANTS.tracking, attributes).cdata(trackingEvent.url);
      }
    });

    return this;
  }

  insertMediaFiles(creative) {
    const xmlMediaFilesElement = this._xmlCreativeTypeElement.element(XML_CONSTANTS.mediaFiles);
    creative.mediaFiles.forEach(mediaFile => {
      xmlMediaFilesElement.element(XML_CONSTANTS.mediaFile, mediaFile.attributes).cdata(mediaFile.url);
    });

    return this;
  }
}

module.exports = LinearCreativeElement;