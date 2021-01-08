import { GetStaticProps } from 'next';
import Head from 'next/head';

import { getPostIDs, getPost, PostData } from 'lib/posts';

import Layout from 'components/Layout';
import DateText from 'components/DateText';

export default function Post({ postData }: { postData: PostData }) {
	return (
		<Layout>
			<Head><title>{postData.name}</title></Head>

			<section className='container post'>
				<header>
					<h3>{postData.name}</h3>
					<DateText date={postData.date} />
				</header>

				<hr />

				<article dangerouslySetInnerHTML={{ __html: postData.content! }} />
			</section>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps<{}, { id: string }> = async function ({ params }) {
	return {
		props: {
			postData: await getPost(params!.id)
		}
	};
};

export async function getStaticPaths() {
	return {
		paths: getPostIDs(),
		fallback: false
	};
}
