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
			description: 'print this list',
			usage: 'help'
		},
		() => {
			const length = Math.max(...commands.map(command => command[0].usage.length)) + 2;

			const message = 'Usage: <command> [args]\n\n' + 
				commands.map(command => command[0].usage + ' '.repeat(length - command[0].usage.length) + command[0].description)
					.join('\n');
			
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
	],
	[
		{
			name: 'contact',
			description: 'ask me something',
			usage: 'contact'
		},
		() => {
			return	(
				<address>
					github  <a href='https://github.com/ja1den/'>ja1den</a>
					<br />
					email   <a href='mailto:contact@ja1den.me'>contact@ja1den.me</a>
					<p></p>
				</address>
			);
		}
	],
	[
		{
			name: 'repo',
			description: 'project repo',
			usage: 'repo'
		},
		() => <a href='https://github.com/ja1den/portfolio'>click me</a>
	]
];

export default commands;
