const { CommandBuilder } = require("../Commands.js");
const Embed = require("../util/embed");

module.exports = {
  command: new CommandBuilder()
    .setName("serverinfo")
    .setDescription("Get info about the current server."),
  run: async function (msg, data) {
    const log = this.log;

    const server = msg.server; // https://revolt.js.org/classes/Server.html
    const sowner = server.owner;
    const smembers = await server.fetchMembers().then(res => res.members.length);
    const embed = new Embed()
    .setDescription(
     `## Server Info\n### ${server.name}\n${server.description}
      
      Owner: ${sowner.username} (${server.ownerId})
      
      Default Channel: ${server.defaultChannel}
      Discoverable: ${server.discoverable ? "Yes" : "No"}
      Mature: ${server.mature ? "Yes" : "No"}
      
      Members: ${smembers}
      Channels: ${server.channels.length}
      Roles: ${server.roles.size}
      
      Created: ${server.createdAt}
      `
    )
    .setColor(`#FE2627`);
     msg.reply({ embeds: [embed] });
    
  },
};
