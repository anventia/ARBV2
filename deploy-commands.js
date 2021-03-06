const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, guildId2, guildId3, token } = require('./config.json');
// 1: ANQRDR, 2: Utility Server, 3: CF

const commands = []; // commadnFiles
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const commandFolders = fs.readdirSync('./commands');

console.log(commandFolders);
function loadCommands() {
    for(const folder of commandFolders) {  // For each folder...
        const loadFolder = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));  // Load that folder

        for(const file of loadFolder) {  // For each file within the folder
            const command = require(`./commands/${folder}/${file}`);  // Load file
	        commands.push(command.data.toJSON());

        }
        
    }
}
loadCommands();



const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands 1.'))
	.catch(console.error);
    
const rest2 = new REST({ version: '9' }).setToken(token);

rest2.put(Routes.applicationGuildCommands(clientId, guildId2), { body: commands })
    .then(() => console.log('Successfully registered application commands 2.'))
    .catch(console.error);
        
const rest3 = new REST({ version: '9' }).setToken(token);

rest3.put(Routes.applicationGuildCommands(clientId, guildId3), { body: commands })
    .then(() => console.log('Successfully registered application commands 3.'))
    .catch(console.error);
