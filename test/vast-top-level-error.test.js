
const should = require('should');
const VAST = require('../index.js');

describe('Skippable Linear VAST test suite', () => {
  beforeEach(() => {
    this._vast = new VAST({vastErrorURI: 'http://adserver.com/noad.gif'});
  });

  it('should have an error notification uri', () => {
    this._vast.vastErrorURI.should.equal('http://adserver.com/noad.gif');
  });
});
