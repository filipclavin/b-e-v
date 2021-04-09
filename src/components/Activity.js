import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import randomcolor from 'randomcolor'
import styled from 'styled-components'
import { getRepoCommits, getRepoCollaborators } from "../utils/github.js";
import { last7Days, last4Weeks, last6Months } from "../utils/dateUtils.js";

const Buttons = styled.div`
display: flex;
flex-direction: column;
`


const Button = styled.button`
color: #fafafa;
width: 5rem;
height: 2rem;
margin-bottom: 0.5rem;
padding: 0.5rem;
outline: none;
border: none;
border-radius: 0.3rem;
background: rgba(75, 192, 192, 0.7);
&:hover {
    background: rgba(75, 192, 192, 0.2);
}
`

const Activity = () => {
    const [repoURL, setRepoURL] = useState('https://api.github.com/repos/filipclavin/b-e-v')
    const [datasets, setDatasets] = useState()
    const [times, setTimes] = useState(last7Days())
    const [selectedSpan, setSelectedSpan] = useState(1)

    useEffect(async () => {
        setData()
    }, [times, repoURL])

    const setData = async () => {

        const result = []

        const today = new Date()
        today.setHours(0, 0, 0)

        const collaborators = await getRepoCollaborators(repoURL)
        const commits = await getRepoCommits(repoURL)


        collaborators.forEach(coll => {
            const week = [0, 0, 0, 0, 0, 0, 0]
            const weeks = [0, 0, 0, 0]
            const months = [0, 0, 0, 0, 0, 0]

            commits.forEach(commit => {
                const commitDate = new Date(commit.date)
                commitDate.setHours(0, 0, 0)

                const diffTime = Math.abs(today - commitDate)
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
                const diffWeeks = Math.ceil(diffDays / 7);
                const diffMonths = Math.ceil(diffDays / 30)

                if (diffDays <= 6 && selectedSpan === 1) {
                    console.log(commit.name + ' commited something ' + diffDays + ' days ago');

                    if (commit.name === coll || commit.login === coll) {
                        week[diffDays]++
                    }
                }

                if (diffDays <= 28 && selectedSpan === 2) {
                    if (commit.name === coll || commit.login === coll) weeks[diffWeeks]++
                }

                if (diffDays <= 182 && selectedSpan === 3) {
                    if (commit.name === coll || commit.login === coll) months[diffMonths]++
                }
            })

            let d = week.slice().reverse();

            console.log(coll + ': ' + d);

            if (selectedSpan === 1) d = week.slice().reverse();
            else if (selectedSpan === 2) d = weeks.slice().reverse()
            else if (selectedSpan === 3) d = months.slice().reverse()

            result.push({
                label: coll,
                data: d,
                fill: false,
                borderColor: randomcolor
            })

        })

        setDatasets(result)

    }

    return (
        <>
            <Buttons>
                <Button onClick={() => {
                    setTimes(last7Days())
                    setSelectedSpan(1)
                }
                }>7 Days</Button>
                <Button onClick={() => {
                    setTimes(last4Weeks())
                    setSelectedSpan(2)
                }
                }>4 Weeks</Button>
                <Button onClick={() => {
                    setTimes(last6Months())
                    setSelectedSpan(3)
                }
                }>6 Months</Button>
            </Buttons>
            <Line
                options={{ maintainAspectRatio: true}}
                data={{
                    labels: times,
                    datasets: datasets
                }}
            />
        </>
    )
}

export default Activity
