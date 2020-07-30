import React from 'react';
import { firestore } from 'firestore';

import { Project, projectConverter } from 'models/Project';

import { Card, Badge, Form } from 'react-bootstrap';

declare namespace ProjectCard {
	type Props = { id: string; project: Project; editable: boolean };
	type State = { project: Project };
}

class ProjectCard extends React.Component<
	ProjectCard.Props,
	ProjectCard.State
> {
	constructor(props: ProjectCard.Props) {
		super(props);
		this.state = {
			project: props.project
		};

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
									value={this.state.project.desc}
									onChange={this.onChange}
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

	async onChange(event: React.ChangeEvent<HTMLInputElement>) {
		const { id, value } = event.target;

		switch (id) {
			case 'desc':
				this.setState(state => ({
					project: {
						...state.project,
						desc: value
					}
				}));

				this.debounce((value: string) => {
					console.log(`Debounce: ${value}`);
				}, 1000)(value);

				console.log(this.props.id);
				console.log(
					(
						await firestore
							.collection('projects')
							.withConverter(projectConverter)
							.doc(this.props.id)
							.get()
					).data()
				);

				/*
				let timer: number;
				this.onDebouncedChange = event => {
					clearTimeout(timer);
					timer = window.setTimeout(() => this.onChange(event), 1000);
				};
				*/
				break;
		}
	}

	debounce(func: Function, delay: number) {
		let timer: number;
		return (...args: any[]) => {
			clearTimeout(timer);
			timer = window.setTimeout(func.apply(this, ...args), delay);
		};
	}
}

export default ProjectCard;
