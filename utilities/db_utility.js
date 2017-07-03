/**
 * module to facilitate command line interaction
 *
 * Copyright © 2017 Peter Martinson
*/

logTitleSplash();
var util = require('util');

/* =========================== OPEN STDIN STREAM =========================== */
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (text) {

	if (text === 'quit\n') {
		done();
	}
  else if ( getCommand(text) == '1' ) {
    console.log(normalizeSkillsAgainstDataDictionary());
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

function displayAvailableCommands() {
  console.log('Type in the number of the procedure you wish to execute:');
  console.log('1. Normalize skills in database against a new Data Dictionary');
  console.log('2. Display contents of database');
  console.log('      When you are finished, please type "quit"');
}

function logTitleSplash() {
	console.log('           __          __          __ ');
	console.log(' _      __/ /_  ____  / /_  ____  / /_');
	console.log('| | /| / / __ \\/ __ \\/ __ \\/ __ \\/ __/');
	console.log('| |/ |/ / / / / /_/ / /_/ / /_/ / /_  ');
	console.log('|__/|__/_/ /_/\\____/_.___/\\____/\\__/  ');
	console.log('\nWelcome to the /whobot database utility.\n');
  displayAvailableCommands();
}

function openDatabaseConnection() {

}
/* =========================== DATABASE FUNCTIONS =========================== */

function normalizeSkillsAgainstDataDictionary() {
  return 'normalize';
}

function displayAllDatabaseDocuments() {
  return 'display all documents';
}

function fetchAllDatabaseDocuments(callback) {
  let documents = '';
  callback(documents);
}

