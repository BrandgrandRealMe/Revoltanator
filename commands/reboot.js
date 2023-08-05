const { CommandBuilder } = require("../Commands.js");


module.exports = {
  command: new CommandBuilder()
    .setName("reboot")
    .setDescription("Reboot the bot; dev only")
    .addRequirement((r) => r.setOwnerOnly(true)),
  run: async function (msg, data) {
    const log = this.log;
    const exec = require('child_process').exec;
    log.server("Reboot Triggered");
    msg.reply("Rebooting!");
    exec("busybox reboot");
  },
};
