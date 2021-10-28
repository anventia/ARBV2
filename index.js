// Initialize Commands / Events //
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');


const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

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
global.empty = '\u200b';
global.embedBlue = `#3D5EA4`;

// Slash Commands //
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(interaction);  // Executes the command
	} catch (error) {
		console.error(error);
		sendConsole("An error occured!", error, interaction, 'reply');
    }	
});

async function sendConsole(title, value, interaction, type) {
	const errorEmbed = new MessageEmbed()
		.setColor(global.embedBlue)
		.setAuthor(title)
		.addField('Output:', `\`\`\`${value}\`\`\``);
	if(type == 'reply') {
		await interaction.reply({embeds: [errorEmbed]});
	}
	if(type == 'message') {
		await interaction.channel.send({embeds: [errorEmbed]});
	}

}



// Login to Discord with your client
client.login(token);