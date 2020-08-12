import React, { useState, useEffect } from 'react';
import { db } from 'database';

import { Project, projectConverter } from 'models/Project';

import { CardColumns, Card, Button } from 'react-bootstrap';
import FormCard from 'components/cards/FormCard';

type ProjectType = firebase.firestore.QueryDocumentSnapshot<Project>;

export default function Cards() {
	const [projects, setProjects] = useState<ProjectType[]>([]);

	useEffect(() => {
		return db
			.collection('projects')
			.withConverter(projectConverter)
			.onSnapshot(snapshot => setProjects(snapshot.docs));
	}, []);

	const onClick = async () => {
		db.collection('projects').add({});
	};

	return (
		<CardColumns>
			{projects.map(project => (
				<FormCard
					key={project.id}
					id={project.id}
					project={project.data()}
				/>
			))}
			<Card>
				<Card.Body>
					<Button variant='success' block onClick={onClick}>
						New
					</Button>
				</Card.Body>
			</Card>
		</CardColumns>
	);
}
