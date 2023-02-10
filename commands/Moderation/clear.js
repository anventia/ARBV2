const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");



module.exports = {
	data: new SlashCommandBuilder()
		.setName("clear")
		.setDescription("Clears a certian amount of messages from a channel. (Mod Only)")
        .addIntegerOption(option => option
            .setName("amount")
            .setDescription("Amount of messages to clear. [0 < n <= 100]")
            .setRequired(true)
        ),
	async execute(client, interaction) {
        let amount = interaction.options.getInteger("amount");
        if(amount > 100 || amount < 1) {
            await f.sendMessage(`Amount must be in range 1-100!`, embedRed, interaction, "reply", true);
            return;
        }
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            await f.sendMessage(`You are missing the Manage Messages permission!`, embedRed, interaction, "reply", true);
            return;
        }

        const messages = await interaction.channel.messages.fetch({limit: amount});
        await interaction.channel.bulkDelete(messages);

		await f.sendMessage(`Successfully cleared ${amount} messages.`, embedGreen, interaction, "reply", true);
	}
}