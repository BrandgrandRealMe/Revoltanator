const { CommandBuilder } = require("../Commands.js");
const Embed = require("../util/embed");
const mtempy = require("mtempy");
const axios = require("axios");
const fs = require("fs");


const { Hercai } = require("hercai");

function slugify(m) {
  return m
    .trim()
    .replace(/ +/g, "-")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "");
}

async function downloadImage(url, path) {
  const response = await axios({
    method: "GET",
    url: url,
    responseType: "stream",
  });

  response.data.pipe(fs.createWriteStream(path));

  return new Promise((resolve, reject) => {
    response.data.on("end", () => {
      resolve();
    });

    response.data.on("error", (err) => {
      log.error(err);
      reject(err);
    });
  });
}

module.exports = {
  command: new CommandBuilder()
    .setName("imagine")
    .setCategory("AI")
    .setDescription("create stunning images using AI")
    .addTextOption((o) =>
      o
        .setName("prompt")
        .setDescription("Describe the image you want.")
        .setRequired(true)
    ),
  run: async function (msg, data) {
    RBapi = this.RBapi;
    client = this.client;
    const hercai = this.hercai;

    //const premium = await RBapi.hasVoted(client, msg.author.id);

    // if (!premium) {
    //   msg.reply("You do NOT have premium!")
    //   return
    // }

    msg.react("01H3AE38P1134S8Z0E8J4BXBVN");

    const uploader = this.uploader;
    
    const message = data.get("prompt").value;
    const fname = `${slugify(message)}.png`;
    const localPath = mtempy.file({ name: fname });
    try {
      hercai
      .drawImage({ prompt: message })
      .then(async (response) => {
        const tempUrl = response.url;
        console.log(`TempURL: ${tempUrl}`)
        const downloadedImage = downloadImage(tempUrl, localPath)
          .then(async () => {
            const image = await uploader.uploadFile(localPath, fname);
            console.log(image);
            msg.reply({
              content: "Here's your image: ",
              attachments: [image],
            });
          })
          .catch((err) => {
            console.error("Error:", err);
            console.error("Imagine TempURL:", tempUrl);
            msg.reply({ content: `Error: Send This to the owner: \`Imagine Error with Prompt - ${message || "N/A"} | TempURL - ${tempUrl || "N/A"}\` ` })
          });
          console.log("Downloaded Image ----")
          console.log(await downloadedImage)
          console.log("end of Downloaded Image ----")
      }
    );
      
    } catch {
      msg.reply({ content: `Error: Send This to the owner: \`Imagine Error with Prompt - ${message || "N/A"} | TempURL - ${tempUrl || "N/A"}\` ` })
    }
  },
};
