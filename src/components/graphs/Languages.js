import { useEffect, useState } from "react"
import { Doughnut } from "react-chartjs-2"
import { getLanguageData } from "../../utils/github"
import ColorHash from "color-hash"
import styled from 'styled-components'


const Languages = ({ repo }) => {

    const [languageData, setLanguageData] = useState()
    const [chartData, setChartData] = useState()

    const colorHash = new ColorHash({ lightness: 0.5, saturation: 0.5 })

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
            const bgColors = []
            for (let label in languageData) {
                labels.push(label)
                datas.push(languageData[label])
                bgColors.push(colorHash.hex(label))
            }

            const data = {
                labels: labels,
                datasets: [
                    {
                        data: datas,
                        backgroundColor: bgColors
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
                    title: { text: 'Languages', fontSize: 40, display: true },
                    legend: {
                        labels: {

                            fontSize: 20,
                        }
                    },
                    layout: {
                        padding: 10
                    },
                    scales: {
                        x: {
                            display: false
                        },
                        y: {
                            display: false
                        }
                    }
                }}
            />
            : null

    )
}

export default Languages

