const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const _ = require('lodash');
const { prefix } = require("../../config.json");

// Command Data //
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
        const user = interaction.options.getUser("user");
        const member = await interaction.guild.members.fetch(user.id);
        const username = user.username;
        const url = user.avatarURL();

        let status;
        try { status = member.presence.status; }
        catch { status = "invisible"; }

        const types = [
            "Playing a Game",
            "Streaming",
            "Listening",
            "Watching",
            "Custom",
            "Competing"
        ];
        const ids = [
            "721873982927929384",
            "721873982772740148",
            "721873982613225472",
            "721873982894243921",
            "721873982801969162"
        ];
        const statuses = [
            "online",
            "dnd",
            "idle",
            "invisible",
            "streaming"
        ]
        const statusColors = [
            "#43b581",
            "#ef4747",
            "#fba71b",
            "#747f8e",
            "#5a3696",
        ]
        const statusIcon = `<:${status}:${ids[statuses.indexOf(status)]}>`
        const statusColor = statusColors[statuses.indexOf(status)];
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
                        const link = `https://open.spotify.com/track/${activity.syncId}`
                        const title = activity.details;
                        const artist = activity.state;
                        const album = activity.assets.largeText;

                        output = new EmbedBuilder()
                            .setColor("#1ed760")
                            .setThumbnail(img)
                            .addFields(
                                { name: "Listening to Spotify", value: `[**${title}**](${link})\nby ${artist}\non ${album}`, inline: false }
                            );
                        outputs.push(output);
                        break;
                    
                    default:
                        try { img = activity.assets.largeImageURL(); }
                        catch(err) { img = "" };
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