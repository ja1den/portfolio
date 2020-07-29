import React from 'react';

import { Project } from 'models/Project';

import { Card, Badge, Form } from 'react-bootstrap';

declare namespace ProjectCard {
	type Props = { editable: boolean } & Project;

	type State = {};
}

class ProjectCard extends React.Component<
	ProjectCard.Props,
	ProjectCard.State
> {
	render() {
		if (this.props.editable) {
			return (
				<Card border='secondary'>
					<Form>
						<Card.Body>
							<Card.Title>{this.props.name}</Card.Title>
							<Form.Group className='mb-0' controlId='desc'>
								<Form.Control
									value={this.props.desc}></Form.Control>
							</Form.Group>
							{this.props.demo && (
								<Card.Link
									className='d-inline-block pt-3'
									href={this.props.demo}>
									Live demo
								</Card.Link>
							)}
							{this.props.code && (
								<Card.Link href={this.props.code}>
									Source code
								</Card.Link>
							)}
						</Card.Body>
						{this.props.tags && (
							<Card.Footer>
								{this.props.tags.map(tag => (
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
						<Card.Title>{this.props.name}</Card.Title>
						<Card.Text>{this.props.desc}</Card.Text>
						{this.props.demo && (
							<Card.Link href={this.props.demo}>
								Live demo
							</Card.Link>
						)}
						{this.props.code && (
							<Card.Link href={this.props.code}>
								Source code
							</Card.Link>
						)}
					</Card.Body>
					{this.props.tags && (
						<Card.Footer>
							{this.props.tags.map(tag => (
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
}

export default ProjectCard;
