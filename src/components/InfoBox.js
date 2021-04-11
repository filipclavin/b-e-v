import styled from 'styled-components'
import QuotaBar from "./QuotaBar.js";

const Box = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    
    width: available;
    height: available;

    border-radius: 25px;
    background-color: ${({ theme }) => theme.primaryCards};
    padding: 30px;

    grid-area: ${props => props.gridArea};`

const InfoBox = (props) => {


    return (
        <Box gridArea={props.gridArea}>
            {props.children}
        </Box>
    )
}

export default InfoBox
