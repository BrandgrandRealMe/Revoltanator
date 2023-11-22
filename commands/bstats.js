const { CommandBuilder } = require("../Commands.js");
const Embed = require("../util/embed");

const Presence = {
  Online: ":01H495D5C57G0T19FG43N0X4JD: | Online",
  Idle: ":01H495DZV97QR16QFXXJY1QJZ2: | Idle",
  Focus: ":01H495GA8CHA4C8B0Q1B7D4SZH: | Focus",
  Busy: ":01H495FMSRFGD6KJWY70CMCQ0H: | Busy",
  Invisible: ":01H495GY6Y4P6HQMXMQM4KRPKV: | Offline",
};


module.exports = {
  command: new CommandBuilder()
    .setName("bstats")
    .setDescription("Get the bot stats; dev only")
    .addRequirement((r) => r.setOwnerOnly(true)),
  run: async function (msg, data) {
    const client = this.client;
    const log = this.log;
    const user = client.user;

    var milliseconds = parseInt((client.uptime % 1000) / 100),
      seconds = parseInt((client.uptime / 1000) % 60),
      minutes = parseInt((client.uptime / (1000 * 60)) % 60),
      hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);
     days = parseInt((client.uptime / (1000 * 60 * 60 * 24)) % 60);
    days = (days < 10) ? "0" + days : days;
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    var uptime = days + "d " + hours + "h " + minutes + "m " + seconds + "." + milliseconds + "s";
    var ram = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB';

    
    const embed = new Embed()
      .setDescription(
        `# 🤖 Bot Stats 🤖

        ${user}\nID: ${ID}\nUsername: ${user.username}\nPresence: ${
          Presence[user.presence]
        }\nBot: ${user.bot ? "Yes" : "No"}

        **UPTIME**: ${uptime}
        **RAM**: ${ram}
        `
      )
      .setColor(`#FE2627`);

    msg.reply({ embeds: [embed] });
  },
};
