import { GetStaticProps } from 'next';
import Link from 'next/link';

import { getPostData, PostData } from 'lib/posts';

import Layout from 'components/Layout';
import Icon from 'components/Icon';
import DateText from 'components/DateText';

export default function Home({ postData }: { postData: PostData[] }) {
	return (
		<Layout>
			<section className='hero'>
				<div className='hero-icon'>
					<Icon />
				</div>

				<h2>Jaiden Douglas</h2>

				<p className='description'>
					Full Stack Developer
				</p>

				<a className='button' href='https://github.com/ja1den'>
					GitHub
				</a>
			</section>

			{/*
				<section className='container projects'>
					<h3>Projects</h3>
				</section>
			*/}

			<section className='container blog'>
				<h3>Blog Posts</h3>
				<ul>
					{postData.slice(0, 10).map(({ id, name, date }) => (
						<article key={id}>
							<Link href={'/posts/' + id}>
								<a><h4>{name}</h4></a>
							</Link>
							<DateText date={date} />
						</article>
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
