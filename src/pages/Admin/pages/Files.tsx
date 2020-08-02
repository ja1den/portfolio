import React, { useState, useEffect } from 'react';
import { storage } from 'database';

import { CardColumns, Card, Form, InputGroup, Button } from 'react-bootstrap';
import FileCard from 'components/cards/FileCard';

type FileType = firebase.storage.Reference;

export default function Files() {
	const [files, setFiles] = useState<FileType[]>([]);

	const [file, setFile] = useState<File | null>(null);
	const [read, setRead] = useState<string | null>(null);

	const syncFiles = async () => {
		setFiles((await storage.ref('/images').listAll()).items);
	};

	const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const target = event.target.files?.[0]!;
		const reader = new FileReader();

		reader.onloadend = () => {
			setFile(target);
			setRead(reader.result as string);
		};

		reader.readAsDataURL(target);
	};

	const onClick = async () => {
		if (file !== null) {
			await storage.ref(`images/${file.name}`).put(file);

			setFile(null);
			setRead(null);

			syncFiles();
		}
	};

	useEffect(() => void syncFiles(), []);

	return (
		<CardColumns>
			{files.map(file => (
				<FileCard key={file.name} file={file} onChange={syncFiles} />
			))}
			<Card>
				{read && <Card.Img variant='top' src={read} />}
				<Card.Body>
					<Form.Group controlId='image'>
						<InputGroup className='mb-3'>
							<Form.File custom>
								<Form.File.Input
									value=''
									accept='image/*'
									onChange={onChange}
								/>
								<Form.File.Label>
									{file?.name ?? 'Select image'}
								</Form.File.Label>
							</Form.File>
						</InputGroup>
					</Form.Group>
					<Button
						variant='success'
						block
						disabled={!read}
						onClick={onClick}>
						Upload
					</Button>
				</Card.Body>
			</Card>
		</CardColumns>
	);
}
