import React from 'react';

import { Project } from 'models/Project';

import { Card, Badge } from 'react-bootstrap';

import Image from 'components/general/Image';
import Newline from 'components/general/Newline';

export default function ViewCard({
	project: { name, desc, tags, demo, code, image }
}: {
	project: Project;
}) {
	return (
		<Card>
			{image && (
				<Image image={image} prop='src'>
					<Card.Img variant='top' />
				</Image>
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
