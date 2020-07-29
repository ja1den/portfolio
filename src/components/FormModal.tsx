import React from 'react';
import { auth } from 'firestore';

import { Modal, Form, Button, Alert } from 'react-bootstrap';

export type FormModalField = { name: string; type: string };

type FormModalProps<T> = {
	show: boolean;
	onHide?: Function;

	fields: FormModalField[];
	onSubmit: (data: T) => void;
};

type FormModalState = {
	email: string;
	password: string;
	error?: firebase.FirebaseError;
};

export default class FormModal<T> extends React.Component<
	FormModalProps<T>,
	FormModalState
> {
	constructor(props: FormModalProps<T>) {
		super(props);

		this.state = {
			email: '',
			password: ''
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	render() {
		return (
			<Modal size='lg' show={this.props.show} onHide={this.props.onHide}>
				<Modal.Header closeButton>
					<Modal.Title>Login</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type='email'
								placeholder='Email'
								onChange={this.onChange}
							/>
						</Form.Group>
						<Form.Group controlId='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								placeholder='Password'
								onChange={this.onChange}
							/>
						</Form.Group>
					</Form>
					{this.state.error && (
						<Alert
							className='mb-0'
							variant='danger'
							children={this.state.error}
							onClick={() => this.setState({ error: undefined })}
							dismissible
						/>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button type='submit' onClick={this.onSubmit}>
						Login
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}

	onChange(event: React.ChangeEvent<HTMLInputElement>) {
		switch (event.target.id) {
			case 'email':
				this.setState({ email: event.target.value });
				break;
			case 'password':
				this.setState({ password: event.target.value });
				break;
		}
	}

	onSubmit(event: React.MouseEvent<HTMLElement, MouseEvent>) {
		auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.catch(({ message }) => this.setState({ error: message }));
	}
}
