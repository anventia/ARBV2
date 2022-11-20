const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, DataResolver } = require("discord.js");
const fetch = require("node-fetch");
const { apodKey } = require("../../config.json");


module.exports = {
	data: new SlashCommandBuilder()
		.setName("apod")
		.setDescription("Shows the NASA Astronomy Picture of the Day"),
	async execute(client, interaction) {
        // Gather Data //
        const url = "https://api.nasa.gov/planetary/apod?api_key="+apodKey;
        let img = await fetch(url)
            .then(res => res.json())
            .then(json => { return json.hdurl; });
        let title = await fetch(url)
            .then(res => res.json())
            .then(json => { return json.title; });
        let exp = await fetch(url)
            .then(res => res.json())
            .then(json => { return json.explanation; });


        // Send Output //
        const apod = new MessageEmbed()
            .setColor(global.embedBlue)
            .setTitle(title)
            .setURL("https://apod.nasa.gov/apod/astropix.html")
            .setImage(img)
            .setFooter(exp);
        await interaction.reply({embeds: [apod]});    
	}
}