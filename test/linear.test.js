'use strict';

const should = require('should');
const VAST = require('../index.js');


describe.only('Linear VAST test suite', () => {
  beforeEach(() => {
    this._vast = new VAST();
  });

  describe('Validate ad mandatory settings', () => {
    it('It should throw an error if no AdTitle is set', done => {
      try {
        this._vast.attachAd({structure: 'inline', AdSystem: 'irrelevantName'});
        done(new Error('should throw Error'));
      } catch(ex) {
        done();
      }
    });

    it('It should throw an error if no AdSystem is set', done => {
      try {
        this._vast.attachAd({ structure : 'inline' , AdTitle : 'the title', Error : '' });
        done(new Error('should throw Error'));
      } catch(ex) {
        done();
      }
    })
  });

  describe('Validate VAST basic settings', () => {
    beforeEach(() => {
      this._ad = this._vast.attachAd({
        id : 1,
        structure : 'inline',
        sequence : 99,
        AdTitle : 'irrelevantTitle',
        Error: 'http://error.err',
        AdSystem : { name: 'irrelevantName', version : '1.0' },
        Extensions: ['<one><![CDATA[1]]></one>', '<two><dos id = "2" /></two>']
      }).attachImpression({ id : 23, url : 'http://impression.com' });
    });

    it('It should default to VAST 3.0', () => {
      this._vast.version.should.equal('3.0');
    });

    it('It should has one ad', () => {
      this._vast.ads.length.should.equal(1);
    });
  });

  describe('validate VAST Inline Ad instance', () => {
    it('should have an ID', () => {
      this._ad.id.should.equal(1);
    });

    it('should have a sequence', () => {
      this._ad.sequence.should.equal(99);
    });

    it('should not have wrapper', () => {
      should.not.exist(this._ad.wrapper);
    });

    it('should have an AdSystem name', ()  => {
      this._ad.adSystem.name.should.equal('irrelevantName');
    });

    it('should have an adTitle', () => {
      this._ad.adTitle.should.equal('irrelevantTitle');
    });
  });

  describe('vast 2.0 specific settings', () => {
    beforeEach(() => {
      this._vast20 = new VAST({ version : '2.0' });
      this._ad = this._vast20.attachAd({id : 1, structure : 'inline', AdTitle : 'irrelevantTitle', AdSystem : { name: 'irrelevantName', version : '1.0' }})
        .attachImpression({ id : 23, url : 'http://irrelevantUrl.com' });
    });

    it('Version must be 2.0',()  => {
      this._vast20.version.should.equal('2.0');
    });

    it('Should not have a sequence', () => {
      should.not.exist(this._ad.sequence);
    });

    it('Should attach an impression', () => {
      this._ad.attachImpression({ id: 'irrelevantServer', url : 'http://irrelevantUrl2.com' });
      this._ad.impressions[this._ad.impressions.length - 1].url.should.equal('http://irrelevantUrl2.com');
      this._ad.impressions[this._ad.impressions.length - 1].id.should.equal('irrelevantServer');
    });

    it('should attach a survey', () => {
      this._ad.attachSurvey({ url : 'http://irrelevantSurvey.com' });
      this._ad.surveys[0].url.should.equal('http://irrelevantSurvey.com');
    });

    describe('VAST Linear creative', () => {
      beforeEach(() => {
        this._creative = this._ad.attachCreative('Linear', { id: 99, AdParameters : '<xml></xml>', Duration : '00:00:30' })
          .attachMediaFile('http://irrelevantDomain.com/irrelevantFile', { id: Date.now() })
          .attachTrackingEvent('creativeView', 'http://irrelevantDomain.com')
          .attachVideoClick('ClickThrough', 'http://irrelevantDomain.com');
      });

      it('Should have an array of creatives', () => {
        Array.isArray(this._ad.creatives).should.be.true;
      });

      it('Creative should have and id', () => {
        this._creative.id.should.equal(99);
      });

      it('Creative should have a duration', () => {
        this._creative.duration.should.equal('00:00:30');
      });

      it('Creative should have at least one media url', () => {
        this._creative.mediaFiles[0].url.should.equal('http://irrelevantDomain.com/irrelevantFile');
      });

      it('Creative should have one tracking event', () => {
        this._creative._trackingEvents[0].url.should.equal('http://irrelevantDomain.com');
        this._creative._trackingEvents[0].event.should.equal('creativeView');
      });

      it('Creative should have one videoClick tracker', () => {
        this._creative.videoClicks[0].url.should.equal('http://irrelevantDomain.com');
        this._creative.videoClicks[0].type.should.equal('ClickThrough');
      });

      it('Creative should throw an error when incorrect trackingEvent is used', done => {
        try {
          this._creative.attachTrackingEvent('incorrectEvent', 'http://irrelevantDomain.com');
          done(new Error('should throw an error'));
        } catch(ex) {
          done();
        }
      });

      it('Creative should throw an error when incorrect videoClick tracker is used', done => {
        try {
          this._creative.attachVideoClick('incorrectEvent', 'http://irrelevantDomain.com');
          done(new Error('should throw an error'));
        } catch(ex) {
          done();
        }
      });

      it('Creative should throw an error if no duration is specified when attaching a linear creative', done => {
        try {
          this._ad.attachCreative('Linear');
          done(new Error('Should throw an exception'));
        } catch(ex) {
          done();
        }
      });
    });

    describe('VAST Linear creative', () => {
      it('Should attach a companionAd creative ', () => {
        this._ad.attachCreative('CompanionAd', { width : 300, height : 250 })
          .attachResource('StaticResource', 'http://companionad.com/image.jpg', 'image/jpeg')
          .attachTrackingEvent('creativeView', 'http://companionad.com/creativeView');
      });
    });
  });

  describe('Validate mediafile settings', () => {
    beforeEach(() => {
      this._vastMediaFileTest = new VAST({ version : '2.0' });
      this._adMediaFileTest = this._vastMediaFileTest.attachAd({
        id : 1, structure : 'inline', AdTitle : 'irrelevantTitle', AdSystem : { name: 'irrelevantName', version : '1.0' }})
        .attachImpression({ id : 23, url : 'http://impression.com' });
    });

    it('should throw an error if no id is set', done => {
      try {
        this._adMediaFileTest.attachCreative('Linear', {AdParameters: '<xml></xml>', Duration: '00:00:30'})
          .attachMediaFile('http://irrelevantDomain/irrelevantFile', {});
        done(new Error('Should throw an exception'));
      } catch(ex) {
        done();
      }
    });

    it('should attach a creative', () => {
      this._adMediaFileTest.attachCreative('Linear', { AdParameters : '<xml></xml>', Duration : '00:00:30'})
        .attachMediaFile('http://domain.com/file.ext', { id: Date.now(), scalable: false });

      this._adMediaFileTest.creatives[0].mediaFiles[0].scalable.should.be.false;
    });

    describe('Attach icons to creative', () => {
      beforeEach(() => {
        this._icon = this._ad.creatives[0].attachIcon({
          program : 'irrelevantProgram',
          height : 250,
          width : 300,
          xPosition : 'left',
          yPosition : 'top',
          apiFramework : 'VPAID',
          offset : '01:05:09',
          duration : '00:00:00'
        });
      });

      it('the creative should have stored the icon', () => {
        this._ad.creatives[0].icons.length.should.equal(1);
      });

      it('should set the appropriate program attributes', () => {
        this._icon.program.should.equal('irrelevantProgram');
        this._icon.height.should.equal(250);
        this._icon.width.should.equal(300);
        this._icon.xPosition.should.equal('left');
        this._icon.yPosition.should.equal('top');
        this._icon.apiFramework.should.equal('VPAID');
        this._icon.offset.should.equal('01:05:09');
        this._icon.duration.should.equal('00:00:00');
      });

      it('should attach a resource to the icon', () => {
        this._icon.attachResource('StaticResource', 'http://irrelevantDomain/irrelevantFile', 'image/gif');
        this._icon.resources[0].type.should.equal('StaticResource');
        this._icon.resources[0].uri.should.equal('http://irrelevantDomain/irrelevantFile');
      });

      it('should attach a click tracking to icon', () => {
        this._icon.attachClick('IconClickThrough', 'http://irrelevantDomain.com');
        this._icon.clicks[0].uri.should.equal('http://irrelevantDomain.com');
        this._icon.clicks[0].type.should.equal('IconClickThrough');
      });

      it('should attach a trackingEvent', () => {
        this._icon.attachTrackingEvent('IconViewTracking', 'http://irrelevantDomain.com');
        this._icon.trackingEvents[0].uri.should.equal('http://irrelevantDomain.com');
        this._icon.trackingEvents[0].type.should.equal('IconViewTracking');
      });
    });
  });
});