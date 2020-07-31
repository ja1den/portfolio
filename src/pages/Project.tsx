import React from 'react';
import { db } from 'database';

import { Project, projectConverter } from 'models/Project';
import { PageProps } from 'components/App';

import { Container, CardColumns } from 'react-bootstrap';

import ViewProject from 'components/project/ViewProject';
import FormProject from 'components/project/FormProject';

declare namespace ProjectPage {
	export type State = {
		projects: firebase.firestore.QueryDocumentSnapshot<Project>[];
	};
}

class ProjectPage extends React.Component<PageProps, ProjectPage.State> {
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
	}
}

export default ProjectPage;
