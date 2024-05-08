const Command = require("../structures/Command");
const { exec } = require('child_process')

module.exports = new Command({
    name: 'goto',
    aliases: ["gt"],
    description: "Ouvre l'explorateur à ce projet",
    requiredArguments: 1
}).setRun(({ arguments: [project], projects }) => {
    const projectFound = projects.find(x => x.name.toLowerCase() === project.toLowerCase())
    if (!projectFound) return "Projet introuvable"

    const path = projectFound.path.replace('../', 'E:/scripts/js/').replace(/\//g, '\\')
    exec(`explorer ${path}`)
})