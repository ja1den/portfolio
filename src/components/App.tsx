import React from 'react';
import { auth } from 'database';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Header, { HeaderProps } from 'components/general/Header';
import Login from 'components/general/Login';

import halfmoon from 'halfmoon';

export type PageProps = {
	user: firebase.User | null;
};

declare namespace App {
	export type Link = {
		type: 'link';
		name: string;
		url: string;
		component:
			| React.ComponentClass<PageProps>
			| React.FunctionComponent<PageProps>;
		auth?: boolean;
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

type AppProps = { entries: App.Entry[] };
type AppState = {
	show: boolean;
	user: firebase.User | null;
	error?: string;
};

class App extends React.Component<AppProps, AppState> {
	unsubscribe?: Function;

	constructor(props: AppProps) {
		super(props);

		this.state = {
			show: false,
			user: null
		};
	}

	componentDidMount() {
		halfmoon.onDOMContentLoaded();

		this.unsubscribe = auth().onAuthStateChanged(user =>
			this.setState({ user })
		);
	}

	componentWillUnmount() {
		this.unsubscribe?.();
	}

	render() {
		const entries: HeaderProps['entries'] = this.props.entries.filter(
			link => link.type === 'link' || link.type === 'group'
		) as (App.Link | App.Group)[];

		const buttons: HeaderProps['buttons'] = [
			{
				name: this.state.user === null ? 'Login' : 'Logout',
				call: () =>
					this.state.user === null
						? this.showLogin()
						: auth().signOut()
			}
		];

		return (
			<BrowserRouter>
				<Header
					title='Jadie Wadie'
					entries={entries}
					buttons={buttons}
					auth={!!this.state.user}
				/>
				<Switch>
					{this.props.entries
						.map(entry => {
							switch (entry.type) {
								case 'link':
									return this.renderPage(entry, entry.url);
								case 'group':
									return entry.links.map(link =>
										this.renderPage(
											link,
											entry.url + link.url
										)
									);
								case 'redirect':
									return (
										<Route
											key={`${entry.from}-${entry.to}`}
											path={entry.from}>
											<Redirect to={entry.to} />
										</Route>
									);
								default:
									return null;
							}
						})
						.flat()}
				</Switch>
				<Login
					show={this.state.show}
					onClose={this.hideLogin}
					onLogin={this.hideLogin}
				/>
			</BrowserRouter>
		);
	}

	renderPage(link: App.Link, url: string) {
		if (process.env.NODE_ENV !== 'development')
			if (link?.auth === true && !!this.state.user === false) return;

		const Page = link.component;
		return (
			<Route key={Page.name} path={url}>
				<Page user={this.state.user} />
			</Route>
		);
	}

	showLogin = () => this.setState({ show: true });
	hideLogin = () => this.setState({ show: false });
}

export default App;
