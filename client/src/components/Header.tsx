import React from 'react';
import { NavLink } from 'react-router-dom';

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export type HeaderLink = { name: string; url: string };
export type HeaderGroup = { name: string; url: string; links: HeaderLink[] };

type HeaderProps = { title: string; entries: (HeaderLink | HeaderGroup)[] };
type HeaderState = { active: boolean };

export default class Header extends React.Component<HeaderProps, HeaderState> {
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
							(entry: HeaderLink | HeaderGroup) =>
								isHeaderGroup(entry) ? (
									<NavDropdown
										key={entry.name}
										title={entry.name}
										id={entry.name}>
										{entry.links.map(link => (
											<NavDropdown.Item
												key={link.name}
												to={entry.url + link.url}
												as={NavLink}
												children={link.name}
											/>
										))}
									</NavDropdown>
								) : (
									<Nav.Link
										key={entry.name}
										to={entry.url}
										as={NavLink}
										children={entry.name}
									/>
								)
						)}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

function isHeaderGroup(link: HeaderLink | HeaderGroup): link is HeaderGroup {
	return (link as HeaderGroup).links !== undefined;
}
