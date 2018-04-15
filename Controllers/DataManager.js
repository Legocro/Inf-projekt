const fs = require("fs"),
    path = require("path"),
    logger = require(path.join(__dirname,"/Logger"));

async function addImage(name, category){
    let obj = require("../Data/Images.json");
    obj.Images[category].push(name);
    text = JSON.stringify(obj);
    await fs.writeFile("../Inf-projekt/Data/Images.json", text, ()=>{});
}

module.exports = {
    save: function(name, category){
        addImage(name, category).catch(e => logger.error(e).catch(console.error));
    }
}