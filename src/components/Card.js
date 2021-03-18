import styled from 'styled-components'

const CardItem = styled.div`
    height: 45px;
    width: 300px;
    border-radius: 25px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: palevioletred;`

const Card = (props) => {
    return (
        <CardItem>
            {props.children}
        </CardItem>
    )
}

export default Card
