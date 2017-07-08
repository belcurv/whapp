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

util.makeSortedArray = function(profiles) {
  let all_skills = [];
  profiles.forEach((profile) => {
    profile["skills"].forEach(function(skill) {
      if ( all_skills.indexOf(skill) < 0 ) {
        all_skills.push(skill);
      }
    });
  });
  return all_skills.sort();
}

module.exports = util;
