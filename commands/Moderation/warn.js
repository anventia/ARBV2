const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");
const _ = require('lodash');
const { prefix } = require("../../config.json");

// Command Data //
const name = "warn";
const description = "Warn a user. (Moderator Only)";
const commandData = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description)
    .addUserOption(option => option
        .setName("user")
        .setDescription("Specify a user")
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName("reason")
        .setDescription("Reason for warn")
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName("id")
        .setDescription("ID of offending message (optional)")
        .setRequired(false)
    );  
const aliasData = _.cloneDeep(commandData).setName(prefix+name);


module.exports = {
	data: commandData,
    alias: aliasData,

	async execute(client, interaction) {
		if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            await f.sendMessage("You are missing the Manage Messages permission!", embedRed, interaction, "reply", true);
            return;
        }

        const tag = await Tags.findOne({ where: { server: interaction.guildId } });
        let chId = tag.get("warnChannel");
        if(chId == "") {    
            await f.sendMessage(`No warning channel set! Use </config:${commandIds["config"]}> to set it!`, embedRed, interaction, "reply", true);
            return;
        }

        


        await f.sendMessage(`Warned user`, embedRed, interaction, "reply", false);
	}
}