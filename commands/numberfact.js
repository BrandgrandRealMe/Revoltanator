const { CommandBuilder } = require("../Commands.js");
const fet = require('axios');
module.exports = {
  command: new CommandBuilder()
    .setName("numberfact")
    .setCategory("fun")
    .setDescription("Get a random fact."),
  run: async function (msg, data) {
    const response = await fet("http://numbersapi.com/random/trivia");
    const fact = await response.data;
    msg.reply(fact);
  },
};
