var util = {};

util.testFunction = function() {
  return 1;
}

util.fetchAllSkills = function(callback) {
  Profile.find( (err, profiles) => {
    if (err) throw err;

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
