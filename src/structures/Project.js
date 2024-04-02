const { join } = require('../utils/toolbox');
const { copyFileSync, rm, existsSync } = require('node:fs')
const configs = require('../utils/configs.json')

module.exports.Project = class Project {
	#path;
	#info;

	constructor(path) {
		this.#path = path;

		this.load();
	}

	get name() {
		return this.#info.name;
	}
	get version() {
		return this.#info.version;
	}
	get main() {
		return this.#info.main;
	}

	async remove() {
		new Promise((resolve) => {
			if (existsSync(join(this.#path, '.env'))) copyFileSync(join(this.#path, '.env'), join(configs.envDir, `${this.#info.name}-${this.#info.version}.env`))
	
			rm(this.#path, { recursive: true, force: true }, resolve)
		})
	}

	load() {
		this.#info = require(join('..', '..', this.#path, 'package.json'));
	}
};
