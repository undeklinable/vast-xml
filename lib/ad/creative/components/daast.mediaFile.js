'use strict';

const _ = require('underscore');

const DAAST_VALID_MEDIA_ATTR = require('../../../constant/creative.json').daastValidMediaAttr;

const DEFAULT_MEDIA_FILE_ATTR = {
  type: 'audio/mp3',
  delivery: 'progressive'
};

class DaastMediaFile {
  constructor(url, settings) {
    if (!settings.id) {
      throw new Error('An \'id\' attribute is required for all media files');
    }

    this._url = url;
    this._attributes = _.pick(Object.assign({}, DEFAULT_MEDIA_FILE_ATTR, settings), DAAST_VALID_MEDIA_ATTR);
  }

  get url() { return this._url; }

  get type() { return this._attributes.type; }

  get delivery() { return this._attributes.delivery; }

  get attributes() { return this._attributes; }
}

module.exports = DaastMediaFile;