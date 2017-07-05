var util = {};
const Profile = require('../models/profile_model');

util.testFunction = function() {
  return 1;
}

/**
 * gets the list of unique skills from the database
*/
util.fetchAllSkills = function(callback) {
  console.log('inside the function');
  Profile.find( (err, profiles) => {
    if (err) throw err;
    console.log('inside find');

    let all_skills = [];
    
    profiles.forEach((profile) => {
      profile["skills"].forEach(function(skill) {
        if ( all_skills.indexOf(skill + '\n') < 0 ) {
          all_skills.push(skill + '\n');
        }
      });
    });

    callback(all_skills.sort());
  });
}


module.exports = util;
