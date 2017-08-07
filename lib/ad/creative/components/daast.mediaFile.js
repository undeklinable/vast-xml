'use strict';

const DEFAULT_MEDIA_FILE_ATTR = {
  type: 'video/mp4',
  delivery: 'progressive'
};

class DaastMediaFile {
  constructor(url, settings) {
    if (!settings.id) {
      throw new Error('An \'id\' attribute is required for all media files');
    }

    this._url = url;
    this._attributes = Object.assign({}, DEFAULT_MEDIA_FILE_ATTR, settings);
  }

  get url() { return this._url; }

  get type() { return this._attributes.type; }

  get delivery() { return this._attributes.delivery; }

  get attributes() { return this._attributes; }
}

module.exports = DaastMediaFile;