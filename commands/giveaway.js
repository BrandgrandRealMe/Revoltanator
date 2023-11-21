const { CommandBuilder } = require("../Commands.js");
const Embed = require("../util/embed");

module.exports = {
  command: new CommandBuilder()
    .setName("giveaway")
    .setCategory("util")
    .setDescription("Do giveaway Things.")
    .addSubcommand((c) => 
    c.setName("draw")
    .setId("draw")
    .addStringOption(o =>
      o.setName("url")
      .setRequired(true)
    ))
    .addSubcommand((c) => 
    c.setName("make")
    .setId("make")
    .addTextOption(o =>
    o.setName("item")
    .setRequired(true)
    )),
  
  run: async function(msg, data) {
    if (data.commandId == "draw") {      
      const client = this.client;
      const msgUrl = data.get("url").value;

      let result = /\/channel\/([A-Z0-9]{26})\/([A-Z0-9]{26})/g.exec(msgUrl);
      
      if (!result) return msg.reply("Message not found");;
      const [_, channelId, msgId] = result;
      
      const m = await client.messages.fetch(channelId, msgId);
      
      if (!m) return msg.reply("Message not found");
      
      const reactions = m.reactions.get("🎉"); // it's a map, not an array sadly
      if (!reactions) return msg.reply("Nobody reacted to the message!");
      const randIndex = Math.floor(Math.random() * reactions.size); // this will select a random index in the range of the map
      
      // extract the selected reaction
      var i = 0;
      var Winner = null;
      for (const [key, value] of reactions.entries()) {
          if (i === randIndex) {
            Winner = value;
            break;
          }
          i++;
      }
      if (!Winner) return msg.reply("ERROR");
      msg.reply(`Winner: <@${Winner}> (${Winner})`);
      
    } else if (data.commandId == "make") {
      const ITEM = data.get("item").value;
      const embed = new Embed()
      .setDescription(
        `# 🎉 Giveaway 🎉\n${ITEM}\n\n##### React with 🎉 to participate in the giveaway.` 
      )
      .setColor(`#FE2627`);
      msg.channel.sendMessage({ embeds: [embed], interactions: { reactions: ["🎉"]}});
    }
  },
};

