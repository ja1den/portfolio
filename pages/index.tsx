import styles from 'styles/pages/index.module.scss';

import { PostData, getPostData } from '../lib/posts';
import { GetStaticProps } from 'next';

import Layout from 'components/Layout';
import Date from 'components/DateText';

export default function Home({ postData }: { postData: PostData[] }) {
	return (
		<Layout>
			<section>
				<h1 className={styles.heading}>Blog Posts</h1>
				<ul className={styles.list}>
					{postData.slice(0, 10).map(({ id, name, date }) => (
						<li key={id} className={styles.item}>
							<h2>{name}</h2>
							<span>
								<Date date={date} />
							</span>
						</li>
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
