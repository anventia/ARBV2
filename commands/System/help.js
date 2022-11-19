const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const FileSystem = require('fs');
const { helpPath } = require('../../config.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Help commands')
        .addStringOption(option => option
            .setName('input')
            .setDescription('Category or command to view')
            .setRequired(false)
        ),
        async execute(client, interaction) {
            const option = interaction.options.getString("input").toLowerCase();            
            const helpJSON = JSON.parse(FileSystem.readFileSync(helpPath));  // help.json 
            
            
            // Check Parameter //
            let foundItem = 'none';
            let categoryList = '';
            if(option == null) {  // No parameter given, list categories
                let categoryDescription = '';
                for(let category in helpJSON) {
                    categoryList += category[0].toUpperCase()+category.slice(1)+'\n';
                    categoryDescription += helpJSON[category]['description']+'\n';
                }
                const helpEmbed = new MessageEmbed()
                    .setColor(global.embedBlue)
                    .setAuthor('List of command categories:', global.iconurl)
                    .addFields(
                        { name: 'Category:', value: categoryList, inline: true },
                        { name: global.blank, value: global.blank, inline: true },
                        { name: 'Description: (Do `/help <category>` for command lists)', value: categoryDescription, inline: true }
                    );
                await interaction.reply({embeds: [helpEmbed]})
                return;
            } else if(option !== 'description') {  // Loop through categories, then commands for info
                let item = '';
                let desc = '';
                for(let category in helpJSON) {
                    if(category == option) {  // Option matches category
                        for(let command in helpJSON[category]) {  // Loop through each command and add to output
                            if(command == ('description')) { continue; }
                            item += command+'\n';  // Add command name to items
                            desc += helpJSON[category][command]['short']+'\n';  // Add short description to descriptions
                        }
                        foundItem = 'category';
                        break;
                    } else {  // Search commands within category
                        for(let command in helpJSON[category]) {
                            if(command == option && command != 'description') {  // Command matches category
                                item = helpJSON[category][command]['usage'];  // Sets item to command usage
                                desc = helpJSON[category][command]['long'];  // Sets description to long command description
                                foundItem = 'command';
                                break;
                            }
                        }
                    }
                }   
                

                // Send Output //
                if(foundItem != 'none') {  // If item is found
                    const helpEmbed = new MessageEmbed()

                    let author = 'a';
                    let name1 = 'b';
                    let name2 = 'c';
                    if(foundItem == 'category') {  // Sets texts for category info
                        author = `Command list for category "${option[0].toUpperCase() + option.substring(1)}":`;
                        name1 = 'Command:';
                        name2 = 'Basic Description: (Do `/help <command>` for more info)'
                        helpEmbed
                            .setColor(global.embedBlue)
                            .setAuthor(author)
                            .addFields(
                                { name: name1, value: item, inline: true },
                                { name: global.blank, value: global.blank, inline: true },
                                { name: name2, value: desc, inline: true }
                            );
                    }
                    if(foundItem == 'command') {  // Sets texts for command info
                        author = `Information for command "${option}":`;
                        name1 = 'Usage:';
                        name2 = 'Description:';
                        helpEmbed
                            .setColor(global.embedBlue)
                            .setAuthor(author)
                            .addFields(
                                { name: name1, value: item, inline: false },
                                { name: name2, value: desc, inline: false }
                            );
                    }
                    await interaction.reply({embeds: [helpEmbed]})
                } else {  // Parameter not found
                    await f.sendMessage(`Error: \`${option}\` is not a valid argument!`, global.embedRed, interaction, 'reply')
                }
            } else {  // Parameter not found -> 'description'
                await f.sendMessage(`Error: \`${option}\` is not a valid argument!`, global.embedRed, interaction, 'reply')
            }
        }
}