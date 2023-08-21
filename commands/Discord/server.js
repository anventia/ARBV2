const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");
const _ = require('lodash');
const { prefix } = require("../../config.json");

// Command Data //
const name = "server";
const commandData = new SlashCommandBuilder()
    .setName(name);
const aliasData = _.cloneDeep(commandData).setName(prefix+name);


module.exports = {
	data: commandData,
    alias: aliasData,

	async execute(client, interaction) {
        // Setup //
        const guild = interaction.guild;
        const id = interaction.guildId;
        const name = guild.name;
        const iconURL = guild.iconURL({format: 'png', size: 1024});


        // Member Information //
        const owner = guild.ownerId;
        const member_count = guild.memberCount;
        const members = await guild.members.fetch();
        const admins = members.filter(m => m.permissions.has(PermissionsBitField.Flags.Administrator) === true && m.user.bot === false).size;
        const users = members.filter(m => m.user.bot === false).size;
        const bots = members.filter(m => m.user.bot === true).size;
        
        
        // Server Information //
        const roles = guild.roles.cache.size;
        const emotes = guild.emojis.cache.size;


        // Channel Information //
        const all_channels = (await guild.channels.fetch()).filter(c => c != null);
        const categories = all_channels.filter(c => c.type == 4).size;
        const text_channels = all_channels.filter(c => c.type == 0).size;
        const voice_channels = all_channels.filter(c => c.type == 2).size;
        const channels = text_channels + voice_channels;
        let afk = guild.afkChannelId;
        if(afk == null) { afk = "No AFK channel set"; }
        else { afk = "<#" + afk + ">"; } 


        // Other Information //
        const created = new Date(guild.createdTimestamp);
        const created_year = created.getFullYear();
        const created_month = await f.twoDigits(created.getMonth().toString());
        const created_date = await f.twoDigits(created.getDate().toString());
        const joined = new Date(guild.joinedTimestamp);
        const joined_year = joined.getFullYear();
        const joined_month = await f.twoDigits(joined.getMonth().toString());
        const joined_date = await f.twoDigits(joined.getDate().toString());
        

        // Send Output //
		const output = new EmbedBuilder() 
            .setColor(embedBlue)
            .setTitle(`Information for "${name}"`)
            .setThumbnail(iconURL)
            .addFields(
                { name: "Member Information:", value: "Owner:\nHuman Administrators:\nTotal Members:\nUsers:\nBots:", inline: true },
                { name: emptyString, value: emptyString, inline: true },
                { name: emptyString, value: `<@${owner}>\n${admins}\n${member_count}\n${users}\n${bots}`, inline: true },

                { name: "Server Information:", value: "Roles:\nEmotes:", inline: true },
                { name: emptyString, value: emptyString, inline: true },
                { name: emptyString, value: `${roles}\n${emotes}`, inline: true },

                { name: "Channel Information:", value: "Categories:\nTotal Channels:\nText Channels:\nVoice Channels:\nAFK Voice Channel:", inline: true },
                { name: emptyString, value: emptyString, inline: true },
                { name: emptyString, value: `${categories}\n${channels}\n${text_channels}\n${voice_channels}\n${afk}`, inline: true },

                { name: "Other Information:", value: "ID:\nCreation Date\nBot Join Date:", inline: true },
                { name: emptyString, value: emptyString, inline: true },
                { name: emptyString, value: `${id}\n${created_year} / ${created_month} / ${created_date}\n${joined_year} / ${joined_month} / ${joined_date}`, inline: true }
            );
        await interaction.reply({embeds: [output]});
	}
}