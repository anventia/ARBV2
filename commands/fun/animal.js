const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const _ = require('lodash');
const { prefix } = require("../../config.json");

// Command Data
const name = "animal";
const description = "Shows a random animal picture";
const commandData = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description)
    .addStringOption(option => option
        .setName("animal")
        .setDescription("Specify an animal")
        .setRequired(true)
    );
const aliasData = _.cloneDeep(commandData).setName(prefix+name);


module.exports = { 
	data: commandData,
    alias: aliasData,

	async execute(client, interaction) {
        // Gather Data //
        let url;
        let img;

        switch(interaction.options.getString("animal").toLowerCase()) {
            case "cat":
                url = "http://api.thecatapi.com/v1/images/search";
                img = (await f.getJSON(url))[0].url;
                break;

            case "dog":
                url = "http://api.thedogapi.com/v1/images/search";
                img = (await f.getJSON(url))[0].url;
                break;

            case "fox":
                url = "https://some-random-api.ml/animal/fox";
                img = (await f.getJSON(url)).image;
                break;

            case "panda":
                url = "https://some-random-api.ml/animal/panda";
                img = (await f.getJSON(url)).image;
                break;

            case "bird":
                url = "https://some-random-api.ml/animal/bird";
                img = (await f.getJSON(url)).image;
                break;

            default:
                await f.sendMessage("Error: Animal not found!", embedRed, interaction, "reply", true);
                return;

        }


        // Send Output //
        const catembed = new EmbedBuilder()
            .setColor(embedBlue)
            .setImage(img);
        await interaction.reply({embeds: [catembed]});
	}
}