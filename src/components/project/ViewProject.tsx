import React, { useState, useEffect } from 'react';

import { storage } from 'database';
import { Project } from 'models/Project';

import { Card, Badge } from 'react-bootstrap';
import Newline from 'components/general/Newline';

export default function ViewProject({
	project: { name, desc, tags, demo, code, image }
}: {
	project: Project;
}) {
	const [url, setURL] = useState<string | null>(null);

	useEffect(() => {
		if (image)
			(async () => {
				setURL(
					await storage
						.ref(image)
						.getDownloadURL()
						.catch(({ message }) => console.error(message))
				);
			})();
		else setURL(null);
	}, [image]);

	return (
		<Card>
			{url && <Card.Img variant='top' src={url} />}

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
