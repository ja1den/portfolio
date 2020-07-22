// Packages
const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const childProcess = require('child_process');

// Variables
const source = path.join(__dirname, 'build');
const target = path.join(__dirname, '../build/client');

// Main
if (fs.existsSync(target)) {
	fse.removeSync(target);
}

childProcess.execSync(`cd ${__dirname} && npx react-scripts build`, {
	stdio: 'inherit'
});

fse.moveSync(source, target, { overwrite: true });
