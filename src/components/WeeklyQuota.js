
import { Bar } from 'react-chartjs-2'

const WeeklyQuota = () => {

    
    return (
        <>
           
            <Bar
                options={{ maintainAspectRatio: true }}
                data={{
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                    label: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                    datasets: [
                        {
                            label: "Database",
                            data: [2, 4, 8, 7, 6],
                            fill: false,
                            backgroundColor: "#ff9f1a",
                        },
                        {
                            label: "User Feature",
                            data: [6, 2, 3, 4, 6],
                            fill: false,
                            backgroundColor: "#61bd4f",
                        },
                        {
                            label: "Design",
                            data: [3, 3, 4, 2, 5],
                            fill: false,
                            backgroundColor: "#c377e0",
                        },
                        {
                            label: "Github",
                            data: [7, 5, 6, 3, 2],
                            fill: false,
                            backgroundColor: "#0079bf",
                        },
                        {
                            label: "Trello",
                            data: [2, 7, 2, 3, 4],
                            fill: false,
                            backgroundColor: "#00c2e0",
                        },
                    ],
                }} 
            />
        </>
    )
}

export default WeeklyQuota;