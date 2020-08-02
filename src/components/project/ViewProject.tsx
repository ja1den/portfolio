import React from 'react';

import { Project } from 'models/Project';

import { Card, Badge } from 'react-bootstrap';

import FirebaseImage from 'components/general/FirebaseImage';
import Newline from 'components/general/Newline';

export default function ViewProject({
	project: { name, desc, tags, demo, code, image }
}: {
	project: Project;
}) {
	return (
		<Card>
			{image && (
				<FirebaseImage image={image} prop='src'>
					<Card.Img variant='top' />
				</FirebaseImage>
			)}

			<Card.Body>
				{name && <Card.Title>{name}</Card.Title>}
				{desc && (
					<Card.Text>
						<Newline>{desc}</Newline>
					</Card.Text>
				)}
				{demo && <Card.Link href={demo}>Live demo</Card.Link>}
				{code && <Card.Link href={code}>Source code</Card.Link>}
			</Card.Body>

			{tags && tags.length > 0 && (
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
