import React from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

declare namespace FormModal {
	export type Field = { name: string; type: string };
	export type Fields = { [key: string]: Field };

	export type Props<T> = {
		title: string;

		show: boolean;
		onHide?: Function;

		fields: { [P in keyof T]: Field };

		submit: string;
		onSubmit: (
			data: State<T>,
			event: React.MouseEvent<HTMLElement, MouseEvent>
		) => void;

		error?: string;
	};
	export type State<T> = { [P in keyof T]: string };
}

class FormModal<T> extends React.Component<
	FormModal.Props<T>,
	FormModal.State<T>
> {
	constructor(props: FormModal.Props<T>) {
		super(props);

		this.state = Object.keys(props.fields).reduce(
			(state, field) => ({
				...state,
				[field]: ''
			}),
			{}
		) as FormModal.State<T>;
	}

	render() {
		return (
			<Modal size='lg' show={this.props.show} onHide={this.props.onHide}>
				<Modal.Header closeButton>
					<Modal.Title>{this.props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						{Object.entries<FormModal.Field>(this.props.fields).map(
							([name, field]) => (
								<Form.Group key={name} controlId={name}>
									<Form.Label>{field.name}</Form.Label>
									<Form.Control
										type={field.type}
										placeholder={field.name}
										onChange={this.onChange.bind(this)}
									/>
								</Form.Group>
							)
						)}
					</Form>
					{this.props.error && (
						<Alert
							className='mb-0'
							variant='danger'
							children={this.props.error}
							dismissible
						/>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button
						type='submit'
						onClick={event =>
							this.props.onSubmit(this.state, event)
						}>
						{this.props.submit}
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}

	onChange(event: React.ChangeEvent<HTMLInputElement>) {
		this.setState({
			[event.target.id]: event.target.value
		} as FormModal.State<T>);
	}
}

export default FormModal;
