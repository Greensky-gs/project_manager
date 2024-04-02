const Command = require('../structures/Command');
const { bar } = require('../utils/toolbox');

module.exports = new Command({
	name: 'ls',
	description: 'Displays list of projects',
	requiredArguments: 0,
	aliases: ['liste', 'list'],
}).setRun(({ projects, arguments }) => {
	const longestName =
		projects.map((x) => x.name).sort((a, b) => b.length - a.length)[0]
			.length + Math.round(process.stdout.columns * 0.3);

	return (
		projects
			.map(
				(x) =>
					`${bar(Math.round(process.stdout.columns * 0.08), ' ')}${
						x.name
					}${new Array(longestName - x.name.length)
						.fill(' ')
						.join('')}v${x.version}`
			)
			.join('\n') +
		`\n\nTotal: ${projects.length.toLocaleString()} project(s)`
	);
});
