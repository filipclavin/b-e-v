import { useEffect, useState } from "react"
import { Router, Switch } from "react-router"
import { getRepos } from "../utils/github"
import { getLanguageData } from "../utils/github"
import Dashboard from "./Dashboard"
import { githubLogOut, getCurrentUser } from "../utils/firebase"

const Overview = () => {

    const [dashboard, setDashboard] = useState()
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
                dashboard
                    ? dashboard
                    : repos
                        ? repos.map(repo => {
                            return (
                                <h1>{repo.name}</h1>
                            )
                        })
                        : null
            }
        </>
    )



}

export default Overview