const mongoose = require('mongoose'),
      sinon = require('sinon'),
      chai = require('chai'),
      expect = chai.expect,
      util   = require('../utilities/database_utilities'),
      Profile = require('../models/profile_model');

mongoose.Promise = global.Promise;


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
});

describe('Model Validations: ', function() {
  describe('Profile', function() {
    it('should be invalid if user_id is empty', function(done) {
      let p = new Profile();

      p.validate(function(err) {
        expect(err.errors.user_id).to.exist;
        done();
      });
    });
  });
});
