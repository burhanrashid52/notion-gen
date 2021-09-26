const file = require('./lib/file');
const {main, init} = require('./main');


const chalk = require('chalk');
const clear = require('clear');
const {textSync} = require('figlet');
const {program} = require('commander');
const inquirer = require('./lib/inquirer');
require('dotenv').config()


const setupNotionSecret = async () => {
    const credentials = await inquirer.askNotionSecretToken();
    file.saveConfig(credentials);
};

program.version('0.0.1')
program
    .command('init')
    .description('Setup notion api')
    .action(async (name, options, command) => {
            const config = file.readConfig();
            if (config.secretToken) {
                console.log(
                    chalk.green('Already a have secret token!')
                );
                return;
            }

            clear();
            console.log(
                chalk.yellow(
                    textSync('Notion Gen', {horizontalLayout: 'full'})
                )
            );
            await setupNotionSecret()
        }
    );

program
    .command('generate-dates <starDate> <endDate>')
    .description('Create notion pages on give date range')
    .action(async (starDate, endDate) => {
            const config = file.readConfig();
            if (config.secretToken) {
                const result = await inquirer.askDatabaseDetails();
                result.startDate = starDate;
                result.endDate = endDate;
                await main(result);
                return;
            }
            console.log(
                chalk.red('No notion config found. Please do use init command')
            );
        }
    );

//program.option('-l, --secret [notionSecret]', 'notion secret token')

program.parse(process.argv);
//console.log("Args :" + program.notionSecret);
