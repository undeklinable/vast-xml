'use strict';

const should = require('should');
const VAST = require('../index.js');

describe('NonLinear VAST test suite', () => {
  beforeEach(() => {
    this._vast = new VAST();
    this._inlineAd = this._vast.attachAd({
      id : 0,
      structure : 'inline',
      sequence : 1,
      adTitle : 'irrelevantTitle',
      adSystem : { name : 'Foo', version : '1.0'}
    }).attachImpression({ id : 1, url : 'http://irrelevantDomain.com' });

    this._nonLinearCreative = this._inlineAd.attachCreative('NonLinear', {
      id : 99,
      width : 90,
      height: 10,
      expandedWidth : 90,
      expandedHeight : 45,
      scalable : false,
      maintainAspectRatio : false,
      minSuggestedDuration : '00:00:00',
      apiFramework : 'VPAID'
    });
  });

  it('Non-Linear Ad should have all its attributes', () => {
    this._nonLinearCreative.id.should.equal(99);
    this._nonLinearCreative.width.should.equal(90);
    this._nonLinearCreative.height.should.equal(10);
    this._nonLinearCreative.expandedWidth.should.equal(90);
    this._nonLinearCreative.expandedHeight.should.equal(45);
    this._nonLinearCreative.scalable.should.equal(false);
    this._nonLinearCreative.maintainAspectRatio.should.equal(false);
    this._nonLinearCreative.minSuggestedDuration.should.equal('00:00:00');
    this._nonLinearCreative.apiFramework.should.equal('VPAID');
  });

  it('should attach resoure to Non-Linear Ad', () => {
    this._nonLinearCreative.attachResource('StaticResource', 'http://irrelevantDomain.com/irrelevantFile', 'image/png');
    this._nonLinearCreative.resources.length.should.equal(1);
    this._nonLinearCreative.resources[0].type.should.equal('StaticResource');
    this._nonLinearCreative.resources[0].uri.should.equal('http://irrelevantDomain.com/irrelevantFile');
    this._nonLinearCreative.resources[0].creativeType.should.equal('image/png');
  });

  it('should attach a click through url', () => {
    this._nonLinearCreative.attachClickThrough('http://irrelevantDomain.com');
    this._nonLinearCreative.clickThroughs[0].should.equal('http://irrelevantDomain.com');
  });

  it('should attach a click track', () => {
    this._nonLinearCreative.attachClick('http:/irrelevantDomain.com', 'NonLinearClickTracking');
    this._nonLinearCreative.clicks.length.should.equal(1);
  });

  it('should override the click with a new one', () => {
    this._nonLinearCreative.attachClick('http://irrelevantDomain.com', 'NonLinearClickTracking');
    this._nonLinearCreative.attachClick('http://irrelevantDomain2.com', 'NonLinearClickTracking');
    this._nonLinearCreative.clicks.length.should.equal(1);
    this._nonLinearCreative.clicks[0].uri.should.equal('http://irrelevantDomain2.com');
  });


  it('should attach adParameters', () => {
    this._nonLinearCreative.attachAdParameters('<xml>data</xml>', true);
    this._nonLinearCreative.adParameters.data.should.equal('<xml>data</xml>');
    this._nonLinearCreative.adParameters.xmlEncoded.should.be.true;
  });
});

