const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, DataResolver } = require("discord.js");
const fetch = require("node-fetch");


module.exports = {
	data: new SlashCommandBuilder()
		.setName("cat")
		.setDescription("Shows a random cat picture and cat fact!"),
	async execute(client, interaction) {
        const url = "http://api.thecatapi.com/v1/images/search";

        fetch(url)
            .then(res => res.json())
            .then(json => { 
                console.log(json[0].url);
                output(json[0].url);
            });

        async function output(url) {
            const catembed = new MessageEmbed()
                .setColor(global.embedBlue)
                .setImage(url)
            await interaction.reply({embeds: [catembed]});
        }
        

        

        
	}
}