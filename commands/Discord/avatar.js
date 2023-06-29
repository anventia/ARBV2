const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const _ = require('lodash');
const { prefix } = require("../../config.json");

// Command Data
const name = "avatar";
const description = "Gets the avatar of a user."
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


        // Gather Data //
        let color = member.displayHexColor;
        let url = user.displayAvatarURL({format: 'png', size: 1024});
        let username = user.username;


        // Send Output //
        const output = new EmbedBuilder()
            .setColor(color)
            .setTitle(`Avatar for user ${username}`)
            .setImage(url);
        await interaction.reply({embeds: [output]});
	}
}