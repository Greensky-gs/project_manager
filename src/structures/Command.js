const { Handler } = require('./Handler');
const { Project } = require('./Project');

class Command {
	/**
	 * @type {({ arguments: string[]; projects: Project[]; handler: Handler }) => string}
	 */
	#callback;
	/**
	 * @type {{ name: string; description: string; aliases: string[]; requiredArguments: number }}
	 */
	#info;

	/**
	 *
	 * @param {{ name: string; description: string; aliases?: string[]; requiredArguments: number }} options
	 */
	constructor(options) {
		this.#info = {
			...options,
			aliases: (options?.aliases ?? []).map((x) => x.toLowerCase()),
			name: options.name?.toLowerCase(),
			requiredArguments:
				options?.requiredArguments ??
				parseInt(options?.requiredArguments),
		};
	}

	/**
	 * @param {(opts: { arguments: string[]; projects: Project[]; handler: Handler }) => string} callback
	 * @returns
	 */
	setRun(callback) {
		if (callback instanceof Function) this.#callback = callback;
		return this;
	}

	get meta() {
		return this.#info;
	}
	get run() {
		return this.#callback;
	}
}

module.exports = Command;
