import React from 'react';
import { auth } from 'firestore';

import { Container, Form, Button } from 'react-bootstrap';

type LoginPageState = {
	email: string;
	password: string;

	user: firebase.User | null;
};

export default class LoginPage extends React.Component<{}, LoginPageState> {
	unsubscribe?: Function;

	constructor(props: {}) {
		super(props);

		this.state = {
			email: '',
			password: '',
			user: null
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		this.unsubscribe = auth().onAuthStateChanged(user =>
			this.setState({ user })
		);
	}

	componentWillUnmount() {
		this.unsubscribe?.();
	}

	render() {
		if (this.state.user) {
			return <Button onClick={() => auth().signOut()}>Log out</Button>;
		} else {
			return (
				<Container className='pt-3'>
					<Form>
						<Form.Group controlId='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter email'
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
						<Button type='submit' onClick={this.onSubmit}>
							Login
						</Button>
					</Form>
				</Container>
			);
		}
	}

	onChange(event: React.ChangeEvent<HTMLInputElement>) {
		/*
		const name = event.target.name as 'email' | 'password';
		const value = event.target.value;
		this.setState({ [name]: value });
		*/
	}

	onSubmit(event: React.MouseEvent<HTMLElement, MouseEvent>) {}
}
