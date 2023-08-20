const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const _ = require('lodash');
const { prefix } = require("../../config.json");

// Command Data //
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
        await interaction.reply(await f.time(new Date(), interaction));
    }
}