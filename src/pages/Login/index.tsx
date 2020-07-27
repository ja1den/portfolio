import React from 'react';
import { auth } from 'firestore';

import { StyledFirebaseAuth } from 'react-firebaseui';
import { Container, Form, Button } from 'react-bootstrap';

type LoginPageState = {
	user: firebase.User | null;
};

export default class LoginPage extends React.Component<{}, LoginPageState> {
	unsubscribe?: Function;
	uiConfig: firebaseui.auth.Config = {
		signInFlow: 'popup',
		signInOptions: [auth.GoogleAuthProvider.PROVIDER_ID],
		callbacks: {
			signInSuccessWithAuthResult: () =>
				void console.log(this.state) ?? false
		}
	};

	constructor(props: {}) {
		super(props);

		this.state = {
			user: null
		};
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
					<StyledFirebaseAuth
						uiConfig={this.uiConfig}
						firebaseAuth={auth()}
					/>
				</Container>
			);
		}
	}
}
