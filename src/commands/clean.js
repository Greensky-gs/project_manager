const Command = require('../structures/Command');

module.exports = new Command({
	name: 'clean',
	description: 'Remove node_modules folder from a project',
	requiredArguments: 1,
}).setRun(async ({ arguments, handler }) => {
	const projects = arguments[0] === '*' ? handler.projects : arguments
		.map((x) =>
			handler.projects.find(
				(y) => y.name.toLowerCase() === x.toLowerCase()
			)
		)
		.filter((x) => !!x);
	if (!projects.length) return 'No project found';

	const skip = arguments.includes('-y');
	if (!skip)
		process.stdout.write(
			`Are you sure to clean ${projects.length} projects ? [y/n]\n>> `
		);
	const rep = skip ? 'y' : await handler.waitInput();

	if (rep?.toLowerCase() === 'y') {
		const map = projects.map(async (project) => {
			return project.clean();
		});
		await Promise.all(map)

		return `${projects.map((x) => x.name).join(', ')} have been cleaned`;
	} else {
		return 'canceled';
	}
});
