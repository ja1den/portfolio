import React from "react";

export interface PromptProps {
	location: string;
}

const Prompt: React.FC<PromptProps> = ({ location, children }) => {
	return (
		<section className="prompt">
			<br />

			<span className='ansi-bright-cyan-fg'>
				{location}
			</span>

			<br />

			<span className='ansi-bright-green-fg'>
				{'❯ '}
			</span>

			{children}
		</section>
	);
}

export default Prompt;
