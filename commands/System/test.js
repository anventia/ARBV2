const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const _ = require('lodash');
const { prefix } = require("../../config.json");

// Command Data //
const name = "test";
const description = "Test";
const commandData = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description);
const aliasData = _.cloneDeep(commandData).setName(prefix+name);


module.exports = {
	data: commandData,
    alias: aliasData,

	async execute(client, interaction) {
		const testEmbed = new EmbedBuilder()
			.setColor(embedBlue)
			.setTitle("test")
			.addFields(
				{ name: "Testing", value: "```fix\nTest        1\nTest        2\nTest        3```", inline: false },
				{ name: "Testing 2", value: "`🇨🇦`", inline: false }
			);
	
		await interaction.reply({embeds: [testEmbed]});
	}
}