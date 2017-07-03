/* jshint esversion:6, node:true */

/**
 * https://whapp.herokuapp.com/
 * Maintain Whobot database via command line
 *
 * © 2017 Jay Schwane & Peter Martinson
 *
 *   Currently, this connects to DEV version of db
 *   Change `getDbConnectionString()` in ../db/index to modify this
*/

const db              = require('../db/index'),
      mongoose        = require('mongoose'),
      util            = require('util'),
      data_dictionary = require('../data_dictionary/dataDictionary'),
      Profile         = require('../models/profile_model');

/* ============================= CONNECT TO DB ============================= */
mongoose.connect(db.getDbConnectionString());
mongoose.Promise = global.Promise;

/* ============================= INSTRUCTIONS ============================== */
function logTitleSplash() {
	console.log('           __          __          __ ');
	console.log(' _      __/ /_  ____  / /_  ____  / /_');
	console.log('| | /| / / __ \\/ __ \\/ __ \\/ __ \\/ __/');
	console.log('| |/ |/ / / / / /_/ / /_/ / /_/ / /_  ');
	console.log('|__/|__/_/ /_/\\____/_.___/\\____/\\__/  ');
	console.log('\n');
	console.log('Welcome to the /whobot database utility.\n');
  displayAvailableCommands();
}

function displayAvailableCommands() {
  console.log('Type in the number of the procedure you wish to execute:');
  console.log('<1> Display contents of database');
  console.log('<2> Display one user\'s profile.  ("3 <user_id>" or "3 <user_name>")');
  console.log('<3> Display all profiles for a team.  ("4 <team_id>" or "4 <team_domain>")');
  console.log('<4> Display all skills in database');
  console.log('<6> Normalize skills in database against a new Data Dictionary');
  console.log('<P> Connect to the production database');
  console.log('<D> Connect to the development database');
  console.log('\n      When you are finished, please type "quit"\n');
}

logTitleSplash();

/* =========================== OPEN STDIN STREAM =========================== */
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (text) {
  let command = getCommand(text).substring(0,1);
  let id = getCommand(text).substring(2);

	if ( getCommand(text) === 'quit') {
		done();
	}

  switch (command) {
    case '1':
      fetchAllProfiles(displayResults);
      break;
    case '2':
      console.log('\n');
      if ( fetchProfileByUserId(id, displayResults) ) ; // condition automatically console logs if true
      else fetchProfileByUserName(id, displayResults);
      break;
    case '3':
      console.log('\n');
      if ( fetchProfilesByTeamId(id, displayResults) ) ; // condition automatically console logs if true
      else fetchProfilesByTeamName(id, displayResults);
      break;
    case '4':
      fetchAllSkills(displayResults);
      break;
    case '6':
      normalizeSkillsAgainstDataDictionary();
      break;
    case 'P':
      break;
    case 'D':
      break;
    default:
      console.log('That was not one of the options.\n');
      displayAvailableCommands();
      break;
  }

});

/* ============================== FUNCTIONS ============================== */
/**
 * removes newline character from sdtin chunk
*/
function getCommand(text) {
  return text.substring(0,text.length-1);
}

/**
 * closes the sdtin process
*/
function done() {
	console.log('Goodbye');
	process.exit();
}

/**
 * gets the list of unique skills from the database
*/
function fetchAllSkills(callback) {
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

/**
 * updates all profiles in database with normalized skills
*/
function normalizeSkillsAgainstDataDictionary() {
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
 * log reqults to the console
 *
 * @params {string} something to log to the console
*/
function displayResults(results) {
  if ( results !== null ) {
    console.log('\n' + results + '\n');
    displayAvailableCommands();
  }
}

/**
 * get all profiles from database
*/
function fetchAllProfiles(callback) {
  Profile.find( (err, profiles) => {
    if (err) throw err;
    callback(profiles);
  });
}

/**
 * get a single profile
 *
 * @params {string} the profile.user_id
*/
function fetchProfileByUserId(user_id, callback) {
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
function fetchProfileByUserName(user_name, callback) {
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
function fetchProfilesByTeamId(team_id, callback) {
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
function fetchProfilesByTeamName(team_domain, callback) {
  Profile.find({ team_domain : team_domain }, (err, profiles) => {
    if (err) throw err;
    callback(profiles);
  });
}

/**
 * check a skill against the data dictionary
 *
 * @params {string} the skill to check against dictionary
 * @returns {string} either the passed skill, or the data dictionary's skill
*/
function getNormalizedSkill(current_skill) {
  var match_skill = current_skill;
  for (var skill in data_dictionary) {
    data_dictionary[skill].forEach(function (name_variant) {
      if (current_skill.toLowerCase() === name_variant.toLowerCase()) {
        match_skill = skill;
      }
    });
  }
  return match_skill;
};
