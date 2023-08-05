const { CommandBuilder } = require("../Commands.js");
const Embed = require("../util/embed");

module.exports = {
  command: new CommandBuilder()
    .setName("premium")
    .setCategory("util")
    .setDescription("Learn how to get premium also Check if you have premium."),
  run: async function(msg, data) {
RBapi = this.RBapi
client = this.client
    //msg.reply("Command Disabled for API Issue."); return;
    voteddata = await RBapi.hasVoted(client, msg.author.id)
    console.log(voteddata.voted)
RBapi.hasVoted(client, msg.author.id).then(result => {
    	const embed = new Embed()
        .setDescription(`Get premium by voteing [here](https://revoltbots.org/bots/01H3MVST5ASBE2M08KJ393M6HJ/vote)\n\nVoted? ${result.voted ? "Yes" : "No"}`)
        .setColor(`#FE2627`);
  msg.reply({ embeds: [embed] });
	});
      

    
  }
}