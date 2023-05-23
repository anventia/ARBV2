const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const _ = require('lodash');
const { prefix } = require("../../config.json");

// Command Data
const name = "avatar";
const description = "Gets the avatar of a user."
const commandData = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description)
    .addStringOption(option => option
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