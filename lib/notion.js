const {Client} = require("@notionhq/client")
const config = require("./config")
const utils = require("./util");
const chalk = require('chalk');

// Initializing a client
const notionClient = new Client({
    auth: config.read().secretToken,
});

async function generateDates(tableDetails) {
    const startDate = new Date(tableDetails.startDate);
    const endDate = new Date(tableDetails.endDate);
    const datesRange = utils.getDaysArray(startDate, endDate);
    for (const itemDate of datesRange) {
        await createPage(itemDate, tableDetails);
        console.log(
            chalk.green('Page created for ' + utils.formatDateForNotion(itemDate))
        )
    }
    return Promise.resolve();
}

module.exports = {
    generateDates: generateDates,
};

function buildPageDetails(givenDate, tableDetails) {
    const {databaseId, titleColumnName, isPageNameFormat, dateColumnName} = tableDetails;
    const properties = {
        [dateColumnName]: {
            date: {
                start: utils.formatDateForNotion(givenDate),
            }
        },
    };

    if (isPageNameFormat) {
        properties[titleColumnName] = {
            title: [
                {
                    text: {
                        content: utils.getPageName(givenDate),
                    },
                },
            ],
        };
    }
    return {
        parent: {
            database_id: databaseId,
        },
        icon: isPageNameFormat ? {
            type: "emoji",
            emoji: "📙"
        } : null,
        properties: properties,
    };
}

function createPage(givenDate, tableDetails) {
    return notionClient.pages.create(buildPageDetails(givenDate, tableDetails));
}
