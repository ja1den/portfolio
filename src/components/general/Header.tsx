import React from 'react';

import { NavLink } from 'react-router-dom';

import { Navbar, Nav, NavDropdown, Form, Button } from 'react-bootstrap';

declare namespace Header {
	export type Link = {
		type: 'link';
		name: string;
		url: string;
		auth?: boolean;
	};

	export type Group = {
		type: 'group';
		name: string;
		url: string;
		links: Link[];
	};

	export type Button = {
		name: string;
		call: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	};
}

export type HeaderProps = {
	title: string;
	entries: (Header.Link | Header.Group)[];
	buttons?: Header.Button[];
	auth?: boolean;
};
export type HeaderState = { active: boolean };

class Header extends React.Component<HeaderProps, HeaderState> {
	constructor(props: HeaderProps) {
		super(props);

		this.state = {
			active: false
		};
	}

	render() {
		return (
			<Navbar collapseOnSelect expand='lg' bg='light' variant='light'>
				<Navbar.Brand children={this.props.title} />
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='responsive-navbar-nav'>
					<Nav className='mr-auto'>
						{this.props.entries.map(
							(entry: Header.Link | Header.Group) =>
								entry.type === 'group' ? (
									<NavDropdown
										key={entry.name}
										title={entry.name}
										id={entry.name}>
										{entry.links.map(link =>
											this.renderLink(link, entry)
										)}
									</NavDropdown>
								) : (
									this.renderLink(entry)
								)
						)}
					</Nav>
					{Array.isArray(this.props.buttons) && (
						<Form className='my-2 my-lg-0' inline>
							{this.props.buttons.map(button => (
								<Button
									key={button.name}
									variant='outline-primary'
									onClick={button.call}
									children={button.name}
								/>
							))}
						</Form>
					)}
				</Navbar.Collapse>
			</Navbar>
		);
	}

	renderLink(link: Header.Link, group?: Header.Group) {
		if (process.env.NODE_ENV !== 'development')
			if (link?.auth === true && this.props.auth === false) return;

		return group ? (
			<NavDropdown.Item
				key={link.name}
				to={group.url + link.url}
				as={NavLink}
				children={link.name}
			/>
		) : (
			<Nav.Link
				key={link.name}
				to={link.url}
				as={NavLink}
				children={link.name}
			/>
		);
	}
}

export default Header;
