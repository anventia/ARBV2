const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const _ = require('lodash');
const { prefix } = require("../../config.json");

// Command Data //
const name = "help";
const description = "Help commands.";
const commandData = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description)
    .addStringOption(option => option
        .setName("input")
        .setDescription("Category or command to view")
        .setRequired(false)
    );
const aliasData = _.cloneDeep(commandData).setName(prefix+name);

// Command-Specific Data
const FileSystem = require("fs");
const { helpPath } = require("../../config.json")


module.exports = {
	data: commandData,
    alias: aliasData,

    async execute(client, interaction) {
        let option;
        try { option = interaction.options.getString("input").toLowerCase(); } catch(err) {};      
        const helpJSON = JSON.parse(FileSystem.readFileSync(helpPath));  // help.json 
        
        
        // Check Parameter //
        let foundItem = "none";
        let categoryList = "";
        if(option == null) {  // No parameter given, list categories
            let categoryDescription = "";
            for(let category in helpJSON) {
                categoryList += category[0].toUpperCase()+category.slice(1)+"\n";
                categoryDescription += helpJSON[category]["description"]+"\n";
            }
            const helpEmbed = new EmbedBuilder()
                .setColor(embedBlue)
                .setTitle("List of command categories")
                .addFields(
                    { name: "Category:", value: categoryList, inline: true },
                    { name: emptyString, value: emptyString, inline: true },
                    { name: "Description (Do `/help <category>` for command lists)", value: categoryDescription, inline: true }
                );
            await interaction.reply({embeds: [helpEmbed]})
            return;
        } else if(option !== "description") {  // Loop through categories, then commands for info
            let item = "";
            let desc = "";
            let perm = "";
            for(let category in helpJSON) {
                if(category == option) {  // Option matches category
                    for(let command in helpJSON[category]) {  // Loop through each command and add to output
                        if(command == ("description")) { continue; }
                        item += `</${command}:${helpJSON[category][command]["id"]}>\n`;  // Add command name to items
                        desc += helpJSON[category][command]["short"]+"\n";  // Add short description to descriptions
                    }
                    foundItem = "category";
                    break;
                } else {  // Search commands within that category
                    for(let command in helpJSON[category]) {
                        if(command == option && command != "description") {  // Command matches category
                            item = helpJSON[category][command]["usage"];  // Sets item to command usage
                            desc = helpJSON[category][command]["long"];  // Sets description to long command description
                            perm = helpJSON[category][command]["permissions"];  // Permissions needed to use command
                            item = item.replace(`/${command}`, `</${command}:${helpJSON[category][command]["id"]}>`);
                            foundItem = "command";
                            break;
                        }
                    }
                }
            }   
            

            // Send Output //
            if(foundItem != "none") {  // If item is found
                const helpEmbed = new EmbedBuilder()

                let title = "a";
                let name1 = "b";
                let name2 = "c";
                
                // Sets texts for category info
                if(foundItem == "category") {
                    title = `Command list for category "${option[0].toUpperCase() + option.substring(1)}"`;
                    name1 = "Command";
                    name2 = "Basic Description (Do `/help <command>` for more info)"
                    helpEmbed
                        .setColor(embedBlue)
                        .setTitle(title)
                        .addFields(
                            { name: name1, value: item, inline: true },
                            { name: emptyString, value: emptyString, inline: true },
                            { name: name2, value: desc, inline: true }
                        );
                }

                // Sets texts for command info
                if(foundItem == "command") { 
                    title = `Information for command "${option}"`;
                    name1 = "Usage";
                    name2 = "Description";
                    helpEmbed
                        .setColor(embedBlue)
                        .setTitle(title)
                        .addFields(
                            { name: name1, value: item, inline: false },
                            { name: name2, value: desc, inline: false }
                        );
                    if(perm != "None") { 
                        const permList = perm.split(", ");
                        perm = "";
                        permList.forEach((permission) => perm += `- ${permission}\n`);
                        helpEmbed.addFields({ name: "Requires the following permissions:", value: perm, inline: false }) 
                    }
                }
                await interaction.reply({embeds: [helpEmbed]});
            } else {  // Parameter not found
                await f.sendMessage(`Error: \`${option}\` is not a valid argument!`, embedRed, interaction, "reply", true);
            }
        } else {  // Parameter not found -> "description"
            await f.sendMessage(`Error: \`${option}\` is not a valid argument!`, embedRed, interaction, "reply", true);
        }
    }
}