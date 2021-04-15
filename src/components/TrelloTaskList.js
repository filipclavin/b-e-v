import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {getTrelloCards} from "../utils/trello.js";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  width: available;
  height: available;

  border-radius: 25px;
  background-color: ${({theme}) => theme.primaryCards};
  padding: 30px;

  grid-area: ${props => props.gridArea};`

const TaskBox = styled.div`
  display: flex;
  flex-direction: column;
`


const TrelloTaskList = () => {
    const [trelloCards, setTrelloCards] = useState([])

    useEffect(() => {
        getTrelloCards('✏').then(res => {
            setTrelloCards(res)
        })
    }, [])

    useEffect(() => {
        console.log(trelloCards)
    }, [trelloCards])



    return (
        <Box>
                {trelloCards.map(card => {
                    return <TaskBox>{card}</TaskBox>
                })}
        </Box>
    )
}

export default TrelloTaskList;
