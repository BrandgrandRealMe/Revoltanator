const { CommandHandler } = require("./Commands.js");
const Uploader = require("revolt-uploader");
const { Revoice } = require("revoice.js");
const { Client } = require("revolt.js");
const fs = require("fs");
const path = require("path");

// Just to keep the code running with uptimerobot :)
var http = require("http");
http
  .createServer(function (req, res) {
    res.write("I'm alive");
    res.end();
  })
  .listen(8080);

const bl = require("betterdevlogs");
const log = bl({ logfolder: "logs" });

let client = new Client();
this.client = client;

let config;
if (fs.existsSync("./config.json")) {
  config = require("./config.json");
} else {
  config = {
    token: process.env.TOKEN,
  };
}

client.on("ready", async () => {
  client.user.edit({
    status: { text: "//help | WIP bot", presence: "Online" },
  });
  log.info(`Logged in as ${client.user.username}!`);
});

const prefix = "//";
const handler = new CommandHandler(client, prefix);
handler.setReplyHandler((t, msg) => {
  msg.reply(t, false);
});
handler.addOwners(...(config.owners || ["01H2TVFZVGWV6TNY1MGTZB313R"]));
handler.setRequestCallback((...data) => prefix);
handler.setOnPing((msg) => {
  let pref = handler.getPrefix(msg.channel.server_id);
  let m = "My prefix is `" + pref + "`";
  msg.reply(m, false);
});
handler.setPaginationHandler((message, form, contents) => {
  this.pagination(form, contents, message, 8);
});
handler.enableHelpPagination(false);
const dir = path.join(__dirname, "commands");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".js"));
const runnables = new Map();
const commandFiles = new Map();

// load command files
files.forEach((commandFile) => {
  const file = path.join(dir, commandFile);
  const cData = require(file);
  const builder =
    typeof cData.command == "function"
      ? cData.command.call(this)
      : cData.command;
  if (cData.export) this[cData.export.name] = cData.export.object;
  handler.addCommand(builder);
  commandFiles.set(builder.uid, file);
  if (cData.run) {
    runnables.set(builder.uid, cData.run);
    builder.subcommands.forEach((sub) => {
      runnables.set(sub.uid, cData.run);
    });
  }
});
handler.on("run", (data) => {
  if (runnables.has(data.command.uid)) {
    runnables.get(data.command.uid).call(this, data.message, data);
  }
});

client.loginBot(process.env["TOKEN"]);

process.on("unhandledRejection", (reason, p) => {
  log.error(" [Error_Handling] :: Unhandled Rejection/Catch");
  console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
  log.error(" [Error_Handling] :: Uncaught Exception/Catch");
  console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
  log.error(" [Error_Handling] :: Uncaught Exception/Catch (MONITOR)");
  console.log(err, origin);
});
