const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Tests latency"),
	async execute(client, interaction) {
		await interaction.reply(`Pong! Latency is: ${client.ws.ping}ms`)
	}
}