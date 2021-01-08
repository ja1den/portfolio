import { Fragment } from 'react';

import Head from 'next/head';
import Link from 'next/link';

const Layout: React.FC = function ({ children }) {
	return (
		<Fragment>
			<Head>
				<title>Jaiden Douglas</title>

				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta charSet='utf-8' />

				<link rel='icon' type='image/x-icon' href='/favicon.ico' />
			</Head>

			<nav className='navigation'>
				<section className='container'>
					<Link href='/'>
						<h5 className='title'>Jaiden Douglas</h5>
					</Link>

					<a href='https://github.com/ja1den'>
						GitHub
					</a>
				</section>
			</nav>

			<main>{children}</main>
		</Fragment>
	);
};

export default Layout;
