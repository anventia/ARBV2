const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");


module.exports = {
	data: new SlashCommandBuilder()
		.setName("cat")
		.setDescription("Shows a random cat picture and cat fact!"),
	async execute(client, interaction) {
        const url = "http://api.thecatapi.com/v1/images/search";
        let output;
        return;
        fetch(url)
            .then(res => res.json())
            .then(json => { 
                output = json;
                console.log(output);

                const catembed = new MessageEmbed()
                .setColor(global.embedBlue)
                //.setImage(imgJSON)
		        
            });
        
            await interaction.reply({embed: [catembed]});

        
	}
}