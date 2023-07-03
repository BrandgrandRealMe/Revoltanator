const { CommandBuilder } = require("../Commands.js");
const Embed = require("../util/embed");

const { MinecraftPlayerInfo } = require("all-minecraft");
const https = require("https");

const Uploader = require("revolt-uploader");

module.exports = {
  command: new CommandBuilder()
    .setName("mc")
    .setDescription("Minecraft tools.")
    .addSubcommand((c) => c.setName("whois").setId("whois").addTextOption((o) =>
      o.setName("player")
        .setDescription("The MC players NAME or UUID you want info on.")
        .setRequired(true)
    ),)
    .addSubcommand((c) => c.setName("skin").setId("skin").addTextOption((o) =>
      o.setName("player")
        .setDescription("The MC players NAME or UUID you want the skin of.")
        .setRequired(true)
    ),),
  run: async function(msg, data) {
    const client = this.client
    const uploader = this.uploader;

    async function uploadURL(url) {
      return new Promise(res => {
        https.get(url, async response =>
          res(await uploader.upload(response, "head.png")));
      });
    }

    if (data.commandId == "whois") {
      const input = data.get("player").value;
      try {
      const player = new MinecraftPlayerInfo({
        usernameOrUUID: input,
      });
      
        const info = await player.getPlayerInfo();
      } catch {
        msg.reply("can not find this player!")
        return
      }
      const player = new MinecraftPlayerInfo({
        usernameOrUUID: input,
      });
      const info = await player.getPlayerInfo();
      const head = await player.getHead();
      const UUID = info.uuid;

      const username = info.username;
      const headURL = head.head;

      const headDATA = uploadURL(headURL);
      const embed = new Embed()
        .setColor(`#FE2627`)
        .setDescription(`# ${username}\n### ${UUID}`)
        .setMedia(await headDATA);
      msg.reply({ embeds: [embed] });
    } else if (data.commandId == "skin") {
      try {
        const input = data.get("player").value;
        const player = new MinecraftPlayerInfo({
          usernameOrUUID: input,
        });
        const skin = player.getSkin({
          extension: "png",
          helm: false,
          size: 100,
          facing: "left", // Facing is only for isometric version
        });
        const skinDATA = uploadURL(skin.skin)

        const embed = new Embed()
          .setColor(`#FE2627`)
          .setDescription(`## ${input}'s Skin`)
          .setMedia(await skinDATA);
        msg.reply({ embeds: [embed] });
      } catch (e) {
        msg.reply("Cannot find this player\n" + e)
      }
    }
  },
};
