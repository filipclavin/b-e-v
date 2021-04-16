import { useEffect, useState } from "react"
import { getRepos } from "../utils/github"
import Dashboard from "./Dashboard"
import { githubLogOut, getCurrentUser } from "../utils/firebase"
import styled from 'styled-components'

const Wrapper = styled.div`
margin: 0;
display: flex;
flex-direction: column;
width: 100vw;
min-height: 100vh;
background: radial-gradient(ellipse at bottom, rgb(31, 31, 48), #343E59);
color: #e1e2e3;

&>h1 {
    text-align: center;
    font-size: 4rem;
    margin-bottom: 0;
}
&>h3 {
    margin-top: 0;
    text-align: center;
    font-size: 1.6rem;
}
`;

const Buttons = styled.div`
    position: absolute;
    width: fit-content;
    top: 2%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;

&>button {
    position: relative;
    padding: 8px 12px;
    outline: none;
    width: fit-content;
    z-index: 10;
    margin-left: 1rem;
}
`;

const RepoList = styled.div`
margin: 0 auto;
padding: 1rem;
width: 90%;
height: 100%;
display: flex;
flex-flow: row wrap;
justify-content: center;

// glassmorph effect
    box-sizing: border-box;
    // width: 250px;
    // height: 250px;
    border: 2px solid rgba(0, 0, 0, .15);
    border-radius: 5px 5px 5px 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .25), inset 0 0 2px 0px white;
    background: rgba(0, 0, 0, .0125);
    overflow: hidden;
    backdrop-filter: blur(13px);
    -webkit-backdrop-filter: blur(3px);

`;

const RepoPreview = styled.div`
    width: 20%;
    padding: 0.5rem 1rem;
    margin: 1rem 1rem;
    border: 1px solid #e1e2e3;

    // glassmorph styling for "buttons"
    border: 2px solid rgba(0, 0, 0, .15);
    // border-radius: 25px 25px 25px 25px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .25), inset 0 0 2px 0px white;
    background: rgba(0, 0, 0, .0125);
    overflow: hidden;
    backdrop-filter: blur(13px);
    -webkit-backdrop-filter: blur(3px);
    
    text-transform: uppercase;

    &>h3 {
        text-align: center;
    }

&:hover {
    box-shadow: 2px 3px 6px rgba(223, 217, 217, 0.603);
`;

const Overview = () => {

    const [selectedRepo, setSelectedRepo] = useState()
    const [repos, setRepos] = useState()

    useEffect(async () => {
        getRepos(await getCurrentUser())
            .then(res => {
                setRepos(res)
            })
    }, [])

    if (repos) console.log(repos);

    return (
        <>
            {
                selectedRepo ?
                    <>
                        <Dashboard repo={selectedRepo}></Dashboard>
                        <Buttons>
                        <button onClick={githubLogOut}>Log out</button>
                        <button onClick={() => setSelectedRepo()}>Back to Overview</button>
                        </Buttons>
                    </> :
                    repos ?
                    <Wrapper>
                        <h1>Repository Overview</h1>
                        <h3>Select a repository {`&`} continue to dashboard or log out</h3>
                        <Buttons>
                        <button onClick={githubLogOut}>Log out</button>
                        </Buttons>
                        <RepoList >
                        {
                        repos.map(repo => {
                            return (
                                    <RepoPreview onClick={() => setSelectedRepo(repo.url)}>
                                <h3>{repo.name}</h3>
                                    </RepoPreview>

                            )
                        })
                        }
                        </RepoList>
                    </Wrapper>
                         : null
            }
        </>
    )



}

export default Overview
