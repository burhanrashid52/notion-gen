const {Client} = require("@notionhq/client")
// Initializing a client
let notionSecretToken = 'removed';
const notion = new Client({
    auth: notionSecretToken,
});

const generateDatesDatabaseId = "removed";

async function main() {
    const args = process.argv.slice(2);
    const startDate = new Date(args[0]);
    const endDate = new Date(args[1]);
    const datesRange = getDaysArray(startDate, endDate);
    for (let itemDate of datesRange) {
        console.log("Creating page for " + itemDate)
        await createPage(itemDate);
    }
    return "Done";
}

function createPage(givenDate) {
    return notion.pages.create({
        parent: {
            database_id: generateDatesDatabaseId,
        },
        icon: {
            type: "emoji",
            emoji: "📙"
        },
        properties: {
            Name: {
                title: [
                    {
                        text: {
                            content: getPageName(givenDate),
                        },
                    },
                ],
            },
            Date: {
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

main().then(r => console.log(r))
