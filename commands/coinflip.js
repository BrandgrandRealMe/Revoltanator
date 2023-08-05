const { CommandBuilder } = require("../Commands.js");
const Embed = require("../util/embed");

module.exports = {
  command: new CommandBuilder()
    .setName("coinflip")
    .setCategory("fun")
    .setDescription("Flip a coin."),
  run: async function(msg, data) {
  let items = ['Heads', 'Tails'];
  let random = items[Math.floor(Math.random() * items.length)];
  msg.reply(random)
  }
}