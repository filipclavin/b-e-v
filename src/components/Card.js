import styled from 'styled-components'


const Card = (props) => {

    const Card = styled.div`
      height: 45px;
      width: 300px;
      border-radius: 25px;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      background-color: palevioletred`

    return (
        <Card>
            {props.children}
        </Card>
    )
}

export default Card
