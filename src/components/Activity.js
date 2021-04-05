import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import randomcolor from 'randomcolor'
import moment from 'moment'

import { getRepoCommits, getRepoCollaborators } from "../utils/github.js";
import { last7Days, last4Weeks, last6Months } from "../utils/dateUtils.js";

const Activity = () => {
    const [repoURL, setRepoURL] = useState('https://api.github.com/repos/filipclavin/b-e-v')
    const [datasets, setDatasets] = useState()
    const [times, setTimes] = useState(last7Days())

    useEffect(async () => {
        setData()
    }, [times, repoURL])

    const setData = async () => {

        const result = []

        const today = new Date()
        today.setHours(0, 0, 0)

        const collaborators = await getRepoCollaborators(repoURL)
        const commits = await getRepoCommits(repoURL)

        console.log(collaborators);

        collaborators.forEach(coll => {

            const week = [0, 0, 0, 0, 0, 0, 0]

            commits.forEach(commit => {
                const commitDate = new Date(commit.date)
                commitDate.setHours(0, 0, 0)

                const diffTime = Math.abs(today - commitDate)
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;


                if (diffDays <= 7) {
                    if (commit.name === coll) {
                        week[diffDays - 1]++
                    }
                }
            })

            result.push({
                label: coll,
                data: week.reverse(),
                fill: false,
                borderColor: randomcolor
            })

        })

        setDatasets(result)

        console.log(datasets);

    }

    // collaborators.forEach(coll => {
    //
    //     const simpleCommits = []
    //
    //     const week = [0, 0, 0, 0, 0, 0, 0]
    //     const weekPerPerson = new Map()
    //
    //     collaborators.forEach(collaborator => {
    //         weekPerPerson.set(collaborator, [0, 0, 0, 0, 0, 0, 0])
    //     })
    //
    //     fetch(`${repoURL}/commits`)
    //         .then(res => {
    //             return res.json()
    //         }).then(json => {
    //         json.forEach(obj => {
    //             simpleCommits.push({name: obj.commit.author.name, date: obj.commit.author.date})
    //         })
    //
    //         //array of commits that's one week or less old
    //         const weekOldCommits = [...getWeekOldCommits(simpleCommits)]
    //
    //         weekOldCommits.forEach(commit => {
    //             if (commit) {
    //                 let today = moment(new Date())
    //                 /* console.log(commit)
    //                 const date = new Date(commit.date);
    //                 const year = date.getFullYear();
    //                 const month = date.getMonth();
    //                 const dt = date.getDate();
    //
    //
    //
    //                 var a = moment([year, month, dt]) */
    //
    //
    //                 //console.log(today.diff(a, 'days') - 1)
    //
    //                 week[today.diff(commit.date, 'days') - 1] += 1;
    //             }
    //         })
    //
    //         result.push({
    //             label: coll.login,
    //             data: week.reverse(),
    //             fill: false,
    //             borderColor: randomcolor
    //         })
    //     })
    //
    //
    // })
    // setDatasets(result)
    //console.log("datasets: " + datasets)

    /* const getWeekOldCommits = (obj) => {
        return obj.map(commit => {
            if (moment(new Date).diff(commit.date, 'days') <= 7) {
                return commit
            }
        })
    } */

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
                    datasets: datasets
                }}
            />
        </>
    )
}

export default Activity
