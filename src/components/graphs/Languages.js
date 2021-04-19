import { useEffect, useState } from "react"
import { Doughnut } from "react-chartjs-2"
import { getLanguageData } from "../../utils/github"
import randomcolor from "randomcolor"
import styled from 'styled-components'


const Languages = ({ repo }) => {

    const [languageData, setLanguageData] = useState()
    const [chartData, setChartData] = useState()

    useEffect(() => {
        getLanguageData(repo)
            .then(res => {
                setLanguageData(res)
            })
    }, [])

    useEffect(() => {
        if (languageData) {

            const labels = []
            const datas = []
            for (let label in languageData) {
                labels.push(label)
                datas.push(languageData[label])
            }

            const data = {
                labels: labels,
                datasets: [
                    {
                        data: datas,
                        backgroundColor: [
                            '#F85F73',
                            '#F85FAA',
                            '#ffff73'
                        ]
                    }
                ]
            }

            setChartData(data)
        }
    }, [languageData])

    return (
        chartData
            ? 
            <Doughnut className="charts"
                data={chartData}
                options={{
                    maintainAspectRatio: false,
                    responsive: true,
                    title: {text: 'Languages', fontSize: 40, display: true},
                    legend: {
                        labels: {
                            
                            fontSize: 20,
                        }
                    },
                    layout: {
                        padding: 10
                    },
                    scales: {
                        yAxes: [
                            {
                            ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10,
                        beginAtZero: true,
                    },
                    gridLines: {
                        display: false
                    },
                    }],
                    xAxes: [
                        {
                        gridLines: {
                            display: false
                        }
                        }
                    ]
                    }
                }}
            />
            : null

    )
}

export default Languages

