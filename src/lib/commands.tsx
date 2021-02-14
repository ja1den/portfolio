import React from 'react';

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

			const message = '\n' + 
				commands.map(command => command[0].usage + ' '.repeat(length - command[0].usage.length) + command[0].description)
					.sort().join('\n');
			
			return <p>{message}</p>;
		}
	]
];

export default commands;
