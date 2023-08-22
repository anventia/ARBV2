const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");
const _ = require('lodash');
const { prefix } = require("../../config.json");

// Command Data //
const name = "unwarn";
const commandData = new SlashCommandBuilder()
    .setName(name)
    .addStringOption(option => option
        .setName("warning")
        .setDescription("Link to warning message to remove")
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName("reason")
        .setDescription("Reason for unwarn")
        .setRequired(true)
        .setMaxLength(1024)
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
        

        // Data // https://discord.com/channels/[serverId]/[channelId]/[messageId]
        const warningLink = interaction.options.getString("warning").replace("https://discord.com/channels/", "").split("/");
        const warning = await (await interaction.guild.channels.fetch(warningLink[1])).messages.fetch(warningLink[2]);
        const warningReason = interaction.options.getString("reason");

        let url, user, author, channel, reason, message, title, number;
        try {
            warningEmbed = warning.embeds[0];
            const fields = warningEmbed.fields;

            title   = warningEmbed.data["title"];
            number  = title.replace("Warning #", "");
            user    = fields[0]["name"];
            author  = fields[1]["name"];
            channel = fields[2]["name"];
            reason  = fields[3]["name"];
            if(user != "User" || author != "Warned By" || channel != "Channel" || reason != "Reason" || title == "[UNWARNED]") { 
                throw new Error("Invalid warning message!" );
            }

            url     = warningEmbed.thumbnail["url"];
            user    = fields[0]["value"];
            author  = fields[1]["value"];
            channel = fields[2]["value"];
            reason  = fields[3]["value"];
            message = fields[4]["value"] ?? null;

        } catch(err) {
            await f.sendMessage("Invalid warning message!", embedRed, interaction, "reply", true);
            return;
        }
        const userId = user.replace("<", "").replace(">", "").replace("@", "").replace("!", "");

        const locale = interaction.guild.preferredLocale;
        const date = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
		const time = date.toLocaleString(locale, options);
        
        let warningsJSON = tag.get("warnings");
        let numWarns = warningsJSON[userId];
        if(!numWarns) { await f.sendError("Invalid warning message!") }


        // Send Output //
        const edit = new EmbedBuilder()
			.setColor(embedLight)
			.setTitle(`[UNWARNED]`)
            .setThumbnail(url)
			.addFields(
				{ name: "User", value: `${user}`, inline: true },
				{ name: "Warned By", value: `${author}`, inline: true },
                { name: "Channel", value: `${channel}`, inline: true },
                { name: "Reason", value: `${reason}`, inline: false }
			)
            .setFooter({ text: `Warning #${number} removed on ${time}.` });  
        if(message != null) {
            edit.addFields({ name: "Message", value: `${message}`, inline: false });
        }
        edit.addFields(
            { name: "Unwarned By", value: `${interaction.member}`, inline: false },
            { name: "Reason for Unwarn", value: `${warningReason}`, inline: false }
        );

        await warning.edit({embeds: [edit]});
        
        const output = new EmbedBuilder()
            .setColor(embedLight)
            .addFields({ name: `Successfully unwarned user.`, value: `${emptyString}`})
            .setFooter({ text: `They now have ${numWarns-1} warning(s).` });
	
		await interaction.reply({embeds: [output], ephemeral: true});


        // Update Database //
        warningsJSON[userId] = Math.max(numWarns - 1, 0);
 
        try { await Tags.update({ warnings: warningsJSON }, { where: { server: interaction.guildId } }) }
        catch(err) { await f.sendError(err) }
	}
}