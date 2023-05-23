const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const _ = require('lodash');
const { prefix } = require("../../config.json");

// Command Data
const name = "role";
const description = "Gets information for a role.";
const commandData = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description)
    .addStringOption(option => option
        .setName("role")
        .setDescription("Specify a role")
        .setRequired(true)
    );
const aliasData = _.cloneDeep(commandData).setName(prefix+name);


module.exports = {
	data: commandData,
    alias: aliasData,

	async execute(client, interaction) {
		// Setup //
        let input = interaction.options.getString("role").trim().replace("<", "").replace(">", "").replace("@", "").replace("&", "").toLowerCase();
        
        let role = await interaction.guild.roles.fetch() 
            .then(roles => {
                let res; 
                roles.each(role => { if(role.name.toLowerCase() == input || role.id == input) res = role }); 
                return res;
            });

        if(role == null) {
            await f.sendMessage("Error: Role not found!", embedRed, interaction, "reply", true);
            return;
        }


        // Gather Data //
        let name = role.name;
        let color = role.hexColor;
        let date = role.createdTimestamp;
        let position = interaction.guild.roles.cache.size - role.position;
        let permissions = role.permissions;
        let id = role.id;

        //console.log(permissions);
        

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