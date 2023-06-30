const { CommandBuilder } = require("../Commands.js");
const google = require("googlethis");
const Embed = require("../util/embed");

const options = {
  page: 0,
  safe: true, // Safe Search
  parse_ads: false, // If set to true sponsored results will be parsed
  additional_params: {
    hl: "en",
  },
};

module.exports = {
  command: new CommandBuilder()
    .setName("google")
    .setDescription(
      "Google something. Gets the first page off of the search page."
    )
    .addTextOption((o) =>
      o
        .setName("query")
        .setDescription("The thing you want to search")
        .setRequired(true)
    ),
  run: async function (msg, data) {
    const response = await google.search(data.get("query").value, options);
    const gsdata = response.results[0];
    const title = gsdata.title;
    const desc = gsdata.description;
    const url = gsdata.url;

    const embed = new Embed()
      .setDescription(`## ${title}\n${desc}`)
      .setTitle(data.get("query").value)
      .setColor(`#2DC5F8`);

    msg.reply({ content: url, embeds: [embed] });
  },
};
