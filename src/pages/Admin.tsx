import React from 'react';
import { db, storage } from 'database';

import { Project, projectConverter } from 'models/Project';
import { PageProps } from 'components/App';

import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';

import {
	Container,
	Nav,
	CardColumns,
	Card,
	Form,
	InputGroup,
	Button
} from 'react-bootstrap';

import ViewProject from 'components/project/ViewProject';
import FileCard from 'components/admin/FileCard';

type AdminPageProps = PageProps & RouteComponentProps;
type AdminPageState = {
	projects: firebase.firestore.QueryDocumentSnapshot<Project>[];
	files: firebase.storage.Reference[];

	file?: File;
	read?: string;
};

class AdminPage extends React.Component<AdminPageProps, AdminPageState> {
	constructor(props: AdminPageProps) {
		super(props);

		this.state = {
			projects: [],
			files: []
		};
	}

	async componentDidMount() {
		db.collection('projects')
			.withConverter(projectConverter)
			.onSnapshot(snapshot =>
				this.setState({
					projects: snapshot.docs
				})
			);

		this.syncFiles();
	}

	render() {
		return (
			<Container className='pt-3'>
				<Nav className='mb-3' variant='tabs'>
					<Nav.Item>
						<Nav.Link
							to={`${this.props.match.url}/cards`}
							as={NavLink}>
							Cards
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link
							to={`${this.props.match.url}/files`}
							as={NavLink}>
							Files
						</Nav.Link>
					</Nav.Item>
				</Nav>
				<Switch>
					<Route path={`${this.props.match.url}/cards`}>
						<CardColumns>
							{this.state.projects.map(project => (
								<ViewProject
									key={project.id}
									project={project.data()}
								/>
							))}
						</CardColumns>
					</Route>

					<Route path={`${this.props.match.url}/files`}>
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
									<Card.Img
										variant='top'
										src={this.state.read}
									/>
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
					</Route>

					<Route path={this.props.match.url} exact>
						<Redirect to={`${this.props.match.url}/cards`} />
					</Route>
				</Switch>
			</Container>
		);
	}

	onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id, files } = event.target;
		switch (id) {
			case 'image':
				const file = files?.[0]!;
				const reader = new FileReader();
				reader.onloadend = () =>
					this.setState({
						file,
						read: reader.result as string
					});
				reader.readAsDataURL(file);

				break;
		}
	};

	onClick = async () => {
		if (this.state.file !== undefined) {
			await storage
				.ref(`images/${this.state.file.name}`)
				.put(this.state.file);
			this.setState({ file: undefined, read: undefined });
			this.syncFiles();
		}
	};

	syncFiles = async () =>
		this.setState({
			files: (await storage.ref('/images').listAll()).items
		});
}

export default withRouter(AdminPage);
