import styled from 'styled-components'

const Box = styled.div`
position: relative;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 40vw;
height: 35vh;
background: ${({ theme }) => theme.primaryCards};
color: ${({ theme }) => theme.text};
 margin-right: 2rem;
padding: 1rem;
border-radius: 0.8rem;
box-shadow: 3px 3px 6px rgba(0,0,0,0.3), 3px 3px 4px rgba(0,0,0,0.2);
z-index: 1;


@media (max-width: 1280px) {
    margin: 0;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 80%;
    height: 40vh;
    
    z-index: 1;
  }
`

const ChartBox = (props) => {


    return (
        <Box>
            {props.children}
        </Box>
    )
}

export default ChartBox
