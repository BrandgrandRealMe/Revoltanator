const { CommandBuilder } = require("../Commands.js");
const Embed = require("../util/embed");

module.exports = {
  command: new CommandBuilder()
    .setName("todo")
    .setCategory("dev")
    .addRequirement((r) => r.setOwnerOnly(true))
    .setDescription("Send Todo to notes channel; DEV ONLY")
    .addTextOption((o) =>
      o
        .setName("todo")
        .setDescription("The Todo")
        .setRequired(true)
    ),
  run: async function (message, data) {
    const note = data.get("todo").value;
    if (!note) {
      message.reply("You need to input the Todo!");
      return;
    }
    const embed = new Embed()
      .setDescription(
        `# TODO\n\n${note}`
      )
      .setColor(`#FE2627`);

    let msg = await this.client.channels
      .get("01HHAW5ZKPG84WCDJYXVX7CAJT")
      .sendMessage({
        embeds: [embed],
        interactions: {
          reactions: [
            "01HHN0MF256FJ18E1P10HBMMV4",
            "01HHN0PNBXWSSK4AFSF2QRD8AZ",
            "01HHN0Q12V78STAFHCVZMY9926",
            "01HHN0QK98J2441MZ9X8D3W9ER",
            "01HHN0QXJJ3DY7E5ZF4973DGXH"
          ],
        },
      });
    message.react("01H3AE38P1134S8Z0E8J4BXBVN");
    message.reply(`Added to notes!\n${note}`);
  },
};
