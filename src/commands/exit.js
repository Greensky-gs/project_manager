const Command = require("../structures/Command");

module.exports = new Command({
    name: 'exit',
    description: "Stops program",
    aliases: ["stop"],
    requiredArguments: 0
}).setRun(() => {
    console.log("Bye ;)")
    process.exit()
})