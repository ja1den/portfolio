// Packages
import 'colors';

import { resolve } from 'path';
import { readdirSync } from 'fs';

import prompts from 'prompts';
import admin from 'firebase-admin';

// Firebase
const secret = require(resolve(process.cwd(), 'secret/firebase.json'));
admin.initializeApp({
	credential: admin.credential.cert(secret)
});

// Main
async function main() {
	// Action
	const dirents = readdirSync(__dirname, { withFileTypes: true });

	const { action }: { action: string } = await prompts({
		type: 'select',
		name: 'action',
		message: 'What would you like to do?',
		choices: dirents
			.filter(dirent => dirent.isDirectory())
			.map(dirent => ({ title: dirent.name, value: dirent.name }))
	});

	if (action === undefined) return;

	// Script
	const scripts = readdirSync(resolve(__dirname, action)).map(
		file => file.match(/(?<name>\w+)(?=.\w+)/g)?.[0]!
	);

	const { script }: { script: Function } = await prompts({
		type: 'select',
		name: 'script',
		message: `What would you like to ${action.cyan}?`,
		choices: await Promise.all(
			scripts.map(async script => {
				const { default: call } = await import(`./${action}/${script}`);
				return {
					title: script,
					value: call,
					disabled: typeof call !== 'function'
				};
			})
		)
	});

	// Execute
	if (script === undefined) return;
	await script?.(admin);

	// Close
	await admin.app().delete();
}
main();
