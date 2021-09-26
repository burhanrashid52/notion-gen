const inquirer = require('inquirer');

module.exports = {
    askNotionSecretToken: () => {
        const questions = [
            {
                name: 'secretToken',
                type: 'password',
                message: 'Enter your notion secret token:',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter your notion secret token.';
                    }
                }
            },
        ];
        return inquirer.prompt(questions);
    },
    askDatabaseDetails: () => {
        const questions = [
            {
                name: 'databaseId',
                type: 'input',
                message: 'Enter your database id:',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter your your database id.';
                    }
                }
            },
            {
                name: 'dateColumnName',
                type: 'input',
                message: 'Enter your date column name:',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter your date column name:';
                    }
                }
            },
            {
                name: 'pageTitleColumnName',
                type: 'input',
                message: 'Enter page title column name :',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter page title column name:';
                    }
                }
            }
        ];
        return inquirer.prompt(questions);
    }
};
