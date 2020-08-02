import React from 'react';
import { db } from 'database';

import { Project, projectConverter } from 'models/Project';
import { PageProps } from 'components/App';

import { Container, CardColumns } from 'react-bootstrap';

import ViewCard from 'components/cards/ViewCard';

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
		db.collection('projects')
			.withConverter(projectConverter)
			.onSnapshot(snapshot =>
				this.setState({
					projects: snapshot.docs
				})
			);
	}

	render() {
		return (
			<Container className='pt-3'>
				<CardColumns>
					{this.state.projects.map(project => (
						<ViewCard key={project.id} project={project.data()} />
					))}
				</CardColumns>
			</Container>
		);
	}
}
