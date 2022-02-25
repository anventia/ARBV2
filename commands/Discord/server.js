const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, IntegrationApplication } = require('discord.js');
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Shows server information'),
	async execute(interaction) {
        var guild = interaction.guild;
        var id = interaction.guildId;
        var name = guild.name;
        var iconURL = guild.iconURL();

        // Member Information //
        var owner = guild.ownerId;
        var member_count = guild.memberCount;
        var members = await guild.members.fetch();
        var admins = members.filter(m => m.permissions.has(new Permissions(Permissions.FLAGS.ADMINISTRATOR)) === true && m.user.bot === false).size;
        var users = members.filter(m => m.user.bot === false).size;
        var bots = members.filter(m => m.user.bot === true).size;
        
        
        // Server Information //
        var roles = guild.roles.cache.size;
        var emotes = guild.emojis.cache.size;


        // Channel Information //
        var all_channels = await guild.channels.fetch();
        var categories = all_channels.filter(c => c.type === 'GUILD_CATEGORY').size;
        var text_channels = all_channels.filter(c => c.type === 'GUILD_TEXT').size;
        var voice_channels = all_channels.filter(c => c.type === 'GUILD_VOICE').size;
        var channels = text_channels + voice_channels;
        var afk = guild.afkChannelId;
        if(afk == null) { afk = 'No AFK channel set'; }
        else { afk = '<#' + afk + '>'; }


        // Other Information //
        var created = new Date(guild.createdTimestamp);
        var created_year = created.getFullYear();
        var created_month = await f.twoDigits(created.getMonth().toString());
        var created_date = await f.twoDigits(created.getDate().toString());
        var joined = new Date(guild.joinedTimestamp);
        var joined_year = joined.getFullYear();
        var joined_month = await f.twoDigits(joined.getMonth().toString());
        var joined_date = await f.twoDigits(joined.getDate().toString());
        

        // Create Embed //
		const serverEmbed = new MessageEmbed() 
            .setColor(global.embedBlue)
            .setTitle(`Information for "${name}"`)
            .setThumbnail(iconURL)
            .addFields(
                { name: 'Member Information:', value: 'Owner:\nHuman Administrators:\nTotal Members:\nUsers:\nBots:', inline: true},
                { name: global.blank, value: global.blank, inline: true},
                { name: global.blank, value: `<@${owner}>\n${admins}\n${member_count}\n${users}\n${bots}`, inline: true }
            )
            .addFields(
                { name: 'Server Information:', value: 'Roles:\nEmotes:', inline: true},
                { name: global.blank, value: global.blank, inline: true},
                { name: global.blank, value: `${roles}\n${emotes}`, inline: true }
            )
            .addFields(
                { name: 'Channel Information:', value: 'Categories:\nTotal Channels:\nText Channels:\nVoice Channels:\nAFK Voice Channel:', inline: true},
                { name: global.blank, value: global.blank, inline: true},
                { name: global.blank, value: `${categories}\n${channels}\n${text_channels}\n${voice_channels}\n${afk}`, inline: true }
            )
            .addFields(
                { name: 'Other Information:', value: 'ID:\nCreation Date\nBot Join Date:', inline: true},
                { name: global.blank, value: global.blank, inline: true},
                { name: global.blank, value: `${id}\n${created_year} / ${created_month} / ${created_date}\n${joined_year} / ${joined_month} / ${joined_date}`, inline: true }
            );
        await interaction.reply({embeds: [serverEmbed]});
	}
}