const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const _ = require('lodash');
const { prefix } = require("../../config.json");

// Command Data //
const name = "clear";
const description = "Clears a certian amount of messages from a channel. (Moderator Only)";
const commandData = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description)
    .addIntegerOption(option => option
        .setName("amount")
        .setDescription("Amount of messages to clear. [0 < n <= 100]")
        .setRequired(true)
    );
const aliasData = _.cloneDeep(commandData).setName(prefix+name);


module.exports = {
	data: commandData,
    alias: aliasData,

	async execute(client, interaction) {
        let amount = interaction.options.getInteger("amount");
        if(amount > 100 || amount < 1) {
            await f.sendMessage("Amount must be in range 1-100!", embedRed, interaction, "reply", true);
            return;
        }
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            await f.sendMessage("You are missing the Manage Messages permission!", embedRed, interaction, "reply", true);
            return;
        }

        const messages = await interaction.channel.messages.fetch({limit: amount});
        await interaction.channel.bulkDelete(messages);

		await f.sendMessage(`Successfully cleared ${amount} messages.`, embedGreen, interaction, "reply", true);
	}
}