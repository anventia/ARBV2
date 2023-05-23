const { SlashCommandBuilder } = require("discord.js");
const _ = require('lodash');
const { prefix } = require("../../config.json");

// Command Data
const name = "ping";
const description = "Tests latency.";
const commandData = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description);
const aliasData = _.cloneDeep(commandData).setName(prefix+name);

module.exports = {
	data: commandData,
    alias: aliasData,

	async execute(client, interaction) {
		await interaction.reply(`Pong! Latency is: ${client.ws.ping}ms`)
	}
}