#!/usr/bin/env node
const shell = require("shelljs");
const https = require('https');
const fs = require('fs');

const jar = 'bob-all.jar';
const cmd = 'bob';

//console.log(process.argv);
const args = [...process.argv];
// shidt node command, script path
args.shift();	
const dirPath = args.shift();
console.log(dirPath, args);

const jarExists = fs.existsSync(jar);

if ( ! jarExists || args[0]==="-update" || args[0]==="--update") {
	console.log("Downloading latest "+jar+"...");
	// cross-platform download -- sadly not as 100% reliable as wget
	const file = fs.createWriteStream(jar);
	const request = https.get("https://www.winterwell.com/software/downloads/"+jar, function(response) {
		  response.pipe(file);
		  console.log("...Download complete.");	
		  if (args[0]==="-update" || args[0]==="--update") {
			return; // dont go on to build a site
		}
		console.log("Note: If you get a message 'Invalid or corrupt jarfile' - Try re-running "+cmd);
		console.log("If it repeats, run `"+cmd+" -update` to download the jar again.");	
	});
	return;
}

shell.exec("java -jar "+jar" "+args.join(" "));

