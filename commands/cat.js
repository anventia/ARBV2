const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('cat')
		.setDescription('Shows a random cat picture and cat fact!'),
	async execute(interaction) {
        var imgJSON;
        

        let cat = function() { fetch('https://api.thecatapi.com/v1/images/search')
            .then(res => res.text())
            .then(res => {return res}); 
        }

        console.log(cat());
        return;
        const catembed = new MessageEmbed()
            .setColor(global.embedBlue)
            .setImage(imgJSON)
		await interaction.reply({embed: [catembed]});
	}
}