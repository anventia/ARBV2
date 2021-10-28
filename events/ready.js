module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		client.user.setActivity("for Slash Commands", {  // Set status activity
			type: "WATCHING"
		  });
		console.log(`Bot Ready! Logged in as ${client.user.tag}`);
	},
};