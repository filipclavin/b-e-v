import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import styled from 'styled-components'
import { getRepoCommits, getRepoCollaborators } from "../../utils/github.js";
import { last7Days, last4Weeks, last6Months } from "../../utils/dateUtils.js";
import ColorHash from "color-hash"


const Chart = styled.div`
position: relative;
display: block;
/* flex-direction: row;
align-items: center; */
width: 100%;
height: 100%;
`

const Buttons = styled.div`
position: absolute;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
z-index: 20;
`


const Button = styled.button`
color: #fafafa;
width: 4.5rem;
height: 2rem;
margin-bottom: 1rem;
outline: none;
border: none;
border-radius: 0.3rem;
background: ${({ theme }) => theme.bgBtn};
&:hover {
    background: rgba(75, 192, 192, 0.2);
}
`

const Activity = ({ repo }) => {
    const [datasets, setDatasets] = useState()
    const [times, setTimes] = useState(last7Days())
    const [selectedSpan, setSelectedSpan] = useState(1)

    const colorHash = new ColorHash({ lightness: 0.5, saturation: 0.5 })

    useEffect(async () => {
        setData()
    }, [times])

    const setData = async () => {

        const result = []

        const today = new Date()
        today.setHours(0, 0, 0)

        const collaborators = await getRepoCollaborators(repo)
        const commits = await getRepoCommits(repo)


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

                    if (commit.name === coll || commit.login === coll) week[diffDays]++
                }

                if (diffWeeks <= 3 && selectedSpan === 2) {
                    if (commit.name === coll || commit.login === coll) weeks[diffWeeks]++
                }

                if (diffMonths <= 5 && selectedSpan === 3) {
                    if (commit.name === coll || commit.login === coll) months[diffMonths]++
                }
            })

            let d = week.slice().reverse();


            if (selectedSpan === 1) d = week.slice().reverse();
            else if (selectedSpan === 2) d = weeks.slice().reverse()
            else if (selectedSpan === 3) d = months.slice().reverse()

            result.push({
                label: coll,
                data: d,
                fill: false,
                borderColor: colorHash.hex(coll)
            })

        })

        setDatasets(result)

    }

    return (
        <>
            <Chart>
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


                <Line className="charts"
                    options={{
                        maintainAspectRatio: false,
                        responsive: true,
                        title: { text: 'Commits', fontSize: 20, display: true },
                        legend: {
                            labels: {
                                fontSize: 15,
                            }
                        },
                        layout: {
                            padding: {
                                left: 120,
                                right: 10,
                                top: 20,
                                bottom: 20
                            }
                        },
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        autoSkip: true,
                                        maxTicksLimit: 20,
                                        beginAtZero: true,

                                    },
                                    gridLines: {
                                        display: true
                                    }
                                }],
                            xAxes: [
                                {
                                    gridLines: {
                                        display: true
                                    }
                                }
                            ]
                        }
                    }}
                    data={{
                        labels: times,
                        datasets: datasets
                    }}
                />

            </Chart>
        </>
    )
}

export default Activity
