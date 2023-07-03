const { CommandBuilder } = require("../Commands.js");
const Embed = require("../util/embed");

const smartestchatbot = require('smartestchatbot');
const AI = new smartestchatbot.Client(process.env.SCBKEY)

module.exports = {
  command: new CommandBuilder()
    .setName("ai")
    .setDescription("Talk to an AI.")
    .addTextOption((o) =>
      o
        .setName("message")
        .setDescription("The message for the AI")
        .setRequired(true)
    ),
  run: async function(msg, data) {
    const message = data.get("message").value;
    AI.chat({ message: message, name: "Revoltanator", owner: "BrandgrandReal", user: msg.author.id }, "auto").then(reply => {
      msg.reply(reply);
      // The module will reply based on the message!
    });

  }
}