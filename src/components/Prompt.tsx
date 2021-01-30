import React from "react";

import c from 'ansi-colors';
import U from 'ansi_up';

export interface PromptProps {
	location: string;
}

class Prompt extends React.Component<PromptProps> {
	prompt: React.RefObject<HTMLElement>;
	u = new U();

	constructor(props: PromptProps) {
		super(props);

		this.prompt = React.createRef();
		this.u.use_classes = true;
	}

	componentDidMount() {
		if (this.prompt.current) {
			let html = '\n' + c.cyanBright(this.props.location) + '\n' + c.greenBright('❯ ');

			html = this.u.ansi_to_html(html);
			html = html.replace(/\n/g, '<br>');

			this.prompt.current.innerHTML = html + this.prompt.current.innerHTML;
		}
	}

	render() {
		return (
			<section className="prompt" ref={this.prompt}>
				{this.props.children}
			</section>
		);
	}
}

export default Prompt;
