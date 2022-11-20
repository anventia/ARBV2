const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, DataResolver } = require("discord.js");


module.exports = { 
	data: new SlashCommandBuilder()
		.setName("cat")
		.setDescription("Shows a random cat picture!"),
	async execute(client, interaction) {
        // Gather Data //
        const url = "http://api.thecatapi.com/v1/images/search";
        let img = (await f.getJSON(url))[0].url;

        if(Math.floor(Math.random()*1000000) < 1134) {  // 0.1134% chance of a special image (requested by Krispaca)
            img = "https://cdn.discordapp.com/attachments/1043766567512571925/1043766754758897694/cat-dancing.gif";
        }


        // Send Output //
        const catembed = new MessageEmbed()
            .setColor(global.embedBlue)
            .setImage(img);
        await interaction.reply({embeds: [catembed]});
	}
}