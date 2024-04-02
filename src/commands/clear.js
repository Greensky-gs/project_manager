const Command = require("../structures/Command");

module.exports = new Command({
    name: 'clear',
    aliases: ['cls'],
    description: "Clear screen",
    requiredArguments: 0
}).setRun(() => {
    console.clear()
    process.stdout.write('> ')
})