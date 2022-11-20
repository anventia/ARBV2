// General-use Functions //
const { MessageEmbed } = require("discord.js");
const https = require("https");
const fetch = require("node-fetch");
const { resolve } = require("path");


f =  {
    sendConsole: async function sendConsole(title, value, color, interaction, type) {  // Sends value in code block to Discord
        const errorEmbed = new MessageEmbed()
            .setColor(color)
            .addFields({ name: title, value: `\`\`\`${value}\`\`\`` });
        if(type == "reply") {
            await interaction.reply({embeds: [errorEmbed]});
        }
        if(type == "message") {
            await interaction.channel.send({embeds: [errorEmbed]});
        }
    },

    sendEmbed: async function sendEmbed(string1, string2, color, interaction, type) {  // Sends basic embed
        const embed = new MessageEmbed()
            .setColor(color)
            .addFields({ name: string1, value: string2 });
        if(type == "reply") {
            await interaction.reply({embeds: [embed]});
        }
        if(type == "message") {
            await interaction.channel.send({embeds: [embed]});
        }
    },

    sendMessage: async function sendMessage(string, color, interaction, type) {  // Sends one-line embed
        const embed = new MessageEmbed()
            .setColor(color)
            .setDescription(string);
        if(type == "reply") {
            await interaction.reply({embeds: [embed]});
        }
        if(type == "message") {
            await interaction.channel.send({embeds: [embed]});
        }
    },

    capitalize: async function capitalize(string) {
        return string[0].toUpperCase()+string.slice(1);
    },

    twoDigits: async function twoDigits(input) {  // 6 -> 06, 12 -> 12
        return(input.length < 2 ? "0"+input : input); 
    },

    getJSON: async function getJSON(index, url) {
        let data = fetch(url)
            .then(res => res.json())
            .then(json => { return json[index].url; });
        return data;
    },

    test: async function test(t) {
        return t;
    }

    
}
