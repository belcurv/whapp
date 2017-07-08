/* jshint esversion:6, node:true */
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
      let profile = new Profile();
      profile.validate(function(err) {
        expect(err.errors.user_id).to.exist;
        done();
      });
    });
  });
});

describe('Database Functions: ', function() {
  beforeEach(function() {
    sinon.stub(Profile, 'find');
    sinon.stub(Profile, 'findOne');
  });

  afterEach(function() {
    Profile.find.restore();
    Profile.findOne.restore();
  });

  it('fetchAllProfiles should fetch all the profiles', function() {
    var expectedModels = sample_profiles;
    Profile.find.yields(null, expectedModels);
    var callback = sinon.stub();
    util.fetchAllProfiles(callback);
    sinon.assert.calledWith(callback, expectedModels);
  });

  it('fetchAllSkills should fetch a sorted, deduped array of all the skills', function() {
    var expectedModels = sample_profiles;
    var expectedResults = getAllSkills();
    Profile.find.yields(null, expectedModels);
    var callback = sinon.stub();
    util.fetchAllSkills(callback);
    sinon.assert.calledWith(callback, expectedResults);
  });

});
      

/*________________________________ Standards ________________________________*/

var sample_profiles = [ {
	team_id: 'T3BC1RPPH',
	team_domain: 'chingucentral',
	channel_id: 'D5Z65BS3E',
	channel_name: 'directmessage',
	user_id: 'U5YEHNYBS',
	user_name: 'linus-br',
	postText: 'Javascript, NodeJS, Java, Fitness, Riding',
	timestamp: 'Tue Jun 27 2017 17:58:47 GMT+0000 (UTC)',
	__v: 0,
	skills: [ 'JavaScript', 'Node.js', 'Java', 'Fitness', 'Riding' ]
},
{
	team_id: 'T3BC1RPPH',
	team_domain: 'chingucentral',
	channel_id: 'D5ZRL3L4F',
	channel_name: 'directmessage',
	user_id: 'U5YUAK7K5',
	user_name: 'mmadden',
	postText: 'php, js, react, css, html',
	timestamp: 'Sat Jun 24 2017 14:31:28 GMT+0000 (UTC)',
	__v: 0,
	skills: [ 'PHP', 'JavaScript', 'ReactJS', 'CSS', 'HTML' ]
} ];

var all_skills = ["CSS", "Fitness", "HTML", "Java", "JavaScript", "Node.js", "PHP", "ReactJS", "Riding"]

var getAllSkills = function() {
  let all_skills = [];
  sample_profiles.forEach((profile) => {
    profile["skills"].forEach(function(skill) {
      if ( all_skills.indexOf(skill) < 0 ) {
        all_skills.push(skill);
      }
    });
  });
  return all_skills.sort();
}
