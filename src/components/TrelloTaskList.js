import styled from 'styled-components'

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    
    width: available;
    height: available;

    border-radius: 25px;
    background-color: ${({ theme }) => theme.primaryCards};
    padding: 30px;

    grid-area: ${props => props.gridArea};`

const TaskBox = styled.div`
  background-color: palevioletred;
  display: flex;
`

const TrelloTaskList = (props) => {

    const createCard = () => {
        return props.cards.map(card => {
            return (
                <TaskBox>
                    {card.text}
                </TaskBox>
            )
        })
    }


    return (
        <Box>
            {
                createCard()
            }
        </Box>
    )
}

export default TrelloTaskList;
