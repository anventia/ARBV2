// Initialize Commands / Events //
const fs = require("fs");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");
const SQL = require("sequelize");
const { prefix } = require("./config.json");

const client = new Client({ intents: [
	GatewayIntentBits.Guilds, 
	GatewayIntentBits.GuildMembers, 
	GatewayIntentBits.GuildEmojisAndStickers, 
	GatewayIntentBits.GuildPresences,
]});

client.commands = new Collection();


// Initialize database //
const sql = new SQL("database", "user", "password", {
	host: "localhost",
	dialect: "sqlite",
	logging: false,
	storage: "database.sqlite"
}); 

Tags = sql.define("tags", {
	server: { type: SQL.INTEGER, unique: true },
	cmdUsage: SQL.JSON,
	warnings: SQL.JSON,
	warnChannel: SQL.TEXT
})

globalTags = sql.define("globalTags", {
	globalCmdUsage: SQL.JSON
})


// Load Commands //
const commandFolders = fs.readdirSync("./commands");
for(const folder of commandFolders) {  // For each folder...
	const loadFolder = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));  // Load that folder
	console.log(" -> "+folder);
	for(const file of loadFolder) {  // For each file within the folder
		const command = require(`./commands/${folder}/${file}`);  // Load file
		client.commands.set(command.data.name, command);
		try { client.commands.set(command.alias.name, command); } catch(err) {};
		console.log("Loaded "+file);
	}
	
}


// Load Events //
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.on('guildCreate', (guild) => {
	try {
		Tags.findOne({ where: { server: guild.id } })
	} catch(err) {
		Tags.create({
			server: guild.id,
			cmdUsage: {},
			warnings: {},
			warnChannel: null
		})
	}
})


// Initialize Functions //
let f = require("./functions.js");


// Data //
iconURL = "https://i.postimg.cc/0yjbgWSX/ARBV2.png";
emptyString = "\u200b";
embedBlue = "#9669d6";
embedLight = "#75bee6";
embedRed = "#fa4d4d";
embedGreen = "#4eea11";


helpJSON = JSON.parse(fs.readFileSync("./help.json")); 
commandIds = JSON.parse(fs.readFileSync("./commandIds.json"));


// Slash Commands //
client.on("interactionCreate", async interaction => {
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName);
		if (!command) return;
	try {
		await command.execute(client, interaction);  // Executes the command


		// Command Usage Logging //
		const tag = await Tags.findOne({ where: { server: interaction.guildId } });
		const globalTag = await globalTags.findOne({ where: { id: 1 } });
		const commandName = (command.data.name).replace(prefix, "")
		let cmdUsage = tag.get("cmdUsage");
		let globalCmdUsage = globalTag.get("globalCmdUsage")

		cmdUsage[commandName] = (cmdUsage[commandName] ?? 0) + 1;
		globalCmdUsage[commandName] = (globalCmdUsage[commandName] ?? 0) + 1;
		
		try { 
			await Tags.update({ cmdUsage: cmdUsage }, { where: { server: interaction.guildId } });
			await globalTags.update({ globalCmdUsage: globalCmdUsage }, { where: { id: 1 } });
		}
        catch(err) { await f.sendError(err) }
		

	} catch (error) {
		console.error(error);
		sendConsole("An error occured!", error, embedRed, interaction, "reply");  // Error handling
    }	
});

const { EmbedBuilder } = require("discord.js");
async function sendConsole(title, value, color, interaction, type) {
	const errorEmbed = new EmbedBuilder()
		.setColor(color)
		.addFields({ name: title, value: `\`\`\`${value}\`\`\`` });
	if(type == "reply") {
		await interaction.reply({embeds: [errorEmbed]});
	}
	if(type == "message") {
		await interaction.channel.send({embeds: [errorEmbed]});
	}

}


// Log in and run bot //
Tags.sync();
globalTags.sync();
client.login(token);