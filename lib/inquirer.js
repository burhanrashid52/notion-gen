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
    askTableDetails: () => {
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
                name: 'isPageNameFormat',
                type: 'confirm',
                message: 'Do you want to change page name based on date? ',
            },
            {
                name: 'titleColumnName',
                type: 'input',
                message: 'Enter page title column name :',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter page title column name:';
                    }
                },
                when: function (answers) {
                    return answers.isPageNameFormat;
                },
            }
        ];
        return inquirer.prompt(questions);
    }
};
