import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {getTrelloCards} from "../utils/trello.js";

const Box = styled.div`
    box-sizing: border-box;
    position: relative;
    width: 40vw;
    height: 35vh;
    background: ${({ theme }) => theme.primaryCards};
    
    overflow-x: hidden;
    overflow-y: scroll;

    border-radius: 25px;
    background-color: ${({theme}) => theme.primaryCards};
    padding: 30px;

    @media (max-width: 1280px) {
        margin: 0;
        margin-bottom: 2rem;
        width: 100%;
        height: 40vh;
        display: block;
        z-index: 1;
      }


    `;

const TaskBox = styled.div`
    display: flex;
    border-radius: 2rem;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    height: 8vh;
    white-space: normal;
    list-style: none;
    padding: 1rem 1rem;
    margin: 1rem 4rem;

    // glass effect
    box-sizing: border-box;
    box-shadow: 0 0 10px rgba(0, 0, 0, .25), inset 0 0 1px 0px white;
    background: rgba(191, 124, 185, 0.79);
    overflow: hidden;
    backdrop-filter: blur(13px);
    -webkit-backdrop-filter: blur(3px);

    @media (max-width: 1280px) {
        margin: 0;
        margin-bottom: 1.5rem;
        padding-left: 3rem;
        padding-right: 3rem;
        font-size: 1.2rem;
        width: 90%;
        display: block;
        z-index: 1;
      }

`;

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
