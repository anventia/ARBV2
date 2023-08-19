const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");
const _ = require('lodash');
const { prefix } = require("../../config.json");

// Command Data // //
const name = "config";
const description = "Bot configuration (Administrator Only)";
const commandData = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description)
    .addChannelOption(option => option
        .setName("warningschannel")
        .setDescription("Channel to send warning messages")
        .setRequired(false)
        .addChannelTypes(0)
    );
const aliasData = _.cloneDeep(commandData).setName(prefix+name);


module.exports = {
	data: commandData,
    alias: aliasData,

	async execute(client, interaction) {
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            await f.sendMessage("You are missing the Administrator permission!", embedRed, interaction, "reply", true);
            return;
        }

        const tag = await Tags.findOne({ where: { server: interaction.guildId } });
        let chId = tag.get("warnChannel");

        if(interaction.options.getChannel("warningschannel") != null) {
            chId = interaction.options.getChannel("warningschannel").id;
            try {
                await Tags.update({ warnChannel: chId }, { where: { server: chId } })
            } catch(err) {
                await f.sendConsole("An error occured!", err, embedRed, interaction, "reply");  // Error handling
                return
            }
        }


        // Send Output //
		const testEmbed = new EmbedBuilder()
			.setColor(embedBlue)
			.setTitle("Server Config")
			.addFields(
				{ name: "Warn Channel", value: `<#${chId}>`, inline: false }
			);
	
		await interaction.reply({embeds: [testEmbed]});
	}
}