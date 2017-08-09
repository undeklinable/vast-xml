'use strict';

const VastCreativesElement = require('./vast.creativesElement');
const DaastLinearCreativeElement = require('./creativeElement/daast.linear.creativeElement');
const XML_CONSTANTS  = require('../../../constant/xml.json');

class DaastCreativeElement extends VastCreativesElement {
  constructor(ad, track) {
    super(ad, track);
  }

  insertLinearCreatives() {
    const linearCreatives = this._creatives.filter(c => c.type === XML_CONSTANTS.linear);

    if (linearCreatives.length > 0) {
      const linearCreativeElement = new DaastLinearCreativeElement(linearCreatives, this._track);
      linearCreativeElement.initCreative(this._xmlCreativesElement)
        .insertLinearCreatives();

      this.insertCompanionAdCreatives();
    }

    return this;
  }

  insertNonLinearCreatives() {
    throw new Error('Non Linear creatives not supported in DAAST');
  }
}

module.exports = DaastCreativeElement;