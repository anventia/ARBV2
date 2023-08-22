const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const _ = require('lodash');
const { prefix, botAdmins } = require("../../config.json");

// Command Data //
const name = "globaltopcommands";
const commandData = new SlashCommandBuilder()
    .setName(name);
const aliasData = _.cloneDeep(commandData).setName(prefix+name);

module.exports = {
	data: commandData,
    alias: aliasData,

	async execute(client, interaction) {

		if(!botAdmins.includes(interaction.member.id)) {
			await f.sendMessage("This command is for bot admins only!", embedRed, interaction, "reply", true);
			return;
		}

		// Data //
		const server = interaction.guild.name;
		const globalTag = await globalTags.findOne({ where: { id: 1 } });
		let globalCmdUsage = globalTag.get("globalCmdUsage");
		globalCmdUsage = Object.fromEntries(Object.entries(globalCmdUsage).sort((a, b) => b[1] - a[1]));  // Sort 
		let topNames = "";
		let topNums = "";

		for(let i=0; i<10; i++) {
			const key = Object.keys(globalCmdUsage)[i];
			const value = Object.values(globalCmdUsage)[i];
			if(!(key && value)) break;
			topNames += `</${key}:${commandIds[key]}>\n`;
			topNums += value + "\n";
		}


		// Output //
		const output = new EmbedBuilder()
			.setColor(embedBlue)
			.setTitle("Global Top Commands for ARB.V2")
			.addFields(
				{ name: "Command", value: `${topNames}`, inline: true },
				{ name: "Number of uses", value: `${topNums}`, inline: true }
			);
	
		await interaction.reply({embeds: [output]});
	}
}