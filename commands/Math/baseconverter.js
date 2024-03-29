const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const _ = require('lodash');
const { prefix } = require("../../config.json");

// Command Data //
const name = "base";
const commandData = new SlashCommandBuilder()
    .setName(name)
    .addStringOption(option => option
        .setName("value")
        .setDescription("Value to be converted")
        .setRequired(true)
    )
    .addIntegerOption(option => option
        .setName("start")
        .setDescription("Starting base (2-62)")
        .setRequired(true)
        .setMinValue(2)
        .setMaxValue(62)
    )
    .addIntegerOption(option => option
        .setName("target")
        .setDescription("Target base(2-62)")
        .setRequired(true)
        .setMinValue(2)
        .setMaxValue(62)
    );
const aliasData = _.cloneDeep(commandData).setName(prefix+name);


module.exports = {
    data: commandData,
    alias: aliasData,

    async execute(client, interaction) {
        // Setup //
        let value  = interaction.options.getString("value").replace(" ", "");  // Gather inputs
        const start  = BigInt(interaction.options.getInteger("start"));
        const target = BigInt(interaction.options.getInteger("target"));
        const numbers = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");  // (62) All the characters used as numbers.
        
        
        if(start <= 36) { value = value.toUpperCase(); } // Automatically capitalize letters if starting base is 36 or lower


        // Convert value to Base 10  //
        let valueB10 = BigInt(0);  // value converted into Base 10
        const valueRev = value.toString().split("").reverse();  // Makes list of the characters in value, but reversed
        for(let i=BigInt(0); i<valueRev.length; i++) {
            let char = valueRev[i].toString();  // Current character
            let charVal = BigInt(numbers.indexOf(char));  // Value of char, e.g. 1 -> 1, F -> 15
            if(charVal >= start+1n || charVal == -1n) {  // make sure input matches starting base, e.g. "1234" is not valid for base 2
                await interaction.reply({ content: "Error: Value and base incompatible!", ephemeral: true }); return ;
            }
            const startB = BigInt(start);
            valueB10 += (startB**i)*charVal;  // Increment result
        }
        

        // Convert from Base 10 to Target Base //
        let valueTar = "";  // value converted into the Target Base
        let valueB10T = BigInt(valueB10);  // Temp value for division
        while(valueB10T > 0) {
            let mod = valueB10T % target;  // Gets the remainder from operation
            valueTar = numbers[Number(mod)] + valueTar;  // Increment result
            valueB10T = valueB10T / target;  // Sets valueB10 to remaining number after division
        }
        if(valueTar.length > 1000) {valueTar = valueTar.substring(0,1000)+" ..."; }  // Trim output to fit within Discord message size limit


        // Send Output //
        const output = new EmbedBuilder()
		    .setColor(embedBlue)
		    .addFields(
                { name: `Input (Base ${start})`, value: `\`\`\`js\n${value}\`\`\``, inline: false },
                { name: `Output (Base ${target})`, value: `\`\`\`js\n${valueTar}\`\`\``, inline: false }
        );
        await interaction.reply({embeds: [output]});
    }
}