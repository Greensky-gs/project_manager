const { exec } = require('child_process');
const {
	mkdirSync,
	existsSync,
	readdirSync,
	statSync,
} = require('node:fs');
const configs = require('./utils/configs.json');
const { Project } = require('./structures/Project');
const { join, bar, center } = require('./utils/toolbox');
const { Handler } = require('./structures/Handler');

if (!existsSync(configs.envDir)) mkdirSync(configs.envDir);

const localDirname = __dirname.split('\\').reverse()[1];
const dirs = readdirSync('../').filter((x) => x !== localDirname);

const isProject = (directoryPath) => {
	return existsSync(join(directoryPath, 'package.json'));
};

const excludedDirectories = ['node_modules', '.git'];
const projectsList = [];

const readCategory = (path) => {
	if (!statSync(path).isDirectory()) return;
	const projects = readdirSync(path).filter(
		(x) => !excludedDirectories.includes(x)
	);

	if (isProject(path)) {
		projectsList.push(path);
	}

	projects.forEach((projectName) => {
		if (isProject(join(path, projectName))) {
			projectsList.push(join(path, projectName));
		} else {
			if (!statSync(join(path, projectName)).isDirectory()) return;
			readdirSync(join(path, projectName))
				.filter((x) => !excludedDirectories.includes(x))
				.forEach((subName) => {
					readCategory(join(path, projectName, subName));
				});
		}
	});
};

dirs.forEach((x) => {
	readCategory(join('..', x));
});

const projects = projectsList.map((x) => new Project(x));

console.log(`${center(`NODE PROJECT MANAGER`)}`);
console.log(bar(process.stdout.columns));

const handler = new Handler(projects);
