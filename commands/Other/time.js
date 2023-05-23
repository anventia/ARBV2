const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const _ = require('lodash');
const { prefix } = require("../../config.json");

// Command Data
const name = "time";
const description = "Gets UTC time. (YYYY/MM/DD)";
const commandData = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description);
const aliasData = _.cloneDeep(commandData).setName(prefix+name);


module.exports = {
	data: commandData,
    alias: aliasData,

	async execute(client, interaction) {
        const date = new Date();
		await interaction.reply(`Time is: ${date.getFullYear()}/${String(date.getMonth()+1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}  ${date.getUTCHours()}:${date.getUTCMinutes()}.${date.getUTCSeconds()} UTC`);
	}
}