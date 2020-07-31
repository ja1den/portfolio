import React, { Fragment } from 'react';
import { firebase, db } from 'database';

import { Project } from 'models/Project';

import { Card, Badge, Form } from 'react-bootstrap';

declare namespace ProjectCard {
	type Props = { id: string; project: Project; editable: boolean };
	type State = Project;

	type Update = Partial<
		Record<keyof Project, string | firebase.firestore.FieldValue>
	>;
}

class ProjectCard extends React.Component<
	ProjectCard.Props,
	ProjectCard.State
> {
	constructor(props: ProjectCard.Props) {
		super(props);
		this.state = props.project;

		this.onChange = this.onChange.bind(this);
		this.debounce = this.debounce.bind(this);
	}

	render() {
		const insertNewlines = (str: string) => {
			const split = str.split('\n');
			return split.map((line, i) => (
				<Fragment key={i}>
					{line}
					{i < split.length - 1 && <br />}
				</Fragment>
			));
		};

		if (this.props.editable) {
			return (
				<Card>
					<Form onSubmit={e => e.preventDefault()}>
						<Card.Body>
							<Form.Group controlId='name'>
								<Form.Label>Title</Form.Label>
								<Form.Control
									value={this.state.name ?? ''}
									onChange={this.onChange}
									autoComplete='off'
								/>
							</Form.Group>

							<Form.Group controlId='desc'>
								<Form.Label>Description</Form.Label>
								<Form.Control
									as='textarea'
									value={this.state.desc ?? ''}
									onChange={this.onChange}
									autoComplete='off'
								/>
							</Form.Group>

							<Form.Group controlId='demo'>
								<Form.Label>Live demo</Form.Label>
								<Form.Control
									type='url'
									value={this.state.demo ?? ''}
									onChange={this.onChange}
									autoComplete='off'
								/>
							</Form.Group>

							<Form.Group controlId='code'>
								<Form.Label>Source code</Form.Label>
								<Form.Control
									type='url'
									value={this.state.code ?? ''}
									onChange={this.onChange}
									autoComplete='off'
								/>
							</Form.Group>
						</Card.Body>
						{this.props.project.tags && (
							<Card.Footer>
								{this.props.project.tags.map(tag => (
									<Badge
										key={tag}
										className='mr-2'
										variant='dark'>
										{tag}
									</Badge>
								))}
							</Card.Footer>
						)}
					</Form>
				</Card>
			);
		} else {
			return (
				<Card>
					<Card.Body>
						{this.props.project.name && (
							<Card.Title>{this.props.project.name}</Card.Title>
						)}

						{this.props.project.desc && (
							<Card.Text>
								{insertNewlines(this.props.project.desc)}
							</Card.Text>
						)}

						{this.props.project.demo && (
							<Card.Link href={this.props.project.demo}>
								Live demo
							</Card.Link>
						)}

						{this.props.project.code && (
							<Card.Link href={this.props.project.code}>
								Source code
							</Card.Link>
						)}
					</Card.Body>
					{this.props.project.tags && (
						<Card.Footer>
							{this.props.project.tags.map(tag => (
								<Badge
									key={tag}
									className='mr-2'
									variant='dark'>
									{tag}
								</Badge>
							))}
						</Card.Footer>
					)}
				</Card>
			);
		}
	}

	updateProject = this.debounce((data: ProjectCard.Update) => {
		db.collection('projects').doc(this.props.id).set(data, { merge: true });
	}, 1000);

	async onChange({
		target: { id, value }
	}: React.ChangeEvent<HTMLInputElement>) {
		const updateField = (field: keyof Project, value: string) => {
			this.setState({ ...this.state, [field]: value });
			this.updateProject({
				[field]: value ? value : firebase.firestore.FieldValue.delete()
			});
		};

		if (['name', 'desc', 'demo', 'code'].includes(id))
			updateField(id as keyof Project, value);
	}

	debounce<T extends Function>(func: T, delay: number) {
		let timer: number;
		let call = (...args: any) => {
			clearTimeout(timer);
			timer = window.setTimeout(() => func(...args), delay);
		};
		return (call as unknown) as T;
	}
}

export default ProjectCard;
