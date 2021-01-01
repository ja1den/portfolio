import { useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import classNames from 'classnames';

const Layout: React.FC = function ({ children }) {
	const [active, setActive] = useState(false);

	const classes = {
		toggle: classNames('nav-item', 'nav-btn', active && 'active'),
		list: classNames('header-nav', active && 'active'),
	};

	return (
		<div>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<title>Jaiden Douglas</title>
			</Head>

			<nav className="header header-dark header-fixed u-unselectable header-animated">
				<div className="header-brand">
					<div className="nav-item no-hover">
						<Link href="/">
							<a>
								<h6 className="title">Jaiden Douglas</h6>
							</a>
						</Link>
					</div>

					<div
						className={classes.toggle}
						onClick={() => setActive(!active)}
					>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>

				<div className={classes.list}>
					<div className="nav-left">
						<div className="nav-item">
							<Link href="/posts">
								<a>Blog</a>
							</Link>
						</div>

						<div className="nav-item">
							<Link href="/posts">
								<a>Projects</a>
							</Link>
						</div>
					</div>

					<div className="nav-right">
						<div className="nav-item">
							<a href="https://github.com/ja1den">GitHub</a>
						</div>
					</div>
				</div>
			</nav>

			{/* <main>{children}</main> */}
		</div>
	);
};

export default Layout;
