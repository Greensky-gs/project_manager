const Command = require('../structures/Command');
const { bar } = require('../utils/toolbox');

module.exports = new Command({
	name: 'help',
	description: 'Help command',
	requiredArguments: 0,
}).setRun(({ handler }) => {
	const longestName =
		handler.commands
			.map((x) => x.meta.name)
			.sort((a, b) => b.length - a.length)[0].length +
		Math.round(process.stdout.columns * 0.2);

	return handler.commands
		.map(
			(x) =>
				`${bar(Math.round(process.stdout.columns * 0.08), ' ')}${
					x.meta.name
				}${new Array(longestName - x.meta.name.length)
					.fill(' ')
					.join('')}${x.meta.description}`
		)
		.join('\n');
});
