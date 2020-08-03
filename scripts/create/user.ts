// Packages
import prompts from 'prompts';
import admin from 'firebase-admin';

// Main
export default async function (admin: admin.app.App) {
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
		.catch(({ message }) => console.error(`${message}`.red));
}
