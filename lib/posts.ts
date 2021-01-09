// Import

import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

import matter from 'gray-matter';
import remark from 'remark';

import html from 'remark-html';
import gfm from 'remark-gfm';

// Global

const targetDirectory = join(process.cwd(), 'content', 'posts');

export interface PostData {
	name: string;
	date: string;

	id: string;

	content?: string;
}

// Export

export function getPostData() {
	const names = readdirSync(targetDirectory);

	const data = names.map((name) => {
		const content = readFileSync(join(targetDirectory, name), 'utf8');
		const parsed = matter(content);

		return {
			id: name.replace(/\.md$/, ''),
			...parsed.data
		} as PostData;
	});

	return data.sort((a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	});
}

export function getPostIDs() {
	return readdirSync(targetDirectory).map((name) => {
		return {
			params: {
				id: name.replace(/\.md$/, ''),
			}
		};
	});
}

export async function getPost(id: string) {
	const content = readFileSync(join(targetDirectory, `${id}.md`), 'utf8');
	const parsed = matter(content);

	parsed.content = (
		await remark().use(html).use(gfm).process(parsed.content)
	).toString();

	return {
		id,
		content: parsed.content,
		...parsed.data
	} as PostData;
}
