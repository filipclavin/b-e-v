import { githubLogIn } from "../utils/firebase.js";
import styled from 'styled-components'
import LandingVideo from '../video/bev.webm';
import TypeWriter from '../components/TypeWriter/TypeWriter'
import { SocialGithubCircular } from '@styled-icons/typicons/SocialGithubCircular'
import { useState } from "react";



const GithubIcon = styled(SocialGithubCircular)`
width: 3rem;
height: 3rem;
color: #fafafa;

&:hover {
    color: #fafafae5;
    filter: drop-shadow(1px 1px 1px black);
    opacity: 0.8;
    transform: scale(0.92);
}`;


const StyledMain = styled.div`
width: 100vw;
height: 100vh;
background: radial-gradient(ellipse at bottom,  #343E59 20%, #2B2D3E);

`
const LandingHeader = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10vh;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 3vh 4wv;

    // glass effect
    box-sizing: border-box;
    border: 2px solid rgba(0, 0, 0, .15);
    
    box-shadow: 0 0 10px rgba(0, 0, 0, .25), inset 0 0 2px 0px white;
    background: rgba(0, 0, 0, .0125);
    overflow: hidden;
    backdrop-filter: blur(13px);
    -webkit-backdrop-filter: blur(3px);
    
    `;

const Button = styled.button`
        margin-right: 4rem;
        padding: 0.4rem 0.8rem;
        border: none;
        position: relative;
        padding: 15px;
        margin-right: 2rem;
        width: 100px;
        border-radius: 5px 5px 5px 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.25), inset 0 0 2px 0px;
        background-color: #00000082;
        color:white;
        overflow: hidden;


    &>button:hover {
        transform: scale(0.94);
        color: #e1e2e3;
        background-color: rgba(75, 192, 192, 0.6);
        outline:none;
        cursor: pointer;
      }
`

const Logo = styled.h1`
padding-left: 3rem;
font-size: 3rem;
color: white;
letter-spacing: 0.2rem;
filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.8));

@media (max-width: 900px) {
    font-size: 2rem;
    padding-left: 1rem;
  }
`
const Login = styled.div`
    display: flex;
    align-items: center;
    text-align: center;

&>form {

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

}

    &>form>label {
        color: white;
        font-size: 1.5rem;
        margin-right: 2rem;

        @media (max-width: 768px) {
            font-size: 0.6rem;
            margin: 0;
        }
    }

`

const Par = styled.p`
color: #fafafa;
text-shadow: 2px 2px 2px rgba(0,0,0,0.8);
font-size: 2rem;
text-align: center;

`

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;    
    width: 100vw;
    height: 100vh;
    background: rgb(5, 5, 20, 0.4);
    color: #fafafa;
    z-index: 5;
    `

const Landing = () => {

    const [company, setCompany] = useState()
    const [admin, setAdmin] = useState(false)

    return (
        <>
            <StyledMain>
                <LandingHeader>
                    <Logo>
                        B-E-V
                </Logo>
                    <Login>
                        <form>
                            <label htmlFor="company1"> Xbox
                                <input type="radio" name="company" id="Xbox" onChange={() => setCompany("Xbox")} />
                            </label>
                            <label htmlFor="company2"> Playstation
                                <input type="radio" name="company" id="Playstation" onChange={() => setCompany("Playstation")} />
                            </label>
                            <label htmlFor="admin"> Admin?
                                <input type="checkbox" name="admin" id="admin" onChange={e => setAdmin(e.target.checked)} />
                            </label>
                        </form>
                        <Button onClick={() => {
                            if (company) {
                                githubLogIn(company, admin)
                            } else {
                                alert("Please select a company")
                            }
                        }}>Log in with <GithubIcon /></Button>
                    </Login>
                </LandingHeader>

                <video autoPlay loop muted
                    style={{
                        position: "absolute",
                        bottom: "0",
                        width: "100%",
                        height: "100%",
                        zIndex: "1",
                        objectFit: "cover",

                    }}
                >
                    <source src={LandingVideo} type="video/webm" />
                </video>
                <Container>
                    <section>
                        <Par>
                            <TypeWriter />
                            
                        </Par>
                    </section>
                </Container>
            </StyledMain>
        </>
    )
}

export default Landing;
