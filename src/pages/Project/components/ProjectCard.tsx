import React from 'react';

import { Project } from 'models/Project';

import { Card, Badge } from 'react-bootstrap';

export default function ProjectCard({ name, desc, tags, demo, code }: Project) {
	return (
		<Card>
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Text>{desc}</Card.Text>
				<Card.Text>
					{demo && <Card.Link href={demo}>Demo</Card.Link>}
					{code && <Card.Link href={code}>Code</Card.Link>}
				</Card.Text>
			</Card.Body>
			{tags && (
				<Card.Footer>
					{tags.map(tag => (
						<Badge key={tag} className='mr-1' variant='secondary'>
							{tag}
						</Badge>
					))}
				</Card.Footer>
			)}
		</Card>
	);
}
