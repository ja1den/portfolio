import React from 'react';
import { storage } from 'database';

import { CardColumns, Card, Form, InputGroup, Button } from 'react-bootstrap';
import FileCard from 'components/cards/FileCard';

type FileType = firebase.storage.Reference;

type FilesState = {
	files: FileType[];
	file?: File;
	read?: string;
};

export default class Files extends React.Component<{}, FilesState> {
	mounted: boolean = true;

	constructor(props: {}) {
		super(props);

		this.state = {
			files: []
		};
	}

	async componentDidMount() {
		await this.syncFiles();
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	render() {
		return (
			<CardColumns>
				{this.state.files.map(file => (
					<FileCard
						key={file.name}
						file={file}
						onChange={this.syncFiles}
					/>
				))}
				<Card>
					{this.state.read && (
						<Card.Img variant='top' src={this.state.read} />
					)}
					<Card.Body>
						<Form.Group controlId='image'>
							<InputGroup className='mb-3'>
								<Form.File custom>
									<Form.File.Input
										value=''
										accept='image/*'
										onChange={this.onChange}
									/>
									<Form.File.Label>
										{this.state.file?.name ??
											'Select image'}
									</Form.File.Label>
								</Form.File>
							</InputGroup>
						</Form.Group>
						<Button
							variant='success'
							block
							disabled={!this.state.read}
							onClick={this.onClick}>
							Upload
						</Button>
					</Card.Body>
				</Card>
			</CardColumns>
		);
	}

	onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const target = event.target.files?.[0]!;
		const reader = new FileReader();

		reader.onloadend = () =>
			this.setState({
				file: target,
				read: reader.result as string
			});

		reader.readAsDataURL(target);
	};

	onClick = async () => {
		if (this.state.file !== undefined) {
			await storage
				.ref(`images/${this.state.file.name}`)
				.put(this.state.file);

			this.setState({
				file: undefined,
				read: undefined
			});

			this.syncFiles();
		}
	};

	syncFiles = async () =>
		storage
			.ref('/images')
			.listAll()
			.then(res => this.mounted && this.setState({ files: res.items }));
}
