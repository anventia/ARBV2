const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const _ = require('lodash');
const { prefix } = require("../../config.json");

// Command Data //
const name = "topcommands";
const commandData = new SlashCommandBuilder()
    .setName(name);
const aliasData = _.cloneDeep(commandData).setName(prefix+name);

module.exports = {
	data: commandData,
    alias: aliasData,

	async execute(client, interaction) {
		// Data //
		const server = interaction.guild.name;
		const tag = await Tags.findOne({ where: { server: interaction.guildId } });
		let cmdUsage = tag.get("cmdUsage");
		cmdUsage = Object.fromEntries(Object.entries(cmdUsage).sort((a, b) => b[1] - a[1]));  // Sort 
		let topNames = "";
		let topNums = "";

		for(let i=0; i<10; i++) {
			const key = Object.keys(cmdUsage)[i];
			const value = Object.values(cmdUsage)[i];
			if(!(key && value)) break;
			topNames += `</${key}:${commandIds[key]}>\n`;
			topNums += value + "\n";
		}


		// Output //
		const output = new EmbedBuilder()
			.setColor(embedBlue)
			.setTitle(`Top Commands for ${server}`)
			.addFields(
				{ name: "Command", value: `${topNames}`, inline: true },
				{ name: "Number of uses", value: `${topNums}`, inline: true }
			);
	
		await interaction.reply({embeds: [output]});
	}
}