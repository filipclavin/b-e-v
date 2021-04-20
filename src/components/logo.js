import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getCurrentUser, getCompanyLogo } from '../utils/firebase'

const CompanyLogo = styled.div`
    margin-left: 1%;
    width: 10rem;
    height: 80%;
    background: ${props => props.logoURL ? `url(${props.logoURL})` : 'pink'};
    background-size: contain;
    background-repeat: no-repeat;
    text-transform: uppercase;
    @media (max-width: 900px) {
        width: 8rem;
    }
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