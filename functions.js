// General-use Functions //
const { MessageEmbed } = require('discord.js');

f =  {
    sendConsole: async function sendConsole(title, value, interaction, type) {
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
}