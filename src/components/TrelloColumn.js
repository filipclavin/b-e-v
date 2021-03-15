import styled from 'styled-components'

const TrelloColumn = (props) => {

    const Column = styled.div`
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-evenly;


      
      width: available;
      height: available;

      border-radius: 25px;
      background-color: #2B2D3E;
      padding: 30px;
    
    grid-area: ${props.gridArea}`

    return (
        <Column>
            {props.children}
        </Column>
    )
}

export default TrelloColumn
