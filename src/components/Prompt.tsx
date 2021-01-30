import React from "react";

export interface PromptProps {
	location: string;
	command?: string;
}

const Prompt: React.FC<PromptProps> = ({ location, command }) => {
	return (
		<section className="prompt">
			<br />
			<span>{location}</span>
			<span>❯ {command}</span>
		</section>
	);
};

export default Prompt;
