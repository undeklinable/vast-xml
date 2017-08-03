'use strict';

const randomString = require('randomstring');

const RANDOM_ID_LENGTH = 5;

class Common {
  static generateRandomString() {
    return randomString.generate(RANDOM_ID_LENGTH);
  }
}

module.exports = Common;