const { CommandBuilder } = require("../Commands.js");
const fet = require("node-fetch");

module.exports = {
  command: new CommandBuilder()
    .setName("numberfact")
    .setDescription("Get a random fact."),
  run: async function (msg, data) {
    const response = await fet("http://numbersapi.com/random/trivia");
    const fact = await response.text();
    msg.reply(fact);
  },
};
