import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getCurrentUser, getCompanyLogo, changeCompanyLogo } from '../utils/firebase'

const CompanyLogo = styled.div`
    min-width: 10rem;
    height: 8vh;
    background: ${props => props.logoURL ? `url(${props.logoURL})` : 'pink'};
    background-size: cover;
    background-repeat: no-repeat;
    text-transform: uppercase;
    background-position: center center;
    & > * {
        display: none;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
        color: #e1e2e3;
        width: 100%;
        height: 100%;
        & > * {
            margin-top: 0px;
            margin-bottom: 0px;
            text-align: center;
        }
    }
    &:hover > * {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    `

const LogoPrompt = styled.div`
    position: absolute;
    top: 8vh;
    left: 0;
    background: whitesmoke;
`

const Logo = () => {

    const [company, setCompany] = useState()
    const [logoURL, setLogoURL] = useState()
    const [admin, setAdmin] = useState(false)
    const [logoClicked, setLogoClicked] = useState(false)
    const [newLogoURL, setNewLogoURL] = useState()

    useEffect(async () => {
        await getCurrentUser()
            .then(async res => {
                console.log(res.company);
                setCompany(res.company)
                setAdmin(res.admin)
                await getCompanyLogo(res.company)
                    .then(res => {
                        setLogoURL(res)
                    })
            })
    }, [])

    const onLogoSubmit = () => {
        setLogoURL(newLogoURL)
        changeCompanyLogo(company, newLogoURL)
        setLogoClicked(false)
    }

    return (

        <>
            <CompanyLogo logoURL={logoURL}>
                {admin ?
                    <div onClick={() => setLogoClicked(true)}>
                        <p>Change Logo</p>
                    </div>
                    : null
                }
            </CompanyLogo>
            {logoClicked ?
                <LogoPrompt>
                    <input type="text" value={newLogoURL} onChange={e => setNewLogoURL(e.target.value)} placeholder="New Logo URL" />
                    <button onClick={onLogoSubmit}>Submit</button>
                    <button onClick={() => setLogoClicked(false)}>Cancel</button>
                </LogoPrompt>
                : null
            }
        </>
    );
}

export default Logo;