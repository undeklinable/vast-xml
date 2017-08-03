'use strict';

const should = require('should');
const VAST = require('../index.js');

describe('Skippable Linear VAST test suite', () => {
  beforeEach(() => {
    this._vast = new VAST();
    this._linearAd = this._vast.attachAd({
      id : 1,
      structure : 'inline',
      sequence : 99,
      adTitle : 'irrelevantTitle',
      error: 'http://irrelevantDomain.err',
      adSystem : { name: 'irrelevantName', version : '1.0' }
    }).attachImpression({ id : 23, url : 'http://irrelevantDomain.com' });

    this._skippableLinearCreative = this._linearAd.attachCreative('Linear', {
      id: 99,
      skipOffset: '00:00:05',
      adParameters : '<xml></xml>',
      duration : '00:00:30'
    }).attachTrackingEvent('skip', 'http://irrelevantDomain.com')
      .attachTrackingEvent('progress', 'http://irrelevantDomain.com', '00:00:30.000')
      .attachMediaFile('http://irrelevantDomain.com/irrelevantFile', { id: Date.now() })
  });

  it('should have an skip offset', () => {
    this._skippableLinearCreative.skipOffset.should.equal('00:00:05');
  });

  it('should have a skip notification url', () => {
    this._skippableLinearCreative.trackingEvents.find(track => track.event === 'skip').url.should.equal('http://irrelevantDomain.com');
  });

  it('should throw an error if offset for TrackingEvent of type \'progress\' is not provided', done => {
    try {
      this._skippableLinearCreative.attachTrackingEvent('progress', 'http://irrelevantDomain.com')
      done(new Error('should throw error'));
    } catch(ex) {
      done();
    }
  });
});