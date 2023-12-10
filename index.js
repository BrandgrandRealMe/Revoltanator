const { CommandHandler } = require("./Commands.js");
const Uploader = require("revolt-uploader");
const { Revoice } = require("revoice.js");
const { Client } = require("revolt.js");
const fs = require("fs");
const path = require("path");
const { Hercai } = require('hercai');

// Bard Stuff
const { TextServiceClient } = require("@google-ai/generativelanguage").v1beta3;
const { GoogleAuth } = require("google-auth-library");

const API_KEY = process.env.BARDKEY;

const bard = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

// Webpage Stuff
const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const RevoltBots = require('revoltbots.js');
const RBapi = new RevoltBots.Client(process.env['RBapiKey']);

const ver = "1.0.8"


const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const bl = require("betterdevlogs");
const log = bl({ logfolder: "logs" });
var envTest = process.env.envTest;
log.debug(envTest);

let client =  new Client();
this.client = client;

let hercai = new Hercai();

const uploader = new Uploader(client);


let config;
if (fs.existsSync("./config.json")) {
  config = require("./config.json");
} else {
  config = {
    token: process.env.TOKEN,
  };
}

client.on("ready", async () => {

  

  RBapi.autopostStats(client).then(result => {
    		console.log(result)
	});
  
  log.info(`Logged in as ${client.user.username}!`);

  // Webpage Stuff :)
  const app = express();
  const server = createServer(app);

  app.get('/', (req, res) => {
    res.sendFile(__dirname + "/web/index.html");
  });
  app.get('/index.css', (req, res) => {
    res.sendFile(__dirname + "/web/index.css");
  });
  app.get('/index.js', (req, res) => {
    res.sendFile(__dirname + "/web/index.js");
  });

  server.listen(3000, () => {
    log.info('server running!');
  });
  // Socket Stuff
  const io = new Server(server);
  io.on('connection', (socket) => {
    updateWEB();
    console.log('a user connected');
  });
  
  async function updateWEB() {
    var ram = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB';
    var servers = await client.servers.size();
    var users = await client.users.size();
    var channels = await client.channels.size();
    
    var stats = { "servers": servers, "users": users, "channels": channels, "ram": ram, "commands": handler.commands.length };
    io.emit('update', stats);
  }
  setInterval(async function () {
    updateWEB()
    }, 500);
  ///////////////////////

  setInterval(async function () {

    const servers = await client.servers.size();
    client.user.edit({
      status: { text: `//help | ${servers} Servers!`, presence: "Focus" },
    });
    await delay(30000);
    client.user.edit({
      status: { text: `//help | v${ver}`, presence: "Focus" },
    });
  }, 60000);
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
  pagination(form, contents, message, 8);
});
handler.enableHelpPagination(true);
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
    runnables
      .get(data.command.uid)
      .call({ client, pagination, uploader, ver, RBapi, hercai, log, bard }, data.message, data);
  }
});

const observedReactions = new Map();

const reactionUpdate = (message, user, emoji) => {
  const event = { user_id: user, emoji_id: emoji };
  if (!observedReactions.has(message.id)) return;
  if (event.user_id == client.user.id) return;
  const observer = observedReactions.get(message.id);
  if (!observer.r.includes(event.emoji_id)) return;
  if (observer.user) if (observer.user != user) return;
  observer.cb(event, message);
};
client.on("messageReactionAdd", reactionUpdate);
client.on("messageReactionRemove", reactionUpdate);

function observeReactions(msg, reactions, cb, user) {
  observedReactions.set(msg.id, {
    r: reactions,
    user: user ? user.id : null,
    cb,
  });
  return msg.id;
}
function unobserveReactions(i) {
  return observedReactions.delete(i);
}

function paginate(text, maxLinesPerPage = 5, page = 0) {
  page -= 1;
  const lines = text.split("\n");
  return lines.slice(
    maxLinesPerPage * page,
    maxLinesPerPage * page + maxLinesPerPage
  );
}
function pages(text, maxLinesPerPage = 2) {
  const lines = Array.isArray(text) ? text : text.split("\n");
  const pages = [];
  for (
    let i = 0, n = 0;
    i < lines.length;
    i++, i % maxLinesPerPage == 0 ? n++ : n
  ) {
    let line = lines[i];
    if (!pages[n]) pages[n] = [];
    pages[n].push(line);
  }
  return pages;
}
function pagination(form, content, message, maxLinesPerPage = 2) {
  if (!message.channel.havePermission("React")) {
    if (!message.channel.havePermission("SendMessage"))
      return message.member.user
        .openDM()
        .then((dm) => {
          dm.sendMessage({
            content: " ",
            embeds: [
              embedify(
                "I am unable to send messages in <#" +
                  message.channelId +
                  '>. Please contact a server administrator and grant me the "SendMessage" permission.'
              ),
            ],
          });
        })
        .catch(() => {});
    return message.reply(
      {
        content: " ",
        embeds: [
          embedify(
            "I need reaction permissions to work. Please contact a server administrator to address this."
          ),
        ],
      },
      true
    );
  }
  const arrows = ["⬅️", "➡️"];
  var page = 0;
  const paginated = pages(content, maxLinesPerPage);
  form = form.replace(/\$maxPage/gi, paginated.length);

  var lastEmbed;
  var messageFormatter = (t) => {
    lastEmbed = embedify(
      form.replace(/\$currPage/gi, page + 1).replace(/\$content/gi, t)
    );
    return {
      embeds: [lastEmbed],
    };
  };

  message
    .reply(
      {
        content: " ",
        ...messageFormatter(paginated[0].join("\n")),
        interactions: {
          restrict_reactions: true,
          reactions: arrows,
        },
      },
      false
    )
    .then((m) => {
      const oid = observeReactions(m, arrows, (e, ms) => {
        let change = e.emoji_id == arrows[0] ? -1 : 1;
        if (page + change < 0) (page = paginated.length - 1), (change = 0);
        if (!paginated[page + change]) (page = 0), (change = 0);
        page += change;
        const c = paginated[page].join("\n");
        ms.edit(messageFormatter(c));
        clearTimeout(currTime);
        currTime = setTimeout(() => {
          finish();
        }, 60 * 1000);
      });
      const finish = () => {
        unobserveReactions(oid);
        m.edit({
          content: "Session Closed",
          embeds: [
            embedify(
              lastEmbed.description +
                "\n\n Session closed - Changing pages **won't work** from here.",
              "red"
            ),
          ],
        });
      };
      var currTime = setTimeout(() => {
        finish();
      }, 60 * 1000);
    });
}

function embedify(text = "", color = "#FE2627") {
  return {
    type: "Text",
    description: "" + text, // convert bools and numbers to strings
    colour: color,
  };
}

client.loginBot(process.env["TOKEN"]);

process.on("unhandledRejection", (reason, p) => {
  log.error(" [Error_Handling] :: Unhandled Rejection/Catch");
  log.error(reason, p);
  console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
  log.error(" [Error_Handling] :: Uncaught Exception/Catch");
  log.error(err, origin);
  console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
  log.error(" [Error_Handling] :: Uncaught Exception/Catch (MONITOR)");
  log.error(err, origin);
  console.log(err, origin);
});
