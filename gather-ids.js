const axios = require('axios');
const FileSystem = require("fs");
const { token, applicationId } = require("./config.json");

const headers = {
  Authorization: `Bot ${token}`
};

axios.get(`https://discord.com/api/v10/applications/${applicationId}/commands`, { headers })
  .then(response => {
    const commands = response.data;

    let res = "{\n"
    for(let command of commands) {
        res += `    "${command.name}": "${command.id}",\n`
    }
    res = res.substring(0, res.length-2) + "\n}";
    FileSystem.writeFileSync("./commandIds.json", res);

  })
  .catch(error => {
    console.error('Error fetching commands:', error);
  });

