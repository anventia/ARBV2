const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Test'),
	async execute(client, interaction) {
		await interaction.reply(`test`)
	}
}