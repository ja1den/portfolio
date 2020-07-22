import React from 'react';

import {
	BrowserRouter,
	Switch,
	Route,
	Redirect,
	RouteProps
} from 'react-router-dom';

import Header, { HeaderLink, HeaderGroup } from 'components/Header';

type AppLink = HeaderLink & { component: RouteProps['component'] };
type AppGroup = Omit<HeaderGroup, 'links'> & { links: AppLink[] };
type AppRedirect = { from: string; to: string };

export type AppEntry = AppLink | AppGroup | AppRedirect;

type AppProps = { entries: AppEntry[] };

export default function App({ entries }: AppProps) {
	return (
		<BrowserRouter>
			<Header
				title='Jadie Wadie'
				entries={
					entries.filter(
						link => isAppLink(link) || isAppGroup(link)
					) as (AppLink | AppGroup)[]
				}
			/>
			<Switch>
				{entries
					.map(entry => {
						if (isAppLink(entry))
							return (
								<Route
									key={entry.name}
									path={entry.url}
									component={entry.component}
								/>
							);

						if (isAppGroup(entry))
							return entry.links.map(link => (
								<Route
									key={link.name}
									path={entry.url + link.url}
									component={link.component}
								/>
							));

						if (isAppRedirect(entry))
							return (
								<Route
									key={`${entry.from}-${entry.to}`}
									path={entry.from}>
									<Redirect to={entry.to} />
								</Route>
							);
					})
					.flat()}
			</Switch>
		</BrowserRouter>
	);
}

function isAppLink(entry: AppEntry): entry is AppLink {
	return (entry as AppLink).component !== undefined;
}

function isAppGroup(entry: AppEntry): entry is AppGroup {
	return (entry as AppGroup).links !== undefined;
}

function isAppRedirect(link: AppEntry): link is AppRedirect {
	return (link as AppRedirect).from !== undefined;
}
