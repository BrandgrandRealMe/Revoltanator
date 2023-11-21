const { CommandBuilder } = require("../Commands.js");
const Embed = require("../util/embed");

module.exports = {
  command: new CommandBuilder()
    .setName("poll")
    .setCategory("util")
    .setDescription("Do poll Things. Types: Dichotomous, More Coming soon!")
    .addSubcommand((c) => 
    c.setName("dichotomous")
    .setId("dichotomous")
    .addTextOption(o =>
      o.setName("poll")
      .setRequired(true)
    ))
    .addSubcommand((c) => 
    c.setName("list")
    .setId("list")
    .addStringOption(o =>
    o.setName("poll")
    .setRequired(true)
    )),

  run: async function(msg, data) {
     if (data.commandId == "dichotomous") {
      const poll = data.get("poll").value;
      const embed = new Embed()
      .setDescription(
        `# 🗳️ Poll 🗳️\n${poll}\n\n##### ✅ Yes | ❎ No` 
      )
      .setColor(`#FE2627`);
      msg.channel.sendMessage({ embeds: [embed], interactions: { reactions: ["✅", "❎"]}});
    }
  },
};
