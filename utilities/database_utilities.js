const Profile = require('../models/profile_model');
let util = {};

util.testFunction = function() {
  return 1;
}

util.fetchAllProfiles = function(callback) {
  Profile.find( (err, profiles) => {
    if (err) throw err;
    callback(profiles);
  });
}

util.fetchAllSkills = function(callback) {
  Profile.find( (err, profiles) => {
    if (err) throw err;
    callback(this.makeSortedArray(profiles));
  });
}

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

util.fetchProfileByUserId = function(user_id, callback) {
  Profile.findOne({ user_id : user_id }, (err, profile) => {
    if (err) throw err;
    callback(profile);
  });
}

util.fetchProfileByUserName = function(user_name, callback) {
  Profile.findOne({ user_name : user_name }, (err, profile) => {
    if (err) throw err;
    callback(profile);
  });
}

util.fetchProfilesByTeamId = function(team_id, callback) {
  Profile.find({ team_id : team_id }, (err, profiles) => {
    if (err) throw err;
    callback(profiles);
  });
}

util.fetchProfilesByTeamName = function(team_domain, callback) {
  Profile.find({ team_domain : team_domain }, (err, profiles) => {
    if (err) throw err;
    callback(profiles);
  });
}

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

/**
 * Updates a single profile's skills property
*/
function replaceUserSkills(_id, replacement_skills, callback) {
  Profile.update({ _id : _id }, { $set: {skills : replacement_skills} }, callback);
}

/**
 * check a skill against the data dictionary
 *
 * @params {string} the skill to check against dictionary
 * @returns {string} either the passed skill, or the data dictionary's skill
*/
function getNormalizedSkill(current_skill) {
  var match_skill = current_skill;
  for (let skill in data_dictionary) {
    data_dictionary[skill].forEach( (name_variant) => {
      if (current_skill.toLowerCase() === name_variant.toLowerCase()) {
        match_skill = skill;
      }
    });
  }
  return match_skill;
};
module.exports = util;

















