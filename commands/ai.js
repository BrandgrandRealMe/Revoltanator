const { CommandBuilder } = require("../Commands.js");
const Embed = require("../util/embed");
const DEBUG = process.env.REVOLTANATOR_DEBUG

const shocktoken = process.env.REVOLTANATOR_shocktoken;

async function shockAI(prompt, uid) {
  // console.log(`SHOCK: PROMPT - ${prompt}; UID - ${uid}; TOKEN - ${shocktoken}`);
  const response = await fetch(
    `http://api.shockbs.is-a.dev/chat?text=${prompt}&id=${uid}&botname=Revoltanator`,
    {
      headers: {
          authorization: "Bearer " + shocktoken,
      },
    }
  );
  const data = await response.json();
  if (DEBUG) console.log(data);
 if (data.statusCode !== 200) return data.message;
  return data.message;
}

function lettersToNumbers(string) {
  let newString = "";
  for (let i = 0; i < string.length; i++) {
    const currentChar = string[i];
    const IsNotNumber = isNaN(currentChar);
    if (IsNotNumber) {
      const number = parseInt(string[i], 36) - 9;
      newString += number.toString();
    } else {
      newString += currentChar;
    }
  }
  return newString;
}

module.exports = {
  command: new CommandBuilder()
    .setName("ai")
    .setCategory("AI")
    .setDescription("Talk to an AI.")
    .addTextOption((o) =>
      o
        .setName("message")
        .setDescription("The message for the AI")
        .setRequired(true)
    ),
  run: async function(msg, data) {
    const message = data.get("message").value;
    const uid = lettersToNumbers(msg.author.id);
    const response = await shockAI(message, uid.substring(0, 20));

  }
}