import { useEffect, useState } from "react"
import { Router, Switch } from "react-router"
import { getRepos } from "../utils/github"
import { getLanguageData } from "../utils/github"
import Dashboard from "./Dashboard"
import { githubLogOut, getCurrentUser } from "../utils/firebase"

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
            <button onClick={githubLogOut}>Log out</button>
            {
                selectedRepo ?
                    <>
                        <button onClick={() => setSelectedRepo()}>Back to Overview</button>
                        <Dashboard repo={selectedRepo} />
                    </> :
                    repos ?
                        repos.map(repo => {
                            return (
                                <h1 onClick={() => setSelectedRepo(repo.url)}>{repo.name}</h1>
                            )
                        }) :
                        null
            }
        </>
    )



}

export default Overview