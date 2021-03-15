import styled from 'styled-components'

const Header = (props) => {

    const HeaderBar = styled.div`
      display: flex;

      border-bottom: 1px solid black;
      grid-area: ${props.gridArea}`

    const UserCircle = styled.div`
      background-color: red;
      border-radius: 100px;
      width: 25px;
      height: 25px;`

    return (
        <HeaderBar>
            {props.children}
            {
                props.members ?
                    props.members.map(member => {
                        return (
                            <UserCircle/>
                        )
                    }) : null
            }
        </HeaderBar>
    )
}

export default Header
