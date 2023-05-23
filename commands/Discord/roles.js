const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const _ = require('lodash');
const { prefix } = require("../../config.json");

// Command Data
const name = "roles";
const description = "Lists roles in the server.";
const commandData = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description);
const aliasData = _.cloneDeep(commandData).setName(prefix+name);


module.exports = {
	data: commandData,
    alias: aliasData,

	async execute(client, interaction) {
        // Gather Data //
        const numRoles = 30;  // Number of roles per page
        const numPages = 2;  // Number of pages to display

        const guild = interaction.guild;
        const roles = guild.roles.cache;
        let names = "";
        let output = "";

        
        // Get roles //
        for(let i of roles) {
            names += i[1]["name"] + "\n";
            if(String(output).length <= 1000)  { 
                output += "<@&" + i[1]["id"] + "> ";
            } else {
                const serverEmbed = new EmbedBuilder() 
                    .setColor(embedBlue)
                    .setTitle(`Role information`)
                    .addFields(
                        { name: "List of roles", value: output, inline: true }
                    );

                await interaction.channel.send({embeds: [serverEmbed]});
                output = "";
            }

        }


        // Send Output //
        const serverEmbed = new EmbedBuilder() 
            .setColor(embedBlue)
            .setTitle(`Role information`)
            .addFields(
                { name: "List of roles", value: output, inline: true }
            );

            await interaction.reply({embeds: [serverEmbed]});

	}
}