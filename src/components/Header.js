import styled from 'styled-components'

const HeaderBar = styled.div`
      display: flex;

      border-bottom: 1px solid black;
      grid-area: ${props => props.gridArea};`

const UserCircle = styled.div`
      background: linear-gradient(120deg, rgba(75, 192, 192, 1), rgba(75, 192, 192, 0.2));
      border: 1px solid #1e2e3e;
      margin-left: 2px;
      filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.4));
      border-radius: 100px;
      width: 25px;
      height: 25px;`

const Header = (props) => {


    return (
        <HeaderBar gridArea={props.gridArea}>
            {props.children}
            {
                props.members ?
                    props.members.map(member => {
                        return (
                            <UserCircle />
                        )
                    }) : null
            }
        </HeaderBar>
    )
}

export default Header
