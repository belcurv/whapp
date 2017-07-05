const mongoose = require('mongoose'),
      sinon = require('sinon'),
      expect = require('chai').expect,
      util   = require('../utilities/database_utilities'),
      Profile = require('../models/profile_model');


describe('database_utilities', function() {
  it('should exist', function() {
    expect(util).to.exist;
  });
  it('should be an object', function() {
    expect(util).to.be.an('object');
  });
  it('should contain a test function', function() {
    expect(util.testFunction).to.exist;
    expect(util.testFunction).to.be.a('function');
  });
  it('should contain fetchAllSkills()', function() {
    expect(util.fetchAllSkills).to.exist;
    expect(util.fetchAllSkills).to.be.a('function');
  });
  it('should do something awesome', function() {
    var stub = sinon.stub(mongoose.Model, 'find');
    var callback = sinon.spy();
    var test_profile = {
            'team_id'     : 'team_id',
            'team_domain' : 'team_domain',
            'channel_id'  : 'channel_id',
            'channel_name': 'channel_name',
            'user_id'     : 'user_id',
            'user_name'   : 'user_name',
            'postText'    : 'postText',
            'timestamp'   : 'timestamp',
            'skills'      : ['skill 1', 'skill 2']
    };
    stub.returns(test_profile);
    util.fetchAllSkills(callback);

    expect(callback.called).to.be.true;



  });
});
