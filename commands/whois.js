const { CommandBuilder } = require("../Commands.js");
const Embed = require("../util/embed");

const Presence = {
  Online: ":01H495D5C57G0T19FG43N0X4JD: | Online",
  Idle: ":01H495DZV97QR16QFXXJY1QJZ2: | Idle",
  Focus: ":01H495GA8CHA4C8B0Q1B7D4SZH: | Focus",
  Busy: ":01H495FMSRFGD6KJWY70CMCQ0H: | Busy",
  Invisible: ":01H495GY6Y4P6HQMXMQM4KRPKV: | Offline",
};

module.exports = {
  command: new CommandBuilder()
    .setName("whois")
    .setDescription("Get info on a member or yourself")
    .addUserOption((o) =>
      o
        .setName("user")
        .setDescription("The user you want info on")
        .setRequired(false)
    ),
  run: async function (msg, data) {
    const client = this.client;
    try {
      let authorId = msg.author.id;
      let userId = data.get("user").value || null;
      let ID = userId ? userId : authorId;

      const user = client.users.get(ID) || (await client.usets.fetch(ID));

      const embed = new Embed()
        .setDescription(
          `${user}\nID: ${ID}\nUsername: ${user.username}\nPresence: ${
            Presence[user.presence]
          }\nBot: ${user.bot ? "Yes" : "No"}`
        )
        .setColor(`#FE2627`);

      msg.reply({ embeds: [embed] });
    } catch (e) {
      msg.reply(`Failed to find user!\n\`${e}\``);
    }
  },
};
