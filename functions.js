// General-use Functions //
const { MessageEmbed } = require('discord.js');

f =  {
    sendConsole: async function sendConsole(title, value, interaction, type) {  // Sends value in code block to Discord
        const errorEmbed = new MessageEmbed()
            .setColor(global.embedBlue)
            .addField(title, `\`\`\`${value}\`\`\``);
        if(type == 'reply') {
            await interaction.reply({embeds: [errorEmbed]});
        }
        if(type == 'message') {
            await interaction.channel.send({embeds: [errorEmbed]});
        }
    },

    capitalize: async function capitalize(string) {
        return string[0].toUpperCase()+string.slice(1);
    }
}