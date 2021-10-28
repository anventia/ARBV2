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
            f.sendEmbed('Error:', 'Invalid equation!', global.embedRed, interaction, 'reply');
            return;
        }
        const replyEmbed = new MessageEmbed()
            .setColor(global.embedBlue)
            .addField('Input:', `\`\`\`${input}\`\`\``)
            .addField('Output:', `\`\`\`${output}\`\`\``)
		await interaction.reply({embeds: [replyEmbed]});
	}
}