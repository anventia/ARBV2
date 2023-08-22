const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const _ = require('lodash');
const { prefix } = require("../../config.json");

// Command Data //
const name = "roll";
const commandData = new SlashCommandBuilder()
    .setName(name)
    .addIntegerOption(option => option
        .setName("min")
        .setDescription("Minimum roll.")
        .setRequired(true)
    )
    .addIntegerOption(option => option
        .setName("max")
        .setDescription("Maximum roll.")
        .setRequired(true)
    )
    .addIntegerOption(option => option
        .setName("amount")
        .setDescription("Number of dice to roll.") 
        .setRequired(false)   
        .setMinValue(1)
        .setMaxValue(64)
    );
const aliasData = _.cloneDeep(commandData).setName(prefix+name);


module.exports = {
	data: commandData,
    alias: aliasData,

	async execute(client, interaction) {
        // Data //
        const min    = interaction.options.getInteger("min");
        const max    = interaction.options.getInteger("max");
        const amount = interaction.options.getInteger("amount") ?? 1;

        const maxLength = Math.max(`${min}`.length, `${max}`.length);
        const columns   = Math.ceil(Math.sqrt(amount));


        // Roll dice //
        let response = ""
        for(let i=0; i<amount; i++) {
            const random = (parseInt(Math.random()*(max-min+1)) + min) + "";
            const space = " ".repeat(maxLength-random.length);
            if(i == 0 || parseInt(i / columns) != parseInt((i-1) / columns)) {
                response += "\n";
            } else {
                response += "   ";
            }
            response += space + random;
        }
        
        // Output //
		const output = new EmbedBuilder()
		    .setColor(embedBlue)
		    .addFields(
                { name: "Range:", value: `From \`${min}\` to \`${max}\``, inline: false },
                { name: "Results:", value: `\`\`\`\n${response}\`\`\``.replace("null", ""), inline: false }
            );
	
		await interaction.reply({embeds: [output]});
	}
}