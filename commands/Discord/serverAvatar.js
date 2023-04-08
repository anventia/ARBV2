const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");


module.exports = {
	data: new SlashCommandBuilder()
		.setName("serveravatar")
		.setDescription("Gets the avatar of the current server."),
	async execute(client, interaction) {
        // Gather Data //
        let guild = interaction.guild;
        let name = guild.name;
        let url = guild.iconURL({format: 'png', size: 1024});


        // Send Output //
        const output = new EmbedBuilder()
            .setColor(global.embedBlue)
            .setTitle(`Icon for ${name}`)
            .setImage(url);
        await interaction.reply({embeds: [output]});
	}
}