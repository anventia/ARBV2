const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");


module.exports = {
	data: new SlashCommandBuilder()
		.setName("-test")
		.setDescription("Test"),
	async execute(client, interaction) {
		console.error("test");

		const testEmbed = new EmbedBuilder()
			.setColor(embedBlue)
			.setTitle("test")
			.addFields(
				{name: "Testing", value: "```fix\nTest        1\nTest        2\nTest        3```", inline: false }
			);

		await interaction.reply({embeds: [testEmbed]});
	}
}