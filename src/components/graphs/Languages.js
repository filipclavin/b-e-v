import { useEffect, useState } from "react"
import { Doughnut } from "react-chartjs-2"
import { getLanguageData } from "../../utils/github"
import randomcolor from "randomcolor"


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
            ? <Doughnut
                data={chartData}
            />
            : null

    )
}

export default Languages

