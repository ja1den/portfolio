import React from 'react';

export default class ProjectPage extends React.Component {
	async componentDidMount() {
		fetch('/api/route').then(async res => console.log(await res.text()));
	}

	render() {
		return <>AAA</>;
	}
}
