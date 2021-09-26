const fs = require('fs');
const pkg = require('../package.json');
const fileName = pkg.name + '.json';

function readConfig() {
    if (fs.existsSync(fileName)) {
        const result = fs.readFileSync(fileName, 'utf8');
        if (result) {
            return JSON.parse(result)
        }
    }
    return {};
}

function saveConfig(config) {
    fs.writeFileSync(fileName, JSON.stringify(config), () => {
        console.log("Config saved")
    })
}

module.exports = {
    saveConfig: saveConfig,
    readConfig: readConfig,
};
