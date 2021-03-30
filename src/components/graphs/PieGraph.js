import { Pie } from 'react-chartjs-2'

const PieGraph = (props) => {
    const data = props.data

    return (
        <Pie data={data}/>
    )
}

export default PieGraph
