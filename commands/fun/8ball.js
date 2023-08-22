const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const _ = require('lodash');
const { prefix } = require("../../config.json");

// Command Data //
const name = "8ball";
const commandData = new SlashCommandBuilder()
    .setName(name)
    .addStringOption(option => option
        .setName("question")
        .setDescription("Ask the 8ball a question!")
        .setRequired(true)
    );
const aliasData = _.cloneDeep(commandData).setName(prefix+name);


module.exports = {
	data: commandData,
    alias: aliasData,

	async execute(client, interaction) {
        // Data //
        const input = interaction.options.getString("question");
        const response = (await f.getJSON(`https://eightballapi.com/api?question=${input}&lucky=false`))["reading"];


        // Output //
		const output = new EmbedBuilder()
		    .setColor(embedBlue)
		    .addFields(
                { name: "Question:", value: `\`\`\`\n${input}\`\`\``, inline: false },
                { name: "Answer:", value: `\`\`\`\n${response}\`\`\``, inline: false }
            );
	
		await interaction.reply({embeds: [output]});
	}
}