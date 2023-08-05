const { CommandBuilder } = require("../Commands.js");
const Embed = require("../util/embed");

const fetch = require("node-fetch"); // import node-fetch for the API call

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
    
    const premium = await RBapi.hasVoted(client, msg.author.id);
    console.log(premium.voted)
    
    if (!premium) {
      msg.reply("You do NOT have premium!")
      return
    }
    const uploader = this.uploader;
    const message = data.get("prompt").value;
    const fname = `${slugify(message)}.png`
    
    const API_KEY = process.env['ClipDKey']; // your api key
    const form = new FormData()
form.append('prompt', message)

fetch('https://clipdrop-api.co/text-to-image/v1', {
  method: 'POST',
  headers: {
    'x-api-key': API_KEY,
  },
  body: form,
})
  .then(response => response.arrayBuffer())
  .then(async (buffer) => {
    msg.reply({ content: "Here's your image: ", attachments: [await uploader.upload(Buffer.from(buffer), fname)]});
  })

  }
}