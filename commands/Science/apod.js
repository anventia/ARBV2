const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, DataResolver } = require("discord.js");
const { apodKey } = require("../../config.json");


module.exports = {
	data: new SlashCommandBuilder()
		.setName("apod")
		.setDescription("Shows the NASA Astronomy Picture of the Day"),
	async execute(client, interaction) {
        // Gather Data //
        const url = "https://api.nasa.gov/planetary/apod?api_key="+apodKey;
        let json = await f.getJSON(url);
        let img = json.hdurl;
        let title = json.title;
        let exp = json.explanation;


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