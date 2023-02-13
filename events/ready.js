const { ActivityType } = require('discord.js');

module.exports = {
	name: "ready",
	once: true,
	execute(client) {
		client.user.setPresence({
			activities: [{ name: `for Slash Commands`, type: ActivityType.Watching }],
			status: 'idle',
		  });
		console.log(`Bot Ready! Logged in as ${client.user.tag}`);
	},
};