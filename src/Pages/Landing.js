import { githubLogIn } from "../utils/firebase.js";
import styled from 'styled-components'
import LandingVideo from '../video/bev.mp4';
import TypeWriter from '../components/TypeWriter/TypeWriter'
import { SocialGithubCircular } from '@styled-icons/typicons/SocialGithubCircular'

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
    // width: 250px;
    // height: 250px;
    border: 2px solid rgba(0, 0, 0, .15);
    // border-radius: 25px 25px 25px 25px;
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
padding: 1rem 4rem;
font-size: 3rem;
color: white;
letter-spacing: 0.2rem;
filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.8));
`
const Login = styled.div`
display: inline-block;
    text-align: center;
`

const Par = styled.p`
color: #fafafa;
text-shadow: 2px 2px 2px rgba(0,0,0,0.8);
font-size: 2rem;
padding: 10rem 20rem;
`

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;    
    width: 100vw;
    height: 100%;
    background: rgb(5, 5, 20, 0.4);
    color: #fafafa;
    z-index: 5;
    overflow: hidden;

    @media (max-width: 768px) {
        
        max-width: 100%; 
        display: flex;
        align-items: center;

      }
    `

const Landing = () => {
    return (
        <>
            <StyledMain>
                <LandingHeader>
                    <Logo>
                        B-E-V
                </Logo>
                <Login>
                    <Button onClick={githubLogIn}>Log in with <GithubIcon/></Button>
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
                            {/*
                Full digital overview is the best means to combat these modern issues and optimize your company for the future. */}
                        </Par>
                    </section>
                </Container>
            </StyledMain>
        </>
    )
}

export default Landing;
