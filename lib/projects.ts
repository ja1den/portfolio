import { readFileSync } from 'fs';
import { join } from 'path';

import { load } from 'js-yaml';

const targetPath = join(process.cwd(), 'content', 'projects.yml');

export interface ProjectData {
	name: string;
	code: string;
	demo?: string;
	post?: string;
}

export function getProjectData() {
	const { projects } = load(readFileSync(targetPath).toString()) as {
		projects: ProjectData[]
	};

	for (const project of projects) {
		project.name = project.name.charAt(0).toUpperCase() + project.name.slice(1);
	}

	return projects;
}
