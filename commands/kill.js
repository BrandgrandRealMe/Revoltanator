const { CommandBuilder } = require("../Commands.js");


module.exports = {
  command: new CommandBuilder()
    .setName("kill")
    .setDescription("Kill the bot; dev only")
    .addRequirement((r) => r.setOwnerOnly(true)),
  run: async function (msg, data) {
    const log = this.log;
    const exec = require('child_process').exec;
    log.server("Kill Triggered");
    msg.reply("Killing!");
    exec(`pidof node | awk 'BEGIN { RS = " " } { print $1}' | while read line ; do kill $line ; done`);
  },
};
