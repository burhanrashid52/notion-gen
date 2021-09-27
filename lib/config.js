const fs = require('fs');
const fileName = 'config.json';

module.exports = {
    save: function (config) {
        fs.writeFileSync(fileName, JSON.stringify(config))
    },
    read: function () {
        if (this.exists()) {
            const result = fs.readFileSync(fileName, 'utf8');
            if (result) {
                return JSON.parse(result)
            }
        }
        return {};
    },
    exists: function () {
        return fs.existsSync(fileName)
    },
    clear: function () {
        return fs.unlinkSync(fileName);
    }
};
