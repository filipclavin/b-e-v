import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../components/themes/themes'
import  {useDarkTheme} from '../components/themes//toggle/UseDarkTheme'
import { GlobalStyle } from '../components/themes/GlobalStyle'
import ThemeToggle from "../components/themes/toggle/toggleTheme"

const HeaderBar = styled.div`
    width: 100vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid black;
      grid-area: ${props => props.gridArea};
      `

const Users = styled.div`
      display: flex;
      padding-left: 0.3rem;
      grid-area: ${props => props.gridArea};`

const UserCircle = styled.div`
      background: linear-gradient(120deg, rgba(75, 192, 192, 1), rgba(75, 192, 192, 0.2));
      border: 1px solid #1e2e3e;
      margin-left: 0.5rem;
      filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.4));
      border-radius: 50%;
      width: 2rem;
      height: 2rem;`

const Header = (props) => {

    const [theme, themeToggler] = useDarkTheme();

    const themeMode = theme === 'light' ? lightTheme : darkTheme;


    return (
        <ThemeProvider theme={themeMode}>
                    <HeaderBar gridArea={props.gridArea}>
                        <GlobalStyle/>
                        {props.children}
                            <Users>
                            {
                                props.members ?
                                    props.members.map(member => {
                                        return (
                                            <UserCircle />
                                        )
                                    }) : null
                            }
                            </Users>
                        <ThemeToggle theme={theme} toggleTheme={themeToggler} />
                    </HeaderBar>
                </ThemeProvider>
    )
}

export default Header
