import React, { Fragment, useState } from 'react';

import Prompt from './components/Prompt';

interface TerminalEntry {
	command: string;
	content: string;
}

const Terminal: React.FC = () => {
	const [state, setState] = useState<TerminalEntry[]>([]);

	return (
		<main className='terminal'>
			<section className='content'>
				{state.map((entry, i) => (
					<Fragment>
						<p className='prompt'>
							<span className='prompt-command'></span>
							<span className='prompt'></span>
						</p>
					</Fragment>
				))}
			</section>

			<section className='input'></section>
		</main>
	);
}

export default Terminal;
