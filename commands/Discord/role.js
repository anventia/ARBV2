const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const _ = require('lodash');
const { prefix } = require("../../config.json");

// Command Data //
const name = "role";
const description = "Gets information for a role.";
const commandData = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description)
    .addRoleOption(option => option
        .setName("role")
        .setDescription("Specify a role")
        .setRequired(true)
    );
const aliasData = _.cloneDeep(commandData).setName(prefix+name);


module.exports = {
	data: commandData,
    alias: aliasData,

	async execute(client, interaction) {
        // Data //
        const role = interaction.options.getRole("role");

        const name = role.name;
        const color = role.hexColor;
        const date = role.createdTimestamp;
        const position = interaction.guild.roles.cache.size - role.position;
        const permissions = role.permissions;
        const id = role.id;


        // Send Output //
        const output = new EmbedBuilder()
            .setColor(color)
            .setTitle(`Information for role @${name}`)
            .addFields(
                { name: "Information", value: "Role:\nColor:\nCreated On:\nPosition:\nID:", inline: true },
                { name: emptyString, value: emptyString, inline: true },
                { name: emptyString, value: `<@&${id}>\n${color}\n${date}\n${position}\n${id}`, inline: true }
            );
        await interaction.reply({embeds: [output]});
	}
}