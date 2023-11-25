const { CommandBuilder } = require("../Commands.js");
const Embed = require("../util/embed");

const { Hercai } = require('hercai');

function slugify(m) {
  return m
    .trim()
    .replace(/ +/g, '-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
}


module.exports = {
  command: new CommandBuilder()
    .setName("imagine")
    .setCategory("AI")
    .setDescription('create stunning images using AI')
    .addTextOption((o) =>
      o
        .setName("prompt")
        .setDescription("Describe the image you want.")
        .setRequired(true)
    ),
  run: async function(msg, data) {
    RBapi = this.RBapi
    client = this.client
    hercai = this.hercai


    //const premium = await RBapi.hasVoted(client, msg.author.id);

    // if (!premium) {
    //   msg.reply("You do NOT have premium!")
    //   return
    // }

    msg.react("01H3AE38P1134S8Z0E8J4BXBVN")

    const uploader = this.uploader;
    const message = data.get("prompt").value;
    const fname = `${slugify(message)}.png`

    hercai.drawImage({ model: "v2", prompt: message }).then(async response => {
      //console.log(response)

      msg.reply({ content: "Here's your image: ", attachments: [await uploader.uploadUrl(response.url, fname)] });
      // The module will reply based on the prompt!

    });
    //     const API_KEY = process.env['ClipDKey']; // your api key
    //     const form = new FormData()
    // form.append('prompt', message)

    // fetch('https://clipdrop-api.co/text-to-image/v1', {
    //   method: 'POST',
    //   headers: {
    //     'x-api-key': API_KEY,
    //   },
    //   body: form,
    // })
    //   .then(response => response.arrayBuffer())
    //   .then(async (buffer) => {
    //     msg.reply({ content: "Here's your image: ", attachments: [await uploader.upload(Buffer.from(buffer), "image.png")]});
    //   })

  }
}