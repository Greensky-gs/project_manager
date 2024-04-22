const { readdirSync } = require('node:fs');
const Command = require('./Command');
const { Project } = require('./Project');

class Handler {
	/**
	 * @type {Command[]}
	 */
	#commands = [];
	/**
	 * @type {Project[]}
	 */
	#projects;
	/**
	 * @type {(value: any) => void}
	 */
	#resolver;

	constructor(projects) {
		this.#projects = projects;

		this.start();
	}

	start() {
		readdirSync('./src/commands').forEach((fileName) => {
			const file = require(`../commands/${fileName}`);
			const command = file?.default ?? file;

			this.#commands.push(command);
		});

		this.intro();
	}
	async waitInput() {
		return new Promise((resolve) => {
			this.#resolver = resolve;
		});
	}
	intro() {
		process.stdout.write('> ');
		process.stdin.on('data', (data) => {
			const input = data.toString().slice(0, data.toString().length - 2);

			if (!!this.#resolver) {
				this.#resolver(input);
				this.#resolver = undefined;
				return;
			}

			const commands = input.split(/ *&& */g)
            commands.forEach((input, index, array) => {
				const args = input.split(/ +/g);
				const commandName = args.shift().toLowerCase();

				const cmd = this.findCommand(commandName)[0];
                if (!cmd) {
                    console.log('No command found');
                    process.stdout.write('> ');
                    return;
                }

                if (args.length < cmd.meta.requiredArguments) {
                    console.log(
                        `${cmd.meta.name} required ${cmd.meta.requiredArguments}, but ${args.length} were given`
                    );
                    process.stdout.write('> ');
                    return;
                }

                this.execCommand(commandName, {
                    projects: this.#projects,
                    arguments: args,
                    handler: this,
                }, index === array.length - 1);
            });
		});
	}

	findCommand(name) {
		return this.#commands.filter(
			(x) =>
				x.meta.name === name.toLowerCase() ||
				x.meta.aliases.includes(name.toLowerCase())
		);
	}
	async execCommand(name, args, last = false) {
		const cmd = this.findCommand(name)[0];
		if (!cmd) return;

		const res = await cmd.run(args);
		if (!!res) console.log(res);

	 	if (last) process.stdout.write('> ');
	}
	get commands() {
		return this.#commands;
	}

	get projects() {
		return this.#projects;
	}
}

module.exports.Handler = Handler;
