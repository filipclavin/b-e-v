import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {getTrelloCards} from "../utils/trello.js";

const Box = styled.div`

    display: inline-block;
    height: 50%;

    box-sizing: border-box;
    vertical-align: top;
    white-space: nowrap;
    overflow-x: hidden;
    overflow-y: scroll;
    
    width: 80%;

    border-radius: 25px;
    background-color: ${({theme}) => theme.primaryCards};
    padding: 30px;

    grid-area: ${props => props.gridArea};
    
    `;

const TaskBox = styled.div`
  display: flex;
  background: #e76eb1c5;
    border-radius: 2rem;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    height: 8vh;
    position: relative;
    white-space: normal;
    list-style: none;
    padding: 1rem 1rem;
    margin: 1rem 10rem;
    box-shadow: 5px 5px 20px rgba(0,0,0,0.3);

    &:hover {
        box-shadow: 4px 4px 6px rgba(223, 217, 217, 0.5);
        transform: scale(0.99);
`

const TrelloTaskList = () => {
    const [trelloCards, setTrelloCards] = useState([])

    useEffect(() => {
        getTrelloCards('✏').then(res => {
            setTrelloCards(res)
        })
    }, [])
    return (
        <Box>
                {trelloCards.map(card => {
                    return (<TaskBox>{card}</TaskBox>)
                })}
        </Box>
    )
}

export default TrelloTaskList;
