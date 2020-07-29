import React from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

declare namespace LoginModal {
	export type Props = {
		show: boolean;
		onHide?: Function;

		onSubmit: (email: string, password: string) => void;
		error?: string;
	};
	export type State = { email: string; password: string; error: boolean };
}

class LoginModal extends React.Component<LoginModal.Props, LoginModal.State> {
	constructor(props: LoginModal.Props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			error: false
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
					{this.state.error && this.props.error && (
						<Alert
							className='mb-0'
							variant='danger'
							children={this.props.error}
							dismissible
							onClick={() => this.setState({ error: false })}
						/>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button
						type='submit'
						onClick={() => {
							this.setState({ error: true });
							this.onSubmit();
						}}
						children='Login'
					/>
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

	onSubmit() {
		this.props.onSubmit(this.state.email, this.state.password);
	}
}

export default LoginModal;
