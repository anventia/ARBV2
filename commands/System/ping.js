const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Tests latency'),
	async execute(interaction) {
		await interaction.reply(`Pong! Latency is: ${0-(Date.now() - interaction.createdTimestamp)}ms`);
	}
}