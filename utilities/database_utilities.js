var util = {};
const Profile = require('../models/profile_model');

util.testFunction = function() {
  return 1;
}

/**
 * get all profiles from database
*/
util.fetchAllProfiles = function(callback) {
  Profile.find( (err, profiles) => {
    if (err) throw err;
    callback(profiles);
  });
}

/**
 * gets the list of unique skills from the database
*/
util.fetchAllSkills = function(callback) {
  Profile.find( (err, profiles) => {
    if (err) throw err;
    callback(this.makeSortedArray(profiles));
  });
}

/**
 * Makes a sorted array of unique skills from an array of profiles
*/
util.makeSortedArray = function(profiles) {
  let all_skills = [];
  profiles.forEach( (profile) => {
    profile["skills"].forEach(function(skill) {
      if ( all_skills.indexOf(skill) < 0 ) {
        all_skills.push(skill);
      }
    });
  });
  return all_skills.sort();
}

/**
 * get a single profile
 *
 * @params {string} the profile.user_id
*/
util.fetchProfileByUserId = function(user_id, callback) {
  Profile.findOne({ user_id : user_id }, (err, profile) => {
    if (err) throw err;
    callback(profile);
  });
}

/**
 * get a single profile
 *
 * @params {string} the profile.user_name
*/
util.fetchProfileByUserName = function(user_name, callback) {
  Profile.findOne({ user_name : user_name }, (err, profile) => {
    if (err) throw err;
    callback(profile);
  });
}

/**
 * get all profiles of a given team
 *
 * @params {string} the profiles.team_id
*/
util.fetchProfilesByTeamId = function(team_id, callback) {
  Profile.find({ team_id : team_id }, (err, profiles) => {
    if (err) throw err;
    callback(profiles);
  });
}

/**
 * get all profiles of a given team
 *
 * @params {string} the profiles.team_name
*/
util.fetchProfilesByTeamName = function(team_domain, callback) {
  Profile.find({ team_domain : team_domain }, (err, profiles) => {
    if (err) throw err;
    callback(profiles);
  });
}

/**
 * updates all profiles in database with normalized skills
*/
util.normalizeSkillsAgainstDataDictionary = function() {
  fetchAllProfiles( (profiles) => {
    let count_modified = 0;
    for (let profile in profiles) {
      let old_skills = profiles[profile].skills,
          new_skills = [],
          _id = profiles[profile]._id,
          user_name = profiles[profile].user_name,
          changed = 0;

      // populate new_skills array with normalized skills
      old_skills.forEach( (skill) => {
        if ( skill == getNormalizedSkill(skill) ) {
          new_skills.push(skill);
        } else {
          new_skills.push(getNormalizedSkill(skill));
          changed = 1;
        }
      });

      // update the profile
      replaceUserSkills(_id, new_skills, (err, log) => {
        if (err) throw err;
      });

      if ( changed ) {
        count_modified++;
      }

    } // for

    if ( count_modified ) {
      console.log(`${count_modified} profiles have been updated.\n`);
    } else {
      console.log('no profiles updated\n');
    }
    displayAvailableCommands();
  });
}

module.exports = util;

















