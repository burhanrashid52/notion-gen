const fs = require('fs');
const fileName = 'config.json';

module.exports = {
    save: function (config) {
        const filePath = `${this.getConfigFilePath()}`;
        fs.writeFileSync(filePath, JSON.stringify(config))
    },
    read: function () {
        if (this.exists()) {
            const filePath = `${this.getConfigFilePath()}`;
            const result = fs.readFileSync(filePath, 'utf8');
            if (result) {
                return JSON.parse(result)
            }
        }
        return {};
    },
    exists: function () {
        const filePath = `${this.getConfigFilePath()}`;
        return fs.existsSync(filePath);
    },
    clear: function () {
        return fs.unlinkSync(fileName);
    },
    getConfigFilePath: () => {
        return require.main.filename.replace("index.js", fileName)
    }
};
