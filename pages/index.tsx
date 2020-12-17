import Head from 'next/head';

import styles from 'styles/pages/index.module.scss';

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Jaiden Douglas</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.content}>
				This project was bootstrapped with{' '}
				<a href="https://nextjs.org/docs/api-reference/create-next-app">
					create-next-app
				</a>
				.
			</main>
		</div>
	);
}
