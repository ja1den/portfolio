import React, { Fragment } from 'react';

export type Command = [
	{
		name: string;
		description: string;
		usage: string;
	},
	React.FC<CommandProps>
]

export interface CommandProps {
	input: string[];
}

const commands: Command[] = [
	[
		{
			name: 'help',
			description: 'list the available commands',
			usage: 'help'
		},
		() => {
			const length = Math.max(...commands.map(command => command[0].usage.length)) + 2;

			const message = '\nUsage: <command> [args]\n\n' + 
				commands.map(command => command[0].usage + ' '.repeat(length - command[0].usage.length) + command[0].description)
					.sort().join('\n');
			
			return <p>{message}</p>;
		}
	],
	[
		{
			name: 'about',
			description: 'learn about me',
			usage: 'about'
		},
		() => (
			<Fragment>
				<br />
				<span>Hey, I'm Jaiden Douglas!</span>
				<br />
				<br />
				<span>
					I'm an Australian full stack developer, working primarily in{' '}
					<a href='https://www.typescriptlang.org/'>TypeScript</a>.
				</span>
				<br />
				<br />
				<span>
					I like <a href='https://reactjs.org/'>React</a>,{' '}
					<a href='https://nodejs.org/en/'>Node.js</a>, and{' '}
					<a href='https://www.rust-lang.org/'>Rust</a>.
				</span>
			</Fragment>
		)
	]
];

export default commands;
