import mongoose, { Schema } from 'mongoose';

interface Project extends mongoose.Document {
	name: string;
	desc: string;
}

const Project = mongoose.model<Project>(
	'Project',
	new Schema({
		name: { type: String, required: true },
		desc: { type: String, required: true },
		tags: [String]
	})
);

export default Project;
