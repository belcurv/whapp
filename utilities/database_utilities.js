const Profile         = require('../models/profile_model'),
      data_dictionary = require('../data_dictionary/dataDictionary');

module.exports = {

  testFunction : function() {
    return 1;
  },

  fetchAllProfiles : function(callback) {
    Profile.find( (err, profiles) => {
      if (err) throw err;
      callback(profiles);
    });
  },

  fetchAllSkills : function(callback) {
    Profile.find( (err, profiles) => {
      if (err) throw err;
      callback(this.makeSortedArray(profiles));
    });
  },

  makeSortedArray : function(profiles) {
    let all_skills = [];
    profiles.forEach( (profile) => {
      profile["skills"].forEach(function(skill) {
        if ( all_skills.indexOf(skill) < 0 ) {
          all_skills.push(skill);
        }
      });
    });
    return all_skills.sort();
  },

  fetchProfileByUserId : function(user_id, callback) {
    Profile.findOne({ user_id : user_id }, (err, profile) => {
      if (err) throw err;
      callback(profile);
    });
  },

  fetchProfileByUserName : function(user_name, callback) {
    Profile.findOne({ user_name : user_name }, (err, profile) => {
      if (err) throw err;
      callback(profile);
    });
  },

  fetchProfilesByTeamId : function(team_id, callback) {
    Profile.find({ team_id : team_id }, (err, profiles) => {
      if (err) throw err;
      callback(profiles);
    });
  },

  fetchProfilesByTeamName : function(team_domain, callback) {
    Profile.find({ team_domain : team_domain }, (err, profiles) => {
      if (err) throw err;
      callback(profiles);
    });
  },

  normalizeSkillsAgainstDataDictionary : function() {

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
}

function replaceUserSkills(_id, replacement_skills, callback) {
  Profile.update({ _id : _id }, { $set: {skills : replacement_skills} }, callback);
}

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

















