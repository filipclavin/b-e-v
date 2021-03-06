import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CompanyLogo from './logo'
import { getCurrentUser } from "./../utils/firebase"



const HeaderBar = styled.div`
position: absolute;
top: 0;
left: 0;
width: 100vw;
height: 8vh;
z-index: 1;
display: flex;
justify-content: space-between;
align-items: center;


// glass effect
box-sizing: border-box;
box-shadow: 0 0 10px rgba(0, 0, 0, .25), inset 0 0 1px 0px white;
background: rgba(0, 0, 0, .0125);
backdrop-filter: blur(13px);
-webkit-backdrop-filter: blur(3px);

`;


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

`

const ProfileName = styled.h3`
      display: flex;
      font-size: 1rem;
     margin-left: 1rem;
      filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.4));
      text-transform: uppercase;
      color: ${({ theme }) => theme.fontColor};

      @media (max-width: 768px) {
          margin-left: 0.2rem;
          font-size: 0.6rem;
          visibility: hidden;
      }
      `

const UserCircle = styled.img`
      border: 1px solid #1e2e3e;
      filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.4));
      border-radius: 50%;
      width: 32px;
      height: 32px;
      margin-left: 1rem;

      @media (max-width: 768px) {
        width: 24px;
        height: 24px;
        margin-left: 0.2rem;
    }
      `

const StyledDiv = styled.div`
    position: absolute;
    right: 3%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 40%;
    z-index: 1;
`


const Header = (props) => {

    const [data, setData] = useState({});

    useEffect(() => {

        const getUser = async () => {
            await getCurrentUser()
                .then(res => {
                    loadData(res.username);
                })
        }

        getUser()
    }, [])

    const loadData = async (username) => {
        await fetch(`https://api.github.com/users/${username}`)
            .then(res => res.json())
            .then(data => setData(data));
    }

    return (

        <HeaderBar gridArea={props.gridArea}>
            <CompanyLogo />
            <Users>
                {
                    props.members ?
                        props.members.map(member => {
                            return (

                                <User>
                                    <UserCircle src={data.avatar_url} />
                                    <ProfileName>{data.name}</ProfileName>
                                </User>

                            )
                        }) : null
                }
            </Users>

            <StyledDiv>
                {props.children}
            </StyledDiv>
        </HeaderBar>
    )
}
export default Header
