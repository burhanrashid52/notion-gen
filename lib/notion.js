const {Client} = require("@notionhq/client")
const config = require("./config")
const utils = require("./util");

// Initializing a client
const notionClient = new Client({
    auth: config.read().secretToken,
});

async function generateDates(tableDetails) {
    const startDate = new Date(tableDetails.startDate);
    const endDate = new Date(tableDetails.endDate);
    const datesRange = utils.getDaysArray(startDate, endDate);
    for (const itemDate of datesRange) {
        console.log("Creating page for " + itemDate)
        await createPage(itemDate, tableDetails);
    }
    return Promise.resolve();
}

module.exports = {
    generateDates: generateDates,
};

function buildPageDetails(givenDate, tableDetails) {
    const {databaseId, titleColumnName, dateColumnName} = tableDetails;
    return {
        parent: {
            database_id: databaseId,
        },
        icon: {
            type: "emoji",
            emoji: "📙"
        },
        properties: {
            [titleColumnName]: {
                title: [
                    {
                        text: {
                            content: utils.getPageName(givenDate),
                        },
                    },
                ],
            },
            [dateColumnName]: {
                date: {
                    start: utils.formatDateForNotion(givenDate),
                }
            },
        },
    };
}

function createPage(givenDate, tableDetails) {
    return notionClient.pages.create(buildPageDetails(givenDate, tableDetails));
}
