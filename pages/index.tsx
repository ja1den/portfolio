import { GetStaticProps } from 'next';
import Link from 'next/link';

import { getPostData, PostData } from 'lib/posts';

import DateText from 'components/DateText';
import Layout from 'components/Layout';

import styles from 'styles/pages/index.module.scss';

export default function Home({ postData }: { postData: PostData[] }) {
	return (
		<Layout>
			<section>
				<h1 className={styles.heading}>Blog Posts</h1>
				<ul className={styles.list}>
					{postData.slice(0, 10).map(({ id, name, date }) => (
						<Link key={id} href={'/posts/' + id}>
							<li className={styles.item}>
								<h2>{name}</h2>
								<span>
									<DateText date={date} />
								</span>
							</li>
						</Link>
					))}
				</ul>
			</section>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async function () {
	return {
		props: {
			postData: getPostData(),
		},
	};
};
