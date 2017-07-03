/* jshint esversion:6, node:true */

/**
 * Maintain database via command line
 *
 * Copyright © 2017 Peter Martinson
 *
 *   Currently, this connects to DEV version of db
 *   Change `getDbConnectionString()` to modify this
*/

const db       = require('../db/index'),
      mongoose = require('mongoose'),
      util     = require('util'),
      Profile  = require('../models/profile_model');

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
  console.log('1. Normalize skills in database against a new Data Dictionary');
  console.log('2. Display contents of database');
  console.log('3. Display one user\'s profile.  ("3 <user_id>" or "3 <user_name>")');
  console.log('4. Display all profiles for a team.  ("4 <team_id>" or "4 <team_domain>")');
  console.log('      When you are finished, please type "quit"');
}

logTitleSplash();

/* =========================== OPEN STDIN STREAM =========================== */
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (text) {
  let command = getCommand(text).substring(0,1);

	if ( getCommand(text) === 'quit') {
		done();
	}
  else if ( command == '1' ) {
    console.log(normalizeSkillsAgainstDataDictionary());
  }
  else if ( command == '2' ) {
    fetchAllProfiles(displayDocuments);
  }
  else if ( command == '3' ) {
    let id = getCommand(text).substring(2);
    console.log('\n');
    if ( fetchDocumentByUserId(id, displayDocuments) ) ; // condition automatically console logs if true
    else fetchDocumentByUserName(id, displayDocuments);
  }
  else if ( command == '4' ) {
    let id = getCommand(text).substring(2);
    console.log('\n');
    if ( fetchDocumentsByTeamId(id, displayDocuments) ) ; // condition automatically console logs if true
    else fetchDocumentsByTeamName(id, displayDocuments);
  }
  else {
    console.log('That was not one of the options.\n');
    displayAvailableCommands();
  }
});

/* ============================== FUNCTIONS ============================== */
function getCommand(text) {
  return text.substring(0,text.length-1);
}

function done() {
	console.log('Goodbye');
	process.exit();
}

function normalizeSkillsAgainstDataDictionary() {
  // iterate through all profiles passed to this function
  // get the user's skill list, as a local temporary array
  // iterate through all skills in temporary array, make a new sanitized array with fetchSkill
  //   TEST: console.log the old and the new skills arrays
  //   QA:   update the user's skill list with the new array.
  fetchAllProfiles( (profiles) => {
    for (let profile in profiles) {
      let old_skills = profiles[profile].skills,
          new_skills = [];
      console.log(profiles[profile].skills);
    }
  });

  return 'normalize';
}

function displayDocuments(documents) {
  if ( documents !== null ) {
    console.log(documents + '\n');
    displayAvailableCommands();
  }
}

function fetchAllProfiles(callback) {
  Profile.find( (err, profiles) => {
    if (err) throw err;
    callback(profiles);
  });
}

function fetchDocumentByUserId(user_id, callback) {
  Profile.findOne({ user_id : user_id }, (err, profile) => {
    if (err) throw err;
    callback(profile);
  });
}

function fetchDocumentByUserName(user_name, callback) {
  Profile.findOne({ user_name : user_name }, (err, profile) => {
    if (err) throw err;
    callback(profile);
  });
}

function fetchDocumentsByTeamId(team_id, callback) {
  Profile.find({ team_id : team_id }, (err, profiles) => {
    if (err) throw err;
    callback(profiles);
  });
}

function fetchDocumentsByTeamName(team_domain, callback) {
  Profile.find({ team_domain : team_domain }, (err, profiles) => {
    if (err) throw err;
    callback(profiles);
  });
}

