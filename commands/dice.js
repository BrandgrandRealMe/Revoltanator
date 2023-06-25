const { CommandBuilder } = require("../Commands.js");

module.exports = {
  command: new CommandBuilder()
    .setName("dice")
    .setDescription("Roll a 6 sided die!")
    .addAlias("roll"),
  run: async function (msg, data) {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    await msg.channel.sendMessage(`You rolled a ${randomNumber}! 🎲`);
  },
};
