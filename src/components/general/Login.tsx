import React from 'react';
import { auth } from 'database';

import {
	Modal,
	Form,
	Button,
	Alert,
	Spinner,
	FormControl
} from 'react-bootstrap';

declare namespace Login {
	export type Props = {
		show: boolean;

		onLogin?: Function;
		onClose?: Function;
	};

	export type State = {
		validated: boolean;

		email: string;
		password: string;

		loading: boolean;
		error?: string;
	};
}

class Login extends React.Component<Login.Props, Login.State> {
	constructor(props: Login.Props) {
		super(props);

		this.state = {
			validated: false,
			email: '',
			password: '',
			loading: false
		};

		this.onHide = this.onHide.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	render() {
		return (
			<Modal show={this.props.show} onHide={this.onHide}>
				<Form
					noValidate
					validated={this.state.validated}
					onSubmit={this.onSubmit}>
					<Modal.Header closeButton>
						<Modal.Title>Login</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group controlId='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type='email'
								placeholder='Email'
								onChange={this.onChange}
								required
							/>
							<Form.Control.Feedback type='invalid'>
								Please enter a valid email.
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								placeholder='Password'
								onChange={this.onChange}
								required
							/>
							<Form.Control.Feedback type='invalid'>
								Please enter your password.
							</Form.Control.Feedback>
						</Form.Group>
						<FormControl.Feedback type='invalid'>
							{this.state.error}
						</FormControl.Feedback>
						{this.state.error && (
							<Alert
								className='mb-0'
								variant='danger'
								dismissible
								onClick={this.hideError}>
								{this.state.error}
							</Alert>
						)}
					</Modal.Body>
					<Modal.Footer>
						<Button type='submit' disabled={this.state.loading}>
							{this.state.loading ? (
								<Spinner
									animation='border'
									size='sm'
									role='status'
								/>
							) : (
								'Login'
							)}
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		);
	}

	hideError = () => this.setState({ error: undefined });

	onHide() {
		this.setState({ validated: false, error: undefined });
		this.props.onClose?.();
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

	onSubmit(event: React.MouseEvent<HTMLFormElement, MouseEvent>) {
		const form = event.currentTarget;
		event.preventDefault();

		if (form.checkValidity()) {
			this.setState({ loading: true }, async () => {
				await auth()
					.signInWithEmailAndPassword(
						this.state.email,
						this.state.password
					)
					.then(() => {
						this.setState({
							email: '',
							password: '',
							loading: false,
							validated: false
						});
						this.props.onLogin?.();
					})
					.catch(({ message }) =>
						this.setState({ loading: false, error: message })
					);
			});
		} else {
			event.stopPropagation();
		}

		this.setState({ validated: true });
	}
}

export default Login;
