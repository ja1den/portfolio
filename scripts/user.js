// Packages
const path = require('path');

const kleur = require('kleur');
const prompts = require('prompts');

const admin = require('firebase-admin');

// Firebase
const secret = require(path.resolve(process.cwd(), 'secret.json'));
admin.initializeApp({
	credential: admin.credential.cert(secret),
	databaseURL: 'https://portfolio-c5fe5.firebaseio.com'
});

// Main
async function main() {
	// Prompts
	const response = await prompts([
		{
			type: 'text',
			name: 'displayName',
			message: 'Name'
		},
		{
			type: 'text',
			name: 'email',
			message: 'Email',
			validate: str => /[\w\d]+@[\w\d]+/.test(str)
		},
		{
			type: 'password',
			name: 'password',
			message: 'Password'
		}
	]);

	// Firebase
	await admin
		.auth()
		.createUser(response)
		.catch(({ message }) => console.error(kleur.red('\n' + message)));

	await admin.app().delete();
}
main();
