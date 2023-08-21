const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const _ = require('lodash');
const { prefix } = require("../../config.json");

// Command Data //
const name = "channel";
const commandData = new SlashCommandBuilder()
    .setName(name)
    .addChannelOption(option => option
        .setName("channel")
        .setDescription("Specify a channel")
        .setRequired(true)
    );
const aliasData = _.cloneDeep(commandData).setName(prefix+name);


module.exports = {
	data: commandData,
    alias: aliasData,

	async execute(client, interaction) {
        // Data //
        const channel = interaction.options.getChannel("channel");

        const name = channel.name;
        const date = await f.time(new Date(channel.createdTimestamp), interaction);
        const id = channel.id;
        const types = ["Text Channel", "DM", "Voice Channel", "Group DM", "Category", "Announcement", "", "", "", "", "Announcement Thread", "Public Thread", "Private Thread", "Stage Voice", "Directory", "Forum", "Media"];
        const type = types[channel.type];

        // Send Output //
        let title = "Channel:\nType:\nCreated On:\nID:\nNSFW?";
        let value = `\n${type}\n${date}\n${id}\n${channel.nsfw}`;

        if(type == "Category") {
            value = `\\\> ${name}` + value
        } else {
            title += "\nParent:";
            value = `<#${id}>` + value + `\n${channel.parent.name}`;

            switch(type) {
                case "Text Channel":
                    title += "\nThreads:";
                    value += `\n${channel.threads.cache.size}`;
                    break;
                case "Voice Channel":
                    title += "\nUser Limit:";
                    value += `\n${channel.userLimit}`;
                    break;
                case "Forum":
                    title += "\nActive Threads:";
                    value += `\n${channel.threads.cache.size}`;
                    break;
            }
        }

        const output = new EmbedBuilder()
            .setColor(embedBlue)
            .setTitle(`Information for channel "${name}"`)
            .addFields(
                { name: "Basic Information", value: title, inline: true },
                { name: emptyString, value: emptyString, inline: true },
                { name: emptyString, value: value, inline: true }
            );

        if(type == "Text Channel") {
            output.addFields({ name: "Description:", value: `${channel.topic}`, inline: false });
        }

        await interaction.reply({embeds: [output]});
	}
}