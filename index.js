// Initialize Commands / Events //
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS);

//const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const client = new Client({ intents: myIntents });

client.commands = new Collection();

function setCommands() {
	const commandFolders = fs.readdirSync('./commands');
    for(const folder of commandFolders) {  // For each folder...
        const loadFolder = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));  // Load that folder

        for(const file of loadFolder) {  // For each file within the folder
            const command = require(`./commands/${folder}/${file}`);  // Load file
	        client.commands.set(command.data.name, command);

        }
        
    }
}
setCommands();

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Initialize Functions //
var f = require('./functions.js');


// Data //
global.iconurl = 'https://i.postimg.cc/0yjbgWSX/ARBV2.png';
global.blank = '\u200b';
global.embedBlue = '#3D5EA4';
global.embedRed = '#fa4d4d';


// Slash Commands //
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(interaction);  // Executes the command
	} catch (error) {
		console.error(error);
		sendConsole("An error occured!", error, global.embedRed, interaction, 'reply');  // Error handling
    }	
});

const { MessageEmbed } = require('discord.js');
async function sendConsole(title, value, color, interaction, type) {
	const errorEmbed = new MessageEmbed()
		.setColor(color)
		.addField(title, `\`\`\`${value}\`\`\``);
	if(type == 'reply') {
		await interaction.reply({embeds: [errorEmbed]});
	}
	if(type == 'message') {
		await interaction.channel.send({embeds: [errorEmbed]});
	}

}



// Log in and run bot
client.login(token);