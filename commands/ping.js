const { CommandBuilder } = require("../Commands.js");

module.exports = {
  command: new CommandBuilder()
    .setName("ping")
    .setDescription("Get the bots latency."),
  run: async function (msg, data) {
    let now = Date.now();
    msg.reply(`Pinging...`).then((msg) => {
      msg.edit({ content: `The bots latency is: ${Date.now() - now}ms` });
    });
  },
};
