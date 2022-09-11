const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
		.setName('base')
		.setDescription('Converts numbers between bases!')
        .addStringOption(option => option
            .setName('value')
            .setDescription('Value to be converted')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('start')
            .setDescription('Starting base (2-62)')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('target')
            .setDescription('Target base(2-62)')
            .setRequired(true)
        ),
    async execute(client, interaction) {
        // Setup //
        var value  = interaction.options.getString("value").replace(" ", "");  // Gather inputs
        const start  = BigInt(interaction.options.getString("start"));
        const target = BigInt(interaction.options.getString("target"));
        const numbers = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");  // (62) All the characters used as numbers.
        if(start < 2 || target < 2 || start > numbers.length || target > numbers.length) {  // Limit bases from 2 - [numbers]
            await interaction.reply({ content: "Error: Base value is invalid!", ephemeral: true }); return ;
        }
        if(start <= 36) { value = value.toUpperCase(); } // Automatically capitalize letters if starting base is 36 or lower


        // Convert value to Base 10  //
        var valueB10 = BigInt(0);  // value converted into Base 10
        const valueRev = value.toString().split("").reverse();  // Makes list of the characters in value, but reversed
        for(let i=BigInt(0); i<valueRev.length; i++) {
            let char = valueRev[i].toString();  // Current character
            let charVal = BigInt(numbers.indexOf(char));  // Value of char, e.g. 1 -> 1, F -> 15
            if(charVal >= start+1n) {  // make sure input matches starting base, e.g. "1234" is not valid for base 2
                await interaction.reply({ content: "Error: Value and base incompatible!", ephemeral: true }); return ;
            }
            const startB = BigInt(start);
            valueB10 += (startB**i)*charVal;  // Increment result
        }
        

        // Convert from Base 10 to Target Base //
        var valueTar = "";  // value converted into the Target Base
        //valueB10REV = valueB10.toString().split("").reverse();  // Makes list of the characters in valueB10, but reversed
        var valueB10T = BigInt(valueB10);  // Temp value for division
        for(let i=0; valueB10T > 0; i++) {
            let mod = valueB10T % target;  // Gets the remainder from operation
            valueTar = numbers[Number(mod)] + valueTar;  // Increment result
            valueB10T = valueB10T / target;  // Sets valueB10 to remaining number after division
        }
        if(valueTar.length > 1000) {valueTar = valueTar.substring(0,1000)+" ..."; }


        // Send message // (update this with embed later!)
        //await interaction.reply(`Base ${start}:\n\`\`\`${value}\`\`\`\nBase 10:\n\`\`\`${valueB10}\`\`\`\nBase ${target}:\n\`\`\`${valueTar}\`\`\``)
        const inputEmbed = new MessageEmbed()
		    .setColor(global.embedBlue)
		    .addField(`Input (Base ${start})`, `\`\`\`${value}\`\`\``);
        await interaction.reply({embeds: [inputEmbed]});
        const outputEmbed = new MessageEmbed()
		    .setColor(global.embedBlue)
		    .addField(`Output (Base ${target})`, `\`\`\`${valueTar}\`\`\``);
        await interaction.channel.send({embeds: [outputEmbed]});
    }
}