const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { e } = require("mathjs");
const server = require("./server");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("user")
		.setDescription("Gets information about specified user")
        .addStringOption(option => option
            .setName("user")
            .setDescription("Specify a user")
            .setRequired(true)
        ),
	async execute(client, interaction) {
        // Setup //
        let input = interaction.options.getString("user").trim();
        let member;
        await interaction.guild.members.fetch();
        
        if(input == "me") {
            member = interaction.guild.members.cache.get(interaction.member.id);
        } else {

            if(input.includes("<")) {
                input = input.replace("<", "").replace(">", "").replace("@", "");
            }

            member = interaction.guild.members.cache.get(input);
        }

        if(member == null) {
            await f.sendMessage("Error: User not found!", global.embedRed, interaction, "reply");
            return;
        }

        user = member.user;


        // Debug //
        // console.log(member);
        // console.log(user);
        // console.log("- - - - - - - - - - - -")
        // console.log(member.presence)
        // console.log(member.presence.activities);


        // Basic Information //
        let url = user.avatarURL();
        let tag = user.tag; 
        let username = user.username;
        let id = user.id;
        let discordJoinDate = user.createdAt.toString().split(" ").slice(0, 4).join(" ");

        let status;
        try { status = member.presence.status; }
        catch { status = "invisible"; }
        let statusIcon;
        switch(status) {
            case "online":
                statusIcon = "<:online:721873982927929384>"; 
                status = "Online"; 
                break;

            case "dnd":
                statusIcon = "<:dnd:721873982772740148>"; 
                status = "Do Not Disturb";
                break;

            case "idle":
                statusIcon = "<:idle:721873982613225472>"; 
                status = "Idle";
                break;

            case "invisible":
                statusIcon = "<:invisible:721873982894243921>"; 
                status = "Offline";
                break;
                
            case "streaming":
                statusIcon = "<:streaming:721873982801969162>"; 
                status = "Streaming";
                break;
        }

        let firstStatus = true;
        for(let activity of member.presence.activities) {
            switch(activity.name) {
                case "Custom Status":
                    let emoji = activity.emoji;
                    if(emoji == null) emoji = "";
                    status = `${emoji} ${activity.state}\n`;
                    firstStatus = false;
                    break;
                case "Spotify":
                    if(firstStatus) { status = ""; firstStatus = false; }
                    status += "Listening to Spotify\n\n";
                    break;
                default:
                    if(firstStatus) { status = ""; firstStatus = false; }
                    status += `${await f.capitalize(activity.type.toLowerCase())} ${activity.name}\n\n`;
                    break;
            }
        }

        
        // Server-Specific Information //
        let color = member.displayHexColor;
        let serverJoinDate = member.joinedAt.toString().split(" ").slice(0, 4).join(" ");
        let nickname = member.displayName;
        let numRoles = member._roles.length;
        let topRole = member.roles.highest;
  
        
        // Newline modifiers // 
        let nicknameNL = nickname.length >= 18 ? "\n" : "";


        // Sent Output //
        const output = new MessageEmbed() 
            .setColor(color)                        
            .setTitle(`Information for user ${username}`)
            .setDescription(`${statusIcon} ${status}`)
            .setThumbnail(url)
            .addFields(
                { name: "Basic Information:", value: "Global Username:\nID:\nDiscord Join Date:", inline: true },
                { name: global.blank, value: global.blank, inline: true},
                { name: global.blank, value: `${tag}\n${id}\n${discordJoinDate}`, inline: true},

                { name: "Server-Specific Information:", value: `Server Join Date:\nNickname:${nicknameNL}\nNumber of roles:\nTop Role:`, inline: true },
                { name: global.blank, value: global.blank, inline: true},
                { name: global.blank, value: `${serverJoinDate}\n${nickname}\n${numRoles}\n${topRole}`, inline: true}
            );


		await interaction.reply({embeds: [output]})
	}
}