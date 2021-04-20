import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getCurrentUser, getCompanyLogo } from '../utils/firebase'

const CompanyLogo = styled.div`
    margin-left: 0.5%;
    min-width: 10rem;
    height: 8vh;
    background: ${props => props.logoURL ? `url(${props.logoURL})` : 'pink'};
    background-size: contain;
    background-repeat: no-repeat;
    text-transform: uppercase;
    background-position: center center;
    `

const Logo = () => {

    const [logoURL, setLogoURL] = useState()

    useEffect(async () => {
        await getCurrentUser()
            .then(async res => {
                await getCompanyLogo(res.company)
                    .then(res => {
                        setLogoURL(res)
                    })
            })
    }, [])

    return (

        <>
            <CompanyLogo logoURL={logoURL}>
            </CompanyLogo>
        </>
    );
}

export default Logo;