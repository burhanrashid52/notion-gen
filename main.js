const {Client} = require("@notionhq/client")
const {readConfig} = require("./lib/file")
// Initializing a client
const notionSecretToken = readConfig().secretToken;
const notion = new Client({
    auth: notionSecretToken,
});

async function main(tableDetails) {
    const args = process.argv.slice(2);
    const startDate = new Date(tableDetails.startDate);
    const endDate = new Date(tableDetails.endDate);
    const datesRange = getDaysArray(startDate, endDate);
    for (let itemDate of datesRange) {
        console.log("Creating page for " + itemDate)
        await createPage(itemDate, tableDetails);
    }
    return "Done";
}

module.exports = {
    main: main,
};

function createPage(givenDate, tableDetails) {
    const databaseId = tableDetails.databaseId;
    const titleName = tableDetails.pageTitleColumnName;
    const dateName = tableDetails.dateColumnName;
    return notion.pages.create({
        parent: {
            database_id: databaseId,
        },
        icon: {
            type: "emoji",
            emoji: "📙"
        },
        properties: {
            [titleName]: {
                title: [
                    {
                        text: {
                            content: getPageName(givenDate),
                        },
                    },
                ],
            },
            [dateName]: {
                date: {
                    start: formatDateForNotion(givenDate),
                }
            },
        },
    });
}

const getDaysArray = function (start, end) {
    let arr = [];
    let dt = new Date(start);
    for (; dt <= end; dt.setDate(dt.getDate() + 1)) {
        arr.push(new Date(dt));
    }
    return arr;
};

const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];

function getPageName(givenDate) {
    return monthNames[givenDate.getMonth()] + " " + givenDate.getDate();
}

function formatDateForNotion(givenDate) {
    const month = (givenDate.getMonth() + 1).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    })
    const day = (givenDate.getDate()).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    })
    return givenDate.getFullYear() + "-" + month + "-" + day;
}
