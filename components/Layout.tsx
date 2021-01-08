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
						<h5 className='title'>Jaiden</h5>
					</Link>

					<div className='links'>
						<Link href='/posts'>
							Blog
						</Link>

						<Link href='/projects'>
							Projects
						</Link>

						<Link href='https://github.com/ja1den'>
							GitHub
						</Link>
					</div>
				</section>
			</nav>

			{/* <main className='container'>{children}</main> */}
		</Fragment>
	);
};

export default Layout;
