import React from 'react';
import { firestore } from 'firestore';

export default class ProjectPage extends React.Component {
	async componentDidMount() {
		firestore.collection('projects').onSnapshot(snapshot => {
			snapshot.forEach(doc => console.log(doc.data()));
		});
	}

	render() {
		return <>AAA</>;
	}
}
