const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('time')
		.setDescription('Gets UTC time. (YYYY/MM/DD)'),
	async execute(interaction) {
        var date = new Date();
		await interaction.reply(`Time is: ${date.getFullYear()}/${String(date.getMonth()+1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}  ${date.getUTCHours()}:${date.getUTCMinutes()}.${date.getUTCSeconds()} UTC`);
	}
}