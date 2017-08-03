'use strict';

const DEFAULT_MEDIA_FILE_ATTR = {
  type: 'video/mp4',
  width: '640',
  height: '360',
  delivery: 'progressive',
  scalable: false
};

class MediaFile {
  constructor(url, settings) {
    if (!settings.id) {
      throw new Error('An \'id\' attribute is required for all media files');
    }

    this._url = url;
    this._attributes = Object.assign({}, DEFAULT_MEDIA_FILE_ATTR, settings);
  }

  get url() { return this._url; }

  get type() { return this._attributes.type; }

  get width() { return this._attributes.width; }

  get height() { return this._attributes.height; }

  get delivery() { return this._attributes.delivery; }

  get scalable() { return this._attributes.scalable; }
}

module.exports = MediaFile;