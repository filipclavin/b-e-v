import {useEffect, useState} from 'react'
import {Line, Bar, Pie } from 'react-chartjs-2'
import randomcolor from 'randomcolor'
import moment from 'moment'

import {getRepoCommits} from "../utils/github.js";
import { last7Days, last4Weeks, last6Months } from "../utils/dateUtils.js";
import {GITHUB_ACCESS_TOKEN} from "../constants.js"

const Activity = () => {
    const [collaborators, setCollaborators] = useState([])
    const [repoURL, setRepoURL] = useState('https://api.github.com/repos/filipclavin/b-e-v')
    const [datasets, setDatasets] = useState()
    const [times, setTimes] = useState(last7Days())

    useEffect(() => {
        setData()
    }, [times])

    const setData = async () => {
        //getCollabs start

        const koala = new Map()
        await getRepoCommits("filipclavin", "b-e-v").then((data) => {
            data.map(commit => {
                if(koala.get(commit.name)) {
                    koala.set(commit.name, 1 + koala.get(commit.name))
                }
                else {
                    koala.set(commit.name, 1)
                }


            })

            const result = []

            const names =  Array.from(koala.keys())
            const totals = Array.from(koala.values())

            names.forEach((person, index) => {

                result.push({
                    label: person,
                    data: totals[index],
                    fill: false,
                    borderColor: randomcolor
                })
            })

            setDatasets(result)
        })

        //getCollabs slut

        let result = []

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
    }

    const getWeekOldCommits = (obj) => {
        return obj.map(commit => {
            if (moment(new Date).diff(commit.date, 'days') <= 7) {
                return commit
            }
        })
    }

    return (
        <>
            <div>
                <button onClick={() => setTimes(last7Days())}>7 Days</button>
                <button onClick={() => setTimes(last4Weeks())}>4 Weeks</button>
                <button onClick={() => setTimes(last6Months())}>6 Months</button>
            </div>
            <Bar
                data={{
                    labels: times,
                    datasets: datasets
                }}
            />
        </>
    )
}

export default Activity
