import React, { useEffect } from 'react';
import hljs from 'highlight.js';

import { GetStaticProps } from 'next';
import Head from 'next/head';

import { getPostIDs, getPost, PostData } from 'lib/posts';

import DateText from 'components/DateText';
import Layout from 'components/Layout';

export default function Post({ postData }: { postData: PostData }) {
	useEffect(() => {
		hljs.initHighlighting();
	}, []);

	return (
		<Layout>
			<Head>
				<title>{postData.name}</title>
			</Head>

			<section className="row">
				<div className="content col-6 offset-center">
					<header>
						<h2>{postData.name}</h2>
						<DateText date={postData.date} />
					</header>

					<hr />

					<div dangerouslySetInnerHTML={{ __html: postData.content! }} />
				</div>
			</section>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async function ({ params }) {
	return {
		props: {
			postData: await getPost(params!.id as string),
		},
	};
};

export async function getStaticPaths() {
	return {
		paths: getPostIDs(),
		fallback: false,
	};
}
