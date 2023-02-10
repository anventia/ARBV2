const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("roles")
		.setDescription("Lists roles in the server."),
	async execute(client, interaction) {
        // Gather Data //
        const numRoles = 30;  // Number of roles per page
        const numPages = 2;  // Number of pages to display

        const guild = interaction.guild;
        const roles = guild.roles.cache;
        let names = "";
        let output = "";

        
        // Get roles //
        for(let i of roles) {
            names += i[1]["name"] + "\n";
            if(String(output).length <= 1000)  { 
                output += "<@&" + i[1]["id"] + "> ";
            } else {
                const serverEmbed = new EmbedBuilder() 
                    .setColor(embedBlue)
                    .setTitle(`Role information`)
                    .addFields(
                        { name: "List of roles", value: output, inline: true}
                    );

                await interaction.channel.send({embeds: [serverEmbed]});
                output = "";
            }

        }


        // Send Output //
        const serverEmbed = new EmbedBuilder() 
            .setColor(embedBlue)
            .setTitle(`Role information`)
            .addFields(
                { name: "List of roles", value: output, inline: true}
            );

            await interaction.reply({embeds: [serverEmbed]});

	}
}