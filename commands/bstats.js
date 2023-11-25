const { CommandBuilder } = require("../Commands.js");
const Embed = require("../util/embed");

const Presence = {
  Online: ":01H495D5C57G0T19FG43N0X4JD: | Online",
  Idle: ":01H495DZV97QR16QFXXJY1QJZ2: | Idle",
  Focus: ":01H495GA8CHA4C8B0Q1B7D4SZH: | Focus",
  Busy: ":01H495FMSRFGD6KJWY70CMCQ0H: | Busy",
  Invisible: ":01H495GY6Y4P6HQMXMQM4KRPKV: | Offline",
};

function msToTime (ms) {
  // Get the total seconds, minutes, hours, and days
  let seconds = ms / 1000;
  let minutes = seconds / 60;
  let hours = minutes / 60;
  let days = hours / 24;

  // Get the remaining values after each division
  seconds = Math.floor (seconds % 60);
  minutes = Math.floor (minutes % 60);
  hours = Math.floor (hours % 24);
  days = Math.floor (days);

  // Add leading zeros if the values are less than 10
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  hours = (hours < 10) ? "0" + hours : hours;
  days = (days < 10) ? "0" + days : days;

  // Return the formatted string
  return days + "d " + hours + "h " + minutes + "m " + seconds+"s";
}

module.exports = {
  command: new CommandBuilder()
    .setName("bstats")
    .setDescription("Get the bot stats; dev only")
    .addRequirement((r) => r.setOwnerOnly(true)),
  run: async function (msg, data) {
    const client = this.client;
    const log = this.log;
    const user = client.user;

    UTSeconds = process.uptime();
    var uptime = msToTime(UTSeconds*1000);

    var ram = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB';
    
    
    const embed = new Embed()
      .setDescription(
        `# 🤖 Bot Stats 🤖

        ${user}\nID: ${user.id}\nUsername: ${user.username}\nPresence: ${
          Presence[user.presence]
        }\nBot: ${user.bot ? "Yes" : "No"}

        **UPTIME**: ${uptime}
        **UPTIME RAW**: ${UTSeconds}
        **RAM**: ${ram}
        `
      )
      .setColor(`#FE2627`);

    msg.reply({ embeds: [embed] });
  },
};
