import React from 'react';

import { firebase, db } from 'database';
import { Project } from 'models/Project';

import { Card, Form, InputGroup, FormControl, Button } from 'react-bootstrap';

type FormProjectProps = {
	project: Project;
	id: string;
};
type FormProjectState = {
	project: Project;
};

type FormProjectUpdate = Partial<
	Record<keyof Project, string | string[] | firebase.firestore.FieldValue>
>;

export default class FormProject extends React.Component<
	FormProjectProps,
	FormProjectState
> {
	constructor(props: FormProjectProps) {
		super(props);

		this.state = {
			project: Object.assign({}, props.project)
		};
	}

	render() {
		const { name, desc, demo, code, tags } = this.state.project;
		return (
			<Card>
				<Form onSubmit={e => e.preventDefault()}>
					<Card.Body>
						<Form.Group controlId='name'>
							<Form.Label>Title</Form.Label>
							<Form.Control
								value={name ?? ''}
								onChange={this.onChange}
								autoComplete='off'
							/>
						</Form.Group>

						<Form.Group controlId='desc'>
							<Form.Label>Description</Form.Label>
							<Form.Control
								as='textarea'
								value={desc ?? ''}
								onChange={this.onChange}
								autoComplete='off'
							/>
						</Form.Group>

						<Form.Group controlId='demo'>
							<Form.Label>Live demo</Form.Label>
							<Form.Control
								type='url'
								value={demo ?? ''}
								onChange={this.onChange}
								autoComplete='off'
							/>
						</Form.Group>

						<Form.Group controlId='code'>
							<Form.Label>Source code</Form.Label>
							<Form.Control
								type='url'
								value={code ?? ''}
								onChange={this.onChange}
								autoComplete='off'
							/>
						</Form.Group>
					</Card.Body>

					<Card.Footer>
						<Form.Label>Tags</Form.Label>
						{tags?.map((tag, i) => (
							<Form.Group key={`${this.edits}-${i.toString()}`}>
								<InputGroup>
									<FormControl
										id='tag'
										name={i.toString()}
										value={tag ?? ''}
										onChange={this.onChange}
										autoComplete='off'
									/>
									<InputGroup.Append>
										<Button
											variant='danger'
											onClick={() =>
												this.onClick('delete', i)
											}>
											Delete
										</Button>
									</InputGroup.Append>
								</InputGroup>
							</Form.Group>
						))}
						<Button
							variant='success'
							onClick={() => this.onClick('create')}
							block>
							New Tag
						</Button>
					</Card.Footer>
				</Form>
			</Card>
		);
	}

	edits: number = 0;
	onClick = (name: string, index?: number) => {
		switch (name) {
			case 'create':
				this.setState(
					state => ({
						project: {
							...state.project,
							tags: [...(state.project.tags ?? []), '']
						}
					}),
					this.updateProject
				);
				this.edits++;
				break;

			case 'delete':
				if (index !== undefined)
					this.setState(state => {
						state.project.tags.splice(index, 1);
						return state;
					}, this.updateProject);
				this.edits++;
				break;
		}
	};

	onChange = ({
		target: { id, name, value }
	}: React.ChangeEvent<HTMLInputElement>) => {
		if (['name', 'desc', 'demo', 'code'].includes(id))
			this.setState(
				state => ({
					project: { ...state.project, [id as keyof Project]: value }
				}),
				this.updateProject
			);

		if (id === 'tag')
			this.setState(state => {
				state.project.tags[parseInt(name)] = value;
				return state;
			}, this.updateProject);
	};

	updateProject = this.debounce(() => {
		const data = Object.entries(this.state.project).reduce(
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

	debounce<T extends Function>(func: T, delay: number) {
		let timer: number;
		let call = (...args: any) => {
			clearTimeout(timer);
			timer = window.setTimeout(() => func(...args), delay);
		};
		return (call as unknown) as T;
	}
}
