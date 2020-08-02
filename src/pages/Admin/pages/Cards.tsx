import React, { useState, useEffect } from 'react';
import { db } from 'database';

import { Project, projectConverter } from 'models/Project';

import { CardColumns } from 'react-bootstrap';
import ViewCard from 'components/cards/ViewCard';

type ProjectType = firebase.firestore.QueryDocumentSnapshot<Project>;

export default function Cards() {
	const [projects, setProjects] = useState<ProjectType[]>([]);

	useEffect(() => {
		return db
			.collection('projects')
			.withConverter(projectConverter)
			.onSnapshot(snapshot => setProjects(snapshot.docs));
	}, []);

	return (
		<CardColumns>
			{projects.map(project => (
				<ViewCard key={project.id} project={project.data()} />
			))}
		</CardColumns>
	);
}
