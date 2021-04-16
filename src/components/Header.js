import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Modal from './Modal/Modal'

import { getCurrentUser } from "./../utils/firebase"

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
      text-transform: uppercase;
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


const Header = (props) => {

    const [data, setData ] = useState({});
    const [showModal, setShowModal ] = useState(false);


    useEffect(async () => {
        loadData(await getCurrentUser());
        // getData();
},[])

const loadData = async (username) => {
    getCurrentUser(username)
    await fetch(`https://api.github.com/users/${username}`)
    .then(res => res.json())
    .then(data => setData(data));
}

    const openModal = () => {
        setShowModal(prev => !prev)
    }

    return (

        <HeaderBar gridArea={props.gridArea}>
            {showModal && <Modal className="modal" showModal={showModal} setShowModal={setShowModal}/>}
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
            </StyledDiv>
        </HeaderBar>
    )
}
export default Header
