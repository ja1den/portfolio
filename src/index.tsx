import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import App, { AppEntry } from 'components/App';

import ProjectPage from 'pages/Project';

const entries: AppEntry[] = [
	{
		name: 'Projects',
		url: '/projects',
		component: ProjectPage
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
