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
            .setDescription('Starting base')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('target')
            .setDescription('Target base')
            .setRequired(true)
        ),
    async execute(client, interaction) {
        // Setup //
        const value  = interaction.options.getString("value").toUpperCase();  // Gather inputs
        const start  = interaction.options.getString("start");
        const target = interaction.options.getString("target");
        const numbers = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");


        // Convert value to Base 10  //
        var valueB10 = 0;  // value converted into Base 10
        const valueREV = value.toString().split("").reverse();  // Makes list of the characters in value, but reversed
        for(let i=0; i<valueREV.length; i++) {
            let char = valueREV[i].toString();  // Current character
            let charVAL = numbers.indexOf(char);  // Value of char, e.g. 1 -> 1, F -> 15
            if(parseInt(charVAL) >= start) {  // make sure input matches starting base, e.g. "1234" is not valid for base 2
                await interaction.reply({ content: "Error: Invalid inputs!", ephemeral: true }); return ;
            }
            valueB10 += (Math.pow(start,i))*charVAL;  // Increment result
        }
        

        // Convert from Base 10 to Target Base //
        var valueTAR = "";  // value converted into the Target Base
        //valueB10REV = valueB10.toString().split("").reverse();  // Makes list of the characters in valueB10, but reversed
        var valueB10T = parseInt(valueB10);  // Temp value for division
        for(let i=0; valueB10T > 0; i++) {
            let mod = parseInt(valueB10T) % parseInt(target);  // Gets the remainder from operation
            if(true) { valueTAR = numbers[mod] + valueTAR; }  // Increment result
            valueB10T = Math.floor(parseInt(valueB10T) / parseInt(target));  // Sets valueB10 to remaining number after division
        }

        // Send message // (update this with embed later!)
        await interaction.reply(`Base ${start}:\n\`\`\`${value}\`\`\`\nBase 10:\n\`\`\`${valueB10}\`\`\`\nBase ${target}:\n\`\`\`${valueTAR}\`\`\``)
        
    }
}