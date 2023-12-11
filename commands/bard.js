const {
  CommandBuilder
} = require("../Commands.js");
const Embed = require("../util/embed");


module.exports = {
  command: new CommandBuilder()
    .setName("bard")
    .setCategory("AI")
    .setDescription("Ask google bard something.")
    .addRequirement((r) => r.setOwnerOnly(true))
    .addTextOption((o) =>
      o
      .setName("question")
      .setDescription("The question you want to ask")
      .setRequired(true)
    ),
  run: async function(msg, data) {
    const prompt = data.get("question").value;
    const MODEL_NAME = "models/text-bison-001";

    async function sendMSG(d, message) {
      message.edit({
        content: await d
      })
    }

    msg.reply({
      content: "Asking AI..."
    }).then(async (message) => {
      this.bard.generateText({
          model: MODEL_NAME,
          prompt: {
            text: prompt,
          },
        })
        .then((result) => {
          try {
            console.log(JSON.stringify(result, null, 2))
            
            var [output] = result;
            console.log(output[0])
            sendMSG(output.candidates[0].output, message);
          } catch (e) {
            sendMSG("Error! Try again later.", message);
            console.log(e);
          }
        });
    });
  }
}
