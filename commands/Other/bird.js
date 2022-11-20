const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, DataResolver } = require("discord.js");


module.exports = { 
	data: new SlashCommandBuilder()
		.setName("bird")
		.setDescription("Shows a random bird picture!"),
	async execute(client, interaction) {
        // Gather Data //
        const url = "https://some-random-api.ml/animal/bird";
        let img = (await f.getJSON(url)).image;


        // Send Output //
        const catembed = new MessageEmbed()
            .setColor(global.embedBlue)
            .setImage(img);
        await interaction.reply({embeds: [catembed]});
	}
}