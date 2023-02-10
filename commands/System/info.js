const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("info")
		.setDescription("Shows bot information"),
	async execute(client, interaction) {
		const infoEmebed = new EmbedBuilder() 
            .setColor(embedBlue)
            .setAuthor("Information page for ARB.V2", iconURL)
            .addFields(
                { name: "Basic Info:", value: "Created On:\nVersion:\n", inline: true},
                { name: emptyString, value: emptyString, inline: true},
                { name: emptyString, value: "2021/10/27\nv2.0.0", inline: true },

                { name: "Credits:", value: "Created By:\nCreated With:\n", inline: true},
                { name: emptyString, value: emptyString, inline: true},
                { name: emptyString, value: "<@327948165468782595>\n[Discord.js](https://discord.js.org/#/)", inline: true },

                { name: "Other:", value: "GitHub Repository:\nInvite Link:\n", inline: true},
                { name: emptyString, value: emptyString, inline: true},
                { name: emptyString, value: "https://github.com/anventia/ARBV2\n[< click here >](https://discord.com/api/oauth2/authorize?client_id=902802516834676847&permissions=8&scope=bot%20applications.commands)", inline: true }
            );
        await interaction.reply({embeds: [infoEmebed]});
	}
}