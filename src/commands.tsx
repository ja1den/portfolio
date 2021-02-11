interface Command {
	name: string;
	description: string;
	component: React.ReactNode;
}

const commands: Command[] = [
	{
		name: 'help',
		description: 'See everything you can do!',
		component: () => {
			return <p>Help!</p>;
		},

	}
];

export default commands;
