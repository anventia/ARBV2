const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, guildId2, guildId3, token } = require('./config.json');
// 1: ANQRDR, 2: Utility Server, 3: CF

const commands = []
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

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
