import styled from 'styled-components'

const CardItem = styled.div`
    height: 45px;
    width: 200px;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: palevioletred;
    border: 1px solid rgba(0,0,0,0.3);
    z-index: 10;
    `

const Card = (props) => {
    return (
        <CardItem>
            {props.children}
        </CardItem>
    )
}

export default Card
