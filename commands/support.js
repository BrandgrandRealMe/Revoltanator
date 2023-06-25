const { CommandBuilder } = require("../Commands.js");

module.exports = {
  command: new CommandBuilder()
    .setName("support")
    .setDescription("Get the support servers invite link."),
  run: async function (msg, data) {
    msg.reply("Join the support server: https://rvlt.gg/b4mp1jgX");
  },
};
