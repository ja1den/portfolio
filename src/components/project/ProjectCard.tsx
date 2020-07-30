import React from 'react';
import { db } from 'database';

import { Project } from 'models/Project';

import { Card, Badge, Form } from 'react-bootstrap';

declare namespace ProjectCard {
	type Props = { id: string; project: Project; editable: boolean };
	type State = Project;
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
		if (this.props.editable) {
			return (
				<Card border='secondary'>
					<Form>
						<Card.Body>
							<Card.Title>{this.props.project.name}</Card.Title>
							<Form.Group className='mb-0' controlId='desc'>
								<Form.Control
									type='textarea'
									value={this.state.desc}
									onChange={this.onChange}
									autoComplete='off'
								/>
							</Form.Group>
							{this.props.project.demo && (
								<Card.Link
									className='d-inline-block pt-3'
									href={this.props.project.demo}>
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
					</Form>
				</Card>
			);
		} else {
			return (
				<Card>
					<Card.Body>
						<Card.Title>{this.props.project.name}</Card.Title>
						<Card.Text>{this.props.project.desc}</Card.Text>
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

	updateProject = this.debounce((data: Partial<Project>) => {
		db.collection('projects').doc(this.props.id).set(data, { merge: true });
	}, 1000);

	async onChange({ target }: React.ChangeEvent<HTMLInputElement>) {
		switch (target.id) {
			case 'desc':
				this.setState({ desc: target.value });
				this.updateProject({ desc: target.value });
				break;
		}
	}

	debounce(func: Function, delay: number) {
		let timer: number;
		return (...args: any[]) => {
			clearTimeout(timer);
			timer = window.setTimeout(() => func.bind(this)(...args), delay);
		};
	}
}

export default ProjectCard;
