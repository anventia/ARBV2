const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const _ = require('lodash');
const { prefix } = require("../../config.json");

// Command Data //
const name = "flip";
const commandData = new SlashCommandBuilder()
    .setName(name)
    .addIntegerOption(option => option
        .setName("amount")
        .setDescription("Number of coins to flip.") 
        .setRequired(false)   
        .setMinValue(1)
        .setMaxValue(100)
    );
const aliasData = _.cloneDeep(commandData).setName(prefix+name);


module.exports = {
	data: commandData,
    alias: aliasData,

	async execute(client, interaction) {
        // Data //
        const amount = interaction.options.getInteger("amount") ?? 1;

        const columns = 10;
        const symbols = ["🟩", "🟥", "🟨"];


        // Flip coin(s) //
        let response = "";
        let stats = [0, 0, 0];
        let edge = false;
        for(let i=0; i<amount; i++) {
            let random = (parseInt(Math.random()*2)) + "";
            if(parseInt(Math.random()*1000) < 1) { random = 2; edge = true; }  // slim chance of edge!

            if(i == 0 || parseInt(i / columns) != parseInt((i-1) / columns)) {
                response += "\n";
            } else {
                response += "";
            }
            response += symbols[random];
            stats[random] ++;
        }
        
        // Output //
		const output = new EmbedBuilder()
		    .setColor(embedBlue)
		    .addFields(
                //{ name: "Results:", value: "Heads:\nTails:\nTotal:", inline: true },
                //{ name: emptyString, value: `${stats[0]}\n${stats[1]}\n${amount}`, inline: true },
                { name: `You flipped ${stats[0]} heads and ${stats[1]} tails!`, value: `\`\`\`\n${response}\`\`\``.replace("null", ""), inline: false }
            );
                
        if(stats[2] >= 1) {
            output.setFooter({ text: `${stats[2]} coins(s) landed on the edge!` });
        }

		await interaction.reply({embeds: [output]});
	}
}