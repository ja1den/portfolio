import React from 'react';
import { Modal, Form, Button, Alert, Spinner } from 'react-bootstrap';

declare namespace LoginModal {
	export type Props = {
		show: boolean;
		onHide?: Function;

		onSubmit: (email: string, password: string) => Promise<void>;
		error?: string;
	};
	export type State = {
		email: string;
		password: string;

		loading: boolean;
		error: boolean;
	};
}

class LoginModal extends React.Component<LoginModal.Props, LoginModal.State> {
	constructor(props: LoginModal.Props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			loading: false,
			error: true
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	render() {
		return (
			<Modal show={this.props.show} onHide={this.props.onHide}>
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
						onClick={this.onSubmit}
						disabled={this.state.loading}>
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

	async onSubmit() {
		this.setState({ loading: true });
		await this.props
			.onSubmit(this.state.email, this.state.password)
			.catch(() => {});
		this.setState({ email: '', password: '', loading: false, error: true });
	}
}

export default LoginModal;
