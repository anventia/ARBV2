const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");


module.exports = { 
	data: new SlashCommandBuilder()
		.setName("-animal")
		.setDescription("Shows a random animal picture")
        .addStringOption(option => option
            .setName("animal")
            .setDescription("Specify an animal")
            .setRequired(true)
        ),
	async execute(client, interaction) {
        // Gather Data //
        let url;
        let img;

        switch(interaction.options.getString("animal").toLowerCase()) {
            case "cat":
                url = "http://api.thecatapi.com/v1/images/search";
                img = (await f.getJSON(url))[0].url;
                break;

            case "dog":
                url = "http://api.thedogapi.com/v1/images/search";
                img = (await f.getJSON(url))[0].url;
                break;

            case "fox":
                url = "https://some-random-api.ml/animal/fox";
                img = (await f.getJSON(url)).image;
                break;

            case "panda":
                url = "https://some-random-api.ml/animal/panda";
                img = (await f.getJSON(url)).image;
                break;

            case "bird":
                url = "https://some-random-api.ml/animal/bird";
                img = (await f.getJSON(url)).image;
                break;

            default:
                await f.sendMessage("Error: Animal not found!", embedRed, interaction, "reply", true);
                return;

        }


        // Send Output //
        const catembed = new EmbedBuilder()
            .setColor(embedBlue)
            .setImage(img);
        await interaction.reply({embeds: [catembed]});
	}
}