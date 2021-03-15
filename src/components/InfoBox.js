import styled from 'styled-components'
import QuotaBar from "./QuotaBar.js";

const InfoBox = (props) => {

    const Box = styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly;
      
      
      width: available;
      height: available;

      border-radius: 25px;
      background-color: #2B2D3E;
      padding: 30px;
    
      grid-area: ${props.gridArea}`

    return (
        <Box>
            {props.children}
        </Box>
    )
}

export default InfoBox
