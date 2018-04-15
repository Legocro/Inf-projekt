const path = require("path"),
    fs = require("fs"),
    logPath = "../Inf-projekt/Data/Logs.txt";

module.exports = {
    log: async function(message){},
    error: async function(error){
        text = await fs.readFile("../Inf-projekt/Data/Logs.txt");
        text += `[ ${new Date().toString()} ] `;
        text += error.message + "\n";
        console.log(text);
        await fs.writeFile(logPath, text, ()=>{});
    }
}