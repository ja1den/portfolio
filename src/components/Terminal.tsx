import React from 'react';

import commands, { Command } from '../lib/commands';

interface TerminalProps {
	prompt: string;
}

interface TerminalState {
	entries: [string, Command | null][];
	content: string;
}

class Terminal extends React.Component<TerminalProps, TerminalState> {
	input: React.RefObject<HTMLSpanElement>;

	constructor(props: TerminalProps) {
		super(props);

		this.state = {
			entries: [['help', commands[0]]],
			content: ''
		};

		this.input = React.createRef();
	}

	componentDidMount() {
		document.addEventListener('click', this.onClick);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.onClick);
	}

	render() {
		return (
			<main className='terminal'>
				<section className='content'>
					{this.state.entries.map((entry, i) => {
						let content = entry[1]?.[1] ? (
							React.createElement(entry[1]?.[1], { input: entry[0].split(' ') })
						) : (
							<span>-bash: {entry[0].split(" ")[0]}: command not found</span>
						);

						return (
							<article key={i} className='prompt'>
								<br />
								<span>~</span>
								<br />
								<span>{this.props.prompt + ' '}</span>
								<span>{entry[0]}</span>
								<br />
								<br />
								{content}
							</article>
						)
					})}
				</section>

				<section className='input'>
					<br />
					<span>~</span>
					<br />
					<span>{this.props.prompt}&nbsp;</span>
					<span ref={this.input} contentEditable onKeyDown={this.onKeyDown} />
				</section>
			</main>
		);
	}

	onKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
		if (this.input.current) {
			if (event.key === 'Enter') {
				event.preventDefault();

				const input = this.input.current.innerHTML;
				const name = input.split(' ')[0];

				const command = commands.find(command => command[0].name === name) ?? null;

				this.setState(state => ({
					entries: [...state.entries, [input, command]]
				}));

				this.input.current.innerHTML = '';
			}
		}
	}

	onClick = (event: MouseEvent) => {
		if (event.target instanceof Element) {
			setImmediate(() => {
				if (window.getSelection()?.toString().length === 0) {
					this.input.current?.focus();
				}
			});
		}
	}
}

export default Terminal;
