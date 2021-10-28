const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
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
            //f.sendConsole('Option:', option, interaction, 'message');
            
            const file = FileSystem.readFileSync('C:/Users/brend/OneDrive/Documents/DiscordBots/ARBV2/help.json');
            const helpJSON = JSON.parse(file); // help.json 

            // Check parameter //
            var categoryList = '';
            if(option == null) {  // No parameter given, list categories
                for(let category in helpJSON) {
                    categoryList += category[0].toUpperCase()+category.slice(1)+'\n';
                }
                const helpEmbed = new MessageEmbed()
                    .setColor(global.embedBlue)
                    .setAuthor('List of command categories:', global.iconurl)
                    .addFields(
                        { name: 'Use `/help <category>` for command lists', value: categoryList, inline: true }
                    );
                await interaction.reply({embeds: [helpEmbed]})
            } else {  // Loop through categories, then commands for info
                var item = '';
                var desc = '';
                var foundItem = 'none';
                for(let category in helpJSON) {
                    if(category == option.toLowerCase()) {  // Option matches category
                        for(let command in helpJSON[category]) {  // Loop through each command and add to output
                            item += command+'\n';  // Add command name to items
                            desc += helpJSON[category][command]['short']+'\n';  // Add short description to descriptions
                        }
                        foundItem = 'category';
                        break;
                    } else {  // Search commands within category
                        for(let command in helpJSON[category]) {
                            if(command == option.toLowerCase()) {  // Command matches category
                                item = command;  // Sets item to command name
                                desc = helpJSON[category][command]['long'];  // Sets description to long command description
                                foundItem = 'command';
                                break;
                            }
                        }
                    }
                }

                // send message //
                if(foundItem != 'none') {  // If item is found
                    var author = 'a';
                    var name1 = 'b';
                    var name2 = 'c';
                    if(foundItem == 'category') {  // Sets texts for category info
                        author = `Command list for category "${f.capitalize(option.toLowerCase())}":`;
                        name1 = 'Command:';
                        name2 = 'Basic Description: (Do `/help <command>` for more info)'
                    }
                    if(foundItem == 'command') {  // Sets texts for command info
                        author = `Information for command "${option.toLowerCase()}":`;
                        name1 = 'Name:';
                        name2 = 'Description:';
                    }

                    const helpEmbed = new MessageEmbed()
                        .setColor(global.embedBlue)
                        .setAuthor(author, global.iconurl)
                        .addFields(
                            { name: name1, value: item, inline: true },
                            { name: global.blank, value: global.blank, inline:true },
                            { name: name2, value: desc, inline: true }
                        );
                    await interaction.reply({embeds: [helpEmbed]})
                }
            }
        }
}