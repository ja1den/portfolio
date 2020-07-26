import React from 'react';

import { Project } from 'models/Project';

import { Card } from 'react-bootstrap';

export default function ProjectCard({ name, desc, tags }: Project) {
	return (
		<Card className='mb-3' style={{ minWidth: '18rem' }}>
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Text>{desc}</Card.Text>
			</Card.Body>
		</Card>
	);
}
