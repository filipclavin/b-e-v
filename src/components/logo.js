import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getCurrentUser, getCompanyLogo } from '../utils/firebase'

const CompanyLogo = styled.div`
    margin-left: 0.2%;
    min-width: 10rem;
    height: 90%;
    background: ${props => props.logoURL ? `url(${props.logoURL})` : 'pink'};
    background-size: contain;
    background-repeat: no-repeat;
    text-transform: uppercase;
    & > * {
        display: none;
    }
    &:hover > * {
        display: block;
    }
    `

const Logo = () => {

    const [logoURL, setLogoURL] = useState()
    const [admin, setAdmin] = useState(false)

    useEffect(async () => {
        await getCurrentUser()
            .then(async res => {
                setAdmin(res.admin)
                await getCompanyLogo(res.company)
                    .then(res => {
                        setLogoURL(res)
                    })
            })
    }, [])

    return (

        <>
            <CompanyLogo logoURL={logoURL}>
                <div>
                    <p>Change Logo</p>
                </div>
            </CompanyLogo>
        </>
    );
}

export default Logo;