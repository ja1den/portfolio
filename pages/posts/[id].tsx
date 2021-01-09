import { useRef, useEffect } from 'react';

import Head from 'next/head';
import { GetStaticProps } from 'next';

import { getPostIDs, getPost, PostData } from 'lib/posts';

import Layout from 'components/Layout';
import DateText from 'components/DateText';

import hljs from 'highlight.js';

export default function Post({ postData }: { postData: PostData }) {
	const rootRef = useRef<HTMLElement>(null);

	useEffect(() => {
		rootRef.current!.querySelectorAll('pre code').forEach((block) => {
			hljs.highlightBlock(block as HTMLElement);
		});

		let replace = [
			['h4', 'h6'],
			['h3', 'h5'],
			['h2', 'h4'],
			['h1', 'h3']
		];

		replace.map(([a, b]) => {
			rootRef.current!.querySelectorAll(a).forEach((element) => {
				element.outerHTML = `<${b}>${element.innerHTML}</${b}>`
			});
		});
	}, []);

	return (
		<Layout>
			<Head><title>{postData.name}</title></Head>

			<section className='container post'>
				<header>
					<h2>{postData.name}</h2>
					<DateText date={postData.date} />
				</header>

				<hr />

				<article ref={rootRef} dangerouslySetInnerHTML={{ __html: postData.content! }} />
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
