const { CommandBuilder } = require("../Commands.js");
const Embed = require("../util/embed");

module.exports = {
  command: new CommandBuilder()
    .setName("note")
    .setCategory("dev")
    .addRequirement((r) => r.setOwnerOnly(true))
    .setDescription("Send Notes to note channel; DEV ONLY")
    .addTextOption((o) =>
      o
        .setName("note")
        .setDescription("The note")
        .setRequired(true)
    ),
  run: async function (message, data) {
    const note = data.get("note").value;
    if (!note) {
      message.reply("You need to input the suggestion!");
      return;
    }
    const embed = new Embed()
      .setDescription(
        `# NOTE\n\n${note}`
      )
      .setColor(`#FE2627`);

    let msg = await this.client.channels
      .get("01HHAW5ZKPG84WCDJYXVX7CAJT")
      .sendMessage({ embeds: [embed] });
    message.react("01H3AE38P1134S8Z0E8J4BXBVN");
    message.reply(`Added to notes!\n${note}`);
  },
};
