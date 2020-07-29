import React from 'react';
import { auth } from 'firestore';

import {
	BrowserRouter,
	Switch,
	Route,
	Redirect,
	RouteProps
} from 'react-router-dom';

import Header from 'components/Header';
import FormModal from 'components/FormModal';

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

type AppProps = { entries: App.Entry[] };
type AppState = { show: boolean; user: firebase.User | null };

class App extends React.Component<AppProps, AppState> {
	unsubscribe?: Function;

	constructor(props: AppProps) {
		super(props);

		this.state = {
			show: false,
			user: null
		};

		this.onSubmit = this.onSubmit.bind(this);
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
		return (
			<BrowserRouter>
				<Header
					title='Jadie Wadie'
					entries={
						this.props.entries.filter(
							link =>
								(link.type === 'link' ||
									link.type === 'group') &&
								link.url !== '/login'
						) as (App.Link | App.Group)[]
					}
					buttons={
						this.state.user === null
							? [
									{
										name: 'Login',
										call: () =>
											this.setState({ show: true })
									}
							  ]
							: [{ name: 'Logout', call: () => auth().signOut() }]
					}
				/>
				<Switch>
					{this.props.entries
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
									return null;
							}
						})
						.flat()}
				</Switch>
				<FormModal<{ email: string; password: string }>
					show={this.state.show}
					onHide={() => this.setState({ show: false })}
					fields={[]}
					onSubmit={this.onSubmit}
				/>
			</BrowserRouter>
		);
	}

	onSubmit() {}
}

export default App;
