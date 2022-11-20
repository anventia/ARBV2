const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, DataResolver } = require("discord.js");


module.exports = { 
	data: new SlashCommandBuilder()
		.setName("dog")
		.setDescription("Shows a random dog picture!"),
	async execute(client, interaction) {
        // Gather Data //
        const url = "http://api.thedogapi.com/v1/images/search";
        let img = (await f.getJSON(url))[0].url;


        // Send Output //
        const dogembed = new MessageEmbed()
            .setColor(global.embedBlue)
            .setImage(img);
        await interaction.reply({embeds: [dogembed]});
	}
}