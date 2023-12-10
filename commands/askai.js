const { CommandBuilder } = require("../Commands.js");
const Embed = require("../util/embed");

const { Hercai } = require('hercai');
const fetch = require('node-fetch'); // import fetch for the API call


module.exports = {
  command: new CommandBuilder()
    .setName("askai")
    .setCategory("AI")
    .setDescription("Ask AI something.")
    .addTextOption((o) =>
      o
        .setName("question")
        .setDescription("The question you want to ask")
        .setRequired(true)
    ),
  run: async function(msg, data) {
    const input = data.get("question").value;
    const hercai = this.hercai;

  //  const API_KEY = process.env['youKey']; // your api key
  //  const url = `https://api.betterapi.net/youchat?inputs=${input}&key=${API_KEY}`; // set API endpoint 

    async function sendMSG(d,message){
      message.edit({content: await d})
    }
    function replaceUserText(inputString, replacementText) {
      return inputString.replace(/@User/g, replacementText);
    }
    
msg.reply({content: "Asking AI..."}).then(async (message) => {

  hercai.question({content:input}).then(response => {
    const originalString = response.reply
    const replacedString = replaceUserText(originalString, msg.author);
sendMSG(replacedString, message);
// The module will reply based on the message!

});
     });

  
    


  }
}