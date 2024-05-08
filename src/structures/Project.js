const { join, bar } = require('../utils/toolbox');
const { copyFileSync, rm, existsSync, rmdirSync } = require('node:fs')
const configs = require('../utils/configs.json')
const hyperlink = require('hyperlinker')

module.exports.Project = class Project {
	#path;
	#info;

	constructor(path) {
		this.#path = path;

		this.load();
	}

	display(pad = 0) {
		const cleaned = this.cleaned;
		return `\x1b[${91 + +cleaned}m${hyperlink(this.name, this.#path)}${bar(Math.max(0, pad - this.name.length), ' ')} [ ${cleaned ? '  Clean  ' : 'Installed'} ]\x1b[0m`
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
	get cleaned() {
		return !existsSync(join(this.#path, 'node_modules'))
	}
	get path() {
		return this.#path;
	}

	async clean() {
		return new Promise(resolve => {
			if (existsSync(join(this.#path, 'node_modules'))) return rm(join(this.#path, 'node_modules'), { recursive: true, force: true }, resolve)
			resolve()
		})
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
