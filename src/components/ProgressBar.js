import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {letsDoTheProgressbarWoo} from "../utils/trello.js";

const OuterBar = styled.div`
      height: 20px;
      width: 300px;
      background-color: #E8CFCF;

      margin: 0 10px;

      display: flex;
      flex-direction: column-reverse;
      border-radius: 25px;`

const InnerBar = styled.div`
      height: 20px;
      width: ${props => props.percent}%;
      background-color: royalblue;
      border-radius: 25px;`

const ProgressBar = () => {
    const [remaining, setRemaining] = useState(0)
    const [completed, setCompleted] = useState(0)

    useEffect(() => {
        letsDoTheProgressbarWoo('✏️', '😇').then(res => {
            setRemaining(res.get('remainingCards'))
            setCompleted(res.get('completedCards'))
        })
    }, [])

    return (
        <OuterBar>
            <InnerBar percent={remaining / (completed + remaining) * 100}>

            </InnerBar>
        </OuterBar>
    )
}

export default ProgressBar
