const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const _ = require('lodash');
const { prefix } = require("../../config.json");

// Command Data
const name = "status";
const description = "Gets status information about a user.";
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
        let username = user.username;
        let url = user.avatarURL();

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
        let statusColors = [
            "#43b581",
            "#ef4747",
            "#fba71b",
            "#747f8e",
            "#5a3696",
        ]
        let statusIcon = `<:${status}:${ids[statuses.indexOf(status)]}>`
        let statusColor = statusColors[statuses.indexOf(status)];
        status = (await f.capitalize(status)).replace("Dnd", "Do Not Disturb").replace("Invisible", "Offline");
  

        let outputs = [];
        let output = new EmbedBuilder()
            .setColor(statusColor)
            .setTitle(`Status Infornation for user ${username}`)
            .setThumbnail(url)
            .addFields(
                { name: emptyString, value: `${statusIcon} ${status}`, inline: false }
            );
        outputs.push(output);
        
        
        // Gather Activity Data //
        if(member.presence != null) {
            for(let activity of member.presence.activities) {  // Loops through each activity
                let img;
                switch(activity.name) {
                    case "Custom Status":
                        let emoji = activity.emoji;
                        if(emoji == null) emoji = "";
                        status = `${emoji} ${activity.state}\n`;

                        output = new EmbedBuilder()
                            .setColor(statusColor)
                            .setTitle(`Status Infornation for user ${username}`)
                            .setThumbnail(url)
                            .addFields(
                                { name: emptyString, value: `${statusIcon} ${status}`, inline: false }
                            );
                        outputs = [];
                        outputs.push(output);
                        break;

                    case "Spotify":
                        img = activity.assets.largeImageURL();
                        let link = `https://open.spotify.com/track/${activity.syncId}`
                        let title = activity.details;
                        let artist = activity.state;
                        let album = activity.assets.largeText;

                        output = new EmbedBuilder()
                            .setColor("#1ed760")
                            .setThumbnail(img)
                            .addFields(
                                { name: "Listening to Spotify", value: `[**${title}**](${link})\nby ${artist}\non ${album}`, inline: false }
                            );
                        outputs.push(output);
                        break;
                    
                    default:
                        img = activity.assets.largeImageURL();
                        output = new EmbedBuilder()
                            .setColor("#1ed760")
                            .setThumbnail(img)
                            .addFields(
                                { name: `${types[activity.type]}`, value: `**${activity.name}**\n${activity.details}\n${activity.state}`, inline: false }
                            );
                        outputs.push(output);
                        break;
                }
            }
        }


        // Send Output //
        await interaction.reply({embeds: outputs});
    }
}