const { CommandBuilder } = require("../Commands.js");


module.exports = {
  command: new CommandBuilder()
    .setName("purge")
    .setDescription("Purges x amount of messages.")
    .addNumberOption((o) => o.setName("amount").setDescription("The amount of messages to delete").setRequired(true))
    .addRequirement(r => r.addPermissions("ManageMessages")),
  run: async function(message, data) {
    const log = this.log;
    const amount = data.get("amount").value;
    const MAX_PURGE_AMOUNT = 100;
    if (!message.channel.havePermission("ManageMessages")) return message.reply("I need `Manage Messages` permissions to work. Please contact a server administrator to address this.");
    try {
      let messages = [];
      // X amount of messages from bottom
      if (/^[0-9]+$/g.test(amount)) {
        if (isNaN(amount)) return message.reply("Invalid number");
        if (amount > MAX_PURGE_AMOUNT)
          return message.reply(
            `Message count exceeds the limit of ${MAX_PURGE_AMOUNT}.`
          );
        messages = await message.channel.fetchMessages({
          limit: amount,
          before: message.id,
        });
      }

      await message.channel.deleteMessages(messages.map((m) => m.id));
      const replyMsg = await message.channel
        .sendMessage({
          content: `Deleted ${messages.length} messages.`,
        })
        .catch(console.error);
      setTimeout(async () => {
        try {
          await message.channel.deleteMessages([
            replyMsg.id,
            message.id,
          ]);
        } catch (e) {
          console.error(e);
        }
      }, 6000);
    } catch (e) {
      console.error(e);
      message.channel.sendMessage(`An error has occurred: ${e}`);
    }
  },
};
