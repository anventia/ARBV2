const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");


module.exports = {
	data: new SlashCommandBuilder()
		.setName("avatar")
		.setDescription("Gets the avatar of a specified user.")
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
            await f.sendMessage("Error: User not found!", embedRed, interaction, "reply", true);
            return;
        }

        let user = member.user;


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