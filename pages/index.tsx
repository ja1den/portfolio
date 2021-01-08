import { GetStaticProps } from 'next';
import Link from 'next/link';

import { getPostData, PostData } from 'lib/posts';

import DateText from 'components/DateText';
import Layout from 'components/Layout';
import Icon from 'components/Icon';

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

			{
				/*

				<section className='blog'>
					<h2>Blog Posts</h2>
					<ul>
						{postData.slice(0, 10).map(({ id, name, date }) => (
							<article key={id}>
								<Link href={'/posts/' + id}>
									<h3>{name}</h3>
								</Link>
								<span>
									<DateText date={date} />
								</span>
							</article>
						))}
					</ul>
				</section>

				*/
			}
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
