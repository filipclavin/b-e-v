export function formatDate(date) {

    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    date = mm + '/' + dd + '/' + yyyy;
    return date
}

Date.prototype.getWeek = function () {

    let date = new Date(this.getTime())
    date.setHours(0, 0, 0, 0)
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7)
    // January 4 is always in week 1.
    let week1 = new Date(date.getFullYear(), 0, 4)
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
        - 3 + (week1.getDay() + 6) % 7) / 7)
}

export const last7Days = () => {

    let result = []
    for (let i = 7; i > 0; i--) {
        let d = new Date()
        d.setDate(d.getDate() - i + 1)
        result.push(formatDate(d))
    }

    return result
}

export const last4Weeks = () => {
    let currWeek = (new Date()).getWeek()

    return [`Week ${currWeek - 3}`, `Week ${currWeek - 2}`, `Week ${currWeek - 1}`, `Week ${currWeek}`]
}

export const last6Months = () => {
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    let today = new Date();
    let d;
    let month;
    let months = [];

    for (let i = 6; i > 0; i--) {
        d = new Date(today.getFullYear(), today.getMonth() - i + 1, 1)
        month = monthNames[d.getMonth()]
        months.push(month)
    }
    return months
}
