import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import App from 'components/App';

import ProjectPage from 'pages/Project';
import LoginPage from 'pages/Login';

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
				component: () => (
					<Container className='mt-3'>
						<h1>Tanks!</h1>
					</Container>
				)
			},
			{
				type: 'link',
				name: 'Crossy Road',
				url: '/crossy-road',
				component: () => (
					<Container className='mt-3'>
						<h1>Crossy Road</h1>
					</Container>
				)
			}
		]
	},
	{
		type: 'link',
		name: 'Login',
		url: '/login',
		component: LoginPage
	},
	{
		type: 'redirect',
		from: '/',
		to: '/projects'
	}
];

ReactDOM.render(
	<BrowserRouter>
		<App entries={entries} />
	</BrowserRouter>,
	document.getElementById('root')
);
