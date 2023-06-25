const fetch = require("node-fetch");

const { CommandBuilder } = require("../Commands.js");

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

module.exports = {
  command: new CommandBuilder()
    .setName("trivia")
    .setDescription("Get a trivia question!"),
  run: async function (msg, data) {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=1&type=multiple"
    );
    const da = await response.json();
    const question = da.results[0].question;
    const answers = da.results[0].incorrect_answers;
    const correctAnswer = da.results[0].correct_answer;
    answers.push(correctAnswer);
    answers.sort(() => Math.random() - 0.5);
    const options = answers.map((answer) => `\`${answer}\``).join(", ");
    const triviaMessage = `${question}\n\n${options}\nANSWER \`WILL REVEAL AFTER 30 SECONDS\``;
    msg.reply(triviaMessage).then(async (msg) => {
      await delay(30000);
      const triviaMessage2 = `${question}\n\n${options}\n**ANSWER:** \`${correctAnswer}\``;
      msg.edit({ content: triviaMessage2});
    });
  },
};
