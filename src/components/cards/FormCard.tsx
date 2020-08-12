import React from 'react';
import debounce from 'debounce';

import { firebase, db, storage } from 'database';
import { Project } from 'models/Project';

import { Card, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import Image from 'components/general/Image';

type FileType = firebase.storage.Reference;

type FormCardProps = { id: string; project: Project };
type FormCardState = { files: FileType[]; temp: Partial<Project> };

type FormProjectUpdate = Partial<
	Record<keyof Project, string | string[] | firebase.firestore.FieldValue>
>;

export default class FormCard extends React.Component<
	FormCardProps,
	FormCardState
> {
	mounted: boolean = true;

	constructor(props: FormCardProps) {
		super(props);

		this.state = {
			files: [],
			temp: {}
		};
	}

	async componentDidMount() {
		await this.syncFiles();
	}

	async componentDidUpdate() {
		await this.syncFiles();

		Object.entries(this.state.temp).forEach(([key, value]) => {
			const propValue = this.props.project[key as keyof Project];

			const removeKey = () =>
				this.setState(state => {
					delete state.temp[key as keyof Project];
					return state;
				});

			if (Array.isArray(propValue) && Array.isArray(value))
				if (this.arraysEqual(propValue, value)) removeKey();

			if (propValue === value || (!propValue && !value)) removeKey();
		});
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	render() {
		const name = this.state.temp.name ?? this.props.project.name ?? '';
		const desc = this.state.temp.desc ?? this.props.project.desc ?? '';
		const demo = this.state.temp.demo ?? this.props.project.demo ?? '';
		const code = this.state.temp.code ?? this.props.project.code ?? '';
		const tags = this.state.temp.tags ?? this.props.project.tags ?? [];
		const image = this.state.temp.image ?? this.props.project.image ?? '';

		return (
			<Card>
				<Form onSubmit={e => e.preventDefault()}>
					{this.props.project.image && (
						<Image image={this.props.project.image} prop='src'>
							<Card.Img variant='top' />
						</Image>
					)}

					<Card.Body>
						<Form.Group controlId='name'>
							<Form.Label>Title</Form.Label>
							<Form.Control
								value={name}
								onChange={this.onChange}
								autoComplete='off'
							/>
						</Form.Group>

						<Form.Group controlId='desc'>
							<Form.Label>Description</Form.Label>
							<Form.Control
								as='textarea'
								value={desc}
								onChange={this.onChange}
								autoComplete='off'
							/>
						</Form.Group>

						<Form.Group controlId='demo'>
							<Form.Label>Live demo</Form.Label>
							<Form.Control
								type='url'
								value={demo}
								onChange={this.onChange}
								autoComplete='off'
							/>
						</Form.Group>

						<Form.Group controlId='code'>
							<Form.Label>Source code</Form.Label>
							<Form.Control
								type='url'
								value={code}
								onChange={this.onChange}
								autoComplete='off'
							/>
						</Form.Group>

						<Form.Group controlId='image'>
							<Form.Label>Image</Form.Label>
							<Form.Control
								as='select'
								value={image}
								onChange={this.onChange}>
								<option value=''></option>
								{this.state.files.map(file => (
									<option
										key={file.fullPath}
										value={file.fullPath}>
										{
											file.name.match(
												/(?<name>\w+)(?=.\w+)/g
											)?.[0]!
										}
									</option>
								))}
							</Form.Control>
						</Form.Group>

						<Form.Group className='mb-0'>
							<Form.Label>Delete</Form.Label>
							<Button
								variant='danger'
								block
								onClick={this.onClick}>
								Delete
							</Button>
						</Form.Group>
					</Card.Body>

					<Card.Footer>
						<Form.Label>Tags</Form.Label>
						{tags?.map((tag, i) => (
							<Form.Group key={i}>
								<InputGroup>
									<FormControl
										id='tag'
										value={tag ?? ''}
										onChange={e =>
											this.onChange(e as any, i)
										}
										autoComplete='off'
									/>
									<InputGroup.Append>
										<Button
											variant='danger'
											onClick={() => this.deleteTag(i)}>
											Delete
										</Button>
									</InputGroup.Append>
								</InputGroup>
							</Form.Group>
						))}
						<Button
							variant='success'
							onClick={this.createTag}
							block>
							New Tag
						</Button>
					</Card.Footer>
				</Form>
			</Card>
		);
	}

	onChange = async (
		{ target: { id, value } }: React.ChangeEvent<HTMLInputElement>,
		index?: number
	) => {
		switch (id) {
			case 'name':
				this.setState(state => ({
					temp: { ...state.temp, name: value }
				}));
				break;

			case 'desc':
				this.setState(state => ({
					temp: { ...state.temp, desc: value }
				}));
				break;

			case 'demo':
				this.setState(state => ({
					temp: { ...state.temp, demo: value }
				}));
				break;

			case 'code':
				this.setState(state => ({
					temp: { ...state.temp, code: value }
				}));
				break;

			case 'tag':
				let tags = [
					...(this.state.temp.tags ?? this.props.project.tags ?? [])
				];
				tags[index!] = value;

				this.setState(state => ({
					temp: { ...state.temp, tags }
				}));
				break;

			case 'image':
				this.setState(state => ({
					temp: { ...state.temp, image: value }
				}));
				break;
		}

		await this.saveChanges();
	};

	onClick = async () => {
		await db.collection('projects').doc(this.props.id).delete();
	};

	createTag = async () => {
		const tags = this.state.temp.tags ?? this.props.project.tags ?? [];
		this.setState(
			state => ({
				temp: {
					...state.temp,
					tags: [...tags, '']
				}
			}),
			this.saveChanges
		);
	};

	deleteTag = async (index: number) => {
		if (index !== undefined) {
			const tags = this.state.temp.tags ?? this.props.project.tags ?? [];
			this.setState(
				state => ({
					temp: {
						...state.temp,
						tags: [...tags].filter((_tag, i) => i !== index)
					}
				}),
				this.saveChanges
			);
		}
	};

	syncFiles = async () =>
		storage
			.ref('/images')
			.listAll()
			.then(res => this.mounted && this.setState({ files: res.items }));

	arraysEqual(a1: any[], a2: any[]) {
		if (a1 === a2) return true;
		if (a1 == null || a2 == null) return false;
		if (a1.length !== a2.length) return false;

		for (var i = 0; i < a1.length; ++i) {
			if (a1[i] !== a2[i]) return false;
		}
		return true;
	}

	saveChanges = debounce(async () => {
		const data = Object.entries(this.state.temp).reduce(
			(data: FormProjectUpdate, tuple) => ({
				...data,
				[tuple[0]]:
					tuple[1] && tuple[1]?.length !== 0
						? tuple[1]
						: firebase.firestore.FieldValue.delete()
			}),
			{}
		);

		db.collection('projects')
			.doc(this.props.id)
			.set(data, { merge: true })
			.catch(({ message }) => console.error(message));
	}, 1000);
}
