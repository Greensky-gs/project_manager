const hyperlinker = require("hyperlinker");
const Command = require("../structures/Command");
const { bar } = require("../utils/toolbox");

module.exports = new Command({
    name: 'info',
    description: "Displays information about a project",
    aliases: ["i"],
    requiredArguments: 1
}).setRun(({ arguments, handler }) => {
    const project = handler.projects.find(x => x.name.toLowerCase() === arguments[0].toLowerCase())
    if (!project) return "No project found with that name"

    const maxLength = process.stdout.columns - 20
    const pad = 10

    const margin = bar(pad, ' ');
    const middlise = (str) => {
        const missing = maxLength - str.length
        const left = Math.floor(missing / 2 - 2)
        const right = Math.ceil(missing / 2 - 2)

        return `${margin}║ ${bar(left, ' ')}${str}${bar(right, ' ')} ║`
    }
    const open = margin + '╔' + bar(maxLength - 2, '═') + '╗';
    const middle = margin + '╠' + bar(maxLength - 2, '═') + '╣'
    const close = margin + '╚' + bar(maxLength - 2, '═') + '╝';
    
    const name = (() => {
        const missing = maxLength - project.name.length
        const left = Math.floor(missing / 2 - 2)
        const right = Math.ceil(missing / 2 - 2)

        return `${margin}║ ${bar(left, ' ')}${hyperlinker(project.name, project.fullPath)}${bar(right, ' ')} ║`
    })()
    const version = middlise('v' + project.version)
    const main = middlise(`Entry point: ${project.main}`)

    const deps = project.info.dependencies;
    const devs = Object.keys(project.info?.devDependencies ?? {})?.length;

    const dependencies = middlise(`Dependencies: ${Object.keys(deps).length.toLocaleString()}`)
    const devDependencies = middlise(`Dev dependencies: ${devs?.toLocaleString?.() ?? 0}`)
    const totalDeps = middlise(`Total dependencies: ${(Object.keys(deps).length + devs).toLocaleString()}`);

    return `${open}\n${name}\n${middle}\n${version}\n${main}\n${dependencies}\n${devDependencies}\n${totalDeps}\n${close}\n`
})