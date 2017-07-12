/* jshint esversion:6, node:true */
const mongoose = require('mongoose'),
      sinon    = require('sinon'),
      chai     = require('chai'),
      expect   = chai.expect,
      util     = require('../utilities/database_utilities'),
      Profile  = require('../models/profile_model');

mongoose.Promise = global.Promise;


describe('database_utilities',  () => {
  it('should exist',  () => {
    expect(util).to.exist;
  });
  it('should be an object',  () => {
    expect(util).to.be.an('object');
  });
  it('should contain fetchAllSkills()',  () => {
    expect(util.fetchAllSkills).to.exist;
    expect(util.fetchAllSkills).to.be.a('function');
  });
});

describe('Model Validations: ',  () => {
  describe('Profile',  () => {
    it('should be invalid if user_id is empty', (done) => {
      let profile = new Profile();
      profile.validate( (err) => {
        expect(err.errors.user_id).to.exist;
        done();
      });
    });
  });
});

describe('Database Functions: ',  () => {
  beforeEach( () => {
    sinon.stub(Profile, 'find');
    sinon.stub(Profile, 'findOne');
    sinon.stub(Profile, 'update');
  });

  afterEach( () => {
    Profile.find.restore();
    Profile.findOne.restore();
    Profile.update.restore();
  });

  it('fetchAllProfiles should fetch all the profiles',  () => {
    let expectedModels = sample_profiles;
    let callback = sinon.stub();
    Profile.find.yields(null, expectedModels);
    util.fetchAllProfiles(callback);
    sinon.assert.calledWith(callback, expectedModels);
  });

  it('fetchAllSkills should fetch a sorted, deduped array of all the skills',  () => {
    let expectedModels = sample_profiles;
    let expectedResults = getAllSkills();
    Profile.find.yields(null, expectedModels);
    let callback = sinon.stub();
    util.fetchAllSkills(callback);
    sinon.assert.calledWith(callback, expectedResults);
  });

  it('fetchProfileByUserId should fetch one profile',  () => {
    let expectedModel = sample_profiles[0];
    let callback = sinon.stub();
    Profile.findOne.yields(null, expectedModel);
    util.fetchProfileByUserId(sample_profiles[0].user_id, callback);
    sinon.assert.calledWith(callback, expectedModel);
  });

  it('fetchProfileByUserName should fetch one profile',  () => {
    let expectedModel = sample_profiles[0];
    let callback = sinon.stub();
    Profile.findOne.yields(null, expectedModel);
    util.fetchProfileByUserName(sample_profiles[0].user_name, callback);
    sinon.assert.calledWith(callback, expectedModel);
  });

  it('fetchProfilesByTeamId should fetch several profiles',  () => {
    let expectedModels = sample_profiles;
    let team_id = 'T3BC1RPPH';
    let callback = sinon.stub();
    Profile.find.yields(null, expectedModels);
    util.fetchProfilesByTeamId(team_id, callback);
    sinon.assert.calledWith(callback, expectedModels);
  });

  it('fetchProfilesByTeamName should fetch several profiles',  () => {
    let expectedModels = sample_profiles;
    let team_name = 'chingucentral';
    let callback = sinon.stub();
    Profile.find.yields(null, expectedModels);
    util.fetchProfilesByTeamId(team_name, callback);
    sinon.assert.calledWith(callback, expectedModels);
  });

  it('getNormalizedSkill should return a skill from data dictionary', () => {
    expect(util.getNormalizedSkill('js')).to.equal('JavaScript');
    expect(util.getNormalizedSkill('math')).to.equal('Math');
    expect(util.getNormalizedSkill('react')).to.equal('ReactJS');
    expect(util.getNormalizedSkill('blurg')).to.equal('blurg');
  });

  // it('normalizeSkillsAgainstDataDictionary should change a skill',  () => {
  //   let expectedModels = sample_profiles;
  //   let expectedResults = normalized_profiles;
  //   sinon.stub(util, 'fetchAllProfiles');
  //   util.fetchAllProfiles.restore();
  // });

});
      

/*__________________________ Standards __________________________*/

let sample_profiles = [ {
	team_id: 'T3BC1RPPH',
	team_domain: 'chingucentral',
	channel_id: 'D5Z65BS3E',
	channel_name: 'directmessage',
	user_id: 'U5YEHNYBS',
	user_name: 'linus-br',
	postText: 'Javascript, NodeJS, Java, Fitness, Riding, backend',
	timestamp: 'Tue Jun 27 2017 17:58:47 GMT+0000 (UTC)',
	__v: 0,
	skills: [ 'JavaScript', 'Node.js', 'Java', 'Fitness', 'Riding', 'backend']
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

let all_skills = ["backend", "CSS", "Fitness", "HTML", "Java", "JavaScript", "Node.js", "PHP", "ReactJS", "Riding"]

let getAllSkills = function() {
  let all_skills = [];
  sample_profiles.forEach((profile) => {
    profile["skills"].forEach( (skill) => {
      if ( all_skills.indexOf(skill) < 0 ) {
        all_skills.push(skill);
      }
    });
  });
  return all_skills.sort();
}
