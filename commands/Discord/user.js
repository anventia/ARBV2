const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const _ = require('lodash');
const { prefix } = require("../../config.json");

// Command Data 
const name = "user";
const description = "Gets information about a specified user.";
const commandData = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description)
    .addUserOption(option => option
        .setName("user")
        .setDescription("Specify a user")
        .setRequired(true)
    );
const aliasData = _.cloneDeep(commandData).setName(prefix+name);


module.exports = {
	data: commandData,
    alias: aliasData,

	async execute(client, interaction) {
        // Setup //
        let user = interaction.options.getUser("user");
        let member = await interaction.guild.members.fetch(user.id);


        // Basic Information //
        let url = user.displayAvatarURL({format: 'png', size: 1024});
        let display = user.displayName; 
        let username = user.username;
        let id = user.id;
        let discordJoinDate = user.createdAt.toString().split(" ").slice(0, 4).join(" ");

        let status;
        try { status = member.presence.status; }
        catch { status = "invisible"; }
        let types = [
            "Playing a Game",
            "Streaming",
            "Listening",
            "Watching",
            "Custom",
            "Competing"
        ];
        let ids = [
            "721873982927929384",
            "721873982772740148",
            "721873982613225472",
            "721873982894243921",
            "721873982801969162"
        ];
        let statuses = [
            "online",
            "dnd",
            "idle",
            "invisible",
            "streaming"
        ]
        let statusIcon = `<:${status}:${ids[statuses.indexOf(status)]}>`
        status = (await f.capitalize(status)).replace("Dnd", "Do Not Disturb").replace("Invisible", "Offline") + "\n\n";

        let firstStatus = true;
        if(member.presence != null) {
            for(let activity of member.presence.activities) {  // Loop through each activity
                switch(activity.name) {
                    case "Custom Status":
                        let emoji = activity.emoji;
                        if(emoji == null) emoji = "";
                        status = `${emoji} ${activity.state}\n\n`;
                        firstStatus = false;
                        break;

                    case "Spotify":
                        if(firstStatus) { status = ""; firstStatus = false; }
                        status += "Listening to Spotify\n\n";
                        break;
                        
                    default:
                        if(firstStatus) { status = ""; firstStatus = false; }
                        status += `${types[activity.type]} ${activity.name}\n\n`;
                        break;
                }
            }
        }

        
        // Server-Specific Information //
        let color = member.displayHexColor;
        let serverJoinDate = member.joinedAt.toString().split(" ").slice(0, 4).join(" ");
        let nickname = member.displayName;
        let numRoles = member._roles.length;
        let topRole = member.roles.highest;
  
        
        // Newline modifiers // 
        let nicknameNL = nickname.length >= 22 ? "\n" : "";


        // Send Output //
        const output = new EmbedBuilder() 
            .setColor(color)                        
            .setTitle(`Information for user ${username}`)
            .setThumbnail(url)
            .addFields(
                { name: "Status Information", value: `${statusIcon} ${status}*Use </status:1110431081213198384> to see more information.*`, inline: false },

                { name: "Basic Information:", value: "Global Username:\nDisplay Name:\nID:\nDiscord Join Date:", inline: true },
                { name: emptyString, value: emptyString, inline: true },
                { name: emptyString, value: `${username}\n${display}\n${id}\n${discordJoinDate}`, inline: true },

                { name: "Server-Specific Information:", value: `Server Join Date:\nNickname:${nicknameNL}\nNumber of roles:\nTop Role:`, inline: true },
                { name: emptyString, value: emptyString, inline: true },
                { name: emptyString, value: `${serverJoinDate}\n${nickname}\n${numRoles}\n${topRole}`, inline: true }
            );


		await interaction.reply({embeds: [output]});
	}
}