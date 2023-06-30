const { CommandBuilder } = require("../Commands.js");
const Embed = require("../util/embed");

module.exports = {
  command: new CommandBuilder()
    .setName("suggestion")
    .setDescription("Suggest something to the dev.")
    .addAlias("suggest")
    .addTextOption((o) =>
      o
        .setName("suggestion")
        .setDescription("The suggestion you'd like to suggest")
        .setRequired(true)
    ),
  run: async function (message, data) {
    const suggestion = data.get("suggestion").value;
    if (!suggestion) {
      message.reply("You need to input the suggestion!");
      return;
    }
    const embed = new Embed()
      .setDescription(
        `# SUGGESTION\n\n ### USER: ${message.author}\n### ID: ${message.author.id}\n\n ### Suggestion\n${suggestion}`
      )
      .setColor(`#FE2627`);

    let msg = await this.client.channels
      .get("01H3SVDKZ0QPMNPPTA3G44DSEZ")
      .sendMessage({
        embeds: [embed],
        interactions: {
          reactions: [
            "01H3AEP7M2DA5NT11TFQ27ZK76",
            "01H3AEGPZHDQ0SG6CQH542TA2C",
          ],
        },
      });
    message.react("01H3AE38P1134S8Z0E8J4BXBVN");
    message.reply(`Suggested!\n${suggestion}`);
  },
};
