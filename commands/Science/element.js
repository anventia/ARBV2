const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");


module.exports = { 
	data: new SlashCommandBuilder()
		.setName("-element")
		.setDescription("Shows information about any element on the periodic table!")
        .addStringOption(option => option
            .setName("input")
            .setDescription("Element input")
            .setRequired(true)
        ),
	async execute(client, interaction) {
        // Process Input //
        let option = interaction.options.getString("input");
        let data;
        const urls = [
            "https://periodic-table-api.herokuapp.com/atomicNumber/", 
            "https://periodic-table-api.herokuapp.com/atomicName/",
            "https://periodic-table-api.herokuapp.com/atomicSymbol/"
        ];

        // Gets data depending on user input = number, name, or symbol
        for(let i=0; i<3; i++) {  
            data = await f.getJSON(urls[i]+option);
            if(data.message != "Not Found") break;
        }

        // Element not found!
        if(data.message == "Not Found") {  
            await f.sendMessage(`Element \`${option}\` was not found!`, embedRed, interaction, "reply", true);
            return;
        }


        // Gather Element Data //
        const symbol = data.symbol;
        const number = data.atomicNumber;
        const name = data.name;
        const color = data.cpkHexColor == "" ? embedBlue : data.cpkHexColor;
        const group = await f.capitalize(data.groupBlock);

        const mass = parseFloat(data.atomicMass).toFixed(2);
        const density = data.density == "" ? "Unknown" : data.density;
        let melt = (parseInt(data.meltingPoint)-273.15).toFixed(2)+"°C";
        let boil = (parseInt(data.boilingPoint)-273.15).toFixed(2)+"°C";
        if(melt+"" == "NaN°C") { melt = "None" };
        if(boil+"" == "NaN°C") { boil = "None" };

        const protons = number;
        const electrons = number;
        const neutrons = Math.round(parseFloat(mass) - parseFloat(number));
        
        const charges = data.oxidationStates == "" ? "None" : data.oxidationStates;
        const state = data.standardState == "" ? "Unknown" : await f.capitalize(data.standardState);
        const eNeg = data.electronegativity == "" ? "None" : data.electronegativity;
        const config = data.electronicConfiguration;
        const year = data.yearDiscovered;


        // Send Output //
        const element = new EmbedBuilder()
            .setColor(color)
            .setTitle(name)
            .setURL("https://en.wikipedia.org/wiki/"+name)
            .addFields(
                { name: "Symbol:", value: symbol, inline: true },
                { name: "Number:", value: number, inline: true },
                { name: "Mass:", value: mass, inline: true },

                { name: "Basic Information:", value: "Group:\nProtons:\nElectrons:\nNeutrons:\nIon Charges:", inline: true },
                { name: "\u200b", value: `${group}\n${protons}\n${electrons}\n${neutrons}\n${charges}`, inline: true },
                { name: "\u200b", value: "\u200b", inline: true },

                { name: "Temperature Information:", value: "Melting Point:\nBoiling Point:\nStandard State:", inline: true },
                { name: "\u200b", value: `${melt}\n${boil}\n${state}`, inline: true },
                { name: "\u200b", value: "\u200b", inline: true },

                { name: "Other Information:", value: "Density:\nElectron Configuration:\nElectronegativity:\nYear Discovered:", inline: true },
                { name: "\u200b", value: `${density}\n${config}\n${eNeg}\n${year}`, inline: true },
                { name: "\u200b", value: "\u200b", inline: true }
            )
        await interaction.reply({embeds: [element]});
	}
}