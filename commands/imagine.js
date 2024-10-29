const { CommandBuilder } = require("../Commands.js");
const Embed = require("../util/embed");

const imagehandler = require("../util/imagehandler.js");

function slugify(m) {
  return m
    .trim()
    .replace(/ +/g, "-")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "");
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
    const token = this.token;
    const hercai = this.hercai;

    //const premium = await RBapi.hasVoted(client, msg.author.id);

    // if (!premium) {
    //   msg.reply("You do NOT have premium!")
    //   return
    // }

    msg.react("01H3AE38P1134S8Z0E8J4BXBVN");

    const message = data.get("prompt").value;
    const fname = `${slugify(message)}.png`;

    try {
      hercai.drawImage({ prompt: message }).then(async (response) => {
        const tempUrl = response.url;
        imagehandler
          .downloadImage(tempUrl, fname)
          .then(async (path) => {
            msg.reply({
              content: "Here's your image: ",
              attachments: [
                await imagehandler.uploadImage(client, token, path, fname),
              ],
            });
          })
          .catch((err) => {
            console.error("Error:", err);
            console.error("Imagine TempURL:", tempUrl);
            msg.reply({
              content: `Error: Send This to the owner: \`Imagine Error with Prompt - ${
                message || "N/A"
              } | TempURL - ${tempUrl || "N/A"}\` | error - ${err}`,
            });
          });
      });
    } catch {
      msg.reply({
        content: `Error: Send This to the owner: \`Imagine Error with Prompt - ${
          message || "N/A"
        } | TempURL - ${tempUrl || "N/A"}\` `,
      });
    }
  },
};
