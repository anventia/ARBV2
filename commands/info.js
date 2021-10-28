const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Shows bot information'),
	async execute(interaction) {
		const infoEmebed = new MessageEmbed() 
            .setColor(global.embedBlue)
            .setAuthor('Information page for ARB.V2', global.iconurl)
            .addFields(
                { name: 'Basic Info:', value: 'Created On:\nVersion:\n', inline: true},
                { name: global.empty, value: global.empty, inline: true},
                { name: global.empty, value: '2021/10/27\nv2.0.0', inline: true }

            )
            .addFields(
                { name: 'Credits:', value: 'Created By:\nCreated With:\n', inline: true},
                { name: global.empty, value: global.empty, inline: true},
                { name: global.empty, value: '<@327948165468782595>\nDiscord.js', inline: true }

            );
        await interaction.reply({embeds: [infoEmebed]});
	}
}