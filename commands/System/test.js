const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("test")
		.setDescription("Test"),
	async execute(client, interaction) {
		console.error("test");
		await interaction.reply(`test`)
	}
}