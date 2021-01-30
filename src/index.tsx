import React from 'react';
import ReactDOM from 'react-dom';

import './styles/global.scss';

import Prompt from './components/Prompt';

const App: React.FC = () => {
	const param = new URLSearchParams(window.location.search).get('history') ?? '[]';
	const parse = JSON.parse(param);

	const history = Array.isArray(parse) ? parse : [];

	return (
		<main className='terminal'>
			{history.map((command, index) => (
				<Prompt key={index} location="~">{command}</Prompt>
			))}
			
			<Prompt location='~'>
				<input></input>
			</Prompt>
		</main>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));
