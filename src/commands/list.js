const Command = require('../structures/Command');
const { bar } = require('../utils/toolbox');

module.exports = new Command({
	name: 'ls',
	description: 'Displays list of projects',
	requiredArguments: 0,
	aliases: ['liste', 'list'],
}).setRun(({ projects, arguments }) => {
	const longestDisplay =
		projects.sort((a, b) => b.display() - a.display())[0]
			.display().length + Math.round(process.stdout.columns * 0.3);
	const longestName = projects.map(x => x.name).sort((a, b) => b.length - a.length)[0].length

	return (
		projects
			.map(
				(x) =>
					`${bar(Math.round(process.stdout.columns * 0.08), ' ')}${
						x.display(longestName)
					}${new Array(Math.round(longestDisplay * .7))
						.fill(' ')
						.join('')}v${x.version}`
			)
			.join('\n') +
		`\n\nTotal: ${projects.length.toLocaleString()} project(s)`
	);
});
