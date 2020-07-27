import React from 'react';
import { firestore } from 'firestore';

import { projectConverter, Project } from 'models/Project';

import { Container, CardColumns } from 'react-bootstrap';
import ProjectCard from './components/ProjectCard';

type ProjectPageState = {
	projects: Project[];
};

export default class ProjectPage extends React.Component<{}, ProjectPageState> {
	constructor(props: {}) {
		super(props);
		this.state = { projects: [] };
	}

	async componentDidMount() {
		firestore
			.collection('projects')
			.withConverter(projectConverter)
			.onSnapshot(snapshot =>
				this.setState({
					projects: snapshot.docs.map(doc => doc.data())
				})
			);
	}

	render() {
		return (
			<Container className='pt-3'>
				<CardColumns>
					{this.state.projects.map((project, index) => (
						<ProjectCard key={index} {...project} />
					))}
				</CardColumns>
			</Container>
		);
	}
}
