const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const _ = require('lodash');
const { prefix } = require("../../config.json");

// Command Data //
const name = "test";
const description = "Test";
const commandData = new SlashCommandBuilder()
    .setName(name)
	.addStringOption(option => option
		.setName("test")
		.setDescription("test")
		.setRequired(false)
	);
const aliasData = _.cloneDeep(commandData).setName(prefix+name);


module.exports = {
	data: commandData,
    alias: aliasData,

	async execute(client, interaction) {
		const input = interaction.options.getString("test") ?? " ";


		// await globalTags.create({
		// 	globalCmdUsage: {}
		// });


		const testEmbed = new EmbedBuilder()
			.setColor(embedBlue)
			.setTitle("test")
			.addFields(
				{ name: "Testing", value: `\`\`\`${input}\`\`\``, inline: false },
			);
	
		await interaction.reply({embeds: [testEmbed]});
	}
}