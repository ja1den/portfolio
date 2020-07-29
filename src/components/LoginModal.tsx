import React from 'react';
import { auth } from 'firestore';

import { Modal, Form, Button, Alert } from 'react-bootstrap';

type LoginModalProps = {
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	setUser: (user: firebase.User | null) => void;
};
type LoginModalState = {
	email: string;
	password: string;
	error?: firebase.FirebaseError;
};

export default class LoginModal extends React.Component<
	LoginModalProps,
	LoginModalState
> {
	unsubscribe?: Function;

	constructor(props: LoginModalProps) {
		super(props);

		this.state = {
			email: '',
			password: ''
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		this.unsubscribe = auth().onAuthStateChanged(user =>
			this.props.setUser(user)
		);
	}

	componentWillUnmount() {
		this.unsubscribe?.();
	}

	render() {
		return (
			<Modal
				size='lg'
				show={this.props.show}
				onHide={() => this.props.setShow(false)}>
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
