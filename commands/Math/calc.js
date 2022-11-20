const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const math = require("mathjs");
const branchy = require("branchy");  // Library that runs function in seperate process
const { string } = require("mathjs");
const matheval = (input) => {
    const math = require("mathjs");
    try {
        return String(math.evaluate(input));
    } catch(err) { console.log("Error with calculation"); }
}
const forkedEvaluate = branchy(matheval);

module.exports = {
	data: new SlashCommandBuilder()
		.setName("calc")
		.setDescription("Calculates math equations!")
        .addStringOption(option => option
            .setName("input")
            .setDescription("Math input")
            .setRequired(true)
        ),
	async execute(client, interaction) {
        const input = interaction.options.getString("input");
        let output = "";
        try {
            output = String(await forkedEvaluate(input));
            if (string(output) == "undefined") { throw "Invalid"; }
        } catch(err) {
            const replyEmbed = new MessageEmbed()
            .setColor(global.embedRed)
            .addFields(
                { name: "Input:", value: `\`\`\`${input}\`\`\`` },
                { name: "Output:", value: `\`\`\`Error: Invalid equation!\`\`\`` }
            )
		    await interaction.reply({embeds: [replyEmbed]});
            return;
        }

        
        // Send Output //
        output = String(output);
        if(output.length > 1024) {  // Cuts off output and adds "..." if longer than 1024
            output = output.substr(0,1015);
            output += "...";
        }

        const replyEmbed = new MessageEmbed()
            .setColor(global.embedBlue)
            .addFields({ name:"Input:", value: `\`\`\`js\n${input}\`\`\`` })
            .addFields({ name: "Output:", value: `\`\`\`js\n${output}\`\`\`` })
		await interaction.reply({embeds: [replyEmbed]});
	}
}