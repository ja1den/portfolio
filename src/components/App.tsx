import React from 'react';

import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom';

import Header from 'components/Header';

declare namespace App {
	export type Link = {
		type: 'link';
		name: string;
		url: string;
		component: RouteProps['component'];
	};

	export type Group = {
		type: 'group';
		name: string;
		url: string;
		links: Link[];
	};

	export type Redirect = {
		type: 'redirect';
		from: string;
		to: string;
	};

	export type Entry = Link | Group | Redirect;
}

type AppProps = RouteComponentProps & { entries: App.Entry[] };

const App = withRouter(({ entries, history }: AppProps) => {
	return (
		<>
			<Header
				title='Jadie Wadie'
				entries={
					entries.filter(
						link =>
							(link.type === 'link' || link.type === 'group') &&
							link.url !== '/login'
					) as (App.Link | App.Group)[]
				}
				login={() => history.push('/login')}
			/>
			<Switch>
				{entries
					.map(entry => {
						switch (entry.type) {
							case 'link':
								return (
									<Route
										key={entry.name}
										path={entry.url}
										component={entry.component}
									/>
								);
							case 'group':
								return entry.links.map(link => (
									<Route
										key={link.name}
										path={entry.url + link.url}
										component={link.component}
									/>
								));
							case 'redirect':
								return (
									<Route
										key={`${entry.from}-${entry.to}`}
										path={entry.from}>
										<Redirect to={entry.to} />
									</Route>
								);
							default:
								return <></>;
						}
					})
					.flat()}
			</Switch>
		</>
	);
});

export default App;
