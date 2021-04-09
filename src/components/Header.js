import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../components/themes/themes'
import  {useDarkTheme} from '../components/themes//toggle/UseDarkTheme'
import { GlobalStyle } from '../components/themes/GlobalStyle'
import ThemeToggle from "../components/themes/toggle/toggleTheme"
import Modal from './Modal/Modal'

const HeaderBar = styled.div`
    position: relative;
    width: 100vw;
    height: 8vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid black;
    grid-area: ${props => props.gridArea};
    z-index: 10;
    `

const Users = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
      `

const User = styled.div`
position: relative;
display: flex;
align-items: center;
margin-right: 1rem;
`

const ProfileName = styled.h3`
      display: flex;
      font-size: 0.6rem;
      padding-left: 0.3rem;
      filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.4));
      `

const UserCircle = styled.img`
      border: 1px solid #1e2e3e;
      margin-left: 0.2rem;
      filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.4));
      border-radius: 50%;
      width: 32px;
      height: 32px;`

      const Button = styled.button`
      position: relative;
  padding: 8px 16px;
  border-radius: 3px;
  border: none;
  background: ${({ theme }) => theme.bgBtn};
  color: #fafafa;
  filter: drop-shadow(4px 4px 4px rgba(0,0,0,0.3));
  outline: none;
  cursor: pointer;

  &:hover,
      &:focus {
        background: ${({ theme }) => theme.btnHover};
        transform: scale(0.98);
        box-shadow: 0px 2px 3px rgba(0,0,0,0.4)         
      }
  `
  const StyledDiv = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin-right: 1rem;
`


  const API_URL = `https://api.github.com/users/robonexx`;


const Header = (props) => {

    const [data, setData ] = useState([]);
    const [theme, themeToggler] = useDarkTheme();

    const [showModal, setShowModal ] = useState(false);

   

    useEffect(() => {
        loadData();
        // getData();
},[])

const loadData = async () => {
    await fetch(API_URL)
    .then(res => res.json())
    .then(data => setData(data));
}


    const themeMode = theme === 'light' ? lightTheme : darkTheme;

    const openModal = () => {
        setShowModal(prev => !prev)
    }

    return (
        <ThemeProvider theme={themeMode}>
             {showModal && <Modal className="modal" showModal={showModal} setShowModal={setShowModal}/>}
                    <HeaderBar gridArea={props.gridArea}>
                   
                        <GlobalStyle/> 
                          
                        <Users>                       
                            {
                                props.members ?
                                    props.members.map(member => {
                                        return (
                                        
                                            <User>
                                                <UserCircle src={data.avatar_url}/>
                                                <ProfileName>{data.name}</ProfileName>
                                            </User>
                                        
                                        )
                                    }) : null
                            }
                            </Users>
                            
                            <StyledDiv>
                                <Button onClick={openModal} >MODAL</Button>
                                <ThemeToggle theme={theme} toggleTheme={themeToggler} />
                            </StyledDiv>
                    </HeaderBar>
                </ThemeProvider>
    )
}

export default Header
