// General-use Functions //
const { MessageEmbed } = require('discord.js');

f =  {
    sendConsole: async function sendConsole(title, value, color, interaction, type) {  // Sends value in code block to Discord
        const errorEmbed = new MessageEmbed()
            .setColor(color)
            .addField(title, `\`\`\`${value}\`\`\``);
        if(type == 'reply') {
            await interaction.reply({embeds: [errorEmbed]});
        }
        if(type == 'message') {
            await interaction.channel.send({embeds: [errorEmbed]});
        }
    },

    sendEmbed: async function sendEmbed(string1, string2, color, interaction, type) {  // Sends basic embed
        const embed = new MessageEmbed()
            .setColor(color)
            .addField(string1, string2);
        if(type == 'reply') {
            await interaction.reply({embeds: [embed]});
        }
        if(type == 'message') {
            await interaction.channel.send({embeds: [embed]});
        }
    },

    capitalize: async function capitalize(string) {
        return string[0].toUpperCase()+string.slice(1);
    }
}