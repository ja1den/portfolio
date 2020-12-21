import styles from 'styles/components/layout.module.scss';

import Head from 'next/head';

import Header from 'components/header';

const Layout: React.FC = function ({ children }) {
	return (
		<div className={styles.container}>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<title>Jaiden Douglas</title>
			</Head>

			<Header />

			<main className={styles.content}>{children}</main>
		</div>
	);
};

export default Layout;
