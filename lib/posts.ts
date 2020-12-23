import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

import matter from 'gray-matter';

export interface PostData {
	id: string;
	name: string;
	date: string;
}

export function getPostData() {
	const target = join(process.cwd(), 'posts');
	const names = readdirSync(target);

	const data = names.map((name) => {
		const id = name.replace(/\.md$/, '');
		const path = join(target, name);

		const contents = readFileSync(path, 'utf8');
		const meta = matter(contents);

		return {
			id,
			...meta.data,
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
