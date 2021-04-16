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

            const datasets = []

            let counter = 0

            Object.keys(languageData).forEach(item => {

                datasets.push(
                    {
                        label: item,
                        data: Object.values(languageData)[counter],
                        backgroundColor: randomcolor
                    }
                )

                counter++
            })

            setChartData({
                labels: Object.keys(languageData),
                datasets: datasets
            })
        }

    }, [languageData])

    console.log(chartData);

    return (
        chartData
            ? <Doughnut
                data={chartData}
            />
            : null

    )
}

export default Languages

