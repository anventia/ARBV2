const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const _ = require('lodash');
const { prefix } = require("../../config.json");
const FileSystem = require("fs");

// Command Data //
const name = "morse";
const description = "Encodes / Decodes Morse Code.";
const commandData = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description)
    .addStringOption(option => option
        .setName("operation")
        .setDescription("Do you want to encode or decode a string?")
        .setRequired(true)
        .addChoices(
            { name: "encode", value: "encode" },
            { name: "decode", value: "decode" }
        )
    )
    .addStringOption(option =>option
        .setName("input")
        .setDescription("Input string to be encoded/decoded")
        .setRequired(true)
        .setMaxLength(1024)
    );
const aliasData = _.cloneDeep(commandData).setName(prefix+name);


module.exports = {
	data: commandData,
    alias: aliasData,

	async execute(client, interaction) {
        // Data //
        const operation = await interaction.options.getString("operation");
        const input = await interaction.options.getString("input");
        let morse = JSON.parse(FileSystem.readFileSync("./morse.json"));


        // Convert //
        let res = "";
        if(operation == "encode") {
            for(let word of input.split(" ")) {
                res += "/ "
                word.split("").forEach(letter => { res += (morse[letter.toUpperCase()] ?? letter) + " " })
            }
            res = res.substring(2);
        } else {
            morse = Object.fromEntries(Object.entries(morse).map(([a, b]) => { return [b, a] }));
            for(let word of input.split(" / ")) {
                word.split(" ").forEach(letter => { res += (morse[letter] ?? letter).toLowerCase()})
                res += " ";
            }
        }


		// Send Output //
        const output = new EmbedBuilder()
		    .setColor(embedBlue)
		    .addFields(
                { name: "Input", value: `\`\`\`js\n${input}\`\`\``, inline: false },
                { name: "Output", value: `\`\`\`js\n${res}\`\`\``, inline: false }
        );
        await interaction.reply({embeds: [output]});
	}
}