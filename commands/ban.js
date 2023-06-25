const { CommandBuilder } = require("../Commands.js");

module.exports = {
  command: new CommandBuilder().setName("ban").setDescription("Ban A member"),
  run: async function (msg, data) {
    if (typeof msg.content != "string") return;
    if (msg.member.hasPermission(msg.channel.server, "BanMembers") === false) {
      return msg.channel.sendMessage("You don't have the permission to ban.");
    }
    let target_id = msg.content.split(" ")[1];
    let reason = msg.content.split(" ")[2];

    let target = msg.channel.server.fetchMember(target_id);
    console.log(await target);
    try {
      await msg.channel.server.banUser(target_id, { reason: reason });
      msg.channel.sendMessage(
        `<@${target_id}> has been banned by <@${msg.author_id}> for "${reason}"`
      );
    } catch (e) {
      msg.channel.sendMessage("I can't ban this user.\n" + e);
    }
  },
};
