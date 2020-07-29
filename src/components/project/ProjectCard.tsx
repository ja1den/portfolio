import React from 'react';

import { Project } from 'models/Project';

import { Card, Badge } from 'react-bootstrap';

export default function ProjectCard({ name, desc, tags, demo, code }: Project) {
	return (
		<Card>
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Text>{desc}</Card.Text>
				{demo && <Card.Link href={demo}>Live demo</Card.Link>}
				{code && <Card.Link href={code}>Source code</Card.Link>}
			</Card.Body>
			{tags && (
				<Card.Footer>
					{tags.map(tag => (
						<Badge key={tag} className='mr-2' variant='dark'>
							{tag}
						</Badge>
					))}
				</Card.Footer>
			)}
		</Card>
	);
}
