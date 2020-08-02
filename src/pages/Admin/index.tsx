import React from 'react';

import { PageProps } from 'components/App';

import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';

import { Container, Nav } from 'react-bootstrap';

import Cards from './pages/Cards';
import Files from './pages/Files';

type AdminPageProps = PageProps & RouteComponentProps;

class AdminPage extends React.Component<AdminPageProps> {
	render() {
		return (
			<Container className='pt-3'>
				<Nav className='mb-3' variant='tabs'>
					<Nav.Item>
						<Nav.Link
							to={`${this.props.match.url}/cards`}
							as={NavLink}>
							Cards
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link
							to={`${this.props.match.url}/files`}
							as={NavLink}>
							Files
						</Nav.Link>
					</Nav.Item>
				</Nav>
				<Switch>
					<Route path={`${this.props.match.url}/cards`}>
						<Cards />
					</Route>

					<Route path={`${this.props.match.url}/files`}>
						<Files />
					</Route>

					<Route path={this.props.match.url} exact>
						<Redirect to={`${this.props.match.url}/cards`} />
					</Route>
				</Switch>
			</Container>
		);
	}
}

export default withRouter(AdminPage);
