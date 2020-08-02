import React from 'react';
import moment from 'moment';

import { Card, Button, Table } from 'react-bootstrap';
import FirebaseImage from 'components/general/FirebaseImage';

type FileCardProps = {
	file: firebase.storage.Reference;
	onChange?: () => {};
};
type FileCardState = {
	meta?: firebase.storage.FullMetadata;
};

export default class FileCard extends React.Component<
	FileCardProps,
	FileCardState
> {
	async componentDidMount() {
		this.getMeta();
	}

	async componentDidUpdate(props: FileCardProps) {
		if (this.props.file !== props.file) this.getMeta();
	}

	render() {
		const file = this.props.file;
		const meta = this.state?.meta;

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
											? `${(meta.size / 1e6).toFixed(
													2
											  )} MB`
											: 'Loading...'}
									</td>
								</tr>
								<tr>
									<td>Path</td>
									<td>
										{meta ? meta.fullPath : 'Loading...'}
									</td>
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
						<Button variant='danger' block onClick={this.onClick}>
							Delete
						</Button>
					</Card.Body>
				</FirebaseImage>
			</Card>
		);
	}

	getMeta = async () => {
		this.setState({
			meta: await this.props.file.getMetadata()
		});
	};

	onClick = () => {
		this.props.file
			.delete()
			.then(() => this.props.onChange?.())
			.catch(({ message }) => console.error(message));
	};
}
