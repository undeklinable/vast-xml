const should = require('should');
const VAST = require('../../index.js').VastXml;

const WRAPPER_VAST_AD_VALID = require('../data/VAST/wrapperVASTAdValid.json');

describe('VAST wrapper test suite', () => {
  beforeEach(() => {
    this._vast = new VAST();
  });

  describe('Error detection', () => {
    it('should throw an error if no vastAdTagURI is set', done => {
      try {
        this._vast.attachAd({ structure : 'wrapper', AdSystem : 'irrelevantSystem', sequence : 23 });
        done(new Error('should throw error'));
      } catch (ex) {
        done();
      }
    });

    it('should throw an error if no AdSystem is set', done => {
      try {
        this._vast.attachAd({ structure : 'wrapper', vastAdTagURI : 'irrelevantVastUri', sequence : 23 });
        done(new Error('should throw error'));
      } catch (ex) {
        done();
      }
    });
  });

  describe('Wrapper validation', () => {
    beforeEach(() => {
      this._ad = this._vast.attachAd(WRAPPER_VAST_AD_VALID).attachImpression({id: Date.now(), url: 'http://irrelevantDomain.com'});
    });

    it('should have a tag URI', () => {
      this._ad.vastAdTagURI.should.equal('http://irrelevantDomain.com');
    });

    it('should have an impression tracker', () => {
      this._ad.impressions[0].url.should.equal('http://irrelevantDomain.com');
    });

    it('should be able to attach a companion ad', () => {
      const creative = this._ad.attachCreative('CompanionAd', { width : 300, height : 250 })
        .attachResource('StaticResource', 'http://irrelevantDomain.com/irrelevantFile.jpg', 'image/jpeg');

      creative.resources[0].uri.should.equal('http://irrelevantDomain.com/irrelevantFile.jpg');
    });
  });
});