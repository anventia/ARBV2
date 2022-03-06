const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roles')
		.setDescription('Lists roles in the server.'),
	async execute(client, interaction) {
        const numRoles = 30;  // Number of roles per page
        const numPages = 2;  // Number of pages to display

        var guild = interaction.guild;
        var roles = guild.roles.cache;
        var names = "";
        var output = "";
        console.log(roles);

        for(let i of roles) {  // Gather data from roles
            names += i[1]['name'] + "\n";
            if(String(output).length <= 1000)  { 
                output += "<@&" + i[1]['id'] + "> ";
            } else {
                const serverEmbed = new MessageEmbed() 
                    .setColor(global.embedBlue)
                    .setTitle(`Role information`)
                    .addFields(
                        { name: "List of roles", value: output, inline: true}
                    );

                await interaction.channel.send({embeds: [serverEmbed]});
                output = "";
            }

        }


        const serverEmbed = new MessageEmbed() 
            .setColor(global.embedBlue)
            .setTitle(`Role information`)
            .addFields(
                { name: "List of roles", value: output, inline: true}
            );

            await interaction.reply({embeds: [serverEmbed]});

	}
}