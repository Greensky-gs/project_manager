module.exports.join = (...paths) => paths.join('/');
module.exports.bar = (size, char = '=') => new Array(size).fill(char).join('');
module.exports.center = (text) => {
	const mid = Math.round(text.length / 2);
	const sep = new Array(Math.round(process.stdout.columns / 2) - mid).fill(' ').join('');
	return `${sep}${text}${sep}`
}
module.exports.getArgument = (arguments, name, defaultValue) => {
	const index = arguments.findIndex(x => x === name);
	if (index === -1) return defaultValue;
	return arguments[index + 1] ?? defaultValue;
}