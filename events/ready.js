const { ActivityType } = require('discord.js');

module.exports = {
	name: "ready",
	once: true,
	execute(client) {
		client.user.setActivity({name: "Loading commands...", type: ActivityType.Custom})
		console.log(`Bot Ready! Logged in as ${client.user.tag}`);
	},
};