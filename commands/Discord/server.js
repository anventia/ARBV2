const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, IntegrationApplication } = require("discord.js");
const { Permissions } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("server")
		.setDescription("Shows server information"),
	async execute(client, interaction) {
        let guild = interaction.guild;
        let id = interaction.guildId;
        let name = guild.name;
        let iconURL = guild.iconURL();

        // Member Information //
        let owner = guild.ownerId;
        let member_count = guild.memberCount;
        let members = await guild.members.fetch();
        let admins = members.filter(m => m.permissions.has(new Permissions(Permissions.FLAGS.ADMINISTRATOR)) === true && m.user.bot === false).size;
        let users  = members.filter(m => m.user.bot === false).size;
        let bots   = members.filter(m => m.user.bot === true).size;
        
        
        // Server Information //
        let roles = guild.roles.cache.size;
        let emotes = guild.emojis.cache.size;


        // Channel Information //
        let all_channels = await guild.channels.fetch();
        console.log(all_channels);
        let categories     = all_channels.filter(c => c.type === "GUILD_CATEGORY").size;
        let text_channels  = all_channels.filter(c => c.type === "GUILD_TEXT").size;
        let voice_channels = all_channels.filter(c => c.type === "GUILD_VOICE").size;
        let channels = text_channels + voice_channels;
        let afk = guild.afkChannelId;
        if(afk == null) { afk = "No AFK channel set"; }
        else { afk = "<#" + afk + ">"; }


        // Other Information //
        let created = new Date(guild.createdTimestamp);
        let created_year = created.getFullYear();
        let created_month = await f.twoDigits(created.getMonth().toString());
        let created_date = await f.twoDigits(created.getDate().toString());
        let joined = new Date(guild.joinedTimestamp);
        let joined_year = joined.getFullYear();
        let joined_month = await f.twoDigits(joined.getMonth().toString());
        let joined_date = await f.twoDigits(joined.getDate().toString());
        

        // Send Output //
		const serverEmbed = new MessageEmbed() 
            .setColor(global.embedBlue)
            .setTitle(`Information for "${name}"`)
            .setThumbnail(iconURL)
            .addFields(
                { name: "Member Information:", value: "Owner:\nHuman Administrators:\nTotal Members:\nUsers:\nBots:", inline: true},
                { name: global.blank, value: global.blank, inline: true},
                { name: global.blank, value: `<@${owner}>\n${admins}\n${member_count}\n${users}\n${bots}`, inline: true }
            )
            .addFields(
                { name: "Server Information:", value: "Roles:\nEmotes:", inline: true},
                { name: global.blank, value: global.blank, inline: true},
                { name: global.blank, value: `${roles}\n${emotes}`, inline: true }
            )
            .addFields(
                { name: "Channel Information:", value: "Categories:\nTotal Channels:\nText Channels:\nVoice Channels:\nAFK Voice Channel:", inline: true},
                { name: global.blank, value: global.blank, inline: true},
                { name: global.blank, value: `${categories}\n${channels}\n${text_channels}\n${voice_channels}\n${afk}`, inline: true }
            )
            .addFields(
                { name: "Other Information:", value: "ID:\nCreation Date\nBot Join Date:", inline: true},
                { name: global.blank, value: global.blank, inline: true},
                { name: global.blank, value: `${id}\n${created_year} / ${created_month} / ${created_date}\n${joined_year} / ${joined_month} / ${joined_date}`, inline: true }
            );
        await interaction.reply({embeds: [serverEmbed]});
	}
}