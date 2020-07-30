import React from 'react';
import { auth } from 'database';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Header from 'components/general/Header';
import Login from 'components/general/Login';

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

	export type Props = { entries: App.Entry[] };
	export type State = {
		show: boolean;
		user: firebase.User | null;
		error?: string;
	};
}

class App extends React.Component<App.Props, App.State> {
	unsubscribe?: Function;

	constructor(props: App.Props) {
		super(props);

		this.state = {
			show: false,
			user: null
		};
	}

	componentDidMount() {
		this.unsubscribe = auth().onAuthStateChanged(user =>
			this.setState({ user })
		);
	}

	componentWillUnmount() {
		this.unsubscribe?.();
	}

	render() {
		const entries: Header.Props['entries'] = this.props.entries.filter(
			link =>
				(link.type === 'link' || link.type === 'group') &&
				link.url !== '/login'
		) as (App.Link | App.Group)[];

		const buttons: Header.Props['buttons'] = [
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
				/>
				<Switch>
					{this.props.entries
						.map(entry => {
							let Page: App.Link['component'];
							switch (entry.type) {
								case 'link':
									Page = entry.component;
									return (
										<Route
											key={entry.name}
											path={entry.url}>
											<Page user={this.state.user} />
										</Route>
									);
								case 'group':
									return entry.links.map(link => {
										Page = link.component;
										return (
											<Route
												key={link.name}
												path={entry.url + link.url}>
												<Page user={this.state.user} />
											</Route>
										);
									});
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

	showLogin = () => this.setState({ show: true });
	hideLogin = () => this.setState({ show: false });
}

export default App;
