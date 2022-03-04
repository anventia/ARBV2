const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const math = require('mathjs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('calc')
		.setDescription('Calculates math equations!')
        .addStringOption(option => option
            .setName('input')
            .setDescription('Math input')
            .setRequired(true)
        ),
	async execute(interaction) {
        const input = interaction.options.getString("input");
        var output = '';
        try {
            output = math.evaluate(input);
        } catch (err) {
            const replyEmbed = new MessageEmbed()
            .setColor(global.embedRed)
            .addField('Input:', `\`\`\`${input}\`\`\``)
            .addField('Output:', `\`\`\`Error: Invalid equation\`\`\``)
		    await interaction.reply({embeds: [replyEmbed]});
            return;
        }


        output = String(output);
        if(output.length > 1024) {  // Cuts off output and adds '...' if longer than 1024
            output = output.substr(0,1015);
            output += '...';
        }

        const replyEmbed = new MessageEmbed()
            .setColor(global.embedBlue)
            .addField('Input:', `\`\`\`${input}\`\`\``)
            .addField('Output:', `\`\`\`${output}\`\`\``)
		await interaction.reply({embeds: [replyEmbed]});
	}
}