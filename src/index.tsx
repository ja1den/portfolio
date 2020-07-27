import React from 'react';
import ReactDOM from 'react-dom';

import App from 'components/App';
import ProjectPage from 'pages/Project';

import 'bootstrap/dist/css/bootstrap.min.css';

const entries: App.Entry[] = [
	{
		type: 'link',
		name: 'Projects',
		url: '/projects',
		component: ProjectPage
	},
	{
		type: 'group',
		name: 'Games',
		url: '/games',
		links: [
			{
				type: 'link',
				name: 'Tanks!',
				url: '/tanks',
				component: () => <>BBB</>
			},
			{
				type: 'link',
				name: 'Crossy Road',
				url: '/crossy-road',
				component: () => <>CCC</>
			}
		]
	},
	{
		type: 'redirect',
		from: '/',
		to: '/projects'
	}
];

ReactDOM.render(<App entries={entries} />, document.getElementById('root'));
