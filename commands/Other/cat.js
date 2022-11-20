const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, DataResolver } = require("discord.js");
const fetch = require("node-fetch");


module.exports = {
	data: new SlashCommandBuilder()
		.setName("cat")
		.setDescription("Shows a random cat picture and cat fact!"),
	async execute(client, interaction) {
        // Gather Data //
        const url = "http://api.thecatapi.com/v1/images/search";
        let img = await fetch(url)
            .then(res => res.json())
            .then(json => { return json[0].url; });

        if(Math.floor(Math.random()*10000) < 1134) {
            img = "https://cdn.discordapp.com/attachments/1043766567512571925/1043766754758897694/cat-dancing.gif";
        }


        // Send Output //
        const catembed = new MessageEmbed()
            .setColor(global.embedBlue)
            .setImage(img);
        await interaction.reply({embeds: [catembed]});    
	}
}