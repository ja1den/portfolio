type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
type SnapshotOptions = firebase.firestore.SnapshotOptions;

export class Project {
	constructor(
		readonly name: string,
		readonly desc: string,
		readonly tags: string[]
	) {}
}

export const projectConverter = {
	toFirestore: (project: Project): firebase.firestore.DocumentData => ({
		...project
	}),
	fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions) {
		const { name, desc, tags } = snapshot.data(options)!;
		return new Project(name, desc, tags);
	}
};
