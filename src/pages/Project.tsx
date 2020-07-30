import React from 'react';
import { db } from 'database';

import { Project, projectConverter } from 'models/Project';

import { Container, CardColumns } from 'react-bootstrap';
import ProjectCard from 'components/project/ProjectCard';

import { PageProps } from 'components/App';

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
					{this.state.projects.map((project, index) => (
						<ProjectCard
							key={index}
							id={project.id}
							project={project.data()}
							editable={!!this.props.user}
						/>
					))}
				</CardColumns>
			</Container>
		);
	}
}

export default ProjectPage;
