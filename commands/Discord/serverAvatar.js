const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const _ = require('lodash');
const { prefix } = require("../../config.json");

// Command Data //
const name = "serveravatar";
const commandData = new SlashCommandBuilder()
    .setName(name);
const aliasData = _.cloneDeep(commandData).setName(prefix+name);


module.exports = {
	data: commandData,
    alias: aliasData,

	async execute(client, interaction) {
        // Gather Data //
        const guild = interaction.guild;
        const name = guild.name;
        const url = guild.iconURL({format: 'png', size: 1024});


        // Send Output //
        const output = new EmbedBuilder()
            .setColor(global.embedBlue)
            .setTitle(`Icon for ${name}`)
            .setImage(url);
        await interaction.reply({embeds: [output]});
	}
}