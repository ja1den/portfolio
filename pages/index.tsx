import { GetStaticProps } from 'next';
import Link from 'next/link';

import { getProjectData, ProjectData } from 'lib/projects';
import { getPostData, PostData } from 'lib/posts';

import Layout from 'components/Layout';
import Icon from 'components/Icon';
import DateText from 'components/DateText';

type HomeProps = {
	projectData: ProjectData[],
	postData: PostData[]
};

export default function Home({ projectData, postData }: HomeProps) {
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

			<section className='container projects'>
				<h3>Projects</h3>
				{projectData.map(({ name, code, demo, post }) => (
					<article key={name}>
						<h4>{name}</h4>
						<Link href={code}>Code</Link>
						{demo && <Link href={demo}>Demo</Link>}
						{post && <Link href={'/posts/' + post}>Post</Link>}
					</article>
				))}
			</section>

			<section className='container posts'>
				<h3>Blog Posts</h3>
				{postData.slice(0, 10).map(({ id, name, date }) => (
					<article key={id}>
						<Link href={'/posts/' + id}>
							<a><h4>{name}</h4></a>
						</Link>
						<DateText date={date} />
					</article>
				))}
			</section>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async function () {
	return {
		props: {
			projectData: getProjectData(),
			postData: getPostData(),
		},
	};
};
