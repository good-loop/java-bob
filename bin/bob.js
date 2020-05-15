#!/usr/bin/env node
const shell = require("shelljs");
const https = require('https');
const fs = require('fs');

//console.log(process.argv);
const args = [...process.argv];
// shidt node command, script path
args.shift();	
const dirPath = args.shift();
console.log(dirPath, args);

const jarExists = fs.existsSync('bob-all.jar');

if ( ! jarExists || args[0]==="-update" || args[0]==="--update") {
	console.log("Downloading latest bob-all.jar...");	
	const file = fs.createWriteStream("bob-all.jar");
	const request = https.get("https://www.winterwell.com/software/downloads/bob-all.jar", function(response) {
		  response.pipe(file);
		  console.log("...Download complete.");	
	});
	if (args[0]==="-update" || args[0]==="--update") {
		return; // dont go on to build a site
	}
	console.log("Note: If you get a message 'Invalid or corrupt jarfile' - Try re-running bob.");
}

shell.exec("java -jar bob-all.jar "+args.join(" "));

