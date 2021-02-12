import React, { Fragment } from 'react';

import commands from '../commands';

interface TerminalProps {
	prompt: string;
}

interface TerminalState {
	entries: string[];
	content: string;
}

class Terminal extends React.Component<TerminalProps, TerminalState> {
	input: React.RefObject<HTMLSpanElement>;

	constructor(props: TerminalProps) {
		super(props);

		this.state = {
			entries: [],
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
					{this.state.entries.map((entry, i) => (
						<Fragment key={i}>
							<p className='prompt'>
								<br />
								<span>~</span>
								<br />
								<span>{this.props.prompt + ' '}</span>
								<span>{entry}</span>
								<br />
								<span>-bash: {entry.split(' ')[0]}: command not found</span>
							</p>
						</Fragment>
					))}
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

				const command = this.input.current.innerHTML;

				this.setState(state => ({
					entries: [...state.entries, command]
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
