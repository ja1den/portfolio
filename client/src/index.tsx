import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import App, { AppEntry } from 'components/App';

const entries: AppEntry[] = [
	{
		name: 'Projects',
		url: '/projects',
		component: () => <>AAA</>
	},
	{
		name: 'Games',
		url: '/games',
		links: [
			{
				name: 'Tanks!',
				url: '/tanks',
				component: () => <>BBB</>
			},
			{
				name: 'Crossy Road',
				url: '/crossy-road',
				component: () => <>CCC</>
			}
		]
	}
];

ReactDOM.render(<App entries={entries} />, document.getElementById('root'));
