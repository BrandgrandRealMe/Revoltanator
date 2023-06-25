const { CommandBuilder } = require("../Commands.js");
const Embed = require("../util/embed");

module.exports = {
  command: new CommandBuilder()
    .setName("whois")
    .setDescription("Get info on a member or yourself"),
  run: async function (msg, data) {
    const client = this.client;
    try {
      let authorId = msg.author.id;
      let userId = msg.mentionIds || null;
      let ID = userId ? userId[0] : authorId;

      const user = client.users.get(ID) || (await client.usets.fetch(ID));

      const embed = new Embed()
        .setDescription(
          `${user}\nID: ${ID}\nUsername: ${user.username}\nBot: ${
            user.bot ? "Yes" : "No"
          }`
        )
        .setColor(`#2DC5F8`);

      msg.reply({ embeds: [embed] });
    } catch (e) {
      msg.reply(`Failed to find user!\n${e}`);
    }
  },
};
