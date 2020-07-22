// Packages
import { Route } from '@jadiewadie/simple-server';

// Route
const route: Route = {
	verb: 'get',
	name: '/route',
	call: (req, res) => res.send('Hello!')
};

// Export
export default route;
