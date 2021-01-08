import { GetStaticProps } from 'next';
import Link from 'next/link';

import { getPostData, PostData } from 'lib/posts';

import DateText from 'components/DateText';
import Layout from 'components/Layout';

export default function Home({ postData }: { postData: PostData[] }) {
	return (
		<Layout>
			<section>
				<h2>Blog Posts</h2>
				<ul>
					{postData.slice(0, 10).map(({ id, name, date }) => (
						<Link key={id} href={'/posts/' + id}>
							<article>
								<h2>{name}</h2>
								<span>
									<DateText date={date} />
								</span>
							</article>
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
