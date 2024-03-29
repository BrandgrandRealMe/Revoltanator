const { CommandBuilder } = require("../Commands.js");
const Embed = require("../util/embed");


const lib = require('lib');
var oneLinerJoke = require('one-liner-joke');

module.exports = {
  command: new CommandBuilder()
    .setName("random")
    .setCategory("fun")
    .setDescription("Get random things.")
    .addSubcommand((c) => c.setName("color").setId("color"))
    .addSubcommand((c) => c.setName("joke").setId("joke")),
  run: async function(msg, data) {


    if (data.commandId == "color") {
      msg.react("01H3AE38P1134S8Z0E8J4BXBVN");
      let randomColor = await lib.http.request['@1.1.6'].get({
  url: `https://api.popcat.xyz/randomcolor`,
});
      
    const uploader = this.uploader;
    let name = randomColor.data.name
    let hex = randomColor.data.hex
    let url = randomColor.data.image
    let Image = await uploader.uploadUrl(url, `${hex}.png`)
      
    const embed = new Embed()
        .setTitle(`${name}`)
        .setDescription(`> **Colour Hex code:** \`#${hex}\``)
        .setColor(`#${hex}`)
        .setMedia(await Image);

      msg.reply({ embeds: [embed] });

      
    } else if (data.commandId == "joke") {
    var getRandomJoke = oneLinerJoke.getRandomJoke();
    var joke = getRandomJoke.body;
    msg.reply(joke)

      
    }
    


    
  }
}