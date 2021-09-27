const config = require('./lib/config');
const notion = require('./lib/notion');
const inquirer = require('./lib/inquirer');
const chalk = require('chalk');
const clear = require('clear');
const {textSync} = require('figlet');
const {program} = require('commander');


const setupNotionSecret = async () => {
    const credentials = await inquirer.askNotionSecretToken();
    config.save(credentials);
};

program.version('0.0.1')
program
    .command('init')
    .description('Setup notion config')
    .action(async (name, options, command) => {
            clear();
            if (config.exists()) {
                console.log(
                    chalk.yellow('Already have config! This will override the existing config')
                );
            }
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
            if (config.exists()) {
                const result = await inquirer.askTableDetails();
                result.startDate = starDate;
                result.endDate = endDate;
                await notion.generateDates(result);
                return;
            }
            console.log(
                chalk.red('No notion config found. Please use init command')
            );
        }
    );

program.parse(process.argv);
