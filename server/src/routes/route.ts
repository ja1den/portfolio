// Packages
import { Route } from '@jadiewadie/simple-server';

// Models
import Project from '@models/Project';

// Route
const route: Route = {
	verb: 'get',
	name: '/projects',
	call: async (req, res) => res.send(await Project.find({}))
};

// Export
export default route;
