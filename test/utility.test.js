const mongoose = require('mongoose'),
      sinon = require('sinon'),
      chai = require('chai'),
      expect = chai.expect,
      util   = require('../utilities/database_utilities'),
      Profile = require('../models/profile_model');

require('sinon-mongoose');


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

