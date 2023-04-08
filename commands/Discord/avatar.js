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
        let input = interaction.options.getString("user").trim().replace("<", "").replace(">", "").replace("@", "").toLowerCase();
        let member;
        
        if(input == "me") {
            member = await interaction.guild.members.fetch(interaction.member.id);
        } else {
            member = await interaction.guild.members.fetch()
            .then(members => {
                let res;
                members.each(member => { if(member.user.username.toLowerCase() == input || (member.nickname || "").toLowerCase() == input || member.id == input) res = member });
                return res;
            });
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