const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message } = require('discord.js');
const FileSystem = require('fs');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Help commands')
        .addStringOption(option => option
            .setName('input')
            .setDescription('Category or command to view')
            .setRequired(false)
            ),
        async execute(interaction) {
            const option = interaction.options.getString("input");
            f.sendConsole('Option:', option, interaction, 'message');
            
            const file = FileSystem.readFileSync('../help.json');
            const helpText = JSON.parse(file); 
           
            f.sendConsole('JSON:', helpText, interaction, 'message');

            await interaction.reply("ki")
        }
}