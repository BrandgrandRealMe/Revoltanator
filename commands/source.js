const { CommandBuilder } = require("../Commands.js");
const Embed = require("../util/embed");

module.exports = {
  command: new CommandBuilder()
    .setName("source")
    .setDescription("Get the bots source code."),
  run: async function(msg, data) {
    const embed = new Embed()
      .setDescription(`**Github**: https://github.com/BrandgrandRealMe/Revoltanator\n## Thanks:\n\n**ShadowLp174#0667** - For helping setup the command handler and for helping with most of my issues.\n[*Programmer's Lounge*](https://rvlt.gg/9Pfd3NcJ) - For being the place I go to get help with programming!`)
      .setColor(`#FE2627`);

    msg.reply({ embeds: [embed] });


  }
}