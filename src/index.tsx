import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './styles/global.scss';

import Prompt from './components/Prompt';

const App: React.FC = () => {
	const [input, setInput] = useState('');

	const param = new URLSearchParams(window.location.search).get('history') ?? '[]';
	const parse = JSON.parse(param);

	const history: string[] = Array.isArray(parse) ? parse : [];

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInput(event.target.value);
	}

	const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			const param = new URLSearchParams();
			
			param.set('history', JSON.stringify([...history, input]));

			window.location.search = param.toString();

			setInput('');
		}
	}

	return (
		<main className='terminal'>
			{history.map((command, index) => (
				<Prompt key={index} location="~">{command}</Prompt>
			))}
			
			<Prompt location='~'>
				<input value={input} spellCheck={false} onChange={onChange} onKeyDown={onKeyDown} />
			</Prompt>
		</main>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));
