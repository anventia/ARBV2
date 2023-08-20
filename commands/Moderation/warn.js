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
        .setMaxLength(1024)
    )
    .addStringOption(option => option
        .setName("message")
        .setDescription("Link to offending message (optional)")
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


        // Data //
        const author  = interaction.member;
        const channel = interaction.channel;

        const user    = interaction.options.getUser("user");
        const member  = await interaction.guild.members.fetch(user.id);
        const url     = user.displayAvatarURL({format: 'png', size: 1024});
        const display = user.displayName; 
        const userId  = user.id;
        const color   = member.displayHexColor;

        const reason  = interaction.options.getString("reason");
        let message;
        try { message = interaction.options.getString("message")}
        catch(err) {}

        const warnChannel = await interaction.guild.channels.fetch(chId);

        let warningsJSON = tag.get("warnings");
        let numWarns = warningsJSON[userId];
        if(!numWarns) numWarns = 0;


        // Send Output //
        const warning = new EmbedBuilder()
			.setColor(embedBlue)
			.setTitle(`Warning #${numWarns+1}`)
            .setThumbnail(url)
			.addFields(
				{ name: "User", value: `<@${userId}>`, inline: true },
				{ name: "Warned By", value: `${author}`, inline: true },
                { name: "Channel", value: `${channel}`, inline: true },
                { name: "Reason", value: `${reason}`, inline: false }
			);
        if(message != null) {
            warning.addFields({ name: "Message", value: `${message}`, inline: false });
        }

        await warnChannel.send({embeds: [warning]});
        
        const output = new EmbedBuilder()
            .setColor(embedBlue)
            .addFields({ name: `${display} has been warned for the following reason:`, value: `${reason}`})
            .setFooter({ text: `This is warning #${numWarns+1}` });
	
		await interaction.reply({embeds: [output]});


        // Update Database //
        warningsJSON[userId] = numWarns + 1;
 
        try { await Tags.update({ warnings: warningsJSON }, { where: { server: interaction.guildId } }) }
        catch(err) { await f.sendError(err) }
	}
}