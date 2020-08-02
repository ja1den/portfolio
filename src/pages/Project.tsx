import React from 'react';
import { db } from 'database';

import { Project, projectConverter } from 'models/Project';
import { PageProps } from 'components/App';

import { Container, Nav, CardColumns } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import ViewProject from 'components/project/ViewProject';
import FormProject from 'components/project/FormProject';

type ProjectPageState = {
	projects: firebase.firestore.QueryDocumentSnapshot<Project>[];
};

export default class ProjectPage extends React.Component<
	PageProps,
	ProjectPageState
> {
	constructor(props: PageProps) {
		super(props);

		this.state = {
			projects: []
		};
	}

	async componentDidMount() {
		/*
		db.collection('projects')
			.withConverter(projectConverter)
			.onSnapshot(snapshot =>
				this.setState({
					projects: snapshot.docs
				})
			);
		*/
	}

	render() {
		return <></>;
	}
}

/*

return (
	<Container className='pt-3'>
		<Nav variant='tabs' defaultActiveKey='/projects/cards'>
			<Nav.Item>
				<Nav.Link to='/projects/cards' as={NavLink}>
					Cards
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link to='/projects/files' as={NavLink}>
					Files
				</Nav.Link>
			</Nav.Item>
		</Nav>
		<CardColumns>
			{this.state.projects.map((project, index) =>
				!!this.props.user ? (
					<FormProject
						key={project.id}
						project={project.data()}
						id={project.id}
					/>
				) : (
					<ViewProject
						key={project.id}
						project={project.data()}
					/>
				)
			)}
		</CardColumns>
	</Container>
);

*/
