import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { Card, Button, Table } from 'react-bootstrap';
import FirebaseImage from 'components/general/FirebaseImage';

type FileType = firebase.storage.Reference;
type MetaType = firebase.storage.FullMetadata;

type FileCardProps = {
	file: FileType;
	onChange?: () => {};
};

export default function FileCard({ file, onChange }: FileCardProps) {
	const [meta, setMeta] = useState<MetaType | null>(null);

	const getMeta = async (file: FileType) => await file.getMetadata();

	const onClick = () => {
		file.delete()
			.then(() => onChange?.())
			.catch(({ message }) => console.error(message));
	};

	useEffect(() => {
		let mounted = true;

		getMeta(file)
			.then(meta => mounted && setMeta(meta))
			.catch(({ message }) => console.error(message));

		return () => {
			mounted = false;
		};
	}, [file]);

	return (
		<Card>
			<FirebaseImage image={file.fullPath}>
				<Card.Img variant='top'></Card.Img>
				<Card.Body>
					<Card.Title>
						{file.name.match(/(?<name>\w+)(?=.\w+)/g)?.[0]!}
					</Card.Title>
					<Table size='sm' borderless>
						<tbody>
							<tr>
								<td>Size</td>
								<td>
									{meta
										? `${(meta.size / 1e6).toFixed(2)} MB`
										: 'Loading...'}
								</td>
							</tr>
							<tr>
								<td>Path</td>
								<td>{meta ? meta.fullPath : 'Loading...'}</td>
							</tr>
							<tr>
								<td>Time</td>
								<td>
									{meta
										? moment(meta.timeCreated).format(
												'M MMM YYYY HH:mm:ss'
										  )
										: 'Loading...'}
								</td>
							</tr>
							<tr>
								<td>Type</td>
								<td>
									{meta ? meta.contentType : 'Loading...'}
								</td>
							</tr>
						</tbody>
					</Table>
					<Button variant='danger' block onClick={onClick}>
						Delete
					</Button>
				</Card.Body>
			</FirebaseImage>
		</Card>
	);
}
