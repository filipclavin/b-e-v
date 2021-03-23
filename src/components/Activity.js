import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import randomcolor from "randomcolor"

import { GITHUB_ACCESS_TOKEN } from "../constants.js"

const Activity = () => {

    /* Get 7 last days */

    function formatDate(date) {

        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        if (dd < 10) { dd = '0' + dd }
        if (mm < 10) { mm = '0' + mm }
        date = mm + '/' + dd + '/' + yyyy;
        return date
    }

    const last7Days = () => {

        let result = []
        for (let i = 7; i > 0; i--) {
            let d = new Date()
            d.setDate(d.getDate() - i)
            result.push(formatDate(d))
        }

        return result
    }

    /* Get 4 last weeks */

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

    const last4Weeks = () => {
        let currWeek = (new Date()).getWeek()

        return [`Week ${currWeek - 4}`, `Week ${currWeek - 3}`, `Week ${currWeek - 2}`, `Week ${currWeek - 1}`]
    }

    /* Get 6 last months */

    const last6Months = () => {
        let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        let today = new Date();
        let d;
        let month;
        let months = [];

        for (let i = 6; i > 0; i--) {
            d = new Date(today.getFullYear(), today.getMonth() - i, 1)
            month = monthNames[d.getMonth()]
            months.push(month)
        }
        return months
    }

    const [times, setTimes] = useState(last7Days())

    const [collaborators, setCollaborators] = useState([])

    const [repoURL, setRepoURL] = useState('')

    const getCollaborators = (githubUsername, repo) => {
        setRepoURL(`https://api.github.com/repos/${githubUsername}/${repo}`)

        fetch(`${repoURL}/collaborators`, {
            method: "GET",
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "authorization": `token ${GITHUB_ACCESS_TOKEN}`
            }
        }).then(res => {
            return res.json()
        }).then(json => {
            setCollaborators(json)
            return collaborators
        })
    };

    const setData = () => {
        let result = []

        collaborators.map(coll => {

            let commitData = []

            fetch(`${repoURL}/commits`)
                .then(res => {
                    return res.json()
                }).then(json => {
                    if (times === last7Days()) {

                    } else if (times === last4Weeks()) {

                    } else {

                    }
                })


            result.push({
                label: coll.login,
                data: commitData,
                fill: false,
                borderColor: randomcolor
            })
        })

        return result
    }

    return (
        <>
            <div>
                <button onClick={() => setTimes(last7Days())}>7 Days</button>
                <button onClick={() => setTimes(last4Weeks())}>4 Weeks</button>
                <button onClick={() => setTimes(last6Months())}>6 Months</button>
            </div>
            <Line
                data={{
                    labels: times,
                    datasets: setData()
                }}
            />
        </>
    )
}

export default Activity