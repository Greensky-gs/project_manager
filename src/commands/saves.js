const Command = require('../structures/Command');
const { readdirSync } = require('node:fs');
const { join, bar } = require('../utils/toolbox');

module.exports = new Command({
	name: 'saves',
	description: 'Show saves',
	requiredArguments: 0,
}).setRun(() => {
	const saves = readdirSync(join('.', 'envs'));

	return (
		saves.map((x) => `${bar(20, ' ')}${x}`).join('\n') +
		`\n\n${saves.length} saves`
	);
});
