const { SlashCommandBuilder } = require("discord.js");


module.exports = {
	data: new SlashCommandBuilder()
		.setName("db")
		.setDescription("Test"),
	async execute(client, interaction) {
		console.error("test");
		await interaction.reply(`test`)
	}
}