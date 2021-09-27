module.exports = {
    getDaysArray: function (start, end) {
        let arr = [];
        let dt = new Date(start);
        for (; dt <= end; dt.setDate(dt.getDate() + 1)) {
            arr.push(new Date(dt));
        }
        return arr;
    },
    formatDateForNotion: function (givenDate) {
        const month = (givenDate.getMonth() + 1).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
        const day = (givenDate.getDate()).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
        return givenDate.getFullYear() + "-" + month + "-" + day;
    },
    getPageName: function (givenDate) {
        return monthNames[givenDate.getMonth()] + " " + givenDate.getDate();
    }
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
