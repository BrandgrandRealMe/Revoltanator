const { CommandBuilder } = require("../Commands.js");

module.exports = {
  command: new CommandBuilder()
    .setName("dadjoke")
    .setDescription("Get a random dadjoke!"),
  run: async function (msg, data) {
    async function fetchJoke() {
      const response = await fetch("http://icanhazdadjoke.com", {
        headers: {
          Accept: "application/json",
        },
      });
      const data = response.json();
      return data;
    }
    const { joke } = await fetchJoke();
    const image = "https://alekeagle.com/assets/dad.518f1968.png";
    msg.reply({
      content: joke,
      masquerade: {
        name: "Dad",
        avatar: image,
      },
    });
  },
};
