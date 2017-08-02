'use strict';

class Common {
  static objectKeysToLowerCase(originalObject) {
    const originalKeys = Object.keys(originalObject);
    const lowerCaseKeys = originalKeys.map(key => key.toLowerCase());

    return originalKeys.reduce((acc, key, index) => {
      acc[lowerCaseKeys[index]] = originalObject[key];
      return acc;
    }, {});
  }
}

module.exports = Common;