import React from 'react';
import ReactDOM from 'react-dom';

import Container from 'react-bootstrap/Container';

import App from 'components/App';

import ProjectPage from 'pages/Project';
import AdminPage from 'pages/Admin';

import 'bootstrap/dist/css/bootstrap.min.css';

const entries: App.Entry[] = [
	{
		type: 'link',
		name: 'Projects',
		url: '/projects',
		component: ProjectPage
	},
	{
		type: 'link',
		name: 'Admin',
		url: '/admin',
		component: AdminPage,
		auth: true
	},
	{
		type: 'redirect',
		from: '/',
		to: '/projects'
	}
];

ReactDOM.render(<App entries={entries} />, document.getElementById('root'));
