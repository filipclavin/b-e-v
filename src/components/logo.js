import React from 'react'
import styled from 'styled-components'

const CompanyLogo = styled.div`
    postition: absolute;
    left: 1vw;
    top: 1vh;
    display: block;
    width: 20rem;
    height: 80%;
    background: pink;
    
    text-transform: uppercase;
    `

const Logo = () => {
    return ( 

        <>
            <CompanyLogo>
            </CompanyLogo>       
        </>
     );
}
 
export default Logo;