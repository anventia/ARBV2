const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const _ = require('lodash');
const { prefix } = require("../../config.json");

// Command Data //
const name = "apod";
const commandData = new SlashCommandBuilder()
    .setName(name);
const aliasData = _.cloneDeep(commandData).setName(prefix+name);

//Command-Specific Data
const { apodKey } = require("../../config.json");


module.exports = {
	data: commandData,
    alias: aliasData,

	async execute(client, interaction) {
        // Gather Data //
        const url = "https://api.nasa.gov/planetary/apod?api_key="+apodKey;
        let json = await f.getJSON(url);
        let img = json.hdurl;
        let title = json.title;
        let exp = json.explanation;


        // Send Output //
        const apod = new EmbedBuilder()
            .setColor(embedBlue)
            .setTitle(title)
            .setURL("https://apod.nasa.gov/apod/astropix.html")
            .setImage(img)
            .setFooter({text: exp});
        await interaction.reply({embeds: [apod]});    
	}
}